'use client';

import { BlogPost } from '@/shared/lib/blog';
import { Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface FeaturedSecondaryCardProps {
  post: BlogPost;
  featureImage: string;
  badgeColor: string;
}

export default function FeaturedSecondaryCard({ post, featureImage, badgeColor }: FeaturedSecondaryCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div
        className="flex flex-row min-h-[160px] sm:min-h-[220px] items-stretch 
      bg-[url('/images/blog/hero-section/Dot-bg.png')] bg-[#F2F2F233] 
      rounded-2xl border-2 sm:border-4 border-white relative overflow-hidden group"
      >
        {/* LEFT IMAGE - Fixed ratio for mobile, 1/3 for desktop */}
        <div className="w-[130px] sm:w-1/3 shrink-0 relative">
          <Image
            src={featureImage}
            alt="feature"
            fill
            className="object-cover"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 flex flex-col justify-center gap-1 sm:gap-3 p-3 sm:p-4">
          {/* BADGE */}
          <div>
            <span
              className="text-[10px] sm:text-sm font-semibold text-white uppercase px-2 sm:px-4 py-0.5 sm:py-1 rounded-md"
              style={{ backgroundColor: badgeColor }}
            >
              {post.frontmatter.tags[0]}
            </span>
          </div>

          {/* TITLE */}
          <h3 className="text-sm sm:text-base md:text-xl font-semibold mt-1 sm:mt-2 leading-tight text-[#0B0A09] line-clamp-2">
            {post.frontmatter.title}
          </h3>

          {/* META */}
          <div className="flex items-center gap-2 mt-2 sm:mt-3 text-[10px] md:text-[13px] text-[#4B5563] font-medium">
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gray-200 overflow-hidden relative border border-gray-100">
              <Image
                src={post.frontmatter.coverImage || '/images/blog/features/Group 119.png'}
                alt="avatar"
                fill
                className="object-cover"
              />
            </div>

            <span className="truncate max-w-[60px] sm:max-w-none">
                {post.frontmatter.author}
            </span>

            <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />

            <span className="whitespace-nowrap">{post.readingTime}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}