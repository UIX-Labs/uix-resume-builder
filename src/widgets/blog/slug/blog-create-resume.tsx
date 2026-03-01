'use client';

import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import Image from 'next/image';
import Link from 'next/link';
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
    <div className="mt-10 flex flex-col gap-6">
      <div className="relative flex flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border-2 border-green-600 bg-[#F2F2F233] bg-[url('/images/blog/hero-section/Dot-bg.png')] p-6 text-center md:min-h-[298px] md:gap-2 md:pr-8 md:p-2">
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

      {/* Cross-tool links for internal SEO */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/roast"
          className="flex-1 rounded-xl border border-gray-200 bg-white p-4 text-center transition-all hover:border-blue-300 hover:shadow-sm"
        >
          <p className="text-sm font-semibold text-gray-900">AI Resume Roast</p>
          <p className="mt-1 text-xs text-gray-500">Get instant, honest feedback on your resume</p>
        </Link>
        <Link
          href="/expert-review"
          className="flex-1 rounded-xl border border-gray-200 bg-white p-4 text-center transition-all hover:border-blue-300 hover:shadow-sm"
        >
          <p className="text-sm font-semibold text-gray-900">Expert Review</p>
          <p className="mt-1 text-xs text-gray-500">Reviewed by pros from Google, Microsoft & more</p>
        </Link>
      </div>
    </div>
  );
}
