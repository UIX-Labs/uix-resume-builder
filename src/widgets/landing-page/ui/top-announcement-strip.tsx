'use client';

import { useUserProfile } from '@shared/hooks/use-user';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import getCurrentStatsQuery from '../api/query';

export const TopAnnouncementStrip = () => {
  const { data: user, isLoading } = useUserProfile();
  const router = useRouter();
  const { data: currentStats } = getCurrentStatsQuery();

  const spotsLeft = Math.max(0, 2000 - (currentStats?.totalUsers ?? 0));

  const handleSignUpClick = () => {
    router.push('/auth');
  };

  // Don't render while loading to prevent flash on refresh
  if (isLoading || user) return null;

  return (
    <div
      className="w-full h-[44px] md:h-[52px] flex items-center justify-center px-4 mb-3.5 md:mb-5"
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
            Free lifetime access for the first <span className="font-semibold">2,000 users</span>.
            <button type="button" onClick={handleSignUpClick} className="underline cursor-pointer whitespace-nowrap">
              Sign up now
            </button>
            .
          </span>

          <Image src="/images/crown.svg" alt="Crown" width={24} height={24} className="hidden md:block md:w-9 md:h-9" />

          <button
            type="button"
            onClick={handleSignUpClick}
            className="flex-shrink-0 flex items-center gap-1/2 md:gap-2 px-3 py-1.5 md:px-5 md:py-2 rounded-lg text-[10px] md:text-sm font-semibold text-white cursor-pointer transition-opacity hover:opacity-90"
            style={{
              background: 'linear-gradient(135deg, #ADE4DB 0%, #5DC4E4 50%, #28A5EE 100%)',
            }}
          >
            <Image src="/images/flash-img.svg" alt="" width={24} height={24} className="w-3 h-3 md:w-6 md:h-6" />
            <span className="md:hidden">{spotsLeft} Spots Left</span>
            <span className="hidden md:inline">{spotsLeft} Spots Left • Claim Free Access</span>
            <Image src="/images/flash-img.svg" alt="" width={16} height={16} className="w-3 h-3 md:w-6 md:h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
