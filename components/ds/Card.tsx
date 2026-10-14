import type { CSSProperties, ReactNode } from 'react';
import { cx } from './geometry';

export interface CardProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  /** Top-right slot: a Select, Badge or IconButton */
  action?: ReactNode;
  compact?: boolean;
  /** Heading level for the title (default h3) */
  titleAs?: 'h2' | 'h3' | 'h4';
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  id?: string;
}

export function Card(props: CardProps) {
  const Title = props.titleAs || 'h3';
  const head =
    props.title || props.action ? (
      <div className="amb-card-head">
        <div>
          {props.title ? <Title className="amb-card-title">{props.title}</Title> : null}
          {props.subtitle ? <p className="amb-card-sub">{props.subtitle}</p> : null}
        </div>
        {props.action ? <div className="amb-card-action">{props.action}</div> : null}
      </div>
    ) : null;
  return (
    <section id={props.id} className={cx('amb-card', props.compact && 'is-compact', props.className)} style={props.style}>
      {head}
      {props.children}
    </section>
  );
}
