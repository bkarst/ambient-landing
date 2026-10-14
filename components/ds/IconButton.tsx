import type { ButtonHTMLAttributes } from 'react';
import { Icon } from './Icon';
import type { IconName } from './icons';
import { cx } from './geometry';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconName;
  /** Required: the accessible name and tooltip */
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export function IconButton(props: IconButtonProps) {
  const { icon, label, size = 'md', variant = 'secondary', className, ...rest } = props;
  return (
    <button
      {...rest}
      type={rest.type ?? 'button'}
      aria-label={label}
      title={rest.title || label}
      className={cx('amb-btn', 'is-icon', 'is-' + variant, 'is-' + size, className)}
    >
      <Icon name={icon} size={size === 'sm' ? 16 : 20} />
    </button>
  );
}
