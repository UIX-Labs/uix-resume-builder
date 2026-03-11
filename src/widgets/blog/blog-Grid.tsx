import { categories } from '@/data/categories';
import BlogCard from '@/widgets/blog/components/blog-card';
import type { BlogPost } from '@shared/lib/blog';

interface BlogGridProps {
  posts: BlogPost[];
  badgeColor?: string;
  currentCategoryId?: string;
}

export default function BlogGrid({ posts, badgeColor, currentCategoryId }: BlogGridProps) {
  const blogs = posts;

  return (
    <div className="w-full">
      <section className="max-w-[1395px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => {
            let displayCategoryId = blog.frontmatter.tags?.[0];

            if (currentCategoryId) {
              const normalizedId = currentCategoryId.toLowerCase().replace(/[^a-z0-9]/g, '-');
              const matchesCurrent = blog.frontmatter.tags.some((tag) => {
                const normalizedTag = tag.replace(/[^a-z0-9]/g, '-');
                return (
                  normalizedTag === normalizedId ||
                  normalizedTag === `${normalizedId}s` ||
                  `${normalizedTag}s` === normalizedId
                );
              });

              if (matchesCurrent) {
                displayCategoryId = currentCategoryId;
              }
            }

            const category = categories.find(
              (cat) =>
                cat.id === displayCategoryId?.toLowerCase() ||
                cat.id === displayCategoryId?.toLowerCase()?.replace(/s$/, '') ||
                `${cat.id}s` === displayCategoryId?.toLowerCase(),
            );

            return (
              <BlogCard
                key={blog.slug}
                image={blog.frontmatter.coverImage || '/images/blog/blog-card/blog-card.png'}
                category={displayCategoryId}
                title={blog.frontmatter.title}
                 author={blog.frontmatter.author}
                // authorImage={blog.frontmatter.authorImage as string}
                date={blog.frontmatter.date}
                slug={`/blog/${blog.slug}`}
                badgeColor={category?.color || badgeColor}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
