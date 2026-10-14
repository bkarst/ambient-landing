import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { site } from '@/config/site';
import { color } from '@/config/tokens.generated';
import { LOGO_DOTS } from '@/components/ds/logo-dots';

export const alt = site.seo.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// ImageResponse takes ttf, otf or woff. Read at module scope so the build can inline it (§10.3).
const interSemiBold = readFile(join(process.cwd(), 'assets/og/Inter-SemiBold.ttf')).catch(() => null);

function markDataUri(fill: string): string {
  const circles: string[] = [];
  for (let i = 0; i < LOGO_DOTS.length; i += 3) {
    circles.push(`<circle cx="${LOGO_DOTS[i]}" cy="${LOGO_DOTS[i + 1]}" r="${LOGO_DOTS[i + 2]}"/>`);
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><g fill="${fill}">${circles.join('')}</g></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/** The share card: Deep Navy ground, the halftone mark bleeding off the right, the tagline, the lockup bottom-left. Always navy. */
export default async function Image() {
  const font = await interSemiBold;
  const navy = color.surface.dark;
  const mark = markDataUri(color.accent.dark);
  const lockupMark = markDataUri(color.gold.dark);
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: navy, position: 'relative', fontFamily: font ? 'Inter' : 'sans-serif' }}>
        <img src={mark} alt="" width={720} height={720} style={{ position: 'absolute', right: -200, top: -45, opacity: 0.95 }} />
        <div style={{ position: 'absolute', left: 72, top: 120, width: 760, display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 22, letterSpacing: 4, color: color.inkMuted.dark, fontWeight: 600 }}>{site.category.toUpperCase()}</div>
          <div style={{ marginTop: 24, fontSize: 64, lineHeight: 1.1, color: color.ink.dark, fontWeight: 600, letterSpacing: -1.5 }}>{site.seo.ogTitle}</div>
        </div>
        <div style={{ position: 'absolute', left: 72, bottom: 64, display: 'flex', alignItems: 'center', gap: 14 }}>
          <img src={lockupMark} alt="" width={48} height={48} />
          <div style={{ fontSize: 34, color: color.ink.dark, fontWeight: 600, letterSpacing: -1 }}>{site.name}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font ? [{ name: 'Inter', data: font, style: 'normal', weight: 600 }] : [],
    },
  );
}
