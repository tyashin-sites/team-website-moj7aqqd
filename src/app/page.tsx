import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { Stats } from '@/components/sections/Stats';
import { Testimonials } from '@/components/sections/Testimonials';
import { Services } from '@/components/sections/Services';
import { Clients } from '@/components/sections/Clients';
import { CTA } from '@/components/sections/CTA';
import { getFeaturedProducts, getStoreInfo } from '@/lib/tyashin';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reimagine how the world experiences your products',
  description: 'Transform your e-commerce with 3D product visualization and AR technology that reduces returns and boosts conversions',
  openGraph: {
    title: 'Thridify - Reimagine how the world experiences your products',
    description: 'Transform your e-commerce with 3D product visualization and AR technology',
  },
};

export default async function HomePage() {
  // Fetch featured products for potential display
  let featuredProducts = [];
  try {
    const { products } = await getFeaturedProducts();
    featuredProducts = products;
  } catch (error) {
    console.error('Failed to fetch featured products:', error);
  }

  return (
    <>
      <Hero />
      <Features />
      <Stats />
      <Testimonials />
      <Services />
      <Clients />
      <CTA />
    </>
  );
}