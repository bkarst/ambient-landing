'use client';

import { useRef, type CSSProperties, type ElementType, type ReactNode } from 'react';
import { gsap, useGSAP, ScrollTrigger, motion, motionOff } from './gsap';

interface RevealProps {
  children: ReactNode;
  /** Elements inside to stagger (a selector scoped to this wrapper). Defaults to the wrapper itself. */
  selector?: string;
  /** Travel distance in px: 16 for text, 24 for cards (§8.2) */
  distance?: number;
  stagger?: number;
  /** Viewport line that starts the reveal, e.g. 'top 85%' */
  start?: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  id?: string;
}

/**
 * Reveals server-rendered children once as they enter the viewport. Anything already on screen at
 * hydration stays visible (rule 2 in §8.3), so there is never a flash and crawlers never see hidden copy.
 */
export function Reveal({ children, selector, distance = motion.distance.reveal, stagger = motion.stagger.items, start = 'top 85%', as: Tag = 'div', className, style, id }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || motionOff()) return;
      const targets: Element[] = selector ? Array.from(root.querySelectorAll(selector)) : [root];
      if (targets.length === 0) return;
      if (ScrollTrigger.isInViewport(root, 0.01)) return;
      gsap.set(targets, { opacity: 0, y: distance });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: motion.duration.reveal,
        stagger,
        clearProps: 'transform',
        scrollTrigger: { trigger: root, start, once: true },
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} style={style} id={id}>
      {children}
    </Tag>
  );
}
