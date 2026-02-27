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
        w-[165px] h-[165px]
       md:w-[210px] md:h-[210px] overflow-hidden flex flex-col items-center justify-center p-4"
      >
        <div className="relative md:h-full h-[70%] flex items-center justify-center w-full ">
          <div className="relative w-full md:h-full h-full">
            <Image
              src={category.image}
              alt={category.title}
              fill
              className="object-contain"
              priority={category.id === 'resume'}
            />
          </div>

          <p
            className="absolute bottom-0 text-md text-[16px] font-semibold text-center w-full"
            style={{ color: category.color }}
          >
            {category.title}
          </p>
        </div>
      </div>
    </Link>
  );
}
