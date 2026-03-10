'use client';

import type { BlogPost } from '@/shared/lib/blog';
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
        className="flex flex-row min-h-[150px] sm:min-h-[200px] items-stretch 
      bg-[url('/images/blog/hero-section/Dot-bg.png')] bg-[#F2F2F233] 
      rounded-2xl border-2 sm:border-4 border-white relative overflow-hidden group transition-all hover:shadow-sm"
      >
        <div className="w-[120px] sm:w-[35%] shrink-0 relative">
          <Image
            src={featureImage}
            alt="feature"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 120px, 35vw"
          />
        </div>

        <div className="flex-1 flex flex-col justify-center gap-1 sm:gap-2 p-3 sm:p-5">
          <div>
            <span
              className="text-[10px] sm:text-[12px] font-semibold text-white uppercase px-3 py-1 rounded-sm"
              style={{ backgroundColor: badgeColor }}
            >
              {post.frontmatter.tags[0]}
            </span>
          </div>

          <h3 className="text-md sm:text-xl font-semibold mt-1 leading-tight text-[#17171A] line-clamp-2">
            {post.frontmatter.title}
          </h3>

          <div className="flex items-center gap-3 mt-4">
            <img
              src={post.frontmatter.authorImage || 'https://res.cloudinary.com/dvrzhxhmr/image/upload/v1765530541/Pika-Resume-logo_tkkeon.webp'}
              className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover border border-white flex-shrink-0 shadow-sm"
              alt={post.frontmatter.author}
            />

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
    </Link>
  );
}
