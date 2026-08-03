# WordPress → Tyashin SEO Migration Map (Phase-7 cutover prep)

**Purpose.** The user's #1 migration fear is losing SEO / creating 404s for
inbound links (blogs, listings, backlinks) when `thridify.com` moves off
WordPress. This document is the **single source of truth** for the 301 redirect
map. It is implemented as `async redirects()` in `next.config.ts` (every rule
uses `statusCode: 301` — a plain 301. NOTE: Next's `permanent: true` emits a
**308**, not a 301, so the status code is set explicitly). Update this doc and
`next.config.ts` in the same commit — they must never disagree.

**Scope.** Prod `thridify.com` (WordPress) is NEVER touched before the
user-gated Phase-7 cutover. Redirects are built and verified now on the preview
Worker (`site-thridify.snowy-cherry-cd2c.workers.dev`), which nobody links to,
so shipping them is safe. Removal of the preview `noindex` is a separate
Phase-7 item and is untouched here.

**Subdomains are OUT OF SCOPE.** `admin.` `dashboard.` `arbook.` `vto.`
`learnabc.` `devadmin.` `aapastech-dev.thridify.com` are separate apps on other
hosts. `next.config.ts` redirects are path-scoped to this Worker's host and
cannot and must not touch them.

## Crawl provenance

Crawled `https://thridify.com/sitemap.xml` (index) + all 6 sub-sitemaps with a
`Mozilla/5.0` UA on 2026-08-03:

| Sub-sitemap | URLs |
|---|---|
| post-sitemap.xml | 37 (blog posts) |
| page-sitemap.xml | 23 (marketing pages) |
| elementskit_content-sitemap.xml | 1 (widget fragment) |
| category-sitemap.xml | 3 |
| post_tag-sitemap.xml | 93 (tag archives) |
| author-sitemap.xml | 3 |
| **Total in sitemaps** | **160** |

Plus GSC top-pages the user supplied that are NOT in the current sitemap (older
URLs still earning impressions/clicks — treated as high-priority): `/home/`,
`/features/`, `/about/`, `/demo/`, `/contact-us/`, `/terms-of-service/`,
`/modular-furniture/`, `/big-commerce/`.

## Trailing-slash behavior (verified live)

New site is `trailingSlash: false` (default). Verified on the Worker:
`/about/` → **308** → `/about` (200); `/nope/` → 308 → `/nope` (404). So Next
normalizes the trailing slash FIRST, then evaluates `redirects()`. Therefore
all redirect **sources are written WITHOUT a trailing slash**. An inbound WP
link `/about-us/` resolves as: **308 `/about-us/`→`/about-us`, then 301
`/about-us`→`/about`** — a non-lossy two-hop chain (Google passes equity through
308+301). Native routes whose path is unchanged (`/`, `/contact`) need no rule;
their trailing-slash variant just 308-normalizes and serves 200.

---

## Disposition table

Disposition legend: **KEEP** = path unchanged on new site (no rule needed);
**301** = clean redirect to an existing new route; **301(GAP)** = interim
redirect to an existing route because the ideal destination page does not exist
yet (tagged TODO in `next.config.ts`); **FLAG** = needs a user decision;
**HOLD** = intentionally not redirected in code (documented decision).

GSC metrics: c=clicks, i=impressions, p=avg position (as supplied by the user).

### A. Core pages

| Prod URL | GSC | Disposition | Target | Notes |
|---|---|---|---|---|
| `/` | 642c | KEEP | `/` | Home unchanged |
| `/home/` | — | 301 | `/` | WP alias of home |
| `/about-us/` | 25c p3.9 | 301 | `/about` | |
| `/about/` | — | KEEP | `/about` | Already the native route (308→200) |
| `/features/` | — | KEEP | `/features` | Now a REAL page — the 5-pillar capability reference (SHIPPED 2026-08-03). The old → `/platform` 301 was REMOVED from `next.config.ts` |
| `/demo/` | — | 301 | `/contact` | `/contact` carries the demo form + Calendly. Fragment `/#demo` exists but hash redirects are unreliable |
| `/contact/` | — | KEEP | `/contact` | Native route |
| `/contact-us/` | — | 301 | `/contact` | |
| `/faq/` | 5c 1259i | 301 | `/what-is-thridify` | Fact page carries FAQPage schema |
| `/pricing-plans/` | — | 301 | `/services/3d-modelling` | No pricing page on new site; the service page carries the commercial offer/turnaround. TODO(phase7): consider a real `/pricing` page |

