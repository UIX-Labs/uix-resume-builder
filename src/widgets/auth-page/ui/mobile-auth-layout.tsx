'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import LinkedInSignInButton from '@shared/ui/components/linkedIn-signin-button';
import GoogleSignInButton from '@shared/ui/components/google-signin-button';
import MobileHeroVideo from './mobile-video-background';
import { Button } from '@shared/ui/components/button';
import Header from '@widgets/landing-page/ui/header-section';
import MobileAuthModal from './mobile-auth-modal';
import { cn } from '@shared/lib/utils';
import { useSearchParams } from 'next/navigation';
import { setReferrerUserId } from '@shared/lib/referrer-user-id';

type Stage = 'intro' | 'shrink' | 'cta';

export default function MobileAuthLayout() {
  const [stage, setStage] = useState<Stage>('intro');
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const t1 = setTimeout(() => setStage('shrink'), 600);
    const t2 = setTimeout(() => setStage('cta'), 900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    // Capture referrer userId from URL parameters
    const userId = searchParams.get('userId');
    if (userId) {
      setReferrerUserId(userId);
    }
  }, [searchParams]);

  return (
    <div className={`flex flex-col items-center px-4 ${stage === 'intro' ? 'justify-center' : 'min-h-screen'}`}>
      <Header />

      {/* HERO */}
      <motion.div
        animate={{
          scale: stage === 'intro' ? 1 : 1,
          height: stage === 'intro' ? '80dvh' : '280px',
        }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className={cn(
          'w-full rounded-[28px] overflow-hidden ',
          stage !== 'intro' && 'video-container--mobile  max-w-[250px]',
        )}
      >
        <MobileHeroVideo isIntro={stage === 'intro'} />
      </motion.div>

      {/* CTA */}
      {stage === 'cta' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="w-full max-w-[360px] mt-6 space-y-4 text-center"
        >
          <h1 className="text-center text-4xl font-semibold leading-none">
            Build Your <p className="font-black">Perfect Resume</p>
          </h1>

          <LinkedInSignInButton />
          <GoogleSignInButton />

          <div className="flex items-center justify-center gap-3">
            <span className="w-32 h-[1px] bg-gradient-to-r from-transparent to-gray-950 opacity-40"></span>

            <span className="text-lg font-semibold text-[rgb(102,102,102)] whitespace-nowrap">or</span>

            <span className="w-32 h-[1px] bg-gradient-to-l from-transparent to-gray-950 opacity-40"></span>
          </div>

          <Button
            onClick={() => setOpenAuthModal(true)}
            className="px-10 py-6 text-[rgba(149,157,168,1)] text-base font-semibold rounded-xl border-2 border-white shadow-[0_1px_2px_0_rgba(0,0,0,0.04)] transition-all duration-300 bg-[linear-gradient(273deg,rgb(226,238,255)_3.19%,rgb(241,247,255)_84.37%)] hover:bg-[linear-gradient(273deg,rgb(102,141,193)_3.19%,rgb(66,72,80)_84.37%)] hover:text-white"
          >
            See other Option
          </Button>

          <p className="text-[11px] text-center text-gray-400 mb-2">
            By continuing, you agree to Resume Builder’s Terms & Privacy Policy
          </p>

          <MobileAuthModal open={openAuthModal} onOpenChange={setOpenAuthModal} />
        </motion.div>
      )}
    </div>
  );
}
