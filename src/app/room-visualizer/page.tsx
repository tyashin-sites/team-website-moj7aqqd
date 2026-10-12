import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { pageMetadata, siteUrl } from '@/lib/seo';
import { breadcrumbLd, webPageLd, type LdNode } from '@/lib/knowledge-graph';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/Reveal';
import { RoomCapture, RoomRecording } from '@/components/RoomCapture';
import { CANONICAL_METRICS } from '@/lib/industries';

/**
 * /room-visualizer — the money page for "3D room visualizer" / "room planner
 * for a furniture website".
 *
 * Why it exists: every 3D commerce vendor has a product-level "view in your
 * room" button. The whole-room layer (compose MANY configured products in one
 * room, at true scale, then AR the room) is the gap, and it is what shipped in
 * thridify-fe v11.6–v11.12 (Sept 28 – Oct 10 2026). Google ranks the page that
 * IS the subject, so this is a top-level slug.
 *
 * Content rules: only shipped capabilities are described as shipped (see
 * docs/ROOM-VISUALIZER-GTM.md §1 for the not-yet list); canonical metrics
 * only; no pricing (Rule 19); the only free offers are the 15-day trial and
 * the 30-minute demo (Rule 23). All imagery is real captures (RoomCapture).
 */

const PATH = '/room-visualizer';
const CALENDLY = 'https://calendly.com/hello-thridify/30min';
const UPDATED = '2026-10-11';

const STEPS = [
  {
    t: 'Browse the published catalogue',
    b: 'Shoppers see only what the brand has published, searchable by name, PID or SKU and grouped by category.',
  },
  {
    t: 'Customize, then add',
    b: 'The real configurator opens inside the room page. Fabric, size, modules — the exact configuration is what gets placed, and it can be edited later in place.',
  },
  {
    t: 'Arrange at true scale',
    b: 'Models keep their native metres. A 203 cm sofa is 203 cm. Drag, rotate, duplicate; clearance warnings flag what will not fit.',
  },
  {
    t: 'Dress the room',
    b: 'Six room styles, six lighting presets, a library of floor and wall finishes with tiling control, a rug library with real pile, plants, wall art and lights that light.',
  },
  {
    t: 'Orbit, plan, walk',
    b: 'Orbit around it, switch to a top-down plan with real footprints, or drop to eye height and walk through — joystick on touch.',
  },
  {
    t: 'View the whole room in AR',
    b: 'The composed room exports as one model and opens in Scene Viewer or AR Quick Look on the phone. A QR hands it over from desktop. No app.',
  },
];

const BRAND_SIDE = [
  {
    t: 'Publish curated looks',
    b: 'Your team builds rooms in the admin Room Visualizer, saves them, and flips Published. They appear as curated looks shoppers open and make their own.',
  },
  {
    t: 'Inherits your brand',
    b: 'Logo, accent colour, currency and whether prices show all come from the account’s Brand Settings. Nothing to configure twice.',
  },
  {
    t: 'Same models, same configurator',
    b: 'The 3D products on your product pages are the products in the room. One asset set; no second modelling project.',
  },
  {
    t: 'Switched on per account',
    b: 'A hosted page on your account, reached from a link: a homepage banner, a showroom QR, an exhibition tablet.',
  },
];

const CHECKLIST = [
  {
    t: 'Is it your catalogue, configured?',
    b: 'Generic planners place stock furniture. The room must be populated from your published products, and the placed sofa must be the configuration the shopper chose.',
  },
  {
    t: 'Is scale real?',
    b: 'Open the plan view and measure a sofa against a side table. If every model has been normalised to a convenient size, the plan is fiction.',
  },
  {
    t: 'Do walls get out of the way?',
    b: 'Walls should fade as the camera orbits, and the art on them should fade with them. Opaque walls make the shopper fight the camera.',
  },
  {
    t: 'Does AR cover the room?',
    b: 'If the AR step exports one product at a time, the shopper is back on the product page with extra clicks.',
  },
  {
    t: 'Can your team curate without engineering?',
    b: 'The first thing a shopper sees should be a room your merchandiser styled, published from the admin, not an empty box.',
  },
  {
    t: 'Does it need an app?',
    b: 'If it does, most of your traffic will never see it. The room and the AR both have to run in the browser.',
  },
];

