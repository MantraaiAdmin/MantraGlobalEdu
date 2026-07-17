import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PORTAL_ROLES: Record<string, string> = {
  admin: 'ADMIN',
  counselor: 'COUNSELOR',
  student: 'STUDENT',
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('mge_token')?.value;
  const role = request.cookies.get('mge_role')?.value;

  if (pathname.startsWith('/portal/')) {
    const segment = pathname.split('/')[2];
    const expectedRole = segment ? PORTAL_ROLES[segment] : undefined;

    if (expectedRole && !token) {
      return NextResponse.redirect(new URL(`/login/${segment}`, request.url));
    }

    if (expectedRole && role && role !== expectedRole) {
      const loginSegment = role === 'ADMIN' ? 'admin' : role === 'COUNSELOR' ? 'counselor' : 'student';
      return NextResponse.redirect(new URL(`/login/${loginSegment}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/portal/:path*'],
};