### B. Industries

| Prod URL | GSC | Disposition | Target | Notes |
|---|---|---|---|---|
| `/furniture/` | 15c 8148i p41 | 301 | `/industries/furniture` | High impressions |
| `/doors-and-windows/` | 2c | 301 | `/industries/doors-and-windows` | |
| `/modular-furniture-laminates/` | — | 301 | `/industries/laminates-surfaces` | Laminates intent |
| `/modular-furniture/` | — | 301 | `/industries/modular-kitchens` | Kitchens/wardrobes intent |

New industries without a legacy WP equivalent (no inbound URL to preserve):
`/industries/prefab-structures`, `/industries/industrial-machinery`,
`/industries` index. No rule needed.

### C. Product / capability pages

| Prod URL | GSC | Disposition | Target | Notes |
|---|---|---|---|---|
| `/ar-viewer/` | 26c 3106i p24 | 301(GAP) | `/platform` | High value. TODO(phase7): dedicated `/ar-viewer` page |
| `/3d-product-configurator/` | 11c 3622i | 301(GAP) | `/platform` | TODO(phase7): dedicated `/3d-configurator` page |

### D. Integrations — RESOLVED (real per-platform pages now exist)

**BUILT (2026-08-03).** 9 real integration landing pages at
`/integrations/<slug>` (typed data `src/lib/integrations.ts` +
`src/app/integrations/[slug]/page.tsx`, mirroring the `/industries/[slug]`
SSG pattern: `generateStaticParams` + `dynamicParams=false`, unique
title/desc/canonical/OG + Service/FAQPage/BreadcrumbList JSON-LD each). Each old
WordPress integration URL now 301s to its dedicated page (no longer interim
`/platform`), preserving its specific ranking intent. Spelling variants map to
the canonical slug. A `/integrations` hub index lists all 9 and is in the
sitemap + footer.

| Prod URL | GSC | Disposition | Target |
|---|---|---|---|
| `/woocommerce/` | 16c 4415i | 301 | `/integrations/woocommerce` |
| `/shopify/` | 9c 2041i | 301 | `/integrations/shopify` |
| `/magento/` | 2c 3334i | 301 | `/integrations/magento` |
| `/wix-commerce/` | 6c 1065i | 301 | `/integrations/wix` |
| `/bigcommerce/` | 3c | 301 | `/integrations/bigcommerce` |
| `/big-commerce/` | — | 301 | `/integrations/bigcommerce` (spelling variant) |
| `/commercetools/` | — | 301 | `/integrations/commercetools` |
| `/canva/` | — | 301 | `/integrations/canva` |
| `/custom-integration/` | 366i | 301 | `/integrations/custom-integration` |

Note: `/3d-product-configurator/` (§C, 11c 3622i) remains 301 → `/platform` —
it is a generic configurator query, not platform-specific, so `/platform`
(which hosts the configurator deep-dive) is the honest destination.

### E. Legal

| Prod URL | Disposition | Target |
|---|---|---|
| `/privacy-policy/` | 301 | `/privacy` |
| `/terms-condition-policy/` | 301 | `/terms` |
| `/terms-of-service/` | 301 | `/terms` |

### F. Help center — GAP

| Prod URL | Disposition | Target | Notes |
|---|---|---|---|
| `/thridify-help-center/` | 301(GAP) | `/contact` | No help center on the marketing site. Most help content is custom-domain setup docs that belong to the education/arbook product (**WonderlyAR**), not Thridify marketing |
| `/post/category/thridify-help-center/` | HOLD | — | Archive of the help docs; see §H education decision |

