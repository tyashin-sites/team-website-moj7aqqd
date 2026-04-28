import { HeroSplit } from '@/components/sections/HeroSplit';
import { FeaturesList } from '@/components/sections/FeaturesList';
import { CTA } from '@/components/sections/CTA';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopify Integration',
  description: 'Seamlessly integrate 3D and AR into your Shopify store. Easy installation and theme compatibility.',
  openGraph: {
    title: 'Thridify for Shopify | 3D & AR Integration',
    description: 'Seamlessly integrate 3D and AR into your Shopify store',
  },
};

export default function ShopifyIntegrationPage() {
  return (
    <>
      <HeroSplit 
        title="Thridify for Shopify"
        subtitle="Seamlessly integrate 3D and AR into your Shopify store"
        primaryCTA={{
          text: "Install Now",
          url: "#"
        }}
      />
      <FeaturesList 
        title="Shopify-Specific Benefits"
        features={[
          {
            title: "Easy Installation",
            description: "One-click installation from Shopify App Store"
          },
          {
            title: "Theme Compatibility",
            description: "Works with all Shopify themes"
          },
          {
            title: "Analytics Integration",
            description: "Track 3D and AR engagement metrics"
          }
        ]}
      />
      <CTA 
        title="Ready to Transform Your Shopify Store?"
        primaryCTA={{
          text: "Install Now",
          url: "#"
        }}
        secondaryCTA={{
          text: "Book a Demo",
          url: "https://calendly.com/thridify"
        }}
      />
    </>
  );
}