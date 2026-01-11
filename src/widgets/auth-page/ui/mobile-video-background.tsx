'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@shared/lib/utils';

interface MobileHeroVideoProps {
  isIntro: boolean;
}

export default function MobileHeroVideo({ isIntro }: MobileHeroVideoProps) {
  const [activeVideo, setActiveVideo] = useState<'video1' | 'video2'>('video1');
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoSources = {
    video1: '/videos/video-2.mp4',
    video2: '/videos/video-1.mp4',
  };

  const handleVideoEnded = () => {
    setActiveVideo((prev) => (prev === 'video1' ? 'video2' : 'video1'));
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <video
        ref={videoRef}
        key={activeVideo}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnded}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoSources[activeVideo]} type="video/mp4" />
      </video>

      {activeVideo === 'video1' && (
        <div
          className={cn(
            'absolute inset-0 z-10 flex items-end justify-center pb-6 pointer-events-none',
            !isIntro && 'video-overlay-text',
          )}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center px-4"
          >
            <h2 className="text-sm font-black highlighted-gradient-text">
              Opportunities <span className="font-normal">don't knock</span>
            </h2>
            <h2 className="text-sm font-black highlighted-gradient-text">You Build A Resume</h2>
            <p className="text-xs highlighted-gradient-text">that opens the door</p>
          </motion.div>
        </div>
      )}

      {activeVideo === 'video2' && (
        <div
          className={cn(
            'absolute inset-0 z-10 flex items-end justify-center pb-6 pointer-events-none',
            !isIntro && 'video-overlay-text',
          )}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center px-4"
          >
            <h2 className="text-sm font-black highlighted-gradient-text">
              Your Career <span className="font-normal">journey</span>
            </h2>
            <h2 className="text-sm font-black highlighted-gradient-text">Deserves A Destination</h2>
            <p className="text-xs highlighted-gradient-text">we will get you there</p>
          </motion.div>
        </div>
      )}
    </div>
  );
}
