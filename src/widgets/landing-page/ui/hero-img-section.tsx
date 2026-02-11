import CountUp from '@shared/ui/count-up';
import { motion } from 'framer-motion';
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
    <div className="relative w-full max-w-[520px] h-[520px] md:h-[620px] mt-10">
      {/* Green circle behind profile photo */}
      <motion.div initial="hidden" animate="visible" variants={fadeScaleIn}>
        <div
          className="absolute top-3 left-4.5 w-[65px] h-[65px] md:w-[135px] md:h-[135px]
 rounded-full bg-[#4FA971] "
        />
        {/* yellow square */}
        <div
          className="absolute top-[140px] right-0.5 w-[80px] h-[80px] md:w-[130px] md:h-[140px]
 bg-[#FFEB3B] rounded-md"
        />
        {/* Light blue quarter circle */}
        <div
          className="absolute bottom-35  top-115 w-[80px] h-[60px] md:w-[140px] md:h-[130px]
 bg-[#6FB1FF] rounded-tl-full"
        />
      </motion.div>

      {/* Resume image */}
      <motion.div
        custom={0.2}
        initial="hidden"
        animate="visible"
        variants={fadeScaleIn}
        className="absolute top-[16%] left-[15%] z-20"
      >
        <Image
          src="/images/hero-resume.png"
          alt="Resume preview"
          width={350}
          height={450}
          className="rounded-xl shadow-xl "
        />
      </motion.div>

      <motion.div
        custom={0.6}
        initial="hidden"
        animate="visible"
        variants={fadeScaleIn}
        className="absolute top-8 left-10 z-30"
      >
        <Image src="/images/hero-profile.png" alt="Profile" width={93} height={93} className="rounded-full" />
      </motion.div>

      {/* Resume score badge */}

      <motion.div
        custom={0.8}
        initial="hidden"
        animate="visible"
        variants={fadeScaleIn}
        className="absolute top-[220px] left-0 z-30 bg-[rgba(79,169,113,0.18)] backdrop-blur-[2px] flex items-center gap-3 px-4 py-3 rounded-xl shadow-md border border-white/30"
      >
        <div className="bg-[#4FA971] text-white font-bold px-3 py-1 rounded-lg w-[50px] text-center">
          <CountUp to={81} />%
        </div>
        <span className="font-semibold text-gray-900 leading-tight">
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
        className="absolute bottom-[180px] right-0 z-30 bg-[rgba(59,130,246,0.18)] backdrop-blur-[2px]  border-blue-200 px-6 py-4 rounded-xl shadow-md flex items-center gap-2"
      >
        <span className="font-semibold text-gray-900">
          ATS Perfect+ <Image src="/images/target-blue.png" alt="ATS Perfect " width={20} height={20} />
        </span>
      </motion.div>

      <motion.div
        custom={0.8}
        initial="hidden"
        animate="visible"
        variants={fadeScaleIn}
        className="absolute bottom-0 right-0 z-30"
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
