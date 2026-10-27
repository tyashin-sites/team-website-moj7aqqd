import { LegalDocument, LegalSection } from '@/components/LegalDocument';
import { LegalLink, LegalMail, RegionalEntityBlock } from '@/components/LegalEntity';
import { SITE_URL } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import {
  CANADA_ENTITY,
  ESTONIA_ENTITY,
  INDIA_ENTITY,
  LEGAL_UPDATE_DATE,
  OFFICER,
} from '@/content/legal/group';

// Data Processing Addendum for every non-Shopify channel (viewer embeds,
// viewer.thridify.com links, lead forms, shared configurations and quotes,
// WooCommerce and other integrations, AI tools). Adapted from /shopify-dpa,
// which still governs data received through the Shopify app. Forms part of
// the Thridify Platform Terms (/legal/platform-terms, section 11). 27 October
// 2026: Aapastech OÜ is the processor for EU/UK controllers (Art. 28 contract);
// transfers per COUNSEL-DETERMINATIONS v2.0 E2 (Canada adequacy; SCCs Module 3
// + UK Addendum for India and non-adequate sub-processors).
// Processing facts checked against thridify-be origin/master (shared-config
// lead fields, Resend, AI providers, Sentry) and thridify-fe origin/master
// (shopper tracker) on 26 October 2026. Annex 2 lists only the security
// commitments counsel confirmed as verifiable (26 October 2026).

const CANONICAL = '/dpa';

export const metadata = pageMetadata({
  title: 'Data Processing Addendum',
  description:
    'How Thridify processes personal data about your shoppers and website visitors on your behalf, as your processor, under the Thridify Platform Terms.',
  path: CANONICAL,
  image: '/og/default.png',
  ogTitle: 'Data Processing Addendum | Thridify',
  ogDescription: 'How Thridify processes shopper data on behalf of its customers.',
});

