'use client';

import { useRef, useState } from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { cx } from '@/components/ds/geometry';
import { gsap, useGSAP, motion, motionOff } from '@/components/motion/gsap';

export interface RingProps {
  /** 0–100 */
  value: number;
  /** Printed in the centre; defaults to `${value}%` */
  text?: string;
  label?: string;
  size?: number;
  stroke?: number;
  tone?: 'positive' | 'negative';
  className?: string;
}

/** Fired on a ChartReveal root when its timeline starts (`detail.delay`) or when the visual was already in view (`detail.instant`). */
export const REVEAL_EVENT = 'amb:reveal';

/**
 * The design-system ring drawn by MUI's Gauge. The server HTML holds the final value; when motion is on
 * and a ChartReveal wraps it, the arc starts empty and fills on the reveal event, in the ring's own duration.
 */
export function Ring(props: RingProps) {
  const size = props.size || 96;
  const stroke = props.stroke || Math.max(6, Math.round(size / 11));
  const value = Math.max(0, Math.min(100, Number(props.value) || 0));
  const text = props.text != null ? props.text : Math.round(value * 100) / 100 + '%';
  const [shown, setShown] = useState(value);
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || motionOff()) return;
      const root = el.closest<HTMLElement>('[data-chart-reveal]');
      if (!root) return;
      setShown(0);
      const onReveal = (e: Event) => {
        const detail = (e as CustomEvent<{ delay?: number; instant?: boolean }>).detail || {};
        if (detail.instant) {
          setShown(value);
          return;
        }
        const state = { v: 0 };
        gsap.to(state, {
          v: value,
          duration: motion.duration.ring,
          delay: detail.delay || 0,
          ease: 'amb-out',
          onUpdate: () => setShown(state.v),
          onComplete: () => setShown(value),
        });
      };
      root.addEventListener(REVEAL_EVENT, onReveal);
      return () => root.removeEventListener(REVEAL_EVENT, onReveal);
    },
    { scope: ref, dependencies: [value] },
  );

  const fontSize = Math.max(13, Math.min(28, Math.round(size * 0.21)));
  return (
    <div ref={ref} className={cx('amb-ring amb-mui', props.className)} role="img" aria-label={(props.label ? props.label + ': ' : '') + text}>
      <Gauge
        width={size}
        height={size}
        value={shown}
        valueMin={0}
        valueMax={100}
        startAngle={0}
        endAngle={360}
        innerRadius={size / 2 - stroke}
        outerRadius={size / 2}
        cornerRadius="50%"
        margin={0}
        skipAnimation
        text={text}
        aria-hidden="true"
        className={cx('amb-ring-gauge', props.tone && 'is-' + props.tone)}
        sx={{
          [`& .${gaugeClasses.valueText} text`]: { fontSize, fontWeight: 600, letterSpacing: '-0.02em', fill: 'var(--ink)' },
        }}
      />
      {props.label ? <span className="amb-ring-label">{props.label}</span> : null}
    </div>
  );
}
