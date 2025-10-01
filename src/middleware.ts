import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_ROUTES = ['/', '/auth/google/callback', '/auth/linkedin/callback'];

async function checkAuth(request: NextRequest): Promise<boolean> {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://resume-builder-be.craftstacks.co';

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
  const { pathname } = request.nextUrl;
  const isAuthRoute = pathname === '/auth';
  const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route + '/'));

  if (isPublicRoute) {
    return NextResponse.next();
  }

  const isAuthenticated = await checkAuth(request);

  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!isAuthenticated && !isPublicRoute && !isAuthRoute) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)'],
};
