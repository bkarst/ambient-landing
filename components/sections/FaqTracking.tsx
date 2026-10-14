'use client';

import { useEffect, useRef } from 'react';
import { track } from '@/lib/analytics';

/** Reports which questions get opened. The FAQ itself needs no JavaScript. */
export function FaqTracking() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const list = ref.current?.closest('[data-faq]');
    if (!list) return;
    const onToggle = (e: Event) => {
      const el = e.target as HTMLDetailsElement;
      if (el.open && el.dataset.faqId) track({ name: 'faq_open', id: el.dataset.faqId });
    };
    list.addEventListener('toggle', onToggle, true);
    return () => list.removeEventListener('toggle', onToggle, true);
  }, []);
  return <span ref={ref} hidden />;
}
