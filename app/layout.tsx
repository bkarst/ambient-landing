import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { site } from '@/config/site';
import { theme } from '@/config/theme';
import { JsonLd } from '@/components/seo/JsonLd';
import { MarkDefs } from '@/components/ds/Logo';
import { organizationJsonLd, webSiteJsonLd } from '@/lib/seo/json-ld';

const inter = localFont({
  src: '../spec/ambiently-design-system/fonts/Inter-Variable-Latin.woff2',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
  preload: true,
  variable: '--font-inter',
  adjustFontFallback: 'Arial',
});

export const ensureStatic = 'navigation';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.seo.title, template: site.seo.titleTemplate },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: site.name,
    locale: site.locale,
    title: site.seo.ogTitle,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: site.seo.ogTitle,
    description: site.description,
    ...(site.seo.twitterHandle ? { site: site.seo.twitterHandle } : {}),
  },
  robots: { index: true, follow: true, googleBot: { 'max-image-preview': 'large', 'max-snippet': -1 } },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  // Dark is the default for every visitor; the toggle updates this meta tag when someone switches.
  themeColor: theme.themeColor.dark,
  colorScheme: 'dark light',
  viewportFit: 'cover',
};

// Applies a remembered appearance before first paint. Runs inline so there is no flash; the CSP allows
// inline scripts on this static page (§13.8). Dark stays the default when nothing is stored.
const appearanceScript = `try{var t=localStorage.getItem(${JSON.stringify(theme.appearance.storageKey)});if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t)}}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.variable} data-theme={theme.appearance.fallback} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: appearanceScript }} />
      </head>
      <body className="amb-page">
        <MarkDefs />
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={webSiteJsonLd()} />
        {children}
      </body>
    </html>
  );
}
