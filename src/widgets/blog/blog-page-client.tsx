'use client';

import { BlogPost } from '@shared/lib/blog';
import { BlogGrid, BlogHero, FeaturedSection } from '@widgets/blog';
import { Search } from 'lucide-react';
import { useState } from 'react';
import CategoriesSection from './categories-section';

export default function BlogPageClient({ posts, tags }: { posts: BlogPost[]; tags: string[] }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter((post) =>
    post.frontmatter.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const primaryPost = posts[0];
  const secondaryPosts = posts.slice(1, 3);

  return (
    <>
      <main className="min-h-screen">
        <div className="w-full p-2">
          <BlogHero
            image="/images/blog/hero-section/hero-section.png"
            description="Blogs to power up your resume, job search, and career growth."
          >
            <span className="text-3xl sm:text-4xl lg:text-[63px] font-semibold">
              The <span className="text-blue-600 font-bold">Pika Journal</span>
            </span>
          </BlogHero>

          <div className="flex flex-row sm:flex-row justify-between items-center gap-6 m-6 sm:m-10">
            <div className="text-2xl md:text-3xl lg:text-4xl font-semibold">
              <p>Popular Articles</p>
            </div>

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

          <div className="mt-[35px] w-full px-2">
            <FeaturedSection primaryPost={primaryPost} secondaryPosts={secondaryPosts} />
          </div>

          <div className="mt-[35px] w-full px-2 ">
            <CategoriesSection />
          </div>

          <div className="mt-[35px]">
            <BlogGrid posts={filteredPosts} />
          </div>
        </div>
      </main>
    </>
  );
}
