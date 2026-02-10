import Image from 'next/image';

export default function FeaturedSmallCard() {
  return (
    <div className="flex flex-col sm:flex-row min-h-[200px] md:h-full items-center gap-4 pr-8 md:gap-8 bg-[url('/images/blog/hero-section/Dot-bg.png')] bg-[#F2F2F233] rounded-2xl border-4 border-white relative overflow-hidden group">
      {/* LEFT IMAGE */}
      <div className="relative w-full sm:w-1/3 h-32 sm:h-full">
        <Image
          src="/images/blog/features/Group 119.png"
          alt="person working"
          fill
          className="object-contain sm:object-left"
        />
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex-1 flex flex-col justify-center">
        <span className="inline-block w-fit bg-[#8B5CF6] text-white text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider">
          CAREER
        </span>

        <h3 className="text-base md:text-lg font-bold mt-2 leading-tight text-[#0B0A09]">
          How to Add Your Best Professional Affiliations
        </h3>

        <div className="flex items-center gap-2 mt-3 text-[12px] md:text-[13px] text-[#4B5563] font-medium">
          <div className="w-5 h-5 rounded-full bg-gray-200 overflow-hidden relative border border-gray-100">
            <Image src="/images/blog/avatar.png" alt="avatar" fill className="object-cover" />
          </div>
          <span className="truncate">John Doe</span>
          <img src="/images/blog/blog-card/clock.png" alt="avatar" className="w-[17px] h-[17px]" />
          <span className="whitespace-nowrap">8 min read</span>
        </div>
      </div>
    </div>
  );
}
