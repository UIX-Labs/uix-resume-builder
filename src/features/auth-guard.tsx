'use client';

import { useUser } from '@shared/hooks/use-user';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

const PUBLIC_ROUTES = ['/', '/auth', '/auth/google/callback', '/auth/linkedin/callback'];

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="text-gray-600 text-lg">Checking authentication...</p>
      </div>
    </div>
  );
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route + '/'));

  const { data: user, isLoading, isError } = useUser();

  useEffect(() => {
    if (isLoading) return;

    if ((isError || !user || !user.isLoggedIn) && !isPublicRoute) {
      router.push('/auth');
      return;
    }

    if (user?.isLoggedIn && pathname === '/auth') {
      if (user.isVerified) {
        router.push('/dashboard');
      } else {
        router.push('/auth');
      }
      return;
    }
  }, [user, isLoading, isError, isPublicRoute, pathname, router]);

  if (isPublicRoute) {
    return <>{children}</>;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
}
