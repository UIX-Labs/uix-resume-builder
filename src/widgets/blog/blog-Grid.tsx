import BlogCard from '@/widgets/blog/components/blog-card';
import { BlogPost, getAllPosts } from '@shared/lib/blog';

interface BlogGridProps {
  posts: BlogPost[];
}

export default function BlogGrid() {
  const blogs = getAllPosts();

  return (
    <div className="w-full">
      <section className="max-w-[1395px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.slug}
              image={blog.frontmatter.coverImage || '/images/blog/blog-card/blog-card.png'}
              category={blog.frontmatter.tags?.[0] || 'Resume'}
              title={blog.frontmatter.title}
              author={blog.frontmatter.author}
              date={blog.frontmatter.date}
              slug={`/blog/${blog.slug}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
