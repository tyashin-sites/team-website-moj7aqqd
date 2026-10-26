import { LegalDocument, LegalSection } from '@/components/LegalDocument';
import { SITE_URL } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';

// Privacy policy for the Thridify app for Shopify (the App Store listing's
// privacy policy URL). Facts match thridify-be / shopify-extension as of
// 2026-10-26; the site-wide /privacy still covers visits to thridify.com.
// Draft for the owner's review: publish only after approval.

const CANONICAL = '/shopify-privacy';
const MAIL = 'contact@thridify.com';

export const metadata = pageMetadata({
  title: 'Thridify for Shopify: Privacy Policy',
  description:
    'What the Thridify 3D-AR-Configurator app for Shopify collects from merchants and store visitors, why, how long we keep it, and how to have it deleted.',
  path: CANONICAL,
  image: '/og/default.png',
  ogTitle: 'Thridify for Shopify: Privacy Policy',
  ogDescription:
    'Merchant and shopper data in the Thridify Shopify app: what we collect, why, retention, sub-processors and deletion.',
});

function Mail() {
  return (
    <a href={`mailto:${MAIL}`} className="text-primary underline underline-offset-4">
      {MAIL}
    </a>
  );
}

export default function ShopifyPrivacyPage() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Thridify for Shopify: Privacy Policy',
        item: `${SITE_URL}${CANONICAL}`,
      },
    ],
  };

  return (
    <>
      <JsonLd nodes={[breadcrumbLd]} />

      <LegalDocument
        eyebrow="Legal"
        title="Thridify for Shopify: Privacy Policy"
        effectiveDate="[DATE OF PUBLICATION]"
      >
        <LegalSection title="Summary">
          <p>
            This policy covers the Thridify 3D-AR-Configurator app for Shopify (&ldquo;the
            app&rdquo;). It explains what the app collects when a merchant installs it and
            when shoppers visit that merchant&rsquo;s store, what we use it for, how long we
            keep it, and how to have it deleted. The app is built to work without personal
            data about your customers: it never reads or stores their names, emails, phone
            numbers or addresses. Visits to thridify.com itself are covered by our{' '}
            <a href="/privacy" className="text-primary underline underline-offset-4">
              website privacy policy
            </a>
            .
          </p>
        </LegalSection>

        <LegalSection title="Who we are">
          <p>
            The app is provided by <strong>14818032 Canada Inc., operating as Thridify</strong>,
            Burlington, Ontario, Canada (&ldquo;Thridify&rdquo;, &ldquo;we&rdquo;,
            &ldquo;us&rdquo;). Contact us about any privacy matter at <Mail />.
          </p>
        </LegalSection>

        <LegalSection title="Data about merchants">
          <p>When you install the app and connect a Thridify account, we store:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Your store:</strong> its myshopify.com domain and primary storefront
              domain, the access token Shopify issues to the app (encrypted), and the
              permissions you granted.
            </li>
            <li>
              <strong>Your Thridify account:</strong> your name, email address, company name
              and a hashed password (never the password itself).
            </li>
            <li>
              <strong>Your catalog:</strong> product IDs, titles, handles, SKUs and variant
              IDs, so each product can show its matching 3D experience. We keep a fingerprint
              of each product to notice when it changes.
            </li>
            <li>
              <strong>Your plan and purchases:</strong> the Shopify subscription you chose,
              its status and renewal date, and any one-time services you buy. Shopify
              handles the payments; we never see card details.
            </li>
          </ul>
          <p>
            We use this to run the app: show 3D and AR on your storefront, keep your catalog
            in sync, report results to you, apply your plan and deliver services you buy. We
            email you about your account and the service. Marketing emails are sent only if
            you opt in, and you can opt out at any time.
          </p>
        </LegalSection>

        <LegalSection title="Data about your store's visitors">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>3D viewer.</strong> When a shopper opens or uses a 3D/AR experience, the
              viewer records the event (which product, which experience, what was used). It
              sets a first-party cookie, <code>_thridify_3d</code>, holding a random session
              ID, the time of the first and last 3D view, and the IDs of products viewed in 3D.
              It also adds this marker to the cart, so an order can be linked to a 3D view.
            </li>
            <li>
              <strong>Conversion pixel.</strong> A Shopify web pixel reports product views,
              add-to-carts and started checkouts with a random per-tab session ID, the page
              address and referrer, product and variant IDs, price and currency, and whether
              the shopper used 3D in the last 30 days. Shopify runs the pixel only for
              shoppers who allow analytics, or where consent is not required. It is not used
              for advertising, and the data is never sold.
            </li>
            <li>
              <strong>Orders.</strong> To show you how many orders, refunds and returns
              followed a 3D view, we receive order notifications from Shopify and keep only
              the order ID, product and variant IDs, quantities, amounts, currency and the 3D
              link. We do not store customer fields from orders.
            </li>
            <li>
              <strong>Analytics processing.</strong> Visitor events are processed by YOM
              (Your Own Metrics), our analytics service. YOM does not store IP addresses. It
              uses the IP address only briefly, to work out an approximate location (country,
              region, city), to build a visitor ID that is a one-way hash of the IP address,
              browser and a salt that changes every day, and for short-lived rate limiting.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="How long we keep data">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Order links to 3D views:</strong> 400 days, then deleted automatically.
              Unpaid orders: 45 days.
            </li>
            <li>
              <strong>Visitor analytics events:</strong> 6 months by default.
            </li>
            <li>
              <strong>Store and account data:</strong> while the app is installed and your
              account is active. When you uninstall, we disconnect the store at once and
              delete its data when Shopify sends its store deletion request (48 hours later).
            </li>
            <li>
              <strong>One-trial record:</strong> to offer the free trial once per store, we
              keep a one-way hash (SHA-256) of the store&rsquo;s myshopify.com domain after
              the store data is deleted. It contains no personal data and is used only to
              stop repeat trials.
            </li>
            <li>
              <strong>Your 3D content</strong> (models, materials, experiences) belongs to
              your Thridify account and is kept until you delete it or close the account,
              because you may use it on other platforms. Ask us and we will delete it.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="Deletion and data requests">
          <p>We handle Shopify&rsquo;s privacy requests automatically:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Customer data request:</strong> we hold no personal data about your
              customers, and answer the request accordingly.
            </li>
            <li>
              <strong>Customer deletion:</strong> we delete the 3D order links for the orders
              Shopify names.
            </li>
            <li>
              <strong>Store deletion:</strong> we delete the store record, its catalog
              fingerprints and platform link, and all of its order links.
            </li>
          </ul>
          <p>
            You can also write to <Mail /> to access, correct, export or delete your data. We
            reply within 30 days. You can complain to your data protection authority; in
            Canada, that is the Office of the Privacy Commissioner of Canada.
          </p>
        </LegalSection>

        <LegalSection title="Who we share data with">
          <p>
            We do not sell personal data. We share data only with services that help us run
            the app, under contract:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Google Cloud:</strong> the app&rsquo;s servers and uploads in Taiwan
              (asia-east1), assets in Mumbai (asia-south1), model backups in Delhi
              (asia-south2).
            </li>
            <li>
              <strong>MongoDB Atlas:</strong> database.
            </li>
            <li>
              <strong>Cloudflare:</strong> content delivery for 3D files and the YOM
              analytics service, on its global network.
            </li>
            <li>
              <strong>Aapastech Private Limited</strong> (India): operates YOM analytics and
              helps build and support Thridify.
            </li>
            <li>
              <strong>Shopify:</strong> the platform that runs your store and bills your
              plan.
            </li>
          </ul>
          <p>
            Some of these providers process data outside Canada. Where the law requires it,
            transfers are covered by contract, including the European Commission&rsquo;s
            Standard Contractual Clauses.
          </p>
        </LegalSection>

        <LegalSection title="Security">
          <p>
            Data is encrypted in transit and at rest. Shopify access tokens are also encrypted
            in our database. Every notification from Shopify is checked against its signature
            before we act on it. Access is limited to people who need it to run the service.
          </p>
        </LegalSection>

        <LegalSection title="Your role and ours">
          <p>
            For data about your store&rsquo;s visitors, you are the controller and Thridify
            processes it on your instructions, under our{' '}
            <a href="/shopify-dpa" className="text-primary underline underline-offset-4">
              Data Processing Addendum
            </a>
            . For your own account data, Thridify is the controller.
          </p>
        </LegalSection>

        <LegalSection title="Changes">
          <p>
            If we change this policy in a way that matters, we will tell you in the app or by
            email before the change takes effect.
          </p>
        </LegalSection>
      </LegalDocument>
    </>
  );
}
