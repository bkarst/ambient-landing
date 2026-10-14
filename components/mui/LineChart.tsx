'use client';

import { useImperativeHandle, type Ref } from 'react';
import { LineChart as MuiLineChart } from '@mui/x-charts/LineChart';
import { useXScale, useYScale } from '@mui/x-charts/hooks';
import { DataTable } from '@/components/ds/DataTable';
import type { Series } from '@/components/ds/Legend';
import { resolveFormat, type FormatKey } from '@/components/ds/format';
import { cx } from '@/components/ds/geometry';
import { useWidth } from '@/components/ds/useWidth';
import { CHART_COLORS } from './theme';
import { legendPosition, tickLabelStyle } from './chart-shared';

export interface LineChartProps {
  series: Series[];
  labels: string[];
  height?: number;
  /** Initial width before the chart measures its container */
  width?: number;
  prefix?: string;
  /** Serializable formatter key, so Server Components can pass it across the client boundary */
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

/**
 * The design-system line chart drawn by MUI X Charts. Keeps the ported chart's props and class hooks
 * (`.amb-chart`, `.amb-end-dot`, `.amb-end-label`) so the dashboard and its GSAP choreography are unchanged.
 */
export function LineChart({ ref: forwardedRef, ...props }: LineChartProps) {
  const series = props.series || [];
  const labels = props.labels || [];
  const height = props.height || 220;
  const fmt = resolveFormat(props.format, props.prefix);
  const [ref] = useWidth(props.width || 600);
  useImperativeHandle(forwardedRef, () => ref.current as HTMLDivElement, [ref]);
  const endLabels = props.endLabels !== false;
  const single = series.length === 1;
  const title = props.title || 'Line chart';

  return (
    <div className={cx('amb-chart amb-mui', props.className)} ref={ref} role="group" aria-label={title} data-chart="line">
      <MuiLineChart
        height={height}
        colors={CHART_COLORS}
        skipAnimation
        hideLegend={series.length < 2}
        margin={{ top: 12, right: endLabels ? 52 : 12, bottom: 0, left: 0 }}
        xAxis={[{ id: 'x', scaleType: 'point', data: labels, disableLine: true, disableTicks: true, tickLabelStyle, height: 28 }]}
        yAxis={[{ id: 'y', min: 0, tickNumber: props.ticks || 4, valueFormatter: (v: number) => fmt(v), disableLine: true, disableTicks: true, tickLabelStyle, width: 56 }]}
        series={series.map((s, i) => ({
          id: `s${i}`,
          label: single ? props.valueLabel || 'Value' : s.name,
          data: [...s.values],
          color: CHART_COLORS[i % CHART_COLORS.length],
          area: props.area !== false && i === 0,
          showMark: false,
          curve: 'monotoneX',
          valueFormatter: (v: number | null) => (v == null ? '' : fmt(v)),
        }))}
        grid={{ horizontal: true }}
        axisHighlight={{ x: 'line' }}
        slotProps={{ legend: { position: legendPosition }, tooltip: { trigger: 'axis' } }}
      >
        {endLabels ? <EndLabels series={series} labels={labels} fmt={fmt} /> : null}
      </MuiLineChart>
      <DataTable caption={props.title} series={series} labels={labels} />
    </div>
  );
}

/** The design system prints each series' last value at the line's end, with a dot; MUI exposes the scales for it. */
function EndLabels({ series, labels, fmt }: { series: Series[]; labels: string[]; fmt: (v: number) => string }) {
  const xScale = useXScale<'point'>('x');
  const yScale = useYScale<'linear'>('y');
  return (
    <g className="amb-ends">
      {series.map((s, i) => {
        const last = s.values.length - 1;
        if (last < 0) return null;
        const x = xScale(labels[last]);
        const y = yScale(s.values[last]);
        if (x == null || y == null) return null;
        return (
          <g key={i}>
            <circle className={`amb-end-dot amb-series-${i + 1}`} cx={x} cy={y} r={4} />
            <text className="amb-end-label" x={x + 10} y={y + 4}>
              {fmt(s.values[last])}
            </text>
          </g>
        );
      })}
    </g>
  );
}
