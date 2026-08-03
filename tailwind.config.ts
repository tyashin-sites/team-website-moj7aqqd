import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Canonical Thridify palette per DESIGN-SPEC §1 — values flow from
        // the --brand-* custom properties (locally pinned in layout/globals).
        primary: 'var(--brand-primary)',
        'primary-deep': 'var(--brand-primary-deep)',
        'primary-soft': 'var(--brand-primary-soft)',
        'primary-contrast': 'var(--brand-primary-contrast)',
        accent: 'var(--brand-accent)',
        ink: 'var(--brand-ink)',
        paper: 'var(--brand-bg)',
        tint: 'var(--brand-surface)',
        background: 'var(--brand-bg)',
        surface: 'var(--brand-surface)',
        foreground: 'var(--brand-text)',
        muted: 'var(--brand-text-muted)',
        'muted-dark': 'var(--brand-muted-dark)',
        border: 'var(--brand-border)',
      },
      borderRadius: {
        sm: 'var(--brand-radius-sm)',
        md: 'var(--brand-radius-md)',
        lg: 'var(--brand-radius-lg)',
        full: 'var(--brand-radius-full)',
      },
      fontFamily: {
        heading: ['var(--brand-heading-font)'],
        body: ['var(--brand-body-font)'],
        mono: ['var(--brand-mono-font)'],
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
} satisfies Config;
