---
title: "How to Prepare a 3D Model for the Web: glTF, Draco, KTX2 and Poly Budgets"
metaTitle: "How to Prepare a 3D Model for the Web"
metaDescription: "Taking a CAD or render-quality model to a product page: glTF format, retopology, Draco and KTX2 compression, and realistic size budgets."
excerpt: "A model that is magnificent in a desktop renderer is frequently unusable on a product page. The gap between the two is not quality — it is that one of them has to arrive over a phone connection in under three seconds."
tags: [3d-modelling, gltf, performance, how-to, technical]
publishAt: 2026-10-13T09:00:00Z
---

A model that is magnificent in a desktop renderer is frequently unusable on a product page.

The gap is not quality. It is that one of them has to arrive over a cellular connection, decompress inside a phone's memory budget, and render at an acceptable frame rate — in under three seconds, on a device the customer bought in 2022.

This is the practical pipeline for getting from a CAD or render-quality asset to something that belongs on a live storefront.

## Step 1 — Get to glTF/GLB, and know why

glTF is the delivery format for 3D on the web, in the same way JPEG is for photographs. GLB is its single-file binary variant, and it is what you want in practice — one file, textures included, nothing to lose in transit.

The distinction that matters: glTF is a **transmission** format, not an authoring or manufacturing format. STEP, IGES, native CAD and .blend files carry information a renderer does not need — construction history, parametric relationships, manufacturing tolerances — and none of it survives the trip, nor should it.

For iOS AR you additionally need **USDZ**. Generate it from the same source as the GLB, in the same step. Two exports that are maintained separately will drift, and the classic symptom is an iOS AR model three finishes out of date.

## Step 2 — Retopologise, rather than decimate

CAD geometry is built for manufacture. It is frequently NURBS-based, and when tessellated it produces triangle counts in the millions with the density distributed for engineering accuracy rather than for what a customer looks at.

The instinct is to run a decimation tool and pull the count down. This works and produces a characteristic result: smooth surfaces develop faceting, sharp edges soften unevenly, and the silhouette — the part the eye reads most strongly — degrades first.

Better is to rebuild the surface topology with the budget spent deliberately:

- **Silhouette edges get density.** The outline is what the eye judges. Faceting on a curved arm is visible at any resolution.
- **Inspection points get density.** Seams, stitching, joints, hinges, mechanisms — the places a buyer zooms into.
- **Hidden geometry gets deleted.** The inside of a closed drawer, the underside of a fixed base, internal fasteners, the back of a wall-standing unit. Not simplified — removed.
- **Flat surfaces get almost nothing.** A tabletop is two triangles. It does not need four thousand.

A useful sanity target for a product-page asset is tens of thousands of triangles, not millions. Getting there by rebuilding rather than by decimating is the difference between a small model and a small, bad model.

## Step 3 — Bake the detail you deleted

The detail removed in step 2 does not have to disappear visually. Normal maps encode surface relief as texture rather than geometry, so a stitched seam or a brushed-metal grain can be baked from the high-resolution model onto the low-resolution one.

This is where most of the perceived quality of a good web model lives. The silhouette comes from geometry; nearly everything inside it comes from maps.

Ambient occlusion baked into the asset is worth the space too — the subtle darkening in crevices and under overhangs that is present in every photograph ever taken and conspicuously absent from cheap 3D.

## Step 4 — Compress the geometry

[Draco](https://github.com/google/draco) is the standard, it is supported natively by glTF, and it typically removes the large majority of the mesh payload.

One caveat worth knowing: Draco decompression costs CPU time on load. On a modern phone this is a non-issue against the network saving. On genuinely low-end hardware with a fast connection the trade can occasionally invert. For nearly every catalogue, compress.

## Step 5 — Supercompress the textures (the step people skip)

This is the one that decides whether your model works on mid-range Android, and it is skipped more often than any other.

A JPEG or PNG texture is compressed **on the wire** and then fully expanded in GPU memory. A 2048×2048 texture set expanded to raw form consumes memory far beyond its download size, and a product with several such materials is how you exhaust a phone's budget and get a blank canvas or a crash.

[KTX2 with Basis Universal supercompression](https://www.khronos.org/ktx/) solves this by staying compressed in GPU memory. It downloads small **and** it occupies a fraction of the VRAM. On a product with multiple materials this is routinely the difference between working and not working.

While you are in there, right-size the resolution. A 4K map on a component occupying a fifth of the screen is invisible quality and very visible load time. Resolution should follow screen coverage, not ambition.

## Step 6 — Fix the materials for real-time

Render-engine materials frequently do not survive the trip. Procedural textures, multi-layer shader graphs and engine-specific nodes have no glTF equivalent and must be flattened to the standard metallic-roughness model: base colour, metalness, roughness, normal, occlusion, emissive.

Two things reliably go wrong here:

**Roughness lands wrong**, and everything looks like plastic. It is usually a single value away from correct, and it is the most common reason 3D furniture reads as fake.

**Base colour still has lighting baked into it.** A base colour map should be flat, unlit and slightly disappointing on its own. If it contains highlights and shadows from the day it was photographed, the model will carry that lighting into every room it is ever shown in — including, most visibly, AR.

## Step 7 — Set true dimensions

Model to the specification sheet in real-world units.

This is invisible on a product page and decisive in AR, where objects are placed at true scale. A model that is 4% oversized looks fine in isolation and obviously wrong beside a real doorway — and a customer who catches one thing that is wrong stops trusting the rest of the page.

## Step 8 — Add a poster and lazy-load

A 3D viewer should paint a **static poster image immediately** and stream the model in behind it. Done properly, the page is visually complete as quickly as it was with a photograph.

The poster is also what a crawler sees, what appears when WebGL is unavailable, and what someone on a poor connection gets. Treat the poster as the real image and the model as the enhancement.

Google's [model-viewer documentation](https://modelviewer.dev/) is the practical reference for poster and lazy-loading behaviour, and worth reading even if you never author the component yourself.

## Step 9 — Test where it will actually fail

- **A mid-range Android on cellular data.** Not a flagship, not office wifi. This is the test.
- **iOS AR specifically.** The USDZ path is separate from the GLB path; a working Android handoff proves nothing.
- **Memory.** Open several product pages in sequence on a phone and watch for the tab reloading — that is memory exhaustion, and it points at textures.
- **Frame rate while orbiting**, not while static.

## A budget worth holding yourself to

There is no universal number, but a reasonable target for a single product-page asset is **single-digit megabytes, fully loaded**, with the poster painting immediately.

If you are being quoted assets in the tens of megabytes, the pipeline above has been skipped somewhere — almost always at step 5.

## Related reading

- [3D modelling service](/services/3d-modelling) — having this done for you
- [3D product visualization](/3d-product-visualization) — what the finished assets produce
- [360° product viewer](/360-product-viewer)
- [How to make 3D furniture look photorealistic](/blog/how-to-make-3d-furniture-look-photorealistic)
