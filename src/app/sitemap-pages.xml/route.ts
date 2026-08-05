import { getSiteRoutes } from "@/lib/site-routes";

/**
 * /sitemap-pages.xml — the SITE'S OWN page sitemap.
 *
 * The Tyashin platform intercepts `/sitemap.xml` and serves it as a
 * sitemap-INDEX that references THIS file. This route is NOT in the platform
 * registry, so it dispatches straight to the site Worker (good). It lists
 * every indexable page the site serves, sourced from `getSiteRoutes()` — the
 * same list that drives each `[slug]` route's `generateStaticParams`, so the
 * sitemap and the built pages cannot drift.
 *
 * It deliberately does NOT include blog POST URLs (`/blog/[slug]`): those are
 * platform-owned content and belong in the platform's own content sitemap.
 *
 * DYNAMIC on purpose: the absolute origin is resolved from the incoming
 * request Host header so the URLs are correct on BOTH the preview host and the
 * future custom domain (thridify.com) with no rebuild/env flip. Correctness
 * beats static prerender here (a build-time `force-static` render has no
 * request Host to read). CDN cacheability is provided via Cache-Control.
 */
export const dynamic = "force-dynamic";

const FALLBACK_HOST = "site-thridify.snowy-cherry-cd2c.workers.dev";

function resolveOrigin(req: Request): string {
  const h = req.headers;
  const host =
    h.get("x-forwarded-host")?.split(",")[0]?.trim() ||
    h.get("host")?.trim() ||
    FALLBACK_HOST;
  const proto =
    h.get("x-forwarded-proto")?.split(",")[0]?.trim() ||
    (host.includes("localhost") || host.startsWith("127.") ? "http" : "https");
  return `${proto}://${host}`;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET(req: Request): Response {
  const origin = resolveOrigin(req);
  const lastmod = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  const urls = getSiteRoutes()
    .map((route) => {
      const loc = escapeXml(`${origin}${route.path}`);
      return [
        "  <url>",
        `    <loc>${loc}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${route.changeFrequency}</changefreq>`,
        `    <priority>${route.priority.toFixed(1)}</priority>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