const FAQS = [
  {
    q: 'What is a 3D room visualizer?',
    a: 'A 3D room visualizer is a browser-based tool that lets a shopper place a brand’s real products into a three-dimensional room at true scale, change the room’s floor, walls, lighting and layout around them, and view the composed result from any angle, including in augmented reality on a phone.',
  },
  {
    q: 'How is it different from the AR button on a product page?',
    a: 'Product-page AR places one product in the shopper’s real room and answers “does it fit?”. A room visualizer composes many products in one room and answers “does it go with the rest?”. Thridify’s room also exports the whole composed room to AR, so both questions get answered.',
  },
  {
    q: 'Are the products in the room configurable?',
    a: 'Yes. The same configurator that runs on the product page opens inside the room. The shopper picks fabric, size and modules, and that exact configuration is placed. The choice is stored on the placed item and can be edited in place.',
  },
  {
    q: 'Is the scale real?',
    a: 'Yes. Models keep their native dimensions in metres. The plan view draws real footprints, and clearance warnings flag items that will not fit the room.',
  },
  {
    q: 'Do shoppers need an app?',
    a: 'No. The room runs in the browser, and the AR step uses the viewer already on the phone — Scene Viewer on Android, AR Quick Look on iOS.',
  },
  {
    q: 'Can my team build looks for shoppers?',
    a: 'Yes. Rooms built in the admin Room Visualizer can be saved and published. Published rooms appear as curated looks on the brand’s Shop the Look page, and shoppers open them as their own draft.',
  },
  {
    q: 'Can a shopper save or share their room?',
    a: 'Not from the hosted page today. Saving and sharing a shopper’s own look, a bill of materials for the placed products, and an embeddable version for product pages are on the roadmap.',
  },
  {
    q: 'What does Thridify offer free?',
    a: 'Two things: a 15-day free trial of the platform, and a 30-minute demo call tailored to your industry, run on Thridify’s existing live experiences.',
  },
];

const VERTICALS = [
  { slug: 'furniture', label: 'Furniture & home décor', q: 'The category the room was built for.' },
  { slug: 'laminates-surfaces', label: 'Laminates & surfaces', q: 'Floors and walls shoppers can change.' },
  { slug: 'modular-kitchens', label: 'Modular kitchens', q: 'Configured modules, placed in a space.' },
];

export const metadata = pageMetadata({
  title: '3D Room Visualizer for Furniture & Décor Brands',
  description:
    'A 3D room visualizer your shoppers never install. They compose a whole room from your real, configurable catalogue at true scale, dress it, walk through it, and view the room in AR. Hosted per account, themed to your brand.',
  keywords: [
    '3D room visualizer',
    'room visualizer',
    '3D room planner',
    'room planner for furniture website',
    'furniture room planner online',
    'virtual room designer ecommerce',
    'shop the look 3D',
    'room visualizer software',
  ],
  path: PATH,
  image: '/og/room-visualizer.png',
});

