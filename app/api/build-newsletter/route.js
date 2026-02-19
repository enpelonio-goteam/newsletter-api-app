import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";

export const runtime = "nodejs";

const require = createRequire(import.meta.url);
const { buildNewsletterHtml } = require("../../../js-newsletter-builder");

const TEMPLATE_KEYS = [
  "container-start",
  "container-end",
  "header",
  "divider",
  "text-block",
  "section",
  "button",
  "footer",
];

let templateCache = null;

async function loadTemplates() {
  if (templateCache) return templateCache;

  const templatesDir = path.join(process.cwd(), "templates");
  const entries = await Promise.all(
    TEMPLATE_KEYS.map(async (key) => {
      const fullPath = path.join(templatesDir, `${key}.html`);
      const html = await fs.readFile(fullPath, "utf8");
      return [key, html];
    })
  );

  templateCache = Object.fromEntries(entries);
  return templateCache;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const input = body?.input ?? body;
    const templates = await loadTemplates();
    const html = buildNewsletterHtml(input, { templates });

    return new Response(html, {
      status: 200,
      headers: {
        "content-type": "text/html; charset=utf-8",
      },
    });
  } catch (error) {
    return Response.json(
      {
        error: "Failed to build newsletter.",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 }
    );
  }
}
