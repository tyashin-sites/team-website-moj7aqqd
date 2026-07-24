# QA Audit — Phase 0 + Phase 1 Exit Gates

- **Lens:** qa (adversarial; guardrails + design-system build integrity, NOT page content)
- **Auditor:** thridify-website-auditor
- **Date:** 2026-07-24
- **Commit audited:** `97936c9` (feat(phase-1): canonical design system + signature components + showroom hero)
- **Preview:** https://site-thridify.snowy-cherry-cd2c.workers.dev
- **Method:** live `node -e 'fetch(...)'` probes (never curl|grep) + repo source inspection + local build on node v20.13.1. Every finding reproduced twice.

---

## Gate scorecard

### Phase 0 — Guardrails & Foundation

| Criterion | Result | Evidence |
|---|---|---|
| Noindex host-conditional, verified on preview host | **PASS** | All of `/`, `/about`, `/platform`, `/contact`, `/industries`, `/blog`, and 404 path `/definitely-not-a-page-xyz` return `x-robots-tag: noindex, nofollow` on workers.dev. Source: `src/middleware.ts:24` keys on `host.endsWith('.workers.dev')` — NOT unconditional. Phase 7 removal comment present (`src/middleware.ts:15-18`) citing the ROBOTS_NOINDEX incident. Matcher covers pages + API routes. |
| Contact pipeline (form → API route) | **PASS** (with 1 minor) | `POST /api/contact` happy path → `200 {"ok":true}`; missing name → `400 Name is required`; invalid email → `400 A valid email is required`; non-JSON body → `400 Invalid JSON body`; `GET` → `405` (no 500). Form mounts on `/contact` (`<form>` present) and references Calendly (`src/components/ContactForm.tsx:6`). Lead insurance log + waitUntil forward per design (`src/app/api/contact/route.ts`). Slack/CRM/auto-ack absent = ASSET-DEBT #7, not a finding. |
| Brand kit canonical palette | **PARTIAL / UNVERIFIED** | `GET /brand-kit.css` on the preview host → **404** (site Worker doesn't serve it; platform edge serves it on custom domains, which don't exist pre-Phase 7). The Tyashin-side `PATCH /projects/:id/brand-kit` could not be verified from this repo. Site-local design tokens DO carry the canonical palette: `src/app/globals.css:10-17` (`#007050`, `#FEBFCC`, `#021F17`, `#F0F5FA`). See finding QA-5. |
| Analytics decision (YOM + conversion events) | **NOT IMPLEMENTED — known debt** | No analytics wired. Tracked as ASSET-DEBT #5 ("NEEDS USER INPUT" class), so per audit rules not counted as a finding, but the Phase 0 deliverable is factually incomplete until the decision is recorded. |
| `docs/ASSET-DEBT.md` exists | **PASS** | 11 entries, includes GLB budget overrun (#8) and lead-destination gap (#7). |
| Build green | **PASS** | See Phase 1 build row. |

### Phase 1 — Design System (QA-lens criteria only; visual/side-by-side is the design auditor's report)

| Criterion | Result | Evidence |
|---|---|---|
| `npm run build` green (node 20) | **PASS** | Clean production build on v20.13.1, 10/10 static pages generated. NOTE: first attempt aborted on stale local `.wrangler` state (`SQLITE_BUSY` in workerd) — environmental, cleared by removing local state dir; not a repo defect (`.wrangler/` is gitignored, per CLAUDE.md §7). |
| `npx tsc --noEmit` clean | **PASS** | Exit 0. (Type-clean, yet the CTA shape mismatch in QA-1 slipped through because `content/site.json` is consumed via `(siteData as any)` — the cast defeats the type system.) |
| CI green | **PASS** | Latest run on `tyashin-sites/team-website-moj7aqqd`: `30084383376` success (Deploy to Cloudflare Workers, main, 2026-07-24). |
| All routes 200, no hydration/application errors in HTML | **PASS** | 6 routes 200, 404 path 404; zero `Application error` / hydration-error markers in served HTML. |
| Model GLB serves correctly | **PASS** | `/models/sheen-chair.glb` → 200, `content-type: model/gltf-binary`, `content-length: 4385048`, valid `glTF` magic bytes. Poster `/models/sheen-chair-poster.svg` → 200 `image/svg+xml`. |
| 3D deferral (perf sanity vs DESIGN-SPEC §10) | **PASS** | `sheen-chair.glb` is NOT referenced anywhere in initial home HTML; no `<model-viewer>` in server HTML; poster IS present in hero HTML (LCP frame). 4.4MB GLB exceeds the ≤2MB budget but is ASSET-DEBT #8 with the deferral mitigation, which verifiably works — not a finding. Home HTML 105.1 KB, 31 `<script>` tags, First Load JS 151 kB (build output) — noted for the Phase 5 budget gate, acceptable now. |
| Reduced-motion respected | **PASS (source-level)** | `src/app/globals.css:326` `@media (prefers-reduced-motion: reduce)`; runtime guards in `MetricBar.tsx:34`, `HeroObject.tsx:46`, `PipelineStrip.tsx:28`. |
| Lighthouse perf ≥ 85 mobile on a component gallery page | **FAIL — NOT EVIDENCED** | No component gallery route exists (routes are only `/`, `/about`, `/platform`, `/contact`, `/industries`, `/blog`, `/api/contact`) and no Lighthouse evidence is committed to `/audits/`. The gate criterion cannot be satisfied as written. See QA-3. |
| Round-6 regression check | **FAIL** | Calendly hrefs: PASS (present on every page, 3–7 refs each). Footer real social icons: PASS (lucide `Linkedin/Facebook/Instagram` SVGs, `src/components/Footer.tsx:3,27-29`; placeholder root-domain hrefs = ASSET-DEBT #3). No `→` literals: **FAIL** — see QA-2. |

---

## Findings (severity-sorted)

### QA-1 · CRITICAL — CTA content-shape mismatch renders empty "Book a Demo" buttons on `/` and `/platform`

`content/site.json` uses `primaryCta.text` / `secondaryCta.text` for **every** page (`home`, `about`, `platform`, `industries` — verified programmatically), but `src/app/page.tsx:348,352` and `src/app/platform/page.tsx:140,145,275,280` read `.label`. Result, verified live twice on the preview:

- Home final CTA section ("Ready to retire flat product pages?"): primary button renders as `<a class="btn btn-primary ..." href="https://calendly.com/hello-thridify/30min"> →</a>` — an arrow-only button; secondary renders `<a class="btn btn-ghost ..." href="/platform"></a>` — **completely empty**.
- `/platform`: **four** empty `btn` anchors (2× Calendly, 2× `/industries`) — hero and bottom CTA, primary and secondary, all labelless.

The RSC flight payload confirms it: `"children":["$undefined"," →"]`. `/about` and `/industries` are unaffected only because their page code reads `.text`.

Spec clauses violated: BUILD-PLAN standing rule 6 spirit (shippable quality), BUILD-PLAN "Results instrumentation" (primary KPI = demo bookings — the demo CTAs are the exact elements broken), and WCAG (anchors with no accessible name — will also fail the Phase 4 a11y gate). Note `tsc` passes because `siteData` is consumed through `(siteData as any)` (`src/app/page.tsx:91`), which defeats the type guardrail.

**Fix direction (for the builder, not applied by this audit):** unify on one key (`text` or `label`) across `content/site.json` and all page readers, and remove the `as any` so the compiler enforces the contract.

### QA-2 · MAJOR — Round-6 regression: `→` literals are back in rendered HTML on 4 pages

Round 6 established "no `→` literals anywhere in HTML output". Live HTML now contains raw `→` text nodes (verified in served markup, not just flight data):

| Page | Source | Rendered context |
|---|---|---|
| `/` | `src/app/page.tsx:199` | `All industries →` (btn-ghost link) |
| `/` | `src/app/page.tsx:348` | the arrow-only CTA from QA-1 |
| `/platform` | `src/app/platform/page.tsx:220` | bare `→` in a styled span, rendered 6× |
| `/industries` | `src/app/industries/page.tsx:252` | `Book a Demo <span aria-hidden>→</span>` |
| `/about` | `src/app/about/page.tsx:293` | `WhatsApp →` (2×) |
| `/blog` | `src/app/blog/page.tsx:251` | `Next →` pagination |

Only the `/industries` instance is aria-hidden; the rest are raw text (read aloud by screen readers as "right arrow"). Whatever icon treatment round 6 standardized on (SVG/lucide, as the footer correctly uses), Phase 1's rebuilt components regressed it.

### QA-3 · MAJOR — Phase 1 exit-gate criterion "Lighthouse perf ≥ 85 mobile on a component gallery page" is unsatisfiable: no gallery page exists, no evidence committed

BUILD-PLAN Phase 1 exit gate names this measurement explicitly. There is no component-gallery/styleguide route in `src/app/`, and `/audits/` contained no Lighthouse evidence at audit time. Either build the gallery page and commit the Lighthouse JSON, or amend BUILD-PLAN to name a real page — the gate cannot pass as written. (Perf *sanity* signals gathered here are healthy — deferred GLB, poster LCP frame, 151 kB first-load JS — but they are not the evidence the gate demands.)

### QA-4 · MINOR — `/api/contact` has no request-size cap

A 2 MB JSON body is accepted → `200 {"ok":true}` (fields are truncated server-side — `message` to 5000 chars — so nothing crashes and nothing oversized is forwarded). No 500, so the gate's "oversized handled" bar is met, but an explicit `content-length` guard (e.g. reject > 32 KB with 413) would close a trivial abuse/log-flooding vector on a workers.dev-exposed endpoint.

### QA-5 · MINOR — Phase 0 gate item "brand-kit.css serves canonical palette" is unverifiable on the preview host

`GET https://site-thridify.snowy-cherry-cd2c.workers.dev/brand-kit.css` → 404. On this platform `/brand-kit.css` is served by the central edge for storefront domains, not by the site Worker directly, so the gate as written can't be checked until a custom domain exists (Phase 7). The site's own tokens match the canonical palette exactly (`src/app/globals.css:10-17`). Action: either verify the Tyashin-side brand kit via the admin API and log the evidence here, or amend the Phase 0 gate wording to "site design tokens match canonical palette" for the pre-domain period.

---

## Non-findings (checked, clean)

- Noindex guardrail: fully compliant on all 7 probed paths incl. API and 404; host-conditional in source; removal comment present.
- Contact validation matrix: all 4 negative paths behave; GET is 405 not 500.
- Build/typecheck/CI: all green on node 20 (after clearing stale local `.wrangler` workerd lock — environmental).
- GLB over-budget (4.4 MB vs ≤2 MB): ASSET-DEBT #8; the deferral mitigation is real and verified working.
- Footer placeholder social hrefs (`https://linkedin.com` etc.): ASSET-DEBT #3.
- No Slack/CRM/auto-ack on leads: ASSET-DEBT #7.
- No analytics: ASSET-DEBT #5 (Phase 0 deliverable pending user decision — flagged in scorecard, not a code finding).

---

## Verdict

Zero-critical-and-zero-major is the bar. There is one critical and two major findings.

**VERDICT: NO-GO**

Blocking list:
1. **QA-1 (critical)** — empty/labelless demo CTAs on `/` and `/platform` from the `text` vs `label` shape mismatch.
2. **QA-2 (major)** — `→` literal regression on `/`, `/platform`, `/about`, `/blog` (round-6 fix undone).
3. **QA-3 (major)** — Phase 1 Lighthouse gate has no gallery page and no committed evidence; gate unsatisfiable as written.
