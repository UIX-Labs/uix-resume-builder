import BlogCard from '@/widgets/blog/components/blog-card';

const todayDate = new Date().toLocaleDateString('en-IN', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
});

const blogs = Array.from({ length: 15 }, (_, index) => ({
  id: index + 1,
  image: '/images/blog/blog-card/blog-card.png',
  category: 'Resume',
  title: 'How to Add Your Best Professional Affiliations',
  author: 'John Doe',
  date: todayDate,
}));

export default function BlogGrid() {
  return (
    <section className="max-w-[1395px] mx-auto ">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            image={blog.image}
            category={blog.category}
            title={blog.title}
            author={blog.author}
            date={blog.date}
          />
        ))}
      </div>
    </section>
  );
}
