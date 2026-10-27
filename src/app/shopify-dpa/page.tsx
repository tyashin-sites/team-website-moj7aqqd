import { LegalDocument, LegalSection } from '@/components/LegalDocument';
import { SITE_URL } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { RegionalEntityBlock } from '@/components/LegalEntity';
import {
  CANADA_ENTITY,
  ESTONIA_ENTITY,
  INDIA_ENTITY,
  LEGAL_EMAIL,
  LEGAL_UPDATE_DATE,
  OFFICER,
} from '@/content/legal/group';

// Data Processing Addendum for merchants using the Thridify app for Shopify.
// Linked from /app-privacy. Draft for the owner's review: publish only
// after approval. Sections 9-10: recommend counsel review.
// 26 October 2026: entity statement is regional (publish kit K1); officer,
// legal mailbox and the affiliate sub-processor per COUNSEL-DETERMINATIONS.md
// section 1 and A1. Shopify-specific terms unchanged. Non-Shopify channels: /dpa.
// 27 October 2026: three-entity model (kit v2.0 K1); Aapastech OÜ is the
// processor for EU/UK merchants (Art. 28 contract, Estonian law); transfer
// lines per COUNSEL-DETERMINATIONS v2.0 E2. Liability and non-EU law unchanged.

const CANONICAL = '/shopify-dpa';
const MAIL = LEGAL_EMAIL;

export const metadata = pageMetadata({
  title: 'Thridify for Shopify: Data Processing Addendum',
  description:
    'The Data Processing Addendum between Thridify and merchants who use the Thridify 3D-AR-Configurator app for Shopify.',
  path: CANONICAL,
  image: '/og/default.png',
  ogTitle: 'Thridify for Shopify: Data Processing Addendum',
  ogDescription: 'How Thridify processes store-visitor data on behalf of Shopify merchants.',
});

function Mail() {
  return (
    <a href={`mailto:${MAIL}`} className="text-primary underline underline-offset-4">
      {MAIL}
    </a>
  );
}

