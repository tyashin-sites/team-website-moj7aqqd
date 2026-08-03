# 3D model provenance — placeholder demo assets

All models below are **CC0 1.0 (public domain)** from the Khronos
glTF-Sample-Assets repository, self-hosted per DESIGN-SPEC §6. Each was
draco-compressed + WebP-texture-optimised to fit the ≤2MB perf budget
(DESIGN-SPEC §10) via `@gltf-transform/cli`. Posters are seamless raster
stills rendered from the exact model at its initial camera pose
(SEAMLESS POSTER RULE, §6) — regenerate with `scripts` in the session
scratchpad or an equivalent model-viewer headless capture.

These are PLACEHOLDERS. Real client product models replace them
(docs/ASSET-DEBT.md #16); regenerate each poster from the new model.

| File | Source model (Khronos, CC0 1.0) | Used by | Industry fit |
|---|---|---|---|
| sheen-chair.glb | SheenChair | hero, home trio, platform, prefab fallback | generic placeholder |
| furniture-vase.glb | GlassVaseFlowers | /industries/furniture | home decor — good |
| kitchen-teacup.glb | DiffuseTransmissionTeacup | /industries/modular-kitchens | tableware — closest CC0 (want a cabinet/kitchen unit) |
| doors-lantern.glb | Lantern | /industries/doors-and-windows | glass/metal fixture — closest CC0 (want a real door/window) |
| machinery-camera.glb | AntiqueCamera | /industries/industrial-machinery | mechanical apparatus — closest CC0 (want real equipment) |
| surfaces-material.glb | MetalRoughSpheresNoTextures | /industries/laminates-surfaces | material/surface sample — reasonable |

**Prefab & Modular Structures** has NO usable CC0 building/structure model
in the reliable pool (VirtualCity is testing-license-only; Sponza is
Git-LFS-gated), so `/industries/prefab-structures` falls back to the generic
chair — tracked in docs/ASSET-DEBT.md as awaiting a real structure model.
