import { site } from '@/config/site';
import { LOGO_DOTS } from './logo-dots';
import { LOGO_DOTS_COARSE } from './logo-dots-coarse';
import { cx } from './geometry';

const LOGO_INK: Record<string, string> = { gold: 'var(--gold)', accent: 'var(--accent)', ink: 'currentColor' };

export interface MarkProps {
  size?: number;
  ink?: 'gold' | 'accent' | 'ink' | string;
  /** `auto` (default): the 325-dot original at 64px and above, the 64-dot coarse drawing below · `fine` · `coarse` */
  density?: MarkDensity;
  className?: string;
  decorative?: boolean;
}

export const MARK_SYMBOL_ID = 'amb-mark-dots';
export const MARK_COARSE_SYMBOL_ID = 'amb-mark-dots-coarse';

/** Below this rendered size the 325-dot mark dissolves into a blob, so `Mark` switches to the 64-dot coarse drawing. */
export const MARK_COARSE_BELOW = 64;

export type MarkDensity = 'auto' | 'fine' | 'coarse';

function circlesOf(dots: readonly number[]) {
  const circles = [];
  for (let i = 0; i < dots.length; i += 3) {
    circles.push(<circle key={i} cx={dots[i]} cy={dots[i + 1]} r={dots[i + 2]} />);
  }
  return circles;
}

/**
 * The mark's dots, defined once per document as SVG symbols: the 325-dot original and the 64-dot coarse
 * version for small sizes. Render it once (the root layout does), then every `Mark` references one with
 * `<use>`, which keeps the HTML small however many marks a page shows.
 */
export function MarkDefs() {
  return (
    <svg width={0} height={0} style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true" focusable="false">
      <symbol id={MARK_SYMBOL_ID} viewBox="0 0 1000 1000">
        {circlesOf(LOGO_DOTS)}
      </symbol>
      <symbol id={MARK_COARSE_SYMBOL_ID} viewBox="0 0 1000 1000">
        {circlesOf(LOGO_DOTS_COARSE)}
      </symbol>
    </svg>
  );
}

export function Mark(props: MarkProps) {
  const size = props.size || 40;
  const ink = LOGO_INK[props.ink || 'gold'] || props.ink;
  const density = props.density || 'auto';
  const coarse = density === 'coarse' || (density === 'auto' && size < MARK_COARSE_BELOW);
  return (
    <svg
      className={cx('amb-logo-mark', props.className)}
      width={size}
      height={size}
      viewBox="0 0 1000 1000"
      style={{ fill: ink }}
      aria-hidden={props.decorative ? 'true' : undefined}
      role={props.decorative ? undefined : 'img'}
      aria-label={props.decorative ? undefined : site.name}
    >
      <use href={`#${coarse ? MARK_COARSE_SYMBOL_ID : MARK_SYMBOL_ID}`} />
    </svg>
  );
}

export interface LogoProps {
  /** `mark` the halftone alone · `wordmark` the word (and tagline) · `lockup` mark + word · `app-icon` the mark on a navy tile */
  variant?: 'mark' | 'wordmark' | 'lockup' | 'app-icon';
  /** Cap height of the word (wordmark, lockup) or the side (mark, app-icon), in px */
  size?: number;
  /** Adds the brand tagline under the word */
  tagline?: boolean;
  /** `gold` (the file's own colour, default) · `accent` (Ambient Yellow) · `ink` (inherit) · any CSS colour */
  ink?: 'gold' | 'accent' | 'ink' | string;
  /** Which drawing of the mark: `auto` (default) picks coarse below 64px rendered size */
  density?: MarkDensity;
  className?: string;
}

export function Logo(props: LogoProps) {
  const variant = props.variant || 'lockup';
  const size = props.size || 32;
  const ink = props.ink || 'gold';
  if (variant === 'mark') return <Mark size={size} ink={ink} density={props.density} className={props.className} />;
  if (variant === 'app-icon') {
    const tile = props.size || 64;
    return (
      <span
        className={cx('amb-logo-tile', props.className)}
        style={{ width: tile, height: tile, borderRadius: Math.round(tile * 0.225) }}
        role="img"
        aria-label={site.name}
      >
        <Mark size={Math.round(tile * 0.68)} ink={ink} density={props.density} decorative />
      </span>
    );
  }
  const word = (
    <span className="amb-logo-word" style={{ fontSize: size }}>
      {site.name}
    </span>
  );
  const tag = props.tagline ? (
    <span className="amb-logo-tag" style={{ fontSize: Math.max(9, Math.round(size * 0.28)) }}>
      {site.taglines.brand}
    </span>
  ) : null;
  if (variant === 'wordmark') {
    return (
      <span className={cx('amb-logo', props.className)}>
        <span className="amb-logo-text">
          {word}
          {tag}
        </span>
      </span>
    );
  }
  return (
    <span className={cx('amb-logo', props.className)}>
      <Mark size={Math.round(size * 1.4)} ink={ink} density={props.density} decorative />
      <span className="amb-logo-text">
        {word}
        {tag}
      </span>
    </span>
  );
}
