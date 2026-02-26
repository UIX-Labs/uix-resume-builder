'use client';

import { Button } from '@/shared/ui/button';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function BlogCreateResume() {
  const router = useRouter();
  return (
    <div
      className="flex flex-col justify-center md:min-h-[298px]
 items-center gap-4 px-4 md:pr-8 md:gap-2 bg-[url('/images/blog/hero-section/Dot-bg.png')] bg-[#F2F2F233] rounded-2xl border-2 border-green-600 relative overflow-hidden group mt-10 p-6 md:p-2 text-center"
    >
      <Image
        src="/images/blog/slug/Avatar.png"
        alt="left avatar"
        className="absolute bottom-0 -left-6 md:-left-4 h-24 md:h-40 pointer-events-none select-none"
        width={100}
        height={24}
      />

      <Image
        src="/images/blog/slug/avatar-img.png"
        alt=""
        className="absolute bottom-0 -right-6 md:-right-4 h-24 md:h-40 pointer-events-none select-none"
        width={100}
        height={24}
      />

      <div className="text-2xl md:text-5xl font-semibold relative z-10">
        Create your <span className="text-green-600 font-semibold">Resume</span>
      </div>

      <div className="text-base md:text-2xl max-w-[486px] text-center relative z-10">
        Your resume is an extension of you. Make it truly yours.
      </div>

      <Button
        type="button"
        className="bg-green-600 text-lg lg:text-xl text-white px-4 py-3 md:py-4 font-semibold rounded-md mb-2 md:mb-0 mt-2 hover:bg-green-700 transition-colors duration-300 cursor-pointer relative z-10 shadow-lg"
        onClick={() => {
          router.push('/dashboard');
          trackEvent('create_resume_click', {
            source: 'blog',
            method: 'create_my_resume',
          });
        }}
      >
        Create your Resume
      </Button>

      <Image
        src="/images/blog/slug/Avatar.png"
        alt="left avatar"
        className="absolute bottom-0 -left-6 md:-left-4 h-24 md:h-40 pointer-events-none select-none"
        width={100}
        height={100}
      />

      <Image
        src="/images/blog/slug/avatar-img.png"
        alt=""
        className="absolute bottom-0 -right-6 md:-right-4 h-24 md:h-40 pointer-events-none select-none"
        width={100}
        height={100}
      />

      <div className="text-2xl md:text-5xl font-semibold relative z-10">
        Create your <span className="text-green-600 font-semibold">Resume</span>
      </div>

      <div className="text-base md:text-2xl max-w-[486px] text-center relative z-10">
        Your resume is an extension of you. Make it truly yours.
      </div>

      <button
        type="button"
        className="bg-green-600 text-lg lg:text-xl text-white px-4 py-3 md:py-4 font-semibold rounded-md mb-2 md:mb-0 mt-2 hover:bg-green-700 transition-colors duration-300 cursor-pointer relative z-10 shadow-lg"
        onClick={() => {
          router.push('/dashboard');
          trackEvent('create_resume_click', {
            source: 'blog',
            method: 'create_my_resume',
          });
        }}
      >
        Create your Resume
      </button>
    </div>
  );
}
