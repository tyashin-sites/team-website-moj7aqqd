# Phase 6 — Design Lens Audit (Full-Site Confidence Gate)

Auditor: adversarial design lens. Scope: DESIGN-SPEC §§1–9 conformance across
the ENTIRE finished site (30 routes) on the live preview
`https://team-website-moj7aqqd.sites.tyashin.com`. Method: node fetch of every
route + repo source, responsive reasoning at 375/768/1280.
Date: 2026-08-03.

## Per-area result

| Area | Result | Notes |
|---|---|---|
| §1 Palette (canonical only, no blue/slate) | PASS | Zero `#046bd2`/`#1e293b`; zero `text-blue-*`/`text-slate-*`/`indigo`. Only canonical hexes + documented `#6FCFAB` contrast-teal render. Semantic status tokens (`--brand-success/warning/danger/border` = teal-shifted `#0E8A5F/#B7791F/#C0392B/#D9E4E0`) are functional, not decorative — acceptable. Product-finish swatch colors `#F13400`/`#C9BBA4` represent chair materials, not brand palette. |
| §2 Type scale / LH | PASS | All headings use `tt-display/tt-1/tt-2`; zero sub-1.0 line-heights; zero `leading-none`/`leading-[0.x]`; no `h-1`/`h-2` utility-collision on typography (only legit `w-2 h-2` sizing on dots). |
| §3 Text budgets | PASS | Every H1 ≤ 12 words (max 11, industrial-machinery). Every `.lead` ≤ 40 words except the §3-exempt canonical description on `/what-is-thridify` (44w). First-body-paragraph canonical description (line 176) is correctly rendered as ordinary body prose (`text-foreground/80 leading-relaxed`), not `.lead`. |
| §6/§6a Demo-first | PASS | Home product trio = live `CapabilityDemo` (viewer/configurator/AR modes, 7 model-viewers). Platform (5), industries, services, integrations all embed live poster-first `<model-viewer>` demos, not infographics. ProductVisual abstract SVG confined to platform modelling/analytics deep-dives (no interactive form to demo) per spec. |
| §6/§7.1 Seamless poster rule | PASS | Every poster is a realistic raster `.webp` (21–78 KB) of the exact model; zero SVG/wireframe posters. Hero chair renders Coral/red matching `sheen-chair-poster.webp` — no outline→realistic pop, no color mismatch. Per-industry posters realistic (verified furniture-vase render). prefab-structures uses documented chair fallback (ASSET-DEBT #19, not a design blocker). |
| §7 Signature components | PASS | HeroObject (swatches + mono price + AR chip), MetricBar (4 canonical stats), BeforeAfter, PipelineStrip, VerticalCard, ProofCard (company-attributed), CTABand all present and on-spec. Header/Footer standard. |
| §7.2 Metric consistency | PASS | Home renders exactly the 6 canonical stats (75% returns · 3× conversion · 100% engagement · 70% photography · 100% CTR · 40% inventory). No off-canon quantitative claim found. |
| §8 Page blueprints (all 30 routes) | PASS | Home, /platform, /about (no stock, region naming India/Americas/Europe correct), /contact, 6 industries + index, 9 integrations + index, 3 compares, /what-is-thridify, /services/3d-modelling, /privacy, /terms, /security, /404 all resolve and carry header+footer+tt-scale+ink sections. |
| §9 UX / 5-second test | PASS | Home first viewport = live spin-able 3D chair + "interactive 3D and AR" subline → a stranger reads "3D/AR product visualization" in <5s. |
| Responsive (375/768/1280) | PASS | Only >375px fixed width is the compare table `min-w-[640px]` wrapped in `overflow-x-auto` (scrolls in-container, no body h-scroll). No other overflow risk; 28 overflow-guard rules on home. |
| Distinctiveness ("showroom not template") | PASS | Live model-viewer hero, teal-cast shadows, aurora, grain, pink-scarcity system — reads as a product showroom, not a Linear/Stripe clone. |
| 404 + legal conformance | PASS | /404 on-brand with helpful nav links; /privacy /terms /security use LegalDocument in the design system. |

## Findings

### MINOR-1 — Hero viewport shows two pink elements (§1 one-pink tension)
- Evidence: `src/components/signature/HeroObject.tsx:47` renders a **Blush `#FEBFCC`
  swatch** and `:223` renders a `bg-accent` **pink active-dot indicator**; both sit
  in the same swatch row inside the hero's first viewport. §1 mandates "max ONE
  pink element per viewport"; §7.1 designates the pink dot indicator as THE one
  pink for the hero.
- Assessment: DEFENSIBLE. The Blush swatch is a product-finish color (Blush
  fabric), which the spec treats as product data, not a brand accent. Two small
  pink dots, low visual weight. Not a blocker; noted for consideration.
- Severity: minor.

### MINOR-2 — Canonical description reused as an oversized `.lead` on /what-is-thridify
- Evidence: `src/app/what-is-thridify/page.tsx:204` renders the first Q-section
  `answer` (= `CANONICAL_DESCRIPTION`) with `className="mt-4 lead"` (44 words,
  clamp 1.375rem). The §3 exemption covers the content's word cap; the machine-
  extraction first-body-paragraph copy (`:176`) is correctly plain body prose.
- Assessment: Within the §3 word-cap exemption; the "not an oversized .lead"
  language targets the first-body-paragraph surface, which is compliant. The
  section-answer reuse as `.lead` is a benign styling choice.
- Severity: minor.

## Non-findings (verified scoped, not re-raised)
- Placeholder demo models / chair fallback (ASSET-DEBT #16/#19), per-industry &
  per-integration OG placeholders (#14), Lantern LCP simulation (#26),
  heading-order a11y (Phase-5) — all documented asset debt, no No-Faking breach.
- `/blog` footer link 404 on this host is a platform-edge ownership issue
  (ASSET-DEBT #17, Phase-7) — QA/link lens, not design.

## Gate
Zero critical, zero major. Two defensible minors.

VERDICT: GO
