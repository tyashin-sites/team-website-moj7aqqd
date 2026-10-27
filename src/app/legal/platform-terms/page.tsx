import { LegalDocument, LegalSection } from '@/components/LegalDocument';
import { LegalLink, LegalMail, RegionalEntityBlock } from '@/components/LegalEntity';
import { JsonLd } from '@/components/JsonLd';
import { SITE_URL } from '@/lib/schema';
import { pageMetadata } from '@/lib/seo';
import {
  BILLING_AGENCY_SENTENCE,
  CANADA_ENTITY,
  INDIA_ENTITY,
  LEGAL_UPDATE_DATE,
  OFFICER,
} from '@/content/legal/group';

// Thridify Platform Terms: the customer agreement for free and paid Thridify
// accounts, including accounts created through the Shopify app. The admin
// sign-up link (thridify.com/terms-of-service) redirects here (next.config.ts).
// Positions: yom-legal-pack/COUNSEL-DETERMINATIONS.md A1, A5, C13, G35
// (revised), G41, section 1 "Billing reality" (billing and collection agency).
// Shared wording, verbatim: PUBLISH-KIT.md v1.2 K1 (entity), K4 (user rules),
// K5 (AI content), K7 (changes), K8 / 04-aggregate-data-clause.md (statistics),
// K10 (liability). Drafted positions accepted by counsel on 26 October 2026.
// Billing facts checked read-only against thridify-be origin/master on
// 26 October 2026: Razorpay orders (Controller/Orders), Shopify Billing
// subscriptions and one-time purchases (Controller/Shopify/billing.ts),
// India GST tax-inclusive invoices (services/invoice.ts). No prices here.

const CANONICAL = '/legal/platform-terms';

export const metadata = pageMetadata({
  title: 'Thridify Platform Terms',
  description:
    'The agreement for using the Thridify platform: plans and billing, your content, rules for hosted content, data protection, liability and governing law.',
  path: CANONICAL,
  image: '/og/default.png',
  ogTitle: 'Thridify Platform Terms',
  ogDescription: 'The customer agreement for free and paid Thridify accounts.',
});

