/**
 * Deeper content for the glossary terms Google crawled but did not index
 * (GSC, Nov 2026: "Crawled / Discovered – currently not indexed"). The base
 * entries in glossary.ts were two short paragraphs each, close to every other
 * definition page on the web. These sections add what a definition page
 * rarely has: how the thing actually works, how to check it, and the
 * mistakes teams make with it.
 *
 * No-Faking: technical statements here are about the public standards
 * (Khronos glTF, Apple USDZ / AR Quick Look, Google Scene Viewer, WebGL,
 * Core Web Vitals). Thridify-specific statements repeat only what the site
 * already says elsewhere. No metrics, no pricing.
 */

export type GlossarySection = { heading: string; paragraphs: string[] };
export type GlossaryFaq = { q: string; a: string };
export type GlossaryDepth = { sections: GlossarySection[]; faqs: GlossaryFaq[] };

export const GLOSSARY_DEPTH: Record<string, GlossaryDepth> = {
  webar: {
    sections: [
      {
        heading: 'How a product page opens AR without an app',
        paragraphs: [
          'The page offers a "View in your space" button. What it does depends on the phone. On iPhone and iPad, Safari opens a USDZ file in AR Quick Look when the link is marked rel="ar". On Android, the button opens an intent URL that hands a GLB file to Google’s Scene Viewer. Both viewers ship with the operating system, which is why the shopper installs nothing.',
          'On desktop there is no camera to place the product with, so the usual pattern is a QR code. The shopper scans it with their phone and lands in AR with the same product and the same finish they were looking at.',
        ],
      },
      {
        heading: 'What makes WebAR look right or wrong',
        paragraphs: [
          'Scale is the first thing shoppers notice. AR viewers read the model’s units literally, so a sofa modelled in centimetres but exported as metres arrives a hundred times too big. glTF uses metres; checking one known dimension against the spec sheet catches most of these errors.',
          'The second is the origin point. The model’s base should sit at floor level, or it will float above the floor or sink through it. The third is file weight. A 60 MB model on a phone connection means the shopper waits, and many will not.',
        ],
      },
      {
        heading: 'WebAR, WebXR and app AR are different things',
        paragraphs: [
          'Teams often use the terms loosely. WebAR in commerce usually means the hand-off described above: the browser passes a file to the phone’s own AR viewer. WebXR is a browser API that runs the AR session inside the page itself, with more control and narrower device support. App AR means a native app, which gives the most control but asks the shopper to install something first.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Does WebAR work on every phone?',
        a: 'It works on iPhones and iPads that run AR Quick Look and on Android phones with Google Play Services for AR. Older or low-end phones without AR support can still show the 3D viewer in the browser.',
      },
      {
        q: 'Do I need two different 3D files for iPhone and Android?',
        a: 'Yes. iOS reads USDZ and Android reads GLB. A good pipeline produces both from one source model, so they never drift apart. Thridify exports both automatically.',
      },
      {
        q: 'Can WebAR be opened from an ad or an email?',
        a: 'Yes, because it is just a link. The same AR experience can be reached from a product page, a QR code in a showroom, a campaign landing page or an email.',
      },
    ],
  },

  'scene-viewer': {
    sections: [
      {
        heading: 'How a page launches Scene Viewer',
        paragraphs: [
          'A web page opens Scene Viewer with an Android intent URL that points at a GLB or glTF file. The URL carries a mode: 3d_preferred opens the 3D view first, ar_preferred goes straight to the camera when the phone supports AR, and ar_only refuses to open without it. A fallback URL tells Chrome where to send phones that cannot launch Scene Viewer at all.',
          'The model has to be reachable over HTTPS from Google’s viewer, so files behind a login or a strict hotlink rule will fail even though they load fine on the page.',
        ],
      },
      {
        heading: 'What Scene Viewer shows, and what it does not',
        paragraphs: [
          'Scene Viewer renders glTF 2.0 with standard metallic-roughness PBR materials. Textures, normal maps and simple animation come across. Custom shaders and effects built for a particular web viewer do not, so a finish that relies on one will look flatter in AR than on the page.',
          'Placement is camera-guided. The shopper moves the phone slowly so ARCore can find the floor, then the product appears at true scale. Good light and a textured floor help; a glossy, plain white floor is the hardest case.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Which Android phones support Scene Viewer AR?',
        a: 'Phones running Android 8 or later with Google Play Services for AR installed. Google publishes the list of supported devices. Phones without it can still open the 3D view.',
      },
      {
        q: 'Why does my product look different in Scene Viewer than on my site?',
        a: 'Usually because the site viewer uses lighting or material effects that are not part of the glTF standard. Scene Viewer only renders what is in the file, so the file’s own materials need to carry the look.',
      },
      {
        q: 'Is Scene Viewer the same as WebXR?',
        a: 'No. Scene Viewer is a separate Google app that the browser hands a file to. WebXR runs the AR session inside the web page.',
      },
    ],
  },

  'gltf-glb': {
    sections: [
      {
        heading: 'What is inside a glTF file',
        paragraphs: [
          'A glTF asset describes a scene: meshes (the geometry), materials, textures, and optionally cameras, animations and skins. The .gltf form is JSON with separate binary and image files beside it. The .glb form packs all of that into one binary file, which is easier to host and cache, so commerce viewers almost always ship GLB.',
          'glTF 2.0 was released by the Khronos Group in 2017 and is published as the international standard ISO/IEC 12113:2022. The units are metres and the up axis is +Y, which matters the first time a model shows up in AR at the wrong size or lying on its side.',
        ],
      },
      {
        heading: 'Extensions commerce teams actually use',
        paragraphs: [
          'Plain glTF is already compact, but three official extensions do most of the work on product pages. KHR_draco_mesh_compression shrinks geometry. KHR_texture_basisu lets textures ship as KTX2 files that stay compressed on the graphics card. KHR_materials_variants stores several material options in one file, which is a natural fit for finishes in a configurator.',
          'Not every viewer supports every extension, so it is worth checking that the extensions in a file are ones the target viewer, Scene Viewer and any marketplace you sell on can read.',
        ],
      },
      {
        heading: 'Common problems when converting to GLB',
        paragraphs: [
          'Most issues come from the source file rather than the format: models exported from CAD with millions of triangles, materials that rely on a renderer-specific shader, textures at 8K when 2K would look the same on a phone, or a pivot point nowhere near the floor. Fixing these before export is far cheaper than chasing them in the viewer.',
        ],
      },
    ],
    faqs: [
      {
        q: 'What is the difference between glTF and GLB?',
        a: 'Same format, different packaging. .gltf is JSON with separate files for binary data and images; .glb is a single binary file containing everything.',
      },
      {
        q: 'Can I convert FBX, OBJ or CAD files to GLB?',
        a: 'Yes. Blender and most 3D tools export GLB. CAD files usually need their geometry simplified and their materials rebuilt as PBR first, or the GLB will be heavy and look wrong.',
      },
      {
        q: 'Is GLB enough for AR on iPhone?',
        a: 'No. AR Quick Look on iPhone and iPad needs USDZ. Keep GLB as the source of truth and generate USDZ from it.',
      },
    ],
  },

  usdz: {
    sections: [
      {
        heading: 'How USDZ is put together',
        paragraphs: [
          'Apple and Pixar introduced USDZ in 2018. It is a zip archive with no compression and a fixed byte alignment, so iOS can read the files inside without unpacking them. That is why a USDZ cannot be made with an ordinary zip tool: a file that looks right can still refuse to open.',
          'Inside are a USD scene and its textures, usually PNG or JPEG. Apple’s Reality Converter and the usdzconvert tools produce valid files, and most 3D pipelines that serve AR generate USDZ from the same source as their GLB.',
        ],
      },
      {
        heading: 'Why USDZ files are often larger than GLB',
        paragraphs: [
          'The web compression tricks that keep GLB small, Draco for geometry and KTX2 for textures, are glTF extensions. USDZ does not use them, so the iOS file for the same product is often several times the size of the Android one. Sensible texture sizes matter more for USDZ than anywhere else.',
        ],
      },
      {
        heading: 'Details that change the iPhone experience',
        paragraphs: [
          'A Quick Look link can carry options after a # in the URL. allowsContentScaling=0 stops the shopper pinching the product to the wrong size, which matters when the point of AR is checking fit. Quick Look can also show a banner with a title and a call to action.',
          'Materials should use the standard physically based inputs (base colour, metallic, roughness, normal). Anything that depends on a custom shader in the web viewer has to be baked into textures before it will show on iPhone.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Does Android support USDZ?',
        a: 'Not for AR. Android’s Scene Viewer uses glTF or GLB. Serve USDZ to iOS and GLB to everyone else.',
      },
      {
        q: 'Can I convert GLB to USDZ?',
        a: 'Yes. Apple’s Reality Converter and several open tools convert GLB to USDZ. Check the result on a real iPhone, because unsupported materials fall back silently.',
      },
      {
        q: 'Why does my USDZ open as a blank file?',
        a: 'Usually the archive was re-zipped with compression or the wrong alignment, or the server sends it with the wrong content type. Serve it as model/vnd.usdz+zip.',
      },
    ],
  },

  webgl: {
    sections: [
      {
        heading: 'WebGL 1, WebGL 2 and WebGPU',
        paragraphs: [
          'WebGL 1.0 arrived in 2011 and is based on OpenGL ES 2.0. WebGL 2.0 is based on OpenGL ES 3.0 and has been available in every major browser since Safari added it in 2021. Most product viewers today target WebGL 2 and fall back to WebGL 1 only where they must.',
          'WebGPU is the newer API, with lower overhead and access to compute work on the graphics card. Chrome shipped it in 2023 and other browsers are following. For product pages that need to work on every phone a shopper might own, WebGL is still the safe baseline.',
        ],
      },
      {
        heading: 'Limits that matter on a product page',
        paragraphs: [
          'Each 3D viewer on a page holds a WebGL context, and browsers cap how many can be live at once (Chrome’s limit is 16). A collection page with a live 3D model on every card will run into it, which is why listing pages use posters and start 3D only on the card the shopper is hovering.',
          'Phones can also take a context away under memory pressure. A well-built viewer listens for that, frees what it can and restores itself instead of leaving a black rectangle.',
          'Graphics memory is mostly textures. A 4096 × 4096 texture uses about 64 MB once decoded on the graphics card, whatever its JPEG size on disk. Halving the resolution cuts that to a quarter.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How do I check whether a browser supports WebGL?',
        a: 'Open get.webgl.org or the browser’s own GPU report (chrome://gpu in Chrome). Practically every browser released in the last decade supports it.',
      },
      {
        q: 'Does WebGL drain the battery?',
        a: 'Rendering continuously does. Good viewers render only when something changes, such as the shopper dragging or a finish loading, and stop when the model is off screen.',
      },
      {
        q: 'Do I need WebGPU for 3D commerce?',
        a: 'Not today. Everything a product viewer, configurator or AR hand-off needs runs on WebGL, and WebGL reaches more devices.',
      },
    ],
  },

  'progressive-loading': {
    sections: [
      {
        heading: 'How poster-first loading protects Core Web Vitals',
        paragraphs: [
          'Google’s Core Web Vitals reward a page whose largest element paints within 2.5 seconds (LCP), whose layout does not jump (CLS at or under 0.1) and which reacts quickly to taps (INP at or under 200 ms). A 3D model fails all three if it blocks the page: the download is large, the canvas pops in late, and parsing it ties up the main thread.',
          'A poster fixes this. The poster is an ordinary image, so it can be the LCP element and load as fast as any product photo. The space for the viewer is reserved at its final size, so nothing shifts. The model downloads afterwards and replaces the poster in place.',
        ],
      },
      {
        heading: 'When the 3D should start loading',
        paragraphs: [
          'There are three common triggers. On a product page where 3D is the main media, start when the page is idle. Where it sits further down, start when it scrolls into view. On listing pages, start on intent: a hover, a tap or a focus on that card. Loading a model nobody looks at only costs the shopper data.',
        ],
      },
      {
        heading: 'Getting the poster right',
        paragraphs: [
          'The poster should be a render of the exact default configuration, from the same camera angle the viewer opens with. If it shows a different colour or a different angle, the handover reads as a glitch. Give it fixed width and height, and preload it on the product page so the browser fetches it early.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Does adding a 3D viewer hurt my page speed score?',
        a: 'It does if the model loads before the page paints. With a poster-first viewer the scored metrics are driven by the poster image, and the model loads afterwards.',
      },
      {
        q: 'Should the poster be a photo or a render?',
        a: 'A render of the 3D model in its default state. A photo will never match the model exactly, so the switch from poster to 3D becomes visible.',
      },
      {
        q: 'Can a search engine see the 3D model?',
        a: 'Search engines index the poster image, the alt text and the surrounding product content. Treat the poster as the product’s main image for SEO.',
      },
    ],
  },

  'lite-mode': {
    sections: [
      {
        heading: 'Why 3D crashes on some phones and not others',
        paragraphs: [
          'Download size is not the problem. Decoded size is. A 2 MB JPEG texture at 4096 × 4096 takes about 64 MB of graphics memory once it is on the card, and a configurator that loads several finishes multiplies that. Phones with little memory give the browser tab a small budget. When the tab goes over it, iOS reloads the page and Android may drop the 3D context.',
          'Halving texture resolution cuts memory to a quarter. On a phone screen the difference between 4K and 2K textures is usually invisible, while the difference between a smooth session and a reload is not.',
        ],
      },
      {
        heading: 'What an adaptive viewer changes',
        paragraphs: [
          'The usual levers are texture resolution, how many finishes stay cached after the shopper moves on, shadow and reflection quality, and the device pixel ratio the canvas renders at. A good adaptive mode changes these silently. The shopper still sees the product, the options and AR where the phone supports it.',
          'Detecting the right tier is harder than it sounds. Browsers expose memory hints unevenly (Safari does not report device memory at all), so viewers combine several signals, including the graphics hardware and whether the phone supports AR.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Do shoppers have to switch Lite mode on?',
        a: 'No. Thridify picks the tier for each device automatically.',
      },
      {
        q: 'Does Lite mode change how the product looks?',
        a: 'Fine texture detail is slightly lower on the devices that need it. Shape, colour, options and scale stay the same.',
      },
      {
        q: 'Which devices get Lite mode?',
        a: 'Low-memory devices, typically phones and tablets with 2 GB of memory or less. The device compatibility page lists what each tier gets.',
      },
    ],
  },

  'room-visualizer': {
    sections: [
      {
        heading: 'Room visualizer vs product viewer vs AR',
        paragraphs: [
          'A product viewer answers questions about one item: what it looks like from the back, what the fabric does in light. AR answers whether it fits in the shopper’s actual room. A room visualizer answers a third question, whether a set of products works together. That is why it sits closer to how an interior designer works than to a product page.',
          'They are complementary. A shopper might configure a sofa on its product page, check its size in AR, then open the room visualizer to choose a rug and a side table that suit it.',
        ],
      },
      {
        heading: 'What a catalogue needs before it goes into a room',
        paragraphs: [
          'True dimensions on every model, because a room exposes scale errors that a single-product viewer hides: a chair that is 10% too large looks wrong next to a correctly sized table. A consistent origin at floor level, so products sit on the floor and against walls. Materials that hold up under room lighting rather than a studio setup. And a sensible file weight, because a room loads many products at once.',
        ],
      },
      {
        heading: 'Where room visualizers get used',
        paragraphs: [
          'Online, as a planning tool for shoppers furnishing a whole room. In showrooms, where a sales consultant builds a room with the customer on a tablet. At exhibitions, where a brand shows its full range without shipping it. In each case the output is the same: a basket with more than one product in it.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can shoppers use their own room dimensions?',
        a: 'Yes. The room’s size, floor, walls and lighting are adjustable, so shoppers can approximate their own space.',
      },
      {
        q: 'Does the room visualizer use the same products as the product pages?',
        a: 'Yes. It is filled from the brand’s published catalogue, and a product placed in the room keeps the configuration the shopper chose.',
      },
      {
        q: 'Can a room be viewed in AR?',
        a: 'Yes. The composed room can open in the phone’s native AR viewer, with a QR hand-off from desktop.',
      },
    ],
  },

  'shop-the-look': {
    sections: [
      {
        heading: 'Shop the Look pages vs shoppable photos',
        paragraphs: [
          'Most "shop the look" features are a photograph with tags on it. That works for showing what was used, but the shopper cannot change anything: if they want the sofa in another fabric, the photo no longer describes what they would get.',
          'A 3D Shop the Look page starts from the same idea, a styled room, and lets the shopper change it. The rug can be swapped, the sofa can be reconfigured, and the room can be checked in AR. What ends up in the basket is what they saw.',
        ],
      },
      {
        heading: 'How merchandising teams plan looks',
        paragraphs: [
          'The looks that sell tend to be built around one hero product with a few supporting pieces, rather than a room with twenty items. Teams usually build looks for each season or collection, for the categories with the best attach rate (rugs and lighting around seating, for example), and for specific channels such as a showroom QR code or an exhibition stand.',
          'Because looks are built from the live catalogue, retiring a product or changing a finish is a catalogue change, not a reshoot.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Do shoppers edit the brand’s room?',
        a: 'No. Opening a look gives the shopper their own copy to change. The published look stays as the brand built it.',
      },
      {
        q: 'Can prices be hidden on a Shop the Look page?',
        a: 'Yes. The page follows the account’s brand settings, including whether prices are shown.',
      },
      {
        q: 'How do shoppers find the page?',
        a: 'Through a link the brand places: a homepage banner, a QR code in a showroom or on an exhibition tablet, or a campaign.',
      },
    ],
  },
};

export function getGlossaryDepth(slug: string): GlossaryDepth | undefined {
  return GLOSSARY_DEPTH[slug];
}
