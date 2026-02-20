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
  if (templateCache) {
    console.log("[build-newsletter] Step: template cache hit");
    return templateCache;
  }

  console.log("[build-newsletter] Step: template cache miss; loading templates");

  const templatesDir = path.join(process.cwd(), "templates");
  const entries = await Promise.all(
    TEMPLATE_KEYS.map(async (key) => {
      const fullPath = path.join(templatesDir, `${key}.html`);
      console.log(`[build-newsletter] Step: reading template '${key}'`, {
        fullPath,
      });
      const html = await fs.readFile(fullPath, "utf8");
      return [key, html];
    })
  );

  templateCache = Object.fromEntries(entries);
  console.log("[build-newsletter] Step: templates loaded", {
    templateCount: entries.length,
    keys: TEMPLATE_KEYS,
  });
  return templateCache;
}

export async function POST(request) {
  console.log("[build-newsletter] Step: request received", {
    method: request.method,
    url: request.url,
  });

  try {
    console.log("[build-newsletter] Step: parsing JSON body");
    const body = await request.json();
    console.log("[build-newsletter] Step: request body parsed", { body });

    console.log("[build-newsletter] Step: resolving input payload");
    const input = body?.input ?? body;
    console.log("[build-newsletter] Step: input resolved", { input });

    console.log("[build-newsletter] Step: loading templates");
    const templates = await loadTemplates();

    console.log("[build-newsletter] Step: building newsletter HTML");
    const html = buildNewsletterHtml(input, { templates });
    console.log("[build-newsletter] Step: newsletter HTML built", {
      htmlLength: typeof html === "string" ? html.length : 0,
    });

    console.log("[build-newsletter] Step: sending success response");
    return new Response(html, {
      status: 200,
      headers: {
        "content-type": "text/html; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("[build-newsletter] Step: request failed", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });
    return Response.json(
      {
        error: "Failed to build newsletter.",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 }
    );
  }
}
