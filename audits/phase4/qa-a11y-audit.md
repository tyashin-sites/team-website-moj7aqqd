# Phase 4 Exit-Gate Audit — QA / Accessibility (WCAG 2.1 AA + Legal/Compliance)

Auditor: QA lens (adversarial). Date: 2026-08-03. HEAD: b520230.
Hosts audited independently:
- Platform: https://team-website-moj7aqqd.sites.tyashin.com
- Worker:   https://site-thridify.snowy-cherry-cd2c.workers.dev

Tooling: axe-core 4.x via @axe-core/puppeteer, tags
`wcag2a,wcag2aa,wcag21a,wcag21aa`, headless Chrome-for-Testing 151, 1280×900.
All live-route facts gathered with `node fetch` (never curl|grep).

## 1. axe-core results (critical / serious per route)

Platform host AND worker host — identical results:

| Route | critical | serious | moderate | minor |
|-------|----------|---------|----------|-------|
| /                        | 0 | 0 | 0 | 0 |
| /platform                | 0 | 0 | 0 | 0 |
| /industries/furniture    | 0 | 0 | 0 | 0 |
| /integrations/shopify    | 0 | 0 | 0 | 0 |
| /contact                 | 0 | 0 | 0 | 0 |
| /privacy                 | 0 | 0 | 0 | 0 |
| /terms                   | 0 | 0 | 0 | 0 |
| /security                | 0 | 0 | 0 | 0 |

Gate = ZERO critical AND ZERO serious → **PASS** (0/0 on all 8 routes, both hosts).

## 2. Manual a11y verification

| Check | Result | Evidence |
|-------|--------|----------|
| Skip-to-content link | PASS | `src/app/layout.tsx:94` `<a href="#main-content" class="skip-link">` |
| `<main id="main-content">` landmark | PASS | `layout.tsx:116` `<main id="main-content" tabIndex={-1}>` |
| One h1 per page | PASS | h1 count = 1 on all 9 sampled routes (fetch parse) |
| Visible pink focus ring | PASS | `globals.css:67-69` `:focus-visible { outline:2px solid var(--brand-accent) /* #FEBFCC */ }` |
| Form inputs have labels | PASS | `ConciergeForm.tsx` all fields via `<FormField label htmlFor>` (email/category/name/company/message) |
| Icon-only / AR / model-viewer accessible names | PASS | model-viewer `alt` (HeroObject:158,251; CapabilityDemo:155,263); AR buttons `aria-label` (CapabilityDemo:182); finish swatches `role=radio`+`aria-label` |
| prefers-reduced-motion honored | PASS | `globals.css:398` media block; `Reveal.tsx` useReducedMotion; HeroObject/CapabilityDemo/PipelineStrip/useCountUp all guard on the query |

## 3. Legal pages

| Page | 200 both hosts | Substantive | Canonical | BreadcrumbList JSON-LD | No fabricated certs |
|------|----------------|-------------|-----------|------------------------|---------------------|
| /privacy  | PASS | PASS (~51.5k chars) | PASS | PASS | PASS |
| /terms    | PASS | PASS (~40.5k chars) | PASS | PASS | PASS |
| /security | PASS | PASS (~39.6k chars) | PASS | PASS | PASS |

Security No-Faking honesty section confirmed present:
`src/app/security/page.tsx:150` — "…such as SOC 2 or ISO 27001 for this
marketing website, and we will not display [badges we have not earned]".
No compliance badge or unearned certification claimed anywhere. **PASS**

## 4. Cookies / consent

`Set-Cookie: null` on `/`, `/privacy`, `/terms`, `/security` (and all 31
routes) on BOTH hosts. No analytics/tracker script wired in source. **PASS**

## 5. Regression sweep (no-break from a11y contrast/opacity changes)

| Check | Result | Evidence |
|-------|--------|----------|
| Palette canonical (no blue/slate/off-palette) | PASS | `globals.css:10-19` canonical #007050/#FEBFCC/#021F17/#F0F5FA; blue/slate grep = only `-translate-y` false positives |
| Muted-text darkening (/50→/70) | PASS | body muted now `/70`,`/75`; residual `/50` are `bg-surface/50`/border only; axe contrast 0 serious |
| PipelineStrip opacity 0.45→0.75 | PASS | `PipelineStrip.tsx:88` `opacity: lit ? 1 : 0.75` |
| tsc --noEmit | PASS | exit 0 (node v20.13.1) |
| npm run build | PASS | exit 0, all routes prerendered |
| Latest CI | PASS | run 30789380240 success (HEAD b520230) |
| All routes 200 (31 checked) | PASS | home/platform/about/contact/industries×6+index/integrations×9+index/compare×3/what-is-thridify/services/privacy/terms/security/gallery |
| /does-not-exist → 404 | PASS | 404 both hosts |
| noindex host-conditional incl 404 | PASS | `x-robots-tag: noindex, nofollow` on every route incl 404, both preview hosts |
| Zero empty CTAs | PASS | no `href=""`/`href="#"` in src |
| Calendly links intact | PASS | `https://calendly.com/hello-thridify/30min` consistent across all CTA sources |
| Demos poster-first | PASS | CapabilityDemo/HeroObject seamless-poster + activate-on-interaction |

## Findings (severity-sorted)

**MINOR-1 (contract-flagged) — Contact email inconsistency.**
Organization schema + site content use `hello@thridify.com`
(`src/lib/schema.ts:49`, `content/site.json:297/337/359/517-518`,
`src/app/llms.txt/route.ts:67`) while the legal pages use
`contact@thridify.com` (`privacy/terms/security page.tsx`). Knowledge bank
says `contact@thridify.com` is canonical. Reconcile to one address. Not a
gate blocker.

**MINOR-2 — /contact missing canonical.**
`src/app/contact/page.tsx:6-15` metadata has no `alternates.canonical`;
live `/contact` head has NO `<link rel="canonical">` (confirmed via fetch),
unlike every other core page. Pre-existing SEO gap (not introduced by the
Phase-4 a11y changes); belongs to the SEO lens. Does not affect the a11y
gate. Flag for reconciliation.

Note (not a finding): blog dark-CTA `placeholder:text-background/50`
(`blog/page.tsx:276`) — `/blog` is platform-intercepted (404 on platform
host, ASSET-DEBT #17) and out of gate scope; all 8 gate routes axe-clean.
ASSET-DEBT #25 legal-facts list is a Phase-7 pre-launch item, not a finding.

## Gate scorecard

| Gate criterion | Verdict |
|----------------|---------|
| axe 0 critical / 0 serious (8 routes ×2 hosts) | PASS |
| Manual a11y (skip link, landmark, h1, focus, labels, names, reduced-motion) | PASS |
| Legal pages 200 + substantive + canonical + breadcrumb + No-Faking | PASS |
| Cookies: no non-essential cookies pre-consent | PASS |
| Regression: palette / build / tsc / CI / routes / noindex / CTAs / demos | PASS |

Zero critical, zero major. Two minors (non-blocking).

VERDICT: GO
