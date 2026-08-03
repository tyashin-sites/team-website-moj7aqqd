# SEO Audit — Phase 2 industries work (r2)

- **Lens:** SEO (adversarial)
- **HEAD:** 38890ac
- **Hosts:** https://team-website-moj7aqqd.sites.tyashin.com (platform edge) + https://site-thridify.snowy-cherry-cd2c.workers.dev (Next Worker)
- **Method:** repo source + `node fetch` (no curl|grep). All findings reproduced twice on both hosts.

## Per-criterion scorecard

| # | Criterion | Result |
|---|-----------|--------|
| 1 | 6 pages: unique title/desc/canonical/OG, ≤12-word keyword H1, keyword H2s, alt text | PASS |
| 2 | Valid FAQPage + BreadcrumbList + Service JSON-LD per page; home schema | PARTIAL (industry LD perfect; home/platform have NO Organization/SoftwareApplication) |
| 3 | One-intent-per-URL, no cannibalization | PASS |
| 4 | Repo sitemap complete + well-formed (platform-edge caveat noted) | PASS |
| 5 | Internal links (related + /platform), no ghost links | PASS |
| 6 | Extraction/LLM-readiness (pain→solution→outcome, direct FAQ answers) | PASS |
| 7 | Canonical-host = preview (Phase 7 cutover) | LOGGED (not a blocker) |
| 8 | Text budgets held; education fully absent from SEO surface | PASS |
| — | Invalid-slug handling (soft-404) | FAIL (see C-1) |

## Page titles (live, verified)
- /industries/furniture — "3D Furniture Configurator & AR Viewer | Thridify"
- /industries/modular-kitchens — "Modular Kitchen 3D Design Tool & Configurator | Thridify"
- /industries/doors-and-windows — "Door & Window Configurator | Custom 3D Visualizer | Thridify"
- /industries/prefab-structures — "Prefab 3D Configurator & Modular Building Visualizer | Thridify"
- /industries/industrial-machinery — "3D Product Viewer for Machinery & Equipment | Thridify"
- /industries/laminates-surfaces — "Laminate Visualizer & Surface Finish Configurator | Thridify"

All six titles/descriptions/canonicals/OG images are unique; each has exactly one H1 (all ≤11 words) carrying the primary keyword; H2s are keyword-targeted ("How Thridify helps <industry>", "What <industry> sellers gain", "<Industry>, answered"). Schema validated live: **Service + FAQPage + BreadcrumbList** on all six, required fields present (Service.name/serviceType/provider/areaServed; FAQPage.mainEntity[].acceptedAnswer.text; BreadcrumbList 3 ordered ListItems). No duplicate/conflicting blocks.

## Findings

### CRITICAL/MAJOR

**C-1 (MAJOR) — Infinite soft-404 on the /industries/[slug] route.**
`/industries/<any-string>` returns **HTTP 200** with the not-found page body on BOTH hosts.
Evidence: `/industries/education` → 200; `/industries/nonexistent-xyz` → 200 (both 404-ish body, empty H1, home default title, ~40 KB).
Contradicts the route's own contract: `src/app/industries/[slug]/page.tsx:59` "Unknown slugs still 404 via notFound() below" and `:88 if (!ind) notFound();`. Cause: commit 38890ac swapped `dynamicParams:false` → `revalidate=3600` (ISR); under OpenNext-Cloudflare, `notFound()` on a non-prerendered dynamic segment serves the 404 UI with a 200 status. Result: an unbounded set of arbitrary URLs return 200 thin/duplicate content — a classic soft-404 + crawl-budget liability. On the production host (no preview noindex, Phase 7) these become indexable-status 200s. Fix before launch (e.g. re-add a hard-404 path for unknown slugs while keeping ISR for the 6 known ones, or return proper 404 status).

### MINOR (Phase-3-proper layer, not introduced by the industries work — logged, non-blocking)
- **m-1** Home (`/`) and `/platform` emit **no canonical** tag (live `canonical: null`) and **no Organization/SoftwareApplication JSON-LD** (live LD @types = []). Only the industry pages carry canonical + schema. Phase 3 sitewide SEO layer not yet built; criterion 2 "where expected" — flag for Phase 3.
- **m-2** `/llms.txt` → 404 on both hosts. Phase 3 deliverable, absent.
- **m-3** Crawler allowlist for OAI-SearchBot/ClaudeBot/Google-Extended/PerplexityBot not present in the served robots (platform-edge serves a generic/content-signals robots, not the repo `build/robots.txt`). Phase 3 item.

### LOGGED (pre-acknowledged, NOT findings)
- Platform-edge sitemap on `sites.tyashin.com` lists only 3 URLs (/, /contact, /about) — the known ASSET-DEBT/Phase-7 platform-edge caveat. The **repo** `src/app/sitemap.ts` is complete + well-formed and the Next Worker (workers.dev) serves the full 14-URL sitemap incl. all 6 industry pages. Verified.
- Industry canonicals + OG URLs point at the preview host via `SITE_URL` — Phase 7 cutover item (set `SITE_URL=https://www.thridify.com`).
- Preview `X-Robots-Tag: noindex, nofollow` present + host-conditional on both preview hosts (correct).

## Verified clean (adversarial checks that passed)
- No cannibalization: 6 distinct primary keywords / query clusters; H1+title aligned to each intent.
- No ghost links: every `related[]` slug resolves to a real industry; each page links to 2–3 related industries + `/platform`.
- Education fully absent from SEO surface: no education/pre-school/publishing URL, keyword, slug, or schema; only doc-comments referencing the WonderlyAR spin-out.
- FAQ answers are direct first-sentence answers ("Yes.…", "No.…", "It targets…") — extraction-ready.
- No-Faking: Guntier quote gated to modular-kitchens + doors-and-windows only (honest mapping); all other proof is canonical-metric-only (§7.2). Laminates correctly metric-only (Airolam quote still pending).
- All 6 `/og/industry-<slug>.png` resolve 200 image/png.

## Verdict
Six industry pages are, in isolation, model per-page SEO. The route that serves them emits infinite soft-404s (C-1), a live reproducible SEO defect on the audited surface.

**VERDICT: NO-GO**
Blockers: C-1 (infinite soft-404 on /industries/[slug]; unknown slugs return 200).
