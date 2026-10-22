import { SERVICE_PAGES } from '@/data/services';
import { COUNTRY_GUIDES } from '@/data/country-guides';
import { ARTICLES, RESOURCE_CATEGORY_PAGES, articlePath } from '@/data/articles';

export interface SitePage {
  path: string;
  title: string;
  group: 'Main' | 'Destinations' | 'Services' | 'Resources' | 'Tools' | 'Company' | 'Legal';
  lastModified?: string;
}

const CONTENT_DATE = '2026-10-22';

/**
 * Every canonical, indexable page. Used by both the XML sitemap and the HTML
 * /sitemap page so they never drift apart. Private, utility and noindex pages
 * must not be listed here.
 */
export function getIndexablePages(): SitePage[] {
  return [
    { path: '/', title: 'Home', group: 'Main', lastModified: CONTENT_DATE },
    { path: '/study-abroad-consultants-coimbatore', title: 'Study Abroad Consultants in Coimbatore', group: 'Main', lastModified: CONTENT_DATE },
    { path: '/book-counselling', title: 'Book Free Counselling', group: 'Main', lastModified: CONTENT_DATE },
    { path: '/countries', title: 'Study Destinations', group: 'Destinations', lastModified: CONTENT_DATE },
    ...COUNTRY_GUIDES.map((guide) => ({
      path: `/countries/${guide.slug}`,
      title: `Study in ${guide.name}`,
      group: 'Destinations' as const,
      lastModified: guide.lastReviewed,
    })),
    { path: '/services', title: 'Study Abroad Services', group: 'Services', lastModified: CONTENT_DATE },
    ...SERVICE_PAGES.map((service) => ({
      path: `/services/${service.slug}`,
      title: service.name,
      group: 'Services' as const,
      lastModified: CONTENT_DATE,
    })),
    { path: '/resources', title: 'Resources & Guides', group: 'Resources', lastModified: CONTENT_DATE },
    ...RESOURCE_CATEGORY_PAGES.map((category) => ({
      path: `/resources/${category.id}`,
      title: category.title,
      group: 'Resources' as const,
      lastModified: CONTENT_DATE,
    })),
    ...ARTICLES.map((article) => ({
      path: articlePath(article),
      title: article.title,
      group: 'Resources' as const,
      lastModified: article.updatedAt,
    })),
    { path: '/find-a-course', title: 'Find a Course', group: 'Tools' },
    { path: '/scholarships', title: 'Scholarships', group: 'Tools', lastModified: CONTENT_DATE },
    { path: '/universities', title: 'Universities', group: 'Tools' },
    { path: '/cost-estimator', title: 'Cost Estimator', group: 'Tools' },
    { path: '/profile-check', title: 'Profile Check', group: 'Tools' },
    { path: '/document-checklist', title: 'Document Checklist', group: 'Tools' },
    { path: '/about', title: 'About Us', group: 'Company', lastModified: CONTENT_DATE },
    { path: '/partners', title: 'Partners', group: 'Company', lastModified: CONTENT_DATE },
    { path: '/contact', title: 'Contact', group: 'Company', lastModified: CONTENT_DATE },
    { path: '/sitemap', title: 'Site Map', group: 'Company', lastModified: CONTENT_DATE },
    { path: '/privacy-policy', title: 'Privacy Policy', group: 'Legal', lastModified: CONTENT_DATE },
    { path: '/terms', title: 'Terms of Use', group: 'Legal', lastModified: CONTENT_DATE },
    { path: '/cookie-policy', title: 'Cookie Policy', group: 'Legal', lastModified: CONTENT_DATE },
    { path: '/disclaimer', title: 'Disclaimer', group: 'Legal', lastModified: CONTENT_DATE },
  ];
}
