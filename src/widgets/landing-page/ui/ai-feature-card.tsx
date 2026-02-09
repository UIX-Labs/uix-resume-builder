'use client';

import { cn } from '@shared/lib/cn';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

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

  // Check if device is touch-only (mobile)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(hover: none)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Ref for useInView
  const cardRef = useRef<HTMLDivElement>(null);
  const isInViewport = useInView(cardRef, {
    once: true,
    margin: '-50px',
  });

  // On mobile, trigger hover effect when card comes into view
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isMobile && isInViewport && !hasAnimated) {
      const timer = setTimeout(() => {
        onHover();
        setHasAnimated(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isMobile, isInViewport, hasAnimated, onHover]);

  // Animation variants for viewport entrance
  const cardVariants = {
    hidden: {
      opacity: 0.4,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  };

  // Determine if card should show expanded state
  // On desktop: show expanded when hovered
  // On mobile: show expanded only after animation has triggered
  const isExpanded = isMobile ? isInViewport && hasAnimated : isHovered;

  return (
    <motion.div
      ref={cardRef}
      role="button"
      tabIndex={0}
      aria-label={`${title} feature`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      initial="hidden"
      animate={isInViewport ? 'visible' : 'hidden'}
      variants={cardVariants}
      className={cn(
        `
        relative overflow-hidden
        rounded-3xl border
        px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10
        min-h-[320px] sm:min-h-[380px] md:min-h-[450px]
        shadow-sm cursor-pointer outline-none
        ring-offset-2 focus-visible:ring-2 focus-visible:ring-blue-500
        ${TRANSITION}
        `,

        isExpanded
          ? cn('shadow-xl border-transparent', isBlue ? 'bg-blue-600' : 'bg-green-500', 'md:flex-[1.3]')
          : cn(
              'bg-[#F3F4F8] bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:16px_16px] border-gray-200/60',
              isOtherHovered ? 'md:flex-[0.8]' : 'md:flex-1',
            ),
      )}
    >
      {/* TEXT CONTENT */}
      <div className="relative z-10 w-[180px] sm:w-[280px] md:w-[403px] transition-colors duration-[400ms]">
        <span
          className={cn(
            'inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 md:py-1.5 text-[9px] sm:text-xs md:text-sm font-semibold mb-2 sm:mb-4 md:mb-6 w-fit',
            isExpanded ? 'bg-white/20 text-white' : isBlue ? 'bg-blue-600 text-white' : 'bg-green-500 text-white',
          )}
        >
          <Image src="/images/sparkles.svg" alt="" width={12} height={12} className="sm:w-4 sm:h-4" />
          {badge}
        </span>

        <h3
          className={cn(
            'text-[25px] sm:text-[28px] md:text-[40px] font-semibold leading-[120%] tracking-[-0.03em] mb-2 sm:mb-4 md:mb-[30px]',
            isExpanded ? 'text-white' : 'text-gray-900',
          )}
        >
          {title}
        </h3>

        <p
          className={cn(
            'text-[20px] sm:text-[30px] md:text-[32px] leading-[1.3] sm:leading-[32px] md:leading-[40px] tracking-[-0.03em]',
            isExpanded ? 'text-white/90' : 'text-[#171717]',
          )}
        >
          {description}
        </p>
      </div>

      {/* IMAGE PREVIEW */}
      {!isOtherHovered && (
        <>
          {id === 'left' && (
            <div
              className={cn(
                'absolute pointer-events-none',
                'top-1/2 -translate-y-1/2',
                'md:top-1/2 md:-translate-y-1/2',
                TRANSITION,
                isExpanded
                  ? 'right-[10px] sm:right-[15px] md:right-[20px]'
                  : 'right-[-40px] sm:right-[-60px] md:right-[-130px]',
              )}
            >
              <div
                className={cn(
                  'relative w-[180px] sm:w-[280px] md:w-[320px] h-[190px] sm:h-[310px] md:h-[380px]',
                  'rotate-[-6deg]',
                  TRANSITION,
                  isExpanded ? 'opacity-0 scale-95' : 'opacity-100 scale-100 drop-shadow-xl',
                )}
              >
                <Image src={images.default} alt="" fill className="object-contain" />
              </div>

              <div
                className={cn(
                  'absolute w-[190px] sm:w-[290px] md:w-[330px] h-[170px] sm:h-[290px] md:h-[350px]',
                  TRANSITION,
                  isExpanded ? 'opacity-100 scale-100 drop-shadow-2xl' : 'opacity-0 scale-90',
                  // Center on mobile when expanded
                  isMobile && isExpanded ? 'left-1/2 -translate-x-1/2 top-0' : 'inset-0',
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
                  ? 'top-[60px] sm:top-[70px] md:top-[80px] right-[5px] sm:right-[8px] md:right-[10px]'
                  : 'top-[40px] sm:top-[35px] md:top-[40px] right-[-60px] sm:right-[-60px] md:right-[-100px]',
              )}
            >
              <div
                className={cn(
                  'relative w-[150px] sm:w-[260px] md:w-[320px] h-[180px] sm:h-[320px] md:h-[400px]',
                  'rotate-[-8deg]',
                  TRANSITION,
                  isExpanded ? 'opacity-0 scale-95' : 'opacity-100 scale-100 drop-shadow-xl',
                )}
              >
                <Image src={images.default} alt="" fill className="object-contain" />
              </div>

              <div
                className={cn(
                  'absolute top-0 right-0 w-[150px] sm:w-[360px] md:w-[440px] h-[180px] sm:h-[300px] md:h-[440px]',
                  TRANSITION,
                  isExpanded ? 'opacity-100 scale-100 sm:scale-115 md:scale-115 drop-shadow-2xl' : 'opacity-0 scale-90',
                  // Center on mobile when expanded
                  isMobile && isExpanded ? 'left-1/2 -translate-x-1/2 top-0' : '',
                )}
              >
                <Image src={images.hovered} alt="" fill className="object-contain" />
              </div>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}
