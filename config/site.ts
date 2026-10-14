import type { SiteConfig } from './types';

function resolveSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv) return fromEnv.replace(/\/$/, '');
  if (process.env.NODE_ENV === 'production') {
    throw new Error('NEXT_PUBLIC_SITE_URL is required in production (see .env.example).');
  }
  return 'http://localhost:3000';
}

export const site = {
  name: 'Ambiently',
  legalName: 'Ambiently, Inc.', // [Verify]
  url: resolveSiteUrl(),
  locale: 'en_US',
  category: 'AI spend tracking',

  description:
    'Ambiently tracks AI token spend across Anthropic, OpenAI, Cursor, GitHub and Microsoft, ' +
    'and ties every dollar to the person, team and task behind it.',

  taglines: {
    hero: 'AI tokens are money. You want receipts, right?',
    footer: 'Do you know what tasks are your employees using AI for?',
    brand: 'Real-world insights. Quieter.',
  },

  cta: {
    primary: { label: 'Request access', href: '#request-access' },
    secondary: { label: 'See the dashboards', href: '#dashboards' },
  },

  nav: [
    { label: 'Dashboards', href: '#dashboards' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Integrations', href: '#integrations' },
    { label: 'FAQ', href: '#faq' },
  ],

  seo: {
    title: 'Ambiently — AI spend tracking with receipts for every token',
    titleTemplate: '%s · Ambiently',
    ogTitle: 'AI tokens are money. You want receipts, right?',
    ogImageAlt: 'Ambiently: AI tokens are money. You want receipts, right?',
    twitterHandle: undefined as string | undefined, // [Verify]
  },

  // Order is the marquee order. `roles` drives the How-it-works diagram and the FAQ:
  // 'spend' = where tokens are bought, 'context' = where the work is tracked. GitHub is both.
  integrations: [
    { id: 'anthropic', name: 'Anthropic', roles: ['spend'], products: ['Claude Code', 'Claude API'] },
    { id: 'microsoft', name: 'Microsoft', roles: ['spend'], products: ['Azure OpenAI', 'Microsoft Copilot'] },
    { id: 'cursor', name: 'Cursor', roles: ['spend'], products: ['Cursor'] },
    { id: 'openai', name: 'OpenAI', roles: ['spend'], products: ['Codex', 'OpenAI API'] },
    { id: 'github', name: 'GitHub', roles: ['spend', 'context'], products: ['GitHub Copilot', 'pull requests, CI and deployments'] },
    { id: 'jira', name: 'Jira', roles: ['context'], products: ['Jira'] },
    { id: 'monday', name: 'monday.com', roles: ['context'], products: ['monday.com'] },
    { id: 'notion', name: 'Notion', roles: ['context'], products: ['Notion'] },
  ],

  contact: { email: 'hello@ambiently.example' }, // [Verify]
  social: {} as Partial<Record<'linkedin' | 'x' | 'github', string>>,
  legal: { privacyHref: '/privacy', termsHref: '/terms' },
  form: { captcha: false },
  analytics: { provider: 'none' as 'none' | 'vercel' | 'plausible' },
} as const satisfies SiteConfig;

export type Site = typeof site;
export type IntegrationId = Site['integrations'][number]['id'];

/** "Anthropic, Microsoft, Cursor, OpenAI, GitHub, Jira, monday.com and Notion" */
export function listNames(names: readonly string[]): string {
  if (names.length <= 1) return names.join('');
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
}

export const integrationNames = listNames(site.integrations.map((i) => i.name));
export const spendIntegrations = site.integrations.filter((i) => (i.roles as readonly string[]).includes('spend'));
export const contextIntegrations = site.integrations.filter((i) => (i.roles as readonly string[]).includes('context'));
