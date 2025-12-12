'use client';

import { getGoogleAuthUrl } from '@/shared/lib/google-auth';
import Image from 'next/image';
import { Button } from './button';

import { trackEvent } from '@shared/lib/analytics/Mixpanel';

export default function GoogleSignInButton() {
  const handleGoogleSignIn = () => {
    trackEvent('login_click', { method: 'google' });
    const authUrl = getGoogleAuthUrl();
    window.location.href = authUrl;
  };

  return (
    <Button
      onClick={handleGoogleSignIn}
      className="py-8 w-[280px] bg-[rgba(12,17,24,1)] text-white text-lg font-semibold rounded-xl border-2 border-white hover:scale-105 shadow-[0_1px_2px_0_rgba(0,0,0,0.04)] transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-center justify-center gap-3">
        <Image src="/images/google.svg" alt="Google logo" width={24} height={24} />
        Continue with Google
      </div>
    </Button>
  );
}
