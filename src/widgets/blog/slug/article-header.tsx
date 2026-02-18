import { Clock } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ArticleHeaderProps {
  title: string;
  description: string;
  author: string;
  authorRole?: string;
  date: string;
  readingTime: string;
  tags: string[];
  highlightWord?: string;
  breadcrumbs?: BreadcrumbItem[];
}

export default function ArticleHeader({
  title,
  description,
  author,
  date,
  readingTime,
  highlightWord,
  breadcrumbs,
}: ArticleHeaderProps) {
  return (
    <div
      className="
        md:mb-10
        bg-[url('/images/blog/hero-section/Dot-bg.png')]
        bg-[#F2F2F233]
        w-full
        rounded-2xl
        border-2 border-white
        relative overflow-hidden
        p-6 sm:p-10
        flex
        flex-col
        lg:flex-row
        gap-4 sm:gap-8  /* Gap kam kiya mobile ke liye */
        lg:items-center
        lg:justify-between
      "
    >
      {breadcrumbs && (
        <div
          className="absolute top-4 z-10 
          left-4 lg:left-10
          flex items-center gap-1 
          overflow-x-auto no-scrollbar whitespace-nowrap md:text-[13px] text-xs text-gray-500
          max-w-[calc(100%-32px)] lg:max-w-none"
        >
          <div className="flex items-center">
            {breadcrumbs.map((item, index) => (
              <span key={index} className="flex items-center flex-shrink-0">
                {item.href ? (
                  <a href={item.href} className="hover:text-black transition-colors">
                    {item.label}
                  </a>
                ) : (
                  <span className="text-black font-medium">{item.label}</span>
                )}
                {index < breadcrumbs.length - 1 && <span className="mx-1.5 text-gray-400">/</span>}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="order-1 lg:order-2 w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[400px] flex items-center justify-center mx-auto mt-2">
        <img
          src="/images/blog/slug/header-img.png"
          alt="article header illustration"
          className="w-full h-full object-contain"
        />
      </div>

      {/* TEXT CONTENT */}
      {/* mt-4 mobile par breadcrumbs aur image se distance rakhega */}
      <div className="order-2 lg:order-1 w-full flex flex-col justify-center mt-4 sm:mt-2">
        {/* TITLE */}
        <h1 className="text-2xl font-bold tracking-tight text-[#0B0A09] sm:text-4xl lg:text-5xl leading-tight">
          {title}
        </h1>

        {/* DESCRIPTION */}
        <p className="mt-4 sm:mt-6 text-base lg:text-xl leading-relaxed text-gray-600 max-w-[650px]">{description}</p>

        {/* META BAR */}
        <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-2 sm:gap-6 text-[14px] sm:text-base text-[#8A8C99] border-t border-gray-100 lg:border-none pt-4 lg:pt-0">
          <span className="flex items-center gap-1 text-black whitespace-nowrap">
            Published by- <span className="text-[#8A8C99]">{author}</span>
          </span>
          <span className="text-[#8A8C99] px-0.5">|</span>

          <span className="flex items-center gap-1 whitespace-nowrap">Update- {date}</span>

          <span className="text-[#8A8C99] px-0.5">|</span>

          <span className="flex items-center gap-1 whitespace-nowrap">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {readingTime}
          </span>
        </div>
      </div>
    </div>
  );
}
