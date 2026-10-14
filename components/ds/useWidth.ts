'use client';

import { useLayoutEffect, useRef, useState, type RefObject } from 'react';

/** Measures the chart container after mount and on resize; renders at `fallback` first (SSR and first paint). */
export function useWidth(fallback: number): [RefObject<HTMLDivElement | null>, number] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(fallback);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    function measure() {
      if (!el) return;
      const w = el.getBoundingClientRect().width;
      setWidth((prev) => (w && Math.abs(w - prev) > 0.5 ? w : prev));
    }
    measure();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, width];
}
