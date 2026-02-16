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

  // Get latest users and generate initials
  const userAvatars = useMemo(() => {
    const latestUsers = currentStats?.latestUsers || [];
    // Take first 3 users or use default initials if not enough users
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
      // Use default initials if not enough users
      return {
        initials: defaultInitials[i] || 'U',
        key: `default-${i}`,
      };
    });
  }, [currentStats?.latestUsers]);

  const handleNavigate = () => {
    router.push('/dashboard');
  };

  // Unified LinkedIn Autofill handler (MOBILE -> MobileView | DESKTOP -> Modal/Login)
  const handleLinkedInUnified = () => {
    setIsModalOpen(true);

    trackEvent('create_resume_click', {
      source: 'landing_hero',
      method: 'linkedin_autofill',
    });
  };

  const handleUploadClick = () => {
    handleNavigate();

    trackEvent('create_resume_click', {
      source: 'landing_hero',
      method: 'upload_existing',
    });
  };

  return (
    <section className="relative w-full h-auto min-h-screen px-4 md:px-0">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full md:inset-y-0 md:w-[45%] overflow-hidden pointer-events-none -z-10"></div>
      <HeroConfetti />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-[60%_40%] mt-6 md:mt-0 gap-12 items-start md:items-center">
          {/* LEFT COLUMN */}
          <div className="w-full flex flex-col items-center md:items-start md:-mt-2 md:-translate-y-6">
            <div className="w-full max-w-[420px] md:max-w-none">
              {/* Avatars + Trusted */}
              <div className="flex flex-col md:flex-row items-center md:items-center gap-3 md:gap-4 md:mt-16 text-center md:text-left">
                <div className="flex -space-x-2 justify-center md:justify-start">
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
              <div className="mt-4">
                {/* Desktop */}
                <h1 className="hidden md:block text-left tracking-[-0.03em] leading-tight">
                  {/* Line 1 */}
                  <div className="flex items-baseline gap-3">
                    <span className="font-geist font-semibold text-7xl">Build a</span>

                    <span className="text-blue-800 font-[800] text-7xl">Professional</span>
                  </div>

                  {/* Line 2 */}
                  <div className="flex items-baseline gap-4">
                    <span className="text-green-600 font-[800] text-7xl">Resume</span>

                    <span className="text-4xl font-semibold">in under 3 minutes</span>
                  </div>
                </h1>

                {/* Mobile */}
                <h1 className="block md:hidden text-center tracking-[-0.03em] leading-tight px-2">
                  {/* Line 1 */}
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-geist font-semibold text-2xl">Build a</span>

                    <span className="text-blue-800 font-[800] text-3xl sm:text-4xl">Professional</span>
                  </div>

                  {/* Line 2 */}
                  <div className="flex flex-col items-center gap-1 mt-1">
                    <span className="text-green-600 font-[800] text-3xl sm:text-4xl">Resume</span>

                    <span className="text-xl sm:text-2xl font-semibold">in under 3 minutes</span>
                  </div>
                </h1>
              </div>

              {/* Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center md:items-start">
                <Button
                  onClick={handleLinkedInUnified}
                  className="w-[280px] md:w-[303px] h-[56px] md:h-[68px] text-[18px] md:text-[24px] px-5 flex items-center justify-center bg-blue-900 text-white font-semibold rounded-[12px] border border-blue-800 hover:bg-blue-800 transition-all duration-300"
                >
                  Auto-fill via LinkedIn
                </Button>

                <Button
                  onClick={handleUploadClick}
                  className="w-[260px] md:w-[303px] h-[50px] md:h-[68px] text-[16px] md:text-[24px] px-4 flex items-center justify-center bg-white text-black font-semibold rounded-[12px] hover:text-blue-800 transition-all hover:bg-white"
                >
                  Upload existing resume
                </Button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex justify-center md:justify-end mt-4 md:mt-10 md:-translate-x-6">
            <div className="max-w-[480px] w-full">
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
