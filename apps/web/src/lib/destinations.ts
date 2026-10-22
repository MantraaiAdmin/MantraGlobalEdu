import { DESTINATIONS } from '@mge/config';
import { COUNTRY_GUIDES, getCountryGuide } from '@/data/country-guides';

export type Destination = (typeof DESTINATIONS)[number];

/** Priority destinations with a full, reviewed guide. These are indexable. */
export const GUIDED_DESTINATION_SLUGS = COUNTRY_GUIDES.map((guide) => guide.slug);

export function getDestinationBySlug(slug: string): Destination | null {
  return DESTINATIONS.find((d) => d.slug === slug.toLowerCase()) ?? null;
}

export function getDestinationByCode(code: string): Destination | null {
  return DESTINATIONS.find((d) => d.code === code.toUpperCase()) ?? null;
}

export function destinationPath(codeOrSlug: string): string {
  const byCode = getDestinationByCode(codeOrSlug);
  if (byCode) return `/countries/${byCode.slug}`;
  const bySlug = getDestinationBySlug(codeOrSlug);
  return bySlug ? `/countries/${bySlug.slug}` : '/countries';
}

/** Path for a catalog country id such as `country-gb`. */
export function destinationPathFromCountryId(countryId: string): string {
  return destinationPath(countryId.replace(/^country-/, ''));
}

export function hasGuide(slug: string): boolean {
  return getCountryGuide(slug) !== null;
}

/**
 * Legacy URL segments (ISO codes and the old aliases accepted by the catalog)
 * mapped to the canonical slug. Used for 301 redirects.
 */
export const LEGACY_COUNTRY_SEGMENTS: Record<string, string> = {
  ...Object.fromEntries(DESTINATIONS.map((d) => [d.code.toLowerCase(), d.slug])),
  'united-kingdom': 'uk',
  england: 'uk',
  'united-states': 'usa',
  us: 'usa',
  korea: 'south-korea',
  dubai: 'uae',
};
