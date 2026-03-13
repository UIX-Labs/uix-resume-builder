'use client';

import type { BlogPost } from '@/shared/lib/blog';
import { BlogGrid, BlogHero, FeaturedSection } from '@widgets/blog';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import CategoriesSection from './categories-section';
import NotFoundSearch from './components/not-found-search';
import SearchBar from './components/search-bar';
import { suggestions } from './suggestions';

export default function BlogPageContent({ posts, tags: _tags }: { posts: BlogPost[]; tags: string[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const isSearch = searchQuery.trim().length > 0;

  const filteredPosts = posts.filter((post) =>
    post.frontmatter.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const primaryPost = posts.find((p) => p.frontmatter.featured === 'primary') || posts[0];
  const secondary1 = posts.find((p) => p.frontmatter.featured === 'secondary1');
  const secondary2 = posts.find((p) => p.frontmatter.featured === 'secondary2');

  const secondaryPosts = [secondary1, secondary2].filter((p): p is BlogPost => !!p);

  // Fallback if secondary posts are not explicitly defined
  if (secondaryPosts.length === 0) {
    secondaryPosts.push(...posts.filter((p) => p.slug !== primaryPost.slug).slice(0, 2));
  }

 

  return (
    <main className="min-h-screen max-w-[1395px] mx-auto p-2">
      <div className="w-full">
        <BlogHero
          image="/images/blog/hero-section-img.svg"
          description="Blogs to power up your resume, job search, and career growth."
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Blogs' }]}
        >
          <span className="text-3xl sm:text-4xl lg:text-[63px] font-semibold">
            The <span className="text-[#005FF2] font-bold">Pika Journal</span>
          </span>
        </BlogHero>

        <div
          id="search-header"
          className={`flex flex-col-reverse sm:flex-row justify-between items-center gap-4 px-4 pb-4 transition-all duration-300 scroll-mt-2
              ${isSearch ? 'pt-4' : 'mt-8'}`}
        >
          <div className="flex flex-col items-center sm:items-start max-w-max">
            {isSearch ? (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="bg-[#005FF2] text-white px-6 py-2 rounded-full font-medium hover:bg-blue-600 transition-colors shadow-md flex items-center gap-2 scroll-mt-2"
              >
                <ArrowLeft className="w-4 h-4" />
                All Blogs
              </button>
            ) : (
              <>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl text-[#17171A] font-semibold leading-tight">
                  Popular Articles
                </h1>
                <div className="border-2 w-full mt-2 rounded-full" style={{ borderColor: '#005FF2' }} />
              </>
            )}
          </div>

          <div className="w-full sm:flex-1 flex justify-center sm:justify-end scroll-mt-10">
            <SearchBar
              setSearchQuery={setSearchQuery}
              searchQuery={searchQuery}
              placeholder="Search Article"
              scrollToResults
            />
          </div>
        </div>

        {!isSearch && (
          <div className="mt-4 md:mt-10">
            <FeaturedSection primaryPost={primaryPost} secondaryPosts={secondaryPosts} />
          </div>
        )}

        {!isSearch && (
          <div className="mt-6 md:mt-10">
            <CategoriesSection />
          </div>
        )}

        <div id="search-area">
          {searchQuery.trim() !== '' && filteredPosts.length === 0 ? (
            <NotFoundSearch suggestions={suggestions} />
          ) : (
            <div className="mt-6 md:mt-10">
              <BlogGrid posts={filteredPosts} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
