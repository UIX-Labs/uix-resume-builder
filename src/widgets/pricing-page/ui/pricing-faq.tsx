'use client';

import { pricingFaqs } from '@/data/pricing-faqs';
import { cn } from '@shared/lib/cn';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

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
    transition: { duration: 0.4, ease: [0.42, 0, 0.58, 1] as const },
  },
};

export function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white" aria-labelledby="pricing-faq-heading">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.h2
          id="pricing-faq-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="font-bold text-2xl sm:text-3xl md:text-4xl text-center mb-8 md:mb-12 text-[#171717]"
        >
          Pricing <span className="text-[#005FF2]">FAQ</span>
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="flex flex-col gap-3"
        >
          {pricingFaqs.map((faq, index) => (
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
              <AnimatePresence>
                {openIndex === index && (
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
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
