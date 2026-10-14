'use client';

import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { useXScale, useYScale } from '@mui/x-charts/hooks';

export interface SparkProps {
  values?: number[];
  width?: number;
  height?: number;
}

/** The stat tile's sparkline, drawn by MUI's SparkLineChart with the system's wash and end dot. */
export function Spark(props: SparkProps) {
  const vals = props.values || [];
  const w = props.width || 96;
  const h = props.height || 32;
  if (vals.length < 2) return null;
  return (
    <div className="amb-spark amb-mui" aria-hidden="true" style={{ width: w, height: h }}>
      <SparkLineChart
        data={vals}
        width={w}
        height={h}
        margin={{ top: 3, right: 4, bottom: 3, left: 2 }}
        color="var(--chart-1)"
        curve="monotoneX"
        area
        baseline="min"
        skipAnimation
        disableAxisListener
        disableKeyboardNavigation
        disableClipping
      >
        <EndDot values={vals} />
      </SparkLineChart>
    </div>
  );
}

function EndDot({ values }: { values: number[] }) {
  const xScale = useXScale<'point'>();
  const yScale = useYScale<'linear'>();
  const last = values.length - 1;
  const x = xScale(last);
  const y = yScale(values[last]);
  if (x == null || y == null) return null;
  return <circle className="amb-spark-dot" cx={x} cy={y} r={3.5} />;
}
