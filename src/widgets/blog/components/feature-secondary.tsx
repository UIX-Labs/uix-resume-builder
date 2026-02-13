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
        className="flex flex-col sm:flex-row min-h-[200px] items-center gap-4 px-4 md:pr-8 md:pl-0 md:gap-8 
      bg-[url('/images/blog/hero-section/Dot-bg.png')] bg-[#F2F2F233] 
      rounded-2xl border-4 border-white relative overflow-hidden group"
      >
        {/* LEFT IMAGE */}
        <div className="relative w-full sm:w-1/3 aspect-[4/3] h-[200px]">
          <Image src={featureImage} alt="feature" fill className="object-cover sm:object-left h-full w-full" />
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 flex flex-col justify-center gap-3">
          {/* BADGE */}
          <div>
            <span
              className="text-sm font-semibold text-white uppercase px-4 py-1 rounded-md"
              style={{ backgroundColor: badgeColor }}>
              {post.frontmatter.tags[0]}
            </span>
          </div>

          {/* TITLE */}
          <h3 className="text-base md:text-xl font-bold mt-2 leading-tight text-[#0B0A09]">{post.frontmatter.title}</h3>

          {/* META */}
          <div className="flex items-center gap-2 mt-3 text-[12px] md:text-[13px] text-[#4B5563] font-medium">
            <div className="w-5 h-5 rounded-full bg-gray-200 overflow-hidden relative border border-gray-100">
              <Image
                src={post.frontmatter.coverImage || '/images/blog/features/Group 119.png'}
                alt="avatar"
                fill
                className="object-cover"
              />
            </div>

            <span className="truncate">{post.frontmatter.author}</span>

            <Clock className="w-4 h-4 text-gray-500" />

            <span className="whitespace-nowrap">{post.readingTime}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
