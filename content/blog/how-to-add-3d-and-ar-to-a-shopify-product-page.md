---
title: "How to Add 3D and AR to a Shopify Product Page"
metaTitle: "How to Add 3D and AR to a Shopify Product Page"
metaDescription: "Putting an interactive 3D viewer, configurator and app-free AR on Shopify — where it goes in the gallery, how variants map, and what breaks on a real phone."
excerpt: "Shopify will happily host a 3D model natively, and for a single fixed product that may be all you need. The moment your product has options, that route runs out — here is where it runs out and what to do instead."
tags: [shopify, 3d-configurator, ar, how-to]
publishAt: 2026-10-30T09:00:00Z
---

Shopify will host a 3D model natively. You can upload a GLB to a product's media, and it appears in the gallery with an AR button. For a single fixed product, that may genuinely be all you need, and you should use it.

This is about where that route runs out — which is the moment your product has options — and what to do at that point.

## Where native Shopify 3D stops

Native media handles *one model per product*. It shows the model, it offers AR, and that is the extent of it.

What it does not do:

- **Change the product in response to a choice.** If a customer picks walnut, the model does not become walnut. It is a fixed asset sitting beside dropdowns, which is the same imagination gap you had with a photograph — now rendered in 3D.
- **Carry live pricing** for option combinations.
- **Give you variant-level analytics** on which finishes get explored and which get abandoned.
- **Handle made-to-order builds** that exceed what Shopify variants can express.

So the decision is straightforward. **Fixed product, no options → use native Shopify 3D.** **Options are the friction → you need a [configurator](/3d-product-configurator) layered onto the product page.** Everything below assumes the second case.

## Step 1 — Get the model right before touching Shopify

The platform is the easy part. The asset decides whether this works.

You need glTF/GLB, built at true dimensions from the specification sheet, with physically based materials, and compressed properly — [Draco](https://github.com/google/draco) for geometry, [KTX2 with Basis Universal supercompression](https://www.khronos.org/ktx/) for textures. The [preparation pipeline](/blog/how-to-prepare-a-3d-model-for-the-web) covers this in full.

Two Shopify-specific notes. First, make sure you own the source files, not just whatever a vendor uploaded to your store. Second, build **one** product first — the SKU with the most options and the most pre-sales hesitation. The reliable way to kill this project is to commission the whole catalogue before anything is live.

## Step 2 — Build and publish the experience

Configuration lives in the Thridify Studio, not in Shopify: upload the model, define option groups, attach materials, set price rules, publish. Publishing yields a stable experience ID, which is the only thing your theme needs to know.

That separation is deliberate and it matters more on Shopify than elsewhere, because it means adding next season's colourway does not involve a theme edit, a preview, and a deploy during trading hours.

## Step 3 — Install the app and place the block

Install the Thridify app from your store admin. It registers a theme app extension, so in the theme editor you get a block you can drag into the product template — no Liquid editing, and no risk of your changes being wiped by a theme update.

Place it **in the gallery area**, as part of the media the customer is already swiping through.

This is the single most consequential decision in the whole implementation, and it is the one most often got wrong. Shopify themes make it very easy to drop a block at the bottom of the product template, below the description and the reviews. A configurator down there is a feature nobody finds. The configurator's job is to be present at the moment of doubt, and the moment of doubt is while the customer is looking at the picture.

If your theme's gallery is hostile to custom blocks, immediately below the gallery and above the add-to-cart is the fallback. Below the fold is not a fallback; it is a decision to not use the thing you bought.

## Step 4 — Map options to Shopify variants

The step that determines whether this earns anything.

Each option in the experience should map to the corresponding Shopify variant, so that a customer who configures a walnut frame in 180 cm adds *that* variant to the cart at the correct price. Where your product uses Shopify's option/variant model cleanly, this is a mapping exercise.

Where it does not — sizes as separate products, finishes encoded in the title, a variant structure that grew organically over four years — expect to tidy the data model first. That work pays for itself independently of this project.

Shopify's 100-variant ceiling is the wall you may hit. A product with 6 finishes × 4 sizes × 5 hardware options is 120 combinations and cannot be expressed as variants at all. In that case the configuration travels as line-item properties instead, carrying the full specification into the order — which is also exactly what your production team needs at the other end.

## Step 5 — Turn on AR

One setting, but know the mechanism because it explains the failure modes.

Android hands the GLB to [Scene Viewer](https://developers.google.com/ar/develop/scene-viewer). iOS hands a USDZ to [AR Quick Look](https://developer.apple.com/augmented-reality/quick-look/). Both ship with the operating system, so nothing is installed — and both formats must be generated from one source so they cannot drift.

Label the entry point in plain language. "View in your room" consistently outperforms "AR" and "3D", because it names the outcome rather than the technology.

## Step 6 — Test the Shopify-specific things

Beyond the usual real-phone-on-cellular-data test:

- **Theme updates.** Re-check the block after every theme update. This is the commonest way a working 3D product page silently reverts.
- **Other apps.** Review apps, upsell widgets and sticky cart bars all compete for the same screen space on mobile. A viewer that overlaps a sticky add-to-cart is a broken page.
- **Quick-view and collection pages.** Some themes render a compressed product view in a modal. Decide deliberately whether the experience appears there, and check it does not break the modal.
- **Speed.** Shopify's own speed score is watched closely. A correctly implemented viewer paints a poster image immediately and streams the model behind it, so the measured paint is unchanged. If your score moves, the poster is not being served first.

## What to measure

Compare the product page against itself, before and after. Add-to-cart rate on that SKU is the immediate signal; return rate for that SKU over the following quarter is the one that pays for the programme, and it lags badly.

Do not report "3D interactions" as the success metric. That number proves the feature exists, which was never in question.

## Related reading

- [Thridify for Shopify](/integrations/shopify) — the integration in detail
- [3D product configurator](/3d-product-configurator)
- [How to add a configurator to WooCommerce](/blog/how-to-add-a-3d-product-configurator-to-woocommerce) — the same job on the other platform
- [AR product viewer](/ar-viewer)
