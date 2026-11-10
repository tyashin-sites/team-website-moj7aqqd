import Link from 'next/link';
import { SITE_URL } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';

// "3D & AR, platform by platform": the public, sourced explainer of how 3D
// and AR behave on each platform Thridify runs on (Apple AR Quick Look, Google
// Scene Viewer, Chrome WebXR, browser WebGL). Every platform statement links
// to the vendor's own documentation or the open standard. Thridify-specific
// statements mirror thridify-fe behaviour (USDZ generated from the live
// configured scene on iOS, an uploaded USDZ used as-is, AR prep budgets,
// products true-to-size / rooms scalable) — keep in sync when that changes.
// Copy rule: informative and positive; no "limit"/"limitation" wording.
// Linked from /device-compatibility, /resources and the footer Platform column.

const CANONICAL = '/3d-ar-platform-guide';

export const metadata = pageMetadata({
  title: '3D and AR on iPhone, Android and the Web: What to Expect',
  description:
    'How 3D and AR behave on AR Quick Look, Scene Viewer, WebXR and the web: configuration, animation, lighting, materials, placement and file size.',
  path: CANONICAL,
  image: '/og/default.png',
  ogTitle: '3D & AR, platform by platform',
  ogDescription:
    'What travels into AR, how materials and light behave, and how placement works on every platform, with the sources behind each point.',
});

type Source = { label: string; href: string };
type Topic = {
  id: string;
  title: string;
  /** What the shopper sees. */
  happens: string;
  /** Why: the platform behaviour, in plain words. */
  why: string;
  /** How Thridify works with it, or what we recommend. */
  approach: string;
  sources: Source[];
};

