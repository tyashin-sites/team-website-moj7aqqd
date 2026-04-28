import { HeroMinimal } from '@/components/sections/HeroMinimal';
import { PricingPlans } from '@/components/sections/PricingPlans';
import { CTA } from '@/components/sections/CTA';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing Plans',
  description: 'Choose the perfect plan for your business. Flexible pricing options for businesses of all sizes.',
  openGraph: {
    title: 'Pricing Plans | Thridify',
    description: 'Flexible pricing options for 3D and AR commerce solutions',
  },
};

export default function PricingPage() {
  return (
    <>
      <HeroMinimal 
        title="Pricing Plans"
        subtitle="Choose the perfect plan for your business needs"
      />
      <PricingPlans />
      <CTA 
        title="Ready to Get Started?"
        subtitle="Join leading brands using 3D and AR technology"
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