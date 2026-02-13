import CountUp from '@shared/ui/count-up';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import Image from 'next/image';

export default function HeroImgSection() {
  const fadeScaleIn = {
    hidden: {
      opacity: 0,
      scale: 0.9,
    },
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
    <div className="relative w-full max-w-[340px] md:max-w-[520px] h-[400px] md:h-[620px] mx-auto md:mb-10">
      {/* Green circle behind profile photo */}
      <motion.div initial="hidden" animate="visible" variants={fadeScaleIn}>
        <div
          className="absolute top-3 left-4.5 w-[65px] h-[65px] md:w-[135px] md:h-[135px]
 rounded-full bg-[#4FA971] "
        />
        {/* yellow square */}
        <div
          className="absolute top-[140px] right-6 md:right-0.5 w-[80px] h-[80px] md:w-[130px] md:h-[140px]
 bg-[#FFEB3B] rounded-md"
        />
        {/* Light blue quarter circle */}
        <div
          className="absolute bottom-20  top-75 md:top-118 md:bottom-[120px] w-[80px] h-[60px] md:w-[140px] md:h-[130px]
 bg-[#6FB1FF] rounded-tl-full"
        />
      </motion.div>

      {/* Resume image */}
      <motion.div
        custom={0.2}
        initial="hidden"
        animate="visible"
        variants={fadeScaleIn}
        className="absolute top-14 md:top-[18%] left-[15%] z-20"
      >
        <Image
          src="/images/hero-resume.png"
          alt="Resume preview"
          width={350}
          height={450}
          className="rounded-xl shadow-xl w-[75%] md:w-[350px] h-auto"
        />
      </motion.div>

      <motion.div
        custom={0.6}
        initial="hidden"
        animate="visible"
        variants={fadeScaleIn}
        className="absolute top-5 left-6.5 md:top-8 md:left-10 z-30"
      >
        <Image
          src="/images/hero-profile.png"
          alt="Profile"
          width={93}
          height={93}
          className="rounded-full w-[50px] h-[50px] md:w-[93px] md:h-[93px]"
        />
      </motion.div>

      {/* Resume score badge */}
      <motion.div
        custom={0.8}
        initial="hidden"
        animate="visible"
        variants={fadeScaleIn}
        className="absolute top-[120px] md:top-[220px] left-0 z-30 bg-[rgba(79,169,113,0.18)] backdrop-blur-[2px] flex items-center gap-1 md:gap-3 px-2 py-1.5 md:px-4 md:py-3 rounded-md md:rounded-xl shadow-md border border-white/30"
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

      <motion.div
        custom={0.8}
        initial="hidden"
        animate="visible"
        variants={fadeScaleIn}
        className="absolute top-60 md:top-100 right-0 z-30 bg-[rgba(59,130,246,0.18)] backdrop-blur-[2px] px-3 py-1.5 md:px-6 md:py-4 rounded-md md:rounded-xl shadow-md flex items-center gap-1"
      >
        <span className="inline-flex items-center gap-1 font-semibold text-gray-900 text-[10px] md:text-base">
          ATS Perfect+
          <Target className="w-3 h-3 md:w-4 md:h-4" />
        </span>
      </motion.div>

      <motion.div
        custom={0.8}
        initial="hidden"
        animate="visible"
        variants={fadeScaleIn}
        className="absolute bottom-[20px] top-70 md:top-130 md:bottom-0 right-0 z-30"
      >
        <Image
          src="/images/color-palete.svg"
          alt="Color palette"
          width={160}
          height={120}
          className="rounded-xl shadow-lg "
        />
      </motion.div>
    </div>
  );
}
