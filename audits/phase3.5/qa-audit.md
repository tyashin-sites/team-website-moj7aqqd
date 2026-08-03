# Phase 3.5 — QA Audit (feature-surface build)

Lens: QA. Scope: /features (new), /platform (restructured), /integrations/shopify
+ all 9 integration pages (shared integrations.ts model changed), src/lib/features.ts.
Verified on BOTH hosts via node fetch (never curl|grep). Date: 2026-08-03.

- Worker host:   https://site-thridify.snowy-cherry-cd2c.workers.dev
- Platform host: https://team-website-moj7aqqd.sites.tyashin.com

## Gate criteria — pass/fail

| # | Criterion | Result |
|---|-----------|--------|
| 1 | `npm run build` green (node v20.13.1) | PASS — exit 0, 39/39 static pages |
| 1 | `tsc --noEmit` clean | PASS — exit 0 |
| 1 | Latest CI run success | PASS — run 30839636935 `fix(redirects)…` success 1m59s |
| 2 | /features 200 AND not redirecting to /platform | PASS — direct 200, no Location; next.config has NO /features rule (removed, comment only) |
| 2 | /platform 200 | PASS (both hosts) |
| 2 | All 9 /integrations/<slug> 200 (shared model change) | PASS — woocommerce/shopify/wix/bigcommerce/magento/commercetools/canva/wordpress/custom-integration all 200 both hosts |
| 2 | /integrations index 200 | PASS both hosts |
| 2 | Unknown /integrations/zzz + /features-fake → 404 | PASS — both 404 both hosts |
| 3 | Regression: home, about, contact, 6 industries, 3 compare, what-is-thridify, services/3d-modelling, privacy, terms, security | PASS — all 200 both hosts |
| 3 | noindex host-conditional every route incl 404 | PASS — X-Robots-Tag: noindex,nofollow on every route + both 404s, both preview hosts (host-conditional; absent on prod is a Phase-7 item) |
| 3 | Zero empty CTAs | PASS — 0 empty btn candidates on all 3 target pages |
| 3 | Calendly + "Try the live demo"→/#demo intact | PASS — calendly.com/hello-thridify + href="/#demo" present on all 3 |
| 3 | Demos poster-first (no GLB/model-viewer in initial HTML) | PASS — /features/platform/shopify: model-viewer=false, .glb=false in initial HTML |
| 4 | Schema JSON-LD parses on /features, /platform, /integrations/shopify | PASS — /features 5 blocks [Organization,SoftwareApplication,Service,FAQPage,BreadcrumbList]; /platform 3 [Organization,SoftwareApplication,WebSite]; /integrations/shopify 5. All JSON.parse OK |
| 5 | Features nav + footer link resolve | PASS — site.json nav "Features"→/features + footer "All features"→/features; both 200 |
| 5 | "See all capabilities →" resolves | PASS — /platform → /features#studio (200); arrow is a lucide SVG, not a literal |
| 5 | No ghost links | PASS — every internal href across the 4 pages resolves 200 (33 unique paths) |
| 5 | No arrow-literal (→/←/\u) regressions in rendered HTML | PASS — 0 literal arrows in visible body / JSON-LD; link chevrons are `<svg>` icons |
| 6 | Sitemap /features present, well-formed | PASS on worker host — 31 URLs, well-formed, /features present (priority 0.85) |

## Findings

None (critical/major/minor).

### Informational — known asset-debt, NOT findings
- On the platform host `…sites.tyashin.com`, `/sitemap.xml` is edge-owned
  (40 URLs, no `/features`) — the site's own Worker sitemap is served
  correctly on the raw worker host. Documented: ASSET-DEBT #20 (set per-page
  ownership override to `storefront` for /sitemap.xml at Phase 7). Pre-existing
  platform-edge behavior, not a regression from this feature-surface build.
- /features OG uses the brand placeholder `/og/default.png` (ASSET-DEBT #28).

## Verdict

Zero critical, zero major, zero minor findings. Build + tsc + CI green; every
route resolves correctly on both hosts; shared integrations.ts model change
broke none of the 9 pages; schema valid; no ghost links; demos poster-first.

VERDICT: GO
