# Phase 2 Exit Gate — Brand Audit

- **Lens:** brand (adversarial, evidence-based)
- **Audited commit:** `1b58f99` (latest `main`)
- **Live preview:** https://site-thridify.snowy-cherry-cd2c.workers.dev (node fetch, `accept-encoding: identity`)
- **Routes fetched:** `/`, `/platform`, `/about`, `/contact`, `/industries`, `/blog` — all HTTP 200
- **Auditor:** thridify-website-auditor
- **Date:** 2026-07-24

Verdict driver: GO requires **zero critical AND zero major** findings.

---

## Per-criterion result

| # | Criterion | Result |
|---|-----------|--------|
| 1 | No-Faking sweep (names / stats / testimonials) | **PASS** |
| 2 | Canonical palette + fonts only | **PASS** (1 minor note) |
| 3 | Founder narrative (About) | **PASS** |
| 4 | Client references (real only; Nasher = past client) | **FAIL — 1 MAJOR** |
| 5 | Footer social URLs | **PASS** |

---

## Criterion 1 — No-Faking sweep (CRITICAL) — PASS

**(a) Invented person names — ABSENT.** Source grep across `src/` + `content/` for
`Ananya|Mehra|Marcus|Levant|Priya|Rohan Saxena|Daria|Kask|Vincent Park` → none.
Live HTML scan of all six routes for the removed set → none on any route.

**(b) Quantitative claims — only the §7.2 canonical set.**
Live stat-token scan per route:
- `/` and `/industries` render exactly: `75%`, `3×`, `100%` (engagement), `70%`,
  `100%` (CTR), `40%`. No stray stats (no 94% / 200% / +23% / 65% / "up to").
- `/platform`, `/about`, `/contact`, `/blog` — no quantitative claims.
- MetricBar (`src/components/signature/MetricBar.tsx`) hardcodes the 4 canonical
  strongest: 75% / 3× / 100% / 70% — matches §7.2.
- Home Proof grid renders all six canonical metrics (`content/site.json` L126–150).
- One `50%` token appears on `/` — it is **inside the verbatim Vortex Splash quote**
  ("Our sales rep do 50% of the job, and Thridify, the remaining 50%"), not an
  independent metric claim. Allowed (real testimonial, user-confirmed verbatim).
