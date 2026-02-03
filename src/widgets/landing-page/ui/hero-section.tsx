'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/components/button';
import { useIsMobile } from '@shared/hooks/use-mobile';
import { useCachedUser } from '@shared/hooks/use-user';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import CountUp from '@shared/ui/count-up';
import { LinkedInModal } from '@widgets/dashboard/ui/linkedin-integration-card';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import getCurrentStatsQuery from '../api/query';
import { getUserInitials } from '../lib/user-initials';
import { MobileTextView } from './mobile-text-view';

const HeroSection = () => {
  const router = useRouter();
  const user = useCachedUser();
  const isMobile = useIsMobile();
  const { data: currentStats } = getCurrentStatsQuery();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMobileView, setShowMobileView] = useState(false);

  // Calculate minimum width for count based on target number to prevent layout shift
  const countMinWidth = useMemo(() => {
    const targetNumber = currentStats?.totalUsers ?? 0;
    const formatted = new Intl.NumberFormat('en-US').format(targetNumber);
    // Use character width units (ch) for precise control - each ch is roughly the width of "0"
    // Use max of formatted length or initial value (10) to ensure smooth transition
    const maxChars = Math.max(formatted.length, '10'.length);
    // Use ch units for tighter, more accurate spacing (add 0.5ch for slight padding)
    return `${maxChars + 0.5}ch`;
  }, [currentStats?.totalUsers]);

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
      id: 'resume-score',
      content: (
        <div className="overlay-item z-10 opacity-[100%]">
          <img src="images/resume-score-img.svg" alt="Hired at Meta" className="w-full h-auto" />
        </div>
      ),
      desktopPosition: { top: '-30%', left: '-6%' },
      mobilePosition: { top: '-22%', left: '-40%' },
      mobileWidth: 320,
      initial: { x: -300, y: -300, opacity: 0 },
    },

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
    <section className="relative w-full h-full px-4 md:px-0">
      <div className="max-w-7xl mx-auto relative text-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-3 mt-8 md:mt-28">
          <div className="flex -space-x-2 mt-20 md:mt-0">
            {userAvatars.map((avatar) => (
              <Avatar key={avatar.key} className="w-9 h-9 md:w-12 md:h-12 border-2 border-white">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="text-black">{avatar.initials}</AvatarFallback>
              </Avatar>
            ))}
          </div>

          <span className="font-semibold text-base md:text-lg md:ml-3 text-gray-900">
            Trusted by{' '}
            <span className="inline-block tabular-nums" style={{ minWidth: countMinWidth, textAlign: 'center' }}>
              <CountUp
                from={10}
                to={currentStats?.totalUsers ?? 0}
                separator=","
                duration={1}
                className="count-up-text"
                onStart={undefined}
                onEnd={undefined}
              />
              +
            </span>{' '}
            professionals
          </span>
        </div>

        <div className="mt-3 md:mt-0">
          <h1 className="text-5xl md:text-[80px] font-semibold text-foreground mb-1 md:mb-4 leading-[0.85] md:leading-tight">
            Build a <span className="text-blue-800 font-[900]">Professional</span>
            <br />
            <span className="text-5xl md:text-[80px] block -mt-4 md:-mt-8 mx-auto w-fit px-6 md:px-[53px] rounded-full text-[rgba(0,137,65,1)] font-[900] backdrop-blur-xs bg-[rgba(0,242,85,0.2)] border border-white shadow-lg">
              Resume
            </span>
          </h1>

          <p className="text-2xl md:text-[37px] font-semibold text-foreground">in under 3 minutes</p>
        </div>

        <div className="mt-7 md:mt-10 flex flex-col items-center gap-3 md:gap-[16px]">
          <div className="relative inline-flex flex-col items-center">
            {!user && (
              <button
                type="button"
                className="absolute -left-1/4 -top-1/4 z-50 flex-shrink-0 flex items-center gap-1/2 md:gap-2 px-3 py-1.5 md:px-5 md:py-2 rounded-lg text-[10px] md:text-sm font-semibold text-white cursor-pointer transition-opacity hover:opacity-90"
                style={{
                  background: 'linear-gradient(135deg, #ADE4DB 0%, #5DC4E4 50%, #28A5EE 100%)',
                }}
              >
                <Image src="/images/flash-img.svg" alt="" width={24} height={24} className="w-3 h-3 md:w-6 md:h-6" />
                <span className="hidden md:inline">Claim Free Access</span>
                <Image src="/images/flash-img.svg" alt="" width={16} height={16} className="w-3 h-3 md:w-6 md:h-6" />
              </button>
            )}

            <Button
              onClick={handleLinkedInUnified}
              className="w-[280px] md:w-auto py-6 md:py-8 px-3 md:px-6 bg-blue-900 border-2 border-white text-white text-xl md:text-[32px] font-semibold rounded-xl hover:bg-blue-700 hover:shadow-xl transition-all duration-300 hover:scale-105 shadow-[0_1px_2px_0_rgba(0,0,0,0.04)] cursor-pointer
"
            >
              Auto-fill via LinkedIn
            </Button>
          </div>
          <Button
            onClick={handleUploadClick}
            className="w-[240px] md:w-auto py-6 md:py-8 px-6 bg-gradient-to-l from-white to-[rgb(224,224,224)] text-black text-xl md:text-2xl font-semibold rounded-xl border-2 border-white hover:bg-gray-100 hover:scale-105 shadow-[0_1px_2px_0_rgba(0,0,0,0.04)] transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Upload existing resume
          </Button>
        </div>

        {/* Desktop Overlays */}
        <div className="hidden md:block">
          {overlays.map((overlay, _i) => (
            <motion.div
              key={overlay.id}
              className="overlay-item absolute"
              style={{
                top: overlay.desktopPosition.top,
                left: overlay.desktopPosition.left,
                right: overlay.desktopPosition.right,
                width: overlay.width ? `${overlay.width}px` : 'auto',
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
