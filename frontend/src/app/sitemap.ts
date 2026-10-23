import type { MetadataRoute } from 'next';
import { services } from '@aloft/content';
import { getProjects } from '@/lib/api';
import { siteUrl } from '@/lib/env';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = (path: string) => `${siteUrl}${path}`;
  const pages: MetadataRoute.Sitemap = [
    { url: url('/'), changeFrequency: 'monthly', priority: 1 },
    { url: url('/services'), changeFrequency: 'monthly', priority: 0.9 },
    ...services.map((s) => ({ url: url(`/services/${s.slug}`), changeFrequency: 'monthly' as const, priority: 0.8 })),
    { url: url('/projects'), changeFrequency: 'weekly', priority: 0.8 },
    { url: url('/about'), changeFrequency: 'yearly', priority: 0.6 },
    { url: url('/contact'), changeFrequency: 'yearly', priority: 0.7 },
    { url: url('/privacy-policy'), changeFrequency: 'yearly', priority: 0.2 },
    { url: url('/terms'), changeFrequency: 'yearly', priority: 0.2 },
  ];
  const projects = await getProjects();
  if (projects.ok) {
    for (const p of projects.data.filter((p) => !p.isDraft)) {
      pages.push({ url: url(`/projects/${p.slug}`), changeFrequency: 'yearly', priority: 0.7 });
    }
  }
  return pages;
}
