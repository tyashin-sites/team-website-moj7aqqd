import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { pageMetadata, siteUrl } from '@/lib/seo';
import { breadcrumbLd, webPageLd, ORG_ID, type LdNode } from '@/lib/knowledge-graph';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/Reveal';
import { HeroArt } from '@/components/HeroArt';
import { CapabilityDemo } from '@/components/signature/CapabilityDemo';
import { EXP } from '@/lib/thridify';
import { calendlyHref } from '@/lib/calendly';
import {
  SHOPIFY_APP_URL,
  SHOPIFY_APP_NAME,
  SHOPIFY_APP_INTRO,
  SHOPIFY_APP_SUMMARY,
  SHOPIFY_PAGE_PATH,
  SHOPIFY_FEATURES,
  SHOPIFY_SETUP,
  SHOPIFY_INDUSTRIES,
  SHOPIFY_FAQS,
} from '@/lib/shopify-app';

/**
 * /integrations/shopify — the canonical thridify.com page for the Thridify
 * Shopify app (apps.shopify.com/thridify-3d-ar-configurator).
 *
 * Why here and not a new route: this URL already ranks for the old WordPress
 * /shopify demand (301 in next.config.ts), is in the sitemap, and is what the
 * FAQ, glossary and integrations hub link to. A second "Shopify app" URL would
 * split those signals. A static segment wins over /integrations/[slug], and
 * [slug] skips "shopify" in generateStaticParams so the two never collide.
 *
 * Intent split with the solution pages: /3d-product-configurator, /ar-viewer
 * and /360-product-viewer answer "what is it" for every platform; this page
 * answers "how do I get it on Shopify" and sends the merchant to the App Store.
 *
 * Content rules: capabilities match the live App Store listing only (see
 * src/lib/shopify-app.ts), no Thridify prices, canonical metrics not used.
 */

const PATH = SHOPIFY_PAGE_PATH;
const CALENDLY = calendlyHref('integrations-shopify');
const UPDATED = '2026-11-03';
const BLOG_HOWTO = '/blog/how-to-add-3d-and-ar-to-a-shopify-product-page';

const TITLE = 'Shopify 3D Product Configurator & AR App';
const DESCRIPTION =
  'Add a 3D product viewer, live 3D configurator and AR view in your room to Shopify product pages. No theme code edits. Free plan on the Shopify App Store.';

export const metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'Shopify 3D product configurator',
    'Shopify 3D product viewer',
    'Shopify AR app',
    'view in your room Shopify',
    '3D AR Shopify app',
    'Shopify furniture visualizer',
    'Shopify kitchen visualizer',
    'add 3D to Shopify',
  ],
  path: PATH,
  image: '/og/integration-shopify.png',
  ogTitle: 'Thridify for Shopify: 3D configurator and AR view in your room',
  ogDescription: SHOPIFY_APP_INTRO,
});

