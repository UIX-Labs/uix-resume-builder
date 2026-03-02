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
  '/blog',
  '/upload-resume',
  '/resume-examples',
];

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
    const isAuthRoute = pathname === '/auth';
    const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));

    const isAdminRoute = pathname.startsWith('/admin');

    // Admin route protection: temporarily disabled for testing
    if (isAdminRoute) {
      return NextResponse.next();
    }

    if (isPublicRoute) {
      return NextResponse.next();
    }

    const { isLoggedIn: isAuthenticated, email } = await checkAuth(request);

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
