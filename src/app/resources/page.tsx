import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbLd, webPageLd } from '@/lib/knowledge-graph';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/Reveal';
import { INTEGRATIONS } from '@/lib/integrations';
import { INDUSTRIES } from '@/lib/industries';

const ITEMS = [
  { href: '/resources/roi-of-3d-and-ar-commerce', kicker: 'ROI guide', t: 'The ROI of 3D and AR: returns, conversion, content cost', b: 'Public returns data, Shopify case studies and a calculator that runs on your numbers.' },
  { href: '/resources/3d-configurator-cost', kicker: 'Cost guide', t: 'How much does a 3D product configurator cost?', b: 'The six things that set the cost of a 3D and AR project, and what is always free.' },
  { href: '/faq', kicker: 'FAQ', t: 'Every question, answered straight', b: 'Fifty-plus answers on the platform, modelling, AR and devices, integrations and the company.' },
  { href: '/glossary', kicker: 'Glossary', t: 'The vocabulary of 3D and AR commerce', b: 'Plain definitions of configurators, WebAR, glTF, USDZ, Draco, KTX2, PBR and more.' },
  { href: '/device-compatibility', kicker: 'Reference', t: 'Device compatibility for 3D and AR', b: 'Which phones, tablets and computers get which experience, chosen automatically.' },
  { href: '/3d-ar-platform-guide', kicker: 'Reference', t: '3D & AR, platform by platform', b: 'What travels into AR on iPhone and Android, how materials and light behave, and how placement works, with sources.' },
  { href: '/blog', kicker: 'Blog', t: 'Insights on 3D and AR commerce', b: 'Guides, case notes and updates from the Thridify team.' },
];

/** Where to start, by the question the reader is actually asking. */
const PATHS = [
  {
    q: 'Is 3D worth it for our products?',
    a: 'Start with the ROI guide, which separates published industry data from Thridify’s own outcomes, then read the page for your industry. Products that vary by size, finish or material gain the most, because photographing every combination is impossible.',
    links: [
      { label: 'ROI of 3D and AR', href: '/resources/roi-of-3d-and-ar-commerce' },
      { label: 'Industries', href: '/industries' },
    ],
  },
  {
    q: 'How would it work on our website?',
    a: 'Find your platform below. Shopify and WooCommerce have Thridify plugins; most other platforms use a short embed, and custom storefronts use the SDK. Each integration page shows where the code goes and what that platform tends to get in the way of.',
    links: [
      { label: 'All integrations', href: '/integrations' },
      { label: 'Custom integration', href: '/integrations/custom-integration' },
    ],
  },
  {
    q: 'What do we need to have ready?',
    a: 'Less than most teams expect. Existing CAD or 3D files help but are not required. The glossary explains the file formats (glTF for the web and Android, USDZ for iPhone) and why texture sizes matter more than file sizes on phones.',
    links: [
      { label: '3D modelling service', href: '/services/3d-modelling' },
      { label: 'glTF / GLB', href: '/glossary/gltf-glb' },
      { label: 'USDZ', href: '/glossary/usdz' },
    ],
  },
  {
    q: 'Will it work for all of our shoppers?',
    a: 'AR runs on iPhones and on Android phones with Google Play Services for AR, and the 3D viewer runs in any modern browser. Low-memory phones get a lighter version automatically. The device reference lists what each tier gets.',
    links: [
      { label: 'Device compatibility', href: '/device-compatibility' },
      { label: 'Lite mode', href: '/glossary/lite-mode' },
      { label: 'WebAR', href: '/glossary/webar' },
    ],
  },
];

/** What to gather before a demo call so it covers your catalogue, not a generic one. */
const CHECKLIST = [
  'Roughly how many products you sell, and how many of them you would put in 3D first.',
  'Which options actually change how the product looks: fabric, finish, size, modules, hardware.',
  'What you already have: CAD drawings, 3D files from a manufacturer, or only photographs.',
  'Your e-commerce platform, or whether the site is custom-built.',
  'Where 3D should appear: product pages, a showroom tablet, an exhibition stand, a quote tool for your sales team.',
];

