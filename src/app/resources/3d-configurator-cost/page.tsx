import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { pageMetadata, siteUrl } from '@/lib/seo';
import { breadcrumbLd, webPageLd, type LdNode } from '@/lib/knowledge-graph';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/Reveal';

/**
 * /resources/3d-configurator-cost — owns the "how much does it cost" intent.
 * Explains the cost DRIVERS and the pricing model shape without quoting a
 * figure (pricing is scoped on the demo call — Rule 19), so the page earns the
 * query honestly and converts to the call.
 */

const PATH = '/resources/3d-configurator-cost';
const CALENDLY = 'https://calendly.com/hello-thridify/30min';
const PUBLISHED = '2026-09-11';

const DRIVERS = [
  { t: 'Number of products', b: 'The first cost is catalogue size: how many SKUs need a 3D model. Most teams start with one hero product, prove the lift, then batch the rest.' },
  { t: 'Model complexity', b: 'A flat-pack table and a 54-colourway suitcase are different jobs. Geometry, material count, moving parts and the references you can supply (photos, dimensions, CAD) set the modelling effort.' },
  { t: 'Variants and modules', b: 'A configurator carries finishes, sizes and modules as swappable options on one model. More options mean more materials and rules to build, but no extra models.' },
  { t: 'Experiences you switch on', b: 'Viewer only, viewer plus AR, or full configurator with live pricing and quotes — each adds setup, not re-modelling.' },
  { t: 'Integration path', b: 'A plugin on Shopify, WooCommerce or WordPress installs in minutes. A custom storefront uses the SDK, where a developer does one embed.' },
  { t: 'Who runs it after launch', b: 'Self-serve on the no-code Studio, or managed services where Thridify creates new experiences and changes for you.' },
];

const FAQS = [
  {
    q: 'How much does a 3D product configurator cost?',
    a: 'It depends on catalogue size, product complexity, the number of variants and which experiences you need. Thridify runs on a monthly platform subscription plus a one-time setup that covers integration and your first experiences, with optional managed services and the done-for-you modelling service on top. The exact figure is scoped on a short call.',
  },
  {
    q: 'Why doesn’t Thridify publish a price list?',
    a: 'Two catalogues of the same size can differ hugely in geometry, materials and variant count, so a public number would be wrong for most readers. A 15–30 minute scoping call gives you an accurate figure instead of a misleading one.',
  },
  {
    q: 'What does the one-time setup cover?',
    a: 'Website integration, creation of your first experiences and hand-over to your team so you can publish and manage products yourself in the no-code Studio.',
  },
  {
    q: 'What is free?',
    a: 'Two things: a 15-day free trial of the platform, and a 30-minute demo call tailored to your industry, run on Thridify’s existing live experiences.',
  },
  {
    q: 'How do I keep the cost down?',
    a: 'Start with one hero product, supply good references (photos, dimensions, CAD), build variants as materials on one model rather than separate models, and use the plugin route so no developer time is needed.',
  },
];

export const metadata = pageMetadata({
  title: 'How Much Does a 3D Product Configurator Cost? — Cost Drivers Explained',
  description:
    'What drives the cost of a 3D product configurator and AR experience: catalogue size, model complexity, variants, integrations and managed services — plus how Thridify’s pricing is structured and what is free.',
  keywords: [
    '3D product configurator cost',
    'how much does a 3D configurator cost',
    '3D model cost for ecommerce',
    'Thridify pricing',
    'AR product viewer pricing',
  ],
  path: PATH,
  image: '/og/resource-3d-configurator-cost.png',
});

export default function CostGuide() {
  const articleLd: LdNode = {
    '@type': 'Article',
    '@id': `${siteUrl(PATH)}#article`,
    headline: 'How much does a 3D product configurator cost?',
    description: metadata.description as string,
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
    author: { '@type': 'Organization', name: 'Thridify', url: siteUrl('/') },
    publisher: { '@type': 'Organization', name: 'Thridify', url: siteUrl('/') },
    mainEntityOfPage: siteUrl(PATH),
  };
  const faqLd: LdNode = {
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  return (
    <>
      <JsonLd
        nodes={[
          webPageLd({ path: PATH, name: 'How much does a 3D product configurator cost?', description: metadata.description as string }),
          articleLd,
          faqLd,
          breadcrumbLd(PATH, [
            { name: 'Home', path: '/' },
            { name: 'Resources', path: '/resources' },
            { name: '3D configurator cost', path: PATH },
          ]),
        ]}
      />
      <nav aria-label="Breadcrumb" className="container-x pt-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-foreground/70">
          <li><Link href="/" className="hover:text-primary">Home</Link></li>
          <li aria-hidden>/</li>
          <li><Link href="/resources" className="hover:text-primary">Resources</Link></li>
          <li aria-hidden>/</li>
          <li className="text-foreground/80" aria-current="page">3D configurator cost</li>
        </ol>
      </nav>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 aurora opacity-60 pointer-events-none" aria-hidden />
        <div className="container-x relative section pb-10">
          <Reveal><p className="eyebrow">Cost guide · {PUBLISHED}</p></Reveal>
          <Reveal delay={0.08}>
            <h1 className="tt-display mt-5 max-w-4xl">How much does a 3D product configurator cost?</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 lead max-w-2xl">
              Six things set the number. Here is what they are, how Thridify’s pricing is structured,
              and what is always free — so you arrive at the call knowing what you are buying.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mb-10">
            <p className="eyebrow">What drives the cost</p>
            <h2 className="tt-2">Six drivers, in the order they usually matter.</h2>
          </div>
          <ol className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {DRIVERS.map((d, i) => (
              <li key={d.t} className="card p-6 relative">
                <span className="absolute top-5 right-6 tt-mono text-foreground/30 text-sm">0{i + 1}</span>
                <h3 className="font-heading text-lg font-semibold tracking-tight pr-10">{d.t}</h3>
                <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{d.b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">How Thridify prices</p>
            <h2 className="tt-2">Subscription, setup, and the services you choose.</h2>
          </div>
          <div className="lg:col-span-8 max-w-2xl space-y-5 text-foreground/75 leading-relaxed">
            <p><strong>Platform subscription</strong> — monthly (quarterly and annual plans are available), sized to your catalogue and the experiences you switch on.</p>
            <p><strong>One-time setup</strong> — website integration, creation of your first experiences and hand-over to your team.</p>
            <p><strong>3D Modelling Service</strong> — per-SKU, scoped on your references and complexity; delivered as glTF/GLB/USDZ you own outright.</p>
            <p><strong>Managed services (optional)</strong> — Thridify creates new experiences and makes changes for you instead of your team using the Studio.</p>
            <p><strong>Always free</strong> — the 15-day platform trial and the 30-minute industry demo.</p>
            <p className="text-sm text-foreground/60">Exact figures are confirmed on the scoping call, because the drivers above change them materially from one catalogue to the next.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <p className="eyebrow">FAQ</p>
            <h2 className="tt-2">Cost questions, answered.</h2>
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

      <section className="on-dark relative bg-ink text-paper overflow-hidden">
        <div className="absolute inset-0 opacity-20 aurora pointer-events-none" aria-hidden />
        <div className="container-x section relative text-center">
          <p className="eyebrow eyebrow-center">Get your number</p>
          <h2 className="tt-1 mt-4 max-w-2xl mx-auto">Thirty minutes, your catalogue, an exact figure.</h2>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary">Book a Demo</a>
            <Link href="/resources/roi-of-3d-and-ar-commerce#calculator" className="btn-ghost">Model the ROI first</Link>
          </div>
        </div>
      </section>
    </>
  );
}
