import type { Metadata } from 'next';
import { LegalDocument, LegalSection } from '@/components/LegalDocument';
import { SITE_URL } from '@/lib/schema';

// Phase-4 terms of use — an honest, reviewable baseline reflecting how this
// marketing website is actually used (browse + contact us; interactive 3D/AR
// demos are illustrative, not offers). Governing law: India. Written to be
// reviewed by a lawyer before Phase-7 launch; open items in docs/ASSET-DEBT.md.
// Per-page metadata + canonical; preview noindex inherits from src/middleware.ts.

const CANONICAL = '/terms';
const MAIL = 'contact@thridify.com';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'The terms that govern your use of the Thridify (Aapastech Private Limited) website — acceptance, permitted use, intellectual property, disclaimers, limitation of liability and governing law.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'Terms of Use — Thridify',
    description: 'The terms that govern your use of the Thridify website.',
    url: `${SITE_URL}${CANONICAL}`,
    type: 'website',
    siteName: 'Thridify',
    images: ['/og/default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Use — Thridify',
    images: ['/og/default.png'],
  },
};

function Mail() {
  return (
    <a href={`mailto:${MAIL}`} className="text-primary underline underline-offset-4">
      {MAIL}
    </a>
  );
}

export default function TermsPage() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Terms of Use', item: `${SITE_URL}${CANONICAL}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <LegalDocument eyebrow="Legal" title="Terms of Use" effectiveDate="3 August 2026">
        <LegalSection title="Acceptance of these terms">
          <p>
            This website is operated by <strong>Aapastech Private Limited</strong>, a
            company incorporated in India (&ldquo;Thridify&rdquo;, &ldquo;we&rdquo;,
            &ldquo;us&rdquo;, &ldquo;our&rdquo;). By accessing or using this website you
            agree to these Terms of Use. If you do not agree, please do not use the site.
            These terms may be updated from time to time (see &ldquo;Changes&rdquo; below);
            continued use after an update means you accept the revised terms.
          </p>
        </LegalSection>

        <LegalSection title="What this website is">
          <p>
            This is a marketing website for Thridify, our 3D and augmented-reality commerce
            platform and 3D modelling service. It lets you learn about the platform, view
            interactive 3D and AR demonstrations, and contact us to arrange a demo. Any
            paid Thridify product or service is governed by a separate written agreement,
            not by these terms.
          </p>
        </LegalSection>

        <LegalSection title="Demonstrations are illustrative, not offers">
          <p>
            The interactive 3D and AR demonstrations on this site are provided to show what
            the platform can do. Sample products, finishes, configurations and any prices
            shown are for demonstration only, may use placeholder assets, and are not
            offers, quotations or commitments. Impact figures cited on the site describe
            outcomes reported for our platform and are not a guarantee of results for your
            business.
          </p>
        </LegalSection>

        <LegalSection title="Acceptable use">
          <p>You agree to use this website lawfully and not to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>attempt to disrupt, overload, or interfere with the site or its security;</li>
            <li>access any part of the site, or its data, without authorisation;</li>
            <li>
              scrape, copy or reuse site content except as allowed by these terms or
              applicable law;
            </li>
            <li>
              submit false information, or another person&rsquo;s details without their
              permission;
            </li>
            <li>use the site or contact form to send unlawful, infringing or abusive material.</li>
          </ul>
        </LegalSection>

        <LegalSection title="Intellectual property">
          <p>
            The Thridify name, logo, website content, design, and the 3D and AR experiences
            are owned by Aapastech Private Limited or its licensors and are protected by
            applicable intellectual-property laws. You may not copy, reproduce, distribute
            or create derivative works from them without our written permission.
            Third-party brand names and logos shown as client references remain the
            property of their respective owners and are used for identification only.
          </p>
        </LegalSection>

        <LegalSection title="Third-party links and services">
          <p>
            This site links to third-party services, including our scheduling provider
            (Calendly) for booking demos and our social profiles. We do not control those
            services and are not responsible for their content, availability or privacy
            practices. Your use of them is governed by their own terms.
          </p>
        </LegalSection>

        <LegalSection title="Disclaimers and warranties">
          <p>
            This website is provided on an &ldquo;as is&rdquo; and &ldquo;as
            available&rdquo; basis. We work to keep the information accurate and the site
            available, but, to the fullest extent permitted by law, we make no warranties
            of any kind — express or implied — that the site will be error-free,
            uninterrupted, secure, or fit for a particular purpose. Nothing on this site is
            a binding commitment or professional advice.
          </p>
        </LegalSection>

        <LegalSection title="Limitation of liability">
          <p>
            To the fullest extent permitted by law, Aapastech Private Limited and its
            personnel are not liable for any indirect, incidental, special or consequential
            loss, or loss of profits, data or goodwill, arising from your use of, or
            inability to use, this website. Nothing in these terms limits or excludes any
            liability that cannot be limited or excluded under applicable law.
          </p>
        </LegalSection>

        <LegalSection title="Governing law">
          <p>
            These terms are governed by the laws of India, and the courts of India will
            have jurisdiction over any dispute arising from this website, without prejudice
            to any mandatory consumer or data-protection rights you may have under the laws
            of your country of residence.
          </p>
        </LegalSection>

        <LegalSection title="Changes and contact">
          <p>
            We may update these terms from time to time; the effective date at the top
            shows when they were last revised. For any questions about these terms, email{' '}
            <Mail />.
          </p>
        </LegalSection>
      </LegalDocument>
    </>
  );
}
