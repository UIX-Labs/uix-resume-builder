import { categories } from '@/data/categories';
import BlogCard from '@/widgets/blog/components/blog-card';
import { BlogPost } from '@shared/lib/blog';


interface BlogGridProps {
  posts: BlogPost[];
  badgeColor?: string; 
}

export default function BlogGrid({ posts, badgeColor }: BlogGridProps) {
  const blogs = posts;

  return (
    <div className="w-full">
      <section className="max-w-[1395px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => {
          const categoryId = blog.frontmatter.tags?.[0];
          const category = categories.find(
            (cat) => cat.id === categoryId
          );

          return (
            <BlogCard
              key={blog.slug}
              image={blog.frontmatter.coverImage || '/images/blog/blog-card/blog-card.png'}
              category={category?.title || categoryId}
              title={blog.frontmatter.title}
              author={blog.frontmatter.author}
              date={blog.frontmatter.date}
              slug={`/blog/${blog.slug}`}
              badgeColor={category?.color}
            />
          );
        })}

        </div>
      </section>
    </div>
  );
}
