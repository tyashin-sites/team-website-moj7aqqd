import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { pageMetadata, siteUrl } from '@/lib/seo';
import { breadcrumbLd, webPageLd, type LdNode } from '@/lib/knowledge-graph';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/Reveal';
import { CANONICAL_METRICS } from '@/lib/industries';

/**
 * /ar-viewer — owns "AR viewer", "3D AR viewer", "WebAR",
 * "view in your room", "augmented reality product viewer".
 *
 * The differentiator here is concrete and checkable (the platform AR handoff,
 * USDZ vs GLB, no app install), which is exactly the material competitor
 * landing pages tend to skip.
 */

const PATH = '/ar-viewer';
const CALENDLY = 'https://calendly.com/hello-thridify/30min';
const UPDATED = '2026-09-19';

const STEPS = [
  {
    t: 'The shopper taps "View in your room"',
    b: 'On the product page they are already on. No app store, no QR code detour on mobile, no account.',
  },
  {
    t: 'The phone opens its own AR viewer',
    b: 'Android hands the GLB to Google Scene Viewer; iOS hands a USDZ to AR Quick Look. Both ship with the operating system, which is why nothing needs installing.',
  },
  {
    t: 'The product lands at true scale',
    b: 'Modelled to real dimensions, so a 2.4 m wardrobe is 2.4 m against their wall. Scale is the single question AR answers better than any photograph.',
  },
  {
    t: 'They walk around it and decide',
    b: 'Height against a window, clearance past a door, whether the oak reads warm or grey in their actual light.',
  },
];

const TECH = [
  {
    t: 'Two formats, one source model',
    b: 'iOS requires USDZ and Android requires glTF/GLB. Both are generated from the same source asset, so there is one model to maintain rather than a divergent pair.',
  },
  {
    t: 'WebXR where it is supported',
    b: 'On browsers with WebXR the AR session can run in-page with your own UI overlaid, rather than handing off to the system viewer — useful when the AR step needs to carry configuration controls.',
  },
  {
    t: 'Compressed for mobile data',
    b: 'An AR tap on a phone is the worst-case network moment in the whole session. KTX2 supercompressed textures and Draco geometry are what keep that tap from timing out.',
  },
  {
    t: 'Graceful on unsupported devices',
    b: 'Where AR is unavailable the viewer stays a 3D viewer instead of showing a dead button — desktop visitors get the orbit, not an error.',
  },
];

const FAQS = [
  {
    q: 'What is an AR product viewer?',
    a: 'An AR product viewer lets a shopper place a true-to-scale 3D model of a product into their own room through their phone camera, straight from the product page. It answers the questions photography cannot: whether the piece fits, how big it really is, and how the finish looks in their own light.',
  },
  {
    q: 'Do customers need to download an app?',
    a: 'No. The AR step uses the viewer already built into the phone — Scene Viewer on Android, AR Quick Look on iOS — so there is nothing to install and no account to create. This matters more than it sounds: an app requirement removes most of your mobile traffic from the feature before it starts.',
  },
  {
    q: 'Which phones support AR?',
    a: 'Broadly, iPhones and iPads running recent versions of iOS, and Android devices that support Google Play Services for AR (ARCore). Where a device cannot do AR, the experience stays an interactive 3D viewer rather than failing. The device compatibility page has the current detail.',
  },
  {
    q: 'What is the difference between WebAR and an AR app?',
    a: 'WebAR runs from a web page with no installation, which is why it converts: the shopper is already on your product page when they tap. A native AR app can do more, but only for the small fraction of customers who will install it for a single purchase.',
  },
  {
    q: 'Why does iOS need a different file from Android?',
    a: 'Apple’s AR Quick Look reads USDZ; Android’s Scene Viewer reads glTF/GLB. Thridify generates both from one source model, so the split is a delivery detail rather than two separate builds for your team to keep in sync.',
  },
  {
    q: 'Does AR actually reduce returns?',
    a: 'The mechanism is straightforward — most returns on large or made-to-order goods come from the product not being what the buyer pictured, and AR removes the picturing. The returns research and the numbers behind it are set out on the ROI page rather than asserted here.',
  },
];

