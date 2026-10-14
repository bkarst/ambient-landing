'use client';

import { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger, motion, motionOff } from './gsap';
import { compact } from '@/components/ds/format';

export type CountMode = 'compact' | 'currency' | 'integer' | 'cents' | 'percent';
type Mode = CountMode;

export function renderCount(v: number, mode: Mode, prefix: string, suffix: string): string {
  switch (mode) {
    case 'currency':
      return compact(v, '$') + suffix;
    case 'integer':
      return prefix + Math.round(v).toLocaleString('en-US') + suffix;
    case 'cents':
      return prefix + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + suffix;
    case 'percent':
      return prefix + Math.round(v) + '%' + suffix;
    default:
      return prefix + compact(v) + suffix;
  }
}

interface CountUpProps {
  value: number;
  mode?: Mode;
  prefix?: string;
  suffix?: string;
  /** Start when scrolled into view (default) or immediately on mount ('load'), or never ('manual': the parent timeline drives it via data-count) */
  trigger?: 'scroll' | 'load' | 'manual';
  delay?: number;
  className?: string;
}

/**
 * Counts a figure up once. The server HTML holds the final value; a visually hidden sibling keeps it for
 * assistive tech while the visible node (aria-hidden) animates in tabular figures (§8.3, rule 4).
 */
export function CountUp({ value, mode = 'compact', prefix = '', suffix = '', trigger = 'scroll', delay = 0, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const final = renderCount(value, mode, prefix, suffix);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || trigger === 'manual' || motionOff()) return;
      const state = { v: 0 };
      const tween = gsap.to(state, {
        v: value,
        duration: motion.duration.count,
        delay,
        ease: 'amb-out',
        paused: true,
        onStart: () => {
          el.style.fontVariantNumeric = 'tabular-nums';
        },
        onUpdate: () => {
          el.textContent = renderCount(state.v, mode, prefix, suffix);
        },
        onComplete: () => {
          el.textContent = final;
          el.style.fontVariantNumeric = '';
        },
      });
      if (trigger === 'load' || ScrollTrigger.isInViewport(el)) {
        el.textContent = renderCount(0, mode, prefix, suffix);
        tween.play();
        return;
      }
      el.textContent = renderCount(0, mode, prefix, suffix);
      ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: () => tween.play() });
    },
    { scope: ref },
  );

  return (
    <span className={className}>
      <span ref={ref} aria-hidden="true" data-count={value} data-count-mode={mode} data-count-prefix={prefix} data-count-suffix={suffix}>
        {final}
      </span>
      <span className="amb-sr">{final}</span>
    </span>
  );
}

/** Used by parent timelines (the hero receipt) to count every data-count node inside a scope. */
export function countNodes(scope: Element, duration: number = motion.duration.count, stagger = 0): gsap.core.Tween[] {
  const nodes = Array.from(scope.querySelectorAll<HTMLElement>('[data-count]'));
  return nodes.map((el, i) => {
    const value = Number(el.dataset.count);
    const mode = (el.dataset.countMode as Mode) || 'compact';
    const prefix = el.dataset.countPrefix || '';
    const suffix = el.dataset.countSuffix || '';
    const state = { v: 0 };
    el.textContent = renderCount(0, mode, prefix, suffix);
    el.style.fontVariantNumeric = 'tabular-nums';
    return gsap.to(state, {
      v: value,
      duration,
      delay: i * stagger,
      ease: 'amb-out',
      paused: true,
      onUpdate: () => {
        el.textContent = renderCount(state.v, mode, prefix, suffix);
      },
      onComplete: () => {
        el.textContent = renderCount(value, mode, prefix, suffix);
        el.style.fontVariantNumeric = '';
      },
    });
  });
}
