import { Plus_Jakarta_Sans } from 'next/font/google';

// Plus Jakarta Sans — friendly geometric sans, used for both body and headings
// to match Thridify's design DNA (the warm-pink + forest-green direction from
// thri-beauty-theme.lovable.app). One font family, different weights.

export const bodyFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

export const headingFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
});
