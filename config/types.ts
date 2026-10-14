export type IntegrationRole = 'spend' | 'context';

export interface Integration {
  id: 'anthropic' | 'microsoft' | 'cursor' | 'openai' | 'github' | 'jira' | 'monday' | 'notion';
  name: string;
  roles: readonly IntegrationRole[];
  products: readonly string[];
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  legalName: string;
  url: string;
  locale: string;
  category: string;
  description: string;
  taglines: { hero: string; footer: string; brand: string };
  cta: { primary: NavLink; secondary: NavLink };
  nav: readonly NavLink[];
  seo: {
    title: string;
    titleTemplate: string;
    ogTitle: string;
    ogImageAlt: string;
    twitterHandle: string | undefined;
  };
  integrations: readonly Integration[];
  contact: { email: string };
  social: Partial<Record<'linkedin' | 'x' | 'github', string>>;
  legal: { privacyHref: string; termsHref: string };
  form: { captcha: boolean };
  analytics: { provider: 'none' | 'vercel' | 'plausible' };
}
