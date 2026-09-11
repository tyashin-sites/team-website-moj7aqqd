import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbLd, webPageLd } from '@/lib/knowledge-graph';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/Reveal';

const ITEMS = [
  { href: '/resources/roi-of-3d-and-ar-commerce', kicker: 'ROI guide', t: 'The ROI of 3D and AR: returns, conversion, content cost', b: 'Public returns data, Shopify case studies, Thridify’s six published outcomes and a calculator that runs on your numbers.' },
  { href: '/resources/3d-configurator-cost', kicker: 'Cost guide', t: 'How much does a 3D product configurator cost?', b: 'The six drivers, how Thridify prices, and what is always free.' },
  { href: '/faq', kicker: 'FAQ', t: 'Every question, answered straight', b: 'Fifty-plus answers on the platform, modelling, AR and devices, integrations, plans and the company.' },
  { href: '/glossary', kicker: 'Glossary', t: 'The vocabulary of 3D and AR commerce', b: 'Quotable definitions of configurators, WebAR, glTF, USDZ, Draco, KTX2, PBR and more.' },
  { href: '/device-compatibility', kicker: 'Reference', t: 'Device compatibility for 3D and AR', b: 'Which phones, tablets and computers get which experience — automatically.' },
  { href: '/blog', kicker: 'Blog', t: 'Insights on 3D and AR commerce', b: 'Guides, case notes and updates from the Thridify team.' },
];

export const metadata = pageMetadata({
  title: 'Resources — Guides, Data and References for 3D & AR Commerce',
  description: 'ROI and cost guides, the FAQ hub, the glossary and device references — everything a team needs to evaluate 3D product viewers, configurators and app-free AR.',
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
          <Reveal delay={0.16}><p className="mt-6 lead max-w-2xl">Everything a team needs to evaluate 3D and AR commerce before a call — sourced, plain and quotable.</p></Reveal>
        </div>
      </section>
      <section className="section pt-0">
        <div className="container-x grid md:grid-cols-2 gap-5">
          {ITEMS.map((it, i) => (
            <Reveal key={it.href} delay={i * 0.05}>
              <Link href={it.href} className="group card p-7 h-full flex flex-col">
                <p className="eyebrow">{it.kicker}</p>
                <h2 className="mt-3 font-heading text-xl font-semibold tracking-tight">{it.t}</h2>
                <p className="mt-3 text-foreground/70 leading-relaxed">{it.b}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">Open <ArrowRight className="w-4 h-4" aria-hidden /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
