'use client';

import { useEffect, useLayoutEffect, type ReactNode } from 'react';
import { ScrollTrigger } from './gsap';

/**
 * One per page. Marks the document motion-ready (which lifts the CSS failsafe on the hero art, §8.3),
 * refreshes ScrollTrigger once fonts and first measurements settle, and registers nothing else.
 * Every animation lives in the component it belongs to, inside a scoped useGSAP.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-motion', 'ready');
  }, []);

  useEffect(() => {
    let timer: number | undefined;
    const refresh = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    };
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('load', refresh);
    };
  }, []);

  return <>{children}</>;
}
