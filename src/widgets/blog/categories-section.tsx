import { categories } from '@/data/categories';
import CategoryCard from '@/widgets/blog/components/category-card';

export default function CategoriesSection() {
  return (
    <section className="bg-[url('/images/blog/hero-section/Dot-bg.png')] bg-[#F2F2F233] w-full max-w-[1395px] mx-auto rounded-2xl border-4 border-white md:p-8 py-4 pl-4 pr-0">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Explore Categories</h2>

      <div className="flex gap-6 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory justify-items-center md:w-[90%] md:mx-auto pb-4">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </section>
  );
}
