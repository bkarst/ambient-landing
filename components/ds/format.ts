/* Number formatting, copied verbatim from bundle.js. */

export function compact(v: number, prefix?: string): string {
  prefix = prefix || '';
  const a = Math.abs(v);
  const s = v < 0 ? '-' : '';
  let out: string;
  if (a >= 1e9) out = trim(a / 1e9) + 'B';
  else if (a >= 1e6) out = trim(a / 1e6) + 'M';
  else if (a >= 1e4) out = trim(a / 1e3) + 'K';
  else if (a >= 1000) out = Math.round(a).toLocaleString('en-US');
  else if (a >= 100) out = String(Math.round(a));
  else out = String(Math.round(a * 10) / 10);
  return s + prefix + out;
  function trim(x: number): string {
    return x >= 100 ? String(Math.round(x)) : x >= 10 ? String(Math.round(x * 10) / 10) : String(Math.round(x * 100) / 100);
  }
}

/** Serializable alternative to a `format` function, so Server Components can pass it across the client boundary. */
export type FormatKey = 'currency' | 'compact' | 'tokens' | 'percent';

export function resolveFormat(key: FormatKey | undefined, prefix?: string): (v: number) => string {
  switch (key) {
    case 'currency':
      return (v) => compact(v, '$');
    case 'percent':
      return (v) => `${Math.round(v)}%`;
    case 'compact':
    case 'tokens':
      return (v) => compact(v);
    default:
      return (v) => compact(v, prefix);
  }
}

export const format = { compact };
