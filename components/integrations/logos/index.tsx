/**
 * Integration logos (spec §6.3). Each brand renders as its official symbol beside its name set in Inter,
 * a quiet monochrome row that follows the theme through `currentColor`. Microsoft and monday.com keep their
 * brand colours because their guidelines don't offer a one-colour mark.
 *
 * Artwork comes from `symbol-art.ts`, which records the source of every path. Legal review of logo use is
 * deferred (spec §17, question 6); `useOfficialLogos` switches back to the text-only fallback in one place.
 */
import type { ComponentType, ReactNode } from 'react';
import { site, type IntegrationId } from '@/config/site';
import { symbolArt, mondaySymbol, microsoftSymbol } from './symbol-art';

export const useOfficialLogos = true;

export interface WordmarkProps {
  name: string;
  className?: string;
  decorative?: boolean;
}
export interface SymbolProps {
  name: string;
  size?: number;
  className?: string;
  decorative?: boolean;
}

export interface LogoEntry {
  id: IntegrationId;
  name: string;
  /** Where the artwork came from */
  source?: string;
  /** URL of the brand's usage guidelines */
  guidelines?: string;
  /** Optical-size correction, 0.8–1.2 */
  scale: number;
  Wordmark: ComponentType<WordmarkProps>;
  Symbol: ComponentType<SymbolProps>;
}

/** The symbol's inner SVG elements, shared by the HTML symbols and the How-it-works diagram's nested svgs. */
export function symbolShapes(id: IntegrationId): { viewBox: string; children: ReactNode } {
  if (id === 'microsoft') {
    return {
      viewBox: microsoftSymbol.viewBox,
      children: microsoftSymbol.squares.map((sq) => <rect key={`${sq.x}-${sq.y}`} x={sq.x} y={sq.y} width={10} height={10} fill={sq.fill} />),
    };
  }
  if (id === 'monday') {
    return {
      viewBox: mondaySymbol.viewBox,
      children: mondaySymbol.shapes.map((sh, i) =>
        sh.type === 'ellipse' ? <ellipse key={i} cx={sh.cx} cy={sh.cy} rx={sh.rx} ry={sh.ry} fill={sh.fill} /> : <path key={i} d={sh.d} fill={sh.fill} />,
      ),
    };
  }
  const art = symbolArt[id];
  return { viewBox: art.viewBox, children: <path d={art.d} fill="currentColor" /> };
}

function BrandSymbol({ id, name, size = 16, className, decorative }: SymbolProps & { id: IntegrationId }) {
  const { viewBox, children } = symbolShapes(id);
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={viewBox}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : name}
      aria-hidden={decorative ? 'true' : undefined}
      focusable="false"
      style={{ display: 'inline-block', flex: 'none', verticalAlign: 'middle' }}
    >
      {!decorative && <title>{name}</title>}
      {children}
    </svg>
  );
}

/** Symbol + name in Inter: the marquee lockup. */
function BrandLockup({ id, name, className, decorative }: WordmarkProps & { id: IntegrationId }) {
  return (
    <span className={className} title={decorative ? undefined : name} aria-hidden={decorative ? 'true' : undefined} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap', lineHeight: 1 }}>
      <BrandSymbol id={id} name={name} size={26} decorative />
      <span style={{ fontWeight: 600, fontSize: '1.125rem', letterSpacing: '-0.02em' }}>{name}</span>
    </span>
  );
}

/** Text-only fallback, kept for when logo use is not cleared for a brand. */
function TextWordmark({ name, className, decorative }: WordmarkProps) {
  return (
    <span className={className} title={decorative ? undefined : name} aria-hidden={decorative ? 'true' : undefined} style={{ fontWeight: 600, fontSize: '1.125rem', letterSpacing: '-0.02em', whiteSpace: 'nowrap', lineHeight: 1 }}>
      {name}
    </span>
  );
}
function InitialSymbol({ name, size = 16, className, decorative }: SymbolProps) {
  return (
    <span
      className={className}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : name}
      aria-hidden={decorative ? 'true' : undefined}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: size, height: size, borderRadius: Math.max(3, Math.round(size * 0.25)), background: 'var(--surface-hover)', color: 'var(--ink)', fontSize: Math.round(size * 0.62), fontWeight: 600, lineHeight: 1, flex: 'none', verticalAlign: 'middle' }}
    >
      {name.charAt(0)}
    </span>
  );
}

const meta: Record<IntegrationId, { source: string; guidelines: string; scale: number }> = {
  anthropic: { source: symbolArt.anthropic.source, guidelines: symbolArt.anthropic.kit, scale: 1 },
  microsoft: { source: microsoftSymbol.source, guidelines: microsoftSymbol.kit, scale: 0.95 },
  cursor: { source: symbolArt.cursor.source, guidelines: symbolArt.cursor.kit, scale: 1 },
  openai: { source: symbolArt.openai.source, guidelines: symbolArt.openai.kit, scale: 1 },
  github: { source: symbolArt.github.source, guidelines: symbolArt.github.kit, scale: 1 },
  jira: { source: symbolArt.jira.source, guidelines: symbolArt.jira.kit, scale: 0.95 },
  monday: { source: mondaySymbol.source, guidelines: mondaySymbol.kit, scale: 1 },
  notion: { source: symbolArt.notion.source, guidelines: symbolArt.notion.kit, scale: 1 },
};

export const logos: Record<IntegrationId, LogoEntry> = Object.fromEntries(
  site.integrations.map((i) => {
    const Wordmark: ComponentType<WordmarkProps> = useOfficialLogos ? (p) => <BrandLockup id={i.id} {...p} /> : TextWordmark;
    const Symbol: ComponentType<SymbolProps> = useOfficialLogos ? (p) => <BrandSymbol id={i.id} {...p} /> : InitialSymbol;
    Wordmark.displayName = `${i.id}Wordmark`;
    Symbol.displayName = `${i.id}Symbol`;
    return [i.id, { id: i.id, name: i.name, ...meta[i.id], Wordmark, Symbol } satisfies LogoEntry];
  }),
) as Record<IntegrationId, LogoEntry>;

export function IntegrationSymbol({ id, size = 16, decorative }: { id: IntegrationId; size?: number; decorative?: boolean }) {
  const entry = logos[id];
  return <entry.Symbol name={entry.name} size={size} decorative={decorative} />;
}
