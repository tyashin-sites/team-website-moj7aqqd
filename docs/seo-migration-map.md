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
| `/features/` | — | 301 | `/platform` | Platform = the feature suite |
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

### D. Integrations — GAP (no per-integration pages exist yet)

All interim → `/platform`. **Recommendation: BUILD real integration pages**
(`/integrations/<platform>`); several carry real impressions. Repoint each when
built.

| Prod URL | GSC | Disposition | Target |
|---|---|---|---|
| `/woocommerce/` | 16c 4415i | 301(GAP) | `/platform` |
| `/shopify/` | 9c 2041i | 301(GAP) | `/platform` |
| `/magento/` | 2c 3334i | 301(GAP) | `/platform` |
| `/wix-commerce/` | 6c 1065i | 301(GAP) | `/platform` |
| `/bigcommerce/` | 3c | 301(GAP) | `/platform` |
| `/big-commerce/` | — | 301(GAP) | `/platform` (spelling variant) |
| `/commercetools/` | — | 301(GAP) | `/platform` |
| `/canva/` | — | 301(GAP) | `/platform` |
| `/custom-integration/` | 366i | 301(GAP) | `/platform` |

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

### G. Blog — GAP (posts NOT bulk-redirected)

| Prod URL(s) | Disposition | Target | Notes |
|---|---|---|---|
| `/blogs/` | 301 | `/blog` | Index → index (safe) |
| `/blog/` | KEEP | `/blog` | Native route (placeholder today) |
| `/post/<slug>/` × 37 | **HOLD** | — | See recommendation below |
| `/post/tag/<t>/` × 93 | HOLD | — | Tag archives |
| `/post/category/{blog,uncategorized,thridify-help-center}/` × 3 | HOLD | — | Category archives |
| `/post/author/{shikha-gupta,nikitha-dkaapastech-com,er-shashankuppalgmail-com}/` × 3 | HOLD | — | Author archives |
| `/post/elementskit-content/dynamic-content-widget-…/` × 1 | HOLD/410 | — | Elementor widget fragment, not a real page — should 410/drop |

**Why the 37 posts are HELD, not redirected to `/blog`:** redirecting many
distinct content URLs to a single unrelated index is a **soft-404** pattern —
Google does NOT pass equity and may treat it as a broken redirect. Several posts
rank on real intent (e.g. `…what-is-a-3d-product-configurator…`, the laminate /
kitchen / configurator cluster). The correct fix is a **1:1 migration**: import
the 37 posts into the Blog/CMS plugin at matching slugs (ideally keep the
`/post/<slug>/` path, or map `/post/<slug>` → `/blog/<slug>` with a per-slug
301 table generated at migration time). Until that happens the posts must keep
being served by WordPress OR they 404 at cutover. **This is a Phase-7 blocker.**

Note: 8 of the 37 posts are education/custom-domain HELP docs
(`connect-your-custom-domain-to-ar-education`,
`how-to-connect-your-{godaddy,cloudflare,google-domains,namecheap}-custom-domain-with-thridify`,
`general-dns-setup-guide…`, `custom-domain-troubleshooting-guide…`) — these
belong to WonderlyAR (§H), not the Thridify marketing blog.

### H. Education (WonderlyAR decouple) — FLAG for user

DESIGN-SPEC §6: AR-for-education is being spun out to a separate brand,
**WonderlyAR**, and MUST NOT appear on the Thridify site. But this cluster has
real earned equity and must not be silently dropped.

| Prod URL(s) | GSC | Disposition | Interim target | Notes |
|---|---|---|---|---|
| `/ar-in-education/` | 8c 938i | FLAG | `/` (interim HOLD redirect) | Replace with 301 to the WonderlyAR domain once it exists |
| education help posts (8, see §G) | — | HOLD | — | Move to WonderlyAR with the product |
| `ar-education-*` / `cname-*` / `dns-*` / `custom-domain-*` tags (~30 of the 93) | — | HOLD | — | Education/help tag archives |
| `/post/author/*` | — | HOLD | — | Authorship spans both brands |

### I. Misc / non-page

| Prod URL | Disposition | Notes |
|---|---|---|
| `/post/elementskit-content/dynamic-content-widget-…/` | 410/HOLD | Elementor fragment; not indexable content. Recommend GONE (410) at cutover |
| `wp-content/uploads/*` ranking image URLs | HOLD | Not in scope for `next.config` path redirects; if specific image URLs rank, re-host the asset at the same path or 301 the specific file at cutover. None are known/enumerated yet — needs a GSC image-report export from the user |

---

## Summary

- **160 URLs** in the WordPress sitemaps + 8 GSC-only legacy URLs cross-referenced.
- **Implemented redirect rules in `next.config.ts`: 28** (all 301). Breakdown:
  core 7, industries 4, capability 2, integrations 9 (GAP), legal 3, blog-index 1,
  help-center 1 (GAP), education 1 (FLAG/interim).
- **KEEP-SAME (no rule needed): `/`, `/about`, `/contact`** (+ their trailing-slash
  308 variants).
- **Clean 301s (destination page exists & is a true match): 17** — core (7),
  industries (4), legal (3), capability targets that are honest fits, blog-index (1),
  plus the two capability pages land on the real `/platform`.
- **GAP rows needing NEW pages before they're truly "clean": 12** — 9 integration
  pages, `/pricing-plans` (no pricing page), 2 capability pages (`/ar-viewer`,
  `/3d-product-configurator` deserve dedicated pages), + help-center.
- **HOLD (deliberately not redirected in code): ~133 blog/tag/category/author/
  fragment URLs** — require 1:1 blog migration (Phase-7 blocker).

## Decisions needed from the user

1. **Education / WonderlyAR equity (highest priority).** `/ar-in-education/`
   (8c/938i) + ~30 education tags + 8 help posts + help-center category. Options:
   (a) hold-redirect to `/` now and 301 to the WonderlyAR domain once it exists
   (current interim), (b) provide the WonderlyAR domain now so we point 301s
   there, (c) explicitly accept letting this equity lapse. **Need the WonderlyAR
   destination domain (or a decision).**
2. **Build integration pages?** `/woocommerce` (4415i), `/magento` (3334i),
   `/shopify` (2041i), `/custom-integration` (366i) etc. currently interim-301 to
   `/platform`. Building `/integrations/<platform>` pages would preserve their
   specific ranking intent. Approve building them (Phase 4/5 content work)?
3. **Blog migration.** Approve migrating the 37 WP posts 1:1 into the Blog/CMS
   plugin (keeping slugs) before cutover — this is the only non-lossy option and
   is a Phase-7 blocker. Also confirm whether the 8 education/custom-domain help
   posts move to WonderlyAR instead.
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
