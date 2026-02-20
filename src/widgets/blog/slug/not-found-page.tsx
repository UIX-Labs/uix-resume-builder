'use client';

import Image from 'next/image';
import Link from 'next/link';

interface NotFoundPageProps {
  color?: string;
}

export default function NotFoundPage({ color = '#004EF8' }: NotFoundPageProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full" style={{ ['--accent-color' as any]: color }}>
      {/* IMAGE */}
      <div className="relative w-full max-w-[600px] h-[300px] sm:h-[400px] overflow-hidden">
        <Image src="/images/blog/not-found-img.png" alt="not-found-img" fill priority className="object-cover" />
      </div>

      {/* TEXT */}
      <div className="text-xl sm:text-3xl flex flex-col items-center justify-center w-full mt-6 font-bold leading-tight text-center px-4">
        <span>We’re building something useful here.</span>
        <span className="text-[var(--accent-color)]">Coming soon.</span>
      </div>

      {/* BUTTON */}
      <Link href="/">
        <button
          className="
          mt-6 px-6 py-3 
          bg-blue-600 
          text-white rounded-lg 
          hover:opacity-90 
          transition-colors 
          w-[185px] h-[50px] 
          text-lg font-semibold
        "
        >
          Back to Home
        </button>
      </Link>
    </div>
  );
}
