'use client';

import { useEffect, useRef } from 'react';
import { track } from '@/lib/analytics';

/**
 * Sets `data-scrolled` on the header past 8 px and swaps the header CTA between secondary and primary
 * depending on whether the hero CTA or the form is on screen (§5.2). Observers only; no scroll listener.
 */
export function HeaderController() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const header = ref.current?.closest<HTMLElement>('.site-header');
    if (!header) return;
    const cta = header.querySelector<HTMLAnchorElement>('[data-header-cta]');

    // Scroll sentinel: an 8 px-tall element at the top of the document.
    const sentinel = document.createElement('div');
    sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:8px;pointer-events:none;visibility:hidden';
    document.body.prepend(sentinel);
    const scrolled = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) header.removeAttribute('data-scrolled');
      else header.setAttribute('data-scrolled', '');
    });
    scrolled.observe(sentinel);

    // One primary per view: the hero CTA and the form submit each own their view.
    const owners = Array.from(document.querySelectorAll<HTMLElement>('[data-primary-owner]'));
    const visible = new Set<Element>();
    const apply = () => {
      const primary = visible.size === 0;
      header.setAttribute('data-cta', primary ? 'primary' : 'secondary');
      if (cta) {
        cta.classList.toggle('is-primary', primary);
        cta.classList.toggle('is-secondary', !primary);
      }
    };
    const owner = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        apply();
      },
      { rootMargin: '-56px 0px 0px 0px', threshold: 0.05 },
    );
    owners.forEach((el) => owner.observe(el));
    if (owners.length === 0) apply();

    const onClick = () => track({ name: 'cta_click', location: 'header' });
    cta?.addEventListener('click', onClick);

    return () => {
      scrolled.disconnect();
      owner.disconnect();
      sentinel.remove();
      cta?.removeEventListener('click', onClick);
    };
  }, []);

  return <span ref={ref} hidden />;
}
