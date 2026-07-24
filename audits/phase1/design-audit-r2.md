# Phase 1 Design Audit — Round 2 (re-audit after fix round)

- **Lens:** design (DESIGN-SPEC §§1, 2, 4, 5, 6, 7) — Phase 1 exit gate re-verification
- **Auditor:** thridify-website-auditor (adversarial; independent re-verification — builder's fix report NOT trusted)
- **Date:** 2026-07-24
- **Fix round audited:** `820854a` (consolidated fixes), `19cede0` (brand-kit.css link removed), `c398fe1` (Lighthouse evidence)
- **Live target:** https://site-thridify.snowy-cherry-cd2c.workers.dev — fetched with node `fetch` (identity encoding, no curl|grep); deployed stylesheet `/_next/static/css/69670175c58c719e.css` (70,931 bytes) downloaded and analyzed byte-level; `/` and `/gallery` served HTML analyzed.
- **Prior report:** `audits/phase1/design-audit.md` (NO-GO: C-1, M-1..M-5, m-1..m-4)

---

## Per-finding re-verification

### C-1 (critical, ghost-on-dark ink-on-ink) — **FIXED, verified live**
- Deployed CSS layer structure: `@layer properties` @11305 → `theme` @13231 → `base` @14874 → `components` @18425–24615 → `utilities` @24616–64905. **Every custom class now sits inside `@layer components`**: `.btn` @21484, `.btn-ghost` @22328 (all 4 occurrences ≤23107), `.tt-mono` @19562, `.eyebrow` @19305, `.lead`, `.card`, `.reveal*`, `.marquee-track` — all inside the components block. Utilities (`.text-paper{color:var(--brand-bg)}` @51102, `.text-lg` @46010) sit in the later `utilities` layer, so they now win the cascade by layer order regardless of specificity.
- `.on-dark` mechanism verified in deployed CSS: `.on-dark .btn-ghost, .btn-ghost-dark { color: var(--brand-bg); border-color: color-mix(in oklab, var(--brand-bg) 28%, transparent) }` + hover variants + `.on-dark .lead { color: var(--brand-muted-dark) }` + `.on-dark .eyebrow { color: var(--brand-primary-soft) }` — all present.
- Served home HTML: hero section is `<section class="on-dark bg-ink text-paper …">`; the "Explore the Platform" link is `class="btn btn-ghost … text-paper border-paper/25 hover:bg-paper/10"`. Computed ghost color is now paper `#FFFFFF` on ink `#021F17` **twice over** (belt: `text-paper` utility beats layered `.btn-ghost`; suspenders: `.on-dark .btn-ghost` itself resolves to `var(--brand-bg)`). Contrast 17.9:1. Ink-on-ink is dead by construction, not by per-page patch — the structural fix the r1 report demanded.
- The unlayered-on-purpose exceptions are correct: `:focus-visible` ring and the `prefers-reduced-motion` block remain unlayered so nothing can suppress them; the `:root` token block is unlayered custom properties (no cascade hazard).

### m-1 (13px price ticker) — **FIXED** (same mechanism as C-1)
- `HeroObject.tsx:196` still reads `tt-mono text-paper text-lg`; with `.tt-mono` now layered, the `text-lg` utility wins → 1.125rem. The gallery ships an explicit live probe: "tt-mono + text-lg utility (must render 18px — cascade-layer check)" and `.text-lg` is confirmed in the utilities layer of the deployed sheet.

### M-1 (VerticalCard missing) — **FIXED, verified in source and live on both pages**
- `src/components/signature/VerticalCard.tsx` exists and implements the §7.5 contract: 48px `rounded-xl` `bg-primary/10` icon chip flipping to solid teal + white on hover (§6), name, 1-line pain, optional metric, "Explore →" slide-in (`opacity-0 group-hover:opacity-100 -translate-x-2 → 0`, 300ms UI tier, lucide `ArrowRight aria-hidden`).
- Used on **home** (`page.tsx:209` — industries grid now renders `<VerticalCard>` per category) and on **/gallery** (3 instances incl. one with metric). Both confirmed present in served HTML.
- No-Faking discipline held: home cards pass **no** metric (ASSET-DEBT #12, correctly logged); the single gallery metric "30% fewer returns" is the canonical §7.2 platform metric on a noindexed internal QA page, not an invented per-vertical claim on the public site. Acceptable.

### M-3 (ImpactBlock reduced-motion + counter divergence) — **FIXED, verified in source**
- New shared `src/lib/useCountUp.ts`: 1.4s (`COUNT_UP_DURATION_MS = 1400`) ease-out-cubic via rAF, `matchMedia('(prefers-reduced-motion: reduce)')` → final value immediately, fires on `run` flip once. **Both** `MetricBar.tsx` and `ImpactBlock.tsx` (`AnimatedCounter`) consume it — the two home-page counters can no longer disagree, and both are §5-conformant (1.4s ease-out).
- ImpactBlock framer transforms now gated on `useReducedMotion()`: `fadeUp`/`scaleIn` collapse to opacity-only and stagger delays go to 0 when reduced. The remaining logo-marquee `motion.div` is opacity-only (allowed) and the marquee itself is the CSS `.animate-marquee` class, killed by the unlayered PRM block (`animation: none` — verified in deployed CSS).

### M-4 (eyebrow-on-dark 2.8:1) — **FIXED; contrast independently computed**
- Token `--brand-primary-soft: #6FCFAB` present in globals.css, in the inline layout token block, and in the deployed CSS; `.on-dark .eyebrow{color:var(--brand-primary-soft)}` confirmed in the deployed sheet.
- **Independent WCAG computation** (not trusting the commit's "9.3:1"): #6FCFAB rel. luminance 0.5095; #021F17 rel. luminance 0.01055; contrast = (0.5595 / 0.06055) = **9.24:1**. Requirement for 12px (0.75rem, non-large) text is 4.5:1 → passes with 2× headroom. Judgment: **≥4.5:1 clearly met.**
- Wiring verified: hero (`.on-dark` section, eyebrow has no overriding `text-*` utility), `PipelineStrip.tsx:52` (`on-dark section bg-ink`), `CTABand.tsx:16` (`on-dark`), gallery dark sections. Also swept the non-`.on-dark` dark section (home Global Offices, `bg-foreground`): its eyebrows carry explicit `text-background/60` and `text-background/50` utilities — computed ≈6.9:1 and ≈5.1:1 on #021F17, both pass.

### M-5 (no gallery; 3 signature components unrenderable; Lighthouse unmeasurable) — **FIXED, verified live**
- `/gallery` returns 200 and renders (served HTML confirmed): canonical palette swatches (all 8 + primary-soft), full type scale incl. the cascade probe, buttons light + dark (`.on-dark` and `.btn-ghost-dark` variants side by side), glass cards, accent-line, Card, FormField, SectionHeading (left/centered/dark), VerticalCard ×3, **HeroObject** (poster `sheen-chair-poster.svg` preloaded, deferred model-viewer), **MetricBar**, **BeforeAfter**, **PipelineStrip**, **CTABand**. Completeness vs the BUILD-PLAN Phase-1 signature list (HeroObject, MetricBar, PipelineStrip, BeforeAfter, VerticalCard, CTABand): **all six render live**. ProofCard (§7.6) is a Phase-2 deliverable ("metric proof cards" under Phase 2) — its absence is not a Phase-1 finding.
- Gallery is correctly quarantined: `<meta name="robots" content="noindex, nofollow"/>` in served HTML (route-level, independent of the host-conditional preview noindex), and zero links to `/gallery` from the home page/nav.
- Lighthouse evidence committed (`audits/phase1/lighthouse/`): gallery-mobile.json → **perf 0.85, a11y 0.92**, formFactor mobile, finalUrl = deployed /gallery, fetchTime 2026-07-24T10:26Z (post-19cede0). Home: perf 0.96, a11y 0.91. Gate is "≥ 85 mobile on a component gallery page" → 85 meets it, at the line but on the committed deployed-run evidence. PASS.

### Minors — all three **FIXED**
- **m-2** Reveal duration: `Reveal.tsx:45` now `duration: 0.6` (600ms Reveal tier), easing `[0.22,1,0.36,1]`, 24px translate, reduced-motion → opacity-only. ✔
- **m-3** SectionHeading dedupe: `src/components/ui/SectionHeading.tsx` deleted; only `src/components/SectionHeading.tsx` remains; all imports (gallery incl.) point at it. `HeroSlideshow.tsx` still present-but-unused — carry-over note for Phase-2 cleanup, not a finding.
- **m-4** Stagger delays: deployed CSS has explicit delays for children 1–10 (70ms increments — inside the §5 60–80ms band) plus `:nth-child(n+11){animation-delay:.7s}` cap. ✔

### M-2 (platform `/brand-kit.css` serves stale palette) — **KNOWN-OPEN (not a new finding)**
- Status: awaiting a user-supplied super-admin JWT; now properly tracked as **ASSET-DEBT #13** with the prepared canonical payload documented (it was untracked in r1 — that gap is closed).
- **Mitigation verified live:** the render-blocking `<link>` to `website-api.tyashin.com/.../brand-kit.css` is **gone** from served HTML on `/` and `/gallery` (string `brand-kit.css` absent entirely); the inline `<style>` canonical token block (`--brand-primary: #007050 … --brand-primary-soft: #6FCFAB`) is present in `<head>` on both routes and is the app's only brand-token source. The stale sheet can no longer reach the page at all — the r1 hazard (stale values winning if load order shifted) is structurally eliminated, and it bought a large Lighthouse win as a side effect.

## Deferral judgment on M-2 (explicit reasoning)

Can the Phase 1 gate pass with M-2 deferred? My judgment: **yes**, on these grounds:
1. The Phase 1 gate's design criteria are about what the **site** serves — and the live site now provably serves the canonical palette from a single source with zero dependency on the stale platform kit. Every pixel this lens audits is canonical (verified in deployed CSS and computed markup, forbidden hexes absent).
2. The residual blast radius of M-2 is **platform-rendered surfaces** (checkout/returns per CLAUDE.md §12), which do not exist for this marketing site until Phase 7 custom-domain cutover — nothing customer-visible is wrong today.
3. The fix is blocked on a credential only the user can mint (15-min super-admin JWT; no local path — ASSET-DEBT #13). Holding a design-system gate hostage to a credential hand-off adds no design quality; it only stalls Phase 2.
4. Condition of deferral: it MUST appear as a hard pre-launch checklist item — Phase 7 lists it via ASSET-DEBT #13's phase tags (0, 7), and post-PATCH the served kit must be re-verified against §1 before cutover. If it is still stale at the Phase 6 full audit, it escalates back to a blocking major there.

## Regression sweep of the fix round itself

| Check | Result |
|---|---|
| New class names vs Tailwind utilities (`on-dark`, `btn-ghost-dark`, `transition-micro`, `transition-ui`, `reveal-stagger` extensions) | **PASS** — none are Tailwind-generated names; deployed CSS shows exactly one definition of each custom class (no duplicate/colliding rule); the earlier `.h-1` incident class is absent. `animate-marquee` is safe: no `marquee` animation exists in `tailwind.config.ts` theme, so Tailwind emits no competing utility |
| Palette still canonical; forbidden hexes | **PASS** — deployed CSS + served HTML contain all 8 canonical hexes (+ #6FCFAB); `#046bd2`, `#1e293b`, `#064232`, `#F5BABB` absent from deployed CSS, served HTML, and source (`src/`, `content/`, tailwind config) |
| #6FCFAB legitimacy (new hex, not in §1 table) | **PASS with note** — it is a derived on-dark tint of `--brand-primary` serving §9 (WCAG), defined as a token in the token layer, documented in-source. Not a "random green" in the §1-forbidden sense. Recommend folding it into DESIGN-SPEC §1 as a ninth row for spec/source agreement (cosmetic, non-blocking) |
| One-pink rule, home hero viewport | **PASS** — pink usage in served home HTML: 1× `bg-accent/10` rim-light blob (sanctioned by §1 showroom rim-light; appears twice in HTML only as SSR + RSC-payload duplicates of the same element), 1× active-swatch pink dot (the designated element), Blush swatch + logo mark = product/brand content. 1× `text-accent` total on the page = the single pink MetricBar stat (next viewport). Unchanged from r1's pass |
| One-pink rule, gallery dark sections | **PASS** — per dark section: buttons section has only the accent-line's gradient pink end (§4 sanctioned divider); HeroObject section has the swatch dot; MetricBar has its one pink stat; CTABand's pink lives in the 20%-opacity aurora (§7.7 sanctioned). No section stacks two pink UI accents |
| `/gallery` structure at 375 / 768 / 1280 | **PASS (fetch + structural reasoning)** — all grids are `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3/4`; button rows `flex flex-wrap`; HeroObject block `lg:grid-cols-2` collapsing to one column below 1024; `container-x` clamps width with 1.5/2.5rem inline padding; the only oversized element on either page (hero blob `w-[36rem]`) is absolutely positioned inside `overflow-hidden`. No fixed-width construct that can overflow 375px; no horizontal-scroll vector found in served markup |
| Reduced-motion CSS block intact after refactor | **PASS** — unlayered `@media (prefers-reduced-motion: reduce)` verified in deployed CSS: reveal/stagger `animation:none;opacity:1;transform:none`, marquee + aurora killed, hover transforms killed, global 0.01ms clamp |
| Type-scale overlap regression | **PASS** — zero sub-1.05 line-heights on any `tt-` class in the deployed sheet |
| Build/CI green | **PASS (direct evidence)** — commit `19cede0` is live on workers.dev (gallery route + layered CSS serving), and the Lighthouse evidence was captured against the deployed host post-fix |

## Gate scorecard (delta from r1)

| Criterion | r1 | r2 |
|---|---|---|
| §1 palette exactness (site-served) | PASS | PASS |
| §1 platform brand-kit.css | FAIL (M-2) | KNOWN-OPEN, deferred to Phase 7 checklist (ASSET-DEBT #13); mitigation verified |
| §2 type scale / no collisions | PASS | PASS (now layered — stronger) |
| §4 surfaces | PASS | PASS |
| §5 motion tokens + reduced-motion | FAIL (M-3) | **PASS** |
| §5 buttons incl. dark sections | FAIL (C-1) | **PASS** |
| §7 signature components complete + live-verifiable | FAIL (M-1, M-5) | **PASS** |
| Eyebrow-on-dark contrast (§9) | FAIL (M-4, 2.8:1) | **PASS** (9.24:1, independently computed) |
| Lighthouse ≥ 85 mobile on gallery | NOT MEASURABLE | **PASS** (85, committed deployed-run evidence) |
| Minors m-1..m-4 | open | all fixed |

## Verdict

Zero critical and zero major findings remain within the Phase 1 design lens. M-2 is open but is a credential-blocked platform-data item with verified mitigation, formally deferred to the pre-launch checklist (and it re-blocks at Phase 6 if still stale). New minors raised this round: none blocking (spec-doc addendum for #6FCFAB recommended; HeroSlideshow.tsx deletion carried to Phase 2).

**VERDICT: GO**
