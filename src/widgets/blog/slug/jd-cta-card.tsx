'use client';

import { useIsMobile } from '@shared/hooks/use-mobile';
import { useCachedUser } from '@shared/hooks/use-user';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function JDCTACard() {
  const router = useRouter();
  const user = useCachedUser();
  const isMobile = useIsMobile();

  const handleUploadClick = () => {
    if (isMobile) return;

    if (!user) {
      localStorage.setItem('openJDModal', 'true');
      router.push('/auth');
    } else {
      router.push('/dashboard?openModal=jd');
    }
  };

  return (
    <div
      className="mt-6 rounded-2xl border-2 border-green-500 bg-[url('/images/blog/hero-section/Dot-bg.png')] p-4 pb-0 shadow-sm bg-gray-100
    flex flex-col items-center justify-center"
    >
      {/* Title */}
      <h3 className="text-2xl font-semibold text-gray-900 text-center">
        Upgrade Your Resume with
        <span className="block text-green-600 font-bold">Job Description</span>
      </h3>

      {/* Description */}
      <p className="mt-3 text-lg text-gray-500 text-center">
        Pika rewrites your resume based on the job description instantly.
      </p>

      {/* Button */}
      <div className="flex justify-center w-full ">
        <button
          type="button"
          onClick={handleUploadClick}
          className="mt-4 w-1/3 md:w-2/3 rounded-lg bg-green-600 py-4 text-lg font-semibold text-white transition hover:bg-green-700 cursor-pointer"
        >
          Upload Resume & JD
        </button>
      </div>

      {/* Resume Preview Image */}
      {/* Resume Preview Image Container */}
      <div className="relative mt-6 flex justify-center w-full h-[120px]">
        <div className="w-full h-full">
          <Image
            src="/images/blog/slug/upload-resume.svg"
            alt="Resume preview"
            fill
            className="object-contain object-bottom"
            priority
          />
        </div>
      </div>
    </div>
  );
}
