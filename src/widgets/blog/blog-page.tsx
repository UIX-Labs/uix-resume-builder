'use client';

import { BlogPost } from '@shared/lib/blog';
import { BlogGrid, BlogHero, FeaturedSection } from '@widgets/blog';
import { Search } from 'lucide-react';
import { useState } from 'react';
import CategoriesSection from './categories-section';

export default function BlogPageContent({ posts, tags }: { posts: BlogPost[]; tags: string[] }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter((post) =>
    post.frontmatter.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const primaryPost = posts[0];
  const secondaryPosts = posts.slice(1, 3);

  return (
    <>
      <main className="min-h-screen">
        <div className="w-full p-2 md:p-5">
          <BlogHero
            image="/images/blog/hero-section/hero-section.png"
            description="Blogs to power up your resume, job search, and career growth."
          >
            <span className="text-3xl sm:text-4xl lg:text-[63px] font-semibold">
              The <span className="text-[#005FF2] font-bold">Pika Journal</span>
            </span>
          </BlogHero>

          <div className="flex flex-row justify-between items-center gap-2 sm:gap-4 mt-6 sm:mt-10 px-2 sm:px-0">
            <div className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold whitespace-nowrap sm:ml-8">
              <p>Popular Articles</p>
            </div>

            <div className="relative w-[150px] xs:w-[200px] sm:w-[350px] lg:w-[450px] sm:mr-2">
              <div className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              </div>

              <input
                type="text"
                placeholder="Search Articles"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full 
                pl-4 sm:pl-5   
                pr-9 sm:pr-11  
                py-2 sm:py-3 
                text-sm sm:text-base 
                bg-white border border-gray-200
                rounded-3xl shadow-sm focus:outline-none focus:ring-2 
                focus:ring-blue-500 transition-all duration-200"
              />
            </div>
          </div>

          <div className="mt-8 sm:mt-10">
            <FeaturedSection primaryPost={primaryPost} secondaryPosts={secondaryPosts} />
          </div>

          <div className="mt-8 sm:mt-10">
            <CategoriesSection />
          </div>

          <div className="mt-8 sm:mt-10 mb-10">
            <BlogGrid posts={filteredPosts} />
          </div>
        </div>
      </main>
    </>
  );
}
