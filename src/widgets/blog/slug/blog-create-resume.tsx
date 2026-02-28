'use client';

import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function BlogCreateResume() {
  const router = useRouter();

  const handleCreateResume = () => {
    router.push('/dashboard');
    trackEvent('create_resume_click', {
      source: 'blog',
      method: 'create_my_resume',
    });
  };

  return (
    <div className="relative mt-10 flex flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border-2 border-green-600 bg-[#F2F2F233] bg-[url('/images/blog/hero-section/Dot-bg.png')] p-6 text-center md:min-h-[298px] md:gap-2 md:pr-8 md:p-2">
      <Image
        src="/images/blog/slug/Avatar.png"
        alt="Avatar left"
        width={160}
        height={160}
        className="absolute bottom-0 -left-6 h-24 w-auto select-none pointer-events-none md:-left-4 md:h-40"
      />

      <Image
        src="/images/blog/slug/avatar-img.png"
        alt="Avatar right"
        width={160}
        height={160}
        className="absolute bottom-0 -right-6 h-24 w-auto select-none pointer-events-none md:-right-4 md:h-40"
      />

      <div className="relative z-10 text-2xl font-semibold md:text-5xl">
        Create your <span className="font-semibold text-green-600">Resume</span>
      </div>

      <div className="relative z-10 max-w-[486px] text-center text-base md:text-2xl">
        Your resume is an extension of you. Make it truly yours.
      </div>

      <button
        type="button"
        className="relative z-10 mt-2 mb-2 cursor-pointer rounded-md bg-green-600 px-4 py-3 text-lg font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-green-700 md:mb-0 md:py-4 lg:text-xl"
        onClick={handleCreateResume}
      >
        Create your Resume
      </button>
    </div>
  );
}