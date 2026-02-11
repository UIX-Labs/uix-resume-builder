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
    <div className="mt-6 rounded-2xl border border-green-500 bg-white p-6 shadow-sm">
      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 text-center">
        Upgrade Your Resume with
        <span className="block text-green-600 font-bold">
          Job Description
        </span>
      </h3>

      {/* Description */}
      <p className="mt-3 text-sm text-gray-500 text-center">
        Pika rewrites your resume based on the job description instantly.
      </p>

      {/* Button */}
      <button
        onClick={handleUploadClick}
        className="mt-4 w-full rounded-lg bg-green-600 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
      >
        Upload Resume & JD
      </button>

      {/* Resume Preview Image */}
      <div className="mt-6 flex justify-center">
        <Image
          src="/images/blog/slug/upload-resume.png"
          alt="Resume preview"
          width={286}
          height={300}
          className="rounded-lg"
        />
      </div>
    </div>
  );
}
