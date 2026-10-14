'use client';

import { useState } from 'react';
import { cx } from './geometry';

export interface ToggleProps {
  label?: string;
  'aria-label'?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function Toggle(props: ToggleProps) {
  const controlled = typeof props.checked === 'boolean';
  const [state, setState] = useState(!!props.defaultChecked);
  const on = controlled ? !!props.checked : state;
  function flip() {
    if (props.disabled) return;
    if (!controlled) setState(!on);
    if (props.onChange) props.onChange(!on);
  }
  const sw = (
    <button
      type="button"
      role="switch"
      aria-checked={on ? 'true' : 'false'}
      aria-label={props.label ? undefined : props['aria-label']}
      className="amb-toggle-track"
      disabled={props.disabled}
      onClick={flip}
    />
  );
  if (!props.label) return sw;
  return (
    <label className={cx('amb-toggle', props.className)}>
      {sw}
      <span>{props.label}</span>
    </label>
  );
}