### G. Blog — RESOLVED (2026-08-03: 37 posts migrated 1:1, /post/* redirects live)

**RESOLVED.** The 37 WordPress blog posts were migrated **1:1 into the Blog/CMS
plugin at MATCHING slugs** and now serve **live at `/blog/<slug>`** off the
platform edge (verified: `/blog` 200, e.g.
`/blog/5-signals-that-3d-commerce-has-crossed-the-tipping-point-in-2026` 200).
Slugs are PRESERVED from WordPress, so the migration is non-lossy: old
`/post/<slug>` 301s to the identically-slugged `/blog/<slug>`. The archive URLs
(tag / author / category) are low-value and consolidate to the `/blog` index.

| Prod URL(s) | Disposition | Target | Notes |
|---|---|---|---|
| `/blogs/` | 301 | `/blog` | Index → index (safe) |
| `/blog/` | KEEP | `/blog` | Native/platform route — now the live migrated blog (200) |
| `/post/<slug>/` × 37 | **301** | `/blog/<slug>` | 1:1, slug preserved. `/post/:slug` rule (LAST, single-segment) in `next.config.ts` |
| `/post/tag/<t>/` × 93 | 301 | `/blog` | Tag archives → blog index (`/post/tag/:tag`) |
| `/post/category/{blog,uncategorized,thridify-help-center}/` × 3 | 301 | `/blog` | Category archives (`/post/category/:cat`) |
| `/post/author/{shikha-gupta,nikitha-dkaapastech-com,er-shashankuppalgmail-com}/` × 3 | 301 | `/blog` | Author archives (`/post/author/:author`) |
| `/category/blog` + `/category/blog/page/<n>` | 301 | `/blog` | WP category alias + its pagination |
| `/post/elementskit-content/dynamic-content-widget-…/` × 1 | HOLD/410 | — | Elementor widget fragment, not a real page — should 410/drop (matches `/post/category/:cat`? no — 3 segments; falls through, left to 410 at cutover) |

**Redirect ordering (load-bearing).** In `next.config.ts` the multi-segment
archive rules (`/post/tag/:tag`, `/post/author/:author`, `/post/category/:cat`,
`/category/blog/page/:n`, `/category/blog`) are placed **BEFORE** the
single-segment `/post/:slug` → `/blog/:slug` catch. Next evaluates `redirects()`
top-to-bottom (first match wins); without this order `:slug` would swallow
`/post/tag/roi` (`:slug`="tag") and mis-301 it to `/blog/tag`.

**The 1:1 migration** is exactly the non-lossy fix the prior HOLD note called
for: the posts are no longer served by WordPress-only and do NOT 404 at cutover.
Several rank on real intent (e.g. `…what-is-a-3d-product-configurator…`, the
laminate / kitchen / configurator cluster) — their equity is preserved via the
per-slug 301 to the same slug under `/blog`.

**Education/WonderlyAR flag (unchanged).** 8 of the 37 posts are
education/custom-domain HELP docs (`connect-your-custom-domain-to-ar-education`,
`how-to-connect-your-{godaddy,cloudflare,google-domains,namecheap}-custom-domain-with-thridify`,
`general-dns-setup-guide…`, `custom-domain-troubleshooting-guide…`) that
logically belong to **WonderlyAR** (§H), not the Thridify marketing blog.
WonderlyAR is deferred per user, so these **remain in the blog for now** —
flagged, not removed. Re-home them to WonderlyAR when that brand/domain lands.

Note: 8 of the 37 posts are education/custom-domain HELP docs
(`connect-your-custom-domain-to-ar-education`,
`how-to-connect-your-{godaddy,cloudflare,google-domains,namecheap}-custom-domain-with-thridify`,
`general-dns-setup-guide…`, `custom-domain-troubleshooting-guide…`) — these
belong to WonderlyAR (§H), not the Thridify marketing blog.