export default function ShopifyAppPage() {
  const url = siteUrl(PATH);

  const appLd: LdNode = {
    '@type': 'SoftwareApplication',
    '@id': `${url}#app`,
    name: SHOPIFY_APP_NAME,
    alternateName: 'Thridify for Shopify',
    description: SHOPIFY_APP_SUMMARY,
    abstract: SHOPIFY_APP_INTRO,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: '3D/AR/VR',
    operatingSystem: 'Shopify',
    url,
    installUrl: SHOPIFY_APP_URL,
    sameAs: [SHOPIFY_APP_URL],
    featureList: SHOPIFY_FEATURES.map((f) => f.title),
    isAccessibleForFree: true,
    inLanguage: 'en',
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: { '@id': `${url}#webpage` },
  };
  const howToLd: LdNode = {
    '@type': 'HowTo',
    '@id': `${url}#setup`,
    name: 'How to add a 3D product configurator and AR to a Shopify store',
    description:
      'Install Thridify from the Shopify App Store, connect an account, turn on the app embed and publish your 3D products.',
    tool: [{ '@type': 'HowToTool', name: SHOPIFY_APP_NAME }],
    step: SHOPIFY_SETUP.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
      url: `${url}#setup`,
    })),
  };
  const faqLd: LdNode = {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: SHOPIFY_FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <JsonLd
        nodes={[
          {
            ...webPageLd({ path: PATH, name: TITLE, description: DESCRIPTION }),
            mainEntity: { '@id': `${url}#app` },
            dateModified: UPDATED,
          },
          appLd,
          howToLd,
          faqLd,
          breadcrumbLd(PATH, [
            { name: 'Home', path: '/' },
            { name: 'Integrations', path: '/integrations' },
            { name: 'Shopify', path: PATH },
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
          <li>
            <Link href="/integrations" className="hover:text-primary">
              Integrations
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-foreground/80" aria-current="page">
            Shopify
          </li>
        </ol>
      </nav>

      {/* HERO — the App Store is the primary action; the demo is secondary. */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 aurora opacity-60 pointer-events-none" aria-hidden />
        <div className="container-x relative section pt-12 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Reveal>
              <p className="eyebrow">Shopify app</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="tt-1 mt-5">3D product configurator and AR for Shopify</h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 lead max-w-xl">
                Shoppers spin the product, change its finish and place it in their room with AR,
                right on your Shopify product page. You switch it on in the theme editor and never
                touch theme code.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href={SHOPIFY_APP_URL}
                  target="_blank"
                  rel="noopener"
                  className="btn btn-primary"
                >
                  Get it on the Shopify App Store
                  <ArrowUpRight className="w-4 h-4" aria-hidden />
                </a>
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  Book a demo
                </a>
              </div>
              <p className="mt-4 text-sm text-foreground/60">
                Free plan available on the Shopify App Store.
              </p>
            </Reveal>
          </div>
          <div className="relative">
            <HeroArt />
            <CapabilityDemo
              mode="configurator"
              aspect="aspect-[4/3]"
              modelLabel="Shopify product"
              priority
              experiencePreviewId={EXP.modernSofa}
            />
          </div>
        </div>
      </section>

      {/* SHORT ANSWER — the paragraph an answer engine should quote. */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="card p-7 md:p-9 max-w-4xl">
            <p className="eyebrow">In short</p>
            <p className="mt-3 text-lg leading-relaxed text-foreground/85">
              {SHOPIFY_APP_SUMMARY} It suits stores selling furniture, kitchens, doors and windows,
              bathroom fittings, tiles or lighting. Install it from the{' '}
              <a
                href={SHOPIFY_APP_URL}
                target="_blank"
                rel="noopener"
                className="font-semibold text-primary hover:underline"
              >
                Shopify App Store listing
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* WHAT THE APP DOES — matches the listing, nothing more. */}
      <section id="features" className="section pt-0 scroll-mt-20">
        <div className="container-x">
          <div className="max-w-3xl mb-10">
            <p className="eyebrow">What it does on Shopify</p>
            <h2 className="tt-2">Everything the app adds to your store</h2>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SHOPIFY_FEATURES.map((f) => (
              <li key={f.title} className="card p-7 h-full">
                <Check className="w-5 h-5 text-primary" strokeWidth={2} aria-hidden />
                <h3 className="font-heading text-lg font-semibold tracking-tight mt-4 mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{f.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SETUP — mirrors the HowTo node. */}
      <section id="setup" className="section pt-0 scroll-mt-20">
        <div className="container-x">
          <div className="max-w-3xl mb-10">
            <p className="eyebrow">Setup</p>
            <h2 className="tt-2">How to add 3D and AR to your Shopify store</h2>
            <p className="mt-4 lead">
              Most stores are live on their first product within an afternoon. The slow part, if
              there is one, is getting the 3D models made.
            </p>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {SHOPIFY_SETUP.map((s, idx) => (
              <li key={s.name} className="card p-6 h-full">
                <span className="font-mono tabular-nums text-sm text-primary">{`0${idx + 1}`}</span>
                <h3 className="font-heading text-base font-semibold tracking-tight mt-3 mb-2">
                  {s.name}
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-foreground/70">
            Need models first? The{' '}
            <Link href="/services/3d-modelling" className="font-semibold text-primary hover:underline">
              3D modelling service
            </Link>{' '}
            builds them from your photos and dimensions. For a longer walkthrough of where 3D sits
            in a Shopify gallery, read{' '}
            <Link href={BLOG_HOWTO} className="font-semibold text-primary hover:underline">
              how to add 3D and AR to a Shopify product page
            </Link>
            .
          </p>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section id="industries" className="section bg-surface/50 border-y border-foreground/5 scroll-mt-20">
        <div className="container-x">
          <div className="max-w-3xl mb-10">
            <p className="eyebrow">Who it’s for</p>
            <h2 className="tt-2">Shopify stores where buyers need to see the product first</h2>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SHOPIFY_INDUSTRIES.map((i) => (
              <li key={i.name}>
                <Link
                  href={i.href}
                  className="card p-6 block h-full hover:border-primary/40 transition-colors"
                >
                  <h3 className="font-heading text-base font-semibold tracking-tight">{i.name}</h3>
                  <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{i.body}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SCOPE — what lives on thridify.com but not in the Shopify app yet.
          Stated plainly so neither people nor LLMs over-claim the app. */}
      <section className="section">
        <div className="container-x">
          <div className="max-w-3xl">
            <p className="eyebrow">Good to know</p>
            <h2 className="tt-2">What the Shopify app doesn’t do yet</h2>
            <p className="mt-4 text-foreground/75 leading-relaxed">
              The app shows one product at a time. Shoppable rooms with several products in one
              scene, like{' '}
              <Link href="/shop-the-look" className="font-semibold text-primary hover:underline">
                Shop the Look
              </Link>{' '}
              and the{' '}
              <Link href="/room-visualizer" className="font-semibold text-primary hover:underline">
                3D room visualizer
              </Link>
              , run on Thridify’s own platform today and aren’t part of the Shopify app. If you
              need them on a Shopify store, talk to us and we’ll tell you what’s possible now.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ — FAQPage node above. */}
      <section id="faq" className="section pt-0 scroll-mt-20">
        <div className="container-x grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <p className="eyebrow">FAQ</p>
            <h2 className="tt-2">Thridify on Shopify, answered</h2>
            <p className="mt-4 text-sm text-foreground/60">Last reviewed {UPDATED}.</p>
          </div>
          <div className="lg:col-span-8 divide-y divide-foreground/10 border-t border-foreground/10">
            {SHOPIFY_FAQS.map((f) => (
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
              { href: '/3d-product-configurator', t: '3D product configurator', b: 'How a configurator works on any storefront.' },
              { href: '/ar-viewer', t: 'AR viewer', b: 'View in your room, on iPhone and Android.' },
              { href: '/360-product-viewer', t: '360° product viewer', b: 'Spin and zoom instead of a flat gallery.' },
              { href: '/integrations', t: 'Other platforms', b: 'WooCommerce, WordPress, Wix and the rest.' },
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
          <p className="eyebrow eyebrow-center">Thridify for Shopify</p>
          <h2 className="tt-1 mt-4 max-w-2xl mx-auto text-paper">
            Put your first product in 3D and AR today.
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={SHOPIFY_APP_URL}
              target="_blank"
              rel="noopener"
              className="btn btn-primary px-8 py-4 text-base"
            >
              Get it on the Shopify App Store
            </a>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost px-8 py-4 text-base"
            >
              Book a demo
            </a>
          </div>
          <p className="mt-4 text-sm text-paper/70">Free plan available on the Shopify App Store.</p>
        </div>
      </section>
    </>
  );
}
