import type { Metadata } from 'next';
import { LegalDocument, LegalSection } from '@/components/LegalDocument';
import { SITE_URL } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import {
  GoverningLawClauseHindi,
  LegalLink,
  RegionalEntityBlockHindi,
} from '@/components/LegalEntity';
import { LEGAL_EMAIL } from '@/content/legal/group';

// Website Terms of Use in Hindi (T-0345, 2 November 2026): a full translation
// of /terms (not of the Thridify Platform Terms). Names, emails, URLs and
// statute names stay in English. The document is marked lang="hi"
// (LegalDocument wrapper) because the root layout is English. English
// version: /terms, which prevails if the two differ. Keep the two in step:
// any change to /terms needs the same change here.

const CANONICAL = '/terms/hi';
const MAIL = LEGAL_EMAIL;
const LINK = 'text-primary underline underline-offset-4';

const base = pageMetadata({
  title: 'उपयोग की शर्तें',
  description:
    'Thridify वेबसाइट के उपयोग की शर्तें: स्वीकृति, अनुमत उपयोग, बौद्धिक संपदा, अस्वीकरण, दायित्व की सीमा और लागू कानून।',
  path: CANONICAL,
  image: '/og/default.png',
  ogTitle: 'उपयोग की शर्तें | Thridify',
  ogDescription: 'वे शर्तें जो Thridify वेबसाइट के उपयोग पर लागू होती हैं।',
});

export const metadata: Metadata = {
  ...base,
  alternates: {
    canonical: CANONICAL,
    languages: { en: '/terms', hi: '/terms/hi' },
  },
  openGraph: { ...base.openGraph, locale: 'hi_IN' },
};

function Mail() {
  return (
    <a href={`mailto:${MAIL}`} className={LINK}>
      {MAIL}
    </a>
  );
}

