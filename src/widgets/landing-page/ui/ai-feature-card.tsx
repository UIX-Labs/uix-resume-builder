'use client';

import { cn } from '@shared/lib/cn';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const TRANSITION = 'transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.3,0,0.2,1)]';

interface AiFeatureCardProps {
  id: 'left' | 'right';
  badge: string;
  title: string;
  description: string;
  variant?: 'blue' | 'green';
  isHovered: boolean;
  isOtherHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

const cardImages = {
  left: {
    default: '/images/resume-preview-image1.png',
    hovered: '/images/resume-preview-img2.png',
  },
  right: {
    default: '/images/kate_resume.png',
    hovered: '/images/kate_enlarged resume.png',
  },
} as const;

export function AiFeatureCard({
  id,
  badge,
  title,
  description,
  variant = 'blue',
  isHovered,
  isOtherHovered,
  onHover,
  onLeave,
}: AiFeatureCardProps) {
  const isBlue = variant === 'blue';
  const images = cardImages[id];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(hover: none)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // On mobile, we force isExpanded to false so it stays in its default state
  const isExpanded = !isMobile && isHovered;

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={`${title} feature`}
      // Interaction only enabled for desktop
      onMouseEnter={!isMobile ? onHover : undefined}
      onMouseLeave={!isMobile ? onLeave : undefined}
      onFocus={!isMobile ? onHover : undefined}
      onBlur={!isMobile ? onLeave : undefined}
      // Removed "whileInView" and "viewport" to kill mobile scroll animations
      // Card is immediately visible or uses a standard initial state
      initial={{ opacity: 1, y: 0 }}
      className={cn(
        `
        relative overflow-hidden
        rounded-3xl border
        px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10
        min-h-[225.12px] sm:min-h-[380px] md:min-h-[450px]
        shadow-sm cursor-pointer outline-none
        ring-offset-2 focus-visible:ring-2 focus-visible:ring-blue-500
        ${TRANSITION}
        `,
        isExpanded
          ? cn('shadow-xl border-transparent', isBlue ? 'bg-blue-600' : 'bg-green-500', 'md:flex-[1.3]')
          : cn(
              'bg-[#F3F4F8] bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:16px_16px] border-gray-200/60',
              // Only apply flex shrinking on desktop when the other card is hovered
              !isMobile && isOtherHovered ? 'md:flex-[0.8]' : 'md:flex-1',
            ),
      )}
    >
      {/* TEXT CONTENT */}
      <div className="relative z-10 pt-4 w-full sm:w-[280px] md:w-[403px] transition-colors duration-[400ms]">
        <span
          className={cn(
            'inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 md:py-1.5 text-[9px] sm:text-xs md:text-sm font-semibold mb-2 sm:mb-4 md:mb-6 w-fit',
            isExpanded
              ? cn('bg-white', isBlue ? 'text-blue-600' : 'text-green-500')
              : isBlue
                ? 'bg-blue-600 text-white'
                : 'bg-green-500 text-white',
          )}
        >
          <div
            className="w-3 h-3 sm:w-4 sm:h-4 relative"
            style={{
              filter: isExpanded
                ? isBlue
                  ? 'invert(37%) sepia(93%) saturate(4528%) hue-rotate(209deg) brightness(97%) contrast(91%)'
                  : 'invert(64%) sepia(71%) saturate(2247%) hue-rotate(85deg) brightness(95%) contrast(87%)'
                : 'brightness(0) invert(1)',
            }}
          >
            <Image src="/images/sparkles.svg" alt="" fill className="object-contain" />
          </div>
          {badge}
        </span>

        <h3
          className={cn(
            'font-semibold !leading-[1.2] sm:mb-4 md:mb-[30px]',
            'text-xl tracking-[-0.576px] w-[203.1px] sm:w-full',
            'sm:text-[20px] md:text-[40px] md:tracking-[-0.03em]',
            isExpanded ? 'text-white' : 'text-[#171717]',
          )}
        >
          {title}
        </h3>

        <div className="mt-2 md:mt-0">
          <p
            className={cn(
              'text-[16px] font-regular sm:text-lg !leading-[19px] mt-2 md:-mt-2 tracking-[-0.461px] w-[203.1px] sm:w-full',
              'sm:text-lg  md:text-3xl sm:!leading-[1.5] md:leading-[40px] md:tracking-[-0.03em]',
              isExpanded ? 'text-white/90' : 'text-[#171717]',
            )}
          >
            {description}
          </p>
        </div>
      </div>

      {/* IMAGE PREVIEW */}
      {(!isOtherHovered || isMobile) && (
        <>
          {id === 'left' && (
            <div
              className={cn(
                'absolute pointer-events-none',
                'top-1/2 -translate-y-1/2',
                TRANSITION,
                isExpanded
                  ? 'right-[10px] sm:right-[15px] md:right-[30px] md:top-60'
                  : 'right-[-40px] sm:right-[-60px] md:right-[-130px]',
              )}
            >
              <div
                className={cn(
                  'relative w-[60vw] md:left-0 left-[20%] scale-[1.2] sm:w-[280px] md:w-[320px] h-[160px] sm:h-[310px] md:h-[380px]',
                  'rotate-[-6deg]',
                  TRANSITION,
                  isExpanded ? 'opacity-0 scale-95' : 'opacity-100 scale-100 drop-shadow-xl',
                )}
              >
                <Image src={images.default} alt="" fill className="object-contain" />
              </div>

              <div
                className={cn(
                  'absolute w-[180px] sm:w-[290px] md:w-[330px] h-[160px] sm:h-[290px] md:h-[350px]',
                  TRANSITION,
                  isExpanded ? 'opacity-100 scale-100 drop-shadow-2xl' : 'opacity-0 scale-90',
                  'inset-0',
                )}
              >
                <Image src={images.hovered} alt="" fill className="object-contain" />
              </div>
            </div>
          )}

          {id === 'right' && (
            <div
              className={cn(
                'absolute pointer-events-none',
                TRANSITION,
                isExpanded
                  ? 'top-[70px] right-[-10px] sm:top-[70px] md:top-[80px] sm:right-[8px] md:right-[10px]'
                  : 'top-[40px] sm:top-[35px] md:top-[60px] right-[-40px] sm:right-[-60px] md:right-[-120px] -rotate-[15deg]',
              )}
            >
              <div
                className={cn(
                  'relative w-[80vw] md:left-4 left-[15%] scale-160 sm:w-[280px] md:top-6 md:w-[380px] h-auto aspect-square',
                  'rotate-[-6deg]',
                  TRANSITION,
                  isExpanded ? 'opacity-0 scale-95' : 'opacity-100 scale-100 drop-shadow-xl',
                )}
              >
                <Image src={images.default} alt="" fill className="object-cover" />
              </div>

              <div
                className={cn(
                  'absolute transition-all duration-[400ms]',
                  isExpanded ? 'opacity-100 scale-100 drop-shadow-2xl' : 'opacity-0 scale-90',
                  'top-0 w-[150px] sm:w-[360px] md:w-[440px] h-[180px] sm:h-[300px] md:h-[440px] right-[40px] sm:scale-115 md:scale-115',
                )}
              >
                <Image src={images.hovered} alt="" fill className="object-contain object-right" />
              </div>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}
