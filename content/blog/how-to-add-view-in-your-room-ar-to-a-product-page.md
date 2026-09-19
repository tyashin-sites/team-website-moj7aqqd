---
title: "How to Add \"View in Your Room\" AR to a Product Page"
metaTitle: "How to Add View-in-Your-Room AR to a Product Page"
metaDescription: "App-free AR on your product pages: how the iOS and Android handoff actually works, what to prepare, and the five things that break it on a real phone."
excerpt: "The tap that opens AR is the worst network moment in the entire session — a customer on mobile data, holding a phone, with no patience. Almost everything that goes wrong with AR goes wrong there."
tags: [ar, webar, how-to, ecommerce]
publishAt: 2026-10-06T09:00:00Z
---

Somewhere on a product page, a customer taps "View in your room". In the next four seconds they either see your sofa standing on their floor, or they see a spinner and go back to browsing.

That tap is the worst network moment in the entire session: a phone, on mobile data, held by someone with no patience and no investment yet. Almost everything that goes wrong with AR goes wrong in those four seconds, and almost all of it is decided before you ever enable the feature.

Here is how the mechanism works, what to prepare, and what breaks.

## How app-free AR actually works

The thing that makes this viable — and that makes it different from the AR apps retailers built in 2018 and quietly retired — is that nobody installs anything. The AR viewer is already on the phone, shipped with the operating system.

**On Android**, your page hands a glTF/GLB model to [Google's Scene Viewer](https://developers.google.com/ar/develop/scene-viewer), part of Google Play Services for AR. It opens, the camera starts, the model is placed.

**On iOS**, your page hands a USDZ file to [AR Quick Look](https://developer.apple.com/augmented-reality/quick-look/), built into iOS. Same outcome, different file format and a different handoff.

Two consequences follow, and they explain most of the operational detail below.

First, **you need the model in two formats**. Not two models — two exports of one source, generated together so they cannot drift apart. The most common AR bug in the wild is an iOS USDZ that is three finishes out of date because someone updated the GLB and not the USDZ.

Second, **you are handing off to software you do not control**. The moment the system viewer opens, its behaviour is Apple's or Google's. This is a feature, not a limitation — it is why the experience is native-quality and why there is nothing to install — but it means your testing has to cover both paths, and a working Android handoff tells you nothing at all about iOS.

## What you need before you enable it

**A model at true dimensions.** Non-negotiable. AR places objects at real-world scale, so proportion errors that are invisible in a product shot become glaring beside a real door frame. Model from the specification sheet, never from a photograph — lenses distort, and a model traced from a photo will be plausibly and consistently wrong.

**A model that is small enough.** See the section below; this is the one that decides whether AR works or merely exists.

**A sensible default placement.** Floor-standing products should anchor to the floor, wall-mounted products to a vertical surface. Getting this wrong produces a wardrobe lying on the carpet, which is funny exactly once.

## Enabling it

On Shopify, WooCommerce, WordPress and the other supported storefronts, AR is a setting on an experience you have already published, not a separate build. If you have a 3D viewer live, you are one toggle from AR. On a custom storefront it is an attribute on the embed.

What deserves thought is not the toggle but the **entry point**. The AR affordance should sit on or immediately beside the main product visual, visible without scrolling on a phone, labelled in plain language — "View in your room" outperforms "AR" and "3D" because it describes the outcome rather than the technology.

## The five things that break it

**1. File size.** The AR tap downloads a model over whatever connection the customer has. If your asset is forty megabytes, a meaningful share of taps will be abandoned before anything renders, and you will see this as "low AR engagement" rather than as the loading problem it is.

Two standards do the work. [Draco](https://github.com/google/draco) compresses geometry. [KTX2 with Basis Universal supercompression](https://www.khronos.org/ktx/) compresses textures and keeps them compressed in GPU memory rather than expanding on arrival — which also prevents the memory exhaustion that kills AR sessions on mid-range Android devices. Ask any vendor for the loaded byte size of one product before you ask about anything else.

**2. Format drift.** The GLB and the USDZ describing different products. Generate both from one source, in one step, every time.

**3. Dead buttons on unsupported devices.** Desktop visitors and older Android hardware cannot do AR. The correct behaviour is that the experience remains an interactive [3D viewer](/360-product-viewer); the incorrect and common behaviour is an AR button that does nothing, which reads as a broken site.

**4. Materials that do not survive relighting.** In AR, your product is lit by the customer's actual room. A material authored as a photograph of wood carries the light from the day that photograph was taken, and will look wrong under a lamp at dusk. Physically based materials — described by roughness, metalness and base colour rather than by a baked image — respond to the room instead of fighting it. This is the same discipline that decides whether [3D furniture reads as photoreal](/blog/how-to-make-3d-furniture-look-photorealistic).

**5. Testing on office wifi.** Every AR demo works on a 500 Mbps connection. Test on cellular data, on a mid-range phone, in a room with ordinary domestic lighting.

## What AR is actually for

It is worth being precise, because it changes where you deploy it.

AR answers **scale and fit**. Will this fit the alcove. Is a 2.4 m wardrobe as imposing as it sounds. Does the sofa leave room to walk past. These are the questions a photograph structurally cannot answer, because a photograph has no relationship to the customer's room.

It partly answers **finish in context** — how the oak reads in their light rather than in a studio.

It does not answer comfort, smell, weight or build quality, and pretending otherwise sets up a disappointment at delivery, which is the thing you were trying to avoid.

So AR earns its place on large, spatially consequential, expensive-to-return goods: furniture, wardrobes, doors, sanitaryware, large appliances, machinery. On a desk lamp it is a nice touch. On a three-metre modular sofa it is the difference between an order and a bounce.

That mapping matters commercially, because returns concentrate in exactly those categories. The National Retail Federation and Happy Returns put US merchandise returns at [nearly $890 billion for 2025](https://nrf.com/media-center/press-releases/consumers-expected-to-return-nearly-850-billion-in-merchandise-in-2025) — and the "not what I expected" share of that is the share showing the real thing, at real size, in the real room, can move.

## What to measure

Not AR session count on its own. That number tells you the button works.

Measure the conversion rate of visitors who used AR against those who did not on the same product, and watch the return rate for that SKU over the following quarter. If AR is doing its job, the second number is where it shows up, and it shows up late.

## Related reading

- [AR product viewer](/ar-viewer) — the capability, and how the handoff works
- [Device compatibility](/device-compatibility) — what supports AR and what falls back
- [360° product viewer](/360-product-viewer) — the desktop half of the same model
- [The returns research](/resources/roi-of-3d-and-ar-commerce)
