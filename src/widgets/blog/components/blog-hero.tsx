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
      className="relative bg-[url('/images/blog/hero-section/Dot-bg.png')] bg-[#F2F2F233] rounded-2xl overflow-hidden max-w-[1395px] mx-auto border-4 
      border-white min-h-[296px] lg:h-[250px]" 
    >
      <div className="flex flex-col lg:flex-row items-stretch h-full">
  
        {/* TEXT - Vertically Centered */}
        <div className="w-full lg:w-[55%] px-4 lg:px-10 text-center lg:text-left order-2 lg:order-1 flex flex-col justify-center py-8 lg:py-0">
          <h1 className="text-2xl sm:text-3xl lg:text-[45px] font-semibold leading-tight">
            {children}
          </h1>

          <p className="mt-2 text-md sm:text-base lg:text-lg max-w-[480px] text-black mx-auto lg:mx-0">
            {description}
          </p>
        </div>

        {/* IMAGE - Covering full width/height of its section */}
        <div className="w-full lg:w-[45%] relative min-h-[200px] lg:min-h-full order-1 lg:order-2">
          <Image
            src={image}
            alt="hero"
            fill
            priority
            className="object-cover object-center lg:object-right"
          />
        </div>

      </div>
    </div>
  );
}