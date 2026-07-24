'use client';

/**
 * MobileCtaBar — DESIGN-SPEC §9: sticky bottom "Book a Demo" bar on mobile,
 * appearing once the visitor has scrolled 50% of the page. Mobile-only
 * (hidden md+), single Calendly CTA (the one primary CTA sitewide).
 * Slide-up is a CSS transition — killed by the reduced-motion block.
 */

import { useEffect, useState } from 'react';

const CALENDLY_URL = 'https://calendly.com/hello-thridify/30min';

export function MobileCtaBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      setShow(scrollable > 0 && window.scrollY / scrollable >= 0.5);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      className={`md:hidden fixed bottom-0 inset-x-0 z-40 transition-transform duration-300 ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-hidden={!show}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="bg-ink/95 backdrop-blur border-t border-paper/15 px-4 py-3">
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={show ? 0 : -1}
          className="btn btn-primary w-full justify-center py-3.5 text-base"
        >
          Book a Demo
        </a>
      </div>
    </div>
  );
}
