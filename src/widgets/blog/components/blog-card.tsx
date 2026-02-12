import { Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogCardProps {
  image: string;
  category: string;
  title: string;
  author: string;
  date: string;
  slug?: string;
}

export default function BlogCard({ image, category, title, author, date, slug = '#' }: BlogCardProps) {
  return (
    <Link href={slug}>
      <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden hover:shadow-md transition cursor-pointer p-4">
        {/* IMAGE */}
        {/* IMAGE */}
        <div className="relative w-full h-[255px]">
          <div className="rounded-md overflow-hidden">
          <Image src={image} alt={title} fill className="object-cover h-full rounded-md" />
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-4 flex flex-col gap-4 mt-2">
          {/* CATEGORY */}
          <span className="inline-flex items-center justify-center bg-orange-500 text-white text-sm font-semibold px-3 py-1 rounded-md w-fit">
            {category}
          </span>

          {/* TITLE */}
          <h3 className="text-[#17171A] text-[20px] font-semibold leading-snug line-clamp-2">{title}</h3>

          {/* META */}
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <img src="https://picsum.photos/200" className="w-6 h-6 rounded-full" alt="" />

            <span>By <span className='font-semibold text-black'>{author}</span> &nbsp;|&nbsp;</span>

            <Clock className="w-4 h-4 text-gray-500" />

            <span>&nbsp;{date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
