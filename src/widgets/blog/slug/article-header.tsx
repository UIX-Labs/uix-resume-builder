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
        p-6 pt-14 sm:p-10 sm:pt-16 lg:pt-12 lg:pb-4
        flex
        flex-col
        lg:flex-row
        gap-8
        lg:items-center
        justify-between
      "
    >
      {breadcrumbs && (
        <div
          className="
      absolute top-5 left-6 right-6 lg:left-12 z-10 
      flex items-center gap-1 
      overflow-x-auto 
      flex-nowrap 
      scrollbar-hide
      [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
      whitespace-nowrap text-xs md:text-[13px] text-gray-500
    "
        >
          {breadcrumbs.map((item, index) => (
            <div key={index} className="flex items-center flex-shrink-0 sentenceCase">
              {item.href ? (
                <a href={item.href} className="hover:text-black transition-colors sentenceCase">
                  {item.label}
                </a>
              ) : (
                <span className="text-black font-medium">{item.label}</span>
              )}
              {index < breadcrumbs.length - 1 && <span className="mx-1 text-gray-500 flex-shrink-0">{'>'}</span>}
            </div>
          ))}
        </div>
      )}

      <div className="order-2 lg:order-1 flex-1 flex flex-col justify-center text-left">
        <h1 className="text-2xl font-bold tracking-tight text-[#0B0A09] sm:text-4xl lg:text-5xl leading-[1.15]">
          {title}
        </h1>

        <p className="mt-4 text-base lg:text-lg leading-relaxed text-gray-600 max-w-[600px]">{description}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm sm:text-base text-[#8A8C99] border-t border-gray-200 lg:border-none pt-4 lg:pt-0">
          <span className="flex items-center gap-1 text-black font-medium">
            Published by- <span className="text-[#8A8C99] font-normal ml-1">{author}</span>
          </span>

          <span className="hidden sm:block text-gray-300">|</span>

          <span className="whitespace-nowrap">Updated- {date}</span>

          <span className="hidden sm:block text-gray-300">|</span>

          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <Clock className="w-4 h-4" />
            {readingTime}
          </span>
        </div>
      </div>

      <div className="order-1 lg:order-2 w-full max-w-[240px] sm:max-w-[300px] lg:max-w-[380px] flex items-center justify-center mx-auto lg:mx-0">
        <img
          src="/images/blog/slug/header-img.png"
          alt="article header illustration"
          className="w-full h-auto object-contain drop-shadow-sm"
        />
      </div>
    </div>
  );
}