export const metadata = pageMetadata({
  title: 'AR Product Viewer — App-Free 3D AR for Your Store',
  description:
    'Let shoppers place your products in their own room at true scale, straight from the product page. App-free WebAR through AR Quick Look on iOS and Scene Viewer on Android, from one source model.',
  keywords: [
    'AR product viewer',
    '3D AR viewer',
    'AR viewer',
    'WebAR',
    'augmented reality product viewer',
    'view in your room',
    'app-free AR ecommerce',
    'AR furniture viewer',
  ],
  path: PATH,
  image: '/og/default.png',
});

export default function ArViewerPage() {
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
    name: 'AR Product Viewer',
    serviceType: 'Augmented reality product viewer for e-commerce',
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
            name: 'AR Product Viewer',
            description: metadata.description as string,
          }),
          serviceLd,
          faqLd,
          breadcrumbLd(PATH, [
            { name: 'Home', path: '/' },
            { name: 'AR product viewer', path: PATH },
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
            AR product viewer
          </li>
        </ol>
      </nav>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 aurora opacity-60 pointer-events-none" aria-hidden />
        <div className="container-x relative section pb-10">
          <Reveal>
            <p className="eyebrow">AR product viewer</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="tt-display mt-5 max-w-4xl">
              Put the product in their room before it ships to it.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 lead max-w-2xl">
              One tap on your product page opens the piece at true scale in the customer&rsquo;s own
              space, through the camera they are already holding. Nothing to install, on either
              platform.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Book a 30-minute demo
              </a>
              <Link href="/device-compatibility" className="btn-ghost">
                Which devices support it
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mb-10">
            <p className="eyebrow">What happens</p>
            <h2 className="tt-2">Four steps, none of which is &ldquo;download our app&rdquo;.</h2>
          </div>
          <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((d, i) => (
              <li key={d.t} className="card p-6 relative">
                <span className="absolute top-5 right-6 tt-mono text-foreground/30 text-sm">
                  0{i + 1}
                </span>
                <h3 className="font-heading text-base font-semibold tracking-tight pr-10">{d.t}</h3>
                <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{d.b}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 grid sm:grid-cols-3 gap-5 max-w-3xl">
            {(['returns', 'conversion', 'inventory'] as const).map((k) => (
              <div key={k} className="card p-6">
                <p className="tt-mono text-3xl text-primary">{CANONICAL_METRICS[k].value}</p>
                <p className="mt-2 text-sm text-foreground/70">{CANONICAL_METRICS[k].label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">How it works underneath</p>
            <h2 className="tt-2">The parts that decide whether it works on a real phone.</h2>
            <p className="mt-4 text-sm text-foreground/60">
              Most AR demos are shot on office wifi. These are the details that matter on a 4G
              connection in a customer&rsquo;s living room.
            </p>
          </div>
          <div className="lg:col-span-8 divide-y divide-foreground/10 border-t border-foreground/10">
            {TECH.map((c) => (
              <div key={c.t} className="py-5">
                <h3 className="font-heading text-lg font-semibold tracking-tight">{c.t}</h3>
                <p className="mt-2 text-foreground/70 leading-relaxed max-w-2xl">{c.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <p className="eyebrow">FAQ</p>
            <h2 className="tt-2">AR viewers, answered.</h2>
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
              { href: '/3d-product-configurator', t: '3D product configurator', b: 'Let them specify it, then place it.' },
              { href: '/360-product-viewer', t: '360° product viewer', b: 'The desktop half of the same model.' },
              { href: '/device-compatibility', t: 'Device compatibility', b: 'What supports AR, and what falls back.' },
              { href: '/industries/furniture', t: 'AR for furniture', b: 'The category AR was made for.' },
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
          <p className="eyebrow eyebrow-center">Try it on your category</p>
          <h2 className="tt-1 mt-4 max-w-2xl mx-auto">
            Thirty minutes, on a real phone, with products like yours.
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Book a Demo
            </a>
            <Link href="/resources/roi-of-3d-and-ar-commerce" className="btn-ghost">
              The returns research
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
