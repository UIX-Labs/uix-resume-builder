import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const PUBLIC_ROUTES = [
  '/',
  '/auth/google/callback',
  '/auth/linkedin/callback',
  '/about-us',
  '/roast',
  '/expert-review',
  '/dashboard',
  '/resume',
  '/my-resumes',
  '/templates',
  '/pricing',
  '/blog',
  '/upload-resume',
  '/resume-beta',
  '/resume-examples',
];

const ADMIN_ALLOWED_DOMAINS = ['@uixlabs.in'];

async function checkAuth(request: NextRequest): Promise<{ isLoggedIn: boolean; email?: string }> {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const response = await fetch(`${backendUrl}/auth/check`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: request.headers.get('cookie') || '',
      },
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json();
      return {
        isLoggedIn: data.user?.isLoggedIn === true,
        email: data.user?.email,
      };
    }

    return { isLoggedIn: false };
  } catch (error) {
    console.error('Auth check failed:', error);
    return { isLoggedIn: false };
  }
}

export async function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;
    const hostname = request.headers.get('host') || '';

    // Redirect www to non-www for SEO canonicalization
    if (hostname.startsWith('www.')) {
      const newUrl = new URL(request.url);
      newUrl.host = hostname.replace('www.', '');
      return NextResponse.redirect(newUrl, 301);
    }

    const isAuthRoute = pathname === '/auth';
    const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));

    const isAdminRoute = pathname.startsWith('/admin');

    // Admin route protection: require auth + allowed email domain
    if (isAdminRoute) {
      if (pathname === '/admin/unauthorized') {
        return NextResponse.next();
      }

      const { isLoggedIn, email } = await checkAuth(request);

      if (!isLoggedIn) {
        return NextResponse.redirect(new URL(`/auth?callbackUrl=${encodeURIComponent(pathname)}`, request.url));
      }

      const isAllowedDomain = email && ADMIN_ALLOWED_DOMAINS.some((domain) => email.endsWith(domain));
      if (!isAllowedDomain) {
        return NextResponse.redirect(new URL('/admin/unauthorized', request.url));
      }

      return NextResponse.next();
    }

    if (isPublicRoute) {
      return NextResponse.next();
    }

    const { isLoggedIn: isAuthenticated, email: _email } = await checkAuth(request);

    if (isAuthenticated && isAuthRoute) {
      const callbackUrl = request.nextUrl.searchParams.get('callbackUrl');
      if (callbackUrl) {
        return NextResponse.redirect(new URL(callbackUrl, request.url));
      }
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (!isAuthenticated && !isPublicRoute && !isAuthRoute) {
      const callbackUrl = encodeURIComponent(request.nextUrl.pathname + request.nextUrl.search);
      return NextResponse.redirect(new URL(`/auth?callbackUrl=${callbackUrl}`, request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware execution error:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)'],
};
