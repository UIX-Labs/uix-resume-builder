import { categories } from '@/data/categories';
import BlogHero from '@/widgets/blog/components/blog-hero';
import { getAllPosts, getAllTags } from '@shared/lib/blog';
import CategoryPageContent from '@widgets/blog/category-page';
import NotFoundPage from '@widgets/blog/slug/not-found-page';
import type { Metadata } from 'next';
import Script from 'next/script';

const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL || 'https://pikaresume.com';
const LOGO_URL = 'https://res.cloudinary.com/dvrzhxhmr/image/upload/v1765530541/Pika-Resume-logo_tkkeon.webp';

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  resume: [
    'resume tips',
    'resume writing',
    'ATS resume',
    'resume format',
    'professional resume',
    'resume builder tips',
    'resume examples',
  ],
  interview: [
    'interview tips',
    'job interview',
    'interview preparation',
    'interview questions',
    'behavioral interview',
    'technical interview',
  ],
  career: [
    'career advice',
    'career growth',
    'career change',
    'professional development',
    'salary negotiation',
    'career planning',
  ],
  'cover-letter': [
    'cover letter tips',
    'cover letter examples',
    'cover letter writing',
    'cover letter format',
    'professional cover letter',
    'application letter',
  ],
  job: ['job search', 'job application', 'job hunting tips', 'find a job', 'job search strategies', 'employment tips'],
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    id: category.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const category = categories.find((c) => c.id === id);
  if (!category) return { title: 'Category Not Found' };

  const url = `${DOMAIN_URL}/blog/categories/${id}`;
  const title = `${category.title} ${category.hero.suffix} - Blog`;

  return {
    title,
    description: category.hero.description,
    keywords: CATEGORY_KEYWORDS[id] || [
      `${category.title.toLowerCase()} tips`,
      `${category.title.toLowerCase()} advice`,
    ],
    alternates: { canonical: url },
    openGraph: {
      title,
      description: category.hero.description,
      url,
      siteName: 'Pika Resume',
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: category.hero.description,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { id } = await params;
  const category = categories.find((c) => c.id === id);

  if (!category) {
    return <p>Category not found</p>;
  }

  const allPosts = getAllPosts();

  const tags = getAllTags();

  // const filteredPosts = allPosts.filter((post) =>
  //   post.frontmatter.tags.some((tag) => {
  //     const normalizedTag = tag.toLowerCase().replace(/[^a-z0-9]/g, '-');
  //     const normalizedId = id.toLowerCase().replace(/[^a-z0-9]/g, '-');
  //     return normalizedTag === normalizedId || normalizedTag.startsWith(`${normalizedId}-`);
  //   }),
  // );

  const filteredPosts = allPosts.filter((post) =>
    post.frontmatter.tags.some((tag) => {
      const normalizedTag = tag.replace(/[^a-z0-9]/g, '-');
      const normalizedId = id.toLowerCase().replace(/[^a-z0-9]/g, '-');
      return (
        normalizedTag === normalizedId || normalizedTag === `${normalizedId}s` || `${normalizedTag}s` === normalizedId
      );
    }),
  );

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.title} ${category.hero.suffix} - Pika Resume Blog`,
    description: category.hero.description,
    url: `${DOMAIN_URL}/blog/categories/${id}`,
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
      numberOfItems: filteredPosts.length,
      itemListElement: filteredPosts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${DOMAIN_URL}/blog/${post.slug}`,
        name: post.frontmatter.title,
      })),
    },
  };

  return (
    <div className="max-w-[1395px] mx-auto p-2">
      <Script
        id="category-collection-structured-data"
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for SEO structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      {/* HERO */}
      <BlogHero
        description={category.hero.description}
        image={category.hero.image}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Blogs', href: '/blog' }, { label: category.title }]}
      >
        {/* Same classes as "The Pika Journal" */}
        <span className="text-3xl sm:text-4xl lg:text-[63px] font-semibold">
          <span style={{ color: category.color }}>{category.title}</span>{' '}
          <span className="text-black">{category.hero.suffix}</span>
        </span>
      </BlogHero>

      {/* CLIENT PART */}
      {filteredPosts.length > 0 ? (
        <CategoryPageContent
          posts={filteredPosts}
          allPosts={allPosts}
          title={`Collection of ${filteredPosts.length}+ ${filteredPosts.length === 1 ? 'blog' : 'blogs'}`}
          placeholder="Type Something"
          color={category.color}
          currentCategoryId={id}
          tags={tags}
        />
      ) : (
        <div>
          <NotFoundPage />
        </div>
      )}
    </div>
  );
}
