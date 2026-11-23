// Renders each page to static HTML so the site works without JavaScript and is
// readable by search engines. Runs after the client and server builds.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const client = join(root, "dist/client");
const { pages, render } = await import(pathToFileURL(join(root, "dist/server/entry-server.js")).href);
const template = readFileSync(join(client, "index.html"), "utf8");
const escape = (text) => text.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const PHONE = "(hover: none) and (pointer: coarse), (max-width: 860px)";
for (const page of pages) {
  const head = [
    `<title>${escape(page.title)}</title>`,
    `<meta name="description" content="${escape(page.description)}" />`,
    `<meta property="og:title" content="${escape(page.title)}" />`,
    `<meta property="og:description" content="${escape(page.description)}" />`,
    `<link rel="canonical" href="https://vantaggiostrategy.com${page.path}" />`,
    // The first frame of the film is the largest thing on screen: fetch it first.
    ...(page.path === "/"
      ? [
          `<link rel="preload" as="image" fetchpriority="high" href="/assets/world/scene-01-mobile-poster.jpg" media="${PHONE}" />`,
          `<link rel="preload" as="image" fetchpriority="high" href="/assets/world/scene-01-poster.jpg" media="(min-width: 861px) and (hover: hover)" />`,
        ]
      : []),
  ].join("\n    ");
  const html = template.replace("<!--head-->", head).replace("<!--app-->", render(page.path));
  const file = page.path === "/" ? join(client, "index.html") : join(client, `${page.path}.html`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  console.log("prerendered", page.path);
}
rmSync(join(root, "dist/server"), { recursive: true, force: true });
