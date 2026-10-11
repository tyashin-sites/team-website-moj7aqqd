---
title: "7 Things a 3D Room Visualizer Has to Get Right (and How to Test for Them)"
metaTitle: "7 Things a 3D Room Visualizer Has to Get Right"
metaDescription: "True scale, fading walls, lights that light, real materials, plan view, walk-through and whole-room AR: seven tests to run before you buy."
excerpt: "Every room visualizer looks good in the vendor's demo. Here are the seven things to check in the first ten minutes with your own products in it."
tags: [room visualizer, 3d room planner, true scale, evaluation, furniture ecommerce]
publishAt: 2026-10-23T09:00:00Z
---

Every room visualizer looks good in the vendor's demo, because the vendor chose the products, the room and the camera. The useful test is the first ten minutes with your own catalogue in it. These are the seven things that decide whether a shopper trusts the room, with a concrete check for each. They come from building Thridify's own [room visualizer](https://thridify.com/room-visualizer) and from the bugs that had to be fixed along the way.

## 1. True scale, not convenient scale

The most common failure in room planners is silent: every product is normalised to a comfortable size so it "looks right" on first placement. A 203 cm sofa and a 60 cm side table end up the same length. The room looks plausible and is fiction.

We shipped this bug ourselves. Products were being fitted to one metre on their longest side because the catalogue did not carry dimensions, and a three-seater came in at the size of an armchair. The fix was to trust the model's native units (Thridify models are authored in metres), correct the ones authored in centimetres or millimetres, and only fall back to a default size for models with absurd dimensions.

**Test:** place your longest sofa and your smallest table. Switch to plan view. Measure them against the room dimensions. If the ratio is wrong, nothing else about the planner can be trusted.

## 2. Walls that get out of the way

A room has walls, and walls block the camera. A planner that renders four opaque walls forces the shopper to fight the camera to see anything; a planner with no walls is a product floating on a floor, which is not a room.

The behaviour that works: walls fade as the camera orbits to look through them, and everything attached to a faded wall (art, windows) fades with it. Wall art must also be hung *on* the wall surface, not centred inside the wall's thickness, or it clips and flickers.

**Test:** hang a picture, then orbit until that wall is between the camera and the room. The wall and the picture should both fade. Zoom into the picture from the front: it should sit flat on the surface, not half-buried.

## 3. Lighting that actually lights

A pendant lamp in a room planner is usually a shape. The shopper placing it wants to see the light it throws, because that is what they are buying. A lamp that casts no light is an ornament.

Lights should carry a real light source, and the room should have presets (studio-soft, warm-living, cool-daylight, dramatic-spot and so on) so the shopper can see materials under the kind of light their own room has. A velvet that looks right under showroom light and wrong under warm evening light is a return.

**Test:** place a floor lamp near a wall. Does the wall get brighter? Switch the room from a daylight preset to an evening one. Does the fabric change the way fabric changes?

## 4. Real materials for the floor and walls

Shoppers judge a rug against the floor and a sofa against the wall. If the floor is a flat beige and the wall is a flat white, the shopper cannot make either judgement, and the product looks like a catalogue cut-out.

Floors and walls need physically based materials, not colour fills: marble, terrazzo, travertine, oak, walnut, parquet, stone, each with real roughness and reflectivity, with the tiling scale and rotation adjustable so a plank floor runs the way the room does. Rugs need the same treatment: fabric, pattern, pile thickness and fringe, not a flat rectangle.

**Test:** put a dark sofa on a dark walnut floor and then on a pale oak one. The sofa should read differently. Change the plank rotation. Look at the rug edge-on: it should have thickness.

## 5. A plan view with real footprints

Furniture is bought with a tape measure. The top-down plan is where the shopper confirms that the dining table leaves room to pull the chairs out, and that the rug is bigger than the coffee table. A planner without a plan view is asking the shopper to estimate that from a perspective render, which they cannot do.

**Test:** switch to plan view and check the room dimensions are labelled and the product footprints are drawn at scale. Drag a chair away from a table: the gap should be measurable.

## 6. A walk-through at eye height

Orbit shows the room as a dollhouse. Shoppers do not live in dollhouses; they stand in rooms, at about 1.6 metres, and look across them. A walk mode, with keyboard on desktop and a virtual joystick on touch, is what turns the plan into a space. It is also where mistakes in scale (item 1) become obvious, because a sofa that is too small is immediately wrong when you are standing next to it.

**Test:** drop to walk mode, stand by the sofa, look at the pendant. Is the lamp over the table at a height a person would hang it?

## 7. AR of the whole room, not one product

The point of composing a room is to see the composition. If the AR step can only export a single product, the shopper is back on the product page with extra clicks.

The composed room should leave as one model and open in the phone's native viewer (Scene Viewer on Android, Quick Look on iOS), with a QR hand-off from desktop. Products should be exported by default, and the room's own elements (floor, walls, rug) optionally, because a shopper standing in their real room does not want a second floor rendered over it.

**Test:** place three products, open AR on a phone. All three should appear, in their relative positions, at real size. Then check: did the rug come along? It should not, unless you asked for it.

## The things that matter to the brand rather than the shopper

Three more checks, for whoever is buying the planner rather than using it.

**Is it your catalogue, configured?** The products in the room must be your published products, and the placed sofa must be the configuration the shopper chose, with that choice stored on the item so it can be edited later and, eventually, turned into an order. A planner that places the default build and discards the configuration has thrown away the sale.

**Can your team publish looks?** The first thing a shopper sees should be a room your merchandiser styled, not an empty box. The brand needs to save rooms and publish them from the admin, without engineering, and shoppers need to open those [curated looks](https://thridify.com/shop-the-look) and make them their own.

**Does it inherit your brand?** Logo, accent, currency and whether prices show should come from the account's existing brand settings. A room page that looks like the vendor is a demo.

## Running the test

Ask for your own products to be loaded, or use the configurable ones already in the vendor's live catalogue, and work through the seven checks in order. Scale first, because if it fails nothing else matters. A 30-minute demo on Thridify's existing live looks is enough to run all seven, and the 15-day free trial of the platform is where you run them on your own catalogue.
