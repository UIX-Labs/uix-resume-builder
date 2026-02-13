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
  badgeColor?: string;
}

export default function BlogCard({
  image,
  category,
  title,
  author,
  date,
  slug = '#',
  badgeColor = '#000',
}: BlogCardProps) {
  return (
    <Link href={slug}>
      <div
        className="group bg-white border border-[#E5E7EB] rounded-lg cursor-pointer p-4 overflow-hidden 
        transition-all duration-300 hover:shadow-md hover:bg-[var(--card-color)]"
        style={{ ['--card-color' as any]: badgeColor }}
      >

        {/* IMAGE */}
        <div className="relative w-full h-[255px] rounded-md overflow-hidden">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>

        {/* CONTENT */}
        <div className="p-4 flex flex-col gap-4 mt-2">

          {/* BADGE */}
          <span
            className="
              inline-flex items-center justify-center 
              text-white text-sm font-semibold px-3 py-1 rounded-md w-fit
              bg-[var(--card-color)]
              transition-all duration-300
              group-hover:bg-white
            "
          >
            <span className="group-hover:text-[var(--card-color)]">
              {category}
            </span>
          </span>

          {/* TITLE */}
          <h3
            className="
              text-[#17171A] text-[20px] font-semibold leading-snug line-clamp-2
              transition-all duration-300
              group-hover:text-white
            "
          >
            {title}
          </h3>

          {/* META */}
          <div
            className="
              flex items-center gap-2 text-xs text-gray-500
              transition-all duration-300
              group-hover:text-white
            "
          >
            <img src="https://picsum.photos/200" className="w-6 h-6 rounded-full" alt="" />

            <span>
              By{' '}
              <span className="font-semibold text-black group-hover:text-white">
                {author}
              </span>{' '}
              &nbsp;|&nbsp;
            </span>

            <Clock className="w-4 h-4 group-hover:text-white" />

            <span>&nbsp;{date}</span>
          </div>

        </div>
      </div>
    </Link>
  );
}

