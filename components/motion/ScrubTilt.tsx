'use client';

import { useRef, type ReactNode } from 'react';
import { gsap, useGSAP, isWide, motionOff } from './gsap';

/** The product-shot settle (§8.4): a scrubbed 8° tilt and 0.94 scale as the frame scrolls in. Wide and regular only. */
export function ScrubTilt({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || motionOff() || !isWide()) return;
      gsap.fromTo(
        el,
        { rotateX: 8, scale: 0.94, transformPerspective: 1200, transformOrigin: '50% 0%' },
        {
          rotateX: 0,
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 100%', end: 'top 40%', scrub: true },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
