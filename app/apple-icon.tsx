import { ImageResponse } from 'next/og';
import { color } from '@/config/tokens.generated';
import { LOGO_DOTS } from '@/components/ds/logo-dots';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/** The app-icon variant: the mark on a Deep Navy tile with continuous corners. Always navy, in both themes. */
export default function AppleIcon() {
  const circles: string[] = [];
  for (let i = 0; i < LOGO_DOTS.length; i += 3) {
    circles.push(`<circle cx="${LOGO_DOTS[i]}" cy="${LOGO_DOTS[i + 1]}" r="${LOGO_DOTS[i + 2]}"/>`);
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><g fill="${color.gold.dark}">${circles.join('')}</g></svg>`;
  const src = `data:image/svg+xml,${encodeURIComponent(svg)}`;
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: color.surface.dark, borderRadius: 40 }}>
        <img src={src} alt="" width={122} height={122} />
      </div>
    ),
    size,
  );
}