- Hero configurator swatch prices ($1,189–$1,329) are illustrative demo values
  (ASSET-DEBT #10), not claims — rendered as UI, not asserted outcomes.

**(c) Testimonials — three real production quotes only, company-attributed.**
`ProofCard` (§7.6) enforces company-level attribution ("— Guntier"), no person names.
All three render verbatim live and match `content/site.json`:
- Guntier — "Our sales cycle has reduced from months to days and sometimes to hours with Thridify." ✓
- Sunbaby — "Thridify is just Wow." ✓
- Vortex Splash — "Can't imagine my customers placing orders if they weren't trying my products in AR. Our sales rep do 50% of the job, and Thridify, the remaining 50%" ✓

## Criterion 2 — Canonical palette + fonts — PASS (minor note)

- Forbidden hexes `#046bd2` (blue) and `#1e293b` (slate): **absent** in source and in
  live HTML/CSS on every route.
- Canonical tokens present: `#007050`, `#004D37`, `#FEBFCC`, `#021F17`, `#FFFFFF`,
  `#F0F5FA`, `#A3BFB5`, `#5B7A6E`.
- Fonts: Space Grotesk + Inter + IBM Plex Mono — declared in `src/lib/fonts.ts` and
  all three present in live HTML.
- **MINOR (non-blocking):** `src/app/globals.css` L24–26 defines semantic UI-state
  tokens `--brand-success #16a34a`, `--brand-warning #d97706`, `--brand-danger #dc2626`
  (a green/amber/red not in the §1 palette), plus `--brand-primary-soft #6FCFAB`
  (an on-dark teal contrast tint) and a `#C9BBA4` "Natural" finish swatch in
  `HeroObject.tsx`. These are defensible — form-validation status affordances, a
  contrast-safe teal derivative, and a product material finish respectively — but the
  status colors are undocumented in the spec palette. Recommend the spec §1 explicitly
  enumerate permitted semantic-state tokens so future audits don't re-flag them. Not a
  blue/slate violation; not blocking.

## Criterion 3 — Founder narrative (About) — PASS

Live `/about` renders (verbatim):
> "Shikha Gupta (Co-Founder & CEO) and Aditya Gupta (Co-Founder & CTO) founded
> Thridify in Delhi in 2022. Today Shikha leads the company from the Greater Toronto
> Area, bringing 3D and AR commerce to North American retail. Our Delhi team continues
> to power engineering, 3D production and operations."

- Shikha Gupta is fronted (CEO, leads the company). ✓
- Aditya is named only in founding/company context. ✓
- No text implies the founders are physically in India / at Indian events — "Delhi"
  is the founding location (2022) and the location of the *team*, not the founders'
  present location. Shikha is explicitly placed in the Greater Toronto Area. ✓
- Delhi→Toronto journey framed correctly (hero: "Founded in Delhi. Scaling from Toronto."). ✓
- Region cards: **India / Americas / Europe** — confirmed live; "Canada"/"Estonia" absent. ✓

## Criterion 4 — Client references — FAIL (1 MAJOR)

Client logos are the real four (Nasher Miles, Guntier, Sunbaby, Vortex Splash),
sourced from `thridify.com/wp-content/uploads/...`. No invented clients.

**MAJOR (blocking) — B-1:** The primary, above-the-fold logo strip on `/` carries the
present-tense eyebrow **"Trusted by ambitious commerce teams"** over a logo set that
**includes Nasher Miles**, which ASSET-DEBT #2 documents as a **PAST client** whose
mention "must not imply current engagement."
- Evidence: `src/app/page.tsx:102` (`<LogoMarquee eyebrow={home.clients.eyebrow} ...>`),
  `content/site.json:47` (`"eyebrow": "Trusted by ambitious commerce teams"`); live
  `/` contains both "Trusted by ambitious" (true) and "Nasher" (true).
- The project's own remediation for exactly this concern (ASSET-DEBT #2) changed the
  logo-strip label to **"Client work includes"** — but that fix was applied only to the
  *second* logo strip in the Proof section (`src/app/page.tsx:194`), **not** to the more
  prominent hero-adjacent marquee. The result is that the most visible client strip
  still frames a past client under present-tense "Trusted by," which is the precise
  implication gate criterion 4 forbids.
- Fix (easy): set the top marquee eyebrow to a temporally-neutral label consistent with
  the Proof strip (e.g. "Client work includes"), or remove Nasher Miles from the top
  marquee. One-line content change in `content/site.json`.

## Criterion 5 — Footer social URLs — PASS

All four canonical handles present in footer on every route:
`linkedin.com/company/thridify`, `instagram.com/thridify`, `facebook.com/thridify`,
`youtube.com/@thridify`. (A WhatsApp link `wa.me/919667747082` is additionally present —
a contact channel, not one of the four required socials; not a finding.)

---

## Findings (severity-sorted)

| ID | Severity | Finding | Evidence | Clause |
|----|----------|---------|----------|--------|
| B-1 | **MAJOR** | Top home logo marquee frames past client Nasher Miles under present-tense "Trusted by ambitious commerce teams" | `page.tsx:102`, `site.json:47`; live `/` | Gate crit. 4; ASSET-DEBT #2; BUILD-PLAN standing rule #4 |
| B-2 | minor | Undocumented semantic state hexes (#16a34a/#d97706/#dc2626) in `globals.css` not enumerated in spec §1 palette | `globals.css:24-26` | DESIGN-SPEC §1 |

---

## VERDICT: NO-GO

Blocking: **B-1 (MAJOR)** — resolve the past-client "Trusted by" framing on the primary
home logo marquee, then re-audit. All other brand criteria (No-Faking sweep, canonical
palette + fonts, founder narrative, social URLs) PASS.
