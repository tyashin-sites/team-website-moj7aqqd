import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { pageMetadata, siteUrl } from '@/lib/seo';
import { breadcrumbLd, webPageLd, type LdNode } from '@/lib/knowledge-graph';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/Reveal';
import { CANONICAL_METRICS } from '@/lib/industries';

/**
 * /3d-product-configurator — the money page for the head term.
 *
 * Why this page exists: the term was being defended only by a blog post while
 * `/platform` (five pillars) and `/features` (everything) are about the
 * company, not about the query. Google ranks the page that IS the subject.
 *
 * Top-level slug on purpose — exact-match, no parent segment diluting it.
 *
 * Content rules: canonical metrics only (no invented figures), no pricing
 * (Rule 19 — scoped on the call), and the only free offers named anywhere are
 * the 15-day trial and the 30-minute demo (Rule 23).
 */

const PATH = '/3d-product-configurator';
const CALENDLY = 'https://calendly.com/hello-thridify/30min';
const UPDATED = '2026-09-19';

/** What the thing actually does, in the order a buyer evaluates it. */
const CAPABILITIES = [
  {
    t: 'Real-time option switching',
    b: 'Finish, fabric, size, module and hardware change on the model itself, not on a swatch grid beside it. Options are carried as material variants on one model, so a 54-colourway product is one asset, not 54.',
  },
  {
    t: 'Live pricing as they configure',
    b: 'Each option carries its own price rule, so the figure on screen is the figure for the exact build in front of them. No "request a quote" gap where the buyer goes cold.',
  },
  {
    t: 'App-free AR, in their room',
    b: 'The configured build — their finish, their size — opens in the phone camera. Android goes through Scene Viewer, iOS through AR Quick Look. No app install, no download step.',
  },
  {
    t: 'Quote and BOM out the other end',
    b: 'The configuration leaves as a structured bill of materials rather than a screenshot and a phone call, so the factory builds what the customer actually picked.',
  },
  {
    t: 'Variant-level analytics',
    b: 'Which finishes get configured, which get abandoned, which convert. Merchandising signal you cannot get from a dropdown.',
  },
  {
    t: 'No-code publishing',
    b: 'Products, options, rules and pricing are managed in the Studio by the people who own the catalogue. Shipping a new colourway does not need a developer.',
  },
];

/** The honest evaluation criteria — including the ones that disqualify us. */
const CHECKLIST = [
  {
    t: 'Does it run without an app?',
    b: 'If AR requires a download, most of your traffic will never see it. Web-based AR uses the platform viewers already on the phone.',
  },
  {
    t: 'How heavy is the page?',
    b: 'Ask for the byte size of a loaded product. Uncompressed textures are what make 3D pages feel broken on mobile data — KTX2 (Basis Universal) supercompression and Draco geometry compression are the difference between a 40 MB asset and a few megabytes.',
  },
  {
    t: 'Who owns the 3D files?',
    b: 'If you leave the vendor, do the glTF/GLB and USDZ files leave with you? Ask before you sign, not after.',
  },
  {
    t: 'Can your team publish without engineering?',
    b: 'A configurator that needs a developer for every new finish will stop being updated within two quarters.',
  },
  {
    t: 'Does it work on your actual storefront?',
    b: 'One-click on Shopify, WooCommerce, WordPress and the rest; an embed for a custom build. A configurator that only runs on a microsite is a demo, not a channel.',
  },
  {
    t: 'What happens to the configuration after checkout?',
    b: 'Visualisation that does not reach production just moves the ambiguity downstream to the factory floor.',
  },
];

const FAQS = [
  {
    q: 'What is a 3D product configurator?',
    a: 'A 3D product configurator is a browser-based tool on your product page that lets a shopper change a product’s finish, size, material, modules or hardware and see the result rendered in real time on an interactive 3D model — usually with live pricing, and often with an option to place the configured product in their own room using AR.',
  },
  {
    q: 'How is it different from a 360° product viewer?',
    a: 'A 360° viewer lets someone rotate and inspect one fixed version of a product. A configurator lets them change the product and see the version they specified. If your catalogue has options, you want a configurator; if it has one fixed build, a viewer is enough.',
  },
  {
    q: 'Do shoppers need to install an app?',
    a: 'No. The 3D viewer and configurator run in the browser, and the AR step uses the viewer already built into the phone — Scene Viewer on Android, AR Quick Look on iOS. There is nothing to download.',
  },
  {
    q: 'Does a 3D configurator work on Shopify and WooCommerce?',
    a: 'Yes. Thridify installs as a one-click plugin on Shopify, WooCommerce, WordPress, Wix, BigCommerce, Adobe Commerce (Magento), PrestaShop, Drupal and Squarespace, and as an embeddable snippet or SDK call on a custom storefront.',
  },
  {
    q: 'Do I need 3D models of my products already?',
    a: 'No. If your products were designed in CAD the models often already exist in your workflow. If not, Thridify’s 3D modelling service builds photoreal, AR-ready glTF/GLB and USDZ assets from your photos, dimensions and drawings — and you own the files.',
  },
  {
    q: 'How many products should I start with?',
    a: 'One. Pick the SKU with the most options and the most hesitation around it, prove the lift on that product page, then batch the rest. Starting with the whole catalogue is the most common way these projects stall.',
  },
  {
    q: 'How much does a 3D product configurator cost?',
    a: 'It depends on catalogue size, product complexity, how many variants each product carries and which experiences you switch on. The cost drivers are broken down in full on the 3D configurator cost guide, and an exact figure is scoped on a short call.',
  },
  {
    q: 'What does Thridify offer free?',
    a: 'Two things: a 15-day free trial of the platform, and a 30-minute demo call tailored to your industry, run on Thridify’s existing live experiences.',
  },
];

