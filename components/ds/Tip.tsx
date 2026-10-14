import type { ReactNode } from 'react';
import { cx } from './geometry';

export interface TipRow {
  key: number | null;
  label: ReactNode;
  value: ReactNode;
}

export function Tip(props: { x?: number; y?: number; title?: ReactNode; rows: TipRow[] }) {
  return (
    <div className="amb-tip" style={{ left: props.x, top: props.y }}>
      {props.title != null ? <div className="amb-tip-title">{props.title}</div> : null}
      {props.rows.map((r, i) => (
        <div className="amb-tip-row" key={i}>
          <span>
            {r.key != null ? <span className={cx('amb-key', 'amb-series-' + (r.key + 1))} /> : null}
            {r.label}
          </span>
          <b>{r.value}</b>
        </div>
      ))}
    </div>
  );
}
