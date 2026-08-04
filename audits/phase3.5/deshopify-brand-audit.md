# Phase 3.5 — Brand Lens Audit: de-Shopify /features + 3 new integration pages

Auditor: brand lens (adversarial). Scope (deltas only): de-Shopify /features;
3 new integration pages (drupal, squarespace, prestashop); Magento→Adobe
Commerce relabel; /integrations index regroup. Verified against DESIGN-SPEC
§1/§6/§7.2, ASSET-DEBT #22/#28.

Hosts verified (node fetch, gzip-safe):
- Preview worker: https://site-thridify.snowy-cherry-cd2c.workers.dev
- Preview host:   https://team-website-moj7aqqd.sites.tyashin.com

## /features Shopify-count
| Host | /features status | "Shopify" occurrences (full HTML incl. flight data) |
|---|---|---|
| worker.dev | 200 | 0 |
| sites.tyashin.com | 200 | 0 |

Source: `src/lib/features.ts` mentions "Shopify" only in code COMMENTS
(lines 17–20), stripped at build; no rendered occurrence. Distribute pillar
renders "One-click plugins, or embed on any storefront" / "major commerce
platforms" (platform-neutral), ends with a "See all integrations →" link.
Shopify-specific "Web Pixel" ABSENT from /features (confirmed false).

## Per-criterion result
1. /features Shopify-free + platform-neutral pillars — **PASS** (0/0 both hosts;
   Distribute/Measure/Operate copy names no single platform).
2. No-Faking on drupal/squarespace/prestashop (embed-only, no native/plugin/
   module/partner/badge/"Built for") — **PASS**. All three `group:"embed"`;
   rendered native=0, builtFor=0, partner=0. Mechanisms are honest and
   platform-accurate: Drupal "custom-block/snippet", Squarespace "code block",
   PrestaShop "embed on product template" + "combinations by ID". The single
   "plugin" token on each embed page is the shared Distribute footer tagline
   "One-click plugins or embed on any store" (generic, not a native claim).
   /integrations index grouping — **PASS**: only Shopify (app) + WooCommerce +
   WordPress carry `group:"native"`; Adobe Commerce/BigCommerce/Wix/
   commercetools/Squarespace/PrestaShop/Drupal/Canva = `embed`;
   custom-integration = `custom`. Index copy: "Native plugins for Shopify,
   WooCommerce and WordPress; embeds for everything else." Accurate.
3. Adobe Commerce relabel — **PASS**. `/integrations/magento` presents as
   "Adobe Commerce (Magento)", slug kept for SEO, `group:"embed"` (no false
   native claim). FAQ states "Adobe Commerce is the current name for Magento" —
   factually correct.
4. Canonical §7.2 metrics only — **PASS**. New pages render only 75%/3×/100%/70%
   (returns/conversion/engagement/photography keys); `CANONICAL_METRICS`
   values = 75%/3×/100%/70%/100%/40% exactly. No stray/invented stats, no
   content-generation/"unlimited" claim (genClaim=0). Canonical palette only;
   Education absent (eduCount=0 on /features). Shopify page retains its real
   capabilities and makes no partnership/certification/"Built for Shopify"
   claim (partner-token matches are all "collection-wide 3D badges", a real
   product feature — not a Shopify badge).
5. Positioning + entity/contact consistency — **PASS**. 3D & AR commerce +
   human-delivered 3D Modelling Service intact; no content-gen. Contact
   consistently `contact@thridify.com` on all three new pages.

## Findings
None (critical/major/minor): zero.

## VERDICT: GO
