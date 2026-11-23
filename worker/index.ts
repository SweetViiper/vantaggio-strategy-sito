// Cloudflare Worker: serves the static site and stores contact requests in D1.
import type { D1Database, Fetcher } from "@cloudflare/workers-types";

interface Mailer {
  send(message: { to: string; from: { email: string; name: string }; subject: string; text: string }): Promise<unknown>;
}

interface Env {
  ASSETS: Fetcher;
  DB?: D1Database;
  MAIL?: Mailer;
  NOTIFY_TO?: string;
  NOTIFY_FROM?: string;
}

// Tells the agency a new request arrived. A failed email never loses the
// request: it is already saved in the database.
async function notify(env: Env, lead: { name: string; phone: string; company: string; message: string }) {
  if (!env.MAIL || !env.NOTIFY_TO || !env.NOTIFY_FROM) {
    return;
  }
  try {
    await env.MAIL.send({
      to: env.NOTIFY_TO,
      from: { email: env.NOTIFY_FROM, name: "Sito Vantaggio Strategy" },
      subject: `Nuova richiesta dal sito: ${lead.name} (${lead.company})`.replace(/[\r\n]+/g, " "),
      text: [
        "Nuova richiesta dal modulo di vantaggiostrategy.com",
        "",
        `Nome: ${lead.name}`,
        `Telefono: ${lead.phone}`,
        `Attività: ${lead.company}`,
        `Messaggio: ${lead.message || "(nessuno)"}`,
      ].join("\n"),
    });
  } catch (error) {
    console.error("notify failed", error);
  }
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

const clean = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");

async function contact(request: Request, env: Env, ctx: { waitUntil(promise: Promise<unknown>): void }) {
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
  ctx.waitUntil(notify(env, { name, phone, company, message }));
  return json({ ok: true });
}

export default {
  async fetch(request: Request, env: Env, ctx: { waitUntil(promise: Promise<unknown>): void }): Promise<Response> {
    const url = new URL(request.url);
    // One address only: https, without www.
    const www = url.hostname === "www.vantaggiostrategy.com";
    if (www || (url.protocol === "http:" && url.hostname === "vantaggiostrategy.com")) {
      url.hostname = "vantaggiostrategy.com";
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }
    if (url.pathname === "/api/contact") {
      return contact(request, env, ctx);
    }
    return env.ASSETS.fetch(request as never) as unknown as Response;
  },
};
