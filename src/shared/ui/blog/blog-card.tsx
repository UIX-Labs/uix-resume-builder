'use client';

import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { cn } from '@shared/lib/utils';
import { TagBadge } from './tag-badge';
import type { BlogPost } from '@shared/lib/blog';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const { slug, frontmatter, readingTime } = post;

  return (
    <Link href={`/blog/${slug}`} className="group block h-full">
      <article
        className={cn(
          'relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300',
          'hover:border-gray-300 hover:shadow-lg hover:shadow-gray-100/50',
          'hover:-translate-y-1',
          featured && 'md:col-span-2',
        )}
      >
        {/* Cover Image */}
        {frontmatter.coverImage && (
          <div className={cn('relative shrink-0 overflow-hidden bg-gray-100', featured ? 'h-64 md:h-80' : 'h-48')}>
            <img
              src={frontmatter.coverImage}
              alt={frontmatter.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        )}

        {/* Content — takes remaining space and pushes meta to bottom */}
        <div className={cn('flex flex-1 flex-col p-5', featured && 'md:p-7')}>
          {/* Tags */}
          <div className="mb-3 flex flex-wrap gap-2">
            {frontmatter.tags.slice(0, 3).map((tag) => (
              <TagBadge key={tag} tag={tag} size="sm" />
            ))}
          </div>

          {/* Title — fixed height via line-clamp */}
          <h2
            className={cn(
              'font-semibold leading-snug text-gray-900 transition-colors group-hover:text-blue-700',
              featured ? 'text-2xl md:text-3xl line-clamp-3' : 'text-lg line-clamp-2',
            )}
          >
            {frontmatter.title}
          </h2>

          {/* Description — fixed height via line-clamp */}
          <p
            className={cn(
              'mt-2 leading-relaxed text-gray-600',
              featured ? 'text-base line-clamp-3' : 'text-sm line-clamp-2',
            )}
          >
            {frontmatter.description}
          </p>

          {/* Spacer pushes meta to bottom */}
          <div className="mt-auto" />

          {/* Meta — always pinned to bottom */}
          <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(frontmatter.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {readingTime}
              </span>
            </div>

            <span className="flex items-center gap-1 text-sm font-medium text-blue-600 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2">
              Read more
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
