/**
 * CANONICAL FAQ CATALOG — the single content source for the /faq page and its
 * FAQPage JSON-LD. Curated 2026-09-11 from the same knowledge set that trains
 * the on-site AI assistant, so the page and the chatbot never disagree.
 *
 * RULES baked in (do not undo when editing):
 *  - No-Faking: every claim here is live/true; metrics are the canonical set.
 *  - No pricing figures anywhere — pricing routes to the demo call.
 *  - The ONLY free offers ever named: the 15-day platform trial and the
 *    30-minute demo call. Never free modelling / pilots / samples, and demos
 *    are "built around your industry", never "on your own product".
 *  - Team privacy: Shikha Gupta (Co-Founder & CEO) is the only named person.
 *  - Answers are plain text (rendered verbatim + serialized to JSON-LD);
 *    related pages go in `links`, not inline markdown.
 */

export type FaqLink = { label: string; href: string };

export type Faq = {
  /** Stable slug — the deep-link anchor (#<slug>). Never change once live. */
  id: string;
  q: string;
  a: string;
  links?: FaqLink[];
};

export type FaqCategory = {
  /** Stable slug — used for category deep links (#c-<id>). */
  id: string;
  label: string;
  /** One-line framing shown under the category heading. */
  blurb: string;
  faqs: Faq[];
};

