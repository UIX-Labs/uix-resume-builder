'use client';

import BlogGrid from '@/widgets/blog/blog-Grid';
import NotFoundSearch from '@/widgets/blog/components/not-found-search';
import SearchBar from '@/widgets/blog/components/search-bar';
import type { BlogPost } from '@shared/lib/blog';
import { useState } from 'react';

interface Props {
  posts: BlogPost[];
  title: string;
  placeholder: string;
  color: string;
  currentCategoryId?: string;
  tags: string[];
}

export default function CategoryPageContent({ posts, title, placeholder, color, currentCategoryId, tags }: Props) {
  const [searchQuery, setSearchQuery] = useState('');

  const searchedPosts = posts.filter((post) =>
    post.frontmatter.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="max-w-[1395px] mx-auto px-4">
      <div className="mt-6 flex flex-col-reverse sm:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center sm:items-start max-w-max">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl text-[#17171A] font-semibold leading-tight text-center sm:text-left">
            {title}
          </h1>
          <div className="border-2 w-full mt-2 rounded-full" style={{ borderColor: color || 'black' }} />
        </div>

        <div className="w-full sm:flex-1 flex justify-center sm:justify-end">
          <SearchBar
            setSearchQuery={setSearchQuery}
            placeholder={placeholder}
            searchQuery={searchQuery}
            scrollToResults
          />
        </div>
      </div>

      {/* GRID */}
      <div id="blog-grid" className="mt-10">
        {searchedPosts.length === 0 && <NotFoundSearch tags={tags} />}
        <BlogGrid posts={searchedPosts} currentCategoryId={currentCategoryId} />
      </div>
    </div>
  );
}
