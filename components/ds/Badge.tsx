import type { ReactNode } from 'react';
import { Icon } from './Icon';
import type { IconName } from './icons';
import { cx } from './geometry';

export interface BadgeProps {
  tone?: 'neutral' | 'accent' | 'positive' | 'negative' | 'outline' | 'live';
  icon?: IconName;
  children?: ReactNode;
  className?: string;
}

export function Badge(props: BadgeProps) {
  const tone = props.tone || 'neutral';
  return (
    <span className={cx('amb-badge', 'is-' + tone, props.className)}>
      {tone === 'live' ? <span className="amb-dot" aria-hidden="true" /> : null}
      {props.icon ? <Icon name={props.icon} size={14} /> : null}
      {props.children}
    </span>
  );
}
