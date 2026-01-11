'use client';

import { getLinkedInAuthUrl } from '@/shared/lib/linkedin-auth';
import Image from 'next/image';
import { Button } from './button';

import { trackEvent } from '@shared/lib/analytics/Mixpanel';

export default function LinkedInSignInButton() {
  const handleLinkedInSignIn = () => {
    trackEvent('login_click', { method: 'linkedin' });
    const authUrl = getLinkedInAuthUrl();
    window.location.href = authUrl;
  };

  return (
    <Button
      onClick={handleLinkedInSignIn}
      className="py-6 md:py-8 w-[336px] bg-blue-900 border-2 border-white text-white text-xl md:text-2xl font-semibold rounded-xl hover:bg-blue-700 hover:shadow-xl transition-all duration-300 hover:scale-105 shadow-[0_1px_2px_0_rgba(0,0,0,0.04)] cursor-pointer
    "
    >
      <div className="flex items-center justify-center gap-3">
        <Image src="/images/linkedin.svg" alt="LinkedIn logo" width={32} height={32} />
        Continue with LinkedIn
      </div>
    </Button>
  );
}
