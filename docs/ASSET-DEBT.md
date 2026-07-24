# Asset Debt — placeholders awaiting real inputs

Every entry here blocks 100%-confidence launch until resolved. Builders add
entries; only the user (or real assets) can clear them.

| # | Needed asset | Currently in place | Blocking phase |
|---|--------------|--------------------|----------------|
| 1 | Real client product 3D model (glTF/GLB, ≤2MB draco) for HeroObject — ideally a Sunbaby or Guntier product | none yet (CC0 placeholder to be used) | 1, 6 |
| 2 | Real customer quotes with permission (name, company) | **Fictional testimonials REMOVED in Phase 2** (site.json home/industries + page fallbacks); Proof sections now show only the knowledge-bank metric proof cards + real client logos. Real quotes slot back in here once collected | 2, 6 |
| 3 | ~~Confirm social handle URLs~~ **RESOLVED (Phase 2):** footer socials set to the knowledge-bank canonical handles (linkedin.com/company/thridify, instagram.com/thridify, facebook.com/thridify, youtube.com/@thridify) | done — verify handles are live before Phase 7 | — |
| 4 | Configurator screen recordings / AR phone captures | **Brand-colored abstract SVG representations** (`src/components/ProductVisual.tsx`) stand in on the home product trio and all five /platform deep-dives. Replace each with a real capture as it arrives | 2, 5, 6 |
| 5 | Decision: YOM analytics on this site + conversion events | no analytics | 0 |
| 6 | Real privacy policy + terms input (entity details, data practices) | /privacy and /terms are dead links | 4 |
| 7 | Lead-alert destinations: Slack webhook URL (e.g. #thridify-internal) and/or CRM wiring + auto-ack email decision — NEEDS USER INPUT | /api/contact logs `LEAD:` to worker console and best-effort forwards to the Tyashin contact inbox when TYASHIN_API_KEY is bound; no Slack/CRM/auto-ack yet. Phase 2 added the `category` field to the payload | 0, 2 |
| 8 | HeroObject model within budget: real client glTF ≤2MB draco-compressed | Khronos CC0 SheenChair at `public/models/sheen-chair.glb` — 4.4MB, OVER the 2MB spec budget (mitigated: poster-first, idle+viewport-deferred load) | 1, 5, 6 |
| 9 | Real poster render (LCP frame) for the hero model | hand-drawn placeholder SVG at `public/models/sheen-chair-poster.svg` | 1, 5 |
| 10 | Real per-model AR QR code + confirmed demo pricing for the hero configurator | QR is a dashed placeholder box; swatch prices ($1,189–$1,329) are illustrative demo values, not claims | 1, 6 |
| 11 | ~~Reconcile MetricBar numbers with the thridify.com impact stats~~ **RESOLVED (Phase 2):** the unverified thridify.com set (94% / 70% / 200% / 25% / 3.2× / "40% lower returns") is removed sitewide (ImpactBlock deleted). Only knowledge-bank proof points render: −30% returns, 3× faster close, −65% rework, +23% recovery, up to 3× conversion, up to +100% engagement, +40% conversions | done — Phase 6 brand audit re-verifies | — |
| 12 | Real, sourced per-vertical metrics for VerticalCard (DESIGN-SPEC §7.5 wants "one metric" per card) — No-Faking rule forbids inventing per-industry numbers, so home vertical cards render without a metric until approved figures exist | VerticalCard supports an optional `metric` prop; home grid passes none | 2, 6 |
| 13 | Fresh SUPER_ADMIN (or project-owner) JWT from admin.tyashin.com to `PATCH /api/v1/projects/:id/brand-kit` — the platform still serves the stale pre-canonical palette from `/brand-kit.css` (design-audit M-2). Route auth = Bearer JWT + PROJECT_ADMIN; no local credential path exists. Payload is prepared (canonical §1 colors + Space Grotesk/Inter + 16/12/999 radius) — NEEDS USER INPUT (paste a 15-min token) | site renders canonically only via the inline `<style>` override in layout.tsx | 0, 7 |
| 14 | Real product-render OG images (1200×630) per page | Brand-colored generated statics at `public/og/*.png` (regenerate with `node scripts/generate-og.mjs`); wired via per-page `openGraph.images` + `metadataBase` (SITE_URL env, currently the workers.dev preview — switch to the production host at Phase 7) | 2, 6, 7 |
| 15 | Real team / office / founder photography for the About page (or a decision to stay abstract) | Phase 2 removed ALL Unsplash stock (DESIGN-SPEC §6); About now uses brand logo-geometry only | 2, 6 |
