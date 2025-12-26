'use client';

import Image from 'next/image';
import { useUserProfile } from '@shared/hooks/use-user';
import { useState } from 'react';
import { useIsMobile } from '@shared/hooks/use-mobile';
import { MobileTextView } from './mobile-text-view';
import { useRouter } from 'next/navigation';

export const TopAnnouncementStrip = () => {
  const { data: user } = useUserProfile();
  const isMobile = useIsMobile();
  const [showMobileView, setShowMobileView] = useState(false);
  const router = useRouter();

  const handleSignUpClick = () => {
    if (isMobile) {
      setShowMobileView(true);
    } else {
      router.push('/auth');
    }
  };

  return (
    <div
      className="w-full h-[44px] md:h-[52px] flex items-center justify-center px-4"
      style={{
        backgroundImage: "url('/images/bg.svg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-7xl w-full flex items-center justify-center md:gap-3 text-white font-medium">
        <div className="flex items-center gap-2 md:gap-3 w-full justify-center">
          <Image src="/images/crown.svg" alt="Crown" width={24} height={24} className="md:w-9 md:h-9" />

          <span className="text-xs md:text-lg text-start md:text-left leading-tight">
            Free lifetime access for the first <span className="font-semibold">1,000 users</span>.
            {!user && (
              <>
                <span onClick={handleSignUpClick} className="underline cursor-pointer whitespace-nowrap">
                  Sign up now
                </span>
                .
              </>
            )}
          </span>

          <Image src="/images/crown.svg" alt="Crown" width={24} height={24} className="hidden md:block md:w-9 md:h-9" />

          <div className="relative flex-shrink-0">
            <div className="relative hidden md:block h-12 w-[230px]">
              <Image
                src="/images/spots-left.svg"
                alt="20 Spots Left Claim Free Access"
                fill
                className="object-contain"
              />
            </div>

            {/* Mobile */}
            <div className="relative block md:hidden h-6 w-[120px]">
              <Image src="/images/spots-mobile.svg" alt="20 Spots Left" fill className="object-contain" />
            </div>
          </div>
        </div>
      </div>
      <MobileTextView isOpen={showMobileView} onClose={() => setShowMobileView(false)} />
    </div>
  );
};