/** Industry cross-links — the "multiplexed" intent, pointed at real pages. */
const VERTICALS = [
  { slug: 'furniture', label: 'Furniture', q: '3D furniture configurator' },
  { slug: 'modular-kitchens', label: 'Modular kitchens', q: 'kitchen & wardrobe configurator' },
  { slug: 'doors-and-windows', label: 'Doors & windows', q: 'door and window configurator' },
  { slug: 'laminates-surfaces', label: 'Laminates & surfaces', q: 'laminate & veneer visualiser' },
  { slug: 'luggage', label: 'Luggage & bags', q: 'luggage configurator' },
  { slug: 'industrial-machinery', label: 'Industrial machinery', q: 'machinery configurator' },
];

export const metadata = pageMetadata({
  title: '3D Product Configurator for E-Commerce',
  description:
    'A no-code 3D product configurator that lets shoppers change finish, size and modules in real time, see live pricing, and place the exact build in their room with app-free AR. Installs on Shopify, WooCommerce and WordPress.',
  keywords: [
    '3D product configurator',
    'product configurator',
    '3D configurator software',
    'online product configurator',
    'ecommerce product configurator',
    'visual product configurator',
    'WooCommerce 3D product configurator',
    'WordPress 3D product configurator',
    '3D furniture configurator',
  ],
  path: PATH,
  image: '/og/default.png',
});

export default function ConfiguratorPage() {
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
    name: '3D Product Configurator',
    serviceType: '3D product configurator software',
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
            name: '3D Product Configurator',
            description: metadata.description as string,
          }),
          serviceLd,
          faqLd,
          breadcrumbLd(PATH, [
            { name: 'Home', path: '/' },
            { name: '3D product configurator', path: PATH },
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
            3D product configurator
          </li>
        </ol>
      </nav>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 aurora opacity-60 pointer-events-none" aria-hidden />
        <div className="container-x relative section pb-10">
          <Reveal>
            <p className="eyebrow">3D product configurator</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="tt-display mt-5 max-w-4xl">
              A 3D product configurator your customers never have to install.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 lead max-w-2xl">
              Shoppers change the finish, the size and the modules and watch the product change with
              them — priced live, and viewable in their own room through the phone camera. It runs in
              the browser, on the storefront you already have.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Book a 30-minute demo
              </a>
              <Link href="/resources/3d-configurator-cost" className="btn-ghost">
                What it costs
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mb-10">
            <p className="eyebrow">The problem it solves</p>
            <h2 className="tt-2">
              A dropdown asks the customer to imagine the product. Most of them get it wrong.
            </h2>
          </div>
          <div className="max-w-3xl space-y-5 text-foreground/75 leading-relaxed">
            <p>
              Configurable products break the normal e-commerce pattern. A sofa in four fabrics and
              three sizes cannot be photographed twelve times, so the page shows one photo and a set
              of dropdowns, and the buyer is asked to hold the other eleven versions in their head.
              Some of them guess. A share of those guesses come back as returns, and the returns are
              expensive precisely because the product is large, custom or made to order.
            </p>
            <p>
              The same gap exists further down the line. A configuration that reaches the factory as
              a screenshot and a phone call gets interpreted, and interpretation is where rework
              comes from.
            </p>
            <p>
              A 3D product configurator closes both ends: the buyer sees the exact build before
              they commit, and the build leaves as structured data rather than a description.
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
            <p className="eyebrow">What it does</p>
            <h2 className="tt-2">Six capabilities, in the order buyers evaluate them.</h2>
          </div>
          <ol className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAPABILITIES.map((d, i) => (
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

      <section className="section">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">How to evaluate one</p>
            <h2 className="tt-2">Six questions to ask any vendor, including this one.</h2>
            <p className="mt-4 text-sm text-foreground/60">
              These are the questions that separate a configurator you will still be using in two
              years from one that quietly stops being updated.
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
            <h2 className="tt-2">What a configurator has to do changes by category.</h2>
          </div>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
            <h2 className="tt-2">3D product configurators, answered.</h2>
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
              { href: '/360-product-viewer', t: '360° product viewer', b: 'When the product has no options to configure.' },
              { href: '/ar-viewer', t: 'AR product viewer', b: 'The in-their-room step, without an app.' },
              { href: '/3d-product-visualization', t: '3D product visualization', b: 'Photoreal imagery and video from one model.' },
              { href: '/resources/3d-configurator-cost', t: 'What it costs', b: 'The six drivers behind the number.' },
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
            Thirty minutes, built around the products you actually sell.
          </h2>
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
