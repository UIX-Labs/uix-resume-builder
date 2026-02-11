'use client';

import Image from 'next/image';

interface BlogHeroProps {
  description: string;
  image: string;
  children: React.ReactNode;
}

export default function BlogHero({ description, image, children }: BlogHeroProps) {
  return (
    <section className="max-w-[1395px] mx-auto px-2">
      <div className="border-4 border-white rounded-2xl">
        <div className="relative bg-[url('/images/blog/hero-section/Dot-bg.png')] bg-[#F2F2F233] rounded-2xl p-8 min-h-[280px] overflow-hidden">
          {/* LEFT */}
          <div className="relative z-10 w-full flex flex-col justify-center px-4 lg:px-10">
            <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">{children}</h1>

            <p className="mt-4 text-base sm:text-lg lg:text-xl max-w-[480px] text-gray-600">{description}</p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="absolute top-0 right-0 flex items-center justify-end pointer-events-none">
            <Image src={image} alt="hero" width={600} height={600} className="object-contain max-h-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
