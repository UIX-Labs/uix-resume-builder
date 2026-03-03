'use client';

import { cn } from '@shared/lib/cn';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'What makes Pika Resume different from other resume builders?',
    answer:
      'Pika Resume combines AI resume building with expert human review, a fun but insightful Resume Roast, job-description matching, and a reward-based referral system. You do not just build a resume, you optimize it for real job outcomes.',
  },
  {
    question: 'What is Pika Intelligence and how does it work?',
    answer:
      'Pika Intelligence is our proprietary AI engine that analyzes your resume and compares it directly with your target job description. It identifies missing keywords, weak phrasing, and alignment gaps, then suggests stronger, results-driven, role-specific improvements optimized for ATS systems.',
  },
  {
    question: 'What is the "Resume Roast" feature?',
    answer:
      'The Roast feature lets you upload your resume and get brutally honest (but constructive) feedback. We highlight weak bullets, vague achievements, formatting issues, and missed keywords so you know exactly what to fix and why.',
  },
  {
    question: 'What is the Expert Review feature?',
    answer:
      'Beyond AI suggestions, you can opt for a professional review where resume experts from companies like Google, Microsoft, and TikTok provide personalized feedback on structure, clarity, impact, and positioning.',
  },
  {
    question: 'How does Job Description (JD) matching work?',
    answer:
      'Upload your resume along with a job description, and our AI analyzes both to identify missing keywords, skill gaps, and alignment issues. It then suggests stronger, role-specific bullet points and optimizes your resume for ATS systems.',
  },
  {
    question: 'How does the referral reward system work?',
    answer:
      'When you refer friends to Pika Resume, you earn 3 download credits for each successful signup. More referrals mean more resume downloads unlocked, making it easy to benefit while helping others.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.42, 0, 0.58, 1] },
  },
};

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="w-full px-4 py-10 md:py-20" aria-labelledby="landing-faq-heading">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          id="landing-faq-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="font-bold text-3xl md:text-5xl text-center mb-8 md:mb-12 text-[#171717]"
        >
          Frequently Asked <span className="text-[#005FF2]">Questions</span>
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="flex flex-col gap-3"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:border-gray-300 transition-colors duration-200"
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 text-left cursor-pointer hover:bg-gray-50 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="text-base sm:text-lg font-medium text-[#171717] pr-4">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300',
                    openIndex === index && 'rotate-180',
                  )}
                />
              </button>
              {/* Always render answer in DOM for SEO (sr-only when collapsed) */}
              {openIndex === index ? (
                <AnimatePresence initial={false}>
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-4 sm:pb-5 text-sm sm:text-base text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="sr-only">{faq.answer}</div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
