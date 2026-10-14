import type { ReactNode } from 'react';
import { Delta } from './Delta';
import { Spark } from './Spark';
import { compact } from './format';
import { cx } from './geometry';

export interface StatProps {
  label: string;
  /** Numbers are compacted (12,428 · 1.3M · $128K); strings and nodes print as given */
  value: number | string | ReactNode;
  prefix?: string;
  unit?: string;
  delta?: number;
  upIsGood?: boolean;
  period?: string;
  caption?: string;
  /** Up to 12 points for the sparkline */
  trend?: number[];
  /** The one 44px figure a view leads with */
  hero?: boolean;
  sparkWidth?: number;
  className?: string;
}

export function Stat(props: StatProps) {
  const value = typeof props.value === 'number' ? compact(props.value, props.prefix) : props.value;
  return (
    <div className={cx('amb-stat', props.className)}>
      <span className="amb-stat-label">{props.label}</span>
      <span className={cx('amb-stat-value', props.hero && 'is-hero')}>
        {value}
        {props.unit ? (
          <span className="amb-stat-unit" style={{ marginLeft: 6 }}>
            {props.unit}
          </span>
        ) : null}
      </span>
      {props.delta != null || props.trend || props.caption ? (
        <div className="amb-stat-foot">
          <span className="amb-row" style={{ gap: 8 }}>
            {props.delta != null ? <Delta value={props.delta} upIsGood={props.upIsGood} period={props.period} /> : null}
            {props.caption ? <span className="amb-stat-unit">{props.caption}</span> : null}
          </span>
          {props.trend ? <Spark values={props.trend} width={props.sparkWidth || 72} height={28} /> : null}
        </div>
      ) : null}
    </div>
  );
}
