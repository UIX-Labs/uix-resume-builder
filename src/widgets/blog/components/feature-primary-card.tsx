import { BlogPost } from '@/shared/lib/blog';
import { Clock } from 'lucide-react';
import Link from 'next/link';

interface FeaturedPrimaryCardProps {
  post: BlogPost;
  badgeColor: string;
}

export default function FeaturedPrimaryCard({ post, badgeColor }: FeaturedPrimaryCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="h-full min-h-[250px] sm:min-h-[400px] bg-[url('/images/blog/hero-section/Dot-bg.png')] bg-[#F2F2F233] rounded-2xl relative overflow-hidden cursor-pointer border-4 border-white">
        
        {/* Right Image - Edge to Edge Top Right */}
        <div className="absolute top-0 right-0 w-[60%] md:w-[60%]">
          <img
            src={post.frontmatter.coverImage || '/images/blog/features/pencil.png'}
            alt={post.frontmatter.title}
            className="w-full h-full object-contain object-right-top"
          />
        </div>

        {/* Content - Bottom Left */}
        <div className="absolute bottom-0 left-0 w-full p-3 sm:p-10 flex flex-col justify-end">
          <div className="max-w-[65%] sm:max-w-[450px]">
            {/* BADGE */}
            <span
              className="text-[10px] sm:text-sm font-semibold text-white uppercase px-3 py-1 rounded-md inline-block"
              style={{ backgroundColor: badgeColor }}
            >
              {post.frontmatter.tags?.[0]}
            </span>

            {/* TITLE - Strictly 2 lines & Responsive Font */}
            <h1 className="text-md sm:text-2xl md:text-3xl font-semibold mt-2 sm:mt-4 text-[#0B0A09] leading-tight line-clamp-2">
              {post.frontmatter.title}
            </h1>

            {/* META */}
            <div className="flex items-center gap-2 sm:gap-3 mt-3 sm:mt-4">
              <img
                src="https://picsum.photos/200"
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white shadow-sm object-cover"
                alt={post.frontmatter.author}
              />

              <div className="flex flex-row gap-2 items-center">
                <span className="text-[11px] sm:text-sm font-medium text-gray-700 truncate max-w-[70px] sm:max-w-none">
                    {post.frontmatter.author}
                </span>

                <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                <span className="text-[11px] sm:text-md text-gray-500 font-medium whitespace-nowrap">
                    {post.readingTime}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
