'use client';

import type { ReactNode } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { muiTheme } from './theme';

/**
 * Emotion's SSR cache plus the design-system MUI theme. The generated styles sit in `@layer mui`, so the
 * design system's own stylesheets (unlayered) always win when both target an element.
 */
export function MuiProvider({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true, key: 'mui' }}>
      <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
    </AppRouterCacheProvider>
  );
}
