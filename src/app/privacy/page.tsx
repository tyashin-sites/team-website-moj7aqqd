import type { Metadata } from 'next';
import { LegalDocument, LegalSection } from '@/components/LegalDocument';

// Phase-2 baseline privacy policy — honest, reflecting ONLY what the site
// actually does today. Phase 4 (BUILD-PLAN) expands this to a full
// GDPR/PIPEDA-aware policy once compliance inputs are confirmed.
// Per-page metadata; noindex on the workers.dev preview inherits from
// src/middleware.ts (host-conditional).

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Thridify (Aapastech Private Limited) collects, uses, and protects the information you share through this website.',
  openGraph: {
    title: 'Privacy Policy — Thridify',
    description:
      'What Thridify collects through this website, why, how long we keep it, and your rights.',
    images: ['/og/default.png'],
  },
};

export default function PrivacyPage() {
  return (
    <LegalDocument eyebrow="Legal" title="Privacy Policy" effectiveDate="24 July 2026">
      <LegalSection title="Who we are">
        <p>
          This website is operated by <strong>Aapastech Private Limited</strong> (&ldquo;Thridify&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo;), the company behind the Thridify 3D and AR commerce
          platform. This policy explains what information we collect through this
          website and how we handle it. Questions? Email{' '}
          <a href="mailto:contact@thridify.com" className="text-primary underline underline-offset-4">
            contact@thridify.com
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="What we collect">
        <p>
          We only collect the information you choose to give us. When you submit the
          contact form on this site, we collect:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Your name</li>
          <li>Your email address</li>
          <li>Your company name</li>
          <li>The product category you sell</li>
          <li>Any message you write to us</li>
        </ul>
        <p>
          We do not run third-party advertising trackers on this website, and we do
          not buy or sell personal information.
        </p>
      </LegalSection>

      <LegalSection title="Why we use it">
        <p>
          We use the details you submit for a single purpose: to respond to your
          enquiry, prepare a relevant demonstration of the Thridify platform, and
          follow up about your interest. Form submissions are forwarded to our
          internal team through the Tyashin platform operated by Aapastech Private
          Limited. We do not use your submission for automated decision-making or
          profiling.
        </p>
      </LegalSection>

      <LegalSection title="How long we keep it">
        <p>
          We retain enquiry details for as long as needed to handle your request and
          our ongoing business relationship, after which they are deleted or
          anonymised. You can ask us to delete your details sooner at any time.
        </p>
      </LegalSection>

      <LegalSection title="Your rights">
        <p>
          You can ask us to access, correct, or delete the personal information you
          have given us, or to stop contacting you. To exercise any of these rights,
          email{' '}
          <a href="mailto:contact@thridify.com" className="text-primary underline underline-offset-4">
            contact@thridify.com
          </a>{' '}
          and we will respond within a reasonable time. Depending on where you live
          (for example, the EU/EEA or Canada), you may have additional statutory
          rights; the expanded policy will detail these.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Aapastech Private Limited
          <br />
          Email:{' '}
          <a href="mailto:contact@thridify.com" className="text-primary underline underline-offset-4">
            contact@thridify.com
          </a>
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
