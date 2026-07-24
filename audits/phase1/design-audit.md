# Phase 1 Design Audit — Design-System Conformance

- **Lens:** design (DESIGN-SPEC §§1, 2, 4, 5, 6, 7) — Phase 1 exit gate only
- **Auditor:** thridify-website-auditor (adversarial)
- **Date:** 2026-07-24
- **Repo commit audited:** `97936c9` (feat(phase-1): canonical design system + signature components + showroom hero)
- **Live target:** https://site-thridify.snowy-cherry-cd2c.workers.dev (fetched with node `fetch`, inspected in a real browser at 375px and 1600px; deployed CSS `/_next/static/css/a7dafdbf6a5efeea.css` downloaded and analyzed)
- **Scope note:** page content/blueprints (§3 text budgets, §8) are Phase 2 and were not audited, EXCEPT the rebuilt home hero, which Phase 1 wired (HeroObject + MetricBar).

---

## Gate scorecard

| Gate criterion | Result |
|---|---|
| §1 Palette exactness in source + deployed app CSS | **PASS** — all 8 canonical hexes present; `#046bd2` / `#1e293b` / any bluish hex absent from source, deployed CSS, and served HTML; pre-canonical `#064232` / `#F5BABB` absent from source |
| §1 Palette served by platform `/brand-kit.css` | **FAIL** — stale pre-canonical palette still served live (finding M-2) |
| §2 Type scale (`tt-` classes, sizes, LH ≥ 1.05, rem margins) | **PASS** — `.tt-display/.tt-1/.tt-2/.lead/.eyebrow/.tt-caption/.tt-mono` match §2 exactly in `src/app/globals.css` and in deployed CSS; zero sub-1.0 line-heights on any `tt-`/heading class in deployed CSS |
| §2 No Tailwind-colliding class names | **PASS** — no custom `.h-1`/`.h-2` definitions; the `.h-1`/`.h-2` rules in deployed CSS are Tailwind's own height utilities (`height:var(--spacing)`). Custom namespace (`tt-`, `container-x`, `btn`, `card`, `eyebrow`, `lead`, `aurora`, `grain`, `reveal`) is collision-free. But see C-1 for a NEW cascade-collision class of bug |
| §4 Spacing/grid/surfaces (radius 16/12/999, teal shadows, glass cards, accent line) | **PASS** — `--brand-radius-*`, `--shadow-rest/hover` (teal-cast), `.glass-card`, `.accent-line` all per spec |
| §5 Motion durations/easing tokens | **PASS with deviations** — 150/300/600/900ms + `cubic-bezier(.22,1,.36,1)` tokens correct; marquee `40s linear infinite` + pause-on-hover verified in deployed CSS. Deviations: m-3 (Reveal 0.7s), M-4 (ImpactBlock counters) |
| §5 `prefers-reduced-motion` actually disables transforms/marquee/counters | **FAIL** — CSS side is correct (transforms/marquee/aurora off, verified in deployed CSS) and MetricBar/HeroObject/PipelineStrip/Reveal check `matchMedia`/`useReducedMotion`, but ImpactBlock's framer transforms and JS counters run regardless (finding M-4) |
| §5 No parallax / scroll-jack | **PASS** — PipelineStrip's scroll-progress path draw is scroll-**linked** drawing (explicitly allowed by §5), not scroll-jacking; nothing hijacks wheel/scroll |
| §7 Header 72px / blur / 40px logo / pink focus rings | **PASS** — `h-[72px]`, `backdrop-blur-xl`, logo `h-10` (40px, verified rendering live); global `:focus-visible{outline:2px solid var(--brand-accent);outline-offset:2px}` present in deployed CSS |
| §7 Footer per spec | **PASS** — dark ink, ~80px logo (`h-20 md:h-24`), real lucide social icons, `whitespace-nowrap` phone links (placeholder social URLs = ASSET-DEBT #3, not a finding) |
| §5 Buttons sweep #007050→#004D37 | **PASS in isolation / FAIL on dark sections** — `.btn-primary` two-stop gradient + `background-position` sweep at 150ms is exactly per spec; `.btn-ghost` on dark backgrounds is broken (finding C-1) |
| §7.1 HeroObject contract | **PASS** — poster-first (`sheen-chair-poster.svg` in SSR HTML, no `.glb` reference server-side), viewer deferred via IntersectionObserver + `requestIdleCallback` and confirmed upgrading live (`customElements.get('model-viewer')` truthy after idle), 3 swatches with teal active ring + pink dot, IBM Plex Mono ticking price (400ms ease-out, reduced-motion → instant), AR chip QR-on-hover desktop / "View in your room" on coarse pointers. Oversized 4.4MB GLB + SVG poster + placeholder QR + demo prices = ASSET-DEBT #8/#9/#10, not findings. But see m-1 (price size) |
| §7.2 MetricBar one-pink rule | **PASS** — exactly one `pink: true` stat (+23% recovery), mono `tabular-nums`, 1.4s ease-out count-up, fires once, reduced-motion → final values. Verified rendering live (one pink stat on ink) |
| §7 PipelineStrip / BeforeAfter / CTABand exist & match contracts | **PASS (source-level)** — all three implemented to contract (dark ink + scroll-drawn SVG + glass cards ≤10 words; toggle split with pains vs pink gains; ink CTA band w/ 20%-opacity aurora, ≤10-word headline, single Calendly CTA). NOT rendered on any route, so live verification impossible (finding M-5) |
| §7 VerticalCard scaffolded | **FAIL** — does not exist (finding M-1) |
| One-pink-per-viewport sampled on home hero | **PASS with note** — first viewport: pink rim-light glow (`bg-accent/10` blur — sanctioned by §1 "soft pink rim-light" for showroom sections) + active-swatch pink dot (the designated ONE element). The Blush finish swatch and the header logo mark are also pink, but both are product/brand content, not UI accents. Within the rule's intent; watch it in Phase 2 when more sections stack |
| Regression: sub-1.0 heading line-heights in deployed CSS | **PASS** — zero matches; `tt-display` LH 1.05, `tt-1` 1.1, `tt-2` 1.2 live |
| Build green | **PASS (indirect)** — the audited commit is deployed and serving on workers.dev, so CI build/deploy succeeded |
| Lighthouse ≥ 85 mobile on a component gallery page | **NOT MEASURABLE** — no gallery page exists (finding M-5) |

---

## Findings

### CRITICAL

**C-1. Hero secondary CTA renders ink-on-ink — invisible button text on the rebuilt Phase-1 hero.**
- Evidence (verified twice): live computed style of the "Explore the Platform" link on the home hero is `color: rgb(2, 31, 23)` (= `--brand-ink`) on the `#021F17` hero background — contrast ≈ 1.0:1; browser screenshots at 375px and 1600px show a near-empty pill.
- Root cause: `src/app/page.tsx:143` uses `className="btn btn-ghost … text-paper …"`, but `.btn-ghost { color: var(--brand-text) }` in `src/app/globals.css:254` is **unlayered** author CSS, while Tailwind v4 utilities (`text-paper`) live in `@layer utilities` — unlayered CSS always wins, so `text-paper` is dead on arrival. Confirmed in deployed CSS: `@layer theme/base/components/utilities` present; `.btn-ghost` outside all layers.
- Spec violated: §5 (button spec / visible interactive elements), §9 (contrast ≥ 4.5:1). This is precisely the "invisible until hover" bug class the platform's own operating notes warn about (CLAUDE.md §5 — Woodlark black-on-black footer).
- Blast radius: any `btn-ghost` placed on a dark section. Fix must be structural (e.g. a `.btn-ghost-on-dark` variant or moving `.btn*` into `@layer components`), not a one-off.

### MAJOR

**M-1. VerticalCard signature component does not exist.**
- BUILD-PLAN Phase 1 deliverables: "signature components scaffolded (HeroObject …, MetricBar, PipelineStrip, BeforeAfter, **VerticalCard**, CTABand)". `grep -rn VerticalCard src/` → zero hits; `src/components/signature/` contains only the other five. DESIGN-SPEC §7.5 contract (icon chip, vertical name, 1-line pain, one metric, "Explore →" slide-in) is unimplemented. The home industries grid (`page.tsx:201-229`) is a legacy inline card, not the §7.5 component.

**M-2. Live `/brand-kit.css` still serves the pre-canonical palette.**
- Evidence (fetched live): `https://website-api.tyashin.com/api/v1/public/brand-kit.css?apiKey=ak_MHW…` returns `--brand-primary: #064232`, `--brand-accent: #F5BABB`, `--brand-text-muted: #475569` (slate!), Inter as heading font, `--brand-radius-full: 9999px`.
- DESIGN-SPEC §1: "The Tyashin brand kit for this project must be updated to these values (`PATCH /projects/:id/brand-kit`)". This was also a Phase 0 deliverable whose exit gate claims "brand-kit.css serves canonical palette" — it does not.
- The site itself renders canonically only because of the inline `<style>` override in `layout.tsx` (verified: the override block appears after the brand-kit `<link>` in served HTML, and live computed vars are `#007050/#FEBFCC/#021F17`). But every platform-served surface that consumes `/brand-kit.css` directly (checkout, returns, platform pages per CLAUDE.md §12) will render the stale blue-less-but-wrong palette. Not tracked in ASSET-DEBT, so it is a finding, not known debt.

**M-3. ImpactBlock ignores `prefers-reduced-motion` — counters and transform reveals run regardless.**
- `src/components/ImpactBlock.tsx`: `AnimatedCounter` (lines 25-52) runs a 2000ms `setInterval` count with no `matchMedia` check, and every `motion.div` uses raw `initial={{ y: 30 }} / whileInView` without `useReducedMotion` (framer-motion's default is `reducedMotion: "never"`). The global CSS kill-switch cannot reach JS-driven inline styles or `setInterval`.
- Gate criterion violated: Phase 1 exit gate "motion respects reduced-motion"; DESIGN-SPEC §5 "no counters (show final values)" and "transforms off".
- Secondary deviation, same file: counter is 2s **linear stepped** vs §5's "count-up over 1.4s ease-out". (MetricBar next to it implements 1.4s ease-out correctly — the two counters on one page visibly disagree.)
- ImpactBlock is rendered on the Phase-1 home page (`page.tsx:182-188`), so it is inside this gate even though the section itself is Phase-2 content.

**M-4. `.eyebrow` on dark ink sections fails contrast — 2.8:1 for 12px uppercase text.**
- Evidence (verified twice): live computed `color: rgb(0,112,80)` on the hero eyebrow over `#021F17`; computed contrast ratio ≈ 2.8:1 (needs 4.5:1 at 0.75rem). Both browser screenshots show "3D & AR COMMERCE" barely legible. Same failure wired into `PipelineStrip.tsx:54` (eyebrow on `bg-ink`).
- Spec: §2 defines the eyebrow as teal but §9 mandates WCAG AA; the design system ships no dark-section eyebrow variant, so every dark section inherits the failure. Fix belongs in the token layer (e.g. eyebrow-on-dark uses `--brand-muted-dark` or a lightened teal), not per-page.

**M-5. Phase 1 exit-gate criterion "Lighthouse perf ≥ 85 mobile on a component gallery page" is unmeasurable — no gallery page exists, and three signature components render on no route.**
- Routes shipped: `/`, `/platform`, `/industries`, `/about`, `/blog`, `/contact`. No `/gallery`/`/styleguide` route. PipelineStrip, BeforeAfter and CTABand are imported nowhere (`grep -rn "PipelineStrip\|BeforeAfter\|CTABand" src/app` → zero hits), so they cannot be screenshot-audited or perf-tested live as the gate requires. "Scaffolded" is satisfied in source; the gate's own evidence vehicle is missing.

### MINOR

**m-1. Hero price ticker renders at 13px — `text-lg` is dead via the same cascade defect as C-1.**
- `HeroObject.tsx:196`: `className="tt-mono text-paper text-lg"`. Live computed `font-size: 13px` (unlayered `.tt-mono{font-size:.8125rem}` beats layered `text-lg`). §7.1 positions the price as a focal element of the pitch; 13px reads as a caption. (Color is unaffected — `text-paper` works there because `.tt-mono` sets no color.)

**m-2. Reveal component animates at 0.7s, spec Reveal tier is 600ms.**
- `src/components/Reveal.tsx:43`: `duration: 0.7` (easing and 24px translate and 80ms stagger are per spec; reduced-motion handled correctly). The CSS `.reveal`/`.reveal-stagger` utilities use the correct 600ms; the framer path disagrees with them.

**m-3. Duplicate SectionHeading components.**
- `src/components/SectionHeading.tsx` and `src/components/ui/SectionHeading.tsx` both exist with different markup. One source of truth per component, or the next builder imports the wrong one. (Similarly `HeroSlideshow.tsx` is retired-but-kept; acceptable if deleted by Phase 2.)

**m-4. `.reveal-stagger` delays are hardcoded for 6 children.**
- `globals.css:279-284`: children 7+ animate with zero delay. Any future stagger group longer than 6 silently loses its cadence.

### Out-of-scope observations (Phase 2 — recorded, not counted)
- Home CTA section (`page.tsx:342-357`) is a legacy light-background aurora section, not the §7.7 CTABand (dark ink); testimonials section still renders (No-Faking sweep is a Phase 2 gate); MetricBar and ImpactBlock present two conflicting metric sets on one page (already tracked as ASSET-DEBT #11).

---

## Verdict

1 critical + 4 major findings are open. The gate contract is explicit: GO requires zero critical AND zero major.

**VERDICT: NO-GO**

Blocking list:
1. **C-1** — `btn-ghost` ink-on-ink on dark sections (hero secondary CTA invisible); fix the layer/cascade structurally.
2. **M-1** — VerticalCard signature component missing (Phase 1 deliverable).
3. **M-2** — platform `/brand-kit.css` still serves the stale pre-canonical palette; PATCH the brand kit per DESIGN-SPEC §1.
4. **M-3** — ImpactBlock: reduced-motion non-compliance + off-spec counter (2s linear vs 1.4s ease-out).
5. **M-4** — eyebrow-on-dark contrast 2.8:1; add a dark-section eyebrow token/variant.
6. **M-5** — no component gallery page: gate's Lighthouse criterion unmeasurable and 3 signature components unverifiable live.
