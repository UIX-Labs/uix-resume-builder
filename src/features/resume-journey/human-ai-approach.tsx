import Image from 'next/image';
import { ICONS } from '@shared/lib/image-assets';

export function HumanAiApproach() {
  return (
    <div className="relative w-full max-w-[679px]">
      {/* Mobile/Tablet Layout */}
      <div className="lg:hidden flex flex-col items-center text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 mb-4">
          <Image
            src={ICONS.UNION}
            alt="Union icon"
            width={92}
            height={97}
            className="object-contain w-full h-full"
          />
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="w-[10px] h-[10px] sm:w-[13px] sm:h-[13px] rounded-full bg-[#309F66]" />
          <h2
            className="font-extrabold text-[20px] sm:text-[28px] md:text-[32px] leading-[1.2em] tracking-[-0.02em] text-[#171717]"
            style={{ fontFamily: 'Geist, sans-serif' }}
          >
            The Human + AI Approach
          </h2>
        </div>

        <p
          className="font-medium text-base sm:text-lg md:text-xl leading-[1.456em] tracking-[-0.02em] text-[#666666]"
          style={{ fontFamily: 'Geist, sans-serif' }}
        >
          Our process is simple - and real.
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          AI refines your words. Experts explain what matters. Community makes sure you&apos;re never alone.
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          Together, we help you tell your story - not just fix your resume.
        </p>
      </div>

      {/* Desktop Layout - Original */}
      <div className="hidden lg:block relative min-h-[194px]">
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
            src={ICONS.UNION}
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
    </div>
  );
}