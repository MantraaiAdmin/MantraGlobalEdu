import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { DESTINATIONS } from '@mge/config';
import { LEGACY_ARTICLE_REDIRECTS } from '@/data/legacy-redirects';
import { HIDDEN_SCHOLARSHIP_IDS } from '@/data/scholarship-verification';

const CANONICAL_HOST = 'mantraglobaledu.com';

const PORTAL_ROLES: Record<string, string> = {
  admin: 'ADMIN',
  counselor: 'COUNSELOR',
  student: 'STUDENT',
};

/** Old /countries/<segment> values → canonical slug. */
const LEGACY_COUNTRY_SEGMENTS: Record<string, string> = {
  ...Object.fromEntries(DESTINATIONS.map((d) => [d.code.toLowerCase(), d.slug])),
  'united-kingdom': 'uk',
  england: 'uk',
  'united-states': 'usa',
  korea: 'south-korea',
  dubai: 'uae',
};

/** Old /resources?category=<id> values → new category pages. */
const LEGACY_RESOURCE_CATEGORIES: Record<string, string> = {
  guides: 'study-abroad-guides',
  visa: 'visa-updates',
  scholarships: 'scholarships',
  universities: 'university-guides',
  career: 'career-guides',
};

const STATIC_REDIRECTS: Record<string, string> = {
  '/book-counseling': '/book-counselling',
  '/courses': '/find-a-course',
};

function permanent(request: NextRequest, pathname: string, search = '') {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  url.search = search;
  return NextResponse.redirect(url, 301);
}

function legacyRedirect(request: NextRequest): NextResponse | null {
  const { pathname, searchParams } = request.nextUrl;

  if (STATIC_REDIRECTS[pathname]) return permanent(request, STATIC_REDIRECTS[pathname]);

  const lower = pathname.toLowerCase();
  const countryMatch = lower.match(/^\/countries\/([^/]+)\/?$/);
  if (countryMatch) {
    const target = LEGACY_COUNTRY_SEGMENTS[countryMatch[1]];
    if (target && target !== countryMatch[1]) return permanent(request, `/countries/${target}`);
  }

  const articleMatch = lower.match(/^\/resources\/([^/]+)\/?$/);
  if (articleMatch && LEGACY_ARTICLE_REDIRECTS[articleMatch[1]]) {
    return permanent(request, LEGACY_ARTICLE_REDIRECTS[articleMatch[1]]);
  }

  if (lower === '/resources') {
    const category = searchParams.get('category');
    if (category && LEGACY_RESOURCE_CATEGORIES[category]) {
      return permanent(request, `/resources/${LEGACY_RESOURCE_CATEGORIES[category]}`);
    }
  }

  const scholarshipMatch = lower.match(/^\/scholarships\/([^/]+)\/?$/);
  if (scholarshipMatch && HIDDEN_SCHOLARSHIP_IDS.has(scholarshipMatch[1])) {
    return permanent(request, '/scholarships');
  }

  // Normalise case for public URLs (slugs are lowercase).
  if (pathname !== lower) return permanent(request, lower, request.nextUrl.search);

  return null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get('host') ?? '';

  // One canonical hostname: redirect www to the apex domain.
  if (host === `www.${CANONICAL_HOST}`) {
    const url = request.nextUrl.clone();
    url.host = CANONICAL_HOST;
    url.port = '';
    url.protocol = 'https';
    return NextResponse.redirect(url, 301);
  }

  if (pathname.startsWith('/portal/')) {
    const token = request.cookies.get('mge_token')?.value;
    const role = request.cookies.get('mge_role')?.value;
    const segment = pathname.split('/')[2];
    const expectedRole = segment ? PORTAL_ROLES[segment] : undefined;

    if (expectedRole && !token) {
      return NextResponse.redirect(new URL(`/login/${segment}`, request.url));
    }

    if (expectedRole && role && role !== expectedRole) {
      const loginSegment = role === 'ADMIN' ? 'admin' : role === 'COUNSELOR' ? 'counselor' : 'student';
      return NextResponse.redirect(new URL(`/login/${loginSegment}`, request.url));
    }

    return NextResponse.next();
  }

  return legacyRedirect(request) ?? NextResponse.next();
}

export const config = {
  matcher: ['/((?!api/|_next/|brand/|images/|favicon|icon-|apple-touch-icon|logo\\.png|robots\\.txt|sitemap\\.xml|opengraph-image).*)'],
};
