import { RESUME_EXAMPLE_CATEGORIES } from '@/data/resume-example-categories';
import { ResumeExamplesGallery } from '@widgets/resume-examples/ui/resume-examples-gallery';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';

const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL || 'https://pikaresume.com';

export async function generateStaticParams() {
  return RESUME_EXAMPLE_CATEGORIES.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const cat = RESUME_EXAMPLE_CATEGORIES.find((c) => c.slug === category);
  if (!cat) return { title: 'Not Found' };

  const url = `${DOMAIN_URL}/resume-examples/${category}`;

  return {
    title: cat.metaTitle,
    description: cat.metaDescription,
    keywords: cat.metaKeywords,
    alternates: { canonical: url },
    openGraph: {
      title: cat.metaTitle,
      description: cat.metaDescription,
      url,
      siteName: 'Pika Resume',
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: cat.metaTitle,
      description: cat.metaDescription,
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = RESUME_EXAMPLE_CATEGORIES.find((c) => c.slug === category);

  if (!cat) {
    notFound();
  }

  return (
    <>
      <Script
        id={`category-${category}-structured-data`}
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for SEO structured data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: cat.heroHeading,
              description: cat.metaDescription,
              url: `${DOMAIN_URL}/resume-examples/${category}`,
              provider: {
                '@type': 'Organization',
                name: 'Pika Resume',
                url: DOMAIN_URL,
              },
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: DOMAIN_URL,
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Resume Examples',
                  item: `${DOMAIN_URL}/resume-examples`,
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: cat.name,
                  item: `${DOMAIN_URL}/resume-examples/${category}`,
                },
              ],
            },
          ]),
        }}
      />
      <ResumeExamplesGallery initialCategory={category} categoryData={cat} />
    </>
  );
}
