---
title: "How to Add a 3D Product Configurator to WordPress (With or Without WooCommerce)"
metaTitle: "How to Add a 3D Product Configurator to WordPress"
metaDescription: "Add an interactive 3D configurator and app-free AR to WordPress — plugin, block or shortcode — including the case where you have no shopping cart at all."
excerpt: "Plenty of WordPress sites that need a 3D configurator have no cart at all. They are catalogue sites, dealer sites and specifier sites, and the thing they need at the end is an enquiry with a specification attached."
tags: [wordpress, 3d-configurator, how-to, b2b]
publishAt: 2026-09-25T09:00:00Z
---

Most guides to this topic quietly assume you are running a shop. A lot of WordPress sites that need a 3D configurator are not.

They are catalogue sites for manufacturers who sell through dealers. Specifier sites for architects and interior designers. Brochure sites where the "buy" button is a contact form and the real transaction happens over email and a site visit. These sites have the same problem an online shop has — a product with fifty finishes and one photograph — but none of the cart machinery, and the thing they need at the end is not an order. It is an enquiry with a specification attached.

This covers both cases: WordPress with WooCommerce, and WordPress without a cart at all.

## First, decide what happens at the end

Before touching anything, answer one question: what should a visitor be able to *do* once they have configured the product?

- **Add it to a cart.** You have WooCommerce, and the configuration maps to variations. This is the [WooCommerce route](/blog/how-to-add-a-3d-product-configurator-to-woocommerce).
- **Request a quote.** No cart. The configuration attaches to a form submission so your sales team receives a specification rather than "hi, interested in the oak one".
- **Find a dealer.** The configuration is saved and handed to whichever dealer covers the postcode.
- **Just look.** Legitimate for a brand site, but be honest that you are buying engagement, not pipeline, and measure it accordingly.

Getting this wrong is the most expensive mistake available here, because it is the only part that is hard to change later.

## Step 1 — Build the experience

The configurator itself is built outside WordPress, in the Thridify Studio, and pulled into the page. You upload the glTF/GLB model, define option groups — finish, size, module, hardware — attach materials to each option, and set any price rules. Publishing gives the experience a stable ID.

That separation is the point. Your marketing team can add a new finish next spring without anyone opening the theme editor, and without a deployment.

If you do not have a model yet, either the CAD your product was designed from can be used, or a modelling service builds one from photographs and dimensions. Insist on owning the resulting files in glTF/GLB and USDZ.

## Step 2 — Install and connect

Install the Thridify plugin from the WordPress admin and paste in your API key. The plugin loads the JS SDK on the front end and registers the embed. If your organisation is careful about plugin count, the alternative is a small script tag and an embed element placed in the theme — the same SDK, added by hand.

## Step 3 — Place it on the page

WordPress gives you three ways to put the experience where you want it, and which you use depends on how the site is built.

**Block editor.** Add the Thridify block to the page or the product template and select the published experience. This is the route for most sites and needs no code.

**Shortcode.** Useful inside page builders, custom post types and templates that the block editor does not reach. Drop it into the template where the visual should sit.

**Direct embed.** For themes with a heavily customised product template, place the embed element in the PHP template and let the SDK hydrate it. This is the only route that needs a developer, and it is one line.

Whichever you pick, place it **in the main visual area**, not in an accordion below the specification table. This is worth repeating because it is the single most common implementation mistake: a configurator's job is to be present at the moment of doubt, and the moment of doubt is while the visitor is looking at the picture.

## Step 4 — Wire the outcome

If you chose "request a quote" in the first section, this is where it happens.

The configured specification should travel with the enquiry — options chosen, dimensions, any derived price — so the email your sales team receives contains the build rather than a description of it. In practice this means passing the configuration state into your form plugin's hidden fields, or letting the experience post the specification alongside the form.

The difference this makes is not cosmetic. A sales team that receives a specification can quote it. A sales team that receives "interested in the walnut, 2.4m" has to start a conversation to establish what the customer already decided ten minutes ago, and a meaningful share of those conversations never get a reply.

## Step 5 — Enable AR, and know what you are enabling

One setting, but it is worth understanding the mechanism because it explains the failure modes.

Android hands the GLB to [Scene Viewer](https://developers.google.com/ar/develop/scene-viewer). iOS hands a USDZ to [AR Quick Look](https://developer.apple.com/augmented-reality/quick-look/). Both are built into the operating system, which is why the shopper installs nothing — and why the model must exist in both formats, generated from a single source so they cannot diverge.

Model to true dimensions. AR places objects at real-world scale; a model built to approximate proportions looks obviously wrong beside a real door frame, and that costs you the visitor's trust in everything else on the page.

## Step 6 — Test on the things your visitors actually use

- A real phone, on mobile data, away from the office network.
- Both platforms — a working Android AR handoff proves nothing about iOS.
- Your caching plugin. Aggressive HTML caching and script concatenation are the two most common reasons a working embed stops working on a live WordPress site.
- A narrow viewport, checking that nothing overlaps a sticky header or a floating enquiry button.
- A desktop, where AR is unavailable — the experience should stay an interactive viewer, not present a dead button.

## The WordPress-specific trap: optimisation plugins

On WooCommerce sites, the thing that breaks a 3D embed is usually the theme. On plain WordPress, it is usually an optimisation plugin.

Script concatenation, deferred loading and aggressive minification are all fine in principle and all capable of breaking a WebGL embed in practice, typically by loading the SDK after the element it is supposed to hydrate. If the experience works with optimisation off and fails with it on, exclude the Thridify script from concatenation and deferral rather than disabling the plugin wholesale.

While you are there: check that the poster image still paints immediately. A 3D viewer should show a static image the instant the page renders, with the model streaming in behind it. That poster is what keeps the page fast for real users, and it is what a crawler sees.

## On page weight

If a 3D page feels broken on a phone, the cause is almost never the renderer — it is asset size. [Draco](https://github.com/google/draco) compresses geometry; [KTX2 with Basis Universal supercompression](https://www.khronos.org/ktx/) compresses textures and keeps them compressed in GPU memory rather than expanding them on arrival, which is what stops mid-range phones from stalling.

"How many megabytes is one loaded product?" is a better question to ask a vendor than anything on their feature comparison table.

## Related reading

- [3D product configurator](/3d-product-configurator) — what it does, and six questions to ask any vendor
- [Thridify for WordPress](/integrations/wordpress) — the integration in detail
- [360° product viewer](/360-product-viewer) — when the product has nothing to configure
- [What a 3D configurator costs](/resources/3d-configurator-cost)
