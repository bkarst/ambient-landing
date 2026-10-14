/* Chart geometry, copied verbatim from bundle.js. */

export function niceTicks(max: number, count: number): number[] {
  if (!(max > 0)) return [0, 1];
  const raw = max / count;
  const p = Math.pow(10, Math.floor(Math.log10(raw)));
  let step = p;
  let best = Infinity;
  [1, 2, 2.5, 5, 10].forEach(function (m) {
    const c = Math.ceil(max / (m * p));
    const score = Math.abs(c - count) - (c > count ? 0.1 : 0);
    if (score < best) {
      best = score;
      step = m * p;
    }
  });
  const ticks = [0];
  let t = 0;
  while (t < max - step * 1e-9) {
    t += step;
    ticks.push(Math.round(t * 1e6) / 1e6);
  }
  return ticks;
}

export type Point = [number, number];

export function monotonePath(pts: Point[]): string {
  const n = pts.length;
  if (n === 0) return '';
  if (n === 1) return 'M' + pts[0][0] + ' ' + pts[0][1];
  const d: number[] = [];
  const m: number[] = [];
  let i: number;
  for (i = 0; i < n - 1; i++) {
    const dx = pts[i + 1][0] - pts[i][0];
    d.push(dx === 0 ? 0 : (pts[i + 1][1] - pts[i][1]) / dx);
  }
  m[0] = d[0];
  m[n - 1] = d[n - 2];
  for (i = 1; i < n - 1; i++) m[i] = d[i - 1] * d[i] <= 0 ? 0 : (d[i - 1] + d[i]) / 2;
  for (i = 0; i < n - 1; i++) {
    if (d[i] === 0) {
      m[i] = 0;
      m[i + 1] = 0;
      continue;
    }
    const a = m[i] / d[i];
    const b = m[i + 1] / d[i];
    const s = a * a + b * b;
    if (s > 9) {
      const t = 3 / Math.sqrt(s);
      m[i] = t * a * d[i];
      m[i + 1] = t * b * d[i];
    }
  }
  let path = 'M' + f(pts[0][0]) + ' ' + f(pts[0][1]);
  for (i = 0; i < n - 1; i++) {
    const x0 = pts[i][0],
      y0 = pts[i][1],
      x1 = pts[i + 1][0],
      y1 = pts[i + 1][1],
      dx2 = (x1 - x0) / 3;
    path +=
      'C' + f(x0 + dx2) + ' ' + f(y0 + m[i] * dx2) + ' ' + f(x1 - dx2) + ' ' + f(y1 - m[i + 1] * dx2) + ' ' + f(x1) + ' ' + f(y1);
  }
  return path;
  function f(v: number): number {
    return Math.round(v * 100) / 100;
  }
}

export function cx(...args: Array<string | false | null | undefined>): string {
  const out: string[] = [];
  for (const a of args) if (a) out.push(a);
  return out.join(' ');
}
