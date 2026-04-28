import { HeroMinimal } from '@/components/sections/HeroMinimal';
import { FAQ } from '@/components/sections/FAQ';

export default function FAQPage() {
  return (
    <>
      <HeroMinimal
        title="Frequently Asked Questions"
        description="Find answers to common questions about Thridify's 3D and AR commerce solutions"
      />
      <FAQ />
    </>
  );
}