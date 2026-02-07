import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const PUBLIC_ROUTES = [
  '/',
  '/auth/google/callback',
  '/auth/linkedin/callback',
  '/about-us',
  '/roast',
  '/dashboard',
  '/resume',
  '/resumes',
  '/get-all-resumes',
  '/blog',
];

async function checkAuth(request: NextRequest): Promise<boolean> {
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
      return data.user?.isLoggedIn === true;
    }

    return false;
  } catch (error) {
    console.error('Auth check failed:', error);
    return false;
  }
}

export async function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;
    const isAuthRoute = pathname === '/auth';
    const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));

    if (isPublicRoute) {
      return NextResponse.next();
    }

    const isAuthenticated = await checkAuth(request);

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
