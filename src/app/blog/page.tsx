import { getAllPosts, getAllTags } from '@/shared/lib/blog';
import BlogPageContent from '@/widgets/blog/blog-page';
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
  return <BlogPageContent posts={posts} tags={tags} />;
}
