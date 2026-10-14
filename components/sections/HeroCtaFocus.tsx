'use client';

import { useEffect } from 'react';
import { track } from '@/lib/analytics';

/**
 * Every "Request access" link on the page scrolls to the form and moves focus to its first field (§6.2, §6.13).
 * Native anchor behaviour stays as the fallback; this only adds focus management and analytics.
 */
export function HeroCtaFocus() {
  useEffect(() => {
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href="#request-access"], a[href="#dashboards"]'));
    const onClick = (e: MouseEvent) => {
      const a = e.currentTarget as HTMLAnchorElement;
      track({ name: 'cta_click', location: a.dataset.cta ?? a.closest('footer') ? 'footer' : 'hero' });
      if (a.getAttribute('href') !== '#request-access') return;
      const field = document.querySelector<HTMLInputElement>('#request-access input[name="email"]');
      if (!field) return;
      // Let the native anchor scroll happen, then move focus without a second jump.
      window.setTimeout(() => field.focus({ preventScroll: true }), 350);
    };
    links.forEach((a) => a.addEventListener('click', onClick));
    return () => links.forEach((a) => a.removeEventListener('click', onClick));
  }, []);
  return null;
}
