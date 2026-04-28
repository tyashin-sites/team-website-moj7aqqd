import { HeroSplit } from '@/components/sections/HeroSplit';
import { FeaturesList } from '@/components/sections/FeaturesList';
import { CTA } from '@/components/sections/CTA';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WooCommerce Integration',
  description: 'Add 3D and AR capabilities to your WooCommerce store. WordPress plugin with seamless integration.',
  openGraph: {
    title: 'Thridify for WooCommerce | 3D & AR Integration',
    description: 'Add 3D and AR capabilities to your WooCommerce store',
  },
};

export default function WooCommerceIntegrationPage() {
  return (
    <>
      <HeroSplit 
        title="Thridify for WooCommerce"
        subtitle="Add 3D and AR capabilities to your WooCommerce store"
        primaryCTA={{
          text: "Download Plugin",
          url: "#"
        }}
      />
      <FeaturesList 
        title="WooCommerce-Specific Benefits"
        features={[
          {
            title: "WordPress Plugin",
            description: "Native WordPress plugin for seamless integration"
          },
          {
            title: "Custom Product Types",
            description: "Support for configurable and AR-enabled products"
          },
          {
            title: "Performance Optimized",
            description: "Lightweight integration that doesn't slow down your site"
          }
        ]}
      />
      <CTA 
        title="Enhance Your WooCommerce Store"
        primaryCTA={{
          text: "Download Plugin",
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