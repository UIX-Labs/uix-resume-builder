//hero-img 'use client';

import CountUp from '@shared/ui/count-up';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import Image from 'next/image';

export default function HeroImgSection() {
  const fadeScaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (delay = 0) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay,
        duration: 0.45,
        type: 'spring' as const,
        damping: 10,
        stiffness: 100,
      },
    }),
  };

  return (
    /* CHANGE: Changed h-[400px] to aspect-square on mobile 
       to ensure the background shapes stay relative to the resume image.
    */
    <div className="relative w-full max-w-[340px] md:max-w-[520px] aspect-[4/5] md:h-[620px] mx-auto mb-10">
      {/* BACKGROUND SHAPES */}
      <motion.div initial="hidden" animate="visible" variants={fadeScaleIn}>
        {/* Green circle */}
        <div className="absolute md:top-[1%] top-[2%] md:left-[5%] left-[10%] w-[80px] h-[80px] md:w-[135px] md:h-[135px] rounded-full bg-[#4FA971]" />

        {/* Yellow square */}
        <div className="absolute md:top-[25%] top-[25%] md:right-[4%] right-[4%] w-[80px] h-[80px] md:w-[130px] md:h-[140px] bg-[#FFEB3B] rounded-md" />

        {/* Blue quarter circle - FIX: Positioned relative to the bottom of the container */}
        <div className="absolute md:bottom-[5%] bottom-[6%] md:left-0 left-[5%] w-[80px] h-[60px] md:w-[130px] md:h-[130px] bg-[#6FB1FF] rounded-tl-full" />
      </motion.div>

      {/* MAIN RESUME IMAGE */}
      <motion.div
        custom={0.2}
        initial="hidden"
        animate="visible"
        variants={fadeScaleIn}
        className="absolute md:top-[16%] top-[16%] md:left-[15%] left-[18%] z-20 w-[70%] md:w-[350px]"
      >
        <Image
          src="/images/hero-resume.png"
          alt="Resume preview"
          width={350}
          height={450}
          className="rounded-xl shadow-xl w-full h-auto "
        />
      </motion.div>

      {/* PROFILE PHOTO */}
      <motion.div
        custom={0.6}
        initial="hidden"
        animate="visible"
        variants={fadeScaleIn}
        className="absolute md:top-[4%] top-[5%] md:left-[9%] left-[14%] z-30"
      >
        <Image
          src="/images/hero-profile.png"
          alt="Profile"
          width={93}
          height={93}
          className="rounded-full w-[55px] h-[55px] md:w-[93px] md:h-[93px]"
        />
      </motion.div>

      {/* RESUME SCORE BADGE */}
      <motion.div
        custom={0.8}
        initial="hidden"
        animate="visible"
        variants={fadeScaleIn}
        className="absolute top-[35%] left-0 z-30 bg-[rgba(79,169,113,0.18)] backdrop-blur-[2px] flex items-center gap-1 md:gap-3 px-2 py-1.5 md:px-4 md:py-3 rounded-md md:rounded-xl shadow-md   border-1 border-[#4FA971]"
      >
        <div className="bg-[#4FA971] text-white font-bold px-1.5 py-0.5 md:px-3 md:py-1 rounded-sm md:rounded-lg w-[32px] md:w-[50px] text-[10px] md:text-base text-center">
          <CountUp to={81} />%
        </div>
        <span className="font-semibold text-gray-900 text-[10px] md:text-base leading-tight">
          Resume
          <br />
          Score
        </span>
      </motion.div>

      {/* ATS BADGE */}
      <motion.div
        custom={0.8}
        initial="hidden"
        animate="visible"
        variants={fadeScaleIn}
        className="absolute top-[58%] right-0 md:right-[4%] z-30 bg-[rgba(59,130,246,0.18)] backdrop-blur-[2px] px-3 py-1.5 md:px-6 md:py-4 rounded-md md:rounded-xl shadow-md flex items-center gap-1 border-1 border-opacity-[40%] border-[#005FF2]"
      >
        <span className="inline-flex items-center gap-1 font-semibold text-gray-900 text-[10px] md:text-base">
          ATS Perfect+
          <Target className="w-3 h-3 md:w-4 md:h-4 text-[#005FF2]" />
        </span>
      </motion.div>

      {/* COLOR PALETTE - FIX: Bottom alignment */}
      <motion.div
        custom={0.8}
        initial="hidden"
        animate="visible"
        variants={fadeScaleIn}
        className="absolute md:bottom-[2%] md:right-[4%] bottom-[1%] right-0 z-30 w-[120px] md:w-[160px]"
      >
        <Image
          src="/images/color-palete.svg"
          alt="Color palette"
          width={160}
          height={120}
          className="rounded-xl shadow-lg w-full h-auto"
        />
      </motion.div>
    </div>
  );
}
