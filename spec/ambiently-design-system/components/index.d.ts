import type * as React from 'react';

export type IconName =
  | 'data' | 'telemetry' | 'connect' | 'cloud' | 'location' | 'storage' | 'security' | 'people'
  | 'overview' | 'sensors' | 'alerts' | 'settings' | 'search' | 'chevron-down' | 'chevron-up' | 'chevron-right' | 'chevron-left'
  | 'play' | 'arrow-right' | 'arrow-up' | 'arrow-down' | 'arrow-up-right' | 'check' | 'close' | 'plus' | 'minus' | 'more'
  | 'info' | 'calendar' | 'clock' | 'download' | 'filter' | 'spend' | 'model' | 'external';

export interface LogoProps {
  /** `mark` the halftone alone · `wordmark` the word (and tagline) · `lockup` mark + word · `app-icon` the mark on a navy tile */
  variant?: 'mark' | 'wordmark' | 'lockup' | 'app-icon';
  /** Cap height of the word (wordmark, lockup) or the side (mark, app-icon), in px */
  size?: number;
  /** Adds "Real-world insights. Quieter." under the word */
  tagline?: boolean;
  /** `gold` (the file's own colour, default) · `accent` (Ambient Yellow) · `ink` (inherit) · any CSS colour */
  ink?: 'gold' | 'accent' | 'ink' | string;
  className?: string;
}
export declare function Logo(props: LogoProps): React.ReactElement;

export interface IconProps {
  name: IconName;
  /** 16, 20 or 24 */
  size?: number;
  /** Accessible name; omit when the icon sits beside text */
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Icon(props: IconProps): React.ReactElement | null;
export declare namespace Icon { const names: IconName[]; }

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: IconName;
  iconAfter?: IconName;
  /** Renders an <a> instead */
  href?: string;
}
export declare function Button(props: ButtonProps): React.ReactElement;

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconName;
  /** Required: the accessible name and tooltip */
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}
export declare function IconButton(props: IconButtonProps): React.ReactElement;

export interface ToggleProps {
  label?: string;
  'aria-label'?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}
export declare function Toggle(props: ToggleProps): React.ReactElement;

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Array<string | { value: string; label: string }>;
  /** The accessible name */
  label?: string;
  size?: 'sm' | 'md';
}
export declare function Select(props: SelectProps): React.ReactElement;

export interface BadgeProps {
  tone?: 'neutral' | 'accent' | 'positive' | 'negative' | 'outline' | 'live';
  icon?: IconName;
  children?: React.ReactNode;
  className?: string;
}
export declare function Badge(props: BadgeProps): React.ReactElement;

export interface DeltaProps {
  /** Signed change; a percentage unless `suffix` or `format` say otherwise */
  value: number;
  /** false for spend, latency, errors — anything where up is bad */
  upIsGood?: boolean;
  /** "vs last week" */
  period?: string;
  suffix?: string;
  format?: (value: number) => string;
  className?: string;
}
export declare function Delta(props: DeltaProps): React.ReactElement;

export interface CardProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Top-right slot: a Select, Badge or IconButton */
  action?: React.ReactNode;
  compact?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Card(props: CardProps): React.ReactElement;

export interface StatProps {
  label: string;
  /** Numbers are compacted (12,428 · 1.3M · $128K); strings print as given */
  value: number | string;
  prefix?: string;
  unit?: string;
  delta?: number;
  upIsGood?: boolean;
  period?: string;
  caption?: string;
  /** Up to 12 points for the sparkline */
  trend?: number[];
  /** The one 44px figure a view leads with */
  hero?: boolean;
  sparkWidth?: number;
  className?: string;
}
export declare function Stat(props: StatProps): React.ReactElement;

export interface Series { name: string; values: number[] }

export interface LineChartProps {
  series: Series[];
  labels: string[];
  height?: number;
  /** Initial width before the chart measures its container */
  width?: number;
  prefix?: string;
  format?: (value: number) => string;
  /** Accessible name and the hidden table's caption */
  title?: string;
  /** Tooltip label for a single series */
  valueLabel?: string;
  /** Wash under the first series (default true) */
  area?: boolean;
  /** Final values printed at the line ends (default true) */
  endLabels?: boolean;
  /** Number of y gridlines (default 4) */
  ticks?: number;
  className?: string;
}
export declare function LineChart(props: LineChartProps): React.ReactElement;

export interface BarChartProps {
  series: Series[];
  labels: string[];
  stacked?: boolean;
  /** Ranked rows, biggest first — sort the data */
  horizontal?: boolean;
  /** Print the value at each bar's end (horizontal, or a single vertical series) */
  valueLabels?: boolean;
  /** Width of the category column when horizontal (default 96); minimum spacing of x labels when vertical (default 40) */
  labelWidth?: number;
  /** Bar thickness, capped at 24 */
  thickness?: number;
  height?: number;
  width?: number;
  prefix?: string;
  format?: (value: number) => string;
  title?: string;
  valueLabel?: string;
  ticks?: number;
  className?: string;
}
export declare function BarChart(props: BarChartProps): React.ReactElement;

export interface RingProps {
  /** 0–100 */
  value: number;
  /** Printed in the centre; defaults to `${value}%` */
  text?: string;
  label?: string;
  size?: number;
  stroke?: number;
  tone?: 'positive' | 'negative';
  className?: string;
}
export declare function Ring(props: RingProps): React.ReactElement;

export interface NavItem { id?: string; label?: string; icon?: IconName; badge?: number | string; onClick?: () => void; section?: string }
export interface SidebarProps {
  items: NavItem[];
  active?: string;
  onSelect?: (id: string, item: NavItem) => void;
  brand?: React.ReactNode;
  footer?: React.ReactNode;
  /** The nav's accessible name (default "Primary") */
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Sidebar(props: SidebarProps): React.ReactElement;

export declare const format: { compact: (value: number, prefix?: string) => string };

declare global {
  interface Window {
    Ambiently: {
      Logo: typeof Logo; Icon: typeof Icon; Button: typeof Button; IconButton: typeof IconButton; Toggle: typeof Toggle; Select: typeof Select;
      Badge: typeof Badge; Delta: typeof Delta; Card: typeof Card; Stat: typeof Stat; LineChart: typeof LineChart; BarChart: typeof BarChart;
      Ring: typeof Ring; Sidebar: typeof Sidebar; format: typeof format;
    };
  }
}
