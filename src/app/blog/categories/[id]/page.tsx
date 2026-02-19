import { categories } from '@/data/categories';
import BlogHero from '@/widgets/blog/components/blog-hero';
import NotFoundPage from '@/widgets/blog/slug/not-found-page';
import { getAllPosts } from '@shared/lib/blog';
import CategoryPageContent from '@widgets/blog/category-page';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    id: category.id,
  }));
}

export default async function CategoryPage({ params }: PageProps) {
  const { id } = await params;
  const category = categories.find((c) => c.id === id);

  if (!category) {
    return <p>Category not found</p>;
  }

  const allPosts = getAllPosts();

  const filteredPosts = allPosts.filter((post) =>
    post.frontmatter.tags.some((tag) => {
      const normalizedTag = tag.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const normalizedId = id.toLowerCase().replace(/[^a-z0-9]/g, '-');
      return normalizedTag === normalizedId || normalizedTag.startsWith(normalizedId + '-');
    }),
  );

  return (
    <div className="max-w-[1395px] mx-auto p-2">
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
          title={`Collection of ${filteredPosts.length}+ ${filteredPosts.length === 1 ? 'blog' : 'blogs'}`}
          placeholder="Type Something"
          color={category.color}
        />
      ) : (
        <div>
          <NotFoundPage/>
        </div>
      )}
    </div>
  );
}
