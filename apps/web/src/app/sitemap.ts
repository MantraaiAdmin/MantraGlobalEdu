import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo';
import { getIndexablePages } from '@/lib/site-pages';

export default function sitemap(): MetadataRoute.Sitemap {
  return getIndexablePages().map((page) => ({
    url: absoluteUrl(page.path),
    ...(page.lastModified ? { lastModified: page.lastModified } : {}),
  }));
}
