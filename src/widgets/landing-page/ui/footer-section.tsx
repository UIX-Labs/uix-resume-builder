"use client";

import { motion } from "framer-motion";
import { Button } from "@/shared/ui/components/button";
import Image from "next/image";
import FooterNavigation from "./navigation-footer";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useCachedUser } from "@shared/hooks/use-user";
import { useIsMobile } from "@shared/hooks/use-mobile";
import { MobileTextView } from "./mobile-text-view";

const FooterSection = () => {
  const router = useRouter();
  const user = useCachedUser();
  const isMobile = useIsMobile();
  const [showMobileView, setShowMobileView] = useState(false);

  const handleNavigate = () => {
    if (isMobile) {
      setShowMobileView(true);
    } else {
      router.push(user ? "/dashboard" : "/auth");
    }
  };
  const overlays = [
    {
      id: "colors",
      content: (
        <div className="glass-card overlay-item bg-white/20 rounded-2xl">
          <img
            src="https://res.cloudinary.com/dkxocdrky/image/upload/v1765473838/color-palete_iwyzvj.svg"
            alt="Hired at Meta"
            className="w-full h-auto"
          />
        </div>
      ),
      desktopPosition: { top: '-1%', left: '2%' },
      mobilePosition: { top: '2%', left: '2%' },
      mobileWidth: 90,
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
                    src="https://res.cloudinary.com/dkxocdrky/image/upload/v1765473837/google-logo_c1xk5c.svg"
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
      desktopPosition: { top: '8%', left: '32%' },
      mobilePosition: { top: '12%', right: '2%' },
      mobileWidth: 70,
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
                    src="https://res.cloudinary.com/dkxocdrky/image/upload/v1765473837/microsoft-logo_ir83qh.svg"
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
      desktopPosition: { top: '1%', right: '35%' },
      mobilePosition: { top: '5%', right: '5%' },
      mobileWidth: 75,
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
                    src="https://res.cloudinary.com/dkxocdrky/image/upload/v1765473847/apple-logo_v7tcjv.svg"
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
      desktopPosition: { top: '25%', right: '45%' },
      mobilePosition: { top: '30%', right: '2%' },
      mobileWidth: 65,
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
                    src="https://res.cloudinary.com/dkxocdrky/image/upload/v1765473845/meta-logo_cm0zv5.svg"
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
      desktopPosition: { top: '48%', left: '5%' },
      mobilePosition: { bottom: '35%', left: '2%' },
      mobileWidth: 60,
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
                    src="https://res.cloudinary.com/dkxocdrky/image/upload/v1765473839/amazon-logo_ezflww.svg"
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
      desktopPosition: { top: '42%', right: '5%' },
      mobilePosition: { bottom: '25%', right: '5%' },
      mobileWidth: 70,
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
                    src="https://res.cloudinary.com/dkxocdrky/image/upload/v1765473846/nvidia-logo_ohdrwd.svg"
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
      desktopPosition: { top: '62%', right: '8%' },
      mobilePosition: { bottom: '12%', left: '5%' },
      mobileWidth: 65,
      width: 125,
      initial: { rotate: -10, x: 350, y: 150, opacity: 0 },
    },
  ];

  return (
    <section className="relative w-full h-full flex flex-col min-h-[100vh] md:min-h-0">
      <div className="w-full max-w-[1408px] mx-auto relative flex-1 flex flex-col px-4 sm:px-8 lg:px-16 py-8 lg:py-0">
        <div className="flex justify-center md:justify-end pb-4 sm:pb-8 mt-8 sm:mt-12 lg:mt-[64px]">
          <FooterNavigation />
        </div>

        <div className="flex-1 flex items-center justify-center relative z-20">
          <div className="text-center">
            <h1 className="text-[40px] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-semibold text-foreground mb-4 leading-tight whitespace-nowrap">
              Right <span className="text-blue-800 font-black">Resume</span>
              <br />
              <span className="text-[28px] md:text-[80px] block -mt-2 sm:-mt-4 md:-mt-6 lg:-mt-8 mx-auto w-fit px-4 sm:px-6 md:px-8 lg:px-[49px] py-1 sm:py-0 rounded-full text-[rgba(0,137,65,1)] font-black backdrop-blur-xs bg-[rgba(0,242,85,0.2)] border border-white shadow-lg">
                Right Opportunity
              </span>
            </h1>

            <div className="mt-6 sm:mt-8 lg:mt-10 flex flex-col items-center gap-[10px]">
              <Button
                onClick={handleNavigate}
                className="py-5 px-4 sm:py-4 sm:px-5 lg:py-8 lg:px-6 bg-blue-900 border-2 border-white text-white text-base sm:text-xl md:text-2xl lg:text-[32px] font-semibold rounded-xl hover:bg-blue-700 hover:shadow-xl transition-all duration-300 hover:scale-105 shadow-[0_1px_2px_0_rgba(0,0,0,0.04)] mb-8 sm:mb-12 lg:mb-[88px]"
              >
                Create My Resume
              </Button>
            </div>
          </div>
        </div>

        <div className="pb-4 sm:pb-6 lg:pb-8">
          <div className="w-full h-px bg-[rgb(201,201,201)] mb-4 sm:mb-6 lg:mb-9"></div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-0">
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-semibold text-[rgb(11,10,9)]">
                PikaResume
              </h2>

              <div className="flex items-center gap-1 bg-[rgb(2,164,79)] text-white text-xs font-bold px-3 py-1 rounded-full">
                <span>AI Powered</span>
                <Image
                  src="https://res.cloudinary.com/dkxocdrky/image/upload/v1765473863/auto_awesome_fi5kfd.svg"
                  alt="AI Powered"
                  width={17}
                  height={17}
                />
              </div>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-[rgb(125,125,125)] text-sm sm:text-base lg:text-xl font-normal leading-relaxed">
                Made with love by people who care. © 2025. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Overlays */}
        {overlays.map((overlay, i) => (
          <motion.div
            key={overlay.id}
            className="overlay-item absolute z-30 hidden lg:block"
            style={{
              top: overlay.desktopPosition.top,
              left: overlay.desktopPosition.left,
              right: overlay.desktopPosition.right,
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
              left: -600,
              top: -400,
              right: 800,
              bottom: 400,
            }}
          >
            {overlay.content}
          </motion.div>
        ))}

        {/* Mobile Overlays
        {overlays.map((overlay, i) => (
          <motion.div
            key={`${overlay.id}-mobile`}
            className="overlay-item absolute z-30 block lg:hidden"
            style={{
              top: overlay.mobilePosition?.top || "auto",
              bottom: overlay.mobilePosition?.bottom || "auto",
              left: overlay.mobilePosition?.left || "auto",
              right: overlay.mobilePosition?.right || "auto",
              width: overlay.mobileWidth
                ? `${overlay.mobileWidth}px`
                : overlay.width
                ? `${overlay.width}px`
                : "auto",
            }}
            initial={overlay.initial}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
              delay: i * 0.1,
            }}
          >
            {overlay.content}
          </motion.div>
        ))} */}

        {isMobile && (
          <MobileTextView
            isOpen={showMobileView}
            onClose={() => setShowMobileView(false)}
          />
        )}
      </div>
    </section>
  );
};

export default FooterSection;
