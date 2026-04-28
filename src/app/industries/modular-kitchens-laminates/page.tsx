import { HeroSplit } from '@/components/sections/HeroSplit';
import { FeaturesList } from '@/components/sections/FeaturesList';
import { CTA } from '@/components/sections/CTA';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Modular Kitchens & Laminates Solutions',
  description: 'Interactive kitchen configurators and laminate visualization. Design complete kitchens with 3D technology.',
  openGraph: {
    title: 'Modular Kitchens & Laminates | Thridify 3D Solutions',
    description: 'Interactive kitchen configurators and laminate visualization solutions',
  },
};

export default function ModularKitchensLaminatesPage() {
  return (
    <>
      <HeroSplit 
        title="3D Kitchen & Laminate Configurators"
        subtitle="Design complete kitchens and visualize laminates with interactive 3D technology"
        primaryCTA={{
          text: "Book a Demo",
          url: "https://calendly.com/thridify"
        }}
      />
      <FeaturesList 
        title="Kitchen & Laminate Features"
        features={[
          {
            title: "Complete Kitchen Design",
            description: "Design entire kitchens with cabinets, countertops, and appliances"
          },
          {
            title: "Laminate Library",
            description: "Extensive collection of laminate patterns and textures"
          },
          {
            title: "Layout Optimization",
            description: "AI-powered suggestions for optimal kitchen layouts"
          },
          {
            title: "Cost Calculator",
            description: "Real-time pricing for complete kitchen configurations"
          }
        ]}
      />
      <CTA 
        title="Revolutionize Kitchen Design"
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