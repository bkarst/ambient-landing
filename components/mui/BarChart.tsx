'use client';

import { useImperativeHandle, type Ref } from 'react';
import { BarChart as MuiBarChart } from '@mui/x-charts/BarChart';
import { DataTable } from '@/components/ds/DataTable';
import type { Series } from '@/components/ds/Legend';
import { resolveFormat, type FormatKey } from '@/components/ds/format';
import { cx } from '@/components/ds/geometry';
import { useWidth } from '@/components/ds/useWidth';
import { CHART_COLORS } from './theme';
import { categoryLabelStyle, legendPosition, tickLabelStyle } from './chart-shared';

export interface BarChartProps {
  series: Series[];
  labels: string[];
  stacked?: boolean;
  /** Ranked rows, biggest first — sort the data */
  horizontal?: boolean;
  /** Print the value at each bar's end (horizontal, or a single vertical series) */
  valueLabels?: boolean;
  /** Width of the category column when horizontal (default 96) */
  labelWidth?: number;
  /** Bar thickness, capped at 24 */
  thickness?: number;
  height?: number;
  width?: number;
  prefix?: string;
  format?: FormatKey;
  title?: string;
  valueLabel?: string;
  ticks?: number;
  className?: string;
  ref?: Ref<HTMLDivElement>;
}

const GAP = 2;

/**
 * The design-system bar chart drawn by MUI X Charts: grouped or stacked columns, or ranked horizontal bars.
 * Bars keep the system's 24 px cap and 2 px gap by turning the measured slot into MUI's gap ratios.
 */
export function BarChart({ ref: forwardedRef, ...props }: BarChartProps) {
  const series = props.series || [];
  const labels = props.labels || [];
  const horizontal = !!props.horizontal;
  const stacked = !!props.stacked;
  const fmt = resolveFormat(props.format, props.prefix);
  const [ref, width] = useWidth(props.width || 600);
  useImperativeHandle(forwardedRef, () => ref.current as HTMLDivElement, [ref]);
  const n = Math.max(1, labels.length);
  const S = Math.max(1, series.length);
  const thick = Math.min(24, props.thickness || 24);
  const showValues = !!props.valueLabels && (horizontal || S === 1 || stacked);
  const height = props.height || (horizontal ? n * (thick + 14) + 24 : 220);
  const catW = horizontal ? props.labelWidth || 96 : 0;
  const margin = horizontal ? { top: 8, right: showValues ? 56 : 12, bottom: 8, left: 0 } : { top: showValues ? 20 : 12, right: 8, bottom: 0, left: 0 };

  // Slot per category along the band axis, then the design system's bar sizing, expressed as MUI ratios.
  const span = horizontal ? height - margin.top - margin.bottom : Math.max(10, width - 56 - margin.right);
  const slot = span / n;
  const perBar = stacked ? Math.min(thick, slot * 0.6) : Math.max(1, Math.min(thick, (slot * 0.7 - GAP * (S - 1)) / S));
  const group = stacked ? perBar : perBar * S + GAP * (S - 1);
  const categoryGapRatio = Math.min(0.95, Math.max(0, 1 - group / slot));
  const barGapRatio = stacked ? 0 : GAP / perBar;
  const title = props.title || 'Bar chart';
  const single = S === 1;

  const bandAxis = {
    scaleType: 'band' as const,
    data: labels,
    categoryGapRatio,
    barGapRatio,
    disableTicks: true,
    disableLine: !horizontal,
    tickLabelStyle: horizontal ? categoryLabelStyle : tickLabelStyle,
  };
  // MUI clips the plot (labels included) to the drawing area, so leave headroom on the value axis for the
  // printed values: enough for the widest label plus its 8 px offset along the bars' direction.
  const totals = labels.map((_, i) => (stacked ? series.reduce((a, s) => a + (s.values[i] || 0), 0) : Math.max(0, ...series.map((s) => s.values[i] || 0))));
  const maxValue = Math.max(0, ...totals);
  let max: number | undefined;
  if (showValues && maxValue > 0) {
    const run = horizontal ? Math.max(10, width - (catW + 8) - margin.right) : height - margin.top - margin.bottom - 28;
    const room = horizontal ? fmt(maxValue).length * 7.5 + 12 : 22;
    max = maxValue / Math.max(0.5, 1 - room / run);
  }
  const valueAxis = {
    min: 0,
    max,
    tickNumber: props.ticks || 4,
    valueFormatter: (v: number) => fmt(v),
    disableTicks: true,
    disableLine: true,
    tickLabelStyle,
  };

  return (
    <div
      className={cx('amb-chart amb-mui', props.className)}
      ref={ref}
      role="group"
      aria-label={title}
      data-horizontal={horizontal ? '' : undefined}
      data-chart="bar"
    >
      <MuiBarChart
        height={height}
        layout={horizontal ? 'horizontal' : 'vertical'}
        colors={CHART_COLORS}
        skipAnimation
        borderRadius={4}
        renderer="svg-single"
        hideLegend={series.length < 2}
        margin={margin}
        xAxis={horizontal ? [{ id: 'v', ...valueAxis, position: 'none' }] : [{ id: 'c', ...bandAxis, height: 28 }]}
        yAxis={horizontal ? [{ id: 'c', ...bandAxis, width: catW + 8 }] : [{ id: 'v', ...valueAxis, width: 56 }]}
        series={series.map((s, i) => ({
          id: `s${i}`,
          label: single ? props.valueLabel || 'Value' : s.name,
          data: [...s.values],
          color: CHART_COLORS[i % CHART_COLORS.length],
          stack: stacked ? 'total' : undefined,
          valueFormatter: (v: number | null) => (v == null ? '' : fmt(v)),
          barLabel: showValues && (!stacked || i === S - 1) ? (item: { value: number | null }) => (item.value == null ? null : fmt(item.value)) : undefined,
          barLabelPlacement: 'outside' as const,
        }))}
        grid={horizontal ? undefined : { horizontal: true }}
        axisHighlight={horizontal ? { y: 'band' } : { x: 'band' }}
        slotProps={{ legend: { position: legendPosition }, tooltip: { trigger: 'axis' } }}
      />
      <DataTable caption={props.title} series={series} labels={labels} />
    </div>
  );
}
