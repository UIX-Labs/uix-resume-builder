'use client';

import { Button } from '@/shared/ui/components/button';
import { cn } from '@shared/lib/cn';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Flame, UserCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const TRANSITION = 'transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.3,0,0.2,1)]';

export function PaidToolsSection() {
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<'roast' | 'review' | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(hover: none)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const hoverRoast = useCallback(() => setHoveredId('roast'), []);
  const hoverReview = useCallback(() => setHoveredId('review'), []);
  const clearHover = useCallback(() => setHoveredId(null), []);

  const handleRoastClick = () => {
    trackEvent('navigation_click', {
      source: 'landing_paid_tools',
      destination: 'roast',
    });
    router.push('/roast');
  };

  const handleExpertReviewClick = () => {
    trackEvent('navigation_click', {
      source: 'landing_paid_tools',
      destination: 'expert_review',
    });
    router.push('/expert-review');
  };

  if (!isMounted) return null;

  const roastExpanded = hoveredId === 'roast';
  const reviewExpanded = hoveredId === 'review';

  return (
    <section className="py-12 sm:py-16 md:py-24" aria-labelledby="paid-tools-heading">
      <div className="container mx-auto px-4 sm:px-6 max-w-[90rem]">
        <h2
          id="paid-tools-heading"
          className="mb-8 sm:mb-12 md:mb-16 text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 tracking-tight"
        >
          Resume Add-on Tools
        </h2>

        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 lg:gap-8 md:h-[450px]">
          {/* Roast Card */}
          <motion.div
            role="button"
            tabIndex={0}
            onMouseEnter={!isMobile ? hoverRoast : undefined}
            onMouseLeave={!isMobile ? clearHover : undefined}
            onClick={handleRoastClick}
            onFocus={hoverRoast}
            onBlur={clearHover}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className={cn(
              'relative overflow-hidden rounded-3xl border',
              'px-6 sm:px-8 md:px-10 py-8 sm:py-10',
              'min-h-[280px] sm:min-h-[320px]',
              'shadow-sm cursor-pointer outline-none',
              'ring-offset-2 focus-visible:ring-2 focus-visible:ring-blue-500',
              'flex flex-col justify-between',
              TRANSITION,
              roastExpanded
                ? 'shadow-xl border-transparent bg-blue-600 md:flex-[1.3]'
                : cn(
                    'bg-[#F3F4F8] bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:16px_16px] border-gray-200/60',
                    reviewExpanded ? 'md:flex-[0.8]' : 'md:flex-1',
                  ),
            )}
          >
            <div className="relative z-10">
              <div
                className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center mb-6',
                  TRANSITION,
                  roastExpanded ? 'bg-white/20' : 'bg-blue-50',
                )}
              >
                <Flame className={cn('w-6 h-6', TRANSITION, roastExpanded ? 'text-white' : 'text-[#005FF2]')} />
              </div>
              <h3
                className={cn(
                  'text-2xl sm:text-3xl md:text-4xl font-semibold mb-4',
                  TRANSITION,
                  roastExpanded ? 'text-white' : 'text-[#171717]',
                )}
              >
                Get Your Resume Roasted
              </h3>
              <p
                className={cn(
                  'text-base sm:text-lg max-w-md',
                  TRANSITION,
                  roastExpanded ? 'text-white/90' : 'text-gray-600',
                )}
              >
                Our AI gives you brutally honest feedback on your resume. Find out what recruiters really think.
              </p>
            </div>
            <Button
              tabIndex={-1}
              className={cn(
                'w-fit font-semibold rounded-xl px-8 py-6 text-lg relative z-10',
                TRANSITION,
                roastExpanded ? 'bg-white text-blue-600 hover:bg-gray-50' : 'bg-[#005FF2] text-white hover:bg-blue-700',
              )}
            >
              Roast My Resume
            </Button>

            {/* Roast Card Image */}
            {(!reviewExpanded || isMobile) && (
              <div
                className={cn(
                  'absolute pointer-events-none',
                  'top-1/2 -translate-y-1/2',
                  TRANSITION,
                  roastExpanded
                    ? 'right-[5px] sm:right-[15px] md:right-[20px] md:top-[55%]'
                    : 'right-[-40px] sm:right-[-60px] md:right-[-100px]',
                )}
              >
                {/* Default image — tilted, fades out on hover */}
                <div
                  className={cn(
                    'relative w-[120px] sm:w-[220px] md:w-[280px] h-[150px] sm:h-[280px] md:h-[360px]',
                    'rotate-[-6deg]',
                    TRANSITION,
                    roastExpanded ? 'opacity-0 scale-95' : 'opacity-100 scale-100 drop-shadow-xl',
                  )}
                >
                  <Image src="/images/roast-resume.png" alt="" fill className="object-contain" />
                </div>

                {/* Hovered image — larger, straightened, fades in */}
                <div
                  className={cn(
                    'absolute inset-0',
                    'w-[150px] sm:w-[240px] md:w-[300px] h-[170px] sm:h-[300px] md:h-[380px]',
                    TRANSITION,
                    roastExpanded ? 'opacity-100 scale-100 drop-shadow-2xl' : 'opacity-0 scale-90',
                  )}
                >
                  <Image src="/images/roast-resume.png" alt="" fill className="object-contain" />
                </div>
              </div>
            )}
          </motion.div>

          {/* Expert Review Card */}
          <motion.div
            role="button"
            tabIndex={0}
            onMouseEnter={!isMobile ? hoverReview : undefined}
            onMouseLeave={!isMobile ? clearHover : undefined}
            onClick={handleExpertReviewClick}
            onFocus={hoverReview}
            onBlur={clearHover}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className={cn(
              'relative overflow-hidden rounded-3xl border',
              'px-6 sm:px-8 md:px-10 py-8 sm:py-10',
              'min-h-[280px] sm:min-h-[320px]',
              'shadow-sm cursor-pointer outline-none',
              'ring-offset-2 focus-visible:ring-2 focus-visible:ring-blue-500',
              'flex flex-col justify-between',
              TRANSITION,
              reviewExpanded
                ? 'shadow-xl border-transparent bg-green-500 md:flex-[1.3]'
                : cn(
                    'bg-[#F3F4F8] bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:16px_16px] border-gray-200/60',
                    roastExpanded ? 'md:flex-[0.8]' : 'md:flex-1',
                  ),
            )}
          >
            <div className="relative z-10">
              <div
                className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center mb-6',
                  TRANSITION,
                  reviewExpanded ? 'bg-white/20' : 'bg-green-50',
                )}
              >
                <UserCheck className={cn('w-6 h-6', TRANSITION, reviewExpanded ? 'text-white' : 'text-[#00BA34]')} />
              </div>
              <h3
                className={cn(
                  'text-2xl sm:text-3xl md:text-4xl font-semibold mb-4',
                  TRANSITION,
                  reviewExpanded ? 'text-white' : 'text-[#171717]',
                )}
              >
                Get Expert Feedback
              </h3>
              <p
                className={cn(
                  'text-base sm:text-lg max-w-md',
                  TRANSITION,
                  reviewExpanded ? 'text-white/90' : 'text-gray-600',
                )}
              >
                Real career professionals review your resume and give you personalized improvement tips.
              </p>
            </div>
            <Button
              tabIndex={-1}
              className={cn(
                'w-fit font-semibold rounded-xl px-8 py-6 text-lg relative z-10',
                TRANSITION,
                reviewExpanded
                  ? 'bg-white text-green-600 hover:bg-gray-50'
                  : 'bg-[#00BA34] text-white hover:bg-green-600',
              )}
            >
              Request Expert Review
            </Button>

            {/* Expert Review Card Image */}
            {(!roastExpanded || isMobile) && (
              <div
                className={cn(
                  'absolute pointer-events-none',
                  TRANSITION,
                  reviewExpanded
                    ? 'top-[60px] right-[-10px] sm:top-[60px] md:top-[70px] sm:right-[8px] md:right-[10px]'
                    : 'top-[30px] sm:top-[30px] md:top-[35px] right-[-50px] sm:right-[-60px] md:right-[-100px]',
                )}
              >
                {/* Default image — tilted, fades out on hover */}
                <div
                  className={cn(
                    'relative w-[120px] sm:w-[220px] md:w-[280px] h-[150px] sm:h-[280px] md:h-[370px]',
                    'rotate-[-8deg]',
                    TRANSITION,
                    reviewExpanded ? 'opacity-0 scale-95' : 'opacity-100 scale-100 drop-shadow-xl',
                  )}
                >
                  <Image src="/images/kate_resume.png" alt="" fill className="object-contain" />
                </div>

                {/* Hovered image — enlarged with annotations, fades in */}
                <div
                  className={cn(
                    'absolute',
                    TRANSITION,
                    reviewExpanded ? 'opacity-100 scale-100 drop-shadow-2xl' : 'opacity-0 scale-90',
                    isMobile
                      ? 'w-[200px] h-[200px] right-[30px] -top-4'
                      : 'top-0 w-[140px] sm:w-[300px] md:w-[380px] h-[170px] sm:h-[280px] md:h-[400px] right-[30px] sm:scale-110 md:scale-110',
                  )}
                >
                  <Image src="/images/kate_enlarged resume.png" alt="" fill className="object-contain object-right" />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
