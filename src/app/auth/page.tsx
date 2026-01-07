import AuthPageWidget from '@widgets/auth-page';
import Image from 'next/image';
import { Suspense } from 'react';

export default function AuthPage() {
  return (
    <div className="w-full h-full">
      <Image src="images/landing-page-bg.svg" alt="Background" fill className="object-cover -z-10" priority />
      <div>
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
          <AuthPageWidget />
        </Suspense>
      </div>
    </div>
  );
}
