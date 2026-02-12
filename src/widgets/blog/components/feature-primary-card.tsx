import { Clock } from 'lucide-react';

import { BlogPost } from '@/shared/lib/blog';
import Link from 'next/link';

interface FeaturedPrimaryCardProps {
  post: BlogPost;
}

export default function FeaturedPrimaryCard({ post }: FeaturedPrimaryCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="h-full bg-[url('/images/blog/hero-section/Dot-bg.png')] rounded-2xl relative overflow-hidden cursor-pointer">
        {/* Right Image */}
        <div className="absolute top-0 right-0 w-[50%] md:w-[60%] h-full">
          <img
            src={post.frontmatter.coverImage || '/images/blog/features/pencil.png'}
            alt={post.frontmatter.title}
            className="object-contain object-right-top"
          />
        </div>

        {/* Content */}
        <div className="absolute inset-y-0 left-0 flex flex-col justify-end ml-7 mb-4">
          <div>
            <span className="text-xs font-semibold text-white uppercase bg-orange-500 px-2 py-1 rounded-md">
              {post.frontmatter.tags?.[0]}
            </span>

            <h1 className="text-2xl font-semibold mt-4 max-w-[400px]">{post.frontmatter.title}</h1>

            <div className="flex items-center gap-3 mt-4">
              <img
                src="https://picsum.photos/200"
                className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                alt={post.frontmatter.author}
              />

              <div className="flex flex-row gap-2 items-center">
                <span className="text-sm font-medium text-gray-700">{post.frontmatter.author}</span>

                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-md text-gray-500 font-medium">{post.readingTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