export default function DpaPage() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Data Processing Addendum',
        item: `${SITE_URL}${CANONICAL}`,
      },
    ],
  };

  return (
    <>
      <JsonLd nodes={[breadcrumbLd]} />

      <LegalDocument
        eyebrow="Legal"
        title="Data Processing Addendum"
        effectiveDate={LEGAL_UPDATE_DATE}
      >
        <LegalSection title="1. Parties and scope" id="scope">
          <RegionalEntityBlock />
          <p>
            This Data Processing Addendum (&ldquo;DPA&rdquo;) is between Thridify
            (&ldquo;Processor&rdquo;) and the customer that accepts the{' '}
            <LegalLink href="/legal/platform-terms">Thridify Platform Terms</LegalLink>{' '}
            (&ldquo;Controller&rdquo;). It applies to personal data about the
            Controller&rsquo;s shoppers, website visitors and enquirers that the Processor
            handles for the Controller through Thridify: the 3D and AR viewer embedded on the
            Controller&rsquo;s own sites, links on viewer.thridify.com, lead forms, shared
            configurations and quotes, integrations such as our WooCommerce plugin, and AI
            tools used on the Controller&rsquo;s content. It forms part of the Platform Terms
            and takes effect when they do.
          </p>
          <p>
            For personal data of people in India, the Controller is the data fiduciary and the
            Processor is its data processor under the Digital Personal Data Protection Act,
            2023. Data we receive through our Shopify app is covered by the{' '}
            <LegalLink href="/shopify-dpa">Thridify for Shopify Data Processing Addendum</LegalLink>{' '}
            instead.
          </p>
          <p>
            For Controllers in the European Union or the United Kingdom, the Processor is{' '}
            {ESTONIA_ENTITY.name} and this DPA is the contract required by Article 28 of the GDPR
            and of the UK GDPR.
          </p>
        </LegalSection>

        <LegalSection title="2. What is processed, and why" id="processing">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Purpose:</strong> showing 3D and AR product experiences on the
              Controller&rsquo;s sites and links; letting shoppers configure, save, share and
              personalise products and send enquiries; sending the shared configurations and
              quotes the Controller asks us to send; reporting which views, leads, carts and
              orders followed a 3D or AR view; and running AI features on content the
              Controller submits.
            </li>
            <li>
              <strong>Data subjects:</strong> visitors to the Controller&rsquo;s sites and
              Thridify links, shoppers, people who send the Controller an enquiry, and people
              shown in images the Controller or a shopper uploads.
            </li>
            <li>
              <strong>Viewer events:</strong> the product and experience viewed and how it was
              used, the page address, referrer and campaign tags, the device type and whether
              it supports AR. A session ID is kept in the browser&rsquo;s memory. Where the
              consent signal on the page allows it, the viewer also stores a session ID and a
              visitor ID in the browser.
            </li>
            <li>
              <strong>Location:</strong> an approximate location (country, region, city) that
              YOM, our analytics service, works out from the IP address. YOM does not store IP
              addresses.
            </li>
            <li>
              <strong>Leads and quotes:</strong> when the Controller turns on lead collection, a
              shopper&rsquo;s name and email address, and optionally phone number and city,
              with the configuration they saved and any quote the Controller sends them.
            </li>
            <li>
              <strong>Personalisation:</strong> images or other content a shopper uploads to
              personalise a product.
            </li>
            <li>
              <strong>Orders:</strong> where the Controller connects an order integration, order
              IDs, amounts, currency and the link to a 3D view. If the Controller turns on order
              attribution in a plugin such as WooCommerce, a first-party cookie,{' '}
              <code>_thridify_3d</code>, links an order to a 3D view.
            </li>
            <li>
              <strong>AI tools:</strong> images and other content the Controller submits to our
              AI features, which may show people.
            </li>
            <li>
              <strong>Duration:</strong> while the Controller uses Thridify, and then until the
              data is deleted under section 8.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="3. Processing on instructions" id="instructions">
          <p>
            The Processor processes this data only to provide Thridify to the Controller, as
            the Controller configures it, and as the Platform Terms allow, including building
            anonymous statistics under their section on aggregated data. If the Processor
            believes an instruction breaks data protection law, it will tell the Controller.
          </p>
        </LegalSection>

        <LegalSection title="4. The Controller's part" id="controller">
          <p>
            The Controller decides what personal data Thridify collects for it, for example by
            turning on lead forms or connecting its own analytics or advertising accounts. It
            must have a lawful basis for that data, tell its shoppers about it in its own
            privacy notice, and get any consent the law requires. The viewer stores IDs in the
            browser, and forwards events to the Controller&rsquo;s own analytics or advertising
            accounts, only when the consent signal on the page allows it. The Controller should
            not use Thridify to collect sensitive personal data.
          </p>
        </LegalSection>

        <LegalSection title="5. Confidentiality and security" id="security">
          <p>
            People with access to the data are bound by confidentiality. The Processor keeps
            the security measures in Annex 2 in place and may improve them over time, but will
            not make them weaker.
          </p>
        </LegalSection>

        <LegalSection title="6. Sub-processors" id="sub-processors">
          <p>
            The Controller authorises the sub-processors in Annex 3. The Processor will give at
            least 30 days&rsquo; notice of a new sub-processor, by email or in the product. The
            Controller may object on reasonable data protection grounds, and may close its
            account if the objection cannot be resolved. The Processor holds each sub-processor
            to data protection terms at least as protective as this DPA and remains responsible
            for its sub-processors.
          </p>
        </LegalSection>

        <LegalSection title="7. Help with requests, assessments and breaches" id="assistance">
          <p>
            The Processor helps the Controller answer requests from individuals (access,
            correction, erasure, withdrawal of consent, nomination and grievances), and helps
            with data protection impact assessments and regulator enquiries about Thridify,
            within the Controller&rsquo;s deadlines. If such a request reaches the Processor
            directly, it passes it on to the Controller without delay, unless the law requires
            otherwise. Write to our Privacy Officer, {OFFICER.name}, at <LegalMail />.
          </p>
          <p>
            The Processor will notify the Controller of a personal data breach affecting the
            Controller&rsquo;s data without undue delay, and no later than 48 hours after
            becoming aware of it. The notice will describe what happened, the data and people
            affected as far as known, and the steps taken. Where the CERT-In Directions apply
            to an incident on our systems, we also report it to CERT-In within 6 hours.
          </p>
        </LegalSection>

        <LegalSection title="8. Deletion, transfers and audits" id="deletion">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Deletion:</strong> the Controller can delete records or ask us to delete
              them at any time. When the Platform Terms end, the Processor deletes the
              Controller&rsquo;s personal data as their section on ending the terms describes.
              It keeps only what the law requires. From 13 May 2027 Indian law will also
              require us to keep personal data, related traffic data and processing logs for one
              year from processing. From then, when we delete data from our systems we will keep
              a sealed copy for the rest of that year, which nobody uses except to meet that
              legal duty, and then destroy it.
            </li>
            <li>
              <strong>Transfers:</strong> data may be processed outside the Controller&rsquo;s
              country, by the sub-processors in Annex 3. Transfers out of India follow section
              16 of the Digital Personal Data Protection Act, 2023, and no data goes to a
              country the Government of India restricts. For Controllers in the European Union or the United Kingdom, transfers to{' '}
              {CANADA_ENTITY.name} rely on the adequacy decisions for Canada, and transfers to{' '}
              {INDIA_ENTITY.name} in India and to sub-processors in other countries without an
              adequacy decision rely on the European Commission&rsquo;s Standard Contractual
              Clauses (Module 3) with the UK International Data Transfer Addendum.
            </li>
            <li>
              <strong>Audits:</strong> on request, the Processor provides the information needed
              to show it meets this DPA. Where that is not enough, the Controller may audit once
              a year on 30 days&rsquo; notice, at its own cost, under confidentiality.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="9. Liability, law and precedence" id="liability">
          <p>
            Each party&rsquo;s liability under this DPA is governed by the liability section of
            the <LegalLink href="/legal/platform-terms#liability">Platform Terms</LegalLink>,
            under which the limit for breaches of data protection obligations is three times
            the general limit. This DPA is governed by the same law, and disputes go to the
            same forum, as the Platform Terms, except where data protection law requires
            another law or forum (for example, the EU Standard Contractual Clauses, which follow
            the law and courts they specify). If this DPA and the Platform Terms conflict on
            data protection, this DPA applies.
          </p>
        </LegalSection>

        <LegalSection title="Annex 1: Processing details" id="annex-1">
          <p>See section 2.</p>
        </LegalSection>

        <LegalSection title="Annex 2: Security measures" id="annex-2">
          <ul className="list-disc pl-5 space-y-2">
            <li>TLS on every public endpoint.</li>
            <li>Encryption at rest provided by our hosting and database providers.</li>
            <li>Access to production systems limited to staff who need it.</li>
            <li>Secrets kept in managed secret stores, never in source code.</li>
            <li>Logging of security and administrative events.</li>
            <li>Incident response with the notification times in this addendum.</li>
            <li>Backups provided by our database providers.</li>
          </ul>
          <p>We are extending log retention to 180 days across all systems by 31 December 2026.</p>
        </LegalSection>

        <LegalSection title="Annex 3: Sub-processors" id="annex-3">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Google Cloud</strong>: hosting and storage (Taiwan, Mumbai, Delhi).
            </li>
            <li>
              <strong>MongoDB Atlas</strong>: database.
            </li>
            <li>
              <strong>Cloudflare</strong>: content delivery, file storage and the analytics edge
              (global).
            </li>
            <li>
              <strong>Resend</strong>: sends shared configurations and quotes by email.
            </li>
            <li>
              <strong>OpenAI and Replicate</strong>: AI image features, only for content the
              Controller submits to them.
            </li>
            <li>
              <strong>Sentry</strong>: error monitoring.
            </li>
            <li>
              <strong>{INDIA_ENTITY.name}</strong> (India) and{' '}
              <strong>{CANADA_ENTITY.name}</strong> (Canada): when either is not the Processor,
              for engineering, hosting and support, under a written intra-group agreement.{' '}
              {INDIA_ENTITY.name} also runs YOM analytics.
            </li>
          </ul>
          <p>
            Questions about this DPA: <LegalMail />.
          </p>
        </LegalSection>
      </LegalDocument>
    </>
  );
}
