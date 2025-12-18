"use client";

import Image from "next/image";
import { Button } from "@shared/ui/button";
import { ArrowDown } from "lucide-react";
import { HeaderSection } from "./header-section";

export const RoastFirstSection = () => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden flex flex-col font-sans">

      {/* Sticky Header */}
      <HeaderSection />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center flex-1 px-5 pt-24 w-full">
        {/* Logo (Hero) */}
        {/* <div className="md:hidden flex flex-col items-center justify-center mb-14">
          <Image
            src={"/images/mobile-logo.png"}
            alt="AI"
            width={200}
            height={70}
            className="inline-block"
          />
        </div> */}

        {/* Text Content */}
        <div className="flex flex-col items-center text-center w-full max-w-md relative mt-10">
          <h1 className="text-white text-[32px] md:text-6xl md:font-semibold md:w-200 font-normal leading-[1.2] mb-4 md:mb-6 z-20 relative">
            Think your <br /> resume is strong?
          </h1>

          {/* Blurred Text Layer */}

          <div className="absolute top-[40px] md:top-[100px] w-[250px] h-[160px] md:w-[350px] md:h-[200px]  flex flex-col items-center justify-center select-none pointer-events-none z-0">
            <Image
              src={"/images/backimg.png"}
              alt="AI"
              fill
              className="inline-block"
            />
          </div>
        
          {/* Foreground Text */}
          <div className="relative z-10 mt-24 flex flex-col items-center w-full">
            <p className="text-[#FFA855] text-lg md:text-3xl font-medium mb-2">
              Let's see if it survives a
            </p>
            {/* ROAST Image */}
            <div className="relative w-[280px] mb-5 md:w-[420px] md:h-[120px]">
              <Image
                src="/images/ROAST.png"
                alt="ROAST"
                width={300}
                height={300}
                className="block md:hidden max-w-[280px]"
                // priority
              />

              <Image
                src="/images/roast-desktop.png"
                alt="AI"
                fill
                className="hidden md:block object-contain"
              />
            </div>

            {/* Button */}
            <Button
              onClick={() => {
                const element = document.getElementById("roast-roasts-section");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="rounded-[12px] text-[#FF9A3A] px-3 py-2 md:px-7 md:h-17 text-base font-bold transition-all shadow-[0_1px_2px_0_rgba(0,0,0,0.04)] inline-flex justify-center items-center gap-1 group w-auto hover:opacity-90 md:text-3xl"
              style={{
                background:
                  "linear-gradient(#200E02, #200E02) padding-box, linear-gradient(180deg, #4A280E  0%, #FFDF10 100%) border-box",
                border: "2px solid transparent",
                borderRadius: "12px",
              }}
            >
              See resume roasts{" "}
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
