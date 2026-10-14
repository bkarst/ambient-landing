import { color } from './tokens.generated';

export const theme = {
  appearance: {
    follow: 'none', // Ben, Oct 13, 2026: dark is the default for everyone, not the system setting
    fallback: 'dark', // the brand's own appearance
    allowToggle: true, // a header toggle; the choice is kept in localStorage, never a cookie (keeps the route static)
    storageKey: 'ambiently-theme',
  },
  themeColor: { dark: color.surface.dark, light: color.surface.light },
  logoInk: { dark: 'gold', light: 'gold' },
  heroArtInk: { dark: 'accent', light: 'gold' },
  breakpoints: { regular: 768, wide: 1280 },
  layout: { maxWidth: 1200, measure: 640, gutter: { compact: 20, regular: 32 } },
  motion: {
    ease: [0.2, 0.8, 0.2, 1],
    duration: { colour: 0.12, toggle: 0.16, ring: 0.4, reveal: 0.6, draw: 0.9, count: 0.8, hero: 1.0 },
    stagger: { items: 0.06, bars: 0.03, dots: 0.9 /* total, not each */ },
    distance: { reveal: 16, card: 24 },
    marquee: { pxPerSecond: 36, slowTo: 0, slowDuration: 0.4 },
    debugParam: 'motion',
  },
} as const;

export type Theme = typeof theme;
