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
    <div className="mt-6 rounded-2xl border-2 border-green-500 bg-[url('/images/blog/hero-section/Dot-bg.png')] p-6 pb-0 shadow-sm bg-gray-100">
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
      <div className="flex justify-center w-full">
        <button
          type="button"
          onClick={handleUploadClick}
          className="mt-4 w-3/4 rounded-lg bg-green-600 py-5 text-lg font-semibold text-white transition hover:bg-green-700"
        >
          Upload Resume & JD
        </button>
      </div>

      {/* Resume Preview Image */}
      <div className="mt-6 flex justify-center">
        <Image
          src="/images/blog/slug/upload-resume.png"
          alt="Resume preview"
          width={325}
          height={325}
          className="rounded-lg object-contain shadow-2xl"
        />
      </div>
    </div>
  );
}
