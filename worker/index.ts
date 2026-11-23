// Cloudflare Worker: serves the static site and stores contact requests in D1.
import type { D1Database, Fetcher } from "@cloudflare/workers-types";

interface Env {
  ASSETS: Fetcher;
  DB?: D1Database;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

const clean = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");

async function contact(request: Request, env: Env) {
  if (request.method !== "POST") {
    return json({ ok: false, reason: "method" }, 405);
  }
  let data: Record<string, unknown>;
  try {
    data = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, reason: "body" }, 400);
  }
  // Honeypot: real visitors never fill this field.
  if (clean(data.website, 200).length > 0) {
    return json({ ok: true });
  }
  const name = clean(data.name, 120);
  const phone = clean(data.phone, 40);
  const company = clean(data.company, 160);
  const message = clean(data.message, 4000);
  if (name.length < 2 || phone.length < 6 || company.length < 2 || data.consent !== true) {
    return json({ ok: false, reason: "fields" }, 400);
  }
  if (!env.DB) {
    return json({ ok: false, reason: "storage" }, 500);
  }
  await env.DB.prepare(
    "INSERT INTO contact_requests (name, company, email, phone, service, message) VALUES (?, ?, '', ?, '', ?)",
  )
    .bind(name, company, phone, message)
    .run();
  return json({ ok: true });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/contact") {
      return contact(request, env);
    }
    return env.ASSETS.fetch(request as never) as unknown as Response;
  },
};
