import { createTheme } from '@mui/material/styles';

/**
 * The MUI theme the dashboard charts render with. Every colour is a design-system CSS variable, so the
 * charts follow the page's dark/light appearance (`data-theme` on <html>) without a second colour table.
 * Each palette colour lists all four values so MUI never has to derive one from a `var()` string.
 */
const varColor = (name: string) => ({
  main: `var(${name})`,
  light: `var(${name})`,
  dark: `var(${name})`,
  contrastText: 'var(--on-accent)',
});

export const CHART_COLORS = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)'];

export const muiTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: varColor('--accent'),
    secondary: varColor('--chart-2'),
    success: varColor('--positive'),
    error: varColor('--negative'),
    background: { default: 'var(--surface)', paper: 'var(--surface-raised)' },
    text: { primary: 'var(--ink)', secondary: 'var(--ink-secondary)', disabled: 'var(--ink-disabled)' },
    divider: 'var(--chart-grid)',
  },
  typography: {
    fontFamily: 'var(--font-sans)',
    // Axis ticks and the legend
    caption: { fontSize: 12, lineHeight: '16px', fontWeight: 500, fontFamily: 'var(--font-sans)' },
    // Bar value labels
    body2: { fontSize: 12, lineHeight: '16px', fontWeight: 600, fontFamily: 'var(--font-sans)' },
    body1: { fontSize: 13, lineHeight: '18px', fontWeight: 500, fontFamily: 'var(--font-sans)' },
    fontWeightMedium: 600,
  },
  shape: { borderRadius: 8 },
  components: {
    MuiPopper: { defaultProps: { disablePortal: false } },
  },
});
