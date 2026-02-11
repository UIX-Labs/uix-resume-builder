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

  return (
    <>
      <main className="min-h-screen">
        <div className="w-full">
          <BlogHero
            image="/images/blog/hero-section/hero-section.png"
            description="Blogs to power up your resume, job search, and career growth."
          >
            <span className="text-3xl sm:text-4xl lg:text-[63px] font-semibold">
              The <span className="text-blue-600 font-bold">Pika Journal</span>
            </span>
          </BlogHero>


          <div className="mt-[35px] w-full px-2">
            <FeaturedSection />
          </div>

          <div className="mt-[35px] w-full px-2">
            <CategoriesSection />
          </div>

          <div className="mt-[35px] w-full">
            <BlogGrid />
          </div>

          {/* <div className="mt-10">
            <BlogList posts={posts} tags={tags} />
          </div> */}
        </div>
      </main>
    </>
  );
}
