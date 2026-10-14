import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { Icon } from './Icon';
import type { IconName } from './icons';
import { cx } from './geometry';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconAfter?: IconName;
  /** Renders an <a> instead */
  href?: string;
  /** Only used with `href` */
  target?: string;
  rel?: string;
}

export function Button(props: ButtonProps) {
  const { variant = 'secondary', size = 'md', icon, iconAfter, children, className, href, ...rest } = props;
  const iconSize = size === 'sm' ? 16 : 20;
  const cls = cx('amb-btn', 'is-' + variant, 'is-' + size, className);
  const body = (
    <>
      {icon ? <Icon name={icon} size={iconSize} /> : null}
      {children != null ? <span>{children}</span> : null}
      {iconAfter ? <Icon name={iconAfter} size={iconSize} /> : null}
    </>
  );
  if (href) {
    const anchorRest = rest as unknown as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a {...anchorRest} href={href} className={cls}>
        {body}
      </a>
    );
  }
  return (
    <button {...rest} type={rest.type ?? 'button'} className={cls}>
      {body}
    </button>
  );
}
