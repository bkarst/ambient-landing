import type { ReactNode } from 'react';
import { landing } from '@/content/landing';
import type { IconName } from '@/components/ds/icons';
import { Icon } from '@/components/ds/Icon';
import type { SourceId } from '@/content/sources';
import { ChartReveal } from '@/components/motion/ChartReveal';
import { Reveal } from '@/components/motion/Reveal';
import { SourceLine } from './SourceLine';

export interface ChapterCopy {
  id: string;
  overline: string;
  heading: string;
  why: string;
  bullets: readonly { icon: IconName; text: string }[];
  proof?: { text: string; sourceId: SourceId };
  proofs?: readonly { text: string; sourceId: SourceId }[];
  takeaway: string;
}

interface ValueChapterProps {
  copy: ChapterCopy;
  /** Visual on the left at wide widths */
  flipped?: boolean;
  children: ReactNode;
}

/** One of the six chart-led chapters (§6.7): copy on one side, a composite of Cards on the other, alternating. */
export function ValueChapter({ copy, flipped, children }: ValueChapterProps) {
  const proofs = copy.proofs ?? (copy.proof ? [copy.proof] : []);
  return (
    <section id={copy.id} className="section" aria-labelledby={`${copy.id}-heading`}>
      <div className={`wrap chapter-grid${flipped ? ' is-flipped' : ''}`}>
        <Reveal selector="[data-reveal]" className="chapter-copy flex flex-col gap-5">
          <p className="eyebrow" data-reveal style={{ margin: 0 }}>
            {copy.overline}
          </p>
          <h2 id={`${copy.id}-heading`} className="title-1-fluid" data-reveal style={{ margin: 0 }}>
            {copy.heading}
          </h2>
          <p className="body-large text-ink-secondary measure" data-reveal style={{ margin: 0 }}>
            {copy.why}
          </p>
          <ul className="bullets body" data-reveal>
            {copy.bullets.map((b) => (
              <li key={b.text}>
                <Icon name={b.icon} size={16} />
                <span>{b.text}</span>
              </li>
            ))}
          </ul>
          {proofs.length > 0 && (
            <div data-reveal style={{ display: 'flex', flexDirection: 'column', gap: 6, borderLeft: '2px solid var(--line-strong)', paddingLeft: 'var(--space-4)' }}>
              {proofs.map((p) => (
                <SourceLine key={p.sourceId} sourceId={p.sourceId} text={p.text} />
              ))}
            </div>
          )}
        </Reveal>
        <div className="chapter-visual flex flex-col gap-4">
          <ChartReveal card className="visual-stack">
            {children}
          </ChartReveal>
          <p className="label" style={{ margin: 0 }}>
            {copy.takeaway}
          </p>
          <p className="caption text-ink-muted" style={{ margin: 0 }}>
            {landing.chapters.sample}
          </p>
        </div>
      </div>
    </section>
  );
}
