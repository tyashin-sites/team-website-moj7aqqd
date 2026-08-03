# Phase 3 Exit Gate — BRAND Audit (Wave A truth-correction + Wave B honesty)

Lens: **brand**. Auditor: adversarial. Date: 2026-08-03.
Hosts verified (node fetch, both): raw worker
`site-thridify.snowy-cherry-cd2c.workers.dev` + platform
`team-website-moj7aqqd.sites.tyashin.com`.
Routes verified: `/`, `/platform`, `/what-is-thridify`, `/services/3d-modelling`,
`/compare/{threekit,zakeke,marxent}`, `/industries` + all 6 industry pages,
`/about`, `/contact`, `/llms.txt`, `/robots.txt`. All 200 on both hosts
(platform `/llms.txt` = 404 → known ASSET-DEBT #20 edge interception, Phase-7,
out of brand scope).

## Per-criterion result

| # | Criterion | Result |
|---|-----------|--------|
| 1 | Positioning correction — zero automated "3D content generation" claims; offering is human-delivered 3D Modelling Service; 5-product suite | **PASS** |
| 2 | Competitor honesty on /compare/* — no fabricated facts/metrics/quotes | **PASS** |
| 3 | Canonical metric set ONLY sitewide (incl. new pages) | **PASS** |
| 4 | Testimonials real (Guntier/Sunbaby/Vortex) + Guntier gated to kitchens+doors | **PASS** |
| 5 | Canonical palette + fonts only; no #046bd2 / #1e293b | **PASS** |
| 6 | Education fully absent (pages + llms.txt + schema) | **PASS** |
| 7 | Entity consistency (description / Aapastech Private Limited / Shikha CEO + Aditya CTO / Delhi→Toronto / 4 socials) | **PASS** |
| 8 | 3D Modelling Service framing honest, not overclaiming | **PASS** |

## Evidence

1. **Positioning.** The only occurrences of "content generation" sitewide are
   explicit NEGATIONS: `/llms.txt` ("Thridify does NOT do automated content
   generation"), `/what-is-thridify` ("does not do automated content
   generation — 3D models are built by its modelling team"). No
   "generate unlimited photos/videos", "automatically generate", "auto-generate"
   anywhere in rendered HTML/JSON-LD on either host. Product suite renders as
   the 5 canonical modules (3D 360° Viewer · 3D Configurator · AR Viewer ·
   3D Modelling Service · Analytics) on `/platform`, `/what-is-thridify`,
   `/llms.txt`, footer. `content/site.json` module #4 id=`modelling`,
   copy = "our team models each SKU… no in-house 3D team required".
   `src/app/services/3d-modelling/page.tsx` is entirely human-delivered framing
   ("Our 3D team builds each product", Service JSON-LD provider=Organization).

2. **Competitor honesty.** `src/lib/comparisons.ts` concedes real strengths
   (Threekit enterprise CRM/CPQ + Salesforce; Zakeke published pricing + broad
   plugin ecosystem; Marxent 3D room planners for big-box retail) and uses
   "Varies / contact vendor" / "Contact sales" where uncertain. No invented
   competitor metric, price, customer count or quote. Rendered /compare/*
   pages show no numeric competitor claims (only Tailwind width classes
   `w-[38%]`/`w-[31%]` and framework JS — false positives, confirmed).

3. **Metrics.** Only the 6 canonical stats render (75% returns / 3× conversion /
   100% engagement / 70% photography / 100% CTR / 40% inventory), sourced from
   `CANONICAL_METRICS` in `src/lib/industries.ts` and reused on home Proof,
   `/what-is-thridify`, `/services/3d-modelling` outcomes, every industry page,
   `/llms.txt`. Stray-stat sweep across all routes returned only false positives
   (image srcset `1x`/`2x`, React path id `1jp15x`, Tailwind `w-[..%]`, and the
   verbatim Vortex testimonial "50% of the job… the remaining 50%").

4. **Testimonials.** Exactly Guntier, Sunbaby, Vortex Splash (verbatim,
   ASSET-DEBT #2, company-level attribution, no invented person names). Live
   Guntier gating confirmed: present ONLY on `/industries/modular-kitchens` and
   `/industries/doors-and-windows`; absent on furniture, prefab, machinery,
   laminates (`GUNTIER_INDUSTRIES` set + `showGuntierQuote` flags).

5. **Palette/fonts.** Served CSS `/_next/static/css/c7512d7cc528ea6c.css`:
   zero `#046bd2`/`#1e293b`; brand `#007050` present. Source grep of
   src/content/public: no forbidden hex. Space Grotesk / Inter / IBM Plex Mono
   via next/font unchanged. New OG PNGs (`/og/services-3d-modelling.png`, six
   `/og/industry-*.png`, `/og/default.png`) all 200 image/png.

6. **Education absent.** No "education / pre-school / flashcard / classroom /
   WonderlyAR / publishing" in any rendered page, `/llms.txt`, or schema. Only
   source references are guard comments asserting education is NOT a vertical.

7. **Entity consistency.** `CANONICAL_DESCRIPTION` renders verbatim on
   `/what-is-thridify` hero, home/what-is FAQ, and `/llms.txt` blockquote.
   Home Organization JSON-LD: legalName "Aapastech Private Limited", founders
   [Shikha Gupta CEO, Aditya Gupta CTO], sameAs = the 4 canonical socials
   (LinkedIn/Instagram/Facebook/YouTube). `/llms.txt` + `/about` repeat the
   same. Regions named India / Americas / Europe.

8. **Founder placement.** `/about` + `/llms.txt`: founders founded Thridify in
   Delhi (2022); Shikha leads from the Greater Toronto Area; "Founder base" =
   Toronto; the Delhi team is described as engineering/3D/ops (NOT founders).
   No founder is placed as currently operating from India → complies with the
   Shikha-fronted, Delhi→Toronto brand rule (DESIGN-SPEC §8).

## Findings

- **Minor (non-blocking) — confirm founding year.** `/about` states the
  founders "founded Thridify in Delhi in 2022". This is a biographical fact
  (not a canonical metric, name, quote or competitor claim) and pre-dates this
  gate; flagged only for user confirmation of accuracy. Not a No-Faking
  violation.

No critical, no major findings.

## VERDICT: GO
