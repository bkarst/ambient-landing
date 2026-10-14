import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { lastModified } from '@/content/meta';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, lastModified: lastModified.home, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}${site.legal.privacyHref}`, lastModified: lastModified.privacy, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${site.url}${site.legal.termsHref}`, lastModified: lastModified.terms, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
