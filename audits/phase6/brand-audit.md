# Phase 6 — Full-Site Confidence Gate — BRAND LENS

Auditor: adversarial brand lens. Date: 2026-08-03.
Hosts audited (node fetch, gzip-safe): raw worker `site-thridify.snowy-cherry-cd2c.workers.dev`
and platform `team-website-moj7aqqd.sites.tyashin.com`. 30 routes × 2 hosts (60 fetches),
all 200 except platform `/llms.txt` 404 (known ASSET-DEBT #20 — edge interception, not a defect).
Spec basis: DESIGN-SPEC §1/§2/§6/§7.2, ASSET-DEBT.

## Per-criterion results

1. Canonical metrics only (§7.2) — **PASS.** Sitewide the only rendered/JSON-LD figures are
   75% / 3× / 100% / 70% / 100% / 40% with correct label pairing (returns / conversion /
   engagement / photography / click-through / inventory). Home renders all six correctly;
   llms.txt "Impact metrics" = exactly the six. Two false positives cleared: home `50%` is
   inside the real Vortex Splash testimonial quote; compare-page `31%/38%` are CSS column
   widths (`w-[31%]`/`w-[38%]`), not claims. No stray/invented stat on any of the 9 integration
   pages. Turnaround copy on /services/3d-modelling is qualitative ("clear per-SKU timeline"),
   no fabricated day counts.
2. Positioning — no automated "3D content generation" — **PASS.** Zero positive gen claims.
   The only two "automated content" strings (/what-is-thridify, /llms.txt) are explicit
   negations ("Thridify does NOT do automated content generation"). "3D Modelling Service" is
   the product; 5-module suite (Viewer/Configurator/AR/Modelling/Analytics) consistent home,
   platform, what-is, llms.txt.
3. Testimonials / clients — **PASS.** Only Guntier / Sunbaby / Vortex Splash, company-level
   attribution, on Home. Zero client names on integration or compare pages (metric-only proof).
   Integration mechanism copy is honest embed/SDK only (JS SDK renders by product/variant ID,
   in-browser AR) — no fabricated app-store listings, plugin names, or partnership claims across
   all 9. Logo strip uses temporally-neutral "Client work includes".
4. Competitor honesty on /compare/* — **PASS.** Concedes real competitor strengths (e.g.
   Threekit enterprise 3D config + virtual photography, Salesforce/CPQ), neutral "Varies /
   contact vendor" + "Contact sales" where unknown. No fabricated competitor metrics or quotes.
5. Palette + fonts — **PASS.** No `#046bd2`/`#1e293b`, no slate/blue/indigo/sky/cyan token
   classes. Fonts = Space Grotesk / Inter / IBM Plex Mono only.
6. Education fully absent — **PASS.** Zero matches for education/pre-school/flashcard/
   WonderlyAR/classroom/publishing/AR-book across all HTML, llms.txt, and schema.
7. Entity + contact consistency — **PASS.** CANONICAL_DESCRIPTION verbatim-identical across
   home schema, /what-is-thridify first paragraph, and /llms.txt. `contact@thridify.com` on all
   30 routes; zero `hello@` except the Calendly `hello-thridify/30min` booking URL. Legal name
   "Aapastech Private Limited". Founders Shikha Gupta (CEO, Toronto-fronted) + Aditya Gupta
   (CTO); schema jobTitles correct. No present-tense founder-in-India: founding = "Delhi 2022"
   (historical origin, allowed Delhi→Toronto); present "Founder base = Toronto/Americas", India =
   "Engineering & 3D studio". Regions named India / Americas / Europe. 4 canonical socials
   (linkedin.com/company/thridify, instagram.com/thridify, facebook.com/thridify,
   youtube.com/@thridify) in footer + sameAs + llms.txt.
8. Legal/security No-Faking — **PASS.** No aggregateRating/offers/price in any JSON-LD. Security
   page carries the honest disclaimer: "we do not currently claim formal third-party
   certifications such as SOC 2 or ISO 27001". No award-winning/certified/trusted-by fabrications.

## Minor observation (non-blocking, not a No-Faking violation)
- `/llms.txt` "Integrations" lists only Shopify, WooCommerce, WordPress + custom, while the site
  ships 9 integration pages (adds Wix, BigCommerce, Magento, commercetools, Canva). This is an
  honest *understatement* on the machine-extraction surface, not a fabrication — brand-clean.
  Worth reconciling for entity completeness but does not gate the brand lens.

## Verdict
Zero critical, zero major findings. VERDICT: GO
