import Image from 'next/image';

export function VisionSection() {
  return (
    <div className="relative w-full max-w-[808px]">
      {/* Mobile/Tablet Layout */}
      <div className="lg:hidden flex flex-col items-center text-center">
        <div className="w-[120px] h-[60px] sm:w-[160px] sm:h-[80px] mb-4">
          <Image
            src="/images/vision.svg"
            alt="Decorative geometric shape"
            width={160}
            height={80}
            className="object-contain w-full h-full"
          />
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="w-[10px] h-[10px] sm:w-[13px] sm:h-[13px] rounded-full bg-[#309F66]" />
          <h2
            className="font-extrabold text-[28px] sm:text-[36px] md:text-[40px] leading-[1.2em] tracking-[-0.02em] text-[#171717]"
            style={{ fontFamily: 'Geist, sans-serif' }}
          >
            Our Vision
          </h2>
        </div>

        <p
          className="max-w-[500px] font-medium text-base sm:text-lg md:text-xl leading-[1.456em] tracking-[-0.02em] text-[#666666]"
          style={{ fontFamily: 'Geist, sans-serif' }}
        >
          We're not just building resumes - we're rebuilding confidence.{' '}
          A world where rejections guide you, not break you.{' '}
          Where every skill finds its spotlight.
        </p>
      </div>

      {/* Desktop Layout - Original */}
      <div className="hidden lg:block relative min-h-[153px]">
        {/* Decorative Geometric Shape - Left Side */}
        <div className="absolute left-0 top-[73px] w-[160px] h-[80px]">
          <Image
            src="/images/vision.svg"
            alt="Decorative geometric shape"
            width={160}
            height={80}
            className="object-contain"
          />
        </div>

        <div className="absolute left-[239px] top-0 flex flex-col items-start text-left">
          <div className="relative flex items-center justify-start gap-3 mb-4 w-full">
            <div
              className="w-[13px] h-[13px] rounded-full bg-[#309F66] flex-shrink-0"
              aria-hidden="true"
            />

            <h2
              className="font-extrabold text-[40px] leading-[1.2em] tracking-[-0.02em] text-[#171717]"
              style={{ fontFamily: 'Geist, sans-serif' }}
            >
              Our Vision
            </h2>
          </div>

          <p
            className="max-w-[569px] font-medium text-[20px] leading-[1.456em] tracking-[-0.02em] text-[#666666]"
            style={{ fontFamily: 'Geist, sans-serif' }}
          >
            We're not just building resumes - we're rebuilding confidence.{' '}
            A world where rejections guide you, not break you.{' '}
            Where every skill finds its spotlight.
          </p>
        </div>
      </div>
    </div>
  );
}