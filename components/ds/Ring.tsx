import { cx } from './geometry';

export interface RingProps {
  /** 0–100 */
  value: number;
  /** Printed in the centre; defaults to `${value}%` */
  text?: string;
  label?: string;
  size?: number;
  stroke?: number;
  tone?: 'positive' | 'negative';
  className?: string;
}

export function Ring(props: RingProps) {
  const size = props.size || 96;
  const stroke = props.stroke || Math.max(6, Math.round(size / 11));
  const value = Math.max(0, Math.min(100, Number(props.value) || 0));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const text = props.text != null ? props.text : Math.round(value * 100) / 100 + '%';
  return (
    <div className={cx('amb-ring', props.className)} role="img" aria-label={(props.label ? props.label + ': ' : '') + text}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} viewBox={'0 0 ' + size + ' ' + size} aria-hidden="true">
          <circle className="amb-ring-track" cx={size / 2} cy={size / 2} r={r} strokeWidth={stroke} />
          <circle
            className={cx('amb-ring-fill', props.tone && 'is-' + props.tone)}
            cx={size / 2}
            cy={size / 2}
            r={r}
            strokeWidth={stroke}
            strokeDasharray={c}
            strokeDashoffset={c * (1 - value / 100)}
            transform={'rotate(-90 ' + size / 2 + ' ' + size / 2 + ')'}
          />
        </svg>
        <div className="amb-ring-center" style={{ height: size }}>
          <span className="amb-ring-value" style={{ fontSize: Math.max(13, Math.min(28, Math.round(size * 0.21))), lineHeight: 1.1 }}>
            {text}
          </span>
        </div>
      </div>
      {props.label ? <span className="amb-ring-label">{props.label}</span> : null}
    </div>
  );
}
