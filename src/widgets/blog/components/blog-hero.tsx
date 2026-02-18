'use client';

import Image from 'next/image';

interface BlogHeroProps {
  description: string;
  image: string;
  children: React.ReactNode;
}

export default function BlogHero({ description, image, children }: BlogHeroProps) {
  return (
    <div
      className="relative bg-[url('/images/blog/hero-section/Dot-bg.png')] bg-[#F2F2F233] rounded-2xl overflow-hidden border-4 
      border-white min-h-[296px] lg:h-[250px]"
    >
      <div className="flex flex-col lg:flex-row items-stretch h-full">
        <div className="w-full lg:w-[55%] px-4 lg:px-10 text-center lg:text-left order-2 lg:order-1 flex flex-col justify-center py-8 lg:py-0">
          <h1 className="text-2xl sm:text-3xl lg:text-[45px] font-semibold leading-tight">{children}</h1>

          <p className="mt-2 text-base sm:text-lg lg:text-[24px] max-w-[520px] text-[#1A1A1A] mx-auto lg:mx-0 leading-tight">
            {description}
          </p>
        </div>

        <div className="w-full lg:w-[45%] relative min-h-[200px] lg:min-h-full order-1 lg:order-2">
          <Image src={image} alt="hero" fill priority className="object-cover object-center lg:object-right" />
        </div>
      </div>
    </div>
  );
}
