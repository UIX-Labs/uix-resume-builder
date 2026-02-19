'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/components/button';
import { useIsMobile } from '@shared/hooks/use-mobile';
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
      return { initials: defaultInitials[i] || 'U', key: `default-${i}` };
    });
  }, [currentStats?.latestUsers]);

  const handleNavigate = () => router.push('/dashboard');

  const handleLinkedInUnified = () => {
    setIsModalOpen(true);
    trackEvent('create_resume_click', { source: 'landing_hero', method: 'linkedin_autofill' });
  };

  const handleUploadClick = () => {
    handleNavigate();
    trackEvent('create_resume_click', { source: 'landing_hero', method: 'upload_existing' });
  };

  return (
    <section className="relative w-full h-full min-h-[600px] md:max-h-[900px] flex items-center justify-center px-4 md:px-12 overflow-hidden py-2 md:py-0">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10"></div>
      <HeroConfetti />
      <div className="w-full max-w-7xl mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 items-center min-h-0">
          {/* LEFT COLUMN */}
          <div className="w-full flex flex-col items-center md:items-start z-10 md:-mt-10">
            <div className="w-full">
              {/* Avatars */}
              <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 mb-6 lg:mb-8 text-center md:text-left">
                <div className="flex -space-x-2">
                  {userAvatars.map((avatar) => (
                    <Avatar key={avatar.key} className="w-10 h-10 md:w-12 md:h-12 border-2 border-white shadow-sm">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="text-black text-xs sm:text-sm">{avatar.initials}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>

                <span className="font-semibold text-base sm:text-lg md:text-base lg:text-lg text-[#666666]">
                  Trusted by{' '}
                  <span className="inline-block tabular-nums min-w-[50px] md:min-w-[70px] text-center">
                    <CountUp from={10} to={currentStats?.totalUsers ?? 0} separator="," duration={1} />+
                  </span>{' '}
                  professionals
                </span>
              </div>

              {/* Heading */}
              <div className="space-y-1">
                {/* Desktop View */}
                <h1 className="hidden md:block tracking-[-0.03em]">
                  <div className="block whitespace-nowrap leading-[1.1]">
                    <span className="font-geist font-semibold text-[#171717] text-5xl lg:text-6xl xl:text-7xl">
                      Build a{' '}
                    </span>
                    <span className="text-[#0059ed] font-black text-5xl lg:text-6xl xl:text-7xl">Professional</span>
                  </div>
                  <div className="block lg:mt-0 leading-[1.2] -mt-2">
                    <span className="text-[#008941] font-black text-5xl lg:text-6xl xl:text-7xl">Resume </span>
                    <span className="text-[#171717] font-semibold text-2xl lg:text-3xl xl:text-4xl">
                      in under 3 minutes
                    </span>
                  </div>
                </h1>

                {/* Mobile View */}
                <h1 className="block md:hidden text-center tracking-[-0.03em]">
                  <div className="flex flex-col items-center gap-0 leading-[0.9]">
                    {/* Changed text-[48px] to text-[12vw] to scale with screen width */}
                    <span className="font-geist font-semibold text-[12vw] sm:text-5xl">Build a</span>
                    <span className="text-blue-800 font-black text-[12vw] sm:text-[48px]">Professional</span>
                  </div>

                  <div className="flex flex-col items-center -mt-1 leading-none">
                    <span className="text-green-600 font-[800] text-[12vw] sm:text-5xl">Resume</span>
                    <span className="text-lg sm:text-xl font-semibold mt-1 tracking-normal">in under 3 minutes</span>
                  </div>
                </h1>
              </div>

              {/* Buttons */}
              <div className="mt-8 lg:mt-10 flex flex-col sm:flex-row gap-4 items-center md:items-start w-full">
                <Button
                  onClick={handleLinkedInUnified}
                  className="w-full md:max-w-[320px] max-w-[300px] h-[56px] lg:h-[65px] text-lg lg:text-[24px] bg-[#005FF2] text-white font-semibold rounded-[12px] hover:bg-blue-700 transition-all shadow-md border-white border-2"
                >
                  Auto-fill via LinkedIn
                </Button>

                <Button
                  onClick={handleUploadClick}
                  className="w-full md:max-w-[320px] max-w-[250px] h-[56px] lg:h-[64px] text-lg lg:text-[24px] bg-white text-[#171717] font-semibold rounded-[12px] border border-gray-200 hover:bg-gray-50 hover:text-[#005FF2] transition-all shadow-sm"
                >
                  Upload existing resume
                </Button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          {/* Changed translate-x to only apply on large screens to prevent horizontal scroll on small tablets */}
          <div className="flex justify-center md:justify-end w-full  lg:pl-8 mt-8 md:mt-4 md:translate-x-6 lg:translate-x-20">
            <div className="relative w-full max-w-[400px] md:max-w-[480px] lg:max-w-[540px] xl:max-w-[600px] max-h-full transition-all duration-500">
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
