import type { MetadataRoute } from 'next';
import { SITE_URL } from '@mge/config';

/**
 * Production-safe robots rules. Public pages are crawlable. Portal and API
 * routes are blocked; login, shortlist and comparison pages stay crawlable so
 * search engines can see their noindex tag.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/portal/', '/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
