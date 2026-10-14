'use client';

import { useRef } from 'react';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { MARK_SYMBOL_ID } from '@/components/ds/Logo';
import { symbolShapes } from '@/components/integrations/logos';
import type { IntegrationId } from '@/config/site';
import { gsap, useGSAP, ScrollTrigger, motionOff } from '@/components/motion/gsap';

gsap.registerPlugin(MotionPathPlugin);

interface Node {
  id: IntegrationId;
  name: string;
}
interface DiagramProps {
  spend: Node[];
  context: Node[];
  spendHeading: string;
  contextHeading: string;
  productName: string;
}

const W = 760;
const H = 360;
const CX = W / 2;
const CY = 196;
const LEFT_X = 150;
const RIGHT_X = W - 150;
const SYM = 28;

function rowY(i: number, n: number) {
  const span = 56 * (n - 1);
  return CY - span / 2 + i * 56;
}

/**
 * Where tokens are spent → the mark → where work is tracked (§6.8). Generated from the integrations list:
 * add one in config and it appears here. When the diagram enters view, dots of light travel once along
 * each connector into the centre and out to the right, in three waves, then everything stays still.
 */
export function HowItWorksDiagram({ spend, context, spendHeading, contextHeading, productName }: DiagramProps) {
  const ref = useRef<SVGSVGElement>(null);
  const inPaths = spend.map((_, i) => `M ${LEFT_X + SYM / 2 + 6} ${rowY(i, spend.length)} C ${CX - 110} ${rowY(i, spend.length)}, ${CX - 110} ${CY}, ${CX - 44} ${CY}`);
  const outPaths = context.map((_, i) => `M ${CX + 44} ${CY} C ${CX + 110} ${CY}, ${CX + 110} ${rowY(i, context.length)}, ${RIGHT_X - SYM / 2 - 6} ${rowY(i, context.length)}`);

  useGSAP(
    () => {
      const svg = ref.current;
      if (!svg || motionOff()) return;
      const dots = svg.querySelectorAll<SVGCircleElement>('.diagram-dot');
      gsap.set(dots, { opacity: 0 });
      const tl = gsap.timeline({ paused: true });
      for (let wave = 0; wave < 3; wave++) {
        const at = wave * 0.5;
        dots.forEach((dot) => {
          const path = svg.querySelector<SVGPathElement>(`#${dot.dataset.path}`);
          if (!path) return;
          const isOut = dot.dataset.dir === 'out';
          tl.fromTo(
            dot,
            { opacity: 0 },
            {
              motionPath: { path, align: path, alignOrigin: [0.5, 0.5] },
              opacity: 1,
              duration: 0.55,
              ease: 'none',
              onComplete: () => gsap.set(dot, { opacity: 0 }),
            },
            at + (isOut ? 0.55 : 0),
          );
        });
      }
      ScrollTrigger.create({ trigger: svg, start: 'top 75%', once: true, onEnter: () => tl.play() });
    },
    { scope: ref },
  );

  const symbol = (n: Node, x: number, y: number, side: 'left' | 'right') => {
    const art = symbolShapes(n.id);
    return (
    <g key={n.id} style={{ color: 'var(--ink)' }}>
      <svg x={x - SYM / 2} y={y - SYM / 2} width={SYM} height={SYM} viewBox={art.viewBox}>
        {art.children}
      </svg>
      <text x={side === 'left' ? x - SYM / 2 - 12 : x + SYM / 2 + 12} y={y + 4} textAnchor={side === 'left' ? 'end' : 'start'} fontSize={13} fontWeight={500} fill="var(--ink-secondary)" fontFamily="var(--font-sans)">
        {n.name}
      </text>
    </g>
    );
  };

  return (
    <svg ref={ref} viewBox={`0 0 ${W} ${H}`} width="100%" aria-hidden="true" focusable="false" style={{ display: 'block', maxWidth: W, marginInline: 'auto' }}>
      <text x={24} y={CY - 56 * ((spend.length - 1) / 2) - 36} textAnchor="start" fill="var(--ink-muted)" fontSize={11} fontWeight={600} letterSpacing="0.12em" fontFamily="var(--font-sans)">
        {spendHeading.toUpperCase()}
      </text>
      <text x={W - 24} y={CY - 56 * ((context.length - 1) / 2) - 36} textAnchor="end" fill="var(--ink-muted)" fontSize={11} fontWeight={600} letterSpacing="0.12em" fontFamily="var(--font-sans)">
        {contextHeading.toUpperCase()}
      </text>
      <g fill="none" stroke="var(--line-strong)" strokeOpacity={0.6} strokeWidth={1}>
        {inPaths.map((d, i) => (
          <path key={`in${i}`} id={`hiw-in-${i}`} d={d} />
        ))}
        {outPaths.map((d, i) => (
          <path key={`out${i}`} id={`hiw-out-${i}`} d={d} />
        ))}
      </g>
      {spend.map((n, i) => symbol(n, LEFT_X, rowY(i, spend.length), 'left'))}
      {context.map((n, i) => symbol(n, RIGHT_X, rowY(i, context.length), 'right'))}
      <svg x={CX - 32} y={CY - 32} width={64} height={64} viewBox="0 0 1000 1000" style={{ fill: 'var(--gold)' }}>
        <use href={`#${MARK_SYMBOL_ID}`} />
      </svg>
      <text x={CX} y={CY + 52} textAnchor="middle" fontSize={13} fontWeight={600} fill="var(--ink)" fontFamily="var(--font-sans)">
        {productName}
      </text>
      <g fill="var(--hero-art-ink)">
        {spend.map((_, i) => (
          <circle key={`din${i}`} className="diagram-dot" data-path={`hiw-in-${i}`} data-dir="in" r={3} cx={0} cy={0} opacity={0} />
        ))}
        {context.map((_, i) => (
          <circle key={`dout${i}`} className="diagram-dot" data-path={`hiw-out-${i}`} data-dir="out" r={3} cx={0} cy={0} opacity={0} />
        ))}
      </g>
    </svg>
  );
}