### H. Education (WonderlyAR decouple) — RESOLVED (2026-08-03: 301 to wonderlyar.com)

DESIGN-SPEC §6: AR-for-education is spun out to a separate brand, **WonderlyAR**,
and MUST NOT appear on the Thridify site. This cluster has real earned equity and
must not be silently dropped.

**RESOLVED.** WonderlyAR is now **LIVE at https://wonderlyar.com** (verified 200,
"WonderlyAR - AR Learning Platform for Early Childhood Education"). The education
footprint is small + precise (verified via the thridify.com WP REST API), and each
piece now **301s OFF-SITE to wonderlyar.com** in `next.config.ts` (was interim →
`/` Thridify home). External absolute destinations use `basePath: false`. These are
redirects only — no education content renders on Thridify.

| Prod URL(s) | GSC | Disposition | Target | Notes |
|---|---|---|---|---|
| `/ar-in-education/` | 8c 938i | **301** | `https://wonderlyar.com` | Marketing page. `basePath:false` off-site rule (was interim → `/`) |
| `/post/connect-your-custom-domain-to-ar-education` | — | **301** | `https://wonderlyar.com` | The ONE education blog post among the 37. SPECIFIC rule BEFORE the `/post/:slug` → `/blog/:slug` wildcard (first match wins). Still published at `/blog/…` on Thridify — flagged to orchestrator to unpublish via blog API (needs JWT) |
| `/post/tag/ar-education-custom-domain` | — | **301** | `https://wonderlyar.com` | Education tag archive. SPECIFIC rule BEFORE `/post/tag/:tag` → `/blog` |
| `/post/tag/ar-education-domain-connection` | — | **301** | `https://wonderlyar.com` | Education tag archive (as above) |
| `/post/tag/ar-education-domain-setup` | — | **301** | `https://wonderlyar.com` | Education tag archive (as above) |

**Education tag identification.** Fetched the live tag list from
`thridify.com/wp-json/wp/v2/tags?per_page=100&_fields=slug` (Mozilla UA) and matched
against the education regex
(`education|ar-education|ar-book|arbook|flashcard|learning|pre-school|preschool|nursery|kids|children|early-child|publish`).
EXACTLY three tag slugs match — all `ar-education-*`
(`ar-education-custom-domain`, `ar-education-domain-connection`,
`ar-education-domain-setup`). The `cname-*` / `dns-*` / `custom-domain-*` tags are
Thridify PLATFORM custom-domain how-tos (not education) and correctly keep → `/blog`
via the `/post/tag/:tag` wildcard.

**Residual (orchestrator, needs JWT).** The single education post
`connect-your-custom-domain-to-ar-education` was migrated with the other 36 and is
still PUBLISHED at `/blog/connect-your-custom-domain-to-ar-education` on the Thridify
blog. It should be UNPUBLISHED/deleted from the Thridify blog
(`DELETE /api/v1/blog/projects/:id/posts/:postId`) so no education content lives on
Thridify. The old `/post/…` URL already 301s off-site; the `/blog/…` copy remains
until unpublished. The other 6 custom-domain help posts are Thridify platform how-tos
and correctly remain in the blog.

### I. Misc / non-page

| Prod URL | Disposition | Notes |
|---|---|---|
| `/post/elementskit-content/dynamic-content-widget-…/` | 410/HOLD | Elementor fragment; not indexable content. Recommend GONE (410) at cutover |
| `wp-content/uploads/*` ranking image URLs | HOLD | Not in scope for `next.config` path redirects; if specific image URLs rank, re-host the asset at the same path or 301 the specific file at cutover. None are known/enumerated yet — needs a GSC image-report export from the user |

---

## Summary

