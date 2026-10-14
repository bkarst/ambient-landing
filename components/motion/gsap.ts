'use client';

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { CustomEase } from 'gsap/CustomEase';
import { theme } from '@/config/theme';

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin, ScrollToPlugin, CustomEase);
if (!CustomEase.get('amb-out')) {
  CustomEase.create('amb-out', `M0,0 C${theme.motion.ease.join(',')} 1,1`);
}
gsap.defaults({ ease: 'amb-out', duration: theme.motion.duration.reveal });

if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
  (window as Window & { __gsap?: typeof gsap }).__gsap = gsap;
}

export { gsap, useGSAP, ScrollTrigger };
export const motion = theme.motion;

/** True when motion must not play: Reduce Motion, or `?motion=off` for tests and screenshots. */
export function motionOff(): boolean {
  if (typeof window === 'undefined') return true;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
  try {
    return new URLSearchParams(window.location.search).get(motion.debugParam) === 'off';
  } catch {
    return false;
  }
}

/** The pin and tilt only run at wide widths. */
export function isWide(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches;
}
