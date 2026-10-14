'use client';

import { useSyncExternalStore } from 'react';
import { IconButton } from '@/components/ds/IconButton';
import { landing } from '@/content/landing';
import { theme } from '@/config/theme';

type Appearance = 'dark' | 'light';
const KEY = theme.appearance.storageKey;
const listeners = new Set<() => void>();

function read(): Appearance {
  if (typeof document === 'undefined') return theme.appearance.fallback;
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}
function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
function apply(next: Appearance) {
  document.documentElement.setAttribute('data-theme', next);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme.themeColor[next]);
  try {
    localStorage.setItem(KEY, next);
  } catch {
    /* private mode: the choice lasts for this page only */
  }
  listeners.forEach((cb) => cb());
}

/**
 * Switches the page between the dark default and light (§11.1). The inline script in the root layout applies
 * the stored choice before paint, so this only has to read the attribute and flip it.
 */
export function ThemeToggle() {
  const current = useSyncExternalStore(subscribe, read, () => theme.appearance.fallback);
  const next: Appearance = current === 'dark' ? 'light' : 'dark';
  return (
    <IconButton
      icon={current === 'dark' ? 'sun' : 'moon'}
      label={current === 'dark' ? landing.appearance.toLight : landing.appearance.toDark}
      size="sm"
      variant="ghost"
      onClick={() => apply(next)}
      data-theme-toggle
    />
  );
}
