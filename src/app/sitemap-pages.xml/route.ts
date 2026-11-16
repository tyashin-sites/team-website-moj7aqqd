import { getSiteRoutes } from "@/lib/site-routes";
import { SITE_URL } from "@/lib/schema";
import { getPageVideo, videoPoster, videoSrc } from "@/lib/page-videos";

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
 * ORIGIN = `SITE_URL` — the SAME constant `layout.tsx` (metadataBase →
 * `<link rel=canonical>`) and `schema.ts` (JSON-LD) use. The sitemap MUST list
 * the exact canonical URL of each page, so it has to share ONE origin source
 * with the canonicals; deriving it independently (e.g. from the request Host)
 * risks a sitemap-vs-canonical host mismatch that makes Google drop the URLs.
 * We do NOT read the request Host: OpenNext strips `x-forwarded-host` before the
 * route handler, and the raw dispatch Host is the workers.dev target — neither
 * is the canonical host. `SITE_URL` flips to the production host at the Phase-7
 * cutover, and the sitemap + every canonical move together. Build-time constant
 * → the route can be static.
 */
export const dynamic = "force-static";

// Normalise to a bare origin (no trailing slash) so `${ORIGIN}${path}` is clean.
const ORIGIN = SITE_URL.replace(/\/+$/, "");

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Paths the platform's content sitemap already lists. */
const PLATFORM_LISTED_PATHS = new Set(["/blog"]);

export function GET(): Response {
  // No <lastmod>: the site has no per-page change dates, and the build date
  // would tell Google every page changed on every deploy.

  const urls = getSiteRoutes()
    // /blog is served by the Tyashin platform's blog plugin, which lists it in
    // /sitemap-content.xml. Listing it here too made it the one URL in both
    // sitemaps (WCR-023).
    .filter((route) => !PLATFORM_LISTED_PATHS.has(route.path))
    .map((route) => {
      const loc = escapeXml(`${ORIGIN}${route.path}`);
      // Video sitemap entry for pages that carry a product video (same data
      // as the on-page player and the VideoObject JSON-LD: lib/page-videos.ts).
      const video = getPageVideo(route.path);
      const videoLines = video
        ? [
            "    <video:video>",
            `      <video:thumbnail_loc>${escapeXml(`${ORIGIN}${videoPoster(video)}`)}</video:thumbnail_loc>`,
            `      <video:title>${escapeXml(video.name)}</video:title>`,
            `      <video:description>${escapeXml(video.description)}</video:description>`,
            `      <video:content_loc>${escapeXml(`${ORIGIN}${videoSrc(video)}`)}</video:content_loc>`,
            `      <video:duration>${video.durationSeconds}</video:duration>`,
            `      <video:publication_date>${video.uploadDate}</video:publication_date>`,
            "      <video:family_friendly>yes</video:family_friendly>",
            "    </video:video>",
          ]
        : [];
      return [
        "  <url>",
        `    <loc>${loc}</loc>`,
        `    <changefreq>${route.changeFrequency}</changefreq>`,
        `    <priority>${route.priority.toFixed(1)}</priority>`,
        ...videoLines,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
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
