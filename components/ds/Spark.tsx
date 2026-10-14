import { monotonePath, type Point } from './geometry';

export interface SparkProps {
  values?: number[];
  width?: number;
  height?: number;
}

export function Spark(props: SparkProps) {
  const vals = props.values || [];
  const w = props.width || 96;
  const hh = props.height || 32;
  if (vals.length < 2) return null;
  const max = Math.max(...vals);
  const min = Math.min(...vals);
  const span = max - min || 1;
  const pts: Point[] = vals.map((v, i) => [2 + (i / (vals.length - 1)) * (w - 4), 3 + (1 - (v - min) / span) * (hh - 6)]);
  const d = monotonePath(pts);
  const last = pts[pts.length - 1];
  return (
    <svg className="amb-spark" width={w} height={hh} viewBox={'0 0 ' + w + ' ' + hh} aria-hidden="true">
      <path className="amb-spark-area" d={d + 'L' + last[0] + ' ' + hh + 'L' + pts[0][0] + ' ' + hh + 'Z'} />
      <path className="amb-spark-line" d={d} />
      <circle className="amb-spark-dot" cx={last[0]} cy={last[1]} r={3.5} />
    </svg>
  );
}
