import Image from 'next/image';

interface NotFoundSearchProps {
  tags: string[];
}

export default function NotFoundSearch({ tags }: NotFoundSearchProps) {
  const displayTags = ['All', ...tags].slice(0, 6);

  return (
    <div className="w-full min-h-[70vh] flex flex-col justify-center items-center gap-8 p-6 md:gap-10">
      {/* Container for Image: Responsive width and height */}
      <div className="relative w-full max-w-[300px] md:max-w-[500px] lg:max-w-[700px] aspect-square md:aspect-video">
        <Image src="/images/blog/not-found-search-img.svg" alt="image-not-found" fill className="object-contain" />
      </div>

      {/* Text Section: Centered with scaling font sizes */}
      <div className="flex flex-col gap-2 justify-center items-center text-center">
        <h1 className="text-3xl md:text-5xl font-semibold">
          We <span className="text-red-500">couldn’t</span> find that.
        </h1>
        <p className="text-lg md:text-2xl font-medium text-gray-500">No results matched your search.</p>
      </div>

      {/* Suggestions Section */}
      <div className="flex flex-col gap-4 items-center justify-center w-full md:w-auto">
        <p className="text-lg md:text-xl font-medium text-black">Here are some suggestions:</p>

        {/* Grid: 2 columns on mobile, 3 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8 w-full max-w-md md:max-w-none">
          {displayTags.map((tag) => (
            <button
              type="button"
              key={tag}
              className="px-4 py-2 md:px-4 md:py-3
              rounded bg-[#EB5E3B] text-white text-sm md:text-base"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
