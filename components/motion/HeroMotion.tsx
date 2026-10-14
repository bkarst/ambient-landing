'use client';

import { useRef, type ReactNode } from 'react';
import { gsap, useGSAP, motion, motionOff } from './gsap';
import { countNodes } from './CountUp';

/**
 * The hero receipt choreography (§8.4): 0.2 s after the sun starts, rows reveal top to bottom with a
 * clip-path, each amount counts from zero, then the total counts and the delta fades in last.
 * The h1, lede and buttons are never touched (§8.3).
 */
export function HeroMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const rows = gsap.utils.selector(root)('.receipt-row');
      const total = root.querySelector<HTMLElement>('[data-receipt-total]');
      const delta = root.querySelector<HTMLElement>('[data-receipt-delta]');
      if (motionOff()) {
        gsap.set(rows, { opacity: 1 });
        return;
      }
      const tl = gsap.timeline({ delay: 0.2, defaults: { ease: 'amb-out' } });
      gsap.set(rows, { opacity: 1, clipPath: 'inset(0 0 100% 0)' });
      if (delta) gsap.set(delta, { opacity: 0 });
      tl.to(rows, { clipPath: 'inset(0 0 0% 0)', duration: 0.5, stagger: 0.08, clearProps: 'clipPath' }, 0);
      const lineTweens = countNodes(root.querySelector('[data-receipt-lines]') ?? root, 0.6, 0.08);
      lineTweens.forEach((t, i) => tl.add(t.play(), 0.1 + i * 0.08));
      if (total) {
        const totalTweens = countNodes(total, motion.duration.count);
        totalTweens.forEach((t) => tl.add(t.play(), '>-0.2'));
      }
      if (delta) tl.to(delta, { opacity: 1, duration: 0.3 }, '>-0.1');
    },
    { scope: ref },
  );

  return <div ref={ref}>{children}</div>;
}
