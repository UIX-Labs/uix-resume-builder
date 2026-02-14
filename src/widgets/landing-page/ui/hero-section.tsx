'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/components/button';
import { useIsMobile } from '@shared/hooks/use-mobile';
import { useCachedUser } from '@shared/hooks/use-user';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import CountUp from '@shared/ui/count-up';
import { LinkedInModal } from '@widgets/dashboard/ui/linkedin-integration-card';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import getCurrentStatsQuery from '../api/query';
import { getUserInitials } from '../lib/user-initials';
import HeroConfetti from './hero-confetti';
import HeroImgSection from './hero-img-section';
import { MobileTextView } from './mobile-text-view';

const HeroSection = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { data: currentStats } = getCurrentStatsQuery();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMobileView, setShowMobileView] = useState(false);

  const userAvatars = useMemo(() => {
    const latestUsers = currentStats?.latestUsers || [];
    const defaultInitials = ['JD', 'SM', 'AR'];

    return Array.from({ length: 3 }, (_, i) => {
      if (i < latestUsers.length) {
        const user = latestUsers[i];
        const initials = getUserInitials(user.firstName, user.lastName);
        return {
          initials: initials || defaultInitials[i] || 'U',
          key: `${user.firstName || ''}-${user.lastName || ''}-${i}`,
        };
      }
      return {
        initials: defaultInitials[i] || 'U',
        key: `default-${i}`,
      };
    });
  }, [currentStats?.latestUsers]);

  const handleNavigate = () => {
    router.push('/dashboard');
  };

  const handleLinkedInUnified = () => {
    if (isMobile) {
      setShowMobileView(true);
      return;
    }
    setIsModalOpen(true);
    trackEvent('create_resume_click', {
      source: 'landing_hero',
      method: 'linkedin_autofill',
    });
  };

  const handleUploadClick = () => {
    if (isMobile) {
      setShowMobileView(true);
      return;
    }
    handleNavigate();
    trackEvent('create_resume_click', {
      source: 'landing_hero',
      method: 'upload_existing',
    });
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-4 md:px-12 py-12 md:py-0">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full md:inset-y-0 md:w-[45%] overflow-hidden pointer-events-none -z-10"></div>
      <HeroConfetti />

      <div className="max-w-7xl mx-auto w-full relative">
        <div className="grid grid-cols-1 md:grid-cols-[58%_42%] gap-12 items-center">
          {/* LEFT COLUMN */}
          <div className="w-full flex flex-col items-center md:items-start">
            <div className="w-full">
              {/* Avatars + Trusted */}
              <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 mb-6 text-center md:text-left">
                <div className="flex -space-x-2">
                  {userAvatars.map((avatar) => (
                    <Avatar key={avatar.key} className=" md:w-12 md:h-12 border-2 border-white">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="text-black">{avatar.initials}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>

                <span className="font-semibold text-base md:text-lg text-gray-900">
                  Trusted by{' '}
                  <span className="inline-block tabular-nums min-w-[80px] text-center">
                    <CountUp from={10} to={currentStats?.totalUsers ?? 0} separator="," duration={1} />+
                  </span>{' '}
                  professionals
                </span>
              </div>

              {/* Heading */}
              <div>
                {/* Desktop View: Adjusted to match Figma 2-line layout */}
                <h1 className="hidden md:block tracking-[-0.03em]">
                  <div className="block whitespace-nowrap leading-[1]">
                    <span className="font-geist font-semibold text-[#171717] text-6xl lg:text-7xl">Build a </span>
                    <span className="text-[#005FF2] font-[800] text-6xl lg:text-7xl">Professional</span>
                  </div>

                  <div className="block mt-6 lg:mt-4 leading-[1.2]">
                    <span className="text-[#00BA34] font-[800] text-6xl lg:text-7xl">Resume </span>
                    <span className="text-[#171717] font-semibold text-3xl lg:text-4xl">in under 3 minutes</span>
                  </div>
                </h1>
                {/* Mobile View: Kept original logic */}
                <h1 className="block md:hidden text-center tracking-[-0.03em] leading-tight px-2">
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-geist font-semibold text-2xl">Build a</span>
                    <span className="text-blue-800 font-[800] text-3xl sm:text-4xl">Professional</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 mt-1">
                    <span className="text-green-600 font-[800] text-3xl sm:text-4xl">Resume</span>
                    <span className="text-xl sm:text-2xl font-semibold">in under 3 minutes</span>
                  </div>
                </h1>
              </div>

              {/* Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center md:items-start">
                <Button
                  onClick={handleLinkedInUnified}
                  className="w-[280px] md:w-[300px] h-[56px] md:h-[64px] text-[18px] md:text-[20px] bg-[#005FF2] text-white font-bold rounded-[12px] hover:bg-blue-700 transition-all duration-300 shadow-sm"
                >
                  Auto-fill via LinkedIn
                </Button>

                <Button
                  onClick={handleUploadClick}
                  className="w-[260px] md:w-[300px] h-[56px] md:h-[64px] text-[16px] md:text-[20px] bg-white text-[#171717] font-bold rounded-[12px] border border-gray-200 hover:bg-gray-50 hover:text-[#005FF2] transition-all duration-300"
                >
                  Upload existing resume
                </Button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex justify-center md:justify-end w-full lg:pl-4 md:pb-8 md:pt-2 pl-4">
            <div className="relative w-full max-w-[420px] md:max-w-[440px] lg:max-w-[560px] aspect-square md:aspect-auto transition-all duration-500 pr-8 pt-6 pb-6">
              <HeroImgSection />
            </div>
          </div>
        </div>
      </div>

      <LinkedInModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {isMobile && <MobileTextView isOpen={showMobileView} onClose={() => setShowMobileView(false)} />}
    </section>
  );
};

export default HeroSection;
