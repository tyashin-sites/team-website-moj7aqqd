'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface NavItem { label: string; href: string }

export function MobileNav({ nav, ctaText, ctaHref }: { nav: NavItem[]; ctaText: string; ctaHref: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <button
        aria-label="Toggle menu"
        onClick={() => setOpen(o => !o)}
        className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-border"
      >
        <span className="relative block w-5 h-3">
          <span className={`absolute left-0 top-0 w-full h-px bg-foreground transition-transform ${open ? 'translate-y-1.5 rotate-45' : ''}`} />
          <span className={`absolute left-0 bottom-0 w-full h-px bg-foreground transition-transform ${open ? '-translate-y-1.5 -rotate-45' : ''}`} />
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-40 md:hidden bg-background/95 backdrop-blur-xl pt-24 px-6">
          <nav className="flex flex-col gap-1">
            {nav.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-4 text-3xl font-heading font-semibold tracking-tight border-b border-border/40"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={ctaHref}
              onClick={() => setOpen(false)}
              className="btn btn-primary mt-8 self-start"
            >
              {ctaText}
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
