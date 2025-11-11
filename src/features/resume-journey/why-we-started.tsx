import Image from 'next/image';

export function WhyWeStarted() {
  return (
    <div className="relative w-full max-w-[540.99px] min-h-[237px]">
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
  );
}
