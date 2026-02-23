'use client';

import type { BlogPost } from '@shared/lib/blog';
import { cn } from '@shared/lib/utils';
import { BlogCard, TagBadge } from '@shared/ui/blog';
import { Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';

interface BlogListProps {
  posts: BlogPost[];
  tags: string[];
}

export function BlogList({ posts, tags }: BlogListProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    let result = posts;

    // Filter by tags
    if (selectedTags.length > 0) {
      result = result.filter((post) => selectedTags.some((tag) => post.frontmatter.tags.includes(tag)));
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.frontmatter.title.toLowerCase().includes(query) ||
          post.frontmatter.description.toLowerCase().includes(query) ||
          post.frontmatter.tags.some((tag) => tag.toLowerCase().includes(query)),
      );
    }

    return result;
  }, [posts, selectedTags, searchQuery]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSearchQuery('');
  };

  const hasFilters = selectedTags.length > 0 || searchQuery.trim().length > 0;

  return (
    <div>
      {/* Search & Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              'w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4',
              'text-sm text-gray-900 placeholder:text-gray-400',
              'outline-none transition-all duration-200',
              'focus:border-blue-300 focus:ring-2 focus:ring-blue-100',
            )}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-500">Filter by:</span>
          {tags.map((tag) => (
            <TagBadge
              key={tag}
              tag={tag}
              size="md"
              isActive={selectedTags.includes(tag)}
              onClick={() => toggleTag(tag)}
            />
          ))}
          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="ml-2 flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              <X className="h-3 w-3" />
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      {hasFilters && (
        <p className="mb-6 text-sm text-gray-500">
          Showing {filteredPosts.length} of {posts.length} articles
        </p>
      )}

      {/* Post Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid auto-rows-fr gap-6 md:grid-cols-2">
          {filteredPosts.map((post, index) => (
            <BlogCard key={post.slug} post={post} featured={index === 0 && !hasFilters} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50/50 py-16 text-center">
          <p className="text-lg font-medium text-gray-500">No articles found</p>
          <p className="mt-1 text-sm text-gray-400">Try adjusting your search or filters</p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
