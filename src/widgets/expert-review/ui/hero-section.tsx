'use client';

import { Button } from '@/shared/ui/components/button';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback } from 'react';

const companyLogos = [
  { name: 'Google', src: '/images/google-logo.svg' },
  { name: 'Microsoft', src: '/images/microsoft-logo.svg' },
  { name: 'Apple', src: '/images/apple-logo.svg' },
  { name: 'Amazon', src: '/images/amazon-logo.svg' },
  { name: 'Meta', src: '/images/meta-logo.svg' },
];

// Review annotations floating around the resume mockup
const annotations: {
  label: string;
  variant: 'success' | 'error' | 'warning';
  className: string;
}[] = [
  {
    label: 'ATS Friendly',
    variant: 'success',
    className: '-top-3 right-2 sm:right-4',
  },
  {
    label: 'Weak action verb',
    variant: 'error',
    className: 'top-[68px] sm:top-[80px] md:top-[88px] -left-3 sm:-left-6 md:-left-10',
  },
  {
    label: 'Add metrics',
    variant: 'warning',
    className: 'top-[130px] sm:top-[150px] md:top-[170px] -right-2 sm:-right-4 md:-right-8',
  },
  {
    label: 'Strong summary',
    variant: 'success',
    className: 'bottom-[70px] sm:bottom-[85px] md:bottom-[100px] -left-2 sm:-left-4 md:-left-8',
  },
];

const variantStyles = {
  success: 'bg-green-50 text-green-700 border-green-200',
  error: 'bg-red-50 text-red-700 border-red-200',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
};

const dotStyles = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  warning: 'bg-amber-500',
};

