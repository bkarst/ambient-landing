import { cacheLife } from 'next/cache';

/** The copyright year. Cached for a day so the page stays static under Cache Components. */
export async function currentYear(): Promise<number> {
  'use cache';
  cacheLife('days');
  return new Date().getFullYear();
}
