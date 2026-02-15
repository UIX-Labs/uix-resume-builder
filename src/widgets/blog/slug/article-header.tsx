import { Clock } from 'lucide-react';

interface ArticleHeaderProps {
  title: string;
  description: string;
  author: string;
  authorRole?: string;
  date: string;
  readingTime: string;
  tags: string[];
}

export default function ArticleHeader({
  title,
  description,
  author,
  authorRole,
  date,
  readingTime,
  tags,
}: ArticleHeaderProps) {
  return (
    <div
      className="
    md:mb-10
    bg-[url('/images/blog/hero-section/Dot-bg.png')]
    bg-[#F2F2F233]
    w-full
    rounded-2xl
    border-4 border-white
    relative overflow-hidden
    p-6 sm:p-10
    flex
    flex-col
    lg:flex-row
    gap-8
    lg:items-center
    lg:justify-between
  "
    >
      {/* TEXT CONTENT */}
      <div className="order-2 lg:order-1 w-full flex flex-col justify-center">
        {/* TITLE */}
        <h1 className="text-3xl font-bold tracking-tight text-[#0B0A09] sm:text-4xl lg:text-5xl leading-tight">
          {title}
        </h1>

        {/* DESCRIPTION */}
        <p className="mt-6 text-lg lg:text-xl leading-relaxed text-gray-600 max-w-[650px]">{description}</p>

        {/* META BAR */}
        <div className="mt-5 flex flex-wrap items-center gap-6 text-sm sm:text-base text-[#8A8C99] border-gray-200 pt-6">
          <span className="flex items-center gap-1 text-black">
            Published by-
            <span className="text-[#8A8C99]">{author}</span>
          </span>

          <span className="text-[#8A8C99]">|</span>

          <span className="flex items-center gap-2">Update- {date}</span>

          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 sm:w-2 sm:h-2 md:w-4 md:h-4" />
            {readingTime}
          </span>
        </div>
      </div>

      <div className="order-1 lg:order-2 w-full max-w-[320px] lg:max-w-[400px] flex items-center justify-center">
        <img
          src="/images/blog/slug/header-img.png"
          alt="article header illustration"
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}
