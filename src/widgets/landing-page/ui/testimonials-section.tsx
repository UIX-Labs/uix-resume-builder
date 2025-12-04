'use client';

import { TestimonialsCarousel } from './testimonials-carousel';

export default function Testimonials() {

  return (
    <section className="relative py-16 select-none">
      <div className="flex justify-center items-center gap-3 pt-8 pb-8">
        <span className="w-32 h-[1px] bg-gradient-to-r from-transparent to-gray-950 opacity-40"></span>

        <p className="text-lg font-semibold text-gray-900 whitespace-nowrap tracking-wide">
          Why.....people like you.....looooooove resume builder
        </p>

        <span className="w-32 h-[1px] bg-gradient-to-l from-transparent to-gray-950 opacity-40"></span>
      </div>

      <div className="relative">
        <h2
          className="text-center font-black leading-none tracking-tight h-[120px] overflow-hidden"
          style={{
            fontSize: '168px',
            background: 'linear-gradient(180deg, rgba(179, 179, 179, 1) 28%, rgba(255, 255, 255, 0) 94%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Testimonials
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-6">
        <div className="relative w-full lg:w-[439px] h-[679px] bg-[rgb(23,23,23)] border border-white rounded-[36px] overflow-hidden">
          <div
            className="absolute -left-[150px] -top-[214px] w-[604px] h-[604px] rounded-full blur-[100px]"
            style={{
              background: 'linear-gradient(124deg, rgba(37, 122, 255, 1) 40%, rgba(23, 23, 23, 1) 55%)',
            }}
          ></div>

          <div
            className="absolute -right-[120px] bottom-[-150px] w-[300px] h-[300px] rounded-full blur-[120px]"
            style={{
              background: `linear-gradient(200deg, rgba(255, 176, 138, 1) 30%, rgba(233, 59, 54, 1) 30%)`,
            }}
          ></div>

          <div className="relative z-10 flex flex-col justify-center gap-18 px-[69px] h-full">
            <div className="flex flex-col gap-2">
              <h3 className="text-[68px] font-semibold leading-tight tracking-tight text-[rgb(240,247,255)]">10K+</h3>

              <p className="text-[32px] font-normal leading-tight tracking-tight text-[rgb(242,242,242)]">
                Resumes delivered
              </p>
            </div>

            <div className="flex flex-col gap-2 mt-18">
              <h3 className="text-[68px] font-semibold leading-tight tracking-tight text-[rgb(240,247,255)]">77.8%</h3>

              <p className="text-[32px] font-normal leading-tight tracking-tight text-[rgb(242,242,242)]">
                Higher chance of
                <br />
                selection
              </p>
            </div>
          </div>
        </div>

        <div className="relative w-full lg:w-[817px]">
          <TestimonialsCarousel />
        </div>
      </div>
    </section>
  );
}
