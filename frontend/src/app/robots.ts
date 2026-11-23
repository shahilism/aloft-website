import type { MetadataRoute } from 'next';
import { noIndex, siteUrl } from '@/lib/env';

/** Generated once at build time (static export). */
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  if (noIndex) return { rules: { userAgent: '*', disallow: '/' } };
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
