'use client';
import Header from '@widgets/landing-page/ui/header-section';
import Image from 'next/image';
import Link from 'next/link';
import { OurVision } from '@widgets/about-us/ui/our-vision';
import { JourneyTimeline } from '@widgets/about-us/ui/journey-timeline';
import Innovation from '@widgets/about-us/ui/innovation';
import FooterSection from '@widgets/landing-page/ui/footer-section';

export default function AboutUs() {
  return (
    <div className="w-full h-full min-h-screen overflow-x-hidden">
      <AboutPage />
    </div>
  );
}

function AboutPage() {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="relative w-full min-h-screen">
        <Header />

        <div className="relative pt-4 md:pt-[34px] z-0">
          <h1 className="text-[48px] sm:text-[80px] md:text-[120px] lg:text-[168px] font-[900] text-center leading-none tracking-[-0.03em] h-[50px] sm:h-[70px] md:h-[100px] lg:h-[132px] overflow-hidden bg-gradient-to-b from-[#B3B3B3] from-28% to-transparent to-94% bg-clip-text text-transparent">
            About Us
          </h1>
        </div>

        {/* Desktop layout */}
        <div className="hidden lg:block relative w-full max-w-[995px] mx-auto px-4 -mt-36 min-h-[700px]">
          <div className="absolute w-[364px] h-[664px] left-[315px] top-0 z-10">
            <Image src="/images/Group-35.png" alt="Group 35" fill className="object-cover" />
          </div>

          <h2 className="absolute text-[80px] font-semibold leading-[0.9125] text-[#0C1118] z-20 font-[Geist,sans-serif] left-0 top-[139px] w-[586.13px] h-[146px] tracking-[-0.03em]">
            Meet <span className="font-black">Resume Builder</span>
          </h2>
          <p className="absolute text-[37px] font-normal leading-[1.405] text-[#0C1118] z-20 font-[Geist,sans-serif] left-[693px] top-[299px] w-[281px] h-[52px] tracking-[-0.03em]">
            Where Bold Ideas
          </p>

          <h3 className="absolute text-[80px] font-bold leading-[0.85] text-[#0C1118] z-20 italic font-[Times_New_Roman,serif] left-[655px] top-[342px] w-[352px] h-[136px] tracking-[-0.02em] opacity-80">
            Open real Doors
          </h3>
        </div>

        {/* Mobile/Tablet layout - Redesigned without Group 35 image */}
        <div className="lg:hidden relative w-full px-4 py-8">
          <div className="text-center px-4">
            <h2 className="text-[32px] sm:text-[48px] md:text-[60px] font-semibold leading-[1.1] text-[#0C1118] font-[Geist,sans-serif] tracking-[-0.03em] mb-4">
              Meet <span className="font-black">Resume Builder</span>
            </h2>
            <Image
              src="/images/Group-35.png"
              alt="Group 35"
              width={364}
              height={664}
              className="object-cover mx-auto"
            />
            <p className="text-[20px] sm:text-[24px] md:text-[28px] font-normal leading-[1.4] text-[#0C1118] font-[Geist,sans-serif] tracking-[-0.03em] mb-2">
              Where Bold Ideas
            </p>
            <h3 className="text-[36px] sm:text-[48px] md:text-[60px] font-bold leading-[1] text-[#0C1118] italic font-[Times_New_Roman,serif] tracking-[-0.02em] opacity-80">
              Open real Doors
            </h3>
          </div>
        </div>

        <div className="flex justify-center items-center gap-2 sm:gap-3 py-6 md:py-8 lg:-mt-6 px-4">
          <div className="w-12 sm:w-20 md:w-28 h-0 border-t border-black/30 rounded-full flex-shrink-0" />
          <p className="text-sm sm:text-base md:text-lg font-semibold text-[#666666] text-center">
            Step in, we'll show you what we're building and why it matters
          </p>
          <div className="w-12 sm:w-20 md:w-28 h-0 border-t border-black/30 rounded-full flex-shrink-0" />
        </div>
      </div>
      <OurVision />
      <JourneyTimeline />
      <Innovation />

      {/* SEO content section for text/HTML ratio and internal linking */}
      <section className="py-12 sm:py-16 bg-gray-50/50" aria-label="About Pika Resume">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">
            Building the Future of Resume Creation
          </h2>
          <p className="text-base text-gray-700 leading-relaxed mb-4">
            Pika Resume is an AI-powered resume builder designed to help job seekers create professional, ATS-optimized
            resumes in minutes. Our platform combines cutting-edge artificial intelligence with insights from hiring
            professionals at leading companies to deliver resumes that get results.
          </p>
          <p className="text-base text-gray-700 leading-relaxed mb-8">
            Whether you are building your first resume, switching careers, or targeting your dream role, Pika Resume
            provides the tools you need — from AI content suggestions and LinkedIn import to expert human review and job
            description matching.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            <Link
              href="/"
              className="px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/templates"
              className="px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              Resume Templates
            </Link>
            <Link
              href="/roast"
              className="px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              AI Resume Roast
            </Link>
            <Link
              href="/expert-review"
              className="px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              Expert Review
            </Link>
            <Link
              href="/blog"
              className="px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              Blog
            </Link>
          </div>
        </div>
      </section>

      <div className="border border-white rounded-md mx-2 sm:mx-4 overflow-hidden mt-12 bg-[radial-gradient(circle,#ccc_1px,transparent_1px)] bg-[length:20px_20px]">
        <FooterSection />
      </div>
    </div>
  );
}
