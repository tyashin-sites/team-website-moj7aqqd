import { HeroSplit } from '@/components/sections/HeroSplit';
import { FeaturesList } from '@/components/sections/FeaturesList';
import { CTA } from '@/components/sections/CTA';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BigCommerce Integration',
  description: 'Integrate 3D and AR technology with your BigCommerce store. Enterprise-grade solution for growing businesses.',
  openGraph: {
    title: 'Thridify for BigCommerce | 3D & AR Integration',
    description: 'Enterprise-grade 3D and AR integration for BigCommerce',
  },
};

export default function BigCommerceIntegrationPage() {
  return (
    <>
      <HeroSplit 
        title="Thridify for BigCommerce"
        subtitle="Enterprise-grade 3D and AR integration for your BigCommerce store"
        primaryCTA={{
          text: "Install App",
          url: "#"
        }}
      />
      <FeaturesList 
        title="BigCommerce-Specific Benefits"
        features={[
          {
            title: "Enterprise Ready",
            description: "Built for high-volume, enterprise BigCommerce stores"
          },
          {
            title: "API Integration",
            description: "Deep integration with BigCommerce APIs and webhooks"
          },
          {
            title: "Multi-Store Support",
            description: "Manage 3D assets across multiple BigCommerce stores"
          }
        ]}
      />
      <CTA 
        title="Scale Your BigCommerce Store"
        primaryCTA={{
          text: "Install App",
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