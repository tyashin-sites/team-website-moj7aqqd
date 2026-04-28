import { HeroSplit } from '@/components/sections/HeroSplit';
import { FeaturesList } from '@/components/sections/FeaturesList';
import { CTA } from '@/components/sections/CTA';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '3D Product Configurator',
  description: 'Let customers customize products in real-time with instant 3D visualization. Boost engagement and reduce returns.',
  openGraph: {
    title: '3D Product Configurator | Thridify',
    description: 'Real-time product customization with instant 3D visualization',
  },
};

export default function ConfiguratorPage() {
  return (
    <>
      <HeroSplit 
        title="3D Product Configurator"
        subtitle="Let customers customize products in real-time with instant 3D visualization"
        primaryCTA={{
          text: "Book a Demo",
          url: "https://calendly.com/thridify"
        }}
      />
      <FeaturesList 
        title="Powerful Configuration Features"
        features={[
          {
            title: "Real-time Customization",
            description: "Instant updates as customers modify products"
          },
          {
            title: "Material Library",
            description: "Extensive collection of textures and finishes"
          },
          {
            title: "Pricing Integration",
            description: "Dynamic pricing based on configurations"
          }
        ]}
      />
      <CTA 
        title="Ready to Get Started?"
        primaryCTA={{
          text: "Book a Demo",
          url: "https://calendly.com/thridify"
        }}
      />
    </>
  );
}