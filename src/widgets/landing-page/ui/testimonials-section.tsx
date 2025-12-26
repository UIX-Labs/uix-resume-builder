'use client';

import CountUp from '@shared/ui/count-up';
import { TestimonialsCarousel } from './testimonials-carousel';
import getCurrentStatsQuery from '../api/query';
import type { CurrentStats } from '../api/stats';

export default function Testimonials() {
  const { data: currentStats } = getCurrentStatsQuery() as {
    data: CurrentStats | undefined;
  };

  return (
    <section className="relative py-4 md:py-16">
      <div className="flex justify-center items-center gap-2 md:gap-3 pt-8 pb-8 px-4">
        <span className="w-8 sm:w-16 md:w-32 h-[1px] bg-gradient-to-r from-transparent to-gray-950 opacity-40"></span>

        <p className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-900 text-center md:whitespace-nowrap tracking-wide">
          Why....professionals.....are stuck on PikaResume
        </p>

        <span className="w-8 sm:w-16 md:w-32 h-[1px] bg-gradient-to-l from-transparent to-gray-950 opacity-40"></span>
      </div>

      <div className="relative px-4 md:px-0">
        <h2
          className="text-center font-black leading-none tracking-tight h-[40px] sm:h-[80px] md:h-[100px] lg:h-[120px] overflow-hidden md:[font-size:clamp(64px,12vw,168px)]"
          style={{
            fontSize: 'clamp(50px, 10vw, 168px)', // Mobile clamp
            background: 'linear-gradient(180deg, rgba(179, 179, 179, 1) 28%, rgba(255, 255, 255, 0) 94%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Testimonials
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-4 md:gap-6">
        {/* Stats Card */}
        <div className="relative w-full lg:w-[439px] h-[400px] sm:h-[500px] md:h-[600px] lg:h-[679px] bg-[rgb(23,23,23)] border border-white rounded-[36px] overflow-hidden order-2 md:order-1">
          {/* Top-left blue gradient */}
          <div
            className="absolute -left-[80px] sm:-left-[100px] lg:-left-[150px] -top-[120px] sm:-top-[160px] lg:-top-[214px] w-[300px] sm:w-[400px] lg:w-[604px] h-[300px] sm:h-[400px] lg:h-[604px] rounded-full blur-[80px] lg:blur-[100px]"
            style={{
              background: 'linear-gradient(124deg, rgba(37, 122, 255, 1) 40%, rgba(23, 23, 23, 1) 55%)',
            }}
          ></div>

          {/* Bottom-right orange/red gradient */}
          <div
            className="absolute -right-[80px] lg:-right-[120px] bottom-[-100px] lg:bottom-[-150px] w-[200px] lg:w-[300px] h-[200px] lg:h-[300px] rounded-full blur-[100px] lg:blur-[120px]"
            style={{
              background: `linear-gradient(200deg, rgba(255, 176, 138, 1) 30%, rgba(233, 59, 54, 1) 30%)`,
            }}
          ></div>

          <div className="relative z-10 flex flex-col justify-center gap-8 sm:gap-12 lg:gap-18 px-6 sm:px-10 md:px-12 lg:px-[69px] h-full">
            <div className="flex flex-col gap-2">
              <h3 className="text-[40px] sm:text-[52px] md:text-[60px] lg:text-[68px] font-semibold leading-tight tracking-tight text-[rgb(240,247,255)]">
                <CountUp
                  from={10}
                  to={currentStats?.totalResumes ?? 0}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />
              </h3>

              <p className="text-[18px] sm:text-[22px] md:text-[28px] lg:text-[32px] font-normal leading-tight tracking-tight text-[rgb(242,242,242)]">
                Resumes delivered
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-[40px] sm:text-[52px] md:text-[60px] lg:text-[68px] font-semibold leading-tight tracking-tight text-[rgb(240,247,255)]">
                77.8%
              </h3>

              <p className="text-[18px] sm:text-[22px] md:text-[28px] lg:text-[32px] font-normal leading-tight tracking-tight text-[rgb(242,242,242)]">
                Higher chance of
                <br />
                selection
              </p>
            </div>
          </div>
        </div>

        <div className="relative w-full lg:w-[817px] order-1 lg:order-2">
          <TestimonialsCarousel />
        </div>
      </div>
    </section>
  );
}
