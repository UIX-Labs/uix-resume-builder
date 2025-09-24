'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/components/button';
import { useCachedUser } from '@shared/hooks/use-user';

const HeroSection = () => {
  const router = useRouter();
  const user = useCachedUser();

  const handleNavigate = () => {
    router.push(user ? '/dashboard' : '/auth');
  };

  const overlays = [
    {
      id: 'resume-score',
      content: (
        <div className="overlay-item z-10 opacity-[100%]">
          <img src="images/resume-score-img.svg" alt="Hired at Meta" className="w-full h-auto" />
        </div>
      ),
      position: { top: '-30%', left: '-6%' },
      initial: { x: -300, y: -300, opacity: 0 },
    },

    {
      id: 'custom-templates',
      content: (
        <div className="overlay-item overflow-hidden z-10 rounded-3xl glass-card1">
          <img src="images/templates.svg" alt="Template 1" />
        </div>
      ),
      position: { top: '80%', left: '-7%' },
      width: 420,
      rotate: 12,
      initial: { rotate: 12, x: -400, y: 200, opacity: 0 },
    },

    {
      id: 'colors',
      content: (
        <div className="glass-card overlay-item bg-white/20 rounded-2xl">
          <img src="images/color-palete.svg" alt="Hired at Meta" className="w-full h-auto" />
        </div>
      ),
      position: { top: '-22%', right: '-8%' },
      width: 250,
      initial: { rotate: 25, x: 400, y: -200, opacity: 0 },
    },

    {
      id: 'hired',
      content: (
        <div className="overlay-item">
          <img src="images/image-hired.svg" alt="Hired at Meta" className="w-full h-auto" />
        </div>
      ),
      position: { top: '80%', right: '-7%' },
      width: 300,
      rotate: -15,
      initial: { rotate: -15, x: 400, y: 300, opacity: 0 },
    },
  ];

  return (
    <section className="relative w-full h-full">
      <div className="max-w-7xl mx-auto relative text-center">
        <div className="flex items-center justify-center gap-3 mt-28">
          <div className="flex -space-x-2">
            <Avatar className="w-12 h-12 border-2 border-white">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="text-black">JD</AvatarFallback>
            </Avatar>

            <Avatar className="w-12 h-12 border-2 border-white">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="text-black">SM</AvatarFallback>
            </Avatar>

            <Avatar className="w-12 h-12 border-2 border-white">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="text-black">AR</AvatarFallback>
            </Avatar>
          </div>

          <span className="font-semibold text-lg ml-3 text-gray-900">Trusted by 500 professionals</span>
        </div>

        <div>
          <h1 className="text-[80px] md:text-7xl font-semibold text-foreground mb-4 leading-tight">
            Build a <span className="text-blue-800 font-[900]">Professional</span>
            <br />
            <span className="block -mt-8 mx-auto w-fit px-[53px] rounded-full text-[rgba(0,137,65,1)] font-[900] backdrop-blur-xs bg-[rgba(0,242,85,0.2)] border border-white shadow-lg">
              Resume
            </span>
          </h1>

          <p className="text-[37px] md:text-4xl font-semibold text-foreground">in under 3 minutes</p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-[16px]">
          <Button
            onClick={handleNavigate}
            className="py-8 px-6 bg-blue-900 border-2 border-white text-white text-[32px] font-semibold rounded-xl hover:bg-blue-700 hover:shadow-xl transition-all duration-300 hover:scale-105 shadow-[0_1px_2px_0_rgba(0,0,0,0.04)] cursor-pointer
"
          >
            Auto-fill via LinkedIn
          </Button>

          <Button
            onClick={handleNavigate}
            className="py-8 px-6 bg-gradient-to-l from-white to-[rgb(224,224,224)] text-black text-2xl font-semibold rounded-xl border-2 border-white hover:bg-gray-100 hover:scale-105 shadow-[0_1px_2px_0_rgba(0,0,0,0.04)] transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Upload existing resume
          </Button>
        </div>

        {overlays.map((overlay, i) => (
          <motion.div
            key={overlay.id}
            className="overlay-item absolute"
            style={{
              top: overlay.position.top,
              left: overlay.position.left,
              right: overlay.position.right,
              width: overlay.width ? `${overlay.width}px` : 'auto',
            }}
            initial={overlay.initial}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{
              duration: 1,
              ease: 'easeOut',
            }}
          >
            {overlay.content}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
