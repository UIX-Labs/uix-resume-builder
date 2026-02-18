'use client';

import Image from 'next/image';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BlogHeroProps {
  description: string;
  image: string;
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export default function BlogHero({ description, image, children, breadcrumbs }: BlogHeroProps) {
  return (
    <div
      className="relative bg-[url('/images/blog/hero-section/Dot-bg.png')] bg-[#F2F2F233] rounded-2xl overflow-hidden border-4 
      border-white min-h-[296px] lg:h-[296px]"
    >
      {breadcrumbs && (
        <div
          className="absolute top-4 lg:left-10 z-10 text-sm text-gray-500 left-1/2 -translate-x-1/2 whitespace-nowrap
                         lg:translate-x-0 lg:right-auto"
        >
          {breadcrumbs.map((item, index) => (
            <span key={index}>
              {item.href ? (
                <a href={item.href} className="hover:text-black transition-colors">
                  {item.label}
                </a>
              ) : (
                <span className="text-black font-medium">{item.label}</span>
              )}
              {index < breadcrumbs.length - 1 && <span className="mx-2 text-gray-400">{'>'}</span>}
            </span>
          ))}
        </div>
      )}
      <div className="flex flex-col lg:flex-row items-stretch h-full">
        {/* LEFT TEXT */}
        <div className="w-full lg:w-[55%] px-4 lg:px-10 text-center lg:text-left order-2 lg:order-1 flex flex-col justify-center py-10 lg:py-0">
          <h1 className="text-2xl sm:text-3xl lg:text-[45px] font-semibold leading-tight">{children}</h1>

          <p className="mt-2 text-base sm:text-lg lg:text-[24px] max-w-[520px] text-[#1A1A1A] mx-auto lg:mx-0 leading-tight">
            {description}
          </p>
        </div>

        <div className="w-full lg:w-1/2 relative order-1 h-[200px] sm:h-[250px] lg:h-full">
          <Image
            src={image}
            alt="hero"
            fill
            priority
            className="object-cover object-center lg:object-right w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
