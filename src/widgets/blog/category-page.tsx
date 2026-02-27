'use client';

import BlogGrid from '@/widgets/blog/blog-Grid';
import NotFoundSearch from '@/widgets/blog/components/not-found-search';
import SearchBar from '@/widgets/blog/components/search-bar';
import type { BlogPost } from '@shared/lib/blog';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface Props {
  posts: BlogPost[];
  allPosts: BlogPost[];
  title: string;
  placeholder: string;
  color: string;
  currentCategoryId?: string;
  tags: string[];
}

export default function CategoryPageContent({ posts, allPosts, title, placeholder, color, currentCategoryId }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const isSearch = searchQuery.trim().length > 0;

  const searchedPosts = posts.filter((post) =>
    post.frontmatter.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const suggestions = allPosts.slice(0, 3).map((p) => ({
    label: p.frontmatter.highlightWord || p.frontmatter.tags[1] || p.frontmatter.tags[0],
    slug: p.slug,
  }));

  return (
    <div className="max-w-[1395px] mx-auto px-4">
      <div
        id="search-header"
        className="mt-6 flex flex-col-reverse sm:flex-row justify-between items-center gap-6 scroll-mt-10"
      >
        <div className="flex flex-col items-center sm:items-start max-w-max">
          {isSearch ? (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="bg-[#005FF2] text-white px-6 py-2 rounded-full font-medium hover:bg-blue-600 transition-colors shadow-md flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              All Blogs
            </button>
          ) : (
            <>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl text-[#17171A] font-semibold leading-tight text-center sm:text-left">
                {title}
              </h1>
              <div className="border-2 w-full mt-2 rounded-full" style={{ borderColor: color || 'black' }} />
            </>
          )}
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
      <div id="search-area" className="">
        {searchedPosts.length === 0 && <NotFoundSearch suggestions={suggestions} />}
        <BlogGrid posts={searchedPosts} currentCategoryId={currentCategoryId} />
      </div>
    </div>
  );
}
