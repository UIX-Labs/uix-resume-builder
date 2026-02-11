import { Calendar, Clock, User } from 'lucide-react';

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
    mb-10
    bg-[url('/images/blog/hero-section/Dot-bg.png')]
    w-full
    rounded-2xl
    border-4 border-white
    relative overflow-hidden
    group
    p-6 sm:p-8
    flex
    flex-col
    lg:flex-row
    gap-8
    lg:justify-between
  "
>

      {/* <div className="mb-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div> */}

      

      {/* TITLE */}
      <div className="order-2 lg:order-1 w-full">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">{title}</h1>

        {/* DESCRIPTION */}
        <p className="mt-4 text-lg leading-relaxed text-gray-600">{description}</p>

        {/* META BAR */}
        <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-gray-500 border-y border-gray-100 py-4">
          <span className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="font-medium text-gray-700">{author}</span>
            {authorRole && <span className="text-gray-400">• {authorRole}</span>}
          </span>

          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {date}
          </span>

          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {readingTime}
          </span>
        </div>
      </div>



      <div className='order-1 lg:order-2  w-full max-w-[350px] h-auto mx-auto lg:mx-0'>
        <img src="/images/blog/slug/header-img.png" alt=""  className="w-full max-w-[350px] h-auto mx-auto lg:mx-0" />
      </div>

      
    </div>
  );
}
