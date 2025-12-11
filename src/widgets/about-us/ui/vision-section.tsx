import Image from 'next/image';

export function VisionSection() {
  return (
    <section className="w-full mx-auto px-4 py-16 md:py-24">
      <div className="w-full max-w-[1272px] mx-auto">
        <div className="relative w-full max-w-[808px] min-h-[153px] mx-auto flex flex-col md:flex-row items-start gap-8 md:gap-0">
          {/* Decorative Geometric Shape - Left Side */}
          <div className="absolute left-0 top-[73px] w-[160px] h-[80px] hidden md:block">
            <Image
              src="https://res.cloudinary.com/dkxocdrky/image/upload/v1765473869/vision_bm5rhj.svg"
              alt="Decorative geometric shape"
              width={160}
              height={80}
              className="object-contain"
            />
          </div>

          {/* Mobile: Show geometric shape at top */}
          <div className="w-[160px] h-[80px] md:hidden mx-auto mb-4">
            <Image
              src="https://res.cloudinary.com/dkxocdrky/image/upload/v1765473869/vision_bm5rhj.svg"
              alt="Decorative geometric shape"
              width={160}
              height={80}
              className="object-contain"
            />
          </div>

          {/* Content Section - Right Side */}
          <div className="w-full md:ml-[239px] flex flex-col items-center md:items-start text-center md:text-left">
            {/* Title with Green Dot */}
            <div className="relative flex items-center justify-center md:justify-start gap-3 mb-3 md:mb-4 w-full">
              {/* Green Dot Accent */}
              <div 
                className="w-[13px] h-[13px] rounded-full bg-[#309F66] flex-shrink-0"
                aria-hidden="true"
              />

              {/* Our Vision Title */}
              <h2 
                className="font-extrabold text-[32px] md:text-[40px] leading-[1.2em] tracking-[-0.02em] text-[#171717]"
                style={{ fontFamily: 'Geist, sans-serif' }}
              >
                Our Vision
              </h2>
            </div>

            {/* Description Text */}
            <p 
              className="max-w-[569px] font-medium text-[18px] md:text-[20px] leading-[1.456em] tracking-[-0.02em] text-[#666666]"
              style={{ fontFamily: 'Geist, sans-serif' }}
            >
              We're not just building resumes — we're rebuilding confidence.{' '}
              A world where rejections guide you, not break you.{' '}
              Where every skill finds its spotlight.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}