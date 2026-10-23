import type { MetadataRoute } from 'next';
import { noIndex, siteUrl } from '@/lib/env';

export default function robots(): MetadataRoute.Robots {
  if (noIndex) return { rules: { userAgent: '*', disallow: '/' } };
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
