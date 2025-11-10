import Image from 'next/image';

export function TheCommunity() {
  return (
    <div className="relative w-full max-w-[563px] min-h-[296px]">
      {/* Community Icon - Top Center */}
      <div className="absolute left-[281px] top-0 w-20 h-20">
        <Image
          src="/images/community.svg"
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
  );
}