function ResumeMockup() {
  return (
    <div className="relative w-[240px] sm:w-[280px] md:w-[320px] lg:w-[380px] mx-auto">
      {/* Depth shadow */}
      <div className="absolute inset-0 translate-x-3 translate-y-3 bg-[#005FF2]/8 rounded-xl" />

      {/* Resume page */}
      <div className="relative bg-white rounded-xl shadow-xl border border-gray-200/80 p-4 sm:p-5 md:p-6 lg:p-8">
        {/* Name header */}
        <div className="mb-4 md:mb-5">
          <div className="h-4 sm:h-5 md:h-6 w-24 sm:w-28 md:w-36 bg-[#171717] rounded mb-2" />
          <div className="flex gap-2 md:gap-3 flex-wrap">
            <div className="h-1.5 sm:h-2 md:h-2.5 w-14 sm:w-16 md:w-20 bg-gray-300 rounded-full" />
            <div className="h-1.5 sm:h-2 md:h-2.5 w-16 sm:w-20 md:w-24 bg-gray-300 rounded-full" />
            <div className="h-1.5 sm:h-2 md:h-2.5 w-12 sm:w-14 md:w-16 bg-gray-300 rounded-full" />
          </div>
        </div>

        {/* Summary section */}
        <div className="mb-4 md:mb-5">
          <div className="h-2 sm:h-2.5 md:h-3 w-16 sm:w-18 md:w-20 bg-[#005FF2] rounded mb-2 md:mb-2.5" />
          <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
            <div className="h-1.5 md:h-2 w-full bg-gray-200 rounded-full" />
            <div className="h-1.5 md:h-2 w-[92%] bg-gray-200 rounded-full" />
            <div className="h-1.5 md:h-2 w-[78%] bg-gray-200 rounded-full" />
          </div>
        </div>

        {/* Experience section */}
        <div className="mb-4 md:mb-5">
          <div className="h-2 sm:h-2.5 md:h-3 w-20 sm:w-22 md:w-24 bg-[#005FF2] rounded mb-2 md:mb-2.5" />
          <div className="mb-1.5 md:mb-2">
            <div className="h-2 md:h-2.5 w-28 sm:w-30 md:w-32 bg-gray-400 rounded mb-1" />
            <div className="h-1.5 md:h-2 w-16 sm:w-18 md:w-20 bg-gray-300 rounded-full" />
          </div>
          <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
            <div className="h-1.5 md:h-2 w-full bg-gray-200 rounded-full" />
            <div className="h-1.5 md:h-2 w-[88%] bg-red-100 rounded-full" />
            <div className="h-1.5 md:h-2 w-[95%] bg-gray-200 rounded-full" />
            <div className="h-1.5 md:h-2 w-[70%] bg-gray-200 rounded-full" />
          </div>
        </div>

        {/* Skills section */}
        <div>
          <div className="h-2 sm:h-2.5 md:h-3 w-12 sm:w-13 md:w-14 bg-[#005FF2] rounded mb-2 md:mb-2.5" />
          <div className="flex flex-wrap gap-1 sm:gap-1.5">
            <div className="h-3.5 sm:h-4 md:h-5 w-10 sm:w-12 md:w-14 bg-gray-100 rounded border border-gray-200" />
            <div className="h-3.5 sm:h-4 md:h-5 w-12 sm:w-14 md:w-16 bg-gray-100 rounded border border-gray-200" />
            <div className="h-3.5 sm:h-4 md:h-5 w-8 sm:w-10 md:w-12 bg-gray-100 rounded border border-gray-200" />
            <div className="h-3.5 sm:h-4 md:h-5 w-14 sm:w-16 md:w-18 bg-gray-100 rounded border border-gray-200" />
          </div>
        </div>
      </div>

      {/* Floating annotation pills */}
      {annotations.map((note, i) => (
        <motion.div
          key={note.label}
          initial={{ opacity: 0, scale: 0.8, y: 5 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -3, 0],
          }}
          transition={{
            opacity: { duration: 0.4, delay: 0.8 + i * 0.15 },
            scale: { duration: 0.4, delay: 0.8 + i * 0.15 },
            y: {
              duration: 3,
              repeat: Infinity,
              delay: 1.5 + i * 0.6,
              ease: 'easeInOut',
            },
          }}
          className={`absolute ${note.className} z-10`}
        >
          <span
            className={`inline-flex items-center gap-1 sm:gap-1.5 ${variantStyles[note.variant]} text-[9px] sm:text-[10px] md:text-xs font-medium px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 md:py-1.5 rounded-full border shadow-sm whitespace-nowrap`}
          >
            <span
              className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${dotStyles[note.variant]} flex-shrink-0`}
            />
            {note.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

export function HeroSection() {
  const handleCTAClick = useCallback(() => {
    trackEvent('navigation_click', {
      source: 'expert_review_hero',
      destination: 'upload_section',
    });
    const el = document.getElementById('expert-review-upload');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section className="relative py-12 sm:py-16 md:py-24 bg-white overflow-hidden">
      {/* Subtle background glows */}
      <div className="pointer-events-none absolute -top-[200px] -right-[200px] w-[500px] h-[500px] rounded-full bg-[#005FF2]/[0.03] blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-[150px] -left-[150px] w-[400px] h-[400px] rounded-full bg-[#00BA34]/[0.03] blur-[100px]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 max-w-[90rem]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Column - Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Urgency badge */}
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold bg-red-50 text-red-600 border border-red-100 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              75% of resumes are rejected by ATS
            </motion.span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-semibold text-[#171717] tracking-tight leading-[1.1] mb-6">
              Your Resume Might Never{' '}
              <span className="text-[#005FF2]">Reach a Recruiter</span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-base sm:text-lg md:text-xl text-gray-600 max-w-xl mb-8 leading-relaxed"
            >
              Get a line-by-line review from professionals who have hired at
              Google, Microsoft, and TikTok. They will find what is holding your
              resume back and tell you exactly how to fix it. Delivered in 3
              days.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-col gap-6"
            >
              <Button
                onClick={handleCTAClick}
                className="w-fit bg-[#005FF2] hover:bg-blue-700 text-white font-semibold rounded-xl px-10 py-6 text-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#005FF2]/20"
              >
                Get Your Resume Reviewed
              </Button>

              {/* Company logos strip */}
              <div className="flex flex-col gap-2.5">
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                  Our reviewers work at
                </span>
                <div className="flex items-center gap-5">
                  {companyLogos.map((logo) => (
                    <div
                      key={logo.name}
                      className="relative w-5 h-5 sm:w-6 sm:h-6"
                    >
                      <Image
                        src={logo.src}
                        alt={logo.name}
                        fill
                        className="object-contain grayscale opacity-50"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Resume Mockup with floating annotations */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex justify-center py-6 lg:py-0"
          >
            <ResumeMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
