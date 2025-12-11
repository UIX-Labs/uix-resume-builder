import Image from 'next/image';

export function TheCommunity() {
  return (
    <div className="relative w-full max-w-[563px]">
      {/* Mobile/Tablet Layout */}
      <div className="lg:hidden flex flex-col items-center text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 mb-4">
          <Image
            src="https://res.cloudinary.com/dkxocdrky/image/upload/v1765473854/community_dqr7uo.svg"
            alt="Community icon"
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
            The Community
          </h2>
        </div>

        <p
          className="font-medium text-base sm:text-lg md:text-xl leading-[1.456em] tracking-[-0.02em] text-[#666666]"
          style={{ fontFamily: 'Geist, sans-serif' }}
        >
          If we see true skill, you join our invite-only community.
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          Here, members get feedback from people at top companies, access freelance gigs, and use our builder for free - for life.
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          Because one rejection should never end your story.
        </p>
      </div>

      {/* Desktop Layout - Original */}
      <div className="hidden lg:block relative min-h-[296px]">
        {/* Community Icon - Top Center */}
        <div className="absolute left-[281px] top-0 w-20 h-20">
          <Image
            src="https://res.cloudinary.com/dkxocdrky/image/upload/v1765473854/community_dqr7uo.svg"
            alt="Community icon"
            width={80}
            height={80}
            className="object-contain"
          />
        </div>

        {/* Green Dot */}
        <div className="absolute left-0 top-[121px] w-[13px] h-[13px] rounded-full bg-[#309F66]" />

        {/* Title */}
        <h2
          className="absolute left-[26px] top-[102px] w-[301px] h-12 font-extrabold text-[40px] leading-[1.2em] tracking-[-0.02em] text-[#171717]"
          style={{ fontFamily: 'Geist, sans-serif' }}
        >
          The Community
        </h2>

        {/* Description Text */}
        <p
          className="absolute left-[66px] top-[150px] w-[497px] h-[146px] font-medium text-xl leading-[1.456em] tracking-[-0.02em] text-[#666666]"
          style={{ fontFamily: 'Geist, sans-serif' }}
        >
          If we see true skill, you join our invite-only community.
          <br />
          Here, members get feedback from people at top companies, access freelance gigs, and use our builder for free - for life.
          <br />
          Because one rejection should never end your story.
        </p>
      </div>
    </div>
  );
}