export default function PlatformTermsPage() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Thridify Platform Terms',
        item: `${SITE_URL}${CANONICAL}`,
      },
    ],
  };

  return (
    <>
      <JsonLd nodes={[breadcrumbLd]} />

      <LegalDocument
        eyebrow="Legal"
        title="Thridify Platform Terms"
        breadcrumbLabel="Platform Terms"
        effectiveDate={LEGAL_UPDATE_DATE}
      >
        <LegalSection title="1. About these terms" id="about">
          <RegionalEntityBlock />
          <p>
            These Platform Terms are the agreement between you and Thridify for your use of the
            Thridify platform. They apply to free and paid accounts, including accounts created
            through our app for Shopify. &ldquo;You&rdquo; means the business or person that
            opens the account. If you accept these terms for a business, you confirm that you
            can bind it, and &ldquo;you&rdquo; means that business. You must be at least 18.
          </p>
          <p>
            You accept these terms when you create an account, when you click to accept them,
            or when you use the Service.
          </p>
          <p>
            <strong>When they apply.</strong> These terms take effect on 26 October 2026 for new
            customers. If you had a Thridify account before that date, they apply to you 30
            days after we tell you about them, or when you accept them, if that is earlier.
            Until then, the terms you agreed to before continue to apply.
          </p>
          <p>
            <strong>Which document wins.</strong> The{' '}
            <LegalLink href="/dpa">Data Processing Addendum</LegalLink> prevails on data
            protection. Otherwise, an Order Form prevails over these terms, but only for that
            order. These terms prevail over our website{' '}
            <LegalLink href="/terms">Terms of Use</LegalLink>.
          </p>
        </LegalSection>

        <LegalSection title="2. Definitions" id="definitions">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Account:</strong> your Thridify account and the team workspace that goes
              with it.
            </li>
            <li>
              <strong>Authorised Users:</strong> the people you allow to use your Account, such
              as your staff and contractors.
            </li>
            <li>
              <strong>Customer Content:</strong> anything you or your Authorised Users upload to,
              create in or send through the Service, including 3D models, materials, textures,
              images, product data, text, configurations and the settings of your experiences.
            </li>
            <li>
              <strong>Shopper Data:</strong> personal data about visitors to, and shoppers on,
              your stores, websites and Thridify links that the Service processes for you.
            </li>
            <li>
              <strong>Order Form:</strong> the Plan or purchase you select and confirm in the
              Service, a quote or order form we agree with you in writing, or, in the Shopify
              app, the charge you approve on Shopify&rsquo;s billing screen.
            </li>
            <li>
              <strong>Plan:</strong> the subscription tier you choose, with its features and
              limits.
            </li>
            <li>
              <strong>Fees:</strong> the amounts payable for your Plan and anything else you buy
              from us, whether you pay us directly or through Shopify.
            </li>
            <li>
              <strong>Service:</strong> the Thridify platform: the admin app, the 3D and AR viewer
              (including viewer.thridify.com and the viewer embedded on your sites), our
              integrations, plugins and apps (including the Shopify app), APIs, AI tools and the
              Public Material Library, together with support and any services, such as 3D
              modelling, that we agree to provide.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="3. The Service and your Plan" id="service">
          <p>
            We provide the Service under the Plan you choose. The features, limits and prices
            of each Plan are shown in the Service when you choose or change a Plan, in your
            Order Form, or, in the Shopify app, on the Shopify billing screen you approve.
            These terms do not set prices. Free plans and trials can have fewer features and
            lower limits than paid Plans.
          </p>
          <p>
            If we agree to provide 3D modelling or other services, your Order Form describes
            the work, how we deliver it and the price.
          </p>
          <p>
            We keep improving Thridify, so features change over time. If we remove a feature
            that is a material part of your paid Plan during a period you have already paid
            for, we will tell you before we do it, and if you cancel because of it we will
            refund the Fees for the unused part of that period.
          </p>
          <p>
            The Service runs on browsers, devices and platforms we do not control, such as
            Shopify, WooCommerce, web browsers and the AR features of phones. Changes they make
            can affect how the Service works.
          </p>
        </LegalSection>

        <LegalSection title="4. Your Account" id="account">
          <p>
            Give us accurate account and billing details and keep them up to date. Keep your
            login details and API keys secret, and make sure your Authorised Users follow these
            terms. You are responsible for what happens in your Account. If you think someone
            has used it without permission, tell us at once at <LegalMail />.
          </p>
        </LegalSection>

        <LegalSection title="5. Fees, billing, trials, renewals, taxes and refunds" id="fees">
          <p>
            <strong>Paying us directly.</strong> If you buy a Plan, credits or services from us
            directly, you pay at checkout through Razorpay, our payment processor, in the
            currency shown there. Razorpay handles your payment details under its own terms.
            Your Order Form may set other payment terms, such as payment against an invoice.{' '}
            {BILLING_AGENCY_SENTENCE}
          </p>
          <p>
            <strong>Shopify Billing.</strong> If you use Thridify through our Shopify app,
            Shopify charges you for the app on your Shopify bill, under Shopify&rsquo;s terms.
            You approve each subscription and each one-time charge on Shopify&rsquo;s billing
            screen before it applies.
          </p>
          <p>
            <strong>Trials.</strong> Some Plans start with a free trial. We tell you how long it
            lasts before it starts, and we may limit trials to one per customer or store. In the
            Shopify app, the subscription you approve starts charging when the trial ends unless
            you cancel before then.
          </p>
          <p>
            <strong>Renewals.</strong> Shopify Billing subscriptions renew automatically every 30
            days or every year, as shown on Shopify&rsquo;s billing screen, until you cancel,
            change Plan or uninstall the app. Plans you buy from us directly run for the period
            you paid for and renew when you pay for the next period; we do not charge you
            automatically unless your Order Form says so. If you do not renew, the paid
            features of your Plan end when the period ends.
          </p>
          <p>
            <strong>Price changes.</strong> We may change our prices. A new price applies to you
            from your next renewal after we have given you at least 30 days&rsquo; notice. For
            Shopify Billing, a new price applies only once you approve it on Shopify.
          </p>
          <p>
            <strong>Taxes.</strong> You pay any taxes that apply to the Fees, other than taxes on
            our income. If you are in India and pay us directly, our prices include GST, and the
            invoice shows it separately. Elsewhere, the checkout, Order Form or invoice shows
            whether tax is included or added. Taxes on Shopify Billing charges are handled by
            Shopify under its terms.
          </p>
          <p>
            <strong>Late payment.</strong> If a payment fails or is overdue, we will tell you. If
            it is still unpaid 14 days later, we may suspend the paid features of your Account
            until you pay.
          </p>
          <p>
            <strong>Refunds.</strong> Fees are not refundable, except where sections 3, 15, 18 or
            19 say so or where the law requires a refund. Nothing in these terms takes away a
            refund right the law gives you. A Shopify Billing charge can only be refunded
            through Shopify.
          </p>
        </LegalSection>

        <LegalSection title="6. Your content and models" id="content">
          <p>
            <strong>You own your content.</strong> You own your Customer Content, including the
            3D models you upload. These terms do not transfer ownership of it to us.
          </p>
          <p>
            <strong>What you let us do with it.</strong> You give us a non-exclusive, worldwide,
            royalty-free licence to host, store, copy, process, convert and display your
            Customer Content, and to make the technical versions the Service needs (such as
            compressed, resized or re-encoded files and thumbnails), only to provide, secure
            and support the Service for you and to show your experiences where you publish
            them. The licence ends when the Customer Content is deleted under section 15.
            Section 12 describes the only other use we make of data from your Account:
            anonymous statistics.
          </p>
          <p>
            <strong>Publishing.</strong> When you publish an experience or share a link, anyone
            who visits the page or has the link can see it. You choose what to publish.
          </p>
          <p>
            <strong>Models we make for you.</strong> If we build 3D models for you under an Order
            Form, they become your Customer Content once you have paid for them, unless the
            Order Form says otherwise. We keep ownership of our pre-existing tools and
            templates, generic components, the materials in our libraries and our general
            know-how. Where any of them is part of a model we deliver, you may use it as part
            of that model. The licence in this section lets us host and display the models to
            provide the Service.
          </p>
          <p>
            <strong>Your promise.</strong> You confirm that you have the rights you need in your
            Customer Content for us to use it as these terms allow, and that it follows section
            8.
          </p>
          <p>
            <strong>Our rights.</strong> We and our licensors own the Service, including the
            software, the viewer, our own materials and templates, and the Thridify name and
            logo. While your Account is open you may use the Service for your business under
            these terms. We keep every right we do not expressly give you. If you send us
            suggestions, we may use them freely.
          </p>
        </LegalSection>

        <LegalSection title="7. Public Material Library" id="public-material-library">
          <p>
            If you publish materials to the Thridify Public Material Library, or use materials
            from it, the{' '}
            <LegalLink href="/legal/public-material-contribution-agreement">
              Public Material Contribution Agreement and Public Material Licence
            </LegalLink>{' '}
            also apply. For those materials, that agreement prevails over these terms.
          </p>
        </LegalSection>

        <LegalSection title="8. Rules for content you put on Thridify" id="rules">
          <p>
            You are responsible for everything you upload, publish or host through Thridify,
            including content your own visitors or staff add. You must not use Thridify, and
            must not let anyone use your account or site, to host, display, upload, change,
            publish, send, store or share anything that:
          </p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>belongs to someone else and that you have no right to use;</li>
            <li>
              is obscene, pornographic or paedophilic, invades someone&rsquo;s privacy (including
              bodily privacy), insults or harasses anyone on the basis of gender, is racially or
              ethnically objectionable, relates to or encourages money laundering or gambling,
              or promotes enmity between groups on grounds of religion or caste with intent to
              incite violence;
            </li>
            <li>is harmful to children;</li>
            <li>infringes a patent, trademark, copyright or other proprietary right;</li>
            <li>
              deceives or misleads people about where a message came from, or knowingly spreads
              misinformation or anything false and misleading;
            </li>
            <li>impersonates another person;</li>
            <li>
              threatens the unity, integrity, defence, security or sovereignty of India,
              India&rsquo;s friendly relations with other countries, or public order, incites any
              cognisable offence, prevents the investigation of an offence, or insults another
              nation;
            </li>
            <li>
              contains a virus or other code meant to interrupt, destroy or limit any computer
              resource;
            </li>
            <li>
              is an online game that is not verified as permissible, or advertises or promotes
              one; or
            </li>
            <li>breaks any law in force.</li>
          </ol>
          <p>
            <strong>What we can do.</strong> If you break these rules, our privacy policy or
            these terms, we can suspend or end your access immediately, and remove or disable
            access to the content, or both. If the content breaks the law, you may face
            penalties under the Information Technology Act, 2000 and other laws. If the breach
            is an offence that the law requires us to report, for example under the Bharatiya
            Nagarik Suraksha Sanhita, 2023 or the Protection of Children from Sexual Offences
            Act, 2012, we will report it to the authorities. We remind all users of these rules
            at least once every three months.
          </p>
        </LegalSection>

        <LegalSection title="9. Content made with our AI tools" id="ai-content">
          <p>
            Some Thridify features create or change images, video or audio with AI. You must not
            use them to make anything unlawful, including realistic fakes of real people or
            events. Misusing them can lead to penalties under the Information Technology Act,
            2000, the Bharatiya Nyaya Sanhita, 2023, the Protection of Children from Sexual
            Offences Act, 2012, the Representation of the People Act, 1951, the Indecent
            Representation of Women (Prohibition) Act, 1986, the Sexual Harassment of Women at
            Workplace (Prevention, Prohibition and Redressal) Act, 2013 and the Immoral Traffic
            (Prevention) Act, 1956. If you misuse them we may remove the content at once,
            suspend or close your account (keeping the evidence), tell a victim who complains
            who you are where the law allows, and report offences to the authorities. Do not
            remove labels or metadata that mark content as AI-generated.
          </p>
        </LegalSection>

        <LegalSection title="10. Acceptable use" id="acceptable-use">
          <p>You must not, and must not let anyone else:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>break into, probe or test the security of the Service without our written permission;</li>
            <li>
              disrupt or overload the Service, or get around its limits, Plan restrictions or
              access controls;
            </li>
            <li>
              copy, sell, sublicense or rent out the Service, or offer it to others as your own
              service, unless your Order Form allows it;
            </li>
            <li>reverse engineer the Service, except where the law allows it despite this term;</li>
            <li>scrape the Service, or use it to build a competing product;</li>
            <li>
              use lead forms, shared links or quote emails to send spam or messages people have
              not asked for;
            </li>
            <li>
              collect personal data through the Service that you have no right to collect, or
              sensitive personal data you do not need; or
            </li>
            <li>
              use the Service in a way that breaks the law, these terms, or the terms of a
              platform you connect it to, such as Shopify.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="11. Data protection" id="data-protection">
          <p>
            <strong>Your account data.</strong> For personal data about you and your Authorised
            Users, such as names, email addresses and billing records, we act as controller and,
            for people in India, as data fiduciary. Our{' '}
            <LegalLink href="/privacy">Privacy Policy</LegalLink> explains how we handle it.
          </p>
          <p>
            <strong>Shopper Data.</strong> For Shopper Data, you are the controller (the data
            fiduciary, for people in India) and we process it for you as your processor. Our{' '}
            <LegalLink href="/dpa">Data Processing Addendum</LegalLink> applies and forms part
            of these terms. For data we receive through our Shopify app, the{' '}
            <LegalLink href="/shopify-dpa">Thridify for Shopify Data Processing Addendum</LegalLink>{' '}
            and the <LegalLink href="/app-privacy">app privacy policy</LegalLink> apply
            instead.
          </p>
          <p>
            <strong>Your part.</strong> You decide what Shopper Data the Service collects for
            you, for example by turning on lead forms. You must have a lawful basis for it, tell
            your shoppers about it in your own privacy notice, and get any consent the law
            requires.
          </p>
        </LegalSection>

        <LegalSection title="12. Aggregated and de-identified data" id="aggregated-data">
          <p>
            We may combine data from the operation of the Thridify platform, including how
            shoppers use 3D and AR on your products, with the same kind of data from other
            customers to produce statistics. We use these statistics to run, secure and improve
            Thridify, and to publish benchmarks and industry reports, which we may share with
            others. We, YOM (our analytics service) and the service providers that process data
            for us follow these rules:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              A statistic never names you, your store, your products or your shoppers, and we
              never present it in a way that would let someone work out who you or they are.
            </li>
            <li>
              Every statistic we publish or share comes from at least 100 people and at least 5
              customers, and no single customer makes up more than a quarter of it.
            </li>
            <li>
              We only use data that is at least 30 days old, and a statistic never includes
              prices or forward-looking figures.
            </li>
            <li>
              It contains no personal data. We take reasonable technical and organisational
              steps so it can&rsquo;t be linked back to anyone, we won&rsquo;t try to re-identify
              anyone, and anyone we share it with must agree not to try either.
            </li>
            <li>
              We never use data we receive through Shopify (its APIs, webhooks, pixels or app
              extensions, including our Shopify app) for this.
            </li>
            <li>We leave out data from customers and shoppers in Quebec.</li>
            <li>
              Your data stays yours. The statistics, once your data can no longer be identified
              in them, are ours.
            </li>
          </ul>
          <p>
            If you would rather your data were left out of benchmarks, email <LegalMail /> and
            we will leave it out of future ones.
          </p>
        </LegalSection>

        <LegalSection title="13. Confidentiality" id="confidentiality">
          <p>
            Each of us may receive the other&rsquo;s confidential information: anything marked
            confidential, or that a reasonable person would see as confidential, such as
            non-public product plans, commercial terms, unpublished Customer Content and
            security details. The party that receives it will use it only to perform or benefit
            from these terms, share it only with its staff, group companies, contractors and
            professional advisers who need it and are bound by confidentiality duties at least
            as strict as these, and protect it with at least reasonable care.
          </p>
          <p>
            This does not cover information that is or becomes public through no fault of the
            receiving party, that it already knew or developed on its own, or that it received
            lawfully from someone else without a duty of confidence. A party may disclose
            confidential information when the law, a court or a regulator requires it, after
            telling the other party if the law allows. These duties last while you have an
            Account and for 3 years after it ends, and for trade secrets as long as they stay
            secret.
          </p>
        </LegalSection>

        <LegalSection title="14. Suspension" id="suspension">
          <p>
            We may suspend all or part of the Service for you, or remove or disable access to
            specific content, if:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              you break section 8, 9 or 10, or we receive a lawful order or a valid complaint
              about your content;
            </li>
            <li>your use puts the security or stability of the Service, or other customers, at risk;</li>
            <li>Fees stay unpaid as section 5 describes; or</li>
            <li>the law requires it.</li>
          </ul>
          <p>
            We will limit a suspension to what is needed, tell you why (unless the law stops us
            or there is an urgent risk), and restore the Service once the reason has gone. For
            complaints about content we follow the timelines on our{' '}
            <LegalLink href="/grievance">Grievance Officer</LegalLink> page.
          </p>
        </LegalSection>

        <LegalSection title="15. Ending these terms, and your data" id="termination">
          <p>
            <strong>You can cancel at any time.</strong> For a Plan you buy from us directly,
            stop renewing it or close your Account; your Plan runs to the end of the period you
            paid for. In the Shopify app, cancel or change your Plan in the app, or uninstall
            the app.
          </p>
          <p>
            <strong>For breach.</strong> Either of us may end these terms by notice if the other
            seriously breaches them and does not fix the breach within 30 days of being told
            about it. We may end them at once for a serious or repeated breach of section 8 or
            9, or where the law requires it.
          </p>
          <p>
            <strong>If we stop.</strong> We may also end these terms, or stop offering the
            Service, by giving you at least 90 days&rsquo; notice. If we do, we will refund
            prepaid Fees for the unused period.
          </p>
          <p>
            <strong>Your data when your Account ends.</strong> For 30 days after your Account
            ends, you can ask us for a copy of your Customer Content, and we will send it in the
            formats we hold it in. After that we delete your Customer Content and Shopper Data
            from our systems. We keep only what the law requires: invoices and tax records for
            8 years, and security logs for 180 days under Indian cyber security rules (we are
            extending this to every system by 31 December 2026). From 13 May 2027 Indian law will also require us to keep
            personal data, related traffic data and processing logs for one year from
            processing. From then, when we delete your data from our systems we will keep a
            sealed copy for the rest of that year, which nobody uses except to meet that legal
            duty, and then destroy it. Copies in backups
            stay protected by these terms until they are deleted. If you uninstall our Shopify
            app, our <LegalLink href="/app-privacy">app privacy policy</LegalLink> explains what
            is deleted and when.
          </p>
          <p>
            Sections 6, 12, 13, 15, 16, 17, 18, 20 and 23, and any unpaid Fees, survive the end
            of these terms.
          </p>
        </LegalSection>

        <LegalSection title="16. Warranties and disclaimers" id="warranties">
          <p>
            We will provide the Service with reasonable skill and care. You confirm that you
            have the rights and permissions you need for your Customer Content and for the
            Shopper Data you ask us to process.
          </p>
          <p>
            Apart from that, and to the extent the law allows, the Service is provided &ldquo;as
            is&rdquo; and &ldquo;as available&rdquo;. We do not promise that it will be
            uninterrupted or error-free, that it will produce particular sales or conversion
            results, or that every device or browser will support 3D or AR. Nothing in these
            terms takes away rights you have under consumer protection or other law that cannot
            be excluded.
          </p>
        </LegalSection>

        <LegalSection title="17. Liability" id="liability">
          <p>
            Each party&rsquo;s total liability under these terms is limited to the fees you paid
            in the 12 months before the event giving rise to the claim. For breaches of data
            protection or confidentiality obligations the limit is three times that amount.
            These limits do not apply to fraud, wilful misconduct, your obligation to pay fees,
            or your responsibility for your own content and for personal data you had no right
            to give us. Neither party is liable for indirect or consequential loss, or for lost
            profits, except in case of fraud. Nothing in these terms limits liability that the
            law does not allow to be limited.
          </p>
          <p>
            If you use Thridify through the Shopify app, the limits in our{' '}
            <LegalLink href="/shopify-dpa">Shopify Data Processing Addendum</LegalLink> apply to
            data protection claims.
          </p>
        </LegalSection>

        <LegalSection title="18. Indemnities" id="indemnities">
          <p>
            <strong>From you.</strong> You will defend us against any third-party claim, and pay
            the amounts finally awarded or agreed in settlement, arising from your Customer
            Content, your breach of section 8, 9 or 10, or Shopper Data you collected, or asked
            us to process, without a lawful basis or a consent the law requires.
          </p>
          <p>
            <strong>From us.</strong> We will defend you against any third-party claim that the
            Service, as we provide it, infringes that party&rsquo;s intellectual property
            rights, and pay the amounts finally awarded or agreed in settlement. This does not
            cover claims caused by your Customer Content, by third-party products, or by changes
            or combinations we did not make. If such a claim is made or likely, we may change
            the Service so it no longer infringes, get you the right to keep using it, or end
            the affected part and refund prepaid Fees for the unused period.
          </p>
          <p>
            <strong>How claims are handled.</strong> The party asking for protection must tell
            the other promptly, let it control the defence and settlement, and help reasonably
            at the other&rsquo;s cost. No settlement may admit fault for, or impose duties on,
            the protected party without its consent.
          </p>
        </LegalSection>

        <LegalSection title="19. Changes to these terms" id="changes">
          <p>
            We may change these terms. If a change matters to you, we will tell you by email or
            in the product at least 30 days before it takes effect, unless the change is
            required by law sooner. Using Thridify after a change takes effect means you accept
            it. If you do not agree, you can cancel before that date and we will refund any
            prepaid fees for the unused period.
          </p>
        </LegalSection>

        <LegalSection title="20. Governing law and disputes" id="governing-law">
          <p>
            <strong>Customers in India</strong> (your contract is with {INDIA_ENTITY.name}).
            These terms are governed by the laws of India. Any dispute arising out of or in
            connection with them will be finally resolved by arbitration under the Arbitration
            and Conciliation Act, 1996, before a sole arbitrator appointed by agreement between
            us or, if we cannot agree, under that Act. The seat of arbitration is New Delhi and
            the language is English. Subject to that, the courts at Delhi have exclusive
            jurisdiction, including for interim relief.
          </p>
          <p>
            <strong>Customers everywhere else</strong> (your contract is with{' '}
            {CANADA_ENTITY.name}). These terms are governed by the laws of the Province of
            Ontario and the federal laws of Canada that apply there, and the courts of Ontario
            have jurisdiction.
          </p>
          <p>
            This does not affect any mandatory consumer or data protection rights you have
            under the law of the place where you live.
          </p>
        </LegalSection>

        <LegalSection title="21. Notices" id="notices">
          <p>
            We send notices by email to the address on your Account or through the Service.
            Send notices to us at <LegalMail />. Notices to {INDIA_ENTITY.name} can also go by
            post to its registered office at {INDIA_ENTITY.address}, {INDIA_ENTITY.country}; its
            principal place of business is {INDIA_ENTITY.principalPlace}. An email notice
            counts as received on the next working day after it is sent.
          </p>
        </LegalSection>

        <LegalSection title="22. Complaints and grievances" id="grievances">
          <p>
            If you have a complaint about Thridify, about content we host, or about how we
            handle personal data, contact our Grievance Officer, {OFFICER.name}, at{' '}
            <LegalMail />. Our <LegalLink href="/grievance">Grievance Officer</LegalLink> page
            explains the process and how quickly we respond.
          </p>
        </LegalSection>

        <LegalSection title="23. General" id="general">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Whole agreement.</strong> These terms, your Order Forms, the Data
              Processing Addendum and the documents they refer to are the whole agreement
              between us about the Service.
            </li>
            <li>
              <strong>Transfer.</strong> You may not transfer these terms without our written
              consent. We may transfer them to another company in our group, or to a buyer of
              the Thridify business, by telling you.
            </li>
            <li>
              <strong>Events beyond control.</strong> Neither of us is liable for delay or failure
              caused by events beyond its reasonable control, except a failure to pay.
            </li>
            <li>
              <strong>No waiver.</strong> Not enforcing a right straight away does not give it up.
            </li>
            <li>
              <strong>Severability.</strong> If a court finds part of these terms unenforceable,
              the rest stays in force.
            </li>
            <li>
              <strong>No third-party rights.</strong> Only you and we can enforce these terms.
            </li>
            <li>
              <strong>Language.</strong> These terms are written in English. If we give you a
              translation and it differs, the English version applies.
            </li>
          </ul>
        </LegalSection>
      </LegalDocument>
    </>
  );
}
