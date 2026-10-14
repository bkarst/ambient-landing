'use client';

import { useId, useRef, useState } from 'react';
import { LineChart } from '@/components/mui/LineChart';
import { Select } from '@/components/ds/Select';
import { track } from '@/lib/analytics';
import { gsap, useGSAP, motionOff } from './gsap';

export interface RangeOption {
  id: string;
  label: string;
  labels: readonly string[];
  series: readonly { name: string; values: readonly number[] }[];
}

interface RangeLineChartProps {
  chartId: string;
  title: string;
  ranges: readonly RangeOption[];
  height?: number;
  format?: 'currency' | 'compact' | 'tokens' | 'percent';
  selectLabel: string;
  /** Where to render the select: the chart's parent Card passes it through `action` by rendering <RangeSelect/> separately. */
  className?: string;
}

/**
 * A line chart with a working time-range select (§7.3). The select switches between precomputed
 * fixtures; the new line draws in 0.5 s and the chart's accessible name announces the range.
 */
export function RangeLineChart({ chartId, title, ranges, height, format = 'currency', selectLabel, className }: RangeLineChartProps) {
  const [rangeId, setRangeId] = useState(ranges[0].id);
  const range = ranges.find((r) => r.id === rangeId) ?? ranges[0];
  const ref = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  const id = useId();

  useGSAP(
    () => {
      if (first.current) {
        first.current = false;
        return;
      }
      if (!ref.current || motionOff()) return;
      const lines = ref.current.querySelectorAll('.amb-line, .MuiLineChart-line');
      gsap.fromTo(lines, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.5, ease: 'amb-out', stagger: 0.05 });
    },
    { scope: ref, dependencies: [rangeId] },
  );

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Select
          id={`${id}-range`}
          size="sm"
          label={selectLabel}
          value={rangeId}
          options={ranges.map((r) => ({ value: r.id, label: r.label }))}
          onChange={(e) => {
            setRangeId(e.currentTarget.value);
            track({ name: 'chart_range_change', chart: chartId, range: e.currentTarget.value });
          }}
        />
      </div>
      <LineChart
        ref={ref}
        title={`${title}, ${range.label.toLowerCase()}`}
        labels={[...range.labels]}
        series={range.series.map((s) => ({ name: s.name, values: [...s.values] }))}
        height={height}
        format={format}
      />
    </div>
  );
}