export default function ShopifyDpaPage() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Thridify for Shopify: Data Processing Addendum',
        item: `${SITE_URL}${CANONICAL}`,
      },
    ],
  };

  return (
    <>
      <JsonLd nodes={[breadcrumbLd]} />

      <LegalDocument
        eyebrow="Legal"
        title="Thridify for Shopify: Data Processing Addendum"
        effectiveDate={LEGAL_UPDATE_DATE}
      >
        <LegalSection title="1. Parties and scope">
          <RegionalEntityBlock />
          <p>
            This Data Processing Addendum (&ldquo;DPA&rdquo;) is between Thridify
            (&ldquo;Processor&rdquo;) and the merchant that installs the Thridify
            3D-AR-Configurator app on a Shopify store (&ldquo;Controller&rdquo;). It applies
            to personal data about the Controller&rsquo;s store visitors and customers that
            the app processes for the Controller. It forms part of the agreement under which
            the Controller uses Thridify, and takes effect when the app is installed.
          </p>
          <p>
            For merchants in the European Union or the United Kingdom, the Processor is{' '}
            {ESTONIA_ENTITY.name} and this DPA is the contract required by Article 28 of the GDPR
            and of the UK GDPR.
          </p>
        </LegalSection>

        <LegalSection title="2. What is processed, and why">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Purpose:</strong> showing 3D and AR product experiences on the
              Controller&rsquo;s storefront, and reporting which views, carts, orders, refunds
              and returns followed a 3D or AR view.
            </li>
            <li>
              <strong>Data subjects:</strong> visitors to and customers of the
              Controller&rsquo;s store.
            </li>
            <li>
              <strong>Data:</strong> pseudonymous session IDs; page, product and 3D
              interaction events; order IDs, amounts, currency and the 3D link. The app does
              not process names, email addresses, phone numbers or postal addresses.
            </li>
            <li>
              <strong>Duration:</strong> while the app is installed, plus the retention
              periods in our{' '}
              <a href="/app-privacy" className="text-primary underline underline-offset-4">
                Shopify app privacy policy
              </a>
              .
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="3. Processing on instructions">
          <p>
            The Processor processes this data only to provide the app, as configured by the
            Controller in the app and in Shopify. If the Processor believes an instruction
            breaks data protection law, it will tell the Controller.
          </p>
        </LegalSection>

        <LegalSection title="4. Confidentiality and security">
          <p>
            People with access to the data are bound by confidentiality. The Processor keeps
            the security measures in Annex 2 in place and may improve them over time, but will
            not make them weaker.
          </p>
        </LegalSection>

        <LegalSection title="5. Sub-processors">
          <p>
            The Controller authorises the sub-processors in Annex 3. The Processor will give at
            least 30 days&rsquo; notice of a new sub-processor, by email or in the app. The
            Controller may object on reasonable data protection grounds, and may uninstall the
            app if the objection cannot be resolved. The Processor holds each sub-processor to
            data protection terms at least as protective as this DPA and remains responsible
            for its sub-processors.
          </p>
        </LegalSection>

        <LegalSection title="6. Help with requests and assessments">
          <p>
            The Processor answers Shopify&rsquo;s privacy requests (customer data request,
            customer deletion, store deletion) automatically, and helps the Controller with any
            other data subject request, data protection impact assessment or regulator enquiry
            about the app. Write to our Privacy Officer, {OFFICER.name}, at <Mail />.
          </p>
        </LegalSection>

        <LegalSection title="7. Personal data breaches">
          <p>
            The Processor will notify the Controller of a personal data breach affecting the
            Controller&rsquo;s data without undue delay, and no later than 48 hours after
            becoming aware of it. The notice will describe what happened, the data and people
            affected as far as known, and the steps taken.
          </p>
        </LegalSection>

        <LegalSection title="8. Deletion, transfers and audits">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Deletion:</strong> when the app is uninstalled, the Processor deletes the
              store&rsquo;s data on Shopify&rsquo;s store deletion request (48 hours after
              uninstall), except where law requires it to be kept. A one-way hash of the store
              domain is kept only to offer the free trial once per store.
            </li>
            <li>
              <strong>Transfers:</strong> data may be processed outside the Controller&rsquo;s
              country, by the sub-processors in Annex 3. For Controllers in the European Union or the United Kingdom, transfers to{' '}
              {CANADA_ENTITY.name} rely on the adequacy decisions for Canada, and transfers to{' '}
              {INDIA_ENTITY.name} in India and to sub-processors in other countries without an
              adequacy decision rely on the European Commission&rsquo;s Standard Contractual
              Clauses (Module 3) with the UK International Data Transfer Addendum.
            </li>
            <li>
              <strong>Audits:</strong> on request, the Processor provides the information
              needed to show it meets this DPA. Where that is not enough, the Controller may
              audit once a year on 30 days&rsquo; notice, at its own cost, under
              confidentiality.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="9. Limitation of liability">
          {/* Recommend counsel review before publishing. */}
          <p>
            This section applies to both parties equally and only to the extent permitted by
            law.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Cap.</strong> Each party&rsquo;s total liability arising out of or in
              connection with this DPA is limited to the fees the merchant paid to Thridify in
              the 12 months before the event that gave rise to the claim, or US$100, whichever
              is greater (so merchants on the free plan are covered too).
            </li>
            <li>
              <strong>Excluded losses.</strong> Neither party is liable for indirect,
              incidental, special or consequential damages, including lost profits, revenue,
              goodwill or data, even if it was told such damages were possible.
            </li>
            <li>
              <strong>What this does not limit.</strong> Nothing in this DPA limits liability
              that cannot be limited under applicable law, including the rights of individuals
              to compensation under data protection law (such as Article 82 GDPR) and fines
              imposed by a regulator on the party that incurred them.
            </li>
          </ul>
          <p>
            If this DPA and any other agreement between the parties conflict on data
            protection, this DPA applies.
          </p>
        </LegalSection>

        <LegalSection title="10. Governing law">
          <p>
            This DPA is governed by the laws of the Province of Ontario and the federal laws
            of Canada that apply there, and the courts of Ontario have jurisdiction, except
            where data protection law requires another law or forum (for example, the EU
            Standard Contractual Clauses, which follow the law and courts they specify).
          </p>
          <p>
            For merchants in the European Union or the United Kingdom, this DPA is instead
            governed by Estonian law, and the Harju County Court in Tallinn has jurisdiction.
          </p>
        </LegalSection>

        <LegalSection title="Annex 1: Processing details">
          <p>See section 2.</p>
        </LegalSection>

        <LegalSection title="Annex 2: Security measures">
          <ul className="list-disc pl-5 space-y-2">
            <li>Encryption in transit (TLS) and at rest.</li>
            <li>Shopify access tokens encrypted again in the database.</li>
            <li>Every Shopify notification verified against its HMAC signature.</li>
            <li>Access limited to people who need it to run the service.</li>
            <li>Automatic expiry of order links (400 days; 45 days if unpaid) and of analytics events (6 months).</li>
            <li>
              Analytics stores no IP addresses: a daily-salted one-way visitor hash and
              approximate location only.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="Annex 3: Sub-processors">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Google Cloud</strong>: hosting and storage (Taiwan, Mumbai, Delhi).
            </li>
            <li>
              <strong>MongoDB Atlas</strong>: database.
            </li>
            <li>
              <strong>Cloudflare</strong>: content delivery and analytics edge (global).
            </li>
            <li>
              <strong>{INDIA_ENTITY.name}</strong> (India) and{' '}
              <strong>{CANADA_ENTITY.name}</strong> (Canada): when either is not the Processor,
              for engineering, hosting and support, under a written intra-group agreement.{' '}
              {INDIA_ENTITY.name} also runs YOM analytics.
            </li>
          </ul>
        </LegalSection>
      </LegalDocument>
    </>
  );
}
