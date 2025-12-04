'use client';

import Image from 'next/image';
import { useState } from 'react';
import { TestimonialsModal } from '@widgets/landing-page/ui/testimonials-modal';

export function SuccessStories() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReadTestimonials = () => {
    setIsModalOpen(true);
  };
  return (
    <section className="w-full mx-auto px-4 py-16">
      <div className="w-full max-w-[1272px] mx-auto">
        {/* Component Container */}
        <div className="relative w-full max-w-[586px] min-h-[275px]">
          {/* Moon Icon - Top */}
          <div className="absolute left-[126px] top-0 w-20 h-20">
            <Image
              src="/images/moon.svg"
              alt="Moon icon"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>

          {/* Green Dot */}
          <div className="absolute left-[244px] top-[75px] w-[13px] h-[13px] rounded-full bg-[#309F66]" />

          {/* Title */}
          <h2
            className="absolute left-[270px] top-[56px] w-[316px] h-12 font-extrabold text-[40px] leading-[1.2em] tracking-[-0.02em] text-[#171717]"
            style={{ fontFamily: 'Geist, sans-serif' }}
          >
            Success Stories
          </h2>

          {/* Description Text */}
          <p
            className="absolute left-0 top-[104px] w-[569px] h-[117px] font-medium text-xl leading-[1.456em] tracking-[-0.02em] text-[#666666]"
            style={{ fontFamily: 'Geist, sans-serif' }}
          >
            People who trusted the process landed where they belong.
            <br />
            Riya joined Swiggy&apos;s design team. Amit started freelancing with 3 startups.
            <br />
            Your &ldquo;I got it!&rdquo; moment could be next.
          </p>

          {/* Button */}
          <button type='button' className="absolute left-0 top-[235px] bg-[#257AFF] text-white rounded-lg px-3 py-2 text-lg font-normal hover:bg-[#1e66d9] transition-colors cursor-pointer" onClick={handleReadTestimonials}>
            Read all testimonials
          </button>
        </div>
      </div>
      <TestimonialsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}