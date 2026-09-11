import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { pageMetadata, siteUrl } from '@/lib/seo';
import { breadcrumbLd, webPageLd, type LdNode } from '@/lib/knowledge-graph';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/Reveal';
import { ReturnsCalculator } from '@/components/ReturnsCalculator';
import { CANONICAL_METRICS } from '@/lib/industries';

/**
 * /resources/roi-of-3d-and-ar-commerce — the data-backed ROI guide.
 *
 * Provenance discipline (No-Faking): every external number links to its
 * primary source and is labelled as such; Thridify's own six metrics are
 * labelled as Thridify's published outcomes from client deployments; the
 * calculator runs only on the reader's inputs.
 */

const PATH = '/resources/roi-of-3d-and-ar-commerce';
const CALENDLY = 'https://calendly.com/hello-thridify/30min';
const PUBLISHED = '2026-09-11';

const SOURCES = [
  {
    id: 'nrf',
    label: 'National Retail Federation & Happy Returns — 2025 Retail Returns Landscape (press release, Oct 2025)',
    href: 'https://nrf.com/media-center/press-releases/consumers-expected-to-return-nearly-850-billion-in-merchandise-in-2025',
  },
  {
    id: 'shopify',
    label: 'Shopify — “3D Ecommerce: A New Era of Retail” (merchant case studies: Rebecca Minkoff, Oakywood)',
    href: 'https://www.shopify.com/blog/3d-ecommerce',
  },
  {
    id: 'eightx',
    label: 'Eightx — Furniture and Home Return Rate Benchmarks (industry benchmark compilation, 2025)',
    href: 'https://eightx.co/blog/average-furniture-and-home-return-rate-benchmarks',
  },
];

const FAQS = [
  {
    q: 'What is the ROI of 3D and AR in ecommerce?',
    a: 'It comes from four lines: fewer returns, higher conversion, lower content cost (one 3D model replaces per-variant photoshoots) and faster quoting for configurable products. Thridify’s published client outcomes are 75% lower returns, 3× conversion, 70% lower photography cost and 40% lower inventory cost; the calculator above lets you model your own numbers conservatively.',
  },
  {
    q: 'How much do product returns cost retailers?',
    a: 'The NRF and Happy Returns estimated that 15.8% of 2025 US retail sales — about $849.9 billion — would be returned, with online purchases returned at roughly 19.3%. Online furniture and home brands typically run 19–23%, and a bulky return can cost more than the order’s margin.',
  },
  {
    q: 'Does 3D and AR actually lift conversion?',
    a: 'Shopify’s published merchant case studies report that shoppers who viewed a product as a 3D model were 44% more likely to add it to cart and those who viewed it in AR 65% more likely to purchase (Rebecca Minkoff). Thridify’s own published outcome across client deployments is 3× higher conversion.',
  },
  {
    q: 'How fast does a 3D commerce deployment pay back?',
    a: 'Thridify customers typically break even in 4–6 weeks and see 300%+ ROI by month six, driven by returns, conversion and content savings. Results depend on catalogue, traffic and price point — start with one hero product and measure.',
  },
];

export const metadata = pageMetadata({
  title: 'The ROI of 3D & AR Commerce — Returns, Conversion, Content Cost',
  description:
    'A data-backed guide to the return on 3D product viewers, configurators and app-free AR: NRF returns data, Shopify case studies, Thridify’s six published outcomes, and a calculator for your own numbers.',
  keywords: [
    'ROI of 3D product visualization',
    'does AR reduce returns',
    'ecommerce returns cost 2025',
    '3D configurator ROI',
    'AR conversion rate uplift',
  ],
  path: PATH,
  image: '/og/resource-roi-of-3d-and-ar-commerce.png',
});

