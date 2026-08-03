# Phase 3.5 — SEO Audit (adversarial, lens: seo)

Scope: the new/changed surfaces — `/features` (new), `/platform` (restructured),
`/integrations/shopify` (upgraded). Verified against DESIGN-SPEC §8 and
ASSET-DEBT #28/#14/#21/#20.

Hosts audited (node `fetch`, never curl|grep):
- Worker (code host): `https://site-thridify.snowy-cherry-cd2c.workers.dev`
- Platform (dispatch): `https://team-website-moj7aqqd.sites.tyashin.com`

## Redirect-shadow fix (the headline check)
`/features` serves **200 directly on BOTH hosts** — no 301 to `/platform`.
The legacy WordPress `/features → /platform` 301 was removed in
`next.config.ts` (commit eb95e50; the rule is gone, replaced by an explanatory
comment). Live-verified: `[200] /features loc=` (no `location` header) on both
hosts. **PASS.**

## Per-criterion results

| # | Criterion | Result |
|---|---|---|
| 1 | `/features` 200 + unique title/desc/canonical/OG | PASS — title "Features — Everything Thridify Does \| Thridify", unique desc, canonical `…/features`, OG `og:title`+`og:image` present |
| 1 | `/features` H1 ≤12 words + benefit H2s | PASS — single H1 "Everything Thridify does for your product pages" (6 words); 5 pillar H2s + FAQ + CTA H2 |
| 1 | Long-tail keyword targeting (material library / shopify 3d / ar furniture / 3d commerce analytics) | PASS — present in the per-pillar keyword leads + `keywords` meta (H2s are benefit headlines by spec §8; keywords live in leads, as designed) |
| 1 | Service + FAQPage + BreadcrumbList JSON-LD (parsed) | PASS — all 3 parse; Service.hasOfferCatalog=5 items, description defined; FAQPage=6 Qs all with acceptedAnswer.text; Breadcrumb Home>Features |
| 1 | `/features` in sitemap | PASS — worker-host `/sitemap.xml` contains `/features` |
| 2 | `/features` NOT redirecting to `/platform` | PASS — 200 direct on both hosts |
| 3 | `/integrations/shopify` 200 + Shopify-query title | PASS — "Shopify 3D Product Viewer & AR App \| Thridify"; Service.serviceType "Shopify 3D product viewer & AR app", FAQPage=4 Qs, Breadcrumb Home>Integrations>Shopify |
| 3 | Other 8 integration pages still 200 w/ own titles (spot-check 3) | PASS — woocommerce / magento / wix each 200 with unique title + full Service+FAQPage+BreadcrumbList |
| 3 | Unknown `/integrations/zzz-bad` = hard 404 | PASS — genuine 404 (dynamicParams:false SSG), not soft-200 |
| 4 | `/platform` 200 + unique title/canonical + schema intact | PASS — "Platform — 3D & AR Commerce, Five Pillars", canonical `…/platform`, entity graph (Organization + SoftwareApplication + WebSite) intact after restructure |
| 5 | One-intent-per-URL (no cannibalization) | PASS — distinct titles/H1s/descriptions: reference (`/features`) vs overview (`/platform`) vs Shopify (`/integrations/shopify`) |
| 5 | No ghost links (See all capabilities, nav/footer Features, cross-links) | PASS — every internal href on `/features` and `/platform` resolves to a real route; `/platform` "See all capabilities" → `/features` + `/features#{pillar}` anchors all valid |
| 6 | Sitemap well-formed + includes `/features` | PASS — worker `/sitemap.xml` well-formed `<urlset>`, 31 URLs incl `/features`, `/platform`, `/integrations/shopify`, `/services/3d-modelling` |
| 6 | robots.txt correct (AI allowlist + Sitemap ref) | PASS — `Allow: /`, AI-crawler allowlist (GPTBot/ClaudeBot/PerplexityBot/etc.), `Sitemap:` ref to worker host |
| — | Preview-noindex PRESENT + host-conditional | PASS — `X-Robots-Tag: noindex, nofollow` on page responses from BOTH preview hosts (worker + platform); documented as removed at Phase-7 launch |

## Non-blocking notes (tracked asset-debt / expected pre-launch)
- **`/features` + integration OG = `/og/default.png` placeholder** (ASSET-DEBT
  #14/#28). Valid OG tags present; real per-page product-render OG is a
  Phase-7 item. Minor.
- **Platform-edge sitemap** at `team-website-…sites.tyashin.com/sitemap.xml`
  (40 URLs) is edge-generated and does NOT list `/features`; the canonical
  Next sitemap on the worker host DOES. ASSET-DEBT #20; that host is noindexed
  and not the prod host. Informational.
- **Canonical + SITE_URL point at the preview worker host** (ASSET-DEBT #21) —
  single-canonical strategy pre-launch; flipped to `https://www.thridify.com`
  at Phase-7 cutover.

## Findings
Zero critical. Zero major. Zero minor blocking findings.

## VERDICT: GO
