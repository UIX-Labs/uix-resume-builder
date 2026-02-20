import { categories } from '@/data/categories';
import ArticleHeader, { type BreadcrumbItem } from '@/widgets/blog/slug/article-header';
import { TableOfContents } from '@/widgets/blog/slug/table-of-content';
import { extractHeadings, getAllPosts, getAllSlugs, getPostBySlug } from '@shared/lib/blog';
import { mdxComponents } from '@shared/ui/blog/mdx-components';
import { BlogGrid } from '@widgets/blog';
import BlogCreateResume from '@widgets/blog/slug/blog-create-resume';
import JDCTACard from '@widgets/blog/slug/jd-cta-card';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL || 'https://pikaresume.com';

/* ------------------------------------------------------------------ */
/*  Static params                                                      */
/* ------------------------------------------------------------------ */

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };

  const { frontmatter } = post;
  const url = `${DOMAIN_URL}/blog/${slug}`;

  return {
    title: `${frontmatter.title} | Pika Resume Blog`,
    description: frontmatter.description,
    keywords: frontmatter.tags,
    authors: [{ name: frontmatter.author }],
    alternates: { canonical: url },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url,
      siteName: 'Pika Resume',
      type: 'article',
      publishedTime: frontmatter.date,
      authors: [frontmatter.author],
      tags: frontmatter.tags,
      locale: 'en_US',
      ...(frontmatter.coverImage && {
        images: [
          {
            url: frontmatter.coverImage,
            width: 1200,
            height: 630,
            alt: frontmatter.title,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description,
      ...(frontmatter.coverImage && {
        images: [frontmatter.coverImage],
      }),
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Helper                                                             */
/* ------------------------------------------------------------------ */
function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { frontmatter, content, readingTime } = post;
  const headings = extractHeadings(content);

  // Find related posts (same tags, excluding current)
  const allPosts = getAllPosts();

  // Article structured data
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    dateModified: frontmatter.date,
    author: {
      '@type': 'Person',
      name: frontmatter.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Pika Resume',
      url: DOMAIN_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${DOMAIN_URL}/blog/${slug}`,
    },
    keywords: frontmatter.tags.join(', '),
    ...(frontmatter.coverImage && {
      image: frontmatter.coverImage,
    }),
  };

  const categoryTag = frontmatter.tags?.[0]?.toLowerCase();
  const categoryInfo = categories.find((c) => c.id === categoryTag);
  const categoryLabel = categoryInfo ? categoryInfo.title : categoryTag;

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Blogs', href: '/blog' },
    ...(categoryTag
      ? [
          {
            label: categoryLabel,
            href: `/blog/categories/${categoryTag}`,
          },
        ]
      : []),
    {
      label: frontmatter.title,
    },
  ];

  return (
    <>
      <Script
        id="article-structured-data"
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for SEO structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="mx-auto px-3 py-6 sm:px-6 max-w-[1395px]">
        {/* Back link */}
        {/* <Link
          href="/blog"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all articles
        </Link> */}

        {/* Article header */}
        {/*   <header className="mb-10">

          <div className="mb-4 flex flex-wrap gap-2">
            {frontmatter.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} size="md" />
            ))}
          </div>


          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            {frontmatter.title}
          </h1>


          <p className="mt-4 text-lg leading-relaxed text-gray-600">{frontmatter.description}</p>


          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-gray-100 py-4">
            <div className="flex flex-wrap items-center gap-5 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                <span className="font-medium text-gray-700">{frontmatter.author}</span>
                {frontmatter.authorRole && <span className="text-gray-400">&middot; {frontmatter.authorRole}</span>}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(frontmatter.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {readingTime}
              </span>
            </div>

            <ShareButton title={frontmatter.title} url={`${DOMAIN_URL}/blog/${slug}`} />
          </div>
        </header>
        */}
        <ArticleHeader
          title={frontmatter.title}
          description={frontmatter.description}
          author={frontmatter.author}
          authorRole={frontmatter.authorRole}
          date={formatDate(frontmatter.date)}
          readingTime={readingTime}
          tags={frontmatter.tags}
          highlightWord={frontmatter.highlightWord}
          breadcrumbs={breadcrumbs}
        />

        {/* Content + Sidebar */}

        <div className="flex gap-10 lg:gap-14 flex-col lg:flex-row">
          {/* Sidebar - TOC */}
          {headings.length > 0 && (
            <aside className="lg:block shrink-0 w-full md:w-[320px] lg:w-[400px]">
              <div className="block sticky top-5">
                <div className="hidden lg:block">
                  <TableOfContents headings={headings} />
                </div>
                <div className="hidden md:block mt-10">
                  <JDCTACard />
                </div>
              </div>
            </aside>
          )}
          {/* Main content */}
          <div className="min-w-0 flex-1">
            <div className="relative">
              {/* Mobile sticky */}
              <div className="bg-[#F2F3F9] lg:hidden sticky top-0  z-50 pb-4">
                <div className="lg:hidden sticky top-0 bg-[#F5F5F7] z-50">
                  <TableOfContents headings={headings} />
                </div>
              </div>

              <div
                className="prose prose-lg prose-gray prose-headings:scroll-mt-24
                 prose-a:text-black prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl 
                 prose-pre:bg-gray-950 prose-pre:text-gray-100 prose-strong:text-blue-500
                    prose-a:text-blue-500w-full
                    prose-table:mx-auto
                    prose-table:w-full
                    prose-th:text-center
                    prose-td:text-center
                    prose-th:px-4
                    prose-td:px-4
                    prose-th:py-3
                    prose-td:py-3"
              >
                <MDXRemote
                  source={content}
                  components={mdxComponents}
                  options={{
                    mdxOptions: {
                      remarkPlugins: [remarkGfm],
                      rehypePlugins: [
                        rehypeSlug,
                        [rehypeAutolinkHeadings, { behavior: 'wrap', properties: { className: 'no-underline' } }],
                      ],
                    },
                  }}
                />
              </div>
            </div>
            <BlogCreateResume />
          </div>
        </div>

        {/* Related Posts */}
        {/* {relatedPosts.length > 0 && (
          <section className="mt-16 border-t border-gray-100 pt-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Related Articles</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group rounded-xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:border-gray-300 hover:shadow-md"
                >
                  <div className="mb-2 flex flex-wrap gap-1.5">
                    {related.frontmatter.tags.slice(0, 2).map((tag) => (
                      <TagBadge key={tag} tag={tag} size="sm" />
                    ))}
                  </div>
                  <h3 className="font-semibold text-gray-900 transition-colors group-hover:text-blue-700">
                    {related.frontmatter.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-gray-500">{related.frontmatter.description}</p>
                </Link>
              ))}
            </div>
          </section> */}

        {/* )} */}
        <div className="mt-10 lg:p-4 lg:mt-25 gap-2 md:gap-8 bg-[url('/images/blog/hero-section/Dot-bg.png')] bg-[#F2F2F233] rounded-2xl border-2 border-white">
          <div className="text-xl md:text-[36px] font-bold text-center p-2 md:p-0 mt-4 md:mt-10 px-2">
            Continue Reading
          </div>
          <span className="text-md md:text-[20px] text-gray-500 text-center block p-2 md:p-0 px-2">
            Check more recommended readings to get the job of your dreams.
          </span>

          <div className="flex mt-4 md:mt-10 justify-center p-2">
            <BlogGrid posts={allPosts} />
          </div>
        </div>
      </article>
    </>
  );
}
