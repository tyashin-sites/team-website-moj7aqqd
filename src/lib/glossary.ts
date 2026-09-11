/**
 * CANONICAL GLOSSARY — the single source for /glossary and /glossary/<slug>.
 *
 * Purpose (SEO + GEO): definitional pages are the easiest to rank and the
 * most-quoted by AI assistants. Each entry opens with a one-sentence,
 * quotable definition (`short`), then explains it in Thridify's context.
 *
 * Rules: No-Faking (facts only, canonical metrics only, no invented specs);
 * `short` ≤ 160 chars so it doubles as the meta description; no pricing.
 * "BOM export" is deliberately NOT a glossary entry (user decision).
 */

export type GlossaryTerm = {
  /** Stable slug — never change once live. */
  slug: string;
  term: string;
  /** Alternate names/abbreviations for search + schema alternateName. */
  aka?: string[];
  /** One-sentence definition (≤160 chars) — the quotable line. */
  short: string;
  /** 2–4 paragraphs of plain text. */
  body: string[];
  /** Why it matters for a commerce brand — one short paragraph. */
  whyItMatters: string;
  related: string[];
  /** Deep links into the site where the concept is used. */
  seeAlso?: { label: string; href: string }[];
};

export const GLOSSARY: GlossaryTerm[] = [
  {
    slug: '3d-product-configurator',
    term: '3D product configurator',
    aka: ['product configurator', 'visual configurator'],
    short:
      'A 3D product configurator lets a shopper change a product’s options — colour, material, size, parts — on an interactive 3D model and see the result and price instantly.',
    body: [
      'Instead of a static gallery, the product page shows a live 3D model. Every option the brand sells — fabric, finish, hardware, modules — is a control the buyer can change, and the model updates in real time.',
      'A commerce-grade configurator is tied to real business rules: each configuration has a price, maps to the store’s variants, and can generate an instant quotation for the sales team.',
      'Configurators matter most for products that vary by size, finish or material — furniture, kitchens, doors and windows, luggage, lighting — where a photo per combination is impossible.',
    ],
    whyItMatters:
      'Configuration replaces guesswork: the buyer sees exactly what they are ordering, which is why Thridify’s published outcomes include 3× higher conversion and 75% lower returns.',
    related: ['3d-product-viewer', 'variant-mapping', 'webar', 'pbr-materials'],
    seeAlso: [
      { label: '3D Configurator', href: '/platform#configurator' },
      { label: 'Modular kitchens', href: '/industries/modular-kitchens' },
    ],
  },
  {
    slug: '3d-product-viewer',
    term: '3D product viewer',
    aka: ['360° product viewer', '3D viewer'],
    short:
      'A 3D product viewer is an interactive, rotatable 3D model embedded on a product page so shoppers can spin, zoom and inspect a product from every angle.',
    body: [
      'Unlike a 360° photo spin (a sequence of photographs), a true 3D viewer renders a real 3D model in the browser, so the shopper can rotate freely, zoom into detail and, with hotspots, read notes about materials and craftsmanship.',
      'Modern viewers run on WebGL in any browser without plug-ins, and the same model can power augmented reality and configuration.',
    ],
    whyItMatters:
      'Inspection builds confidence. Interactive listings hold attention longer than flat photos, which Thridify sees as 100% more engagement and a 100% higher click-through rate.',
    related: ['3d-product-configurator', 'hotspots', 'webgl', 'gltf-glb'],
    seeAlso: [{ label: '3D 360° Viewer', href: '/platform#viewer' }],
  },
  {
    slug: 'webar',
    term: 'WebAR (app-free AR)',
    aka: ['web-based augmented reality', 'browser AR', 'app-free AR'],
    short:
      'WebAR is augmented reality that runs in a phone’s web browser, so a shopper can place a product in their real space from a product page without installing an app.',
    body: [
      'On iPhone and iPad, WebAR hands the 3D model to Apple’s built-in AR Quick Look; on Android it uses Google’s Scene Viewer. Both are part of the operating system, so nothing is downloaded.',
      'The shopper taps “View in your space”, points the camera at the floor or wall, and the product appears at true scale, anchored in place, so they can walk around it and judge fit.',
      'Because it is a link rather than an app, WebAR works from search results, ads, emails and QR codes as well as the product page.',
    ],
    whyItMatters:
      'Seeing scale and finish in the real room is the strongest returns lever in visual commerce — the shopper answers “will it fit?” before checkout.',
    related: ['ar-quick-look', 'scene-viewer', 'usdz', 'lidar-placement'],
    seeAlso: [
      { label: 'AR Viewer', href: '/platform#ar' },
      { label: 'Device compatibility', href: '/device-compatibility' },
    ],
  },
  {
    slug: 'ar-quick-look',
    term: 'AR Quick Look',
    aka: ['Apple AR Quick Look', 'iOS Quick Look'],
    short:
      'AR Quick Look is Apple’s built-in augmented-reality viewer on iPhone and iPad that opens a USDZ model from Safari and places it in the room — no app required.',
    body: [
      'Quick Look is part of iOS and iPadOS (15 or later for current experiences). When a WebAR link points to a USDZ file, Safari opens it directly in Quick Look.',
      'On LiDAR-equipped Pro devices placement is almost instant; on other iPhones the device scans the floor for a few seconds first. Thridify exports each product as USDZ automatically for this path.',
    ],
    whyItMatters:
      'Quick Look is why app-free AR works on every modern iPhone: the viewer is already installed on the device.',
    related: ['webar', 'usdz', 'scene-viewer', 'lidar-placement'],
    seeAlso: [{ label: 'Device compatibility', href: '/device-compatibility' }],
  },
  {
    slug: 'scene-viewer',
    term: 'Scene Viewer (Android)',
    aka: ['Google Scene Viewer', 'ARCore Scene Viewer'],
    short:
      'Scene Viewer is Google’s built-in 3D and AR viewer on Android that opens a glTF/GLB model from the browser and places it in the room using ARCore.',
    body: [
      'It requires Android 8 or later with Google Play Services for AR (ARCore), which is preinstalled on most phones from the last few years. Placement is camera-guided: the phone finds the floor as the user moves it slightly.',
      'Thridify serves the same GLB used by the web viewer, so there is one source model for web, Android AR and (via USDZ) iOS AR.',
    ],
    whyItMatters:
      'Together with AR Quick Look on iOS, Scene Viewer means one link gives app-free AR to nearly every smartphone shopper.',
    related: ['webar', 'ar-quick-look', 'gltf-glb'],
    seeAlso: [{ label: 'Device compatibility', href: '/device-compatibility' }],
  },
  {
    slug: 'gltf-glb',
    term: 'glTF / GLB',
    aka: ['GL Transmission Format', '.glb', '.gltf'],
    short:
      'glTF is the open standard file format for 3D models on the web; GLB is its single-file binary form, bundling geometry, materials and textures for fast loading.',
    body: [
      'Maintained by the Khronos Group, glTF is often called “the JPEG of 3D”: compact, widely supported and designed for real-time rendering in browsers and apps.',
      'GLB packs the model, textures and animations into one file, which is what web viewers, Android Scene Viewer and most AR pipelines consume. Thridify delivers models as glTF/GLB (plus USDZ for iOS).',
    ],
    whyItMatters:
      'Owning your catalogue as glTF/GLB means the same assets run in any viewer, marketplace or AR pipeline — no vendor lock-in.',
    related: ['usdz', 'draco-compression', 'ktx2-texture-compression', 'pbr-materials'],
    seeAlso: [{ label: '3D Modelling Service', href: '/services/3d-modelling' }],
  },
  {
    slug: 'usdz',
    term: 'USDZ',
    aka: ['Universal Scene Description (zip)'],
    short:
      'USDZ is Apple’s packaged 3D file format, based on Pixar’s Universal Scene Description, used by AR Quick Look to show a model in augmented reality on iPhone and iPad.',
    body: [
      'A USDZ file is a zip archive containing the scene, textures and materials in USD form. Safari recognises it and opens AR Quick Look directly.',
      'Because web viewers use glTF/GLB, an AR-ready product needs both: Thridify exports USDZ automatically from the same source model so iOS shoppers get the same product in AR.',
    ],
    whyItMatters:
      'Without USDZ there is no app-free AR on iPhone — roughly half of many brands’ mobile traffic.',
    related: ['ar-quick-look', 'gltf-glb', 'webar'],
  },
  {
    slug: 'draco-compression',
    term: 'Draco compression',
    aka: ['Draco mesh compression'],
    short:
      'Draco is an open-source compression library from Google that shrinks 3D geometry (meshes and point clouds) so glTF/GLB models download several times faster.',
    body: [
      'Draco compresses vertex positions, normals and UVs with minimal visible loss. A furniture model that would be tens of megabytes uncompressed can load in a fraction of the time on mobile.',
      'Web viewers decode Draco on the fly using a small WebAssembly decoder. Thridify delivers models draco-compressed and optimised for fast loading on any device.',
    ],
    whyItMatters:
      'Load time is conversion: a heavy model that stalls on 4G loses the shopper before the first spin.',
    related: ['gltf-glb', 'ktx2-texture-compression', 'progressive-loading'],
  },
  {
    slug: 'ktx2-texture-compression',
    term: 'KTX2 / GPU texture compression',
    aka: ['Basis Universal', 'GPU-compressed textures'],
    short:
      'KTX2 is a container for GPU-compressed textures (Basis Universal) that stay compressed in graphics memory, cutting the memory a 3D scene needs by a large multiple.',
    body: [
      'Ordinary JPEG or PNG textures are decompressed into raw pixels on the GPU, so a scene with many high-resolution finishes can exhaust a phone’s graphics memory. KTX2 textures are transcoded to a format the GPU reads natively, using a fraction of that memory.',
      'Thridify delivers materials and finishes as GPU-compressed textures on supported devices, with automatic fallback to standard images elsewhere, which is what keeps large configurators stable on older phones.',
    ],
    whyItMatters:
      'Memory, not bandwidth, is what crashes 3D on budget and older phones. Compressed textures are how a 50-finish configurator runs on a three-year-old device.',
    related: ['draco-compression', 'pbr-materials', 'lite-mode'],
    seeAlso: [{ label: 'Device compatibility', href: '/device-compatibility' }],
  },
  {
    slug: 'pbr-materials',
    term: 'PBR materials',
    aka: ['physically based rendering', 'physically based materials'],
    short:
      'PBR (physically based rendering) materials describe a surface by real-world properties — base colour, roughness, metalness, normal detail — so it looks correct under any lighting.',
    body: [
      'A PBR material is a set of texture maps: base colour, metallic, roughness, normal (surface detail) and sometimes ambient occlusion. Because the renderer simulates how light actually behaves, a walnut veneer or brushed brass looks right in the viewer, in AR and in a rendered lifestyle scene alike.',
      'This is what separates photoreal product models from “rough approximations”: correct materials at the correct scale, built from real references.',
    ],
    whyItMatters:
      'Buyers judge finish and sheen. PBR is why a configured finish on screen matches the product that arrives.',
    related: ['3d-product-configurator', 'ktx2-texture-compression', 'gltf-glb'],
    seeAlso: [{ label: '3D Modelling Service', href: '/services/3d-modelling' }],
  },
  {
    slug: 'lidar-placement',
    term: 'LiDAR placement vs guided placement',
    aka: ['instant AR placement', 'camera-guided AR'],
    short:
      'LiDAR placement uses the depth scanner on Pro iPhones and iPads to place an AR product almost instantly; guided placement, on other phones, finds the floor from camera motion in a few seconds.',
    body: [
      'A LiDAR scanner measures the room directly, so the product appears on the floor the moment the camera opens. Devices without LiDAR watch how the image shifts as the phone moves to work out where the floor is — that is a property of camera-based AR on every platform, not a vendor limitation.',
      'Guided placement typically takes 5–15 seconds in good light on a textured floor. Dim rooms, plain or glossy floors and standing still make it slower. After placement both behave identically.',
    ],
    whyItMatters:
      'Knowing this stops teams from misreading normal AR behaviour as a bug — and helps write honest on-page coaching for shoppers.',
    related: ['webar', 'ar-quick-look', 'scene-viewer'],
    seeAlso: [{ label: 'Device compatibility', href: '/device-compatibility' }],
  },
  {
    slug: 'webgl',
    term: 'WebGL',
    aka: ['Web Graphics Library'],
    short:
      'WebGL is the browser API that renders hardware-accelerated 3D graphics inside a web page, and is what makes 3D product viewers and configurators possible without plug-ins.',
    body: [
      'Every modern browser on desktop and mobile supports WebGL. A 3D viewer uses it to draw the model, lighting and materials at interactive frame rates.',
      'Its successor, WebGPU, is arriving in browsers, but WebGL remains the compatibility baseline for commerce experiences today.',
    ],
    whyItMatters:
      'WebGL is the reason 3D commerce needs no app, no download and no special device.',
    related: ['3d-product-viewer', 'webxr', 'gltf-glb'],
  },
  {
    slug: 'webxr',
    term: 'WebXR',
    aka: ['WebXR Device API'],
    short:
      'WebXR is the web standard that lets a browser access AR and VR hardware — cameras, sensors, headsets — so immersive experiences can run from a URL.',
    body: [
      'WebXR underpins browser-based AR sessions on supporting devices, while the commerce path on today’s phones typically hands off to the operating system’s own viewer (AR Quick Look on iOS, Scene Viewer on Android) for reliability.',
      'Thridify’s stack is built on these open web standards — WebGL, WebXR, glTF — rather than proprietary apps.',
    ],
    whyItMatters:
      'Open standards mean experiences work across devices and survive platform changes without a rebuild.',
    related: ['webar', 'webgl'],
  },
  {
    slug: 'visual-commerce',
    term: 'Visual commerce (3D & AR commerce)',
    aka: ['immersive commerce', '3D commerce', 'AR commerce'],
    short:
      'Visual commerce is selling through interactive product experiences — 3D viewers, configurators and augmented reality — instead of static photos, so buyers can explore, customise and place a product before purchase.',
    body: [
      'The term covers the experience layer (3D and AR on the product page), the content layer (photoreal 3D models replacing photoshoots) and the data layer (what shoppers configure and how that converts).',
      'For custom and high-consideration products it changes the sales process itself: instant configuration and quotes shorten the cycle from enquiry to order.',
    ],
    whyItMatters:
      'Brands that adopt it early own the shopper’s confidence — and the returns, conversion and content-cost outcomes that follow.',
    related: ['3d-product-configurator', '3d-product-viewer', 'webar'],
    seeAlso: [
      { label: 'What is Thridify?', href: '/what-is-thridify' },
      { label: 'The platform', href: '/platform' },
    ],
  },
  {
    slug: 'variant-mapping',
    term: 'Variant mapping',
    aka: ['SKU mapping', 'option-to-model mapping'],
    short:
      'Variant mapping links each option in a 3D configurator to the matching variant or SKU in the store, so the cart, price and stock reflect exactly what the shopper configured.',
    body: [
      'A store already knows its variants — “Sofa, Velvet, Forest Green, 3-seat” — by ID. Mapping ties each configurator control to those IDs, so choosing a finish in 3D selects the right variant, shows its price and adds the correct item to the cart.',
      'Thridify matches products and variants by ID on Shopify, WooCommerce and the other supported platforms, and exposes the same mapping through its SDK for custom stores.',
    ],
    whyItMatters:
      'Without mapping, 3D is decoration. With it, the configurator becomes the store’s ordering surface.',
    related: ['3d-product-configurator', 'plugin-vs-embed'],
    seeAlso: [{ label: 'Integrations', href: '/integrations' }],
  },
  {
    slug: 'hotspots',
    term: 'Hotspots and annotations',
    aka: ['3D annotations', 'callouts'],
    short:
      'Hotspots are clickable markers pinned to points on a 3D model that reveal notes, images or videos — used to explain materials, joinery, features and care on the product itself.',
    body: [
      'Because a hotspot is anchored to the model’s surface, it stays attached as the shopper rotates and zooms. Brands use them for craftsmanship stories, dimensions, care instructions and upsell prompts.',
      'Thridify’s viewer supports hotspots with brand-matched theming and embedded media.',
    ],
    whyItMatters:
      'Hotspots put the sales conversation on the product, where a flat photo would need a paragraph of copy.',
    related: ['3d-product-viewer', '3d-product-configurator'],
    seeAlso: [{ label: 'Features', href: '/features' }],
  },
  {
    slug: 'progressive-loading',
    term: 'Progressive loading (poster-first)',
    aka: ['poster image', 'lazy 3D loading'],
    short:
      'Progressive loading shows a lightweight poster image of the product first and streams the interactive 3D scene behind it, so the page paints instantly and the model appears when ready.',
    body: [
      'The poster is a real render of the product’s default state, so nothing shifts when the 3D takes over. Finishes can apply at low resolution first and sharpen in place.',
      'This is how a 3D product page stays Core Web Vitals-friendly: no layout shift, no blocking download, and the heavy work only starts when the shopper is there to see it.',
    ],
    whyItMatters:
      'Search ranking and conversion both punish slow pages; poster-first loading is what keeps 3D from costing either.',
    related: ['draco-compression', 'ktx2-texture-compression', 'lite-mode'],
  },
  {
    slug: 'lite-mode',
    term: 'Lite mode (adaptive quality)',
    aka: ['adaptive 3D quality', 'device tiers'],
    short:
      'Lite mode is an adaptive setting where a 3D viewer serves reduced-resolution textures and trims extras on low-memory devices so the experience stays smooth instead of crashing.',
    body: [
      'Thridify sorts every device into a tier automatically — full quality, guided AR, lite 3D, or 3D-only with AR handed to the phone by QR code — based on graphics memory and AR support. Shoppers never configure anything.',
      'On devices with 2 GB of memory or less, Lite mode keeps browsing stable through long sessions and many finish switches.',
    ],
    whyItMatters:
      'A 3D experience that works only on flagship phones excludes a large share of real buyers.',
    related: ['ktx2-texture-compression', 'progressive-loading', 'lidar-placement'],
    seeAlso: [{ label: 'Device compatibility', href: '/device-compatibility' }],
  },
  {
    slug: 'plugin-vs-embed',
    term: 'Plugin vs embed vs SDK',
    aka: ['App Block', 'embed snippet', 'JS SDK'],
    short:
      'A plugin installs 3D and AR into a commerce platform with no code; an embed is a lightweight snippet for any site; an SDK and API give developers full control on custom storefronts.',
    body: [
      'Plugins (for example a Shopify Theme App Extension or a WordPress plugin) add the experience to product and collection templates from the platform’s own admin. Embeds are a script tag plus a product reference that drop into any page. The SDK exposes the viewer, configurator and events to code.',
      'All three render the same experiences from the same published products, so a brand can start with a plugin and move to the SDK without rebuilding content.',
    ],
    whyItMatters:
      'The integration path decides who has to be involved: for plugins and embeds, nobody technical.',
    related: ['variant-mapping', 'visual-commerce'],
    seeAlso: [
      { label: 'Integrations', href: '/integrations' },
      { label: 'Custom integration', href: '/integrations/custom-integration' },
    ],
  },
];

export const GLOSSARY_SLUGS = GLOSSARY.map((g) => g.slug);

export function getTerm(slug: string): GlossaryTerm | undefined {
  return GLOSSARY.find((g) => g.slug === slug);
}
