import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { pageMetadata, siteUrl } from '@/lib/seo';
import { breadcrumbLd, webPageLd, type LdNode } from '@/lib/knowledge-graph';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/Reveal';
import { CANONICAL_METRICS } from '@/lib/industries';

/**
 * /3d-product-visualization — owns the VISUALIZATION cluster, which Search
 * Console shows is bigger than the configurator cluster for this site and is
 * almost entirely furniture-modified: "3d visualization furniture",
 * "3d visualization for furniture", "furniture visualization",
 * "3d furniture visualization", "photorealistic 3d furniture".
 *
 * Kept distinct from `/services/3d-modelling` on purpose. That page sells the
 * production of assets (per-SKU, glTF/GLB/USDZ, files you own). This page is
 * about what the assets DO once they exist — interactive on the storefront and
 * photoreal in the campaign. They cross-link rather than compete.
 */

const PATH = '/3d-product-visualization';
const CALENDLY = 'https://calendly.com/hello-thridify/30min';
const UPDATED = '2026-09-19';

const OUTPUTS = [
  {
    t: 'Interactive on the product page',
    b: 'The model itself, orbitable in the gallery, with AR on the same tap. This is the output photography cannot produce at any budget.',
  },
  {
    t: 'Photoreal stills, every angle',
    b: 'Catalogue shots, hero images, marketplace-compliant white-background frames — rendered from the model rather than re-shot, so a new colourway is a render queue rather than a studio booking.',
  },
  {
    t: 'Lifestyle scenes',
    b: 'The piece placed in a room set, lit to match the campaign. No prop hire, no set build, and the room can change while the product stays identical.',
  },
  {
    t: 'Turntable and detail video',
    b: 'Short loops for the PDP, for paid social, and for the screens on an exhibition stand — generated from the same asset.',
  },
  {
    t: 'Every variant, without a reshoot',
    b: 'Where photography prices each colourway as a separate shoot, a model prices the first one and renders the rest. This is where the economics of a large catalogue actually change.',
  },
  {
    t: 'Assets you own',
    b: 'Delivered as glTF/GLB and USDZ. If you stop working with us, the files go with you.',
  },
];

const REALISM = [
  {
    t: 'Physically based materials (PBR)',
    b: 'Oak, brushed steel and matte lacquer are described by base colour, roughness, metalness and normal detail rather than painted on. That is why a model holds up under a different light instead of looking like a toy.',
  },
  {
    t: 'Real dimensions, real proportions',
    b: 'Built to the spec sheet. Proportion errors are the tell that makes an otherwise good render read as fake — and they break AR completely, because AR places at true scale.',
  },
  {
    t: 'Image-based lighting',
    b: 'Lit by an environment map rather than point lights, so reflections carry a plausible room in them. This is most of the perceived realism on glossy and metallic goods.',
  },
  {
    t: 'Detail where the eye goes',
    b: 'Stitching, edge wear, seam lines and fabric weave at the density a shopper actually inspects — and simplified geometry everywhere they do not, which is what keeps the file shippable.',
  },
];

const FAQS = [
  {
    q: 'What is 3D product visualization?',
    a: 'Building an accurate 3D model of a product and using it to produce everything you would previously have photographed — interactive viewers, AR, catalogue stills, lifestyle scenes and video. The model is made once; every image and every variant after that is a render rather than a shoot.',
  },
  {
    q: 'Is 3D furniture visualization cheaper than photography?',
    a: 'It depends on variant count more than anything else. A single fixed product photographed once is usually cheaper to photograph. A sofa in eight fabrics and three sizes is not, because photography prices each combination separately while a model renders them from one asset. The crossover usually arrives sooner than teams expect.',
  },
  {
    q: 'How do you make 3D furniture look photorealistic?',
    a: 'Physically based materials rather than painted-on textures, real measured dimensions, image-based lighting from an environment map so reflections carry a believable room, and geometric detail concentrated where a buyer inspects — stitching, edge profiles, seam lines. The failure mode is almost never the renderer; it is proportion and material response.',
  },
  {
    q: 'Can you work from our existing CAD files?',
    a: 'Yes, and it is usually the fastest route — furniture, doors, windows and machinery are generally designed in 3D before they are manufactured, so the geometry already exists. CAD models are optimised for manufacture rather than for the web, so they are retopologised and compressed before they are served.',
  },
  {
    q: 'What do we need to supply?',
    a: 'Photographs from several angles, dimensions or drawings, material and finish references, and any CAD you have. The better the references, the less back-and-forth on approval.',
  },
  {
    q: 'How is this different from your 3D modelling service?',
    a: 'The modelling service is the production step — building and delivering the assets per SKU. This page is about what the assets are used for afterwards. Most customers need both, and they are scoped together on the same call.',
  },
];

