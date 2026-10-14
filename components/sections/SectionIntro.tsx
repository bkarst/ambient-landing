import type { ReactNode } from 'react';
import { Reveal } from '@/components/motion/Reveal';

interface SectionIntroProps {
  id: string;
  overline?: string;
  heading: string;
  body?: ReactNode;
  centered?: boolean;
  /** `h2` title style: the fluid title-1 (default) or the smaller title-2 for the marquee */
  size?: 'title-1' | 'title-2';
  children?: ReactNode;
  className?: string;
}

/** Overline, section heading and lede, revealed as a group (§6, §8.4 "section text"). */
export function SectionIntro({ id, overline, heading, body, centered, size = 'title-1', children, className }: SectionIntroProps) {
  return (
    <Reveal selector="[data-reveal]" className={className} style={centered ? { textAlign: 'center', marginInline: 'auto', maxWidth: 640 } : undefined}>
      {overline && (
        <p className="eyebrow" data-reveal style={{ margin: '0 0 var(--space-3)' }}>
          {overline}
        </p>
      )}
      <h2 id={id} className={size === 'title-1' ? 'title-1-fluid' : 'title-2'} data-reveal style={{ margin: 0 }}>
        {heading}
      </h2>
      {body && (
        <p className="body-large text-ink-secondary measure" data-reveal style={{ margin: 'var(--space-5) 0 0', ...(centered ? { marginInline: 'auto' } : {}) }}>
          {body}
        </p>
      )}
      {children}
    </Reveal>
  );
}
