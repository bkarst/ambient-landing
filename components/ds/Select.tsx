import type { SelectHTMLAttributes } from 'react';
import { Icon } from './Icon';
import { cx } from './geometry';

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options: Array<string | { value: string; label: string }>;
  /** The accessible name */
  label?: string;
  size?: 'sm' | 'md';
}

export function Select(props: SelectProps) {
  const { options, size, className, label, ...rest } = props;
  const opts = (options || []).map((o) => {
    const v = typeof o === 'string' ? o : o.value;
    const l = typeof o === 'string' ? o : o.label;
    return (
      <option key={v} value={v}>
        {l}
      </option>
    );
  });
  return (
    <span className={cx('amb-select', size === 'sm' && 'is-sm', className)}>
      <select {...rest} aria-label={rest['aria-label'] || label}>
        {opts}
      </select>
      <Icon name="chevron-down" size={16} className="amb-select-chevron" />
    </span>
  );
}
