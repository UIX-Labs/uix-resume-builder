'use client';

import { Button } from '@shared/ui';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCachedUser } from '@shared/hooks/use-user';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import { useIsMobile } from '@shared/hooks/use-mobile';
import { MobileTextView } from './mobile-text-view';

export default function JDSection() {
  const router = useRouter();
  const user = useCachedUser();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [inView, setInView] = useState(false);
  const isMobile = useIsMobile();
  const [showMobileView, setShowMobileView] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        threshold: 0.5,
      },
    );

    observer.observe(videoRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;

    if (inView) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [inView]);

  const handleUploadClick = () => {
    if (isMobile) {
      setShowMobileView(true);

      trackEvent('create_resume_click', {
        source: 'landing_jd_section',
        method: 'upload_resume_jd',
        device: 'mobile',
      });

      return;
    }

    if (!user) {
      // User not logged in, store intent and redirect to auth page
      localStorage.setItem('openJDModal', 'true');

      trackEvent('create_resume_click', {
        source: 'landing_jd_section',
        method: 'upload_resume_jd',
        user_status: 'not_logged_in',
      });

      router.push('/auth');
    } else {
      // User logged in, redirect to dashboard with modal parameter
      trackEvent('create_resume_click', {
        source: 'landing_jd_section',
        method: 'upload_resume_jd',
        user_status: 'logged_in',
      });

      router.push('/dashboard?openModal=jd');
    }
  };

  return (
    <section
      className="
        relative flex md:min-h-screen items-center md:justify-between px-6
        md:px-20
        flex-col md:flex-row
      "
    >
      <div
        aria-hidden
        className="
      pointer-events-none
      absolute left-[-30%] top-1/2 -translate-y-1/2
      h-[400px] w-[400px]
      md:h-[600px] md:w-[600px]
      rounded-[645px]
      blur-[100px]
      -z-1
    "
        style={{
          background:
            'linear-gradient(139deg, rgba(228,187,167,0.5) 22.84%, rgba(94,31,29,0.5) 37.54%, rgba(23,23,23,0.5) 62.55%)',
        }}
      />
      <div></div>
      {/* MOBILE: Heading */}
      <div className="md:hidden text-center mt-12 mb-5 px-4">
        <h1 className="text-5xl leading-none font-black text-blue-600">Match Your Resume</h1>
        <p className="text-[28px] font-semibold text-black leading-none">to the job description</p>
      </div>

      {/* LEFT: Video */}
      <div className="flex justify-center">
        <div
          className="
            h-[420px] w-auto
            md:h-[740px] md:w-[650px]
            overflow-hidden rounded-4xl border-white border-[2px]
            shadow-[0_20px_60px_rgba(0,0,0,0.1)]
          "
        >
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            className="h-full w-full object-cover"
            src="/videos/jdsection.mp4"
          />
        </div>
      </div>

      {/* RIGHT: Content (Desktop only) */}
      <div className="hidden md:flex flex-1 flex-col pl-20">
        <h1 className="mb-6 text-[80px] leading-none">
          <span className="text-blue-600 font-black">Match your resume</span>
          <br />
          <span className="text-black font-semibold">to the job description</span>
        </h1>

        <p className="mb-4 max-w-md text-base text-gray-500 text-nowrap">
          Pika rewrites your resume based on the job description — instantly.
        </p>

        <Button
          onClick={handleUploadClick}
          className="w-fit rounded-xl bg-blue-600 px-8 py-8 text-3xl font-medium text-white transition hover:bg-blue-700"
        >
          Upload Resume & JD
        </Button>
      </div>

      {/* MOBILE: CTA */}
      <div className="md:hidden w-full px-6 mt-8 mb-5 text-center">
        <p className="mb-4 text-sm text-gray-700">
          Pika rewrites your resume based on the job description — instantly.
        </p>

        <Button
          onClick={handleUploadClick}
          className="
            w-full rounded-xl bg-blue-600 py-8
            text-xl font-semibold text-white
            hover:bg-blue-700
          "
        >
          Upload Resume & JD
        </Button>
      </div>
      {isMobile && <MobileTextView isOpen={showMobileView} onClose={() => setShowMobileView(false)} />}
    </section>
  );
}
