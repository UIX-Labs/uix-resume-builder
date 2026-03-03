import Image from 'next/image';

export default function NotFoundFilter() {
return (
    <div className="w-full min-h-[50vh] flex flex-col justify-center items-center gap-8 p-6 md:gap-10">
      <div className="relative w-full max-w-[300px] md:max-w-[500px] lg:max-w-[700px] aspect-square md:aspect-video">
        <Image src="/images/blog/not-found-search-img.svg" alt="image-not-found" fill className="object-contain" />
      </div>

      <div className="flex flex-col gap-2 justify-center items-center text-center">
        <h1 className="text-3xl md:text-5xl font-semibold">
          We <span className="text-red-500">couldn’t</span> find that.
        </h1>
        <p className="text-lg md:text-2xl font-medium text-gray-500">No results matched your search.</p>
      </div>
    </div>
  );
}
