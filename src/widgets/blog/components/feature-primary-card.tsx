'use client';

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
      <div className="h-full min-h-[280px] sm:min-h-[400px] bg-[url('/images/blog/hero-section/Dot-bg.png')] bg-[#F2F2F233] rounded-2xl relative overflow-hidden cursor-pointer border-2 sm:border-4 border-white transition-all hover:shadow-sm group">
        {/* IMAGE */}
        <div className="absolute top-0 right-0 w-[60%] md:w-[53%] h-full">
          <img
            src="/images/blog/features/pencil.png"
            alt={post.frontmatter.title}
            className="w-full h-full object-contain object-right-top"
          />
        </div>

        {/* CONTENT */}
        <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 flex flex-col justify-end">
          <div className="max-w-[75%] sm:max-w-[480px]">
            <div className="mb-4">
              <span
                className="text-[10px] sm:text-[12px] font-semibold text-white uppercase px-4 py-2 rounded-sm"
                style={{ backgroundColor: badgeColor }}
              >
                {post.frontmatter.tags[0]}
              </span>
            </div>

            {/* TITLE */}
            <h1 className="text-base sm:text-2xl md:text-3xl font-semibold text-[#17171A] leading-tight line-clamp-2">
              {post.frontmatter.title}
            </h1>

            {/* META ROW: */}
            <div className="flex items-center gap-3 mt-4">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-100 overflow-hidden relative border border-white flex-shrink-0">
                <img
                  src={post.frontmatter.authorImage || 'https://picsum.photos/200'}
                  className="w-full h-full object-cover"
                  alt={post.frontmatter.author}
                />
              </div>

              <div className="flex items-center text-[10px] sm:text-[12px] font-medium" style={{ color: '#8A8C99' }}>
                <span className="truncate max-w-[80px] sm:max-w-none">{post.frontmatter.author}</span>

                <span className="mx-3 opacity-50">|</span>

                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <Clock className="w-3.5 h-3.5" stroke="currentColor" />
                  <span>{post.readingTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
