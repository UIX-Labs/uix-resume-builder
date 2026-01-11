'use client';

import { useIsMobile } from '@shared/hooks/use-mobile';
import DesktopAuthLayout from '@widgets/auth-page';
import AuthPageWidget from '@widgets/auth-page';
import MobileAuthLayout from '@widgets/auth-page/ui/mobile-auth-layout';
import Image from 'next/image';
import { Suspense } from 'react';

export default function AuthPage() {
  const isMobile = useIsMobile();

  if (isMobile === undefined) {
    return <div className="w-full h-full flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="w-full h-full">
      <Image src="images/landing-page-bg.svg" alt="Background" fill className="object-cover -z-10" priority />
      <div>
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
          {isMobile ? <MobileAuthLayout /> : <DesktopAuthLayout />}
        </Suspense>
      </div>
    </div>
  );
}
