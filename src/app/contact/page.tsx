import { HeroMinimal } from '@/components/sections/HeroMinimal';
import { ContactForm } from '@/components/sections/ContactForm';
import { ContactInfo } from '@/components/sections/ContactInfo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with our team. Book a demo or ask questions about our 3D and AR commerce solutions.',
  openGraph: {
    title: 'Contact Us | Thridify',
    description: 'Get in touch with our team for 3D and AR commerce solutions',
  },
};

export default function ContactPage() {
  return (
    <>
      <HeroMinimal 
        title="Contact Us"
        subtitle="Get in touch with our team to transform your commerce experience"
      />
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </div>
    </>
  );
}