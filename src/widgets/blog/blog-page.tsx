'use client';

import { BlogPost } from '@shared/lib/blog';
import { BlogGrid, BlogHero, FeaturedSection } from '@widgets/blog';
import { useState } from 'react';
import CategoriesSection from './categories-section';
import SearchBar from './components/search-bar';

export default function BlogPageContent({ posts, tags }: { posts: BlogPost[]; tags: string[] }) {
  const [searchQuery, setSearchQuery] = useState('');

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
    <>
      <main className="min-h-screen max-w-[1395px] mx-auto">
        <div className="w-full p-2">
          <BlogHero
            image="/images/blog/hero-section/hero-section-img.png"
            description="Blogs to power up your resume, job search, and career growth."
            breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Blogs' }]}
          >
            <span className="text-3xl sm:text-4xl lg:text-[63px] font-semibold">
              The <span className="text-[#005FF2] font-bold">Pika Journal</span>
            </span>
          </BlogHero>

          <div className="flex flex-col-reverse sm:flex-row justify-between items-center mt-8 gap-4 px-4">
            <div className="flex flex-col items-center sm:items-start max-w-max">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl text-[#17171A] font-semibold leading-tight">
                Popular Articles
              </h1>
              <div className="border-2 w-full mt-2 rounded-full" style={{ borderColor: '#005FF2' }} />
            </div>

            <div className="w-full sm:flex-1 flex justify-center sm:justify-end">
              <SearchBar setSearchQuery={setSearchQuery} searchQuery={searchQuery} placeholder="Search Article" />
            </div>
          </div>

          <div className="mt-4 md:mt-10">
            <FeaturedSection primaryPost={primaryPost} secondaryPosts={secondaryPosts} />
          </div>

          <div className="mt-6 md:mt-10">
            <CategoriesSection />
          </div>

          <div className="mt-6 md:mt-10 mb-2 md:mb-4">
            <BlogGrid posts={filteredPosts} />
          </div>
        </div>
      </main>
    </>
  );
}
