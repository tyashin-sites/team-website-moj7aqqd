# Thridify Website — Phased Build Plan with Quality Gates (v1)

Companion to `DESIGN-SPEC.md`. Every phase has entry criteria, deliverables,
an exit gate with named auditors, and evidence artifacts committed to
`/audits/` in this repo. No phase advances until its gate passes. The final
launch (Phase 7) executes ONLY on explicit user go-ahead.

**Standing safety rules (apply to every phase):**
1. Production `thridify.com` (WordPress) is NEVER touched. All work happens
   on the Tyashin project `team-website-moj7aqqd`, previewed at
   `site-thridify.snowy-cherry-cd2c.workers.dev`.
2. No DNS, domain, or Tyashin custom-domain changes before Phase 7.
3. The preview host must carry `noindex` while on workers.dev to avoid
   duplicate-content damage to the live site. This MUST be host-conditional
   (only the workers.dev host) and its removal is a first-class Phase 7
   checklist item with post-launch verification (see the ROBOTS_NOINDEX
   incident history — a leftover noindex deindexed two customer sites).
4. No-Faking rule: no invented testimonials, metrics, or client claims.
   Current site's fictional testimonial names must be removed/replaced.
5. All work follows the Tyashin Next.js addendum (per-page metadata §3,
   schema §3b, no ghost links §3d, image optimization) — read
   `aapastech-backend/src/services/generator/agents/nextjs-code-prompt.ts`
   and the `tyashin-nextjs-port` skill before building.
6. `npm run build` green before every push; CI (deploy.yml) must pass.

---

## Phase 0 — Guardrails & Foundation

Deliverables:
- Host-conditional noindex on workers.dev preview (middleware or layout
  logic keyed on request host, NEVER unconditional).
