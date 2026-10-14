'use client';

import { useRef, type CSSProperties, type ReactNode } from 'react';
import { SplitText } from 'gsap/SplitText';
import { gsap, useGSAP, ScrollTrigger, motionOff } from './gsap';

gsap.registerPlugin(SplitText);

/** The footer tagline (§8.4): words rise in once, then the split is reverted so the DOM is clean. */
export function SplitWords({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || motionOff() || ScrollTrigger.isInViewport(el)) return;
      const split = SplitText.create(el, { type: 'words', aria: 'auto' });
      gsap.set(split.words, { opacity: 0, y: 12 });
      gsap.to(split.words, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.04,
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        onComplete: () => split.revert(),
      });
    },
    { scope: ref },
  );

  return (
    <p ref={ref} className={className} style={style}>
      {children}
    </p>
  );
}
