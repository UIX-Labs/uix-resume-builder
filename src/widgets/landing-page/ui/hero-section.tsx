'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/components/button';
import { useIsMobile } from '@shared/hooks/use-mobile';
import { useCachedUser } from '@shared/hooks/use-user';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import CountUp from '@shared/ui/count-up';
import { LinkedInModal } from '@widgets/dashboard/ui/linkedin-integration-card';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import getCurrentStatsQuery from '../api/query';
import { getUserInitials } from '../lib/user-initials';
import HeroConfetti from './hero-confetti';
import HeroImgSection from './hero-img-section';
import { MobileTextView } from './mobile-text-view';

const HeroSection = () => {
  const router = useRouter();
  const user = useCachedUser();
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

  const overlays = [
    {
      id: 'custom-templates',
      content: (
        <div className="overlay-item overflow-hidden z-10 rounded-3xl glass-card1">
          <img src="images/templates.svg" alt="Template 1" />
        </div>
      ),
      desktopPosition: { top: '80%', left: '-7%' },
      mobilePosition: { top: '110%', left: '-50%' },
      width: 420,
      mobileWidth: 420,
      rotate: 12,
      initial: { rotate: 12, x: -400, y: 200, opacity: 0 },
    },

    {
      id: 'resume-score',
      content: (
        <div className="overlay-item z-10 opacity-100">
          <img src="images/resume-score-img.svg" alt="Hired at Meta" className="w-full h-auto" />
        </div>
      ),
      desktopPosition: { top: '-30%', left: '-6%' },
      mobilePosition: { top: '-22%', left: '-40%' },
      mobileWidth: 320,
      initial: { x: -300, y: -300, opacity: 0 },
    },

    {
      id: 'colors',
      content: (
        <div className="glass-card overlay-item bg-white/20 rounded-2xl">
          <img src="images/color-palete.svg" alt="Hired at Meta" className="w-full h-auto" />
        </div>
      ),
      desktopPosition: { top: '-22%', right: '-8%' },
      mobilePosition: { top: '-18%', right: '-28%' },
      width: 250,
      mobileWidth: 250,
      initial: { rotate: 25, x: 400, y: -200, opacity: 0 },
    },

    {
      id: 'hired',
      content: (
        <div className="overlay-item">
          <img src="images/image-hired.svg" alt="Hired at Meta" className="w-full h-auto" />
        </div>
      ),
      desktopPosition: { top: '80%', right: '-7%' },
      mobilePosition: { top: '90%', right: '-50%' },
      width: 300,
      mobileWidth: 350,
      rotate: -15,
      initial: { rotate: -15, x: 400, y: 300, opacity: 0 },
    },
  ];

  // Unified LinkedIn Autofill handler (MOBILE -> MobileView | DESKTOP -> Modal/Login)
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

  // Upload resume handler (mobile & desktop logic preserved)
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
    <section className="relative w-full h-full px-4 md:px-0">
      {/* Background blobs (left side only) */}
      <div className="absolute inset-y-0 left-0 w-[35%] pointer-events-none overflow-hidden -z-10"></div>

      <HeroConfetti />
      <div className="max-w-7xl mx-auto relative">
        <section className="relative w-full h-full px-4 md:px-0">
          <div className="max-w-7xl mx-auto relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* LEFT COLUMN */}
              <div className="-mt-16 md:-mt-25 ">
                <div className="flex items-center gap-3 mt-16 md:mt-0">
                  {/* Avatars */}
                  <div className="flex flex-col md:flex-row items-start gap-2 md:gap-4 mt-2 md:mt-16">
                    <div className="flex -space-x-2">
                      {userAvatars.map((avatar) => (
                        <Avatar key={avatar.key} className="w-9 h-9 md:w-12 md:h-12 border-2 border-white">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback className="text-black">{avatar.initials}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>

                    <span className="font-semibold flex items-center text-base md:text-lg text-gray-900 mt-2">
                      Trusted by{' '}
                      <span className="inline-block tabular-nums min-w-[80px] text-center">
                        <CountUp from={10} to={currentStats?.totalUsers ?? 0} separator="," duration={1} />+
                      </span>{' '}
                      professionals
                    </span>
                  </div>
                </div>
                {/* Heading */}
                <div className="mt-1">
                  <h1 className="text-2xl md:text-[80px] leading-[0.5] tracking-[-0.03em]">
                    <span className="inline-flex items-baseline whitespace-nowrap">
                      <span className="font-semibold text-2xl md:text-[80px]">Build a</span>{' '}
                      <span className="ml-2 text-blue-800 font-[800] text-5xl md:text-[80px]"> Professional</span>
                    </span>
                    <span className="font-geist text-green-600 font-[800]">Resume</span>{' '}
                    <span className="align-middle text-2xl md:text-[37px] font-semibold">in under 3 minutes</span>
                  </h1>
                </div>

                {/* Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleLinkedInUnified}
                    className="w-[303px] h-[68px] 
             px-[40px] 
             flex items-center justify-center gap-[10px]
             bg-blue-900 text-white 
             text-[24px] font-semibold 
             rounded-[12px]
             border border-blue-800
             
             hover:bg-blue-800
             transition-all duration-300"
                  >
                    Auto-fill via LinkedIn
                  </Button>

                  <Button
                    onClick={handleUploadClick}
                    className="w-[303px] h-[68px] 
             px-[50px] 
             py-[20px]
             text-[24px]
             flex items-center justify-center gap-[10px]
             bg-white text-black 
             font-semibold 
             rounded-[12px]
            hover:text-blue-800
             hover:bg-white
             transition-all"
                  >
                    Upload existing resume
                  </Button>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="hidden md:flex justify-end relative">
                <div className="max-w-[480px] w-full">
                  <HeroImgSection />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Overlays */}
        <div className="block md:hidden">
          {overlays.map((overlay, _i) => (
            <motion.div
              key={`${overlay.id}-mobile`}
              className="overlay-item absolute scale-[0.4] md:scale-100"
              style={{
                top: overlay.mobilePosition.top,
                left: overlay.mobilePosition.left,
                right: overlay.mobilePosition.right,
                width: overlay.mobileWidth ? `${overlay.mobileWidth}px` : overlay.width ? `${overlay.width}px` : 'auto',
              }}
              initial={overlay.initial}
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{
                duration: 1,
                ease: 'easeOut',
              }}
            >
              {overlay.content}
            </motion.div>
          ))}
        </div>
      </div>

      <LinkedInModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Mobile Text View */}
      {isMobile && <MobileTextView isOpen={showMobileView} onClose={() => setShowMobileView(false)} />}
    </section>
  );
};

export default HeroSection;