export const metadata = pageMetadata({
  title: '3D Product Visualization & Photoreal Furniture Rendering',
  description:
    'Model a product once and get everything you used to photograph: an interactive 3D viewer, app-free AR, photoreal stills, lifestyle scenes and video — every finish and size, without a reshoot.',
  keywords: [
    '3D product visualization',
    'furniture visualization',
    '3D furniture visualization',
    '3D visualization for furniture',
    'photorealistic 3D furniture',
    'product rendering services',
    '3D rendering for ecommerce',
    'CGI product photography alternative',
  ],
  path: PATH,
  image: '/og/default.png',
});

export default function VisualizationPage() {
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
    name: '3D Product Visualization',
    serviceType: '3D product visualization and photoreal rendering',
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
            name: '3D Product Visualization',
            description: metadata.description as string,
          }),
          serviceLd,
          faqLd,
          breadcrumbLd(PATH, [
            { name: 'Home', path: '/' },
            { name: '3D product visualization', path: PATH },
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
            3D product visualization
          </li>
        </ol>
      </nav>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 aurora opacity-60 pointer-events-none" aria-hidden />
        <div className="container-x relative section pb-10">
          <Reveal>
            <p className="eyebrow">3D product visualization</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="tt-display mt-5 max-w-4xl">
              Model it once. Never book the same shoot twice.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 lead max-w-2xl">
              Photoreal 3D product visualization for furniture, kitchens, doors, surfaces and
              machinery — an interactive viewer and AR on the storefront, and every still, scene and
              clip your marketing team needs, rendered from the same asset.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Book a 30-minute demo
              </a>
              <Link href="/services/3d-modelling" className="btn-ghost">
                The modelling service
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x">
          <div className="max-w-3xl mb-10">
            <p className="eyebrow">The shape of the problem</p>
            <h2 className="tt-2">Photography prices your catalogue by the combination.</h2>
          </div>
          <div className="max-w-3xl space-y-5 text-foreground/75 leading-relaxed">
            <p>
              A furniture brand with sixty products in six finishes does not have sixty photography
              jobs. It has three hundred and sixty, and it will discover this the first time
              merchandising asks why the walnut version is missing from the site.
            </p>
            <p>
              What usually happens next is that the hero finish gets photographed and the rest get a
              swatch. The buyer is then asked to imagine the piece they are actually considering,
              which is the same gap that produces hesitation on the page and returns after delivery.
            </p>
            <p>
              A model inverts the cost curve. The expensive part is building it accurately once;
              after that a new finish is a render, a new room set is a render, and the product page
              gets something photography cannot produce at all — a model the customer can turn over
              and stand in their own room.
            </p>
          </div>
          <div className="mt-10 grid sm:grid-cols-3 gap-5 max-w-3xl">
            {(['photography', 'conversion', 'inventory'] as const).map((k) => (
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
            <p className="eyebrow">What comes out of one model</p>
            <h2 className="tt-2">Six outputs, one asset.</h2>
          </div>
          <ol className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {OUTPUTS.map((d, i) => (
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
            <p className="eyebrow">What makes it photoreal</p>
            <h2 className="tt-2">Four things, and none of them is the renderer.</h2>
            <p className="mt-4 text-sm text-foreground/60">
              When a 3D product reads as fake, it is almost always one of these — not the software
              that drew it.
            </p>
          </div>
          <div className="lg:col-span-8 divide-y divide-foreground/10 border-t border-foreground/10">
            {REALISM.map((c) => (
              <div key={c.t} className="py-5">
                <h3 className="font-heading text-lg font-semibold tracking-tight">{c.t}</h3>
                <p className="mt-2 text-foreground/70 leading-relaxed max-w-2xl">{c.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-x grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <p className="eyebrow">FAQ</p>
            <h2 className="tt-2">3D visualization, answered.</h2>
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

      <section className="section">
        <div className="container-x">
          <p className="eyebrow">Keep reading</p>
          <h2 className="tt-2 mb-8">Related</h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { href: '/services/3d-modelling', t: '3D modelling service', b: 'How the assets get built.' },
              { href: '/industries/furniture', t: 'Furniture', b: 'The category this cluster is really about.' },
              { href: '/360-product-viewer', t: '360° product viewer', b: 'The interactive output.' },
              { href: '/3d-product-configurator', t: '3D product configurator', b: 'When the product has options.' },
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
          <p className="eyebrow eyebrow-center">Bring one product</p>
          <h2 className="tt-1 mt-4 max-w-2xl mx-auto">
            Thirty minutes, and we will walk through what your catalogue would cost to model.
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Book a Demo
            </a>
            <Link href="/resources/3d-configurator-cost" className="btn-ghost">
              Cost drivers
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