export const CALENDLY_URL = "https://calendly.com/hello-thridify/30min";

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "getting-started",
    label: "Getting started",
    blurb: "From first look to live on your product pages.",
    faqs: [
      {
        id: "what-is-thridify",
        q: "What is Thridify?",
        a: "Thridify is a no-code 3D and AR commerce platform and 3D modelling service. Brands selling furniture, kitchens, doors, laminates and other custom products use it to put interactive 3D viewers, configurators with live pricing and app-free AR on their own product pages — reducing returns and closing sales faster. It is built and operated by Aapastech Private Limited.",
        links: [{ label: "What is Thridify?", href: "/what-is-thridify" }],
      },
      {
        id: "book-a-demo",
        q: "How do I book a demo?",
        a: "Book a free 30-minute demo call — it sits behind every Book a Demo button on this site. The demo is a full product walkthrough tailored to your industry, run on live Thridify experiences, so you see exactly how the viewer, configurator and AR behave for products like yours.",
        links: [{ label: "Book a demo", href: CALENDLY_URL }],
      },
      {
        id: "free-trial",
        q: "Is there a free trial?",
        a: "Yes. Thridify offers a 15-day free trial of the platform, and the 30-minute demo call is free too. Book the demo and the team will set up your trial.",
        links: [{ label: "Book a demo", href: CALENDLY_URL }],
      },
      {
        id: "after-contact-form",
        q: "What happens after I fill the contact form?",
        a: "The regional team (North America or India) replies within one business day and offers a demo call tailored to your industry. On the call they look at what you sell, show live experiences for products like yours, set up your 15-day free trial and scope any modelling you need.",
        links: [{ label: "Contact", href: "/contact" }],
      },
      {
        id: "get-on-my-website",
        q: "How do I get Thridify on my website?",
        a: "Three steps. First, book a demo or send your details through the contact page. Second, the team sets up your account and first experiences — the one-time setup covers integration and hand-over. Third, add Thridify to your site with the plugin for your platform, or the lightweight embed and JS SDK for a custom site. No re-platforming.",
        links: [{ label: "Integrations", href: "/integrations" }],
      },
      {
        id: "need-developer",
        q: "Do I need a developer or a 3D team?",
        a: "No, for the plugin route: Shopify, WooCommerce, WordPress, Wix, BigCommerce, Adobe Commerce and the other supported platforms install Thridify as a no-code plugin or lightweight embed. Custom-built storefronts use the JS SDK and API, where your developer does one small embed. And if you need models built, the 3D Modelling Service produces them for you — no in-house 3D team required.",
      },
      {
        id: "go-live-timeline",
        q: "How long does it take to go live?",
        a: "A single hero product can go live quickly; Thridify agrees a clear per-SKU timeline up front and schedules larger catalogues in batches. The exact schedule depends on product complexity and the references you supply — ask the team for a timeline for your catalogue on the demo call.",
      },
      {
        id: "no-website-yet",
        q: "I don't have a website yet — can Thridify help?",
        a: "Yes. Thridify can set up a storefront with the 3D and AR experiences built in, so you launch with interactive products from day one.",
        links: [{ label: "Get a website", href: "/get-a-website" }],
      },
    ],
  },
  {
    id: "platform",
    label: "Platform & products",
    blurb: "Five products on one no-code layer.",
    faqs: [
      {
        id: "product-suite",
        q: "What products does Thridify offer?",
        a: "Five products on one no-code layer: a 3D 360° Viewer, a 3D Configurator with live pricing, an app-free AR Viewer, a done-for-you 3D Modelling Service, and Analytics.",
        links: [{ label: "The platform", href: "/platform" }],
      },
      {
        id: "3d-viewer",
        q: "What does the 3D 360° Viewer do?",
        a: "It gives shoppers an interactive, rotatable product view on any product page: spin, zoom and inspect every angle in photoreal 3D, with hotspots and annotations that highlight craftsmanship, joinery and material notes — on any device, straight from the page.",
      },
      {
        id: "configurator",
        q: "What does the 3D Configurator do?",
        a: "Buyers customise colours, materials, modules and parts in real time. Every change reprices live, generates an instant quote, and can export a production-ready bill of materials (BOM) straight to manufacturing. Node-level controls allow fine-grain part customisation.",
      },
      {
        id: "sales-to-production",
        q: "What does “sales-to-production automation” mean?",
        a: "The configurator doesn't stop at a pretty render. Each configuration carries live cost, produces an instant quotation and exports a BOM to manufacturing — so what the buyer configured is exactly what gets built. That removes screenshot-based interpretation and the rework it causes.",
      },
      {
        id: "analytics",
        q: "What does Thridify Analytics show?",
        a: "3D interaction analytics — engagement, demographics and performance signals — plus variant-level view analytics showing which finishes and colours win attention, and an event bridge for 3D opens, closes and variant interactions. You see how immersive experiences move conversion and ROI.",
      },
      {
        id: "one-model-all-variants",
        q: "Do I need a separate 3D model for every colour and finish?",
        a: "No. One configurable 3D model carries every fabric, wood, finish and hardware option as swappable materials — you build the model once and sell every variant from it.",
      },
      {
        id: "white-label",
        q: "Can I brand or white-label the viewer?",
        a: "Yes. Brand asset controls cover logo, colours, fonts and white-label, with theme customisation for the shopper-facing viewer, hotspot theming, and lighting presets for premium presentation.",
      },
      {
        id: "trade-shows",
        q: "Can sales teams use it at trade shows and in showrooms?",
        a: "Yes. Reps configure a product live with the buyer on a tablet or the visitor's own phone, quote instantly and place it in the space with AR — no app to install and no samples to ship. B2B teams use the same flow for instant quoting and BOM hand-off.",
      },
      {
        id: "results",
        q: "What results do Thridify customers see?",
        a: "The outcomes Thridify claims: 75% lower product returns, 3× higher conversion rates, 100% more engagement, 70% lower photography cost, 100% higher click-through rate and 40% lower inventory cost. Sales cycles compress with instant cost clarity, and BOM automation sharply reduces manufacturing rework.",
      },
    ],
  },
  {
    id: "modelling",
    label: "3D Modelling Service",
    blurb: "Photoreal, AR-ready models — built for you.",
    faqs: [
      {
        id: "modelling-service",
        q: "What is the 3D Modelling Service?",
        a: "A done-for-you service: send your catalogue references and Thridify models each SKU into a photoreal, configurable, AR-ready asset — delivered as glTF/GLB for the web and USDZ for iOS Quick Look, draco-compressed and optimised. You own the files.",
        links: [{ label: "3D Modelling Service", href: "/services/3d-modelling" }],
      },
      {
        id: "ai-generated",
        q: "Does Thridify generate 3D models automatically with AI?",
        a: "No. 3D for commerce is only meaningful when it shows true product realism — exact geometry, materials, finishes and scale — and AI generation cannot achieve that today. Thridify builds models through its in-house 3D team and vetted modelling partners, from your references, with quality checks before delivery.",
      },
      {
        id: "who-builds",
        q: "Who actually builds the models?",
        a: "Skilled 3D artists — Thridify's in-house team plus vetted modelling partners for scale — all working to the same photoreal, AR-ready spec and quality-checked by Thridify before anything goes live.",
      },
      {
        id: "what-to-send",
        q: "What do I need to send for modelling?",
        a: "Reference photos, dimensions, and any CAD files, spec sheets or material samples for each SKU. The more accurate the reference, the more photoreal and true-to-product the model.",
      },
      {
        id: "modelling-timeline",
        q: "How long does modelling take?",
        a: "Thridify agrees a clear per-SKU timeline up front so you can plan a rollout. A single hero product moves quickly; larger catalogues are scheduled in batches. Exact timing depends on product complexity.",
      },
      {
        id: "own-the-files",
        q: "Do I need the Thridify platform to use the models?",
        a: "No. The models are standard glTF/GLB/USDZ files you can use in any 3D or AR pipeline. Pairing them with the Thridify viewer, configurator and AR is optional — and the fastest way to get them selling.",
      },
      {
        id: "formats",
        q: "Which 3D file formats does Thridify support?",
        a: "Web delivery uses glTF/GLB; iOS AR uses USDZ. FBX and OBJ are accepted as source formats. Experiences run on WebGL and WebAR standards in any modern browser, and models are draco-compressed with GPU-native compressed textures on supported devices.",
      },
      {
        id: "photoshoots",
        q: "Can 3D models replace product photoshoots?",
        a: "Largely, yes. One 3D model renders every angle, finish and lifestyle scene — which is where the 70% photography-cost reduction comes from. New colourways stop needing a new shoot.",
      },
    ],
  },
  {
    id: "ar-devices",
    label: "AR & devices",
    blurb: "App-free AR, on the phones your shoppers already own.",
    faqs: [
      {
        id: "ar-no-app",
        q: "Does AR need an app?",
        a: "No. Thridify's AR is app-free WebAR: one tap from the product page places the product at true scale in the buyer's real space on any modern smartphone. iPhone and iPad use Apple AR Quick Look; Android uses Google Scene Viewer.",
        links: [{ label: "Device compatibility", href: "/device-compatibility" }],
      },
      {
        id: "iphone-support",
        q: "Which iPhones and iPads are supported?",
        a: "Anything on iOS 15 or later. LiDAR-equipped Pro models (iPhone 12 Pro and later, iPad Pro 2020 and later) place products almost instantly; recent non-Pro models get guided placement; older 2 GB devices automatically get a lighter 3D mode. Selection is automatic — shoppers never configure anything.",
      },
      {
        id: "android-support",
        q: "Does it work on Android?",
        a: "Yes — Android 8 or later with Chrome and Google Play Services for AR, which covers ARCore-certified phones from roughly 2019 onward (Samsung Galaxy S/A, Pixel, OnePlus, Xiaomi and most majors). Non-certified or low-memory devices still get the full 3D viewer.",
      },
      {
        id: "desktop",
        q: "What happens on desktop?",
        a: "Desktops and laptops get the full 3D viewer and configurator in any modern browser. Choosing “View in your space” shows a QR code that hands the AR session to the shopper's phone.",
      },
      {
        id: "ar-placement-speed",
        q: "Why does AR take a few seconds to place on some phones?",
        a: "Without a LiDAR scanner, the phone finds the floor by watching how the image shifts as the camera moves — that's how camera-based AR works on every platform. Expect a short preparing moment, on-screen coaching, and 5–15 seconds of scanning in typical conditions. Good light and a floor with visible texture shorten it; LiDAR devices place near-instantly.",
      },
      {
        id: "older-devices",
        q: "What about older or budget devices?",
        a: "Thridify adapts automatically: devices with limited graphics memory get a Lite mode with reduced-resolution textures so browsing stays smooth, and the heaviest scenes step down gracefully. Integrators never have to tune anything per device.",
      },
      {
        id: "site-speed",
        q: "Will Thridify slow my website down?",
        a: "No — the integration is CDN-light and built to be Core Web Vitals-friendly with anti-CLS loading. A poster image appears first, the interactive scene loads progressively, and finishes apply instantly at low resolution then sharpen in place.",
      },
    ],
  },
  {
    id: "integrations",
    label: "Integrations",
    blurb: "Runs on the store you already have.",
    faqs: [
      {
        id: "which-platforms",
        q: "Which ecommerce platforms does Thridify integrate with?",
        a: "Shopify, WooCommerce, WordPress, Wix, BigCommerce, Adobe Commerce (Magento), commercetools, Drupal Commerce, Squarespace, PrestaShop, Canva — and any custom storefront through the JS SDK and API. Always as a plugin or lightweight embed, never a re-platform.",
        links: [{ label: "All integrations", href: "/integrations" }],
      },
      {
        id: "shopify",
        q: "How does the Shopify integration work?",
        a: "Thridify ships a Shopify Theme App Extension: install the app, then add the Thridify App Block to your product or collection template — no code. It auto-detects major themes, auto-links your shop, matches products and variants by ID, measures via Web Pixel and is GDPR-ready.",
        links: [{ label: "Shopify", href: "/integrations/shopify" }],
      },
      {
        id: "woocommerce-wordpress",
        q: "How does it work on WooCommerce or WordPress?",
        a: "As a plugin or lightweight embed that sits alongside your existing product gallery — no re-platforming and no developer needed. Products and variants are mapped by ID so every variant shows the right configuration.",
        links: [{ label: "WooCommerce", href: "/integrations/woocommerce" }],
      },
      {
        id: "custom-storefront",
        q: "Can I add Thridify to a custom-built storefront?",
        a: "Yes — with the embeddable widget (a lightweight, CDN-light snippet) or the JS SDK and API with token access. There's also MCP/AI tooling to manage products, variants, materials, brand and analytics through AI assistants, plus an analytics event bridge for shopper interactions.",
        links: [{ label: "Custom integration", href: "/integrations/custom-integration" }],
      },
      {
        id: "variant-mapping",
        q: "Can each of my store's variants map to the 3D experience?",
        a: "Yes. One configurable model carries every option as swappable materials and maps to your store's variants by ID, so each variant shows the right configuration automatically.",
      },
      {
        id: "existing-theme",
        q: "Will it fit my existing theme and design?",
        a: "Yes. The embed drops in alongside your current gallery, theme auto-detection (with a custom CSS selector fallback on Shopify) keeps it on-brand, and brand controls let you match colours, fonts and hotspot styling to your identity.",
      },
    ],
  },
  {
    id: "pricing",
    label: "Plans & pricing",
    blurb: "How pricing works, and what's always free.",
    faqs: [
      {
        id: "how-pricing-works",
        q: "How does Thridify pricing work?",
        a: "Thridify runs on a monthly SaaS subscription with a one-time setup that covers website integration, creation of your first experiences and hand-over to your team. Optional managed services and the done-for-you modelling service sit on top. The right plan depends on catalogue size, customisation and the experiences you need — a short call gets you an exact number.",
        links: [{ label: "Get a tailored quote", href: CALENDLY_URL }],
      },
      {
        id: "why-no-price-list",
        q: "Why isn't there a public price list?",
        a: "Because pricing without context loses accuracy: two catalogues of the same size can differ hugely in geometry, materials and variant count. A 15–30 minute call lets the team scope your products properly and give you the right number rather than a misleading one.",
        links: [{ label: "Book the call", href: CALENDLY_URL }],
      },
      {
        id: "whats-free",
        q: "What does Thridify offer for free?",
        a: "Two things: a 15-day free trial of the platform, and a 30-minute demo call tailored to your industry, run on Thridify's existing live experiences.",
        links: [{ label: "Book a demo", href: CALENDLY_URL }],
      },
      {
        id: "managed-services",
        q: "Do you offer managed services?",
        a: "Yes. If you'd rather not run the platform yourself, Thridify can manage your account — creating new experiences and making changes to existing ones — as an add-on to the subscription. Scope is agreed on the call.",
      },
      {
        id: "roi",
        q: "How quickly does it pay for itself?",
        a: "Customers typically break even in 4–6 weeks and see 300%+ ROI by month six, driven by higher conversion, fewer returns and faster quoting. Results vary by catalogue and traffic — the demo call covers what to expect for your products.",
      },
      {
        id: "start-small",
        q: "Can I start small before committing?",
        a: "Yes — most teams start with a single hero product: model it, put it live, and measure the lift in conversion and the drop in returns on that one SKU before scaling across the catalogue.",
      },
    ],
  },
  {
    id: "industries",
    label: "Industries & fit",
    blurb: "If it's a physical product, Thridify can show it.",
    faqs: [
      {
        id: "which-industries",
        q: "Which industries does Thridify serve?",
        a: "Furniture and home décor, modular kitchens and wardrobes, office systems, doors and windows, prefab and wooden structures, laminates and surfaces, rugs and carpets, industrial machinery, 3D-printed products, architectural hardware, luxury sanitaryware, custom lighting, premium cycles, luggage, automotive accessories, art galleries — and education publishers.",
        links: [{ label: "Industries", href: "/industries" }],
      },
      {
        id: "not-listed",
        q: "My industry isn't listed — do you still cover it?",
        a: "Yes — the list is examples, not limits. Any physical product can get a 3D viewer, configurator and app-free AR. Tell the team what you sell and they'll show you how it applies.",
        links: [{ label: "Contact", href: "/contact" }],
      },
      {
        id: "who-benefits-most",
        q: "Which businesses benefit most?",
        a: "Brands selling visually rich, configurable or high-ticket products — B2B or D2C — especially with a sales team, a showroom, or a trade-show presence. Products designed in 3D before manufacture (furniture, kitchens, doors, prefab, machinery) see the fastest ROI because the 3D model already exists in their workflow.",
      },
      {
        id: "education",
        q: "What does Thridify do for education and publishers?",
        a: "Thridify has an education vertical: AR-enabled books, flashcards, toys and virtual labs. Printed pages come alive in the browser on any phone — 3D characters, animations and interactive labs, no app to install. Publishers and pre-schools manage the content themselves on the platform.",
      },
      {
        id: "already-have-3d",
        q: "We already have some 3D models — is Thridify still useful?",
        a: "Often more so. Existing models can run inside the Thridify viewer, configurator and AR, the un-modelled long tail of your catalogue can be built by the modelling service, and analytics show which finishes actually convert.",
      },
    ],
  },
  {
    id: "company",
    label: "Company & support",
    blurb: "Who we are and how to reach us.",
    faqs: [
      {
        id: "who-founded",
        q: "Who is behind Thridify?",
        a: "Thridify was founded in Delhi, India in 2022 and is led by Shikha Gupta, Co-Founder & CEO, from Burlington, Ontario. It is built and operated by Aapastech Private Limited, with engineering, 3D production and operations in Delhi.",
        links: [{ label: "About", href: "/about" }],
      },
      {
        id: "where-located",
        q: "Where is Thridify located?",
        a: "Headquarters in Burlington, Ontario, Canada; engineering, 3D studio and operations in Delhi, India; clients served across North America, India and Europe. European clients are served by the same team in their own time zone.",
      },
      {
        id: "contact-details",
        q: "How do I contact Thridify?",
        a: "Email contact@thridify.com. North America: +1-437-800-0190 (WhatsApp available). India: +91-966-774-7082 (WhatsApp available). Or book a 30-minute call — regional teams reply within one business day.",
        links: [
          { label: "Contact", href: "/contact" },
          { label: "Book a demo", href: CALENDLY_URL },
        ],
      },
      {
        id: "security",
        q: "Is Thridify secure and GDPR-ready?",
        a: "The platform provides secure OAuth and webhook verification with encrypted token handling, GDPR-ready endpoints for customer and shop data deletion, and privacy controls at brand and team level. This site is served over HTTPS via Cloudflare. Thridify does not claim certifications it has not earned — see the security page for the honest detail.",
        links: [{ label: "Security & practices", href: "/security" }],
      },
      {
        id: "support",
        q: "What support do I get after launch?",
        a: "The team supports you through modelling, publishing and integration, with team and account management and analytics built into the platform. Reach support any time at contact@thridify.com or the regional numbers.",
      },
    ],
  },
];

/** Flat list — used for search and for the FAQPage JSON-LD. */
export const ALL_FAQS: (Faq & { categoryId: string; categoryLabel: string })[] =
  FAQ_CATEGORIES.flatMap((c) =>
    c.faqs.map((f) => ({ ...f, categoryId: c.id, categoryLabel: c.label }))
  );
