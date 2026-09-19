import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { pageMetadata, siteUrl } from '@/lib/seo';
import { breadcrumbLd, webPageLd, type LdNode } from '@/lib/knowledge-graph';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/Reveal';
import { CANONICAL_METRICS } from '@/lib/industries';

/**
 * /360-product-viewer — owns the viewer cluster: "360 product viewer",
 * "360 degree product view", "3D product viewer", "3D viewer for website".
 *
 * Deliberately ONE page rather than two: "360 viewer" and "3D product viewer"
 * are the same capability in different words, and splitting them would put two
 * thin pages of ours in competition for one intent.
 */

const PATH = '/360-product-viewer';
const CALENDLY = 'https://calendly.com/hello-thridify/30min';
const UPDATED = '2026-09-19';

/** The three things people mean when they say "360 viewer" — named honestly. */
const KINDS = [
  {
    t: 'Spin sets (photographic 360°)',
    b: 'Twenty-four to seventy-two photographs of the product on a turntable, played back as the user drags. Real photography, so materials look exactly right — but it is a fixed orbit at a fixed height, it cannot be relit, it cannot go into AR, and reshooting is the only way to change anything.',
  },
  {
    t: 'Real-time 3D (what Thridify serves)',
    b: 'One glTF/GLB model rendered live in the browser on WebGL. Free orbit, free zoom, any angle rather than a fixed ring, hotspots anchored to real geometry, and the same asset feeds AR, configuration and marketing renders.',
  },
  {
    t: 'Pre-rendered video',
    b: 'A turntable clip. Cheap, plays anywhere, and completely passive — the shopper cannot inspect the part they are actually unsure about, which is the whole reason they came.',
  },
];

const FEATURES = [
  {
    t: 'Free orbit, not a fixed ring',
    b: 'A spin set gives one horizontal orbit. Real-time 3D lets a buyer look underneath a chair, behind a hinge, or straight down at a worktop — the angles that actually answer their question.',
  },
  {
    t: 'Hotspots anchored to geometry',
    b: 'Annotations attach to a point on the mesh and stay attached as the model turns, so "this is the soft-close mechanism" points at the mechanism from every angle.',
  },
  {
    t: 'Loads like a page, not a download',
    b: 'Geometry goes through Draco compression and textures through KTX2 (Basis Universal) supercompression, which is what keeps a product in the megabytes rather than the tens of megabytes on mobile data.',
  },
  {
    t: 'One asset, every surface',
    b: 'The same GLB drives the viewer, the AR step, the configurator and the still renders used in marketing. You model once.',
  },
  {
    t: 'Works inside your product page',
    b: 'It sits in the gallery slot on the PDP rather than behind a lightbox on a microsite, so it is part of the buying flow instead of a novelty.',
  },
  {
    t: 'Accessible and indexable',
    b: 'A poster image renders immediately for crawlers and for anyone on a slow connection, and keyboard users can orbit without a mouse.',
  },
];

const FAQS = [
  {
    q: 'What is a 360° product viewer?',
    a: 'A 360° product viewer is an interactive element on a product page that lets a shopper rotate a product and inspect it from any angle, instead of scrolling through a handful of fixed photographs. It can be built from a photographic spin set or, as Thridify does it, from a real-time 3D model rendered in the browser.',
  },
  {
    q: 'What is the difference between a 360° viewer and a 3D product viewer?',
    a: 'In everyday use the two terms mean the same thing, and most people searching for one will accept the other. The meaningful distinction is technical: a photographic 360° spin set replays images along one fixed orbit, while a 3D product viewer renders an actual model, so the camera can go anywhere and the same asset can also drive AR and configuration.',
  },
  {
    q: 'Does a 360° viewer slow down my product page?',
    a: 'It does if the assets are not prepared properly — uncompressed textures are the usual cause of a 3D page that feels broken on a phone. A poster image should paint first so the page is usable immediately, with the model streaming in behind it, and geometry and textures should be compressed (Draco and KTX2) before they are served.',
  },
  {
    q: 'Do I need a photographer or a 3D artist?',
    a: 'Neither, if you use a modelling service. Thridify builds photoreal glTF/GLB and USDZ assets from your photographs, dimensions and drawings, and you own the files. If your products are already designed in CAD, that source can often be used directly.',
  },
  {
    q: 'Can a 360° viewer go into AR?',
    a: 'A real-time 3D viewer can, because there is an actual model behind it — the same GLB opens in Scene Viewer on Android and, as USDZ, in AR Quick Look on iOS. A photographic spin set cannot, because there is no geometry to place in a room.',
  },
  {
    q: 'Where does the viewer go on the page?',
    a: 'In the main gallery, as one of the media items a shopper already swipes through. Burying it below the fold or behind a separate tab is the most common reason a 3D viewer gets low engagement.',
  },
];

