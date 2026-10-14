'use client';

import { useRef, type CSSProperties, type ReactNode } from 'react';
import { gsap, useGSAP, ScrollTrigger, motion, motionOff } from './gsap';
import { renderCount, type CountMode } from './CountUp';
import { REVEAL_EVENT } from '@/components/mui/Ring';

interface ChartRevealProps {
  children: ReactNode;
  /** Viewport line that starts the sequence */
  start?: string;
  /** Also lift the wrapper 24 px like a card (§8.4) */
  card?: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * Plays the design-system chart choreography once when a visual enters view (§8.4):
 * stat tiles count → lines draw → area wash → end dots and labels → bars grow → rings fill.
 * The charts themselves hold no animation code; GSAP targets their class names inside this scope.
 */
export function ChartReveal({ children, start = 'top 80%', card = false, className, style }: ChartRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || motionOff()) return;
      if (ScrollTrigger.isInViewport(root, 0.05)) {
        root.dispatchEvent(new CustomEvent(REVEAL_EVENT, { detail: { instant: true } }));
        return;
      }

      // Selectors cover both the ported SVG charts (.amb-*) and the MUI X charts (.Mui*) inside the scope.
      const q = gsap.utils.selector(root);
      const lines = q('.amb-line, .amb-chart .MuiLineChart-line');
      const areas = q('.amb-area');
      const muiAreas = q('.amb-chart .MuiLineChart-area');
      const ends = q('.amb-end-dot, .amb-end-label');
      const vBars = q('.amb-chart:not([data-horizontal]) .amb-bar, .amb-chart:not([data-horizontal]) .MuiBarChart-element');
      const hBars = q('.amb-chart[data-horizontal] .amb-bar, .amb-chart[data-horizontal] .MuiBarChart-element');
      const barLabels = q('.amb-bar-label, .MuiBarChart-label');
      const rings = q('.amb-ring-fill');
      const sparks = q('.amb-spark-line, .amb-spark .MuiLineChart-line');
      const sparkWash = q('.amb-spark .MuiLineChart-area, .amb-spark .amb-spark-dot');
      const counters = q<HTMLElement>('[data-count]');

      const tl = gsap.timeline({ paused: true, defaults: { ease: 'amb-out' } });
      if (card) {
        gsap.set(root, { opacity: 0, y: motion.distance.card });
        tl.to(root, { opacity: 1, y: 0, duration: motion.duration.reveal, clearProps: 'transform' }, 0);
      }
      if (lines.length) {
        gsap.set(lines, { drawSVG: '0%' });
        tl.to(lines, { drawSVG: '100%', duration: motion.duration.draw, stagger: 0.08 }, card ? 0.15 : 0);
      }
      if (sparks.length) {
        gsap.set(sparks, { drawSVG: '0%' });
        tl.to(sparks, { drawSVG: '100%', duration: motion.duration.draw }, 0);
      }
      if (sparkWash.length) {
        gsap.set(sparkWash, { opacity: 0 });
        tl.to(sparkWash, { opacity: 1, duration: 0.4 }, '>-0.3');
      }
      if (areas.length) {
        gsap.set(areas, { opacity: 0 });
        tl.to(areas, { opacity: 0.1, duration: 0.4 }, '>-0.3');
      }
      if (muiAreas.length) {
        // MUI sets `opacity` inline for fading, so the wash animates on fill-opacity instead.
        gsap.set(muiAreas, { fillOpacity: 0 });
        tl.to(muiAreas, { fillOpacity: 0.1, duration: 0.4 }, lines.length ? '>-0.3' : 0);
      }
      if (ends.length) {
        gsap.set(ends, { scale: 0, transformOrigin: 'center center' });
        tl.to(ends, { scale: 1, duration: 0.2, clearProps: 'transform' }, '<');
      }
      if (vBars.length) {
        gsap.set(vBars, { scaleY: 0, transformOrigin: '50% 100%' });
        tl.to(vBars, { scaleY: 1, duration: 0.5, stagger: motion.stagger.bars, clearProps: 'transform' }, card ? 0.2 : 0.05);
      }
      if (hBars.length) {
        gsap.set(hBars, { scaleX: 0, transformOrigin: '0% 50%' });
        tl.to(hBars, { scaleX: 1, duration: 0.5, stagger: motion.stagger.bars, clearProps: 'transform' }, card ? 0.2 : 0.05);
      }
      if (barLabels.length) {
        gsap.set(barLabels, { opacity: 0 });
        tl.to(barLabels, { opacity: 1, duration: 0.3, stagger: motion.stagger.bars }, '>-0.25');
      }
      if (rings.length) {
        rings.forEach((ring) => {
          const c = Number(ring.getAttribute('stroke-dasharray')) || 0;
          const target = ring.getAttribute('stroke-dashoffset') || '0';
          gsap.set(ring, { transition: 'none', attr: { 'stroke-dashoffset': c } });
          tl.to(ring, { attr: { 'stroke-dashoffset': target }, duration: motion.duration.ring }, card ? 0.3 : 0.1);
        });
      }
      counters.forEach((el) => {
        const value = Number(el.dataset.count);
        const mode = (el.dataset.countMode as CountMode) || 'compact';
        const prefix = el.dataset.countPrefix || '';
        const suffix = el.dataset.countSuffix || '';
        const state = { v: 0 };
        el.style.fontVariantNumeric = 'tabular-nums';
        el.textContent = renderCount(0, mode, prefix, suffix);
        tl.to(
          state,
          {
            v: value,
            duration: motion.duration.count,
            onUpdate: () => {
              el.textContent = renderCount(state.v, mode, prefix, suffix);
            },
            onComplete: () => {
              el.textContent = renderCount(value, mode, prefix, suffix);
              el.style.fontVariantNumeric = '';
            },
          },
          0,
        );
      });

      ScrollTrigger.create({
        trigger: root,
        start,
        once: true,
        onEnter: () => {
          tl.play();
          // MUI rings hold their value in React state, so they fill on this event rather than from the timeline.
          root.dispatchEvent(new CustomEvent(REVEAL_EVENT, { detail: { delay: card ? 0.3 : 0.1 } }));
        },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className} style={style} data-chart-reveal="">
      {children}
    </div>
  );
}
