# Asset Debt — placeholders awaiting real inputs

Every entry here blocks 100%-confidence launch until resolved. Builders add
entries; only the user (or real assets) can clear them.

| # | Needed asset | Currently in place | Blocking phase |
|---|---|---|---|
| 1 | Real client product 3D model (glTF/GLB, ≤2MB draco) for HeroObject — ideally a Sunbaby or Guntier product | none yet (CC0 placeholder to be used) | 1, 6 |
| 2 | Real customer quotes with permission (name, company) | fictional testimonials on current site — MUST be removed in Phase 2 | 2, 6 |
| 3 | Confirm social handle URLs (knowledge bank says: linkedin.com/company/thridify, instagram.com/thridify, facebook.com/thridify, youtube.com/@thridify) | placeholder root-domain links in site.json footer.socials | 2 |
| 4 | Configurator screen recordings / AR phone captures | none | 2, 5 |
| 5 | Decision: YOM analytics on this site + conversion events | no analytics | 0 |
| 6 | Real privacy policy + terms input (entity details, data practices) | /privacy and /terms are dead links | 4 |
| 7 | Lead-alert destinations: Slack webhook URL (e.g. #thridify-internal) and/or CRM wiring + auto-ack email decision — NEEDS USER INPUT | /api/contact logs `LEAD:` to worker console and best-effort forwards to the Tyashin contact inbox when TYASHIN_API_KEY is bound; no Slack/CRM/auto-ack yet | 0, 2 |
| 8 | HeroObject model within budget: real client glTF ≤2MB draco-compressed | Khronos CC0 SheenChair at `public/models/sheen-chair.glb` — 4.4MB, OVER the 2MB spec budget (mitigated: poster-first, idle+viewport-deferred load) | 1, 5, 6 |
| 9 | Real poster render (LCP frame) for the hero model | hand-drawn placeholder SVG at `public/models/sheen-chair-poster.svg` | 1, 5 |
| 10 | Real per-model AR QR code + confirmed demo pricing for the hero configurator | QR is a dashed placeholder box; swatch prices ($1,189–$1,329) are illustrative demo values, not claims | 1, 6 |
| 11 | Reconcile MetricBar numbers (DESIGN-SPEC §7.2: 30% fewer returns / 3× faster close / 65% less rework / +23% recovery) with the thridify.com impact stats (40% lower returns / 3× conversions / 94% engagement / 70% photography / 200% CTR / 25% inventory) — confirm which set is sourced/approved | spec §7.2 set shipped in MetricBar; thridify.com verbatim set still shown in ImpactBlock further down the page | 2, 6 |
