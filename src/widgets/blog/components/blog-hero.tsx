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
      className="relative bg-[url('/images/blog/hero-section/Dot-bg.png')] bg-[#F2F2F233] rounded-2xl sm:p-8 overflow-hidden max-w-[1395px] mx-auto border-4 
border-white h-[296px] md:h-full"
    >
      {/* Wrapper flex container */}
      <div className="flex flex-col lg:flex-row  justify-between items-center">
        {/* IMAGE — mobile pe upar */}
        <div className="w-full flex justify-center lg:absolute lg:top-0 lg:right-0 lg:w-auto">
          <Image
            src={image}
            alt="hero"
            width={500}
            height={500}
            className="object-contain max-w-[300px] sm:max-w-[400px] lg:max-w-[500px]"
          />
        </div>

        {/* TEXT */}
        <div className="w-full lg:w-[55%] relative z-10 px-4 lg:px-10 text-center lg:text-left p-2">
          <h1 className="text-3xl sm:text-4xl lg:text-[63px] font-semibold leading-tight">{children}</h1>

          <p className="mt-4 text-base sm:text-lg lg:text-2xl max-w-[480px] text-gray-600 mx-auto lg:mx-0">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
