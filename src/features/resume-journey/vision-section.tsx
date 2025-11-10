import Image from 'next/image';

export function VisionSection() {
  return (
    <div className="relative w-full max-w-[808px] min-h-[153px]">
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
  );
}