export default function RoomVisualizerPage() {
  const faqLd: LdNode = {
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  const serviceLd: LdNode = {
    '@type': 'Service',
    '@id': `${siteUrl(PATH)}#service`,
    name: '3D Room Visualizer',
    serviceType: '3D room visualizer software',
    description: metadata.description as string,
    provider: { '@type': 'Organization', name: 'Thridify', url: siteUrl('/') },
    areaServed: ['IN', 'CA', 'US', 'GB', 'AE', 'AU'],
    url: siteUrl(PATH),
  };

  return (
    <>
      <JsonLd
        nodes={[
          webPageLd({
            path: PATH,
            name: '3D Room Visualizer',
            description: metadata.description as string,
          }),
          serviceLd,
          faqLd,
          breadcrumbLd(PATH, [
            { name: 'Home', path: '/' },
            { name: '3D room visualizer', path: PATH },
          ]),
        ]}
      />

      <nav aria-label="Breadcrumb" className="container-x pt-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-foreground/70">
          <li>
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-foreground/80" aria-current="page">
            3D room visualizer
          </li>
        </ol>
      </nav>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 aurora opacity-60 pointer-events-none" aria-hidden />
        <div className="container-x relative section pb-10 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow">3D room visualizer</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="tt-display mt-5">
                Shoppers don’t buy a sofa. They buy a living room.
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 lead">
                A room visualizer that lets them compose the whole room from your real, configurable
                catalogue, at true scale, then stand in it in AR. One link. No app. No code.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Book a 30-minute demo
                </a>
                <Link href="/shop-the-look" className="btn-ghost">
                  How curated looks work
                </Link>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal delay={0.2}>
              <RoomCapture
                src="/room-visualizer/room.webp"
                alt="Thridify Shop the Look: the brand’s curated Scandi living room — a grey three-seater sofa under a Monet print, two patterned armchairs, a pair of tufted ottomans on an ivory wool rug, a whitewashed sideboard, a fiddle-leaf fig, a pendant and a floor lamp on a natural oak floor."
                caption="A curated look on a live Thridify account: six catalogue products at true scale, dressed with rug, art, plant and lighting."
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mb-10">
            <p className="eyebrow">The problem it solves</p>
            <h2 className="tt-2">
              A product page sells the first decision in a room. The other four are sold nowhere.
            </h2>
          </div>
          <div className="max-w-3xl space-y-5 text-foreground/75 leading-relaxed">
            <p>
              Furniture, rugs, lighting and décor are bought together and sold separately. The
              lifestyle photograph on the homepage shows a styled room nobody can buy from; the
              product page underneath shows one sofa, alone, in its default fabric. The rug under
              it, the lamp beside it and the second chair facing it are left for the shopper to go
              and find, and most never do.
            </p>
            <p>
              A product-level AR button answers “does this fit?”. It cannot answer “does this go
              with that?”, which is the question that decides whether the basket has one item in
              it or four.
            </p>
            <p>
              The room visualizer is the page where the second, third and fourth items get sold:
              the shopper places your real products, in the configurations they chose, in one
              room, and sees them together before they order.
            </p>
          </div>
          <div className="mt-10 grid sm:grid-cols-3 gap-5 max-w-3xl">
            {(['returns', 'conversion', 'engagement'] as const).map((k) => (
              <div key={k} className="card p-6">
                <p className="tt-mono text-3xl text-primary">{CANONICAL_METRICS[k].value}</p>
                <p className="mt-2 text-sm text-foreground/70">{CANONICAL_METRICS[k].label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-x">
          <div className="max-w-3xl mb-10">
            <p className="eyebrow">What the shopper does</p>
            <h2 className="tt-2">Six steps from catalogue to a room they can stand in.</h2>
          </div>
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <ol className="lg:col-span-5 divide-y divide-foreground/10 border-t border-foreground/10">
              {STEPS.map((s, i) => (
                <li key={s.t} className="py-5 flex gap-4">
                  <span className="tt-mono text-foreground/30 text-sm pt-1 shrink-0">0{i + 1}</span>
                  <div>
                    <h3 className="font-heading text-lg font-semibold tracking-tight">{s.t}</h3>
                    <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{s.b}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="lg:col-span-7 space-y-5">
              <RoomRecording
                name="shopper-value"
                label="Screen capture of Thridify Shop the Look from the shopper’s side: the brand’s curated living room is opened, the three-seater is removed, a sectional is searched for, customized in the configurator and added at true scale, dragged into place, the rug is swapped, the room is walked through, then View in AR shows the composed room with a QR code for the phone."
                caption="The shopper’s side, 12 Oct 2026: open the brand’s look, swap the sofa for a sectional in the fabric you want, change the rug, walk through it, take it into AR. Frames from the live page at 15 fps, nothing composited."
              />
              <div className="grid sm:grid-cols-2 gap-5">
                <RoomCapture
                  src="/room-visualizer/browse.webp"
                  alt="The Browse view of a Thridify Shop the Look page: a grid of the brand’s published products, each with a Customize & add button."
                  caption="Browse: the published catalogue, with Customize & add on every product."
                  sizes="(min-width: 1024px) 30vw, 100vw"
                />
                <RoomCapture
                  src="/room-visualizer/plan.webp"
                  alt="Top-down plan view of the same room, showing the real footprints of the placed products on the floor grid."
                  caption="Plan: the top-down view with real footprints."
                  sizes="(min-width: 1024px) 30vw, 100vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="max-w-3xl mb-10">
            <p className="eyebrow">Dress the room</p>
            <h2 className="tt-2">Six room styles. Real materials. Lights that light.</h2>
            <p className="mt-4 text-foreground/70 leading-relaxed">
              Shoppers judge a rug against the floor and a sofa against the wall. The floor and
              wall finishes are physically based materials (marble, onyx, travertine, terrazzo,
              oak, walnut, parquet, stone) with tiling scale and rotation; rugs come from a fabric
              and pattern library with real pile thickness and fringe; pendants and floor lamps
              carry a real light source. Switching the room style keeps every placed product where
              it was.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            <RoomCapture
              src="/room-visualizer/elements.webp"
              alt="The Elements panel of the room page: décor, greenery, lighting, art and architecture elements that can be added to the room."
              caption="Elements: décor, greenery, lighting, art, architecture."
              sizes="(min-width: 768px) 33vw, 100vw"
            />
            <RoomCapture
              src="/room-visualizer/scandi.webp"
              alt="The Scandi living room look as a shopper opens it on the Shop the Look page, with the Rooms tab showing the brand’s curated looks."
              caption="Curated look, opened by the shopper: every product still live."
              sizes="(min-width: 768px) 33vw, 100vw"
            />
            <RoomCapture
              src="/room-visualizer/walk.webp"
              alt="Eye-height walk-through view of the room, standing beside the placed furniture."
              caption="Walk: eye height, keyboard on desktop, joystick on touch."
              sizes="(min-width: 768px) 33vw, 100vw"
            />
          </div>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-x grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow">For the brand</p>
            <h2 className="tt-2">Curated by your team. Finished by the shopper.</h2>
            <div className="mt-8 grid sm:grid-cols-2 gap-5">
              {BRAND_SIDE.map((d) => (
                <div key={d.t} className="card p-6">
                  <h3 className="font-heading text-lg font-semibold tracking-tight">{d.t}</h3>
                  <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{d.b}</p>
                </div>
              ))}
            </div>
            <Link href="/shop-the-look" className="mt-6 inline-flex items-center gap-1 text-primary">
              How Shop the Look pages work <ArrowRight className="w-4 h-4" aria-hidden />
            </Link>
          </div>
          <div className="lg:col-span-5 space-y-5">
            <RoomRecording
              name="admin-build"
              poster="/room-visualizer/admin-editor.webp"
              label="Captioned time-lapse of the admin Room Visualizer: a room template is chosen, the three-seater, armchairs, ottomans, sideboard, rug, art, plant and lighting are placed stage by stage, the plan is checked, a lighting preset is picked, the look is published and appears in My rooms."
              caption="The brand’s side, 12 Oct 2026: twelve stages of the same look being built in the admin, each a real screenshot of the editor, with captions added. Roughly thirty seconds."
            />
            <RoomCapture
              src="/room-visualizer/admin-editor.webp"
              alt="The admin Room Visualizer: the Scandi Living Room saved with twelve items, the Published switch on, Shop the Look, AR and Save buttons, and the Room & Lighting panel with lighting preset, wall toggles and finishes."
              caption="The admin Room Visualizer: a saved, published room with its lighting and wall-finish controls."
              width={1357}
              height={896}
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
            <div className="grid grid-cols-2 gap-5 items-start">
              <RoomCapture
                src="/room-visualizer/admin-my-rooms.webp"
                alt="The Start a room dialog in the admin, My rooms tab, showing the Scandi Living Room and another saved room, each with a Published badge."
                caption="My rooms: saved looks, with their published state."
                width={1357}
                height={896}
                sizes="(min-width: 1024px) 20vw, 50vw"
              />
              <RoomCapture
                src="/room-visualizer/rooms.webp"
                alt="The Rooms tab of the shopper page: the same curated look at the top, then the room styles the shopper can switch between."
                caption="The shopper side: the curated look appears first."
                sizes="(min-width: 1024px) 20vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">How to evaluate one</p>
            <h2 className="tt-2">Six questions to ask any room visualizer, including this one.</h2>
            <p className="mt-4 text-sm text-foreground/60">
              The full seven-point test, with how to run each check, is on the blog.
            </p>
          </div>
          <div className="lg:col-span-8 divide-y divide-foreground/10 border-t border-foreground/10">
            {CHECKLIST.map((c) => (
              <div key={c.t} className="py-5">
                <h3 className="font-heading text-lg font-semibold tracking-tight">{c.t}</h3>
                <p className="mt-2 text-foreground/70 leading-relaxed max-w-2xl">{c.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-x">
          <div className="max-w-3xl mb-10">
            <p className="eyebrow">By industry</p>
            <h2 className="tt-2">Where a room page earns its place.</h2>
          </div>
          <ul className="grid sm:grid-cols-3 gap-5">
            {VERTICALS.map((v) => (
              <li key={v.slug}>
                <Link
                  href={`/industries/${v.slug}`}
                  className="card p-6 block h-full hover:border-primary/40 transition-colors"
                >
                  <h3 className="font-heading text-lg font-semibold tracking-tight">{v.label}</h3>
                  <p className="mt-2 text-sm text-foreground/70">{v.q}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm text-primary">
                    See the vertical <ArrowRight className="w-4 h-4" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <p className="eyebrow">FAQ</p>
            <h2 className="tt-2">Room visualizers, answered.</h2>
            <p className="mt-4 text-sm text-foreground/60">Last reviewed {UPDATED}.</p>
          </div>
          <div className="lg:col-span-8 divide-y divide-foreground/10 border-t border-foreground/10">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-heading text-lg font-semibold tracking-tight">
                  {f.q}
                  <ArrowRight
                    className="w-5 h-5 text-primary shrink-0 transition-transform group-open:rotate-90"
                    aria-hidden
                  />
                </summary>
                <p className="mt-3 text-foreground/70 leading-relaxed max-w-2xl">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-x">
          <p className="eyebrow">Keep reading</p>
          <h2 className="tt-2 mb-8">Related</h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { href: '/shop-the-look', t: 'Shop the Look', b: 'Publish curated looks shoppers can open and buy from.' },
              { href: '/ar-viewer', t: 'AR product viewer', b: 'The single-product “does it fit?” step.' },
              { href: '/3d-product-configurator', t: '3D product configurator', b: 'The configurator that runs inside the room.' },
              { href: '/blog/what-is-a-3d-room-visualizer', t: 'What is a 3D room visualizer?', b: 'The plain-language guide.' },
            ].map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  className="card p-6 block h-full hover:border-primary/40 transition-colors"
                >
                  <h3 className="font-heading text-base font-semibold tracking-tight">{r.t}</h3>
                  <p className="mt-2 text-sm text-foreground/70">{r.b}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="on-dark relative bg-ink text-paper overflow-hidden">
        <div className="absolute inset-0 opacity-20 aurora pointer-events-none" aria-hidden />
        <div className="container-x section relative text-center">
          <p className="eyebrow eyebrow-center">See it on your category</p>
          <h2 className="tt-1 mt-4 max-w-2xl mx-auto">
            Thirty minutes, on a room built from the products you actually sell.
          </h2>
          <p className="mt-4 text-paper/70 max-w-xl mx-auto">
            The demo runs on Thridify’s existing live looks. The 15-day free trial of the platform
            starts from the same call.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Book a Demo
            </a>
            <Link href="/resources/roi-of-3d-and-ar-commerce#calculator" className="btn-ghost">
              Model the ROI first
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
