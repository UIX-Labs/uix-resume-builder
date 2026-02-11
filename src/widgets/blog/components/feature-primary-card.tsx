import { Clock } from 'lucide-react';

export default function FeaturedPrimaryCard() {
  return (
    <div className="h-full bg-[url('/images/blog/hero-section/Dot-bg.png')] rounded-2xl relative overflow-hidden">
      {/* Right Image */}
      <div className="absolute top-0 right-0 w-[50%] md:w-[60%]">
        <img src="/images/blog/features/pencil.png" alt="" className="object-contain object-right-top" />
      </div>

      {/* Content */}
      <div className="absolute inset-y-0 left-0 flex flex-col justify-end ml-7 mb-7">
        <div>
          <span className="text-xs font-semibold text-white uppercase bg-orange-500 px-2 py-1 rounded-md">Resume</span>

          <h1 className="text-2xl font-bold mt-4 max-w-[350px]">How to write a resume: Expert guide & examples</h1>

          <div className="flex items-center gap-3 mt-4">
            <img
              src="https://picsum.photos/200"
              className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
              alt="Srishti Chandra"
            />

            <div className="flex flex-row gap-2 justify-center items-center">
              <span className="text-sm font-medium text-gray-700">Srishti Chandra</span>

              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-md text-gray-500 font-medium text-[15px]">8 min read</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
