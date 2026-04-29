import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { Stats } from '@/components/sections/Stats';
import { Industries } from '@/components/sections/Industries';
import { Testimonials } from '@/components/sections/Testimonials';
import { Clients } from '@/components/sections/Clients';
import { GlobalOffices } from '@/components/sections/GlobalOffices';
import { CTA } from '@/components/sections/CTA';
import siteData from '../../content/site.json';

export const metadata: Metadata = {
  title: 'Reimagine how the world experiences your products',
  description: 'Transform e-commerce with immersive 3D viewers and AR technology. Boost conversions, reduce returns, and cut photography costs with our no-code platform.',
};

export default function HomePage() {
  const { pages } = siteData;
  const homeData = pages.home;

  return (
    <div className="overflow-hidden">
      <Hero data={homeData.hero} />
      <Features data={homeData.features} />
      <Stats data={homeData.stats} />
      <Industries data={homeData.industries} />
      <Testimonials data={homeData.testimonials} />
      <Clients data={homeData.clients} />
      <GlobalOffices data={homeData.globalOffices} />
      <CTA data={homeData.cta} />
    </div>
  );
}