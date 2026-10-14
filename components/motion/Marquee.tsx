'use client';

import { useRef, useState, type ReactNode } from 'react';
import { IconButton } from '@/components/ds/IconButton';
import { track } from '@/lib/analytics';
import { gsap, useGSAP, ScrollTrigger, motion, motionOff } from './gsap';

interface MarqueeProps {
  /** One copy of the list; it is rendered twice for a seamless loop. */
  list: ReactNode;
  listHidden: ReactNode;
  pauseLabel: string;
  playLabel: string;
}

/**
 * The integrations marquee (§6.3, §8.5): one GSAP tween, eased to a stop on hover or focus, paused
 * off-screen or when the tab is hidden, and stopped for good by the pause button. Under Reduce Motion
 * the CSS lays the logos out in a static wrapping row and hides the button.
 */
export function Marquee({ list, listHidden, pauseLabel, playLabel }: MarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);
  const userPaused = useRef(false);
  const [paused, setPaused] = useState(false);

  useGSAP(
    () => {
      const el = trackRef.current;
      if (!el || motionOff()) return;
      const build = () => {
        tween.current?.kill();
        const width = el.scrollWidth / 2;
        const duration = Math.max(8, width / motion.marquee.pxPerSecond);
        tween.current = gsap.to(el, { xPercent: -50, ease: 'none', repeat: -1, duration });
        if (userPaused.current) tween.current.pause();
      };
      build();
      const ro = new ResizeObserver(() => build());
      ro.observe(el);
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => {
          if (userPaused.current) return;
          if (self.isActive) tween.current?.play();
          else tween.current?.pause();
        },
      });
      const onVisibility = () => {
        if (userPaused.current) return;
        if (document.visibilityState === 'hidden') tween.current?.pause();
        else tween.current?.play();
      };
      document.addEventListener('visibilitychange', onVisibility);
      return () => {
        ro.disconnect();
        document.removeEventListener('visibilitychange', onVisibility);
      };
    },
    { scope: ref },
  );

  // Event-time tweens on the marquee tween itself; they need no context because they target no DOM node.
  const slow = (to: number) => {
    if (!tween.current || userPaused.current) return;
    gsap.to(tween.current, { timeScale: to, duration: motion.marquee.slowDuration, ease: 'amb-out', overwrite: true });
  };

  const toggle = () => {
    const next = !userPaused.current;
    userPaused.current = next;
    setPaused(next);
    if (next) {
      tween.current?.pause();
      track({ name: 'marquee_pause' });
    } else {
      tween.current?.timeScale(1).play();
    }
  };

  return (
    <div ref={ref} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
      <div
        className="marquee"
        style={{ flex: 1, minWidth: 0 }}
        onPointerEnter={() => slow(motion.marquee.slowTo)}
        onPointerLeave={() => slow(1)}
        onFocus={() => slow(motion.marquee.slowTo)}
        onBlur={() => slow(1)}
      >
        <div ref={trackRef} className="marquee-track">
          {list}
          {listHidden}
        </div>
      </div>
      <IconButton
        className="marquee-pause"
        icon={paused ? 'play' : 'pause'}
        label={paused ? playLabel : pauseLabel}
        size="sm"
        variant="ghost"
        aria-pressed={paused}
        onClick={toggle}
      />
    </div>
  );
}
