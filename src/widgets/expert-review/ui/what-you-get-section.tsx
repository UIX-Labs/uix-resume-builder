'use client';

import { CheckCircle, FileText, Lightbulb, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: FileText,
    title: 'Line-by-Line Feedback',
    description:
      'Every bullet, every section, reviewed for clarity and impact. You will know exactly which lines are strong and which need work.',
    gradient: 'from-blue-50 to-white',
  },
  {
    icon: CheckCircle,
    title: 'ATS Compatibility Check',
    description: '75% of resumes are filtered by ATS before a human sees them. We make sure yours is not one of them.',
    gradient: 'from-green-50 to-white',
  },
  {
    icon: Lightbulb,
    title: 'Actionable Rewrites',
    description: 'Not vague advice. You get specific rewrites you can copy-paste into your resume immediately.',
    gradient: 'from-blue-50 to-white',
  },
  {
    icon: Target,
    title: 'Personalized for Your Goals',
    description:
      'Whether you are a fresher or a senior leader, feedback is calibrated to your career level and target roles.',
    gradient: 'from-green-50 to-white',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.42, 0, 0.58, 1] },
  },
};

export function WhatYouGetSection() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-[#F3F4F8]" aria-labelledby="what-you-get-heading">
      <div className="container mx-auto px-4 sm:px-6 max-w-[90rem]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-12 md:mb-16 text-center"
        >
          <h2
            id="what-you-get-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 tracking-tight mb-4"
          >
            More Than a Score. A Complete Breakdown.
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Every review covers structure, content, ATS readiness, and specific rewrites. Here is what your report
            includes.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className={`relative overflow-hidden bg-gradient-to-br ${feature.gradient} rounded-2xl border border-gray-200/80 hover:border-gray-300 p-6 sm:p-8 flex flex-col gap-4 cursor-default group hover:scale-[1.03] hover:-translate-y-1 hover:shadow-lg transition-[transform,box-shadow,border-color] duration-150 ease-out`}
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-300">
                <feature.icon className="w-6 h-6 text-[#005FF2]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#171717]">{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
