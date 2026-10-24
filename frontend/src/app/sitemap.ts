import type { MetadataRoute } from 'next';
import { projects, services } from '@aloft/content';
import { siteUrl } from '@/lib/env';

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${siteUrl}${path}`;
  return [
    { url: url('/'), changeFrequency: 'monthly', priority: 1 },
    { url: url('/services'), changeFrequency: 'monthly', priority: 0.9 },
    ...services.map((s) => ({ url: url(`/services/${s.slug}`), changeFrequency: 'monthly' as const, priority: 0.8 })),
    { url: url('/projects'), changeFrequency: 'monthly', priority: 0.8 },
    ...projects.map((p) => ({ url: url(`/projects/${p.slug}`), changeFrequency: 'yearly' as const, priority: 0.7 })),
    { url: url('/about'), changeFrequency: 'yearly', priority: 0.6 },
    { url: url('/contact'), changeFrequency: 'yearly', priority: 0.7 },
    { url: url('/privacy-policy'), changeFrequency: 'yearly', priority: 0.2 },
    { url: url('/terms'), changeFrequency: 'yearly', priority: 0.2 },
  ];
}
