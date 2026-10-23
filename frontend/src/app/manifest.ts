import type { MetadataRoute } from 'next';
import { site } from '@aloft/content';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.legalName,
    short_name: site.name,
    description: site.promise,
    start_url: '/',
    display: 'browser',
    background_color: '#f2f5f6',
    theme_color: '#0a3442',
    icons: [
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