const S = {
  appleUsdValidate: { label: 'Apple: Validating USD files', href: 'https://developer.apple.com/documentation/usd/validating-usd-files' },
  appleQlEffects: { label: 'Apple: Visual effects in AR Quick Look and RealityKit', href: 'https://developer.apple.com/documentation/arkit/adding-visual-effects-in-ar-quick-look-and-realitykit' },
  appleUsdCreate: { label: 'Apple: Creating USD files for Apple devices', href: 'https://developer.apple.com/documentation/usd/creating-usd-files-for-apple-devices' },
  appleQuickLook: { label: 'Apple: AR Quick Look', href: 'https://developer.apple.com/augmented-reality/quick-look/' },
  appleTracking: { label: 'Apple: Understanding world tracking', href: 'https://developer.apple.com/documentation/arkit/understanding-world-tracking' },
  appleOcclusion: { label: 'Apple: Occluding virtual content with people', href: 'https://developer.apple.com/documentation/arkit/occluding-virtual-content-with-people' },
  appleHig: { label: 'Apple Human Interface Guidelines: Augmented reality', href: 'https://developer.apple.com/design/human-interface-guidelines/augmented-reality' },
  appleScaling: { label: 'Apple: allowsContentScaling', href: 'https://developer.apple.com/documentation/quicklook/arquicklookpreviewitem/allowscontentscaling' },
  appleLidar: { label: 'Apple Newsroom: iPad Pro with LiDAR Scanner', href: 'https://www.apple.com/newsroom/2020/03/apple-unveils-new-ipad-pro-with-lidar-scanner-and-trackpad-support-in-ipados/' },
  webkitQl: { label: 'WebKit: Viewing AR assets in Safari for iOS', href: 'https://webkit.org/blog/8421/viewing-augmented-reality-assets-in-safari-for-ios/' },
  webkitIframe: { label: 'WebKit bug 284100: Quick Look from an embedded frame', href: 'https://bugs.webkit.org/show_bug.cgi?id=284100' },
  usdPreview: { label: 'OpenUSD: UsdPreviewSurface specification', href: 'https://openusd.org/release/spec_usdpreviewsurface.html' },
  sceneViewer: { label: 'Google: Scene Viewer', href: 'https://developers.google.com/ar/develop/scene-viewer' },
  arcoreDevices: { label: 'Google: ARCore supported devices', href: 'https://developers.google.com/ar/devices' },
  arcoreFundamentals: { label: 'Google: ARCore fundamental concepts', href: 'https://developers.google.com/ar/develop/fundamentals' },
  arcoreLighting: { label: 'Google: ARCore lighting estimation', href: 'https://developers.google.com/ar/develop/lighting-estimation' },
  arcoreDepth: { label: 'Google: ARCore Depth API', href: 'https://developers.google.com/ar/develop/depth' },
  arcoreWebxr: { label: 'Google: WebXR with ARCore', href: 'https://developers.google.com/ar/develop/webxr' },
  mvAr: { label: 'model-viewer source: how AR modes launch', href: 'https://github.com/google/model-viewer/blob/master/packages/model-viewer/src/features/ar.ts' },
  xrAnchors: { label: 'W3C Immersive Web: WebXR Anchors', href: 'https://immersive-web.github.io/anchors/' },
  xrHitTest: { label: 'W3C Immersive Web: WebXR Hit Test', href: 'https://immersive-web.github.io/hit-test/' },
  xrLighting: { label: 'W3C Immersive Web: WebXR Lighting Estimation', href: 'https://immersive-web.github.io/lighting-estimation/' },
  mdnXr: { label: 'MDN: XRSystem browser support', href: 'https://developer.mozilla.org/en-US/docs/Web/API/XRSystem#browser_compatibility' },
  mdnXrIframe: { label: 'MDN: xr-spatial-tracking permission', href: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Permissions-Policy/xr-spatial-tracking' },
  mdnWebgl: { label: 'MDN: WebGL best practices', href: 'https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices' },
  gltfSpec: { label: 'Khronos: glTF 2.0 specification (alpha modes)', href: 'https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html#alpha-coverage' },
  gltfTransmission: { label: 'Khronos: KHR_materials_transmission', href: 'https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_transmission/README.md' },
  gltfVariants: { label: 'Khronos: KHR_materials_variants', href: 'https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_variants/README.md' },
} satisfies Record<string, Source>;

const PATHS = [
  {
    t: 'iPhone & iPad',
    k: 'Apple AR Quick Look',
    b: 'Every iOS browser hands AR to Apple’s built-in viewer, which opens a USDZ file. Thridify builds that file from what the shopper has on screen.',
  },
  {
    t: 'Android',
    k: 'Chrome WebXR · Google Scene Viewer',
    b: 'Chrome on ARCore devices places the live 3D scene in the room right from the page. Elsewhere, Google’s Scene Viewer app opens the product’s published file.',
  },
  {
    t: 'Desktop & laptop',
    k: 'WebGL in the browser',
    b: 'The full 3D viewer and configurator run in any modern browser. “View in your space” shows a QR code that carries the session to a phone.',
  },
];

const GROUPS: { id: string; title: string; intro: string; topics: Topic[] }[] = [
  {
    id: 'what-travels',
    title: 'What travels into AR',
    intro:
      'The 3D viewer runs in the page, so it can do anything the browser can. AR opens in the phone’s own viewer, which reads a product file. What reaches AR is what that file format carries.',
    topics: [
      {
        id: 'configuration',
        title: 'Your configuration',
        happens:
          'On iPhone, iPad and in Chrome on Android, AR shows exactly the finish, colour and options the shopper picked. In Google’s Scene Viewer app, AR shows the product’s published default finish.',
        why:
          'On iPhone the AR file is created from the live scene the moment AR opens. Chrome’s WebXR places the live scene itself. Scene Viewer is a separate app that downloads a file from a web address; it cannot open files created inside the browser, so it receives the published file, and it does not read glTF material variants.',
        approach:
          'By default Thridify opens Chrome’s in-page AR first wherever the phone supports it, so Android shoppers on those devices see their configuration. Where a configuration must also appear in Scene Viewer, our team can publish a dedicated file for it.',
        sources: [S.mvAr, S.sceneViewer, S.gltfVariants],
      },
      {
        id: 'animation',
        title: 'Animation',
        happens:
          'A configured product opens in iPhone AR as a still model: doors, drawers and moving parts rest in their default pose. A product with its own animated AR file plays that animation in AR, in the finish the file was made with. Scene Viewer on Android plays a product’s first animation.',
        why:
          'Apple’s viewer plays animation that is authored into a USDZ file. A configuration is created live, in the browser, and is exported as a still scene so it opens in seconds. Google’s Scene Viewer documents that it plays only the first animation in a file.',
        approach:
          'For each product, choose what matters most in AR: the shopper’s live configuration, or a signature animation. The 3D viewer plays every animation either way, and our modelling team can prepare an animated AR file for the hero finish.',
        sources: [S.appleQuickLook, S.appleUsdValidate, S.sceneViewer],
      },
      {
        id: 'lights',
        title: 'Lamp and scene lights',
        happens:
          'A lamp, pendant or LED strip looks lit in the 3D viewer and casts its glow on the room scene. In AR the fixture appears, and the room around it is lit by the shopper’s real lights.',
        why:
          'AR viewers light products from the camera’s view of the real room. Apple’s renderer for AR does not use lights stored in a file, and Scene Viewer does not read the glTF lights extension.',
        approach:
          'Give glowing parts, such as a lampshade or bulb, a self-lit material, so the fixture itself still reads as switched on in AR. Our modelling team sets this up on request. To show the light a lamp throws across a room, use the 3D room visualizer.',
        sources: [S.appleUsdValidate, S.sceneViewer, S.usdPreview],
      },
      {
        id: 'video',
        title: 'Video finishes',
        happens:
          'A screen or panel playing video in 3D shows a still frame in AR.',
        why:
          'Apple’s AR file format holds image textures (JPEG, PNG, EXR and AVIF), not video.',
        approach:
          'Thridify captures the current video frame when AR opens, so the surface still shows real content instead of a blank panel.',
        sources: [S.appleUsdCreate],
      },
      {
        id: 'page-ui',
        title: 'Hotspots, labels and page controls',
        happens:
          'Hotspots, dimension labels, price and the configurator panel stay with the 3D viewer. AR shows the product itself, full screen.',
        why:
          'AR opens in the phone’s own viewer, outside the web page, and that viewer shows the model file.',
        approach:
          'Shoppers configure and read the details in 3D, then step into AR to judge size and fit. Returning from AR brings them back to the same page.',
        sources: [S.webkitQl, S.sceneViewer],
      },
    ],
  },
  {
    id: 'materials',
    title: 'How materials and colour look',
    intro:
      'Each platform renders materials with its own engine. Most materials (wood, metal, fabric, stone, paint) look the same everywhere; a few special effects are drawn differently.',
    topics: [
      {
        id: 'glass',
        title: 'Glass, liquids and fabric sheen',
        happens:
          'Clear glass, refraction and the soft sheen of velvet are drawn in full in the 3D viewer. In iPhone AR, glass appears as a tinted surface and velvet as a matte fabric. Glossy lacquer coats carry over.',
        why:
          'Apple’s AR material model supports colour, metalness, roughness, clearcoat and opacity, but not transmission or cloth sheen. In browsers, true refraction is one of the most demanding effects to draw, and transparent surfaces are sorted by approximation in every real-time renderer.',
        approach:
          'Our modelling team tunes opacity and tint so glass reads well in AR, while the 3D viewer keeps full refraction and sheen. Glass-heavy products deserve a quick look in AR before launch.',
        sources: [S.usdPreview, S.appleQlEffects, S.gltfTransmission, S.gltfSpec],
      },
      {
        id: 'colour',
        title: 'Colour and reflections follow the room',
        happens:
          'In AR a product takes on the light of the room: warmer under lamps, cooler by a window, and reflections show the room rather than the studio.',
        why:
          'Both Apple and Google estimate the room’s light and reflections from the camera, so the product sits naturally in the space. That estimate changes with the room and can update as the camera moves.',
        approach:
          'This is what makes AR convincing. For exact colour matching, the 3D viewer’s studio lighting is the reference; AR answers “how will it look in my room?”.',
        sources: [S.appleHig, S.arcoreLighting, S.xrLighting],
      },
      {
        id: 'patterns',
        title: 'Tiled patterns',
        happens:
          'Wood grain, tiles and printed fabrics tile the same way in 3D and AR. Complex layered pattern effects are simplified in iPhone AR.',
        why:
          'Apple’s AR renderer supports one texture placement per material.',
        approach:
          'Where a pattern is layered, our modelling team can bake it into a single texture so it matches across 3D and AR.',
        sources: [S.appleUsdValidate],
      },
    ],
  },
  {
    id: 'placement',
    title: 'Placing products in the room',
    intro:
      'AR placement is the phone understanding the room through its camera and sensors. It works the same way for every brand on every platform.',
    topics: [
      {
        id: 'floor',
        title: 'Finding the floor',
        happens:
          'On iPhone Pro and iPad Pro models the product lands almost instantly. Other phones ask the shopper to move slowly for a few seconds first.',
        why:
          'A LiDAR scanner measures the room directly. Camera-only devices find surfaces by tracking visible detail as the camera moves, so plain, glossy or dark floors and dim rooms take longer.',
        approach:
          'Thridify keeps AR files light so the scan starts quickly, and coaches the shopper on screen. Good light and a floor with some texture help most.',
        sources: [S.appleLidar, S.appleTracking, S.arcoreFundamentals],
      },
      {
        id: 'settling',
        title: 'Placement settles as the phone learns the room',
        happens:
          'Right after placement a product can shift slightly, then holds steady. In Chrome’s in-page AR on Android, small movements are a little more noticeable early in a session.',
        why:
          'Phones keep refining their map of the room, and the position of detected surfaces is updated as they do. Apple and Google both describe surface positions as approximate when first detected.',
        approach:
          'A slow sweep of the room before placing gives the most stable result. Size is true to scale from the first moment; only position refines.',
        sources: [S.appleTracking, S.arcoreFundamentals, S.xrAnchors, S.xrHitTest],
      },
      {
        id: 'scale',
        title: 'True-to-size products, scalable rooms',
        happens:
          'Products open at real size. Brands choose per product whether shoppers may also resize it. A whole composed room from the room visualizer can be pinched down to tabletop size to walk around it.',
        why:
          'Apple’s design guidance notes that resizing furniture defeats the purpose of seeing it at home; both platforms let an experience fix or free the scale.',
        approach:
          'Thridify offers both: keep a product at fixed real size so “will it fit?” has an honest answer, or allow resizing for showcase pieces. Full rooms are always resizable.',
        sources: [S.appleHig, S.appleScaling, S.sceneViewer],
      },
      {
        id: 'occlusion',
        title: 'People and objects in front of the product',
        happens:
          'On recent iPhones a person walking in front of the product passes in front of it. Elsewhere, the product is drawn on top of the camera image.',
        why:
          'People occlusion needs Apple’s A12 chip or later. On Android, Scene Viewer as launched from the web always draws the model in front of real objects.',
        approach:
          'Shoppers get the most natural view by placing products in open floor space, which is where they judge size and fit anyway.',
        sources: [S.appleOcclusion, S.sceneViewer, S.arcoreDepth],
      },
    ],
  },
  {
    id: 'devices',
    title: 'File size, devices and browsers',
    intro:
      'Phones open AR files within a memory and size budget set by the platform. Thridify prepares every AR file to fit.',
    topics: [
      {
        id: 'budgets',
        title: 'Detail and file size',
        happens:
          'AR opens in seconds, with textures that are sharp at arm’s length. Very large scenes, such as a full room, take a short preparing moment first.',
        why:
          'Apple recommends staying under about 100,000 polygons and roughly 50 meshes, with textures of 2048 pixels at most. Google recommends files of about 10 MB, textures up to 2048 pixels and up to 100,000 triangles.',
        approach:
          'Thridify sizes AR textures for phones automatically, and lightens composed rooms before they open: shared materials written once, and heavy meshes simplified with their silhouettes kept. Our modelling service builds products to these budgets from the start.',
        sources: [S.appleQlEffects, S.sceneViewer],
      },
      {
        id: 'memory',
        title: 'Older phones and tablets',
        happens:
          'Older devices get the same experience with lighter textures, so browsing stays smooth.',
        why:
          'Browsers cannot report how much graphics memory a device has, and a phone can reclaim memory from heavy pages.',
        approach:
          'Thridify’s Lite mode steps texture quality down automatically. The full device matrix is on our device compatibility page.',
        sources: [S.mdnWebgl],
      },
      {
        id: 'browsers',
        title: 'Which browser opens which AR',
        happens:
          'On iPhone and iPad, Safari, Chrome, Edge and Firefox all open Apple’s AR Quick Look. On Android, Chrome and Chromium browsers can place AR in the page; other browsers use Scene Viewer.',
        why:
          'iPhone and iPad browsers use Apple’s web engine, which offers AR through Quick Look rather than WebXR. WebXR AR is available in Chromium browsers on ARCore-certified Android devices.',
        approach:
          'Thridify picks the best path for each device automatically. Shoppers never choose a mode.',
        sources: [S.webkitQl, S.mdnXr, S.arcoreWebxr, S.arcoreDevices],
      },
      {
        id: 'embedded',
        title: 'AR from an embedded page',
        happens:
          'When the 3D viewer is embedded inside another site’s frame on iPhone, AR opens in a new tab.',
        why:
          'Apple’s AR viewer is most reliable when opened from the top-level page, and in-page WebXR needs the host page to grant the frame permission for spatial tracking.',
        approach:
          'Thridify handles the hand-off automatically, so shoppers simply land in AR.',
        sources: [S.webkitIframe, S.mdnXrIframe],
      },
    ],
  },
];

const QUICK_REF: { row: string; web: string; ios: string; android: string }[] = [
  { row: 'Live configuration', web: 'Yes', ios: 'Yes', android: 'Yes in Chrome AR; default finish in Scene Viewer' },
  { row: 'Animation', web: 'Every animation', ios: 'From an animated AR file; configured products are still', android: 'First animation in Scene Viewer' },
  { row: 'Light from lamps', web: 'Yes', ios: 'Lit by the real room; self-lit parts glow', android: 'Lit by the real room; self-lit parts glow' },
  { row: 'Glass and refraction', web: 'Full refraction', ios: 'Tinted transparency', android: 'Varies by viewer' },
  { row: 'Video surfaces', web: 'Plays', ios: 'Still frame', android: 'Still frame' },
  { row: 'Hotspots and labels', web: 'Yes', ios: 'In the 3D viewer', android: 'In the 3D viewer' },
  { row: 'Instant placement', web: 'Not applicable', ios: 'LiDAR models', android: 'After a short scan' },
];

const PLANNING = [
  ['Choose configuration or animation for AR', 'Per product, decide whether AR should show the shopper’s configuration or a signature animation. 3D shows both.'],
  ['Give lights a glowing material', 'Self-lit shades and bulbs keep lamps looking switched on in every AR viewer.'],
  ['Check glass-heavy products in AR', 'Transparent and refractive parts are drawn differently by each platform; a quick check on a phone sets expectations.'],
  ['Build to the AR budget from day one', 'Models made within Apple’s and Google’s recommendations open faster and look sharper. Thridify’s modelling service builds to them by default.'],
  ['Test in a real room', 'Daylight, lamplight and floor texture all change the AR experience. Five minutes in an ordinary room is the best review.'],
];

function SourceLinks({ sources }: { sources: Source[] }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
      {sources.map((s) => (
        <li key={s.href}>
          <a href={s.href} rel="noopener" className="text-primary underline underline-offset-4">
            {s.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function PlatformGuidePage() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: '3D & AR, platform by platform', item: `${SITE_URL}${CANONICAL}` },
    ],
  };
  const allSources = Array.from(
    new Map(GROUPS.flatMap((g) => g.topics.flatMap((t) => t.sources)).map((s) => [s.href, s])).values(),
  );

  return (
    <>
      <JsonLd nodes={[breadcrumbLd]} />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 aurora opacity-70" aria-hidden />
        <div className="container-x relative section">
          <div className="max-w-4xl">
            <p className="eyebrow">Good to know</p>
            <h1 className="tt-display text-foreground">3D &amp; AR, platform by platform</h1>
            <p className="lead max-w-2xl">
              Thridify runs on the AR built into every iPhone and Android phone, and on the 3D
              engine inside every modern browser. Each platform brings its own strengths and its
              own rules. Here is what travels into AR, how materials and light behave, and how
              placement works, with the platform documentation behind every point.
            </p>
            <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2 text-sm">
              {GROUPS.map((g) => (
                <a key={g.id} href={`#${g.id}`} className="rounded-full border border-foreground/15 px-4 py-1.5 text-foreground/80 hover:border-primary/40 hover:text-primary">
                  {g.title}
                </a>
              ))}
              <a href="#quick-reference" className="rounded-full border border-foreground/15 px-4 py-1.5 text-foreground/80 hover:border-primary/40 hover:text-primary">
                Quick reference
              </a>
            </nav>
          </div>
        </div>
      </section>

      {/* THREE PATHS */}
      <section className="container-x section pt-0">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">Three platforms, one experience</h2>
        <p className="mt-2 max-w-2xl text-foreground/70">
          Shoppers never install anything or pick a mode. Thridify chooses the best path for each
          device; these are the engines underneath.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {PATHS.map((p) => (
            <div key={p.t} className="card p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">{p.k}</p>
              <h3 className="mt-2 font-heading text-lg font-semibold text-foreground">{p.t}</h3>
              <p className="mt-2 text-sm text-foreground/70">{p.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TOPIC GROUPS */}
      {GROUPS.map((g) => (
        <section key={g.id} id={g.id} className="container-x section pt-0 scroll-mt-24">
          <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">{g.title}</h2>
          <p className="mt-2 max-w-2xl text-foreground/70">{g.intro}</p>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {g.topics.map((t) => (
              <article key={t.id} id={t.id} className="card p-6 scroll-mt-24">
                <h3 className="font-heading text-lg font-semibold text-foreground">{t.title}</h3>
                <dl className="mt-3 space-y-3 text-sm">
                  <div>
                    <dt className="font-semibold text-foreground">What shoppers see</dt>
                    <dd className="mt-1 text-foreground/70">{t.happens}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-foreground">Why</dt>
                    <dd className="mt-1 text-foreground/70">{t.why}</dd>
                  </div>
                  <div className="rounded-xl bg-primary/5 p-3">
                    <dt className="font-semibold text-primary">How Thridify handles it</dt>
                    <dd className="mt-1 text-foreground/80">{t.approach}</dd>
                  </div>
                </dl>
                <SourceLinks sources={t.sources} />
              </article>
            ))}
          </div>
        </section>
      ))}

      {/* QUICK REFERENCE */}
      <section id="quick-reference" className="container-x section pt-0 scroll-mt-24">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">Quick reference</h2>
        <p className="mt-2 max-w-2xl text-foreground/70">The same picture at a glance.</p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-foreground/10">
          <table className="w-full min-w-[680px] border-collapse text-left">
            <caption className="sr-only">How features behave in the 3D viewer, iPhone AR and Android AR</caption>
            <thead>
              <tr className="bg-surface">
                {['', '3D viewer (any browser)', 'iPhone & iPad AR', 'Android AR'].map((h) => (
                  <th key={h} className="p-4 font-heading text-sm font-semibold tracking-tight">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {QUICK_REF.map((r) => (
                <tr key={r.row} className="border-t border-foreground/10 align-top">
                  <th scope="row" className="p-4 text-sm font-medium text-foreground">{r.row}</th>
                  <td className="p-4 text-sm text-foreground/80">{r.web}</td>
                  <td className="p-4 text-sm text-foreground/80">{r.ios}</td>
                  <td className="p-4 text-sm text-foreground/80">{r.android}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* PLANNING */}
      <section className="container-x section pt-0">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">Planning a product for AR</h2>
        <p className="mt-2 max-w-2xl text-foreground/70">Five habits that give shoppers the best AR on every phone.</p>
        <ul className="mt-6 max-w-3xl space-y-3">
          {PLANNING.map(([title, body]) => (
            <li key={title} className="flex gap-3 text-sm text-foreground/70">
              <span aria-hidden className="mt-0.5 font-semibold text-primary">✓</span>
              <span>
                <strong className="text-foreground">{title}</strong> — {body}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/device-compatibility" className="btn-ghost">Device compatibility</Link>
          <Link href="/services/3d-modelling" className="btn-ghost">3D modelling service</Link>
          <Link href="/contact" className="btn-ghost">Talk to us about your products</Link>
        </div>
      </section>

      {/* SOURCES */}
      <section className="container-x section pt-0">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">Sources</h2>
        <p className="mt-2 max-w-2xl text-sm text-foreground/70">
          Platform behaviour is described from each vendor’s public documentation and the open
          standards. Platforms evolve with every release; this page reflects them as of November
          2026 and is updated as they change. It is general information about the platforms, not
          a description of any plan or agreement.
        </p>
        <ul className="mt-4 grid gap-x-8 gap-y-1.5 text-xs sm:grid-cols-2">
          {allSources.map((s) => (
            <li key={s.href}>
              <a href={s.href} rel="noopener" className="text-primary underline underline-offset-4">{s.label}</a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
