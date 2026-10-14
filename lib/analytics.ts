import { site } from '@/config/site';

export type AnalyticsEvent =
  | { name: 'cta_click'; location: string }
  | { name: 'form_start' }
  | { name: 'form_submit' }
  | { name: 'form_success' }
  | { name: 'form_error'; kind: string }
  | { name: 'lens_change'; lens: string }
  | { name: 'chart_range_change'; chart: string; range: string }
  | { name: 'marquee_pause' }
  | { name: 'faq_open'; id: string };

type Props = Record<string, string | number | boolean>;

/** Cookieless events, no PII. A no-op until `site.analytics.provider` names a provider. */
export function track(event: AnalyticsEvent): void {
  if (typeof window === 'undefined') return;
  const { name, ...props } = event;
  const provider = site.analytics.provider;
  const w = window as Window & { va?: (kind: 'event', payload: { name: string; data?: Props }) => void; plausible?: (name: string, opts?: { props?: Props }) => void };
  if (provider === 'vercel' && typeof w.va === 'function') w.va('event', { name, data: props as Props });
  else if (provider === 'plausible' && typeof w.plausible === 'function') w.plausible(name, { props: props as Props });
}
