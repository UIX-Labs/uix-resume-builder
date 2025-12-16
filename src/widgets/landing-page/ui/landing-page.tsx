import React from "react";
import HeroSection from "./hero-section";
import Image from "next/image";
import Header from "./header-section";
import { BACKGROUNDS } from "@shared/lib/image-assets";

function LandingPage() {
  return (
    <div className="relative w-full h-full">
      <Image
        src={BACKGROUNDS.LANDING_PAGE}
        alt="Background"
        fill
        className="object-cover -z-10"
        priority
      />
      <Header />

      <div
        className="h-[724px] border-2 border-white rounded-[36px] m-4 mt-0 overflow-hidden"
        style={{
          background: "radial-gradient(circle, #ccc 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      >
        {" "}
        <HeroSection />
      </div>
    </div>
  );
}

export default LandingPage;
