import { cx } from './geometry';

export interface Series {
  name: string;
  values: number[];
}

export function Legend(props: { series?: Series[]; line?: boolean }) {
  if (!props.series || props.series.length < 2) return null;
  return (
    <ul className="amb-legend" aria-label="Series">
      {props.series.map((s, i) => (
        <li key={i}>
          <span className={cx('amb-key', props.line && 'is-line', 'amb-series-' + (i + 1))} />
          {s.name}
        </li>
      ))}
    </ul>
  );
}
