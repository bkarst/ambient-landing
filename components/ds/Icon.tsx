import type { CSSProperties } from 'react';
import { ICONS, ICON_NAMES, type IconName } from './icons';
import { cx } from './geometry';

export interface IconProps {
  name: IconName;
  /** 16, 20 or 24 */
  size?: number;
  /** Accessible name; omit when the icon sits beside text */
  label?: string;
  className?: string;
  style?: CSSProperties;
}

export function Icon(props: IconProps) {
  const size = props.size || 20;
  const body = ICONS[props.name];
  if (!body) return null;
  return (
    <svg
      className={cx('amb-icon', size <= 16 && 'is-sm', props.className)}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden={props.label ? undefined : 'true'}
      role={props.label ? 'img' : undefined}
      aria-label={props.label}
      style={props.style}
      dangerouslySetInnerHTML={{ __html: body }}
    />
  );
}

Icon.names = ICON_NAMES;
