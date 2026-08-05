import { INDUSTRY_SLUGS } from "@/lib/industries";
import { INTEGRATION_SLUGS } from "@/lib/integrations";
import { COMPETITOR_SLUGS } from "@/lib/comparisons";

/**
 * SINGLE SOURCE OF TRUTH for the site's indexable URL tree.
 *
 * Why this file exists: the Tyashin platform serves `/sitemap.xml` as a
 * sitemap-INDEX and had NO knowledge of this site's Next.js route tree, so it
 * only ever listed 4 URLs. This module enumerates EVERY indexable page the
 * site actually serves, derived from the SAME data modules each dynamic
 * route's `generateStaticParams` uses, so the sitemap and the prerendered
 * pages can never drift.
 *
 * BOTH consumers read from here:
 *  - `src/app/sitemap-pages.xml/route.ts` renders every route below as XML.
 *  - each `[slug]/page.tsx` `generateStaticParams` calls the `*StaticParams()`
 *    helpers below, which are DERIVED FROM the very list emitted to the
 *    sitemap — so a page that isn't in the sitemap literally cannot be
 *    prerendered, and vice versa.
 *
 * EXCLUDED on purpose (not indexable — do not add them here):
 *  - `/gallery` — component gallery, `robots: { index: false }` + robots.txt
 *    Disallow. It is not part of the public site.
 *  - `/blog/[slug]` — blog POSTS are platform-owned data and belong in the
 *    platform's own content sitemap, NOT this page sitemap. `/blog` (the
 *    index) IS included.
 *  - route-group-only / utility routes (`/api/*`, `robots.txt`, `llms.txt`,
 *    this sitemap route itself).
 *
 * Do NOT create `app/sitemap.ts` (path `/sitemap.xml`) — the platform owns
 * that path and index-references this one.
 */

export type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export interface SiteRoute {
  /** Root-relative path, always starting with `/`, no trailing slash (except `/`). */
  path: string;
  priority: number;
  changeFrequency: ChangeFrequency;
}

/**
 * Every STATIC indexable page in `src/app/**\/page.tsx`.
 * Keep in lockstep with the app tree: a `page.tsx` that renders an indexable
 * page and is missing here is the exact bug this file fixes.
 */
const STATIC_ROUTES: SiteRoute[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/platform", priority: 0.9, changeFrequency: "weekly" },
  { path: "/services/3d-modelling", priority: 0.9, changeFrequency: "monthly" },
  { path: "/features", priority: 0.85, changeFrequency: "monthly" },
  { path: "/what-is-thridify", priority: 0.8, changeFrequency: "monthly" },
  { path: "/industries", priority: 0.8, changeFrequency: "monthly" },
  { path: "/integrations", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
  { path: "/security", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

const INDUSTRY_ROUTES: SiteRoute[] = INDUSTRY_SLUGS.map((slug) => ({
  path: `/industries/${slug}`,
  priority: 0.8,
  changeFrequency: "monthly" as const,
}));

const INTEGRATION_ROUTES: SiteRoute[] = INTEGRATION_SLUGS.map((slug) => ({
  path: `/integrations/${slug}`,
  priority: 0.8,
  changeFrequency: "monthly" as const,
}));

const COMPARE_ROUTES: SiteRoute[] = COMPETITOR_SLUGS.map((slug) => ({
  path: `/compare/${slug}`,
  priority: 0.7,
  changeFrequency: "monthly" as const,
}));

/**
 * The complete, ordered list of indexable site paths. This is THE list the
 * page sitemap emits and from which the dynamic-route static params are
 * derived.
 */
export function getSiteRoutes(): SiteRoute[] {
  return [
    ...STATIC_ROUTES,
    ...INDUSTRY_ROUTES,
    ...INTEGRATION_ROUTES,
    ...COMPARE_ROUTES,
  ];
}

/**
 * Derive `generateStaticParams()` output for a `[slug]` segment DIRECTLY from
 * the emitted site routes, so the prerendered param set and the sitemap can
 * never diverge. `prefix` is the parent path, e.g. `/industries`.
 */
function slugParamsForPrefix(prefix: string): Array<{ slug: string }> {
  const withSlash = `${prefix}/`;
  return getSiteRoutes()
    .filter((r) => r.path.startsWith(withSlash))
    .map((r) => ({ slug: r.path.slice(withSlash.length) }));
}

/** `/industries/[slug]` → the 6 canonical verticals, from the sitemap list. */
export const industryStaticParams = (): Array<{ slug: string }> =>
  slugParamsForPrefix("/industries");

/** `/integrations/[slug]` → the 12 integrations, from the sitemap list. */
export const integrationStaticParams = (): Array<{ slug: string }> =>
  slugParamsForPrefix("/integrations");

/** `/compare/[slug]` → the competitor comparisons, from the sitemap list. */
export const compareStaticParams = (): Array<{ slug: string }> =>
  slugParamsForPrefix("/compare");
