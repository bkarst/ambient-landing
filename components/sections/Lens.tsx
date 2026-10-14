'use client';

import { useId, useRef, useState } from 'react';
import { landing } from '@/content/landing';
import { sampleData } from '@/content/sample-data';
import { shortLabels } from '@/content/short-labels';
import { Badge } from '@/components/ds/Badge';
import { Button } from '@/components/ds/Button';
import { CountUp } from '@/components/motion/CountUp';
import { RankedBars } from '@/components/dashboards/RankedBars';
import { gsap, useGSAP, ScrollTrigger, isWide, motion, motionOff } from '@/components/motion/gsap';
import { track } from '@/lib/analytics';

const copy = landing.lens;
type LensId = (typeof copy.lenses)[number]['id'];
const ROWS = Math.max(sampleData.lens.vendor.length, sampleData.lens.model.length, sampleData.lens.team.length, sampleData.lens.task.length);
const CHART_HEIGHT = ROWS * (24 + 14) + 24;

/**
 * One invoice, four ways to read it (§6.6). On wide screens with motion allowed the section pins and scroll
 * drives the active lens; elsewhere the buttons switch the chart directly. The chart height is fixed to the
 * tallest lens so switching never shifts layout.
 */
export function Lens() {
  const [lens, setLens] = useState<LensId>('vendor');
  const root = useRef<HTMLElement>(null);
  const chart = useRef<HTMLDivElement>(null);
  const takeaway = useRef<HTMLParagraphElement>(null);
  const pin = useRef<ScrollTrigger | null>(null);
  const busy = useRef(false);
  const current = useRef<LensId>('vendor');
  const first = useRef(true);
  const id = useId();

  const index = (l: LensId) => copy.lenses.findIndex((x) => x.id === l);
  const active = copy.lenses[index(lens)];

  useGSAP(
    () => {
      const el = root.current;
      if (!el || motionOff() || !isWide()) return;
      const steps = copy.lenses.length;
      pin.current = ScrollTrigger.create({
        trigger: el,
        start: 'top top+=72',
        end: () => `+=${Math.min(window.innerHeight * 2.4, window.innerHeight * 0.6 * steps)}`,
        pin: true,
        pinSpacing: true,
        snap: { snapTo: 1 / (steps - 1), duration: { min: 0.2, max: 0.4 }, ease: 'amb-out' },
        onUpdate: (self) => {
          const i = Math.round(self.progress * (steps - 1));
          const next = copy.lenses[i].id;
          change(next, 'scroll');
        },
      });
    },
    { scope: root },
  );

  // Incoming bars grow from the left and the takeaway crossfades whenever the lens changes.
  useGSAP(
    () => {
      if (first.current) {
        first.current = false;
        return;
      }
      if (motionOff() || !chart.current) return;
      const bars = chart.current.querySelectorAll('.amb-bar');
      const labels = chart.current.querySelectorAll('.amb-bar-label');
      gsap.fromTo(bars, { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: 0.5, stagger: motion.stagger.bars, clearProps: 'transform' });
      gsap.fromTo(labels, { opacity: 0 }, { opacity: 1, duration: 0.3, stagger: motion.stagger.bars, delay: 0.2 });
      if (takeaway.current) gsap.fromTo(takeaway.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4 });
    },
    { scope: root, dependencies: [lens] },
  );

  // Event-time (scroll or click). The transient tweens target chart nodes that are re-rendered anyway.
  function change(next: LensId, source: 'scroll' | 'button') {
    if (next === current.current) return;
    current.current = next;
    track({ name: 'lens_change', lens: next });
    if (motionOff() || !chart.current || busy.current) {
      setLens(next);
      return;
    }
    busy.current = true;
    const bars = chart.current.querySelectorAll('.amb-bar');
    const labels = chart.current.querySelectorAll('.amb-bar-label');
    gsap.to(labels, { opacity: 0, duration: 0.15 });
    gsap.to(bars, {
      scaleX: 0,
      transformOrigin: '0% 50%',
      duration: 0.25,
      stagger: 0.02,
      onComplete: () => {
        busy.current = false;
        setLens(next);
      },
    });
    if (source === 'button' && pin.current) {
      const st = pin.current;
      const i = index(next);
      gsap.to(window, { scrollTo: st.start + ((st.end - st.start) * i) / (copy.lenses.length - 1), duration: 0.5, ease: 'amb-out' });
    }
  }

  return (
    <section id="lens" ref={root} className="section" aria-labelledby={`${id}-heading`} style={{ paddingBottom: 'var(--space-8)' }}>
      <div className="wrap grid grid-cols-1 xl:grid-cols-12 gap-10 xl:gap-16 items-start">
        <div className="xl:col-span-5 flex flex-col gap-5">
          <p className="eyebrow" style={{ margin: 0 }}>
            {copy.overline}
          </p>
          <h2 id={`${id}-heading`} className="title-1-fluid" style={{ margin: 0 }}>
            {copy.heading}
          </h2>
          <p className="body-large text-ink-secondary" style={{ margin: 0 }}>
            {copy.body}
          </p>
          <div>
            <span className="label text-ink-muted" style={{ display: 'block' }}>
              {copy.totalLabel}
            </span>
            <span className="stat" style={{ display: 'block', marginTop: 4 }}>
              <CountUp value={sampleData.lens.total} mode="integer" prefix="$" />
            </span>
          </div>
          <div className="lens-picker amb-row" role="group" aria-label={copy.pickerLabel} style={{ gap: 4 }}>
            {copy.lenses.map((l) => (
              <Button key={l.id} variant="ghost" size="sm" aria-pressed={lens === l.id} onClick={() => change(l.id, 'button')}>
                {l.label}
              </Button>
            ))}
          </div>
          <p className="body text-ink-secondary" style={{ margin: 0 }}>
            {copy.value}
          </p>
        </div>
        <div className="xl:col-span-7 flex flex-col gap-4">
          <div className="amb-card" style={{ position: 'relative' }}>
            <div className="amb-card-head">
              <div>
                <h3 className="amb-card-title">{active.label}</h3>
                <p className="amb-card-sub">{copy.totalLabel}, USD</p>
              </div>
              <div className="amb-card-action">
                <Badge tone="neutral">{copy.sample}</Badge>
              </div>
            </div>
            <div ref={chart} style={{ minHeight: CHART_HEIGHT }}>
              <RankedBars title={`${copy.chartTitle} ${active.label.toLowerCase()}`} seriesName="Spend" points={sampleData.lens[lens]} shortLabels={shortLabels} height={CHART_HEIGHT} />
            </div>
          </div>
          <p ref={takeaway} className="headline" style={{ margin: 0 }} aria-live="polite">
            {active.takeaway}
          </p>
        </div>
      </div>
    </section>
  );
}
