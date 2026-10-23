import type { Metadata } from 'next';
import { site } from '@aloft/content';
import { noIndex, siteUrl } from './env';

interface PageMeta {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  image?: string;
}

/** Unique title, description, canonical URL and social cards for a page. */
export function pageMetadata({ title, description, path, noindex, image }: PageMeta): Metadata {
  const url = `${siteUrl}${path === '/' ? '' : path}`;
  const ogImage = image ?? '/og-image.jpg';
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: noindex || noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      siteName: site.legalName,
      title,
      description,
      url,
      images: [{ url: ogImage, width: 1200, height: 630, alt: site.legalName }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [ogImage] },
  };
}
