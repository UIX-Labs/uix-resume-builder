import CategoriesSection from '@/widgets/blog/categories-section';
import { getAllPosts, getAllTags } from '@shared/lib/blog';
import { BlogGrid, BlogHero, FeaturedSection } from '@widgets/blog';
import type { Metadata } from 'next';
const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL || 'https://pikaresume.com';

export const metadata: Metadata = {
  title: 'Blog - Resume Tips, Career Advice & Job Search Strategies | Pika Resume',
  description:
    'Expert advice on resume writing, job searching, and career growth. Learn how to create ATS-friendly resumes, use AI tools, and land your dream job faster.',
  keywords: [
    'resume tips',
    'career advice',
    'job search strategies',
    'ATS resume',
    'resume writing guide',
    'AI resume builder tips',
    'professional resume',
    'career growth',
    'interview tips',
    'job application advice',
  ],
  alternates: {
    canonical: `${DOMAIN_URL}/blog`,
  },
  openGraph: {
    title: 'Blog - Resume Tips & Career Advice | Pika Resume',
    description:
      'Expert advice on resume writing, job searching, and career growth. Learn how to land your dream job faster.',
    url: `${DOMAIN_URL}/blog`,
    siteName: 'Pika Resume',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Resume Tips & Career Advice | Pika Resume',
    description: 'Expert advice on resume writing, job searching, and career growth.',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  const primaryPost = posts[0];
  const secondaryPosts = posts.slice(1, 3);
  //const remainingPosts = posts.slice(3);

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



          <div className="flex items-center justify-between mt-[35px] max-w-[1395px] mx-auto">
        {/* LEFT — BLOG COUNT */}
        <h1 className="text-4xl text-[#17171A] font-semibold pl-8">Popular Articles</h1>

        {/* RIGHT — SEARCH INPUT */}
        <input
          type="text"
          placeholder="Search blogs"
          className="w-[260px] px-2 py-2 text-base border border-gray-300 rounded-md outline-none focus:border-blue-500 mr-8"
        />
      </div>

          <div className="mt-[35px] w-full px-2">
            <FeaturedSection primaryPost={primaryPost} secondaryPosts={secondaryPosts} />
          </div>

          <div className="mt-[35px] w-full px-2">
            <CategoriesSection />
          </div>

          <div className="mt-[35px] w-full">
           <BlogGrid posts={posts} />
          </div>

          {/* <div className="mt-10">
            <BlogList posts={posts} tags={tags} />
          </div>  */}
        </div>
      </main>
    </>
  );
}