export default function RoiGuide() {
  const articleLd: LdNode = {
    '@type': 'Article',
    '@id': `${siteUrl(PATH)}#article`,
    headline: 'The ROI of 3D and AR commerce: returns, conversion and content cost',
    description: metadata.description as string,
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
    author: { '@type': 'Organization', name: 'Thridify', url: siteUrl('/') },
    publisher: { '@type': 'Organization', name: 'Thridify', url: siteUrl('/') },
    mainEntityOfPage: siteUrl(PATH),
    citation: SOURCES.map((s) => s.href),
  };
  const faqLd: LdNode = {
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  return (
    <>
      <JsonLd
        nodes={[
          webPageLd({ path: PATH, name: 'The ROI of 3D & AR commerce', description: metadata.description as string }),
          articleLd,
          faqLd,
          breadcrumbLd(PATH, [
            { name: 'Home', path: '/' },
            { name: 'Resources', path: '/resources' },
            { name: 'ROI of 3D & AR', path: PATH },
          ]),
        ]}
      />
      <nav aria-label="Breadcrumb" className="container-x pt-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-foreground/70">
          <li><Link href="/" className="hover:text-primary">Home</Link></li>
          <li aria-hidden>/</li>
          <li><Link href="/resources" className="hover:text-primary">Resources</Link></li>
          <li aria-hidden>/</li>
          <li className="text-foreground/80" aria-current="page">ROI of 3D &amp; AR</li>
        </ol>
      </nav>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 aurora opacity-60 pointer-events-none" aria-hidden />
        <div className="container-x relative section pb-10">
          <Reveal><p className="eyebrow">ROI guide · {PUBLISHED}</p></Reveal>
          <Reveal delay={0.08}>
            <h1 className="tt-display mt-5 max-w-4xl">The ROI of 3D and AR: returns, conversion, content cost.</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 lead max-w-2xl">
              What the public data says, what Thridify’s deployments show, and a calculator that
              runs on your numbers — not ours.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 1. The problem, sourced */}
      <section className="section pt-0">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">The returns problem</p>
            <h2 className="tt-2">Returns are a line item the size of a country’s GDP.</h2>
          </div>
          <div className="lg:col-span-8 max-w-2xl space-y-5 text-foreground/75 leading-relaxed">
            <p>
              The National Retail Federation and Happy Returns estimated that <strong>15.8% of 2025 US retail
              sales — about $849.9 billion — would be returned</strong>, and that online purchases would be
              returned at roughly <strong>19.3%</strong>.<sup><a href="#src-nrf" className="text-primary">1</a></sup>
            </p>
            <p>
              Furniture and home goods bought online typically run <strong>19–23%</strong>, and because the
              goods are bulky, a single return can cost more than the order’s margin once return shipping,
              inspection and restock or write-off are counted.<sup><a href="#src-eightx" className="text-primary">3</a></sup>
            </p>
            <p>
              The common cause is the same across categories: the buyer could not judge scale, finish or
              fit from photos. That is precisely what interactive 3D and app-free AR fix before checkout.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Public evidence */}
      <section className="section bg-surface">
        <div className="container-x">
          <div className="max-w-3xl mb-10">
            <p className="eyebrow">Public evidence</p>
            <h2 className="tt-2">What published case studies report.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { v: '+44%', l: 'more likely to add to cart after viewing a product in 3D', s: 'Rebecca Minkoff, via Shopify', id: 'shopify' },
              { v: '+65%', l: 'more likely to purchase after viewing a product in AR', s: 'Rebecca Minkoff, via Shopify', id: 'shopify' },
              { v: '19.3%', l: 'of online purchases expected to be returned in 2025', s: 'NRF & Happy Returns', id: 'nrf' },
            ].map((m) => (
              <div key={m.v + m.l} className="card p-7">
                <p className="font-heading text-4xl font-semibold tracking-tight text-primary">{m.v}</p>
                <p className="mt-3 text-foreground/75 leading-relaxed">{m.l}</p>
                <p className="mt-3 text-xs text-foreground/50">
                  Source: <a href={`#src-${m.id}`} className="underline underline-offset-2">{m.s}</a>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Thridify's published outcomes */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-3xl mb-10">
            <p className="eyebrow">Thridify’s published outcomes</p>
            <h2 className="tt-2">Six numbers from client deployments.</h2>
            <p className="mt-4 text-foreground/70 max-w-2xl">
              These are the only figures Thridify claims, measured across brands using the viewer,
              configurator, AR and modelling service. Your results depend on catalogue, traffic and price point.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {Object.values(CANONICAL_METRICS).map((m) => (
              <div key={m.label} className="card p-6">
                <p className="font-heading text-3xl font-semibold tracking-tight text-primary">{m.value}</p>
                <p className="mt-2 text-sm text-foreground/70">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Calculator */}
      <section id="calculator" className="section bg-surface scroll-mt-20">
        <div className="container-x">
          <div className="max-w-3xl mb-8">
            <p className="eyebrow">Returns &amp; conversion calculator</p>
            <h2 className="tt-2">Run it on your numbers.</h2>
            <p className="mt-4 text-foreground/70 max-w-2xl">
              Enter your monthly orders, order value and return rate. The two sliders are the only
              assumptions, and both default to conservative values below Thridify’s published outcomes.
            </p>
          </div>
          <ReturnsCalculator />
        </div>
      </section>

      {/* 5. Where the rest of the ROI comes from */}
      <section className="section">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Beyond returns</p>
            <h2 className="tt-2">Three more lines on the same P&amp;L.</h2>
          </div>
          <div className="lg:col-span-8 grid md:grid-cols-3 gap-5">
            {[
              { t: 'Content cost', b: 'One 3D model renders every colourway, angle and lifestyle scene. A new finish stops needing a new shoot — the source of the 70% photography-cost reduction.' },
              { t: 'Sales-cycle time', b: 'For configurable products, live pricing and instant quotes replace days of back-and-forth; the configuration exports straight to production, so what was sold is what gets built.' },
              { t: 'Inventory', b: 'Selling variants from the model before committing stock to every shade is how brands cut inventory cost by 40% in Thridify’s published outcomes.' },
            ].map((c) => (
              <div key={c.t} className="card p-6">
                <h3 className="font-heading text-lg font-semibold tracking-tight">{c.t}</h3>
                <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{c.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-surface">
        <div className="container-x grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <p className="eyebrow">FAQ</p>
            <h2 className="tt-2">ROI questions, answered.</h2>
          </div>
          <div className="lg:col-span-8 divide-y divide-foreground/10 border-t border-foreground/10">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-heading text-lg font-semibold tracking-tight">
                  {f.q}
                  <ArrowRight className="w-5 h-5 text-primary shrink-0 transition-transform group-open:rotate-90" aria-hidden />
                </summary>
                <p className="mt-3 text-foreground/70 leading-relaxed max-w-2xl">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Sources */}
      <section className="section pt-0">
        <div className="container-x max-w-3xl">
          <p className="eyebrow">Sources</p>
          <ol className="mt-4 space-y-2 text-sm text-foreground/70 list-decimal pl-5">
            {SOURCES.map((s) => (
              <li key={s.id} id={`src-${s.id}`}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-primary">{s.label}</a>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs text-foreground/50">
            Thridify’s six outcome metrics are the company’s published figures from client deployments and are not attributed to the external sources above.
          </p>
        </div>
      </section>

      <section className="on-dark relative bg-ink text-paper overflow-hidden">
        <div className="absolute inset-0 opacity-20 aurora pointer-events-none" aria-hidden />
        <div className="container-x section relative text-center">
          <p className="eyebrow eyebrow-center">Measure it on one product</p>
          <h2 className="tt-1 mt-4 max-w-2xl mx-auto">Start with a single hero SKU and read the numbers yourself.</h2>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary">Book a Demo</a>
            <Link href="/resources/3d-configurator-cost" className="btn-ghost">What does it cost?</Link>
          </div>
        </div>
      </section>
    </>
  );
}
