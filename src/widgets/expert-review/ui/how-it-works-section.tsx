'use client';

import { Mail, Upload, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    step: 1,
    icon: Upload,
    title: 'Upload Your Resume',
    description:
      'Drop your resume in. PDF or Word, under 4 MB. Takes less than 30 seconds.',
    gradient: 'from-[#005FF2]/5 to-[#005FF2]/[0.02]',
    borderHover: 'hover:border-[#005FF2]/30',
  },
  {
    step: 2,
    icon: UserCheck,
    title: 'A Real Expert Reviews It',
    description:
      'A reviewer from Google, Microsoft, or TikTok goes through every line. They check content, structure, impact, and ATS readiness.',
    gradient: 'from-[#00BA34]/5 to-[#00BA34]/[0.02]',
    borderHover: 'hover:border-[#00BA34]/30',
  },
  {
    step: 3,
    icon: Mail,
    title: 'Get Actionable Feedback',
    description:
      'Your detailed review lands in your inbox within 3 business days. No fluff. Just what to fix and how.',
    gradient: 'from-[#005FF2]/5 to-[#005FF2]/[0.02]',
    borderHover: 'hover:border-[#005FF2]/30',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] },
  },
};

export function HowItWorksSection() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-[#F3F4F8]" aria-labelledby="how-it-works-heading">
      <div className="container mx-auto px-4 sm:px-6 max-w-[90rem]">
        <motion.h2
          id="how-it-works-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-12 md:mb-16 text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 tracking-tight"
        >
          Dead Simple. Three Steps.
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          {steps.map((item) => (
            <motion.div
              key={item.step}
              variants={cardVariants}
              className={`relative overflow-hidden bg-gradient-to-br ${item.gradient} bg-white rounded-2xl border border-gray-200/80 ${item.borderHover} p-6 sm:p-8 flex flex-col gap-4 cursor-default group hover:scale-[1.03] hover:-translate-y-1 hover:shadow-lg transition-[transform,box-shadow,border-color] duration-150 ease-out`}
            >
              {/* Decorative corner accent */}
              <div className="absolute -right-8 -top-8 w-[120px] h-[120px] rounded-full bg-[#005FF2]/[0.04] group-hover:bg-[#005FF2]/[0.08] transition-colors duration-500" />

              {/* Step number + icon in same row */}
              <div className="relative z-10 flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-[#005FF2] text-white text-sm font-bold flex items-center justify-center shadow-md shadow-[#005FF2]/20">
                  {item.step}
                </span>
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                  <item.icon className="w-5 h-5 text-[#005FF2]" />
                </div>
              </div>

              <h3 className="relative z-10 text-xl sm:text-2xl font-semibold text-[#171717]">
                {item.title}
              </h3>
              <p className="relative z-10 text-sm sm:text-base text-gray-600 leading-relaxed">
                {item.description}
              </p>

              {/* Connecting line (visible on desktop) */}
              {item.step < 3 && (
                <div className="hidden sm:block absolute -right-4 lg:-right-5 top-1/2 -translate-y-1/2 w-8 lg:w-10 h-[2px] bg-gradient-to-r from-gray-300 to-transparent z-20" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
