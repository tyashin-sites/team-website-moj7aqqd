import { HeroSplit } from '@/components/sections/HeroSplit';
import { FeaturesList } from '@/components/sections/FeaturesList';
import { CTA } from '@/components/sections/CTA';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Doors & Windows Industry Solutions',
  description: 'AR experiences for architectural products. Help customers visualize doors and windows in their buildings.',
  openGraph: {
    title: 'Doors & Windows | Thridify AR Solutions',
    description: 'AR experiences specifically for doors and windows industry',
  },
};

export default function DoorsWindowsIndustryPage() {
  return (
    <>
      <HeroSplit 
        title="AR for Doors & Windows"
        subtitle="Help customers visualize architectural products in their buildings with AR technology"
        primaryCTA={{
          text: "Book a Demo",
          url: "https://calendly.com/thridify"
        }}
      />
      <FeaturesList 
        title="Architectural Product Features"
        features={[
          {
            title: "Building Integration",
            description: "See how doors and windows fit into existing architecture"
          },
          {
            title: "Style Configurator",
            description: "Choose from different frames, glass types, and hardware"
          },
          {
            title: "Measurement Tools",
            description: "Accurate sizing and fitting for construction projects"
          },
          {
            title: "Energy Efficiency",
            description: "Visualize energy ratings and performance metrics"
          }
        ]}
      />
      <CTA 
        title="Modernize Your Building Products Business"
        primaryCTA={{
          text: "Book a Demo",
          url: "https://calendly.com/thridify"
        }}
        secondaryCTA={{
          text: "Contact Sales",
          url: "/contact"
        }}
      />
    </>
  );
}