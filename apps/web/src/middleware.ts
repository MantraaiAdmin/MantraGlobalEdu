import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('mge_token')?.value;

  if (pathname.startsWith('/portal/')) {
    const segment = pathname.split('/')[2];
    if (!token && ['student', 'counselor', 'admin'].includes(segment)) {
      return NextResponse.redirect(new URL(`/login/${segment}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/portal/:path*'],
};
