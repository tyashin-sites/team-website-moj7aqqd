import type { Metadata } from 'next';
import { LegalDocument, LegalSection } from '@/components/LegalDocument';

// Phase-2 baseline terms of use — honest, reflecting how this marketing
// website is actually used today. Phase 4 (BUILD-PLAN) expands this into full
// terms once product/commercial inputs are confirmed.
// Per-page metadata; noindex on the workers.dev preview inherits from
// src/middleware.ts (host-conditional).

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'The terms that govern your use of the Thridify (Aapastech Private Limited) website.',
  openGraph: {
    title: 'Terms of Use — Thridify',
    description: 'The terms that govern your use of the Thridify website.',
    images: ['/og/default.png'],
  },
};

export default function TermsPage() {
  return (
    <LegalDocument eyebrow="Legal" title="Terms of Use" effectiveDate="24 July 2026">
      <LegalSection title="About these terms">
        <p>
          This website is operated by <strong>Aapastech Private Limited</strong>{' '}
          (&ldquo;Thridify&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). By accessing or
          using this website you agree to these terms. If you do not agree, please do
          not use the site.
        </p>
      </LegalSection>

      <LegalSection title="Use of the site">
        <p>
          You may browse this website and contact us about our platform. You agree not
          to misuse the site — for example, by attempting to disrupt it, access it
          without authorisation, or use it for any unlawful purpose. The interactive
          3D and AR demonstrations on this site are provided to illustrate the
          platform; sample products, prices, and configurations shown are for
          demonstration only and are not offers.
        </p>
      </LegalSection>

      <LegalSection title="Intellectual property">
        <p>
          The Thridify name, logo, website content, and design are owned by Aapastech
          Private Limited or its licensors and are protected by applicable
          intellectual-property laws. You may not copy, reproduce, or reuse them
          without our written permission. Third-party brand logos shown as client
          references remain the property of their respective owners.
        </p>
      </LegalSection>

      <LegalSection title="No warranty">
        <p>
          This website is provided on an &ldquo;as is&rdquo; and &ldquo;as
          available&rdquo; basis. We work to keep the information accurate and the site
          available, but we do not guarantee that it will be error-free or
          uninterrupted, and nothing on this site is a binding commitment or
          professional advice.
        </p>
      </LegalSection>

      <LegalSection title="Limitation of liability">
        <p>
          To the fullest extent permitted by law, Aapastech Private Limited is not
          liable for any indirect or consequential loss arising from your use of this
          website. Nothing in these terms limits any liability that cannot be limited
          under applicable law.
        </p>
      </LegalSection>

      <LegalSection title="Changes and contact">
        <p>
          We may update these terms from time to time; the effective date above shows
          when they were last revised. For any questions about these terms, email{' '}
          <a href="mailto:contact@thridify.com" className="text-primary underline underline-offset-4">
            contact@thridify.com
          </a>
          .
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
