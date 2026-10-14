'use client';

import { useRef } from 'react';
import { LOGO_DOTS } from '@/components/ds/logo-dots';
import { gsap, useGSAP, motion, motionOff } from './gsap';

/**
 * The mark's 325 dots as imagery behind the hero receipt (§6.2). Ink follows `theme.heroArtInk`:
 * accent on dark, gold on light, through CSS custom properties so the appearance can switch live.
 * On load the dots scale in from the centre (the data is already ordered centre-out); as the hero
 * leaves, the group drifts up and fades (§8.4).
 */
export function HalftoneSun({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const circles = [];
  for (let i = 0; i < LOGO_DOTS.length; i += 3) {
    circles.push(<circle key={i} cx={LOGO_DOTS[i]} cy={LOGO_DOTS[i + 1]} r={LOGO_DOTS[i + 2]} />);
  }

  useGSAP(
    () => {
      const svg = ref.current;
      if (!svg) return;
      if (motionOff()) {
        gsap.set(svg, { opacity: 1 });
        return;
      }
      const dots = svg.querySelectorAll('circle');
      gsap.set(svg, { opacity: 1 });
      gsap.set(dots, { scale: 0, transformOrigin: 'center center' });
      gsap.to(dots, {
        scale: 1,
        duration: motion.duration.hero,
        ease: 'amb-out',
        stagger: { each: motion.stagger.dots / dots.length },
        clearProps: 'transform',
      });
      const hero = svg.closest('.hero');
      if (hero) {
        gsap.to(svg.querySelector('g'), {
          y: -24,
          opacity: 0.6,
          ease: 'none',
          scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
        });
      }
    },
    { scope: ref },
  );

  return (
    <svg ref={ref} className={className} viewBox="0 0 1000 1000" aria-hidden="true" focusable="false" style={{ fill: 'var(--hero-art-ink)' }}>
      <g>{circles}</g>
    </svg>
  );
}
