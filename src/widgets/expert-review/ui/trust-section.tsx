'use client';

import { motion } from 'framer-motion';

const stats = [
  { value: '500+', label: 'Resumes Reviewed' },
  { value: '20+', label: 'Expert Reviewers' },
  { value: '3 Days', label: 'Average Turnaround' },
  { value: '4.8/5', label: 'Satisfaction Rating' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const statVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.42, 0, 0.58, 1] },
  },
};

export function TrustSection() {
  return (
    <section className="relative py-12 sm:py-16 md:py-24 bg-[#171717] overflow-hidden" aria-labelledby="trust-heading">
      {/* Subtle glow effects */}
      <div className="pointer-events-none absolute -top-[100px] left-1/4 w-[300px] h-[300px] rounded-full bg-[#005FF2]/[0.05] blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-[100px] right-1/4 w-[300px] h-[300px] rounded-full bg-[#005FF2]/[0.03] blur-[100px]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 max-w-[90rem]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-12 md:mb-16 text-center"
        >
          <h2
            id="trust-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight mb-4"
          >
            The Numbers Speak for Themselves
          </h2>
          <p className="text-base sm:text-lg text-white/60 max-w-xl mx-auto">
            Every resume we review gets better. Here is the proof.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 max-w-4xl mx-auto"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={statVariants}
              className="flex flex-col items-center text-center gap-2 cursor-default hover:scale-[1.08] transition-transform duration-150 ease-out"
            >
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#005FF2]">{stat.value}</span>
              <span className="text-sm sm:text-base text-white/70 font-medium">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
