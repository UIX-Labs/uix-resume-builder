'use client';

import Image from 'next/image';

interface BlogHeroProps {
  title: string;
  highlightWord: string;
  highlightColor?: string;
  description: string;
  image: string;
  
}

export default function BlogHero({ title, highlightWord, highlightColor, description, image }: BlogHeroProps) {
  const parts = title.split(highlightWord);

  const isHexColor = highlightColor?.startsWith('#');
  const highlightStyles = isHexColor ? { color: highlightColor } : {};
  const highlightClassName = isHexColor ? '' : highlightColor || 'text-blue-600';

  return (
    <section className="max-w-[1395px] mx-auto px-2">
      {/* OUTER BORDER */}
      <div className="border-4 border-white rounded-2xl">
        {/* HERO CONTAINER */}
        <div className="relative bg-[url('/images/blog/hero-section/Dot-bg.png')] bg-[#F2F2F233] rounded-2xl p-8 min-h-[280px] overflow-hidden">
          {/* LEFT CONTENT */}
          <div className="relative z-10 w-full lg:w-[55%] flex flex-col justify-center px-4 lg:px-10">
            <h1 className="text-3xl sm:text-4xl lg:text-[63px] font-semibold leading-tight text-black">
              {parts[0]}
              <span className={`${highlightClassName} font-bold mx-2`} style={highlightStyles}>
                {highlightWord}
              </span>
              {parts[1]}
            </h1>

            <p className="mt-4 text-base sm:text-lg lg:text-[24px] font-medium max-w-[480px] text-gray-600">
              {description}
            </p>
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
