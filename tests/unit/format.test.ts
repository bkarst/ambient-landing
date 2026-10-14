import { describe, expect, it } from 'vitest';
import { compact, resolveFormat } from '@/components/ds/format';

describe('format.compact (parity with the design-system bundle)', () => {
  it('matches the examples in the brand book', () => {
    expect(compact(12428)).toBe('12.4K');
    expect(compact(1300000)).toBe('1.3M');
    expect(compact(128400, '$')).toBe('$128K');
  });
  it('keeps thousands below 10,000 with separators', () => {
    expect(compact(4218)).toBe('4,218');
    expect(compact(4218, '$')).toBe('$4,218');
  });
  it('rounds small numbers', () => {
    expect(compact(42)).toBe('42');
    expect(compact(99.99)).toBe('100');
    expect(compact(12.34)).toBe('12.3');
    expect(compact(0)).toBe('0');
  });
  it('handles negatives and billions', () => {
    expect(compact(-8200)).toBe('-8,200');
    expect(compact(-128400, '$')).toBe('-$128K');
    expect(compact(2_450_000_000)).toBe('2.45B');
    expect(compact(684_000_000)).toBe('684M');
  });
});

describe('resolveFormat', () => {
  it('maps the serializable keys', () => {
    expect(resolveFormat('currency')(128400)).toBe('$128K');
    expect(resolveFormat('compact')(684_000_000)).toBe('684M');
    expect(resolveFormat('tokens')(2_710_000)).toBe('2.71M');
    expect(resolveFormat('percent')(41.25)).toBe('41%');
    expect(resolveFormat(undefined, '$')(4218)).toBe('$4,218');
  });
});