export default function TermsHindiPage() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'उपयोग की शर्तें', item: `${SITE_URL}${CANONICAL}` },
    ],
  };

  return (
    <>
      <JsonLd nodes={[breadcrumbLd]} />

      <LegalDocument
        eyebrow="Thridify"
        title="उपयोग की शर्तें"
        effectiveDate="2 नवंबर 2026"
        lang="hi"
        labels={{ home: 'होम', effectiveDate: 'प्रभावी तिथि:' }}
      >
        <p lang="en" className="text-sm">
          <LegalLink href="/terms" hrefLang="en">
            Read in English
          </LegalLink>
        </p>

        <p className="mt-6">
          यह हिंदी अनुवाद है। किसी अंतर की स्थिति में{' '}
          <LegalLink href="/terms" hrefLang="en">
            अंग्रेज़ी संस्करण
          </LegalLink>{' '}
          मान्य होगा।
        </p>

        <LegalSection title="इन शर्तों की स्वीकृति">
          <RegionalEntityBlockHindi />
          <p>
            इस वेबसाइट पर आकर या इसका उपयोग करके आप उपयोग की इन शर्तों से सहमत होते हैं। अगर आप
            सहमत नहीं हैं, तो कृपया साइट का उपयोग न करें। इन शर्तों को समय-समय पर अपडेट किया जा सकता
            है (नीचे &ldquo;बदलाव&rdquo; देखें); अपडेट के बाद भी उपयोग जारी रखने का अर्थ है कि आप
            बदली हुई शर्तें स्वीकार करते हैं।
          </p>
        </LegalSection>

        <LegalSection title="यह वेबसाइट क्या है">
          <p>
            यह Thridify की मार्केटिंग वेबसाइट है। Thridify हमारा 3D और ऑगमेंटेड रियलिटी कॉमर्स
            प्लेटफ़ॉर्म और 3D मॉडलिंग सेवा है। इस वेबसाइट पर आप प्लेटफ़ॉर्म के बारे में जान सकते हैं,
            इंटरैक्टिव 3D और AR डेमो देख सकते हैं, और डेमो तय करने के लिए हमसे संपर्क कर सकते हैं।
            Thridify खाते, पेड प्लान और सेवाएँ इन शर्तों के अधीन नहीं हैं, बल्कि एक अलग समझौते,{' '}
            <LegalLink href="/legal/platform-terms">
              <span lang="en">Thridify Platform Terms</span>
            </LegalLink>
            , के अधीन हैं।
          </p>
        </LegalSection>

        <LegalSection title="डेमो केवल उदाहरण के लिए हैं, प्रस्ताव नहीं">
          <p>
            इस साइट पर इंटरैक्टिव 3D और AR डेमो यह दिखाने के लिए दिए गए हैं कि प्लेटफ़ॉर्म क्या कर
            सकता है। दिखाए गए नमूना उत्पाद, फ़िनिश, कॉन्फ़िगरेशन और कोई भी कीमत केवल डेमो के लिए हैं,
            उनमें प्लेसहोल्डर एसेट हो सकते हैं, और वे कोई प्रस्ताव, कोटेशन या वादा नहीं हैं। साइट पर
            दिए गए प्रभाव के आँकड़े उन नतीजों का वर्णन करते हैं जो हमारे प्लेटफ़ॉर्म के लिए बताए गए
            हैं, और ये आपके व्यवसाय के लिए नतीजों की गारंटी नहीं हैं।
          </p>
          <p>
            अलग-अलग डिवाइस पर 3D और AR कैसे काम करते हैं, यह हमारे{' '}
            <a href="/device-compatibility" className={LINK}>
              <span lang="en">Device compatibility</span>
            </a>{' '}
            (डिवाइस संगतता) और{' '}
            <a href="/3d-ar-platform-guide" className={LINK}>
              <span lang="en">3D &amp; AR, platform by platform</span>
            </a>{' '}
            पेजों पर बताया गया है। ये पेज सामान्य जानकारी हैं और इन शर्तों का हिस्सा नहीं हैं।
          </p>
        </LegalSection>

        <LegalSection title="स्वीकार्य उपयोग">
          <p>आप इस वेबसाइट का कानूनी तरीके से उपयोग करने के लिए सहमत हैं, और यह भी कि आप:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              साइट या उसकी सुरक्षा को बाधित करने, उस पर ज़रूरत से ज़्यादा बोझ डालने या उसमें दखल देने
              की कोशिश नहीं करेंगे;
            </li>
            <li>बिना अनुमति साइट के किसी हिस्से या उसके डेटा तक पहुँच नहीं बनाएँगे;</li>
            <li>
              इन शर्तों या लागू कानून की अनुमति के अलावा साइट की सामग्री को स्क्रैप, कॉपी या दोबारा
              इस्तेमाल नहीं करेंगे;
            </li>
            <li>
              गलत जानकारी, या किसी दूसरे व्यक्ति की जानकारी उसकी अनुमति के बिना, नहीं भेजेंगे;
            </li>
            <li>
              साइट या संपर्क फ़ॉर्म का उपयोग गैरकानूनी, अधिकारों का उल्लंघन करने वाली या अपमानजनक
              सामग्री भेजने के लिए नहीं करेंगे।
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="बौद्धिक संपदा">
          <p>
            Thridify का नाम, लोगो, वेबसाइट की सामग्री, डिज़ाइन, और 3D तथा AR अनुभव Thridify या उसके
            लाइसेंसदाताओं के स्वामित्व में हैं, और लागू बौद्धिक संपदा कानूनों से सुरक्षित हैं। हमारी
            लिखित अनुमति के बिना आप इनकी नकल, पुनरुत्पादन या वितरण नहीं कर सकते, और न ही इनसे
            व्युत्पन्न कृतियाँ बना सकते हैं। ग्राहक संदर्भ के रूप में दिखाए गए तीसरे पक्ष के ब्रांड नाम
            और लोगो उनके अपने-अपने मालिकों की संपत्ति बने रहते हैं, और केवल पहचान के लिए इस्तेमाल किए
            गए हैं।
          </p>
        </LegalSection>

        <LegalSection title="तीसरे पक्ष के लिंक और सेवाएँ">
          <p>
            यह साइट तीसरे पक्ष की सेवाओं से लिंक करती है, जिनमें डेमो बुक करने के लिए हमारा
            शेड्यूलिंग प्रदाता (Calendly) और हमारी सोशल प्रोफ़ाइल शामिल हैं। उन सेवाओं पर हमारा
            नियंत्रण नहीं है, और हम उनकी सामग्री, उपलब्धता या गोपनीयता व्यवहार के लिए ज़िम्मेदार नहीं
            हैं। उनका उपयोग उनकी अपनी शर्तों के अधीन है।
          </p>
        </LegalSection>

        <LegalSection title="अस्वीकरण और वारंटी">
          <p>
            यह वेबसाइट &ldquo;जैसी है&rdquo; (<span lang="en">as is</span>) और &ldquo;जैसी उपलब्ध
            है&rdquo; (<span lang="en">as available</span>) के आधार पर दी जाती है। हम जानकारी को
            सही और साइट को उपलब्ध रखने का प्रयास करते हैं, लेकिन कानून जिस हद तक अनुमति देता है, उस
            हद तक हम कोई भी स्पष्ट या निहित वारंटी नहीं देते कि साइट त्रुटि-रहित, बिना रुकावट,
            सुरक्षित या किसी खास उद्देश्य के लिए उपयुक्त होगी। इस साइट पर कुछ भी बाध्यकारी वादा या
            पेशेवर सलाह नहीं है।
          </p>
        </LegalSection>

        <LegalSection title="दायित्व की सीमा">
          <p>
            कानून जिस हद तक अनुमति देता है, उस हद तक इस वेबसाइट के उपयोग से, या इसका उपयोग न कर पाने
            से होने वाले किसी भी अप्रत्यक्ष, आकस्मिक, विशेष या परिणामी नुकसान के लिए, या मुनाफ़े, डेटा
            या साख के नुकसान के लिए, Thridify और उसके कर्मी उत्तरदायी नहीं हैं। इन शर्तों में कुछ भी
            ऐसे किसी दायित्व को सीमित या बाहर नहीं करता जिसे लागू कानून के तहत सीमित या बाहर नहीं किया
            जा सकता।
          </p>
        </LegalSection>

        <LegalSection title="लागू कानून और विवाद">
          <GoverningLawClauseHindi />
          <p>
            Thridify प्लेटफ़ॉर्म से जुड़े विवाद{' '}
            <LegalLink href="/legal/platform-terms#governing-law">
              <span lang="en">Thridify Platform Terms</span>
            </LegalLink>{' '}
            के अनुसार सुलझाए जाते हैं।
          </p>
          <p>
            इससे आपके निवास के देश के कानूनों के तहत आपको मिलने वाले किसी भी अनिवार्य उपभोक्ता या
            डेटा संरक्षण अधिकार पर कोई असर नहीं पड़ता।
          </p>
        </LegalSection>

        <LegalSection title="पब्लिक मटीरियल लाइब्रेरी">
          <p>
            जो ब्रांड Thridify <span lang="en">Public Material Library</span> में मटीरियल प्रकाशित
            करते हैं, और उनका उपयोग करने वाला हर खाता,{' '}
            <a href="/legal/public-material-contribution-agreement" className={LINK}>
              <span lang="en">Public Material Contribution Agreement and Public Material Licence</span>
            </a>{' '}
            से भी बंधे हैं। उन मटीरियल के लिए वह समझौता इन शर्तों पर प्रभावी होगा।
          </p>
        </LegalSection>

        <LegalSection title="बदलाव और संपर्क">
          <p>
            हम समय-समय पर इन शर्तों को अपडेट कर सकते हैं; ऊपर दी गई प्रभावी तिथि बताती है कि इन्हें
            पिछली बार कब बदला गया। इन शर्तों के बारे में किसी भी सवाल के लिए <Mail /> पर ईमेल करें।
          </p>
        </LegalSection>
      </LegalDocument>
    </>
  );
}
