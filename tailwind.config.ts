import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--brand-primary)',
        'primary-contrast': 'var(--brand-primary-contrast)',
        secondary: 'var(--brand-primary)',
        accent: 'var(--brand-accent)',
        background: 'var(--brand-bg)',
        foreground: 'var(--brand-text)',
        muted: 'var(--brand-text-muted)',
        surface: 'var(--brand-surface)',
        border: 'var(--brand-border)',
        'primary-foreground': 'var(--brand-primary-contrast)',
        'secondary-foreground': 'var(--brand-primary-contrast)',
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
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
