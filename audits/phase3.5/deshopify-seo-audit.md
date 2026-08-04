# Phase 3.5 — SEO lens audit: 3 new integrations + Magento→Adobe relabel + de-Shopify /features

Auditor: adversarial SEO lens. Hosts: worker `site-thridify.snowy-cherry-cd2c.workers.dev`
(our code serves) + platform `team-website-moj7aqqd.sites.tyashin.com` (HTML dispatch).
Method: `node fetch` (never curl|grep). Scope = deltas only.

## New page titles (worker host)
- /integrations/drupal      → "3D & AR Product Viewer for Drupal Commerce | Thridify"
- /integrations/squarespace → "3D & AR Product Viewer for Squarespace | Thridify"
- /integrations/prestashop  → "3D Product Configurator & AR for PrestaShop | Thridify"

## Redirect
- /adobe-commerce → 301 → /integrations/magento  (Location verified, worker host)
- /magento        → 301 → /integrations/magento  (intent preserved)

## Per-criterion

1. 3 new pages — **PASS**. Each 200 (both hosts). Unique title/desc/canonical/OG
   (self-canonical, per-page OG title+url). Keyword-relevant H1 ≤12 words
   (drupal 8, squarespace 7, prestashop 7). JSON-LD Service + FAQPage +
   BreadcrumbList all parse; @graph also carries Organization + SoftwareApplication
   (edge-injected). In worker-host sitemap.
2. Magento relabel — **PASS**. /integrations/magento title + H1 cover BOTH
   "Adobe Commerce" and "Magento"; body carries both keyword families; single
   canonical slug (no cannibal duplicate). /adobe-commerce 301→/integrations/magento.
3. /integrations index — **PASS**. Lists all 12 platforms (woocommerce, shopify,
   wix, bigcommerce, magento, commercetools, canva, wordpress, drupal, squarespace,
   prestashop, custom-integration), grouped native/embed/custom. ItemList (12
   ListItems) + BreadcrumbList parse. Unique title/canonical.
4. De-Shopify /features — **PASS**. 200, unique title/desc/canonical/OG. Service +
   FAQPage + BreadcrumbList schema intact. Rendered HTML contains ZERO "Shopify"
   occurrences (DESIGN-SPEC §8 requirement met); "Adobe Commerce" now named in the
   FAQ. "See all integrations" → /integrations (200). No ghost links (all 19
   internal links on each new page resolve; /features→/integrations resolves).
5. One-intent / no cannibalization — **PASS**. 12 integration pages each hold a
   distinct platform primaryKeyword; /features = platform-neutral capability
   reference; /platform = five-pillar overview. The 3 new pages target distinct
   platform intents (Drupal Commerce / Squarespace / PrestaShop) and do not
   overlap each other or existing pages.
6. Sitemap — **PASS**. Worker-host /sitemap.xml 200, well-formed urlset, 34 <loc>,
   includes all 3 new slugs. Unknown /integrations/zzz → hard 404 (dynamicParams
   false), not a soft-200.

## Notes (not blockers, per contract)
- Platform-host /sitemap.xml is edge-owned (ASSET-DEBT #20) — Phase-7 ownership
  override needed so the Worker's 34-URL sitemap serves on the custom domain.
- All integration/features OG = /og/default.png placeholder (#14/#22).
- Canonicals/OG resolve against SITE_URL=preview host (#21) — flip at cutover.

## Findings
None (critical/major/minor).

VERDICT: GO
