import type { NextConfig } from 'next';

/** Hosts allowed to serve project photographs, e.g. "cdn.aloftac.com". */
const imageHosts = (process.env.PROJECT_IMAGE_HOSTS ?? '')
  .split(',')
  .map((h) => h.trim())
  .filter(Boolean);

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const nextConfig: NextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: imageHosts.map((hostname) => ({ protocol: 'https' as const, hostname })),
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  async redirects() {
    return [
      {
        source: '/projects/budget-malappuram',
        destination: '/projects/hyper-budget',
        permanent: true,
      },
      {
        source: '/projects/hyper-budget-malappuram',
        destination: '/projects/hyper-budget',
        permanent: true,
      },
      {
        source: '/projects/milan-theatre-mannarkkad',
        destination: '/projects/milan-cinemas-mannarkkad',
        permanent: true,
      },
      {
        source: '/projects/okaz-theatre-mannarkkad',
        destination: '/projects/okaz-cinemas-kaithachira',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
