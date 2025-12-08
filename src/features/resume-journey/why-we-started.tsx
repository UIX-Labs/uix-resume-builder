import Image from 'next/image';

export function WhyWeStarted() {
  return (
    <div className="relative w-full max-w-[540.99px]">
      {/* Mobile/Tablet Layout */}
      <div className="lg:hidden flex flex-col items-center text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 mb-4">
          <Image
            src="/images/flash.svg"
            alt="Flash icon"
            width={80}
            height={80}
            className="object-contain w-full h-full"
          />
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="w-[10px] h-[10px] sm:w-[13px] sm:h-[13px] rounded-full bg-[#309F66]" />
          <h2
            className="font-extrabold text-[24px] sm:text-[32px] md:text-[36px] leading-[1.2em] tracking-[-0.02em] text-[#171717]"
            style={{ fontFamily: 'Geist, sans-serif' }}
          >
            why we started
          </h2>
        </div>

        <p
          className="font-medium text-base sm:text-lg md:text-xl leading-[1.456em] tracking-[-0.02em] text-[#666666]"
          style={{ fontFamily: 'Geist, sans-serif' }}
        >
          Most people don't open a resume builder in a happy mood.
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          They&apos;re stressed, uncertain, and looking for a way out - not just better grammar or keywords.
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          That&apos;s where we saw the gap no one was solving.
        </p>
      </div>

      {/* Desktop Layout - Original */}
      <div className="hidden lg:block relative min-h-[237px]">
        <div className="absolute left-[432px] top-0 w-20 h-20">
          <Image
            src="/images/flash.svg"
            alt="Flash icon"
            width={80}
            height={80}
            className="object-contain"
          />
        </div>

        {/* Green Dot */}
        <div className="absolute left-[109px] top-[93px] w-[13px] h-[13px] rounded-full bg-[#309F66]" />

        {/* Title */}
        <h2
          className="absolute left-[133px] top-[68px] w-[297px] h-12 font-extrabold text-[40px] leading-[1.2em] tracking-[-0.02em] text-[#171717]"
          style={{ fontFamily: 'Geist, sans-serif' }}
        >
          why we started
        </h2>

        {/* Description Text */}
        <p
          className="absolute left-0 top-[120px] w-[540.99px] h-[117px] font-medium text-xl leading-[1.456em] tracking-[-0.02em] text-[#666666]"
          style={{ fontFamily: 'Geist, sans-serif' }}
        >
          Most people don't open a resume builder in a happy mood.
          <br />
          They&apos;re stressed, uncertain, and looking for a way out - not just better grammar or keywords.
          <br />
          That&apos;s where we saw the gap no one was solving.
        </p>
      </div>
    </div>
  );
}
