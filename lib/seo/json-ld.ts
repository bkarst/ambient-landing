import type { FAQPage, Organization, SoftwareApplication, WebSite, WithContext } from 'schema-dts';
import { site } from '@/config/site';
import { faq } from '@/content/faq';

export function organizationJsonLd(): WithContext<Organization> {
  const sameAs = Object.values(site.social).filter((v): v is string => typeof v === 'string');
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: `${site.url}/brand/ambiently-mark-512.png`,
    email: site.contact.email,
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function webSiteJsonLd(): WithContext<WebSite> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
    inLanguage: 'en',
  };
}

export function softwareApplicationJsonLd(): WithContext<SoftwareApplication> {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: site.name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: site.description,
    url: site.url,
  };
}

export function faqPageJsonLd(): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.answer },
    })),
  };
}

/** Serialises JSON-LD safely for a native <script type="application/ld+json"> tag. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
