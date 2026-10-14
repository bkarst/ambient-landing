'use client';

import { useImperativeHandle, type ReactElement, type Ref } from 'react';
import { DataTable } from './DataTable';
import { Legend, type Series } from './Legend';
import { Tip, type TipRow } from './Tip';
import { resolveFormat, type FormatKey } from './format';
import { cx, niceTicks } from './geometry';
import { useChartPointer } from './useChartPointer';
import { useWidth } from './useWidth';

export interface BarChartProps {
  series: Series[];
  labels: string[];
  stacked?: boolean;
  /** Ranked rows, biggest first — sort the data */
  horizontal?: boolean;
  /** Print the value at each bar's end (horizontal, or a single vertical series) */
  valueLabels?: boolean;
  /** Width of the category column when horizontal (default 96); minimum spacing of x labels when vertical (default 40) */
  labelWidth?: number;
  /** Bar thickness, capped at 24 */
  thickness?: number;
  height?: number;
  width?: number;
  prefix?: string;
  /** Serializable formatter key (replaces the bundle's function prop) */
  format?: FormatKey;
  title?: string;
  valueLabel?: string;
  ticks?: number;
  className?: string;
  ref?: Ref<HTMLDivElement>;
}

export function BarChart({ ref: forwardedRef, ...props }: BarChartProps) {
  const series = props.series || [];
  const labels = props.labels || [];
  const horizontal = !!props.horizontal;
  const stacked = !!props.stacked;
  const fmt = resolveFormat(props.format, props.prefix);
  const [ref, width] = useWidth(props.width || 600);
  useImperativeHandle(forwardedRef, () => ref.current as HTMLDivElement, [ref]);
  const n = labels.length;
  const S = series.length;
  const thick = props.thickness || 24;
  const gap = 2;
  const totals = labels.map((_, i) =>
    stacked ? series.reduce((a, s) => a + (s.values[i] || 0), 0) : Math.max(...series.map((s) => s.values[i] || 0)),
  );
  const max = Math.max(0, ...totals);
  const ticks = niceTicks(max, props.ticks || 4);
  const top = ticks[ticks.length - 1];
  const showValues = !!props.valueLabels;
  const height = props.height || (horizontal ? n * (thick + 14) + 24 : 220);
  const catW = horizontal ? props.labelWidth || 96 : 0;
  const pad = horizontal ? { l: catW + 8, r: showValues ? 56 : 12, t: 8, b: 8 } : { l: 44, r: 8, t: showValues ? 20 : 12, b: 28 };
  const W = width;
  const H = height;
  const iw = Math.max(10, W - pad.l - pad.r);
  const ih = H - pad.t - pad.b;
  const slot = horizontal ? ih / Math.max(1, n) : iw / Math.max(1, n);
  const perBar = stacked ? Math.min(thick, slot * 0.6) : Math.min(thick, (slot * 0.7 - gap * (S - 1)) / S);
  const groupSize = stacked ? perBar : perBar * S + gap * (S - 1);
  const scale = (v: number) => (top ? (v / top) * (horizontal ? iw : ih) : 0);

  const indexAt = (clientX: number, clientY: number) => {
    const el = ref.current;
    if (!el) return 0;
    const r = el.getBoundingClientRect();
    // The svg is scaled to the wrapper width; the legend sits above it, so measure from the svg itself.
    const svg = el.querySelector('svg');
    const sr = svg ? svg.getBoundingClientRect() : r;
    const sx = sr.width ? W / sr.width : 1;
    const sy = sr.height ? H / sr.height : 1;
    const x = (clientX - sr.left) * sx;
    const y = (clientY - sr.top) * sy;
    return horizontal ? Math.floor((y - pad.t) / slot) : Math.floor((x - pad.l) / slot);
  };
  const { index: hi, handlers } = useChartPointer(ref, n, indexAt);

  function barPath(x: number, y: number, w: number, hgt: number, rr: number): string {
    /* rounded data end, square at the baseline */
    const r = Math.min(rr, w / 2, hgt);
    if (hgt <= 0 || w <= 0) return '';
    if (horizontal) {
      return 'M' + x + ' ' + y + 'H' + (x + w - r) + 'a' + r + ' ' + r + ' 0 0 1 ' + r + ' ' + r + 'V' + (y + hgt - r) + 'a' + r + ' ' + r + ' 0 0 1 -' + r + ' ' + r + 'H' + x + 'Z';
    }
    return 'M' + x + ' ' + (y + hgt) + 'V' + (y + r) + 'a' + r + ' ' + r + ' 0 0 1 ' + r + ' -' + r + 'H' + (x + w - r) + 'a' + r + ' ' + r + ' 0 0 1 ' + r + ' ' + r + 'V' + (y + hgt) + 'Z';
  }

  const bars: ReactElement[] = [];
  const valueLabels: ReactElement[] = [];
  labels.forEach((lab, i) => {
    const start = (horizontal ? pad.t : pad.l) + i * slot + (slot - groupSize) / 2;
    let acc = 0;
    series.forEach((s, si) => {
      const v = s.values[i] || 0;
      const len = scale(v);
      if (!stacked) acc = 0;
      const dim = hi != null && hi !== i;
      const key = 'b' + i + '-' + si;
      const isEnd = stacked ? si === S - 1 : true;
      if (horizontal) {
        const y = stacked ? start : start + si * (perBar + gap);
        const x = pad.l + scale(acc) + (stacked && si > 0 ? gap : 0);
        const w = Math.max(0, len - (stacked && si > 0 ? gap : 0));
        bars.push(
          <path
            key={key}
            className={cx('amb-bar', 'amb-series-' + (si + 1), dim && 'is-dim')}
            d={isEnd ? barPath(x, y, w, perBar, 4) : 'M' + x + ' ' + y + 'h' + w + 'v' + perBar + 'h-' + w + 'Z'}
            stroke="none"
          />,
        );
        if (showValues && isEnd)
          valueLabels.push(
            <text key={'v' + key} className="amb-bar-label" x={pad.l + scale(acc + v) + 8} y={y + perBar / 2 + 4}>
              {fmt(stacked ? acc + v : v)}
            </text>,
          );
      } else {
        const bx = stacked ? start : start + si * (perBar + gap);
        const by = pad.t + ih - scale(acc + v);
        const bh = Math.max(0, len - (stacked && si > 0 ? gap : 0));
        bars.push(
          <path
            key={key}
            className={cx('amb-bar', 'amb-series-' + (si + 1), dim && 'is-dim')}
            d={isEnd ? barPath(bx, by, perBar, bh, 4) : 'M' + bx + ' ' + by + 'h' + perBar + 'v' + bh + 'h-' + perBar + 'Z'}
            stroke="none"
          />,
        );
        if (showValues && isEnd && S === 1)
          valueLabels.push(
            <text key={'v' + key} className="amb-bar-label" x={bx + perBar / 2} y={by - 6} textAnchor="middle">
              {fmt(v)}
            </text>,
          );
      }
      acc += v;
    });
  });
  const hits = labels.map((_, i) => {
    const p = horizontal ? { x: pad.l, y: pad.t + i * slot, width: iw, height: slot } : { x: pad.l + i * slot, y: pad.t, width: slot, height: ih };
    return <rect key={'h' + i} className="amb-hit" {...p} />;
  });
  let tipX: number | undefined;
  let tipY: number | undefined;
  if (hi != null) {
    if (horizontal) {
      tipX = pad.l + Math.min(iw, scale(totals[hi]));
      tipY = pad.t + hi * slot + slot / 2 + 10;
    } else {
      tipX = pad.l + hi * slot + slot / 2;
      tipY = pad.t + 4;
    }
  }
  const rows: TipRow[] =
    hi != null
      ? series
          .map((s, si): TipRow => ({ key: S > 1 ? si : null, label: S > 1 ? s.name : props.valueLabel || 'Value', value: fmt(s.values[hi] || 0) }))
          .concat(stacked && S > 1 ? [{ key: null, label: 'Total', value: fmt(totals[hi]) }] : [])
      : [];
  return (
    <div
      className={cx('amb-chart', props.className)}
      ref={ref}
      tabIndex={0}
      role="group"
      aria-label={(props.title || 'Bar chart') + '. Use left and right arrow keys to read values.'}
      data-horizontal={horizontal ? '' : undefined}
      {...handlers}
    >
      <Legend series={series} />
      <svg height={H} viewBox={'0 0 ' + W + ' ' + H} role="img" aria-label={props.title || 'Bar chart'}>
        {horizontal
          ? null
          : ticks.map((t, i) => {
              const y = pad.t + ih - scale(t);
              return (
                <g key={'t' + i}>
                  <line className={i === 0 ? 'amb-baseline' : 'amb-grid-line'} x1={pad.l} x2={pad.l + iw} y1={y} y2={y} />
                  <text className="amb-tick" x={pad.l - 8} y={y + 4} textAnchor="end">
                    {fmt(t)}
                  </text>
                </g>
              );
            })}
        {horizontal ? <line className="amb-baseline" x1={pad.l} x2={pad.l} y1={pad.t} y2={pad.t + ih} /> : null}
        {horizontal
          ? labels.map((lab, i) => (
              <text key={'c' + i} className="amb-cat-label" x={pad.l - 12} y={pad.t + i * slot + slot / 2 + 4} textAnchor="end">
                {lab}
              </text>
            ))
          : labels.map((lab, i) => {
              const every = Math.max(1, Math.ceil((props.labelWidth || 40) / slot));
              if (i % every) return null;
              return (
                <text key={'c' + i} className="amb-tick" x={pad.l + i * slot + slot / 2} y={H - 8} textAnchor="middle">
                  {lab}
                </text>
              );
            })}
        {bars}
        {valueLabels}
        {hits}
      </svg>
      {hi != null ? <Tip x={tipX} y={tipY} title={labels[hi]} rows={rows} /> : null}
      <DataTable caption={props.title} series={series} labels={labels} />
    </div>
  );
}
