import { Icon } from './Icon';
import { cx } from './geometry';
import { resolveFormat, type FormatKey } from './format';

export interface DeltaProps {
  /** Signed change; a percentage unless `suffix` or `format` say otherwise */
  value: number;
  /** false for spend, latency, errors — anything where up is bad */
  upIsGood?: boolean;
  /** "vs last week" */
  period?: string;
  suffix?: string;
  /** Serializable formatter key (replaces the bundle's function prop) */
  format?: FormatKey;
  className?: string;
}

export function Delta(props: DeltaProps) {
  const v = Number(props.value) || 0;
  const upIsGood = props.upIsGood !== false;
  const dir = v > 0 ? 'up' : v < 0 ? 'down' : 'flat';
  const tone = dir === 'flat' ? 'neutral' : (dir === 'up') === upIsGood ? 'positive' : 'negative';
  const text =
    (v > 0 ? '+' : '') +
    (props.format ? resolveFormat(props.format)(v) : Math.round(v * 10) / 10 + (props.suffix == null ? '%' : props.suffix));
  const srText = (dir === 'up' ? 'up ' : dir === 'down' ? 'down ' : 'unchanged ') + text + (props.period ? ' ' + props.period : '');
  return (
    <span className={cx('amb-delta', 'is-' + tone, props.className)} title={srText}>
      {dir !== 'flat' ? <Icon name={dir === 'up' ? 'arrow-up' : 'arrow-down'} size={12} /> : null}
      <span>{text}</span>
      {props.period ? <span className="amb-delta-period">{props.period}</span> : null}
    </span>
  );
}
