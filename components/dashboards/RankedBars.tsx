'use client';

import { useWidth } from '@/components/ds/useWidth';
import { BarChart } from '@/components/mui/BarChart';
import type { FormatKey } from '@/components/ds/format';

interface RankedBarsProps {
  title: string;
  seriesName: string;
  points: readonly { label: string; value: number }[];
  /** Shorter labels used when the chart is narrower than 520 px */
  shortLabels?: Readonly<Record<string, string>>;
  format?: FormatKey;
  height?: number;
  className?: string;
}

/**
 * A ranked horizontal BarChart that adapts its category column to the space available, so long task and
 * team names never squeeze the bars on a phone. Everything else is the design-system chart.
 */
export function RankedBars({ title, seriesName, points, shortLabels, format = 'currency', height, className }: RankedBarsProps) {
  const [ref, width] = useWidth(600);
  const narrow = width < 520;
  const labels = points.map((p) => (narrow && shortLabels?.[p.label]) || p.label);
  const longest = Math.max(...labels.map((l) => l.length));
  const labelWidth = Math.min(narrow ? 128 : 200, Math.max(72, Math.round(longest * (narrow ? 6.4 : 6.8))));
  return (
    <div ref={ref} className={className}>
      <BarChart
        title={title}
        horizontal
        valueLabels
        labelWidth={labelWidth}
        labels={labels}
        series={[{ name: seriesName, values: points.map((p) => p.value) }]}
        format={format}
        height={height}
      />
    </div>
  );
}