- **160 URLs** in the WordPress sitemaps + 8 GSC-only legacy URLs cross-referenced.
- **Implemented redirect rules in `next.config.ts`: 38** (all 301). Breakdown:
  core 7, industries 4, capability 2, integrations 9 (now → real
  `/integrations/*` pages), legal 3, blog 8 (`/blogs` + `/category/blog` +
  `/category/blog/page/:n` + `/post/tag/:tag` + `/post/author/:author` +
  `/post/category/:cat` archives → `/blog`, plus the education post
  `/post/connect-your-custom-domain-to-ar-education` → wonderlyar.com off-site
  BEFORE the `/post/:slug` → `/blog/:slug` 1:1 wildcard for the 37 migrated posts),
  help-center 1 (GAP), education 4 (`/ar-in-education` + 3 `ar-education-*` tag
  archives, all **301 off-site to wonderlyar.com**, `basePath:false`).
- **KEEP-SAME (no rule needed): `/`, `/about`, `/contact`** (+ their trailing-slash
  308 variants).
- **Clean 301s (destination page exists & is a true match): 26** — core (7),
  industries (4), legal (3), blog-index (1), the two capability rows that land on
  the real `/platform`, **plus the 9 integration rows now landing on their real
  `/integrations/<slug>` pages (built 2026-08-03)**.
- **GAP rows needing NEW pages before they're truly "clean": 3** — `/pricing-plans`
  (no pricing page), the 2 capability pages (`/ar-viewer`, `/3d-product-configurator`
  could get dedicated pages), + help-center. **Integrations no longer a GAP.**
- **Blog migration RESOLVED (2026-08-03):** the 37 posts are migrated 1:1 to
  `/blog/<slug>` (slugs preserved, live) and `/post/*` now 301s in code (posts →
  same-slug `/blog/<slug>`; tag/author/category archives → `/blog`). Only the
  single Elementor widget fragment remains HOLD/410.

## Decisions needed from the user

1. ~~**Education / WonderlyAR equity.**~~ **RESOLVED (2026-08-03).** WonderlyAR is
   LIVE at **https://wonderlyar.com**. The precise education footprint (verified via
   the WP REST API) now 301s off-site there: `/ar-in-education`, the one education
   post `/post/connect-your-custom-domain-to-ar-education`, and the three
   `ar-education-*` tag archives (all `basePath:false` in `next.config.ts`). See §H.
   STILL OPEN (orchestrator, needs JWT): unpublish the 1 education post from the
   Thridify blog (`/blog/connect-your-custom-domain-to-ar-education`).
2. ~~**Build integration pages?**~~ **DONE (2026-08-03).** 9 real
   `/integrations/<slug>` pages built (woocommerce, shopify, wix, bigcommerce,
   magento, commercetools, canva, wordpress, custom-integration) + a
   `/integrations` hub; every old integration URL now 301s to its dedicated page.
   No further user decision needed here.
3. ~~**Blog migration.**~~ **DONE (2026-08-03).** The 37 WP posts were migrated
   1:1 into the Blog/CMS plugin at matching slugs and serve live at
   `/blog/<slug>`; `/post/<slug>` → `/blog/<slug>` (per-slug 301) + the
   tag/author/category archives → `/blog` are live in `next.config.ts`. STILL
   OPEN: the 8 education/custom-domain help posts among the 37 logically belong
   to WonderlyAR (§H) but remain in the blog for now (WonderlyAR deferred per
   user) — re-home them when that brand lands.
4. **`/pricing-plans` target.** Interim → `/services/3d-modelling`. Build a real
   `/pricing` page, or keep routing pricing intent to the service/contact flow?
5. **Ranking image URLs.** If any `wp-content/uploads/*` images rank, export the
   GSC image report so those specific asset URLs can be preserved/301'd at cutover.

## Phase-7 cutover checklist additions (redirect-specific)

- This map + `next.config.ts redirects()` is the redirect source of truth.
- Before cutover: resolve the 5 decisions above; migrate blog posts; build (or
  consciously defer) integration pages; obtain the WonderlyAR domain.
- At cutover verify a sample of old→new 301s resolve on the **production** host
  with `node fetch redirect:'manual'` (not `curl|grep` — gzip false-negative).
</content>
</invoke>
