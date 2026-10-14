'use client';

import { useImperativeHandle, type Ref } from 'react';
import { DataTable } from './DataTable';
import { Legend, type Series } from './Legend';
import { Tip } from './Tip';
import { resolveFormat, type FormatKey } from './format';
import { cx, monotonePath, niceTicks, type Point } from './geometry';
import { useChartPointer } from './useChartPointer';
import { useWidth } from './useWidth';

export interface LineChartProps {
  series: Series[];
  labels: string[];
  height?: number;
  /** Initial width before the chart measures its container */
  width?: number;
  prefix?: string;
  /** Serializable formatter key (replaces the bundle's function prop) */
  format?: FormatKey;
  /** Accessible name and the hidden table's caption */
  title?: string;
  /** Tooltip label for a single series */
  valueLabel?: string;
  /** Wash under the first series (default true) */
  area?: boolean;
  /** Final values printed at the line ends (default true) */
  endLabels?: boolean;
  /** Number of y gridlines (default 4) */
  ticks?: number;
  className?: string;
  ref?: Ref<HTMLDivElement>;
}

export function LineChart({ ref: forwardedRef, ...props }: LineChartProps) {
  const series = props.series || [];
  const labels = props.labels || [];
  const height = props.height || 220;
  const fmt = resolveFormat(props.format, props.prefix);
  const [ref, width] = useWidth(props.width || 600);
  useImperativeHandle(forwardedRef, () => ref.current as HTMLDivElement, [ref]);
  const n = Math.max(0, ...series.map((s) => s.values.length));
  const max = Math.max(0, ...series.map((s) => Math.max(...s.values)));
  const ticks = niceTicks(max, props.ticks || 4);
  const top = ticks[ticks.length - 1];
  const endLabels = props.endLabels !== false;
  const pad = { l: 44, r: endLabels ? 52 : 12, t: 12, b: 28 };
  const W = width;
  const H = height;
  const iw = Math.max(10, W - pad.l - pad.r);
  const ih = H - pad.t - pad.b;
  const xs = (i: number) => pad.l + (n <= 1 ? iw / 2 : (i / (n - 1)) * iw);
  const ys = (v: number) => pad.t + ih - (top ? (v / top) * ih : 0);
  const paths = series.map((s) => monotonePath(s.values.map((v, i): Point => [xs(i), ys(v)])));
  const xTicks: number[] = [];
  const every = Math.max(1, Math.ceil(n / Math.max(2, Math.floor(iw / 80))));
  for (let i = n - 1; i >= 0; i -= every) xTicks.unshift(i);
  if (xTicks[0] !== 0 && xTicks[0] >= every / 2) xTicks.unshift(0);
  else if (xTicks[0] !== 0) xTicks[0] = 0;

  const indexAt = (clientX: number) => {
    const el = ref.current;
    if (!el) return 0;
    const r = el.getBoundingClientRect();
    const x = clientX - r.left;
    return n <= 1 ? 0 : Math.round(((x - pad.l) / iw) * (n - 1));
  };
  const { index: hi, handlers } = useChartPointer(ref, n, indexAt);

  return (
    <div
      className={cx('amb-chart', props.className)}
      ref={ref}
      tabIndex={0}
      role="group"
      aria-label={(props.title || 'Line chart') + '. Use left and right arrow keys to read values.'}
      {...handlers}
    >
      <Legend series={series} line />
      <svg height={H} viewBox={'0 0 ' + W + ' ' + H} role="img" aria-label={props.title || 'Line chart'}>
        {ticks.map((t, i) => (
          <g key={'t' + i}>
            <line className={i === 0 ? 'amb-baseline' : 'amb-grid-line'} x1={pad.l} x2={pad.l + iw} y1={ys(t)} y2={ys(t)} />
            <text className="amb-tick" x={pad.l - 8} y={ys(t) + 4} textAnchor="end">
              {fmt(t)}
            </text>
          </g>
        ))}
        {xTicks.map((i) => (
          <text key={'x' + i} className="amb-tick" x={xs(i)} y={H - 8} textAnchor={i === 0 ? 'start' : i === n - 1 ? 'end' : 'middle'}>
            {labels[i]}
          </text>
        ))}
        {props.area !== false
          ? series.map((s, si) => {
              if (si !== 0) return null;
              const pts = s.values.map((v, i): Point => [xs(i), ys(v)]);
              const d = monotonePath(pts) + 'L' + xs(s.values.length - 1) + ' ' + ys(0) + 'L' + xs(0) + ' ' + ys(0) + 'Z';
              return <path key={'a' + si} className={'amb-area amb-series-' + (si + 1)} d={d} stroke="none" />;
            })
          : null}
        {series.map((s, si) => (
          <path key={'l' + si} className={'amb-line amb-series-' + (si + 1)} d={paths[si]} />
        ))}
        {hi != null ? <line className="amb-crosshair" x1={xs(hi)} x2={xs(hi)} y1={pad.t} y2={pad.t + ih} /> : null}
        {series.map((s, si) => {
          const last = s.values.length - 1;
          return (
            <g key={'e' + si}>
              {hi != null && hi <= last ? (
                <circle className={'amb-hover-dot amb-series-' + (si + 1)} cx={xs(hi)} cy={ys(s.values[hi])} r={5} />
              ) : null}
              {hi == null ? <circle className={'amb-end-dot amb-series-' + (si + 1)} cx={xs(last)} cy={ys(s.values[last])} r={4} /> : null}
              {endLabels && hi == null ? (
                <text className="amb-end-label" x={xs(last) + 10} y={ys(s.values[last]) + 4}>
                  {fmt(s.values[last])}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
      {hi != null ? (
        <Tip
          x={xs(hi)}
          y={pad.t + 8}
          title={labels[hi]}
          rows={series.map((s, si) => ({
            key: series.length > 1 ? si : null,
            label: series.length > 1 ? s.name : props.valueLabel || 'Value',
            value: fmt(s.values[hi]),
          }))}
        />
      ) : null}
      <DataTable caption={props.title} series={series} labels={labels} />
    </div>
  );
}
