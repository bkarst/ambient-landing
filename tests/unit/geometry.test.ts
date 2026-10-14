import { describe, expect, it } from 'vitest';
import { monotonePath, niceTicks } from '@/components/ds/geometry';

describe('niceTicks', () => {
  it('starts at zero and ends at the next clean step', () => {
    const t = niceTicks(128400, 4);
    expect(t[0]).toBe(0);
    expect(t[t.length - 1]).toBeGreaterThanOrEqual(128400);
    expect(t).toEqual([0, 50000, 100000, 150000]);
  });
  it('returns [0, 1] for empty data', () => {
    expect(niceTicks(0, 4)).toEqual([0, 1]);
  });
  it('picks a step close to the requested count', () => {
    expect(niceTicks(100, 4)).toEqual([0, 25, 50, 75, 100]);
  });
});

describe('monotonePath', () => {
  it('handles degenerate inputs', () => {
    expect(monotonePath([])).toBe('');
    expect(monotonePath([[1, 2]])).toBe('M1 2');
  });
  it('draws a straight segment for two points', () => {
    expect(monotonePath([[0, 0], [30, 30]])).toBe('M0 0C10 10 20 20 30 30');
  });
  it('flattens at a local extreme so it never overshoots', () => {
    const d = monotonePath([[0, 0], [10, 10], [20, 0]]);
    expect(d.startsWith('M0 0C')).toBe(true);
    // the tangent at the peak is zero, so the control points beside x=10 sit at y=10
    expect(d).toContain('6.67 10 10 10');
    expect(d).toContain('C13.33 10');
  });
});