export const metadata = pageMetadata({
  title: 'Resources — Guides, Data and References for 3D & AR Commerce',
  description: 'ROI and cost guides, per-platform install guides, the glossary and device references: what a team needs to evaluate 3D product viewers, configurators and app-free AR.',
  path: '/resources',
  image: '/og/resources.png',
});

export default function ResourcesIndex() {
  return (
    <>
      <JsonLd nodes={[webPageLd({ path: '/resources', name: 'Resources', description: metadata.description as string }), breadcrumbLd('/resources', [{ name: 'Home', path: '/' }, { name: 'Resources', path: '/resources' }])]} />
      <nav aria-label="Breadcrumb" className="container-x pt-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-foreground/70">
          <li><Link href="/" className="hover:text-primary">Home</Link></li>
          <li aria-hidden>/</li>
          <li className="text-foreground/80" aria-current="page">Resources</li>
        </ol>
      </nav>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 aurora opacity-60 pointer-events-none" aria-hidden />
        <div className="container-x relative section pb-10">
          <Reveal><p className="eyebrow">Resources</p></Reveal>
          <Reveal delay={0.08}><h1 className="tt-display mt-5 max-w-3xl">The numbers, the words and the answers.</h1></Reveal>
          <Reveal delay={0.16}><p className="mt-6 lead max-w-2xl">Everything a team needs to evaluate 3D and AR commerce before a call: sourced, plain and quotable.</p></Reveal>
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="start-here">
        <div className="container-x">
          <h2 id="start-here" className="tt-2 max-w-3xl">Where to start</h2>
          <p className="mt-4 lead max-w-2xl">Most teams arrive with one of four questions. Each has a short answer and a page that goes further.</p>
          <div className="mt-10 grid md:grid-cols-2 gap-5">
            {PATHS.map((p) => (
              <div key={p.q} className="card p-7 h-full flex flex-col">
                <h3 className="font-heading text-xl font-semibold tracking-tight">{p.q}</h3>
                <p className="mt-3 text-foreground/75 leading-relaxed">{p.a}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.links.map((l) => (
                    <Link key={l.href} href={l.href} className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 px-3 py-1 text-sm font-semibold text-primary hover:bg-primary/10 transition-colors">
                      {l.label} <ArrowRight className="w-3.5 h-3.5" aria-hidden />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="library">
        <div className="container-x">
          <h2 id="library" className="tt-2 max-w-3xl">Guides and references</h2>
          <div className="mt-10 grid md:grid-cols-2 gap-5">
            {ITEMS.map((it, i) => (
              <Reveal key={it.href} delay={i * 0.05}>
                <Link href={it.href} className="group card p-7 h-full flex flex-col">
                  <p className="eyebrow">{it.kicker}</p>
                  <h3 className="mt-3 font-heading text-xl font-semibold tracking-tight">{it.t}</h3>
                  <p className="mt-3 text-foreground/70 leading-relaxed">{it.b}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">Open <ArrowRight className="w-4 h-4" aria-hidden /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="tt-2">Install guides by platform</h2>
            <p className="mt-4 text-foreground/75 leading-relaxed">Where the code goes on each platform, and the platform settings that most often stop it from showing.</p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-3">
              {INTEGRATIONS.map((it) => (
                <li key={it.slug}>
                  <Link href={`/integrations/${it.slug}`} className="font-semibold hover:text-primary transition-colors">{it.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="tt-2">3D and AR by industry</h2>
            <p className="mt-4 text-foreground/75 leading-relaxed">What changes for each kind of catalogue: which options to configure, and where AR helps most.</p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-3">
              {INDUSTRIES.map((ind) => (
                <li key={ind.slug}>
                  <Link href={`/industries/${ind.slug}`} className="font-semibold hover:text-primary transition-colors">{ind.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="checklist">
        <div className="container-x max-w-3xl">
          <h2 id="checklist" className="tt-2">Before a demo call</h2>
          <p className="mt-4 text-foreground/75 leading-relaxed">A demo is more useful when it is about your catalogue. None of this is required, but having rough answers to these means the call covers your products rather than a generic walkthrough.</p>
          <ol className="mt-6 space-y-3 list-decimal pl-5 marker:text-primary marker:font-semibold">
            {CHECKLIST.map((c) => (
              <li key={c} className="text-foreground/80 leading-relaxed pl-1">{c}</li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
