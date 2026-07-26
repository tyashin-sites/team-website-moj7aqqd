# Proposal — generalize the Thridify embed model beyond product pages

**Status:** draft for discussion (2026-07-26).
**Companion docs:** [HERO-EMBED-REQUIREMENTS.md](HERO-EMBED-REQUIREMENTS.md)
(what this website needs), [COPILOT-PROMPT.md](COPILOT-PROMPT.md) (the
hand-off prompt for the product codebase).

## The problem with the id-triple

The SDK's only addressing mode today is `(accountId, productId, variantId)`,
resolved against the experiences published for that account. That couples
every embed to an e-commerce product page — which is exactly right for the
core Shopify/WooCommerce use case and exactly wrong for everything else
Thridify increasingly needs:

- **Thridify's own marketing site** — the hero should BE the product, not a
  video of it.
- **Docs and onboarding pages** — "here's what a configurator feels like"
  demos inline in documentation.
- **Partner and agency sites** — exhibition-design agencies and 3D
  professionals (a named partner/referrer segment in the ICP) showcasing
  Thridify-built experiences on their own portfolios.
- **Sales collateral** — a link a rep can drop in an email that opens a
  full-bleed hosted experience, no customer website required.
- **Trade-show kiosks / landing pages** — the North-America wedge motion
  (3D modelling services first, platform upsell second) needs somewhere to
  show modelling work that has no storefront yet.

Each of these is blocked today or requires faking a product page.

## Proposed model: experiences are the addressable unit

Make the **published experience** the first-class addressable thing, with
*bindings* that attach it to contexts:

```
experience (stable slug, versioned artifacts, poster, option groups, pricing)
  ├── product binding:    (productId, variantId)  ← today's model, unchanged
  ├── standalone binding: none — mountable anywhere allowlisted by id
  └── hosted binding:     canonical page at go.thridify.com/x/<account>/<slug>
```

- **Product binding** is what the triple lookup becomes internally: a
  mapping table from `(productId, variantId)` → experience slug. The
  existing SDK entry point does that mapping first, then joins the same
  code path as standalone mounts. One runtime, two front doors.
- **Standalone binding** is the new mode (full contract in
  HERO-EMBED-REQUIREMENTS.md): stable slug, origin allowlist, poster/LCP
  contract, bidirectional events API, budgets, clean lifecycle.
- **Hosted binding** is nearly free once standalone exists: a Thridify-owned
  page that mounts the experience full-bleed. This is the shareable demo
  link for sales, the QR target for trade-show print, and the AR hand-off
  URL for desktop→phone.

Account-type flag (`internal` for Thridify-owned marketing/demo accounts —
unbilled, separately metered) rounds it out. Partner accounts later reuse
the same mechanism with a `partner` kind if partner-specific terms emerge.

## Migration notes for the triple lookup

1. **No breaking change.** The `(accountId, productId, variantId)` API keeps
   working verbatim. Internally it is re-implemented as
   `resolveBinding(product, variant) → experienceSlug → standard manifest`.
   Ship that refactor behind a shadow-mode comparison (old resolver and new
   resolver both run; log divergence) before cutting over.
2. **Backfill.** Every already-published experience gets a generated stable
   slug at migration time (e.g. from its internal id). Existing product
   bindings are rows in the new mapping table — a mechanical backfill.
3. **Manifest unification.** The product-page path should return the same
   manifest shape the standalone endpoint returns (poster URL, option
   groups, minor-unit pricing, declared beacons). Customers get the poster
   /LCP and events-API improvements for free without changing their embed
   code.
4. **Allowlist grandfathering.** Existing customer embeds predate origin
   allowlists. On migration, seed each account's allowlist from the domains
   observed in recent SDK telemetry (or the store domain on file), default
   to warn-only for one release, then enforce.
5. **Deprecation posture.** Do not deprecate the triple. It is the right
   ergonomic for platform plugins (Shopify/Woo inject product context
   naturally). The triple becomes sugar over bindings, not legacy.

## Why this ordering pays

The marketing-site hero forces every hard sub-problem — stable addressing,
origin policy, LCP discipline, events API, lifecycle hygiene — on a property
Thridify controls end-to-end, with the website team as a demanding in-house
customer. Once that lands, hosted demo links and partner embeds are
configuration, not projects; and the customer-facing embed inherits a
cleaner contract than it has today. The pitch also gets simpler: "embed a
Thridify experience anywhere" is a stronger line than "install our plugin
on your product page."

## Open questions

- Pricing/entitlement for standalone embeds on *customer* accounts — free
  within plan view quotas, or a plan feature? (Internal accounts sidestep
  this; decide before opening standalone mode to customers.)
- Should hosted pages (`go.thridify.com/x/...`) carry Thridify branding and
  a CTA by default? (Recommended: yes for internal/demo, configurable for
  paying customers.)
- Multi-currency in manifests for the North-America motion (CAD/USD vs INR)
  — per-experience currency now, or a currency-by-market map later?
