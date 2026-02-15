import { categories } from '@/data/categories';
import BlogHero from '@/widgets/blog/components/blog-hero';
import { getAllPosts } from '@shared/lib/blog';
import CategoryPageContent from '@widgets/blog/category-page';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { id } = await params;
  const category = categories.find((c) => c.id === id);

  if (!category) {
    return <p>Category not found</p>;
  }

  const allPosts = getAllPosts();

  const filteredPosts = allPosts.filter((post) => post.frontmatter.tags.includes(id));

  return (
    <div>
      {/* HERO */}
      <BlogHero description={category.hero.description} image={category.hero.image}>
        {/* Same classes as "The Pika Journal" */}
        <span className="text-3xl sm:text-4xl lg:text-[63px] font-semibold">
          <span style={{ color: category.color }}>{category.title}</span>{' '}
          <span className="text-black">{category.hero.suffix}</span>
        </span>
      </BlogHero>

      {/* CLIENT PART */}
      <CategoryPageContent posts={filteredPosts} title="Collection of 61+ blogs" placeholder="Search blogs" />
    </div>
  );
}
