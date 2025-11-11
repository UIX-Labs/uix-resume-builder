import Image from 'next/image';

export function HumanAiApproach() {
  return (
    <div className="relative w-full max-w-[679px] min-h-[194px]">
      {/* Green Dot */}
      <div className="absolute left-6 top-[19px] w-[13px] h-[13px] rounded-full bg-[#309F66]" />

      {/* Title */}
      <h2
        className="absolute left-[50px] top-0 w-[488px] h-12 font-extrabold text-[40px] leading-[1.2em] tracking-[-0.02em] text-[#171717]"
        style={{ fontFamily: 'Geist, sans-serif' }}
      >
        The Human + AI Approach
      </h2>

      {/* Union Icon - Right Side */}
      <div className="absolute left-[587px] top-8 w-[92px] h-[97px]">
        <Image
          src="/images/Union.svg"
          alt="Union icon"
          width={92}
          height={97}
          className="object-contain"
        />
      </div>

      {/* Description Text */}
      <p
        className="absolute left-0 top-12 w-[497px] h-[146px] font-medium text-xl leading-[1.456em] tracking-[-0.02em] text-[#666666]"
        style={{ fontFamily: 'Geist, sans-serif' }}
      >
        Our process is simple - and real.
        <br />
        AI refines your words. Experts explain what matters. Community makes sure you&apos;re never alone.
        <br />
        Together, we help you tell your story - not just fix your resume.
      </p>
    </div>
  );
}