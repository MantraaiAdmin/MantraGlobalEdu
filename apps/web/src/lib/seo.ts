import type { Metadata } from 'next';
import { APP_CONFIG, BUSINESS_CONTACT, FOUNDER, SITE_URL } from '@mge/config';

export const DEFAULT_OG_IMAGE = '/opengraph-image';

export function absoluteUrl(path = '/'): string {
  if (path.startsWith('http')) return path;
  const normalised = path === '/' ? '/' : `/${path.replace(/^\/+/, '').replace(/\/+$/, '')}`;
  return `${SITE_URL}${normalised === '/' ? '/' : normalised}`;
}

interface PageMetadataInput {
  /** Full <title>. Rendered as-is (no template suffix). */
  title: string;
  description: string;
  path: string;
  ogType?: 'website' | 'article';
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
}

/**
 * Builds unique title, description, self-referencing canonical, Open Graph and
 * X/Twitter metadata for an indexable page.
 */
export function pageMetadata({
  title,
  description,
  path,
  ogType = 'website',
  noIndex = false,
  publishedTime,
  modifiedTime,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: ogType,
      url,
      title,
      description,
      siteName: APP_CONFIG.name,
      locale: 'en_IN',
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: APP_CONFIG.name }],
      ...(ogType === 'article' ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

/** Metadata for private / utility pages that must not be indexed. */
export function privatePageMetadata(title: string): Metadata {
  return {
    title,
    robots: { index: false, follow: false, nocache: true },
  };
}

// ---------------------------------------------------------------------------
// JSON-LD builders — only verified, visible information. No ratings, reviews,
// awards or addresses are emitted.
// ---------------------------------------------------------------------------

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: BUSINESS_CONTACT.name,
    url: BUSINESS_CONTACT.website,
    logo: absoluteUrl('/brand/mantra-logo-premium-primary.png'),
    email: BUSINESS_CONTACT.email,
    telephone: BUSINESS_CONTACT.phoneE164,
    description: APP_CONFIG.metaDescription,
    areaServed: [{ '@type': 'City', name: BUSINESS_CONTACT.city }, { '@type': 'Country', name: 'India' }],
    founder: { '@type': 'Person', name: FOUNDER.name, jobTitle: FOUNDER.title },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: BUSINESS_CONTACT.phoneE164,
        email: BUSINESS_CONTACT.email,
        areaServed: 'IN',
        availableLanguage: ['English'],
      },
    ],
    ...(BUSINESS_CONTACT.sameAs.length ? { sameAs: BUSINESS_CONTACT.sameAs } : {}),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: BUSINESS_CONTACT.website,
    name: BUSINESS_CONTACT.name,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-IN',
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceSchema(input: { name: string; description: string; path: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    serviceType: input.name,
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'India' },
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    mainEntityOfPage: absoluteUrl(input.path),
    url: absoluteUrl(input.path),
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    author: { '@type': 'Organization', name: input.authorName, url: BUSINESS_CONTACT.website },
    publisher: { '@id': ORG_ID },
    image: absoluteUrl(DEFAULT_OG_IMAGE),
  };
}

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: FOUNDER.name,
    jobTitle: FOUNDER.title,
    worksFor: { '@id': ORG_ID },
  };
}

export function courseSchema(input: {
  name: string;
  description: string;
  path: string;
  providerName: string;
  providerUrl?: string | null;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: {
      '@type': 'CollegeOrUniversity',
      name: input.providerName,
      ...(input.providerUrl ? { sameAs: input.providerUrl } : {}),
    },
  };
}
