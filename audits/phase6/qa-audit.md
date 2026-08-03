# Phase 6 — Full-Site Confidence Gate — QA Audit

Auditor: QA (adversarial). Date: 2026-08-03.
Hosts audited (node fetch, never curl|grep):
- worker  = https://site-thridify.snowy-cherry-cd2c.workers.dev
- platform = https://team-website-moj7aqqd.sites.tyashin.com

## Gate criteria — pass/fail

| # | Criterion | Result |
|---|-----------|--------|
| 1 | Local `npm run build` green | PASS (exit 0) |
| 1 | `tsc --noEmit` clean | PASS (exit 0) |
| 1 | Latest CI run success | PASS (run 30793825760, success, 2m21s) |
| 2 | Every route 200 on BOTH hosts (34 routes) | PASS (68/68) |
| 2 | Unknown slugs → genuine 404 branded page | PASS (8/8; brand+home-link+404 copy) |
| 2 | noindex host-conditional on every response incl 404 | PASS (present on all preview responses; source keys on `.workers.dev`/`.sites.tyashin.com`; prod thridify.com untouched) |
| 3 | Internal-link sweep, no ghost links | PASS (42 unique hrefs, 0 broken on worker host) |
| 3 | Arrow-literal check (no leaked \u escapes) | PASS (0 `\u` escapes; raw `→` is per DESIGN-SPEC §7 "Explore →", all aria-hidden) |
| 3 | Old WP URL 301 spot-checks | PASS (9/9 → 200 targets) |
| 4 | POST /api/contact happy 200 + invalid 400 | PASS (both hosts: 200 / 400×3) |
| 4 | "Book a Demo" → calendly hello-thridify/30min new tab | PASS (4 CTAs, target=_blank rel=noopener) |
| 4 | Secondary "Try the live demo" → #demo | PASS (link + id="demo" anchor) |
| 5 | Poster-first (no model-viewer/GLB in initial HTML) | PASS (home/platform/integration: 0 model-viewer elements, 0 mv-script) |
| 5 | AR QR + posters serve 200 | PASS (ar-qr-chair.svg + all 6 posters 200) |
| 5 | Chair default finish = Coral (no green pop) | PASS (FINISHES[0]=Coral #F13400, active=useState(0); Forest #007050 is idx 1) |
| 6 | Custom 404 real status + error boundaries present | PASS (not-found.tsx / error.tsx / global-error.tsx) |
| 6 | Zero console ERRORS on key routes | PASS (real headless-Chrome CDP: 0 errors on /, /industries/furniture, /integrations/shopify, /platform, /what-is-thridify) |
| 7 | Brand/client logos, posters, OG PNGs serve 200; no _next/image 400s | PASS (all 200; 0 _next/image refs — self-hosted unoptimized) |
| 8 | Rollback readiness / prod untouched | PASS (all work on preview project; redirect map + noindex are the only cutover-coupled pieces) |

## Route status summary
- Known routes: 34 × 2 hosts = 68 checks → 68 × 200. 0 failures.
- Unknown slugs: 4 × 2 hosts = 8 checks → 8 × 404 (as expected), branded not-found.
- noindex `X-Robots-Tag: noindex, nofollow` present on all 76 preview responses; middleware host-conditional (prod thridify.com would serve index,follow).

## Link sweep
42 unique internal hrefs across all pages, all 200 on the worker host. External links
correct: calendly.com/hello-thridify/30min, socials (linkedin/instagram/facebook/youtube),
wa.me/919667747082 + wa.me/14378000190. Zero ghost links.

## Documented Phase-7 platform-admin items (NOT repo defects — per contract)
Verified reproducing the documented ASSET-DEBT behavior, logged here for cutover:
- **#17 /blog edge** — worker host /blog = 200; platform host /blog = 404 (no X-Robots-Tag
  → platform edge intercepts before our Worker). Ownership override to `storefront` at Phase 7.
- **#20 robots/llms/sitemap edge** — worker host: robots ours (AI-bot allowlist + Sitemap),
  llms.txt 200, sitemap 30 URLs. Platform host: platform-generic robots, llms.txt 404,
  sitemap 3 URLs. Same ownership-override fix at Phase 7.
- **#21 SITE_URL** — canonical/OG/llms URLs still point at preview host; flip at cutover.
None of these are repo defects: the canonical preview surface (workers.dev per BUILD-PLAN §1)
serves everything correctly, and each has a defined platform-admin action at Phase 7.

## Findings
None. Zero critical, zero major, zero minor confirmed defects.

## VERDICT: GO
