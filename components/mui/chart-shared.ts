import type { ChartsTextStyle } from '@mui/x-charts/ChartsText';

/** Axis tick labels: the design system's 12 px / 500 ink-muted figures. */
export const tickLabelStyle: ChartsTextStyle = {
  fontSize: 12,
  fontWeight: 500,
  fill: 'var(--ink-muted)',
  fontVariantNumeric: 'tabular-nums',
};

/** Category labels on a ranked bar chart read slightly stronger. */
export const categoryLabelStyle: ChartsTextStyle = {
  fontSize: 12,
  fontWeight: 500,
  fill: 'var(--ink-secondary)',
};

export const legendPosition = { vertical: 'top', horizontal: 'start' } as const;
