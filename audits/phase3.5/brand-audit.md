# Phase 3.5 — Brand Lens Audit

**Scope:** new/changed feature surfaces only — `/features`, `/platform` (5-pillar
restructure), `/integrations/shopify` (upgraded), and `src/lib/features.ts`.
**Verified:** live worker (`site-thridify.snowy-cherry-cd2c.workers.dev`) +
platform host (`team-website-moj7aqqd.sites.tyashin.com`) via `node fetch`, plus
repo source. Date 2026-08-03.

## Per-criterion result

| # | Criterion | Result |
|---|-----------|--------|
| 1 | No-Faking — no claims beyond user-confirmed live features; no fabricated Shopify partnership | PASS |
| 2 | Canonical §7.2 metrics ONLY (no stray/invented stats) | PASS |
| 3 | Positioning — 3D & AR commerce + human-delivered 3D Modelling Service; zero automated 3D-content-generation claim | PASS |
| 4 | Canonical palette + fonts only (no #046bd2 / #1e293b, no blue/slate) | PASS |
| 5 | Education absent; entity/contact consistency; testimonials only real Guntier/Sunbaby/Vortex (none faked onto feature pages) | PASS |

## Evidence

1. **No-Faking / Shopify:** `/integrations/shopify` on both hosts contains no
   "Built for Shopify" / official-partner / certification / App-Store-badge
   string (`node fetch` regex `built for shopify|official partner|shopify
   partner|certified` → none). Copy uses only real Shopify developer-surface
   nouns (Theme App Extension, App Block, Shopify Admin, Web Pixel) — mechanism
   claims, not partnership claims. ASSET-DEBT #28 (listing not yet live) is
   correctly reflected: CTA is Book-a-Demo / live-demo, no install button.
   `src/lib/integrations.ts:337,365` "badges" hits are the real "collection-wide
   3D badges" feature, not a certification badge.
2. **Canonical metrics:** visible numeric-claim extraction of rendered text —
   `/features` none, `/platform` none, `/integrations/shopify` = `3× / 75% /
   100%` only (conversion / returns / ctr), identical on both hosts.
   `CANONICAL_METRICS` (`src/lib/industries.ts:32-39`) matches §7.2 exactly and
   is the single source both the Shopify outcomes and industry pages read; no
   integration/feature/platform surface introduces a new number.
3. **Positioning:** `src/lib/features.ts` studio pillar = "Publish 3D products
   yourself"; module #4 is the human-delivered "3D Modelling Service"
   (`content/site.json` platform product id `modelling`, "Send your catalog and
   our team models each SKU"). Grep for `content generation|generate 3d|ai-
   generat|auto-generat` across all target surfaces + content → none, live and
   in source.
4. **Palette:** no `#046bd2` / `#1e293b` in source or rendered HTML on either
   host. All color via canonical tokens (`bg-ink`, `text-primary`,
   `text-accent`, `text-muted-dark`). The only `slate`-substring grep hits are
   `hover:-translate-y-1` / `transition-ui` (Tailwind `translate`), not the
   forbidden slate color.
5. **Education/entity:** grep `ar in education|ar-in-education|wonderly` → none
   on all three live pages. No testimonial/ProofCard renders on any of the three
   surfaces; the only `Guntier` occurrence in scope is a code comment
   (`integrations.ts:21`) explaining integration pages stay metric-only because
   Guntier has no platform mapping — i.e. deliberately NO client quote on
   integration pages. `contact@thridify.com` present (footer) — canonical
   contact, no contradiction.

## Findings

**MINOR — feature-catalog count drift (cosmetic, not user-facing).**
`src/lib/features.ts` holds 38 feature-list entries (studio 10, experience 7,
distribute 12, measure 3, operate 6), but the platform page comment
(`src/app/platform/page.tsx:102`) and the module header say "the full 37".
"API token access" is intentionally listed under both Distribute
(`features.ts:98`) and Operate (`features.ts:128`) — the same real capability
framed for two pillars — so unique capabilities = 37, list entries = 38. No
No-Faking issue (nothing invented), no user-visible number states "37". Cosmetic
comment/count mismatch only.

## Non-findings (verified, dropped)

- Platform configurator copy "reprices live, generates an instant quote, exports
  a production-ready BOM" and analytics "abandonment signals / ROI"
  (`content/site.json`) are NOT in `features.ts` — but they are (a) unchanged
  this phase (`git diff` on `content/site.json` shows no edits to these claims)
  and (b) explicitly sanctioned by DESIGN-SPEC §7.4 (PipelineStrip: Configure →
  Live price → Instant quote → BOM to factory). Pre-existing, spec-backed,
  out of the changed-surface scope — not a new finding.
- CapabilityDemo swatch prices ($1,189–$1,329) are known illustrative demo
  values (ASSET-DEBT #10), not rendered as claims in the pages' server HTML.

## Verdict

Zero critical, zero major. One minor cosmetic count comment.

**VERDICT: GO**
