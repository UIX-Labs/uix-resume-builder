import { getAllPosts, getAllTags } from '@/shared/lib/blog';
import BlogPageContent from '@/widgets/blog/blog-page';
import type { Metadata } from 'next';
import Script from 'next/script';

const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL || 'https://pikaresume.com';
const LOGO_URL = 'https://res.cloudinary.com/dvrzhxhmr/image/upload/v1765530541/Pika-Resume-logo_tkkeon.webp';

export const metadata: Metadata = {
  title: 'Blog - Resume Tips, Career Advice & Job Search Strategies',
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

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Blog - Resume Tips, Career Advice & Job Search Strategies',
    description:
      'Expert advice on resume writing, job searching, and career growth. Learn how to create ATS-friendly resumes, use AI tools, and land your dream job faster.',
    url: `${DOMAIN_URL}/blog`,
    publisher: {
      '@type': 'Organization',
      name: 'Pika Resume',
      url: DOMAIN_URL,
      logo: {
        '@type': 'ImageObject',
        url: LOGO_URL,
      },
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${DOMAIN_URL}/blog/${post.slug}`,
        name: post.frontmatter.title,
      })),
    },
  };

  return (
    <>
      <Script
        id="blog-collection-structured-data"
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for SEO structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <BlogPageContent posts={posts} tags={tags} />
    </>
  );
}
