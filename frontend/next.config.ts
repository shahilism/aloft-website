import type { NextConfig } from 'next';

/** Hosts allowed to serve project photographs, e.g. "cdn.aloftac.com". */
const imageHosts = (process.env.PROJECT_IMAGE_HOSTS ?? '')
  .split(',')
  .map((h) => h.trim())
  .filter(Boolean);

/**
 * Static export: `npm run build` writes the whole site as plain files to `out/`,
 * ready to upload to any web host (e.g. Hostinger's public_html). Security headers,
 * old-URL redirects and clean URLs are handled by `public/.htaccess`.
 */
const nextConfig: NextConfig = {
  output: 'export',
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    // No image server on static hosting: photos are served as stored, so keep them compressed (WebP).
    unoptimized: true,
    remotePatterns: imageHosts.map((hostname) => ({ protocol: 'https' as const, hostname })),
  },
};

export default nextConfig;
