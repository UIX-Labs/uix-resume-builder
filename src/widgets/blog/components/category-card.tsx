import Image from 'next/image';
import Link from 'next/link';

interface Category {
  id: string;
  title: string;
  image: string;
  color: string;
}

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={`/blog/categories/${category.id}`} className="block w-fit mx-auto">
      <div
        className="bg-white border border-[#E5E7EB] rounded-2xl 
        hover:shadow-md transition-all cursor-pointer 
        hover:-translate-y-1 
        w-[210px] h-[210px] overflow-hidden flex flex-col items-center justify-center p-4"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative w-3/4 h-3/4">
            <Image
              src={category.image}
              alt={category.title}
              fill
              className="object-contain"
              priority={category.id === 'resume'}
            />
          </div>

          <p className="absolute bottom-0 text-sm font-semibold text-center w-full" style={{ color: category.color }}>
            {category.title}
          </p>
        </div>
      </div>
    </Link>
  );
}
