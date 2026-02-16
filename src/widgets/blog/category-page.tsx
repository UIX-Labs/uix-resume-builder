'use client';

import BlogGrid from '@/widgets/blog/blog-Grid';
import { BlogPost } from '@shared/lib/blog';
import { Search } from 'lucide-react';
import { useState } from 'react';

interface Props {
  posts: BlogPost[];
  title: string;
  placeholder: string;
}

export default function CategoryPageContent({ posts, title, placeholder }: Props) {
  const [searchQuery, setSearchQuery] = useState('');

  const searchedPosts = posts.filter((post) =>
    post.frontmatter.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      {/* HEADER + SEARCH */}
      <div className="mt-[35px] max-w-[1395px] mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 items-start sm:items-center">
          {/* LEFT TITLE */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl text-[#17171A] font-semibold">{title}</h1>

          {/* RIGHT SEARCH */}
          <div className="relative w-full sm:w-[350px] lg:w-[400px]">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search blogs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 text-base bg-white border border-gray-200
                  rounded-3xl shadow-sm focus:outline-none focus:ring-2 
                  focus:ring-blue-500 transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* GRID */}
      <div className="mt-[35px]">
        <BlogGrid posts={searchedPosts} />
      </div>
    </>
  );
}