- Brand kit corrected in Tyashin (`PATCH /projects/:id/brand-kit`) to
  canonical palette (#007050 / #FEBFCC / #021F17 / #F0F5FA) + fonts.
- Form pipeline design: form → API route → Slack #thridify-internal alert +
  lead log + auto-ack email with Calendly link (replaces mailto:).
- Analytics decision implemented (YOM dogfood preferred) + conversion events
  defined (demo_click, form_submit, ar_open, config_interact).
- `docs/ASSET-DEBT.md` created (tracks every placeholder needing a real
  asset: client glTF models, real quotes, social handle URLs, AR captures).
Exit gate (auditor: QA): noindex verified host-conditional via curl on both
hosts; brand-kit.css serves canonical palette; build green.

## Phase 1 — Design System

Deliverables: tokens (colors, type scale via next/font Space Grotesk/Inter/
IBM Plex Mono, spacing, radius, shadows, motion utilities incl.
prefers-reduced-motion), rebuilt base components (Header, Footer,
SectionHeading, buttons, cards, FormField), signature components scaffolded
(HeroObject with placeholder CC0 glTF + poster, MetricBar, PipelineStrip,
BeforeAfter, VerticalCard, CTABand).
Exit gate (auditors: Design + QA): side-by-side screenshot audit vs
DESIGN-SPEC §1–7 on mobile/tablet/desktop × light section/dark section;
type-scale overlap regression check; motion respects reduced-motion;
Lighthouse perf ≥ 85 mobile on a component gallery page; build green.

## Phase 2 — Core Pages

Deliverables: Home, Platform, About, Contact rebuilt to §8 blueprints with
text budgets (§3) enforced; fictional testimonials removed (metric proof
cards until real quotes exist); all CTAs → Calendly; contact form on the
Phase 0 pipeline.
Exit gate (auditors: Design + Brand + QA): 5-second test (first-viewport
screenshot must answer "what do they do" — auditor judges cold); word-count
audit per section vs budgets; device-matrix screenshots committed to
/audits/phase2/; zero fake content; per-page metadata + OG images present;
build + CI green.

## Phase 3 — Growth Surface (SEO/LLM layer)

Deliverables: 5 vertical pages, 2 comparison pages, /what-is-thridify fact
page, llms.txt, robots.txt allowing OAI-SearchBot/ClaudeBot/Google-Extended/
PerplexityBot (while KEEPING preview noindex — these are separate concerns),
Organization+SoftwareApplication+FAQ schema, XML sitemap, canonical tags,
internal-link pass (no ghost links per addendum §3d).

STATUS (2026-08-03): Wave A (industry pages, 3D Modelling Service page,
positioning correction, per-industry demo models) DONE in earlier commits.
Wave B SHIPPED 2026-08-03 — [x] sitewide Organization + SoftwareApplication
entity graph + WebSite on Home/platform (`src/lib/schema.ts`,
`src/components/SiteSchema.tsx`); [x] `/what-is-thridify` LLM fact page;
[x] 3 comparison pages `/compare/{threekit,zakeke,marxent}`
(`src/lib/comparisons.ts`); [x] `/llms.txt` + `/robots.txt` route handlers with
the full AI-crawler allowlist + Sitemap ref; [x] sitemap includes all new URLs;
[x] preview noindex header confirmed intact on both hosts. Open: robots/llms
platform-edge interception + SITE_URL preview→prod flip (ASSET-DEBT #20/#21,
Phase-7 items). Ready for the Phase 3 SEO exit-gate audit.
Exit gate (auditor: SEO): schema validates (Rich Results test logic), every
page has unique title/description/OG/canonical, sitemap complete, vertical
pages pass one-intent-per-URL review, extraction test (can an LLM quote the
fact page cleanly), text budgets held.

## Phase 4 — Trust & Compliance

Deliverables: real privacy policy + terms (GDPR/PIPEDA-aware for EU/Canada
targeting), accessibility pass to WCAG 2.1 AA (contrast, keyboard, alt,
landmarks, focus), security/practices page stub, cookie handling consistent
with actual tracking used.
Exit gate (auditor: QA/a11y): automated a11y scan zero criticals + manual
keyboard walkthrough of nav/form/configurator; legal pages reviewed against
what the site actually does; contrast spot-checks incl. pink-on-dark.

## Phase 5 — Performance & Hardening

Deliverables: LCP < 2.5s mobile / CLS < 0.1 / JS budget enforcement, 3D
deferral verified, image optimization through the platform pipeline, 404
page, broken-link sweep, error monitoring hooked.
Exit gate (auditor: QA): Lighthouse mobile ≥ 90 perf / ≥ 95 a11y+SEO+BP on
Home + one vertical page, evidence JSON committed; zero console errors
across all routes.

## Phase 6 — Full Multi-Agent Audit (the "100% confidence" gate)

Four independent auditors run against the finished preview, each producing
a scored report in /audits/phase6/:
- **Design auditor** — spec §§1–9 conformance, distinctiveness ("does this
  look like a template or a showroom?"), 5-second test, text-load test.
- **Brand auditor** — canonical palette only, logo usage, founder-narrative
  rules (Shikha-fronted, no founder-location errors), No-Faking sweep.
- **SEO/LLM auditor** — Phase 3 checks re-run end-to-end + Bing/Google
  readiness, entity consistency vs the canonical description.
- **QA auditor** — every route × 3 viewports × light/dark, every link, every
  form path, CI pipeline, rollback readiness.
Each finding is CONFIRMED/REFUTED adversarially before it counts. Gate:
zero open critical or major findings; every auditor's report ends with an
explicit go/no-go. Loop fix→re-audit until all four say GO. Only then is
the site declared launch-ready to the user.

## Phase 7 — Launch Readiness & Cutover (USER GO REQUIRED)

Prepared in advance, executed only on instruction:
- URL inventory of the WordPress site → 301 redirect map (preserve any
  earned equity; no ghost URLs). **DONE (prepared 2026-08-03):** the complete
  WordPress URL inventory (160 sitemap URLs + GSC legacy URLs) and its full
  disposition table live in `docs/seo-migration-map.md` — the **single source of
  truth** for the redirect map. Clean 301s are already IMPLEMENTED and live-
  verified in `next.config.ts` `async redirects()` (28 rules, all `permanent:
  true`). Open before executing cutover: 5 user decisions in that doc
  (WonderlyAR/education domain, build integration pages, 1:1 blog-post
  migration, `/pricing` page, ranking image URLs) — the ~133 held blog/tag/
  author URLs are a cutover blocker until the blog is migrated 1:1. Keep this
  doc and `next.config.ts` in sync in the same commit.
- Remove preview noindex + post-deploy verification that the real domain
  serves index,follow AND workers.dev behavior is intentional (verify with
  node fetch, not curl|grep — gzip false-negative trap).
- Tyashin custom-domain attach plan for thridify.com (www + apex per
  platform canonical-host rules), rollback = repoint DNS to WordPress.
- Search Console + Bing Webmaster verification, sitemap submission.
- Re-verify `/brand-kit.css` serves the canonical palette on the custom
  domain at cutover (the platform brand kit was PATCHed to canonical on
  2026-07-24 — ASSET-DEBT #13; the site itself keeps local tokens and no
  render-blocking brand-kit.css link).
- Post-launch watch: 48h error/uptime/CWV monitoring checklist.

## Results instrumentation (what "drives results" means, measurably)

- Primary KPI: demo bookings (Calendly clicks + completions) per week.
- Secondary: form submissions, AR interactions, config interactions,
  scroll-depth ≥ 60% on Home, vertical-page → CTA click-through.
- SEO: indexed pages, branded-query coverage, target-query positions.
- LLM: monthly 15-question engine audit (per strategy doc) logged.
- Every phase's changes must name which KPI it serves; anything serving no
  KPI is cut.
