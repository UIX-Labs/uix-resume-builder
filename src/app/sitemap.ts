import { categories } from '@/data/categories';
// WIP - Resume example categories hidden temporarily
// import { RESUME_EXAMPLE_CATEGORIES } from '@/data/resume-example-categories';
import { getAllPosts } from '@shared/lib/blog';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN_URL || 'https://pikaresume.com';

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/roast`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/upload-resume`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/expert-review`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/templates`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // WIP - Pricing URL hidden temporarily
    // {
    //   url: `${baseUrl}/pricing`,
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 0.8,
    // },
  ];

  // Blog pages
  const blogListPage: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  const blogPosts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/blog/categories/${category.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // WIP - Resume examples sitemap entries hidden temporarily
  // const resumeExamplesPages: MetadataRoute.Sitemap = [
  //   {
  //     url: `${baseUrl}/resume-examples`,
  //     lastModified: new Date(),
  //     changeFrequency: 'weekly',
  //     priority: 0.8,
  //   },
  // ];

  // const resumeExampleCategoryPages: MetadataRoute.Sitemap = RESUME_EXAMPLE_CATEGORIES.map((category) => ({
  //   url: `${baseUrl}/resume-examples/${category.slug}`,
  //   lastModified: new Date(),
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.7,
  // }));

  return [
    ...staticPages,
    ...blogListPage,
    ...categoryPages,
    ...blogPosts,
    // WIP - Resume examples spread hidden temporarily
    // ...resumeExamplesPages,
    // ...resumeExampleCategoryPages,
  ];
}
