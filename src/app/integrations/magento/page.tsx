import { HeroSplit } from '@/components/sections/HeroSplit';
import { FeaturesList } from '@/components/sections/FeaturesList';
import { CTA } from '@/components/sections/CTA';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Magento Integration',
  description: 'Powerful 3D and AR integration for Magento stores. Custom module with advanced configuration options.',
  openGraph: {
    title: 'Thridify for Magento | 3D & AR Integration',
    description: 'Powerful 3D and AR integration for Magento stores',
  },
};

export default function MagentoIntegrationPage() {
  return (
    <>
      <HeroSplit 
        title="Thridify for Magento"
        subtitle="Powerful 3D and AR integration for your Magento store"
        primaryCTA={{
          text: "Download Module",
          url: "#"
        }}
      />
      <FeaturesList 
        title="Magento-Specific Benefits"
        features={[
          {
            title: "Custom Module",
            description: "Native Magento module with advanced configuration"
          },
          {
            title: "Multi-Website Support",
            description: "Manage 3D content across multiple Magento websites"
          },
          {
            title: "Advanced Caching",
            description: "Optimized for Magento's caching and indexing systems"
          }
        ]}
      />
      <CTA 
        title="Enhance Your Magento Store"
        primaryCTA={{
          text: "Download Module",
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