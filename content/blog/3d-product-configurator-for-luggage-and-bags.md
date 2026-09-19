---
title: "A 3D Product Configurator for Luggage and Bags: The 54-Colourway Problem"
metaTitle: "3D Product Configurator for Luggage and Bags"
metaDescription: "Luggage is one shell in many colourways, sizes and finishes. Why that catalogue shape makes 3D configuration unusually economic, and how to build it."
excerpt: "A luggage range is usually one shell, three sizes and eighteen colourways. That is fifty-four photography jobs and one modelling job, which is the entire argument in a sentence."
tags: [luggage, bags, 3d-configurator, ecommerce]
publishAt: 2026-10-27T09:00:00Z
---

A luggage range is usually one shell, three sizes and eighteen colourways.

That is fifty-four photography jobs and one modelling job. The entire commercial argument for 3D in this category fits in that sentence, and it is a cleaner argument here than in almost any other vertical — because luggage has the catalogue shape that makes the maths work: **high variant count, low geometric variation.**

Furniture has to model a sofa, a table and a wardrobe separately. A luggage brand models a shell once and then dresses it fifty-four ways.

## Why the economics are unusually good here

Photography prices by the combination; 3D prices by the product. In most categories that crossover is a calculation. In luggage it is obvious.

Three effects follow, and the second and third are the ones brands tend to underestimate.

**A new colourway stops being a shoot.** It becomes a material swap on an existing model — which means a seasonal colour can be tested on the site before it is committed to production, rather than after.

**Marketplace imagery stops being a bottleneck.** Every marketplace has its own image spec: white background, specific angles, specific margins, specific aspect ratios. Rendering a compliant set from a model is a queue job. Re-shooting to a new spec is a booking.

**The tail gets covered.** Every luggage brand has colourways that are photographed once, badly, in one angle, because they did not justify a proper shoot. Those SKUs underperform for reasons that have nothing to do with the product. A model gives the eighteenth colour the same treatment as the first.

## What the customer is actually uncertain about

Worth being precise, because it determines what you build rather than what looks impressive in a demo.

**Colour fidelity.** The single biggest driver of returns in this category. A "champagne" case that arrives beige is a return, and screen-to-product colour is genuinely hard. Physically based materials — describing how a surface responds to light rather than baking in one lighting setup — hold up far better across devices than a photograph taken under studio lights.

**Size, in a way they can believe.** Cabin-size regulations vary by airline, and "55 × 40 × 20 cm" means very little to most people. This is the question [AR](/ar-viewer) answers properly: the case standing on their actual floor, next to their actual doorway, at true scale.

**Finish and texture.** Ribbed versus smooth, matte versus gloss, the specific grain of a moulded polycarbonate. These are close-inspection details, which is what a [360° viewer](/360-product-viewer) with zoom is for.

**Mechanisms.** Wheel housings, telescopic handle stages, lock type, interior compartment layout. These generate a disproportionate share of pre-sales questions and are answered permanently by anchored hotspots.

Notice that this list maps onto different tools. Colour and finish want a configurator; size wants AR; mechanisms want a viewer with hotspots. Most luggage brands need all three, which is unusual — and is why [the sequencing decision](/blog/360-viewer-vs-3d-configurator-vs-ar-which-one-do-you-need) matters less here than the model quality does.

## Building it

**Model the shell once, properly.** This asset will represent every SKU in the range, so the investment is concentrated and worth making well. Real dimensions from the specification sheet. Correct proportions for wheel housings and handle geometry. Enough geometric detail at seams, zips and corner guards, because those are where a buyer zooms.

**Make colourways materials, not models.** Eighteen colours is eighteen material definitions on one asset, not eighteen assets. If a vendor proposes one model per colourway, they have misunderstood the brief and the invoice will show it.

**Model sizes as real geometry, not as a scale factor.** A cabin case is not a large case shrunk — proportions, wheel size and handle stages differ. Usually three variants of the shell rather than one.

**Animate the mechanisms.** A telescopic handle extending and a lid opening to reveal the interior are, in this category, worth more than another still image. This is the closest a web page gets to the showroom gesture of picking the case up and opening it.

**Enable AR, and make the entry point obvious.** "See it next to you" is a better label than "AR". Cabin-size anxiety is a real, specific, frequent hesitation, and this resolves it in four seconds.

## The part that decides whether it works: file size

A luggage model is geometrically simple, which makes it tempting to be generous with texture resolution. Do not be.

Fabric weave, moulded polycarbonate grain and brushed hardware all want detailed maps, and a shell carrying several 4K materials is exactly how you end up with a product page that stalls on a mid-range phone. [KTX2 with Basis Universal supercompression](https://www.khronos.org/ktx/) keeps textures compressed in GPU memory rather than expanding them on arrival; [Draco](https://github.com/google/draco) handles the geometry. Resolution should follow screen coverage rather than ambition.

The honest test is a mid-range Android on cellular data, not a flagship on office wifi. The [asset preparation pipeline](/blog/how-to-prepare-a-3d-model-for-the-web) covers the rest.

## Where the payback shows up

Luggage returns are dominated by two causes — colour not matching expectation, and size not matching expectation — and both are addressable by showing the real thing rather than describing it.

The National Retail Federation and Happy Returns put US merchandise returns at [nearly $890 billion for 2025](https://nrf.com/media-center/press-releases/consumers-expected-to-return-nearly-850-billion-in-merchandise-in-2025). The headline is not the useful part; the useful part is that the "not what I expected" share is precisely the share a good model can move.

Measure it on one SKU, on its own page, before and after: engagement, add-to-cart rate, and — with a quarter's lag — return rate for that SKU. The last number is slow and is the one that pays for the programme.

## Related reading

- [Luggage & bags](/industries/luggage) — the vertical in detail
- [3D product configurator](/3d-product-configurator)
- [AR product viewer](/ar-viewer) — the cabin-size question
- [3D product visualization](/3d-product-visualization) — the photography maths
