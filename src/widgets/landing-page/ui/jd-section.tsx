'use client';

import { Button } from '@shared/ui';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCachedUser } from '@shared/hooks/use-user';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';

export default function JDSection() {
  const router = useRouter();
  const user = useCachedUser();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [inView, setInView] = useState(false);

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
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [inView]);

  const handleUploadClick = () => {
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
    <section className="flex min-h-screen items-center justify-between px-20">
      {/* LEFT: Video */}
      <div className="flex flex-1 justify-center">
        <div className="h-[776px] w-[650px] overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
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

      {/* RIGHT: Content */}
      <div className="flex flex-1 flex-col pl-20">
        <h1 className="mb-6 text-[80px] leading-none">
          <span className="text-blue-600 font-black">Match your resume</span>
          <br />
          <span className="text-black font-semibold">to the job description</span>
        </h1>

        <p className="mb-4 max-w-md text-lg text-gray-500 text-nowrap">
          Pika rewrites your resume based on the job description — instantly.
        </p>

        <Button
          onClick={handleUploadClick}
          className="w-fit rounded-xl bg-blue-600 px-8 py-8 text-3xl font-medium text-white transition hover:bg-blue-700"
        >
          Upload Resume & JD
        </Button>
      </div>
    </section>
  );
}
