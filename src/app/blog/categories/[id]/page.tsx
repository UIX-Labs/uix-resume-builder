import { categories } from '@/data/categories';
import BlogGrid from '@/widgets/blog/blog-Grid';
import BlogHero from '@/widgets/blog/components/blog-hero';

interface PageProps {
  params: {
    id: string;
  };
}

export default function CategoryPage({ params }: PageProps) {
  const category = categories.find((cat) => cat.id === params.id);

  if (!category) {
    return <p>Category not found</p>;
  }

  return (
    <div>
      <BlogHero
        title={category.heroTitle}
        highlightWord={category.heroHighlight}
        description={category.heroDescription}
        image={category.heroImage}
        highlightColor={category.color}
       
      />

     
      
      <div className="flex items-center justify-between mt-12 mb-6 max-w-[1395px] mx-auto">
        {/* LEFT — BLOG COUNT */}
        <h1 className="text-[36px] text-[#17171A] font-semibold">Collection of 61+ blogs</h1>

        {/* RIGHT — SEARCH INPUT */}
        <input
          type="text"
          placeholder="Search blogs"
          className="w-[260px] px-4 py-2 text-sm border border-gray-300 rounded-md outline-none focus:border-blue-500"
        />
      </div>

      <BlogGrid />
    </div>
  );
}
