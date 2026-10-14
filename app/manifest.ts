import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { color } from '@/config/tokens.generated';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: site.description,
    start_url: '/',
    display: 'browser',
    background_color: color.surface.dark,
    theme_color: color.surface.dark,
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
      { src: '/brand/ambiently-mark-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
