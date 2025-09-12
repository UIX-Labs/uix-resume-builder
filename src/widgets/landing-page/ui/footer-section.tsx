"use client";

import { motion } from "framer-motion";
import { Button } from "@/shared/ui/components/button";
import Image from "next/image";
import FooterNavigation from "./footer-navigation";

const FooterSection = () => {
  const overlays = [
    {
      id: "colors",
      content: (
        <div className="glass-card overlay-item bg-white/20 rounded-2xl">
          <img
            src="images/color-palete.svg"
            alt="Hired at Meta"
            className="w-full h-auto"
          />
        </div>
      ),
      position: { top: "-1%", left: "2%" },
      width: 250,
      initial: { rotate: -25, x: 400, y: -200, opacity: 0 },
    },
    {
      id: "google",
      content: (
        <div className="flex items-center bg-white/30 backdrop-blur-sm rounded-full p-2 shadow-[0px_10px_10px_rgba(0,0,0,0.1)] glass-card">
          <div className="bg-white rounded-full p-2">
            <div className="flex items-center gap-[9px]">
              <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[rgba(255,241,200,1)]">
                <div className="relative w-[26px] h-[26px]">
                  <Image
                    src="images/google-logo.svg"
                    alt="google"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <span className="text-gray-700 font-medium">Google</span>
            </div>
          </div>
        </div>
      ),
      position: { top: "8%", left: "32%" },
      width: 140,
      initial: { rotate: 15, x: 200, y: -150, opacity: 0 },
    },
    {
      id: "microsoft",
      content: (
        <div className="flex items-center bg-white/30 backdrop-blur-sm rounded-full p-2 shadow-[0px_10px_10px_rgba(0,0,0,0.1)] glass-card">
          <div className="bg-white rounded-full p-2">
            <div className="flex items-center gap-[9px]">
              <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[rgba(197,255,156,1)]">
                <div className="relative w-[26px] h-[26px]">
                  <Image
                    src="images/microsoft-logo.svg"
                    alt="microsoft"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <span className="text-gray-700 font-medium">Microsoft</span>
            </div>
          </div>
        </div>
      ),
      position: { top: "1%", right: "35%" },
      width: 150,
      initial: { rotate: -24, x: 300, y: -100, opacity: 0 },
    },
    {
      id: "apple",
      content: (
        <div className="flex items-center bg-white/30 backdrop-blur-sm rounded-full p-2 shadow-[0px_10px_10px_rgba(0,0,0,0.1)] glass-card">
          <div className="bg-white rounded-full p-2">
            <div className="flex items-center gap-[9px]">
              <div className="w-9 h-9 rounded-full flex items-center justify-center bg-black">
                <div className="relative w-[26px] h-[26px]">
                  <Image
                    src="images/apple-logo.svg"
                    alt="apple"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <span className="text-gray-700 font-medium">Apple</span>
            </div>
          </div>
        </div>
      ),
      position: { top: "25%", right: "45%" },
      width: 120,
      initial: { rotate: 13, x: 250, y: 100, opacity: 0 },
    },
    {
      id: "meta",
      content: (
        <div className="absolute flex items-center bg-white/30 backdrop-blur-sm rounded-full p-2 shadow-[0px_10px_10px_rgba(0,0,0,0.1)] glass-card ">
          <div className="bg-white rounded-full p-2">
            <div className="flex items-center gap-[9px]">
              <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[rgba(214,235,255,1)]">
                <div className="relative w-[26px] h-[26px]">
                  <Image
                    src="images/meta-logo.svg"
                    alt="meta"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <span className="text-gray-700 font-medium">Meta</span>
            </div>
          </div>
        </div>
      ),
      position: { top: "48%", left: "5%" },
      width: 110,
      initial: { rotate: -10, x: -200, y: 200, opacity: 0 },
    },
    {
      id: "amazon",
      content: (
        <div className="absolute flex items-center bg-white/30 backdrop-blur-sm rounded-full p-2 shadow-[0px_10px_10px_rgba(0,0,0,0.1)] glass-card">
          <div className="bg-white rounded-full p-2">
            <div className="flex items-center gap-[9px]">
              <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[rgba(255,241,200,1)]">
                <div className="relative w-[26px] h-[26px]">
                  <Image
                    src="images/amazon-logo.svg"
                    alt="amazon"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <span className="text-gray-700 font-medium">Amazon</span>
            </div>
          </div>
        </div>
      ),
      position: { top: "42%", right: "5%" },
      width: 130,
      initial: { rotate: 10, x: 300, y: 50, opacity: 0 },
    },
    {
      id: "nvidia",
      content: (
        <div className="flex items-center bg-white/30 backdrop-blur-sm rounded-full p-2 shadow-[0px_10px_10px_rgba(0,0,0,0.1)] glass-card">
          <div className="bg-white rounded-full p-2">
            <div className="flex items-center gap-[9px]">
              <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[rgba(197,255,156,1)]">
                <div className="relative w-[26px] h-[26px]">
                  <Image
                    src="images/nvidia-logo.svg"
                    alt="nvidia"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <span className="text-gray-700 font-medium">Nvidia</span>
            </div>
          </div>
        </div>
      ),
      position: { top: "62%", right: "8%" },
      width: 125,
      initial: { rotate: -10, x: 350, y: 150, opacity: 0 },
    },
  ];

  return (
    <section className="relative w-full h-full flex flex-col">
      <div className="w-[1408px] mx-auto relative flex-1 flex flex-col px-16">
        <div className="flex justify-end pb-8 mt-[64px]">
          <FooterNavigation />
        </div>

        <div className="flex-1 flex items-center justify-center relative z-20">
          <div className="text-center">
            <h1 className="text-[80px] md:text-7xl font-semibold text-foreground mb-4 leading-tight">
              Right <span className="text-blue-800 font-[900]">Resume</span>
              <br />
              <span className="block -mt-8 mx-auto w-fit px-[49px] rounded-full text-[rgba(0,137,65,1)] font-[900] backdrop-blur-xs bg-[rgba(0,242,85,0.2)] border border-white shadow-lg">
                Right Opportunity
              </span>
            </h1>

            <div className="mt-10 flex flex-col items-center gap-[10px]">
              <Button className="py-8 px-6 bg-blue-900 border-2 border-white text-white text-[32px] font-semibold rounded-[12px] hover:bg-blue-700 hover:shadow-xl transition-all duration-300 hover:scale-105 shadow-[0_1px_2px_0_rgba(0,0,0,0.04)] mb-[88px]">
                Create My Resume
              </Button>
            </div>
          </div>
        </div>

        <div className="pb-8">
          <div className="w-full h-px bg-[#C9C9C9] mb-9"></div>

          <div className="flex flex-row justify-between items-end">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-[#0B0A09]">
                Resume Builder
              </h2>
              <div className="flex items-center gap-1 bg-[#02A44F] text-white text-xs font-bold px-3 py-1 rounded-full">
                <span>AI Powered</span>
                <Image
                  src="/images/auto_awesome.svg"
                  alt="AI Powered"
                  width={17}
                  height={17}
                />
              </div>
            </div>

            <div className="text-right">
              <p className="text-[#7D7D7D] text-xl font-normal leading-relaxed">
                Made with love by people who care. © 2025. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        {overlays.map((overlay, i) => (
          <motion.div
            key={overlay.id}
            className="overlay-item absolute z-30"
            style={{
              top: overlay.position.top,
              left: overlay.position.left,
              right: overlay.position.right,
              width: overlay.width ? `${overlay.width}px` : "auto",
            }}
            initial={overlay.initial}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
              delay: i * 0.1,
            }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            drag
            dragConstraints={{
              left: -200,
              top: -200,
              right: 400,
              bottom: 0,
            }}
          >
            {overlay.content}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FooterSection;