export const metadata = pageMetadata({
  title: '360° Product Viewer & 3D Viewer for Websites',
  description:
    'Add a 360° product viewer to your store: free-orbit real-time 3D, geometry hotspots, compressed assets that load on mobile data, and the same model feeding AR. No app, no plugin for the shopper.',
  keywords: [
    '360 product viewer',
    '360 viewer',
    '3D viewer',
    '3D product viewer',
    '360 degree product view',
    '3D viewer for website',
    'interactive product viewer',
    'WebGL product viewer',
  ],
  path: PATH,
  image: '/og/default.png',
});

export default function ViewerPage() {
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
    name: '360° Product Viewer',
    serviceType: '3D and 360-degree product viewer software',
    description: metadata.description as string,
    provider: { '@type': 'Organization', name: 'Thridify', url: siteUrl('/') },
    url: siteUrl(PATH),
  };

  return (
    <>
      <JsonLd
        nodes={[
          webPageLd({
            path: PATH,
            name: '360° Product Viewer',
            description: metadata.description as string,
          }),
          serviceLd,
          faqLd,
          breadcrumbLd(PATH, [
            { name: 'Home', path: '/' },
            { name: '360° product viewer', path: PATH },
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
            360° product viewer
          </li>
        </ol>
      </nav>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 aurora opacity-60 pointer-events-none" aria-hidden />
        <div className="container-x relative section pb-10">
          <Reveal>
            <p className="eyebrow">360° product viewer</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="tt-display mt-5 max-w-4xl">
              Let them turn the product over before they decide.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 lead max-w-2xl">
              A 360° product viewer that renders a real model rather than replaying photographs — so
              the camera can go anywhere the shopper&rsquo;s doubt is, and the same asset carries
              straight into AR.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Book a 30-minute demo
              </a>
              <Link href="/device-compatibility" className="btn-ghost">
                Device support
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mb-10">
            <p className="eyebrow">Three different things, one name</p>
            <h2 className="tt-2">&ldquo;360° viewer&rdquo; means at least three things. They are not equivalent.</h2>
            <p className="mt-4 text-foreground/70 leading-relaxed">
              Worth knowing which one a vendor is quoting you for, because the cost, the build time
              and the ceiling are completely different.
            </p>
          </div>
          <ol className="grid md:grid-cols-3 gap-5">
            {KINDS.map((d, i) => (
              <li key={d.t} className="card p-6 relative">
                <span className="absolute top-5 right-6 tt-mono text-foreground/30 text-sm">
                  0{i + 1}
                </span>
                <h3 className="font-heading text-lg font-semibold tracking-tight pr-10">{d.t}</h3>
                <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{d.b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-x">
          <div className="max-w-3xl mb-10">
            <p className="eyebrow">What you get</p>
            <h2 className="tt-2">Built for a product page, not a showreel.</h2>
          </div>
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((d) => (
              <li key={d.t} className="card p-6">
                <h3 className="font-heading text-lg font-semibold tracking-tight">{d.t}</h3>
                <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{d.b}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 grid sm:grid-cols-3 gap-5 max-w-3xl">
            {(['engagement', 'ctr', 'photography'] as const).map((k) => (
              <div key={k} className="card p-6">
                <p className="tt-mono text-3xl text-primary">{CANONICAL_METRICS[k].value}</p>
                <p className="mt-2 text-sm text-foreground/70">{CANONICAL_METRICS[k].label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <p className="eyebrow">FAQ</p>
            <h2 className="tt-2">360° viewers, answered.</h2>
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
              { href: '/3d-product-configurator', t: '3D product configurator', b: 'When the product has options to choose.' },
              { href: '/ar-viewer', t: 'AR product viewer', b: 'Place it in the room, no app needed.' },
              { href: '/3d-product-visualization', t: '3D product visualization', b: 'Stills and video from the same model.' },
              { href: '/services/3d-modelling', t: '3D modelling service', b: 'Getting the assets made.' },
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
          <p className="eyebrow eyebrow-center">See it on your products</p>
          <h2 className="tt-1 mt-4 max-w-2xl mx-auto">
            Thirty minutes, built around the products you actually sell.
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Book a Demo
            </a>
            <Link href="/platform" className="btn-ghost">
              See the platform
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
