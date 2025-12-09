"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

export function VideoBackground() {
  const [activeVideo, setActiveVideo] = useState<"video1" | "video2">("video1");
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoSources = {
    video1: "/videos/video-2.mp4",
    video2: "/videos/video-1.mp4",
  };

  const handleToggleSwitch = () => {
    setActiveVideo(activeVideo === "video1" ? "video2" : "video1");
  };

  const handleVideoEnded = () => {
    setActiveVideo(activeVideo === "video1" ? "video2" : "video1");
  };

  return (
    <div className="relative h-[100vh] video-container w-[50%] overflow-hidden ml-2">
      <video
        ref={videoRef}
        onEnded={handleVideoEnded}
        className="absolute inset-0 h-full w-full object-cover"
        key={activeVideo}
        autoPlay
        muted
        playsInline
      >
        <source src={videoSources[activeVideo]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {activeVideo === "video1" && (
        <div className="absolute inset-0 flex items-baseline justify-center pt-50 z-10 pointer-events-none">
          <div className="text-end px-6 max-w-md video-overlay-text p-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <h2 className="text-[19px] -tracking-[0.109px] leading-normal font-black highlighted-gradient-text">
                Opportunities{" "}
                <span className="text-sm font-normal">don't knock</span>
              </h2>
              <h2 className="text-[19px] -tracking-[0.109px] leading-normal font-black highlighted-gradient-text">
                You Build A Resume
              </h2>
              <p className="text-sm font-normal highlighted-gradient-text">
                that opens the door
              </p>

              <div className="flex items-center justify-center gap-3 mt-6">
                <span className="w-8 h-[1px] bg-gradient-to-r from-[rgba(15,27,28,0)] to-[rgb(226,226,226)] opacity-40 block"></span>

                <div className="w-5 h-5 rounded-full bg-white/20 backdrop-blur-sm"></div>

                <div className="text-white text-start subtle-gradient-text text-[10px]">
                  <p className="font-semibold text-[10px]">Team</p>
                  <p className="">Founder PikaResume</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {activeVideo === "video2" && (
        <div className="absolute inset-0 z-10 flex items-baseline justify-center pt-50 pointer-events-none">
          <div className="text-start px-6 max-w-md video-overlay-text">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className=""
            >
              <h2 className="text-[19px] -tracking-[0.109px] leading-normal font-black highlighted-gradient-text">
                Your Career <span className="text-sm font-normal">journey</span>
              </h2>

              <h2 className="text-[19px] -tracking-[0.109px] leading-normal font-black text-white highlighted-gradient-text ml-3">
                Deserves A Destination
              </h2>

              <p className="highlighted-gradient-text text-sm font-normal ml-[95px]">
                we will get you there
              </p>

              <div className="flex items-center justify-center gap-3 mt-6 ml-[100px]">
                <span className="w-8 h-[1px] bg-gradient-to-r from-[rgba(15,27,28,0)] to-[rgb(226,226,226)] opacity-40 block"></span>

                <div className="w-5 h-5 rounded-full bg-white/20 backdrop-blur-sm"></div>

                <div className="text-white text-start subtle-gradient-text text-[10px]">
                  <p className="font-semibold text-[10px]">Team</p>
                  <p className="">Founder PikaResume</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      <div className="absolute top-8 right-25 transform -translate-x-1/2 flex gap-2 items-center">
        {activeVideo === "video2" && (
          <div className="bg-gray-1000 w-3 h-3 rounded-full backdrop-blur-md border-t border-b border-white/70 transition-all duration-300 z-20 rotate-45"></div>
        )}

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={activeVideo === "video2"}
            onChange={handleToggleSwitch}
          />

          <div
            className="w-8 h-3 bg-gray-700 rounded-full peer
            transition-all duration-300 shadow-inner border border-amber-50"
          ></div>

          <span
            className="absolute left-0.5 top-1/2 -translate-y-1/2 bg-[rgba(13,20,22,1)] w-[13px] h-2 rounded-full 
             shadow-md transform peer-checked:translate-x-4 transition-all duration-300"
          ></span>
        </label>

        {activeVideo === "video1" && (
          <div className="bg-gray-1000 w-3 h-3 rounded-full backdrop-blur-md border-t border-b border-white/70 shadow-sm transition-all duration-300 -rotate-45"></div>
        )}
      </div>
    </div>
  );
}
