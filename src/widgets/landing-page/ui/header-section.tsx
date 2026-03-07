'use client';
import { Button } from '@/shared/ui/components/button';
import { useIsMobile } from '@shared/hooks/use-mobile';
import { useCachedUser } from '@shared/hooks/use-user';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import { cn } from '@shared/lib/cn';
import { DashboardMobileSidebar } from '@widgets/dashboard/ui/dashboard-mobile-sidebar';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MobileSidebar } from './mobile-sidebar';

const DASHBOARD_ROUTES = ['/dashboard', '/my-resumes', '/templates', '/referral'];

interface HeaderProps {
  variant?: 'default' | 'roast';
}

function Header({ variant = 'default' }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useCachedUser();
  const isMobile = useIsMobile();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isDashboardRoute = DASHBOARD_ROUTES.some((route) => pathname.startsWith(route));

  useEffect(() => {
    const SCROLL_DOWN_THRESHOLD = 20;
    const SCROLL_UP_THRESHOLD = 5;
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const y = window.scrollY;
        setIsScrolled((prev) => {
          if (y > SCROLL_DOWN_THRESHOLD) return true;
          if (y < SCROLL_UP_THRESHOLD) return false;
          return prev;
        });
      });
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const handleMenuClick = () => {
    if (isMobile) {
      setShowMobileSidebar(true);
    }
  };

  const handleHomeClick = () => {
    router.push('/');
    trackEvent('navigation_click', {
      source: 'landing_header',
      destination: 'home',
    });
  };

  const handleBlogsClick = () => {
    router.push('/blog');
    trackEvent('navigation_click', {
      source: 'landing_header',
      destination: 'blog',
    });
  };

  const handleDashboardClick = () => {
    router.push('/dashboard');
    trackEvent('navigation_click', {
      source: 'landing_header',
      destination: 'dashboard',
    });
  };

  const handleAllTemplateClick = () => {
    router.push('/all-templates');
    trackEvent('navigation_click', {
      source: 'landing_header',
      destination: 'all-templates',
    });
  };





  const handleRoastClick = () => {
    router.push('/roast');
    trackEvent('navigation_click', {
      source: 'landing_header',
      destination: 'roast',
    });
  };

  const isRoast = variant === 'roast';

  return (
    <>
      <header
        className={cn(
          isRoast
            ? 'fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 transition-all duration-300'
            : 'sticky top-0 z-50 w-full flex items-center justify-between px-4 md:px-4 transition-all duration-200',
          isRoast
            ? 'backdrop-blur-md py-4'
            : isScrolled
              ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.08)] py-2'
              : 'bg-white py-4',
        )}
      >
        <button className="flex items-center gap-2 md:gap-4 cursor-pointer" onClick={handleHomeClick} type="button">
          <Image
            src="/images/Pika-Resume.png"
            alt="AI"
            width={60}
            height={60}
            className={cn(
              'inline-block transition-all duration-200',
              isScrolled && !isRoast && 'scale-[0.8] origin-left',
            )}
          />
          <div
            className={cn(
              'flex flex-col items-start transition-all duration-200',
              isScrolled && !isRoast && 'scale-[0.9] origin-left',
            )}
          >
            <div className="flex flex-row">
              <span className={cn('font-bold text-3xl', isRoast ? 'text-white' : 'text-[#005FF2] bg-clip-text')}>
                Pika
              </span>
              <span className={cn('font-normal text-3xl', isRoast ? 'text-white/80' : 'text-[#21344F] bg-clip-text')}>
                Resume
              </span>
            </div>
            <div className={cn('flex-row gap-1', isRoast ? 'hidden md:flex' : isScrolled ? 'hidden' : 'flex')}>
              <span className={cn('font-normal text-sm', isRoast ? 'text-white/90' : 'text-[#005FF2] bg-clip-text')}>
                Build Fast.
              </span>
              <span className={cn('font-normal text-sm', isRoast ? 'text-white/70' : 'text-[#21344F] bg-clip-text')}>
                Build Right.
              </span>
            </div>
          </div>
        </button>

        <div className="hidden md:flex items-center gap-7">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleHomeClick}
            className={cn(
              'font-semibold text-lg cursor-pointer',
              pathname === '/'
                ? isRoast
                  ? 'text-blue-400'
                  : 'bg-blue-200 text-blue-900 hover:bg-blue-300'
                : isRoast
                  ? 'text-white hover:bg-white/10 hover:text-white'
                  : 'text-blue-900 hover:text-gray-900',
            )}
          >
            Home
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              router.push('/expert-review');
              trackEvent('navigation_click', {
                source: 'landing_header',
                destination: 'expert_review',
              });
            }}
            className={cn(
              'font-semibold text-lg cursor-pointer',
              pathname === '/expert-review'
                ? isRoast
                  ? 'text-blue-400'
                  : 'bg-blue-200 text-blue-900 hover:bg-blue-300'
                : isRoast
                  ? 'text-white hover:bg-white/10 hover:text-white'
                  : 'text-blue-900 hover:text-gray-900',
            )}
          >
            Expert Review
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleRoastClick}
            className={cn(
              'font-semibold text-lg cursor-pointer',
              pathname === '/roast'
                ? isRoast
                  ? 'text-blue-400'
                  : 'bg-blue-200 text-blue-900 hover:bg-blue-300'
                : isRoast
                  ? 'text-white hover:bg-white/10 hover:text-white'
                  : 'text-blue-900 hover:text-gray-900',
            )}
          >
            Roast
          </Button>


           <Button
            variant="ghost"
            size="sm"
            onClick={handleAllTemplateClick}
            className={cn(
              'font-semibold text-lg cursor-pointer',
              pathname === '/all-templates'
                ? isRoast
                  ? 'text-blue-400'
                  : 'bg-blue-200 text-blue-900 hover:bg-blue-300'
                : isRoast
                  ? 'text-white hover:bg-white/10 hover:text-white'
                  : 'text-blue-900 hover:text-gray-900',
            )}
          >
            All Templates
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleBlogsClick}
            className={cn(
              'font-semibold text-lg cursor-pointer',
              pathname === '/blog'
                ? isRoast
                  ? 'text-blue-400'
                  : 'bg-blue-200 text-blue-900 hover:bg-blue-300'
                : isRoast
                  ? 'text-white hover:bg-white/10 hover:text-white'
                  : 'text-blue-900 hover:text-gray-900',
            )}
          >
            Blogs
          </Button>

          {/* WIP - Pricing button hidden temporarily
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePricingClick}
            className={cn(
              'font-semibold text-lg cursor-pointer',
              pathname === '/pricing'
                ? isRoast
                  ? 'text-blue-400'
                  : 'bg-blue-200 text-blue-900 hover:bg-blue-300'
                : isRoast
                  ? 'text-white hover:bg-white/10 hover:text-white'
                  : 'text-blue-900 hover:text-gray-900',
            )}
          >
            Pricing
          </Button>
          */}

          {/* WIP - Examples button hidden temporarily
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              router.push('/resume-examples');
              trackEvent('navigation_click', {
                source: 'landing_header',
                destination: 'resume_examples',
              });
            }}
            className={cn(
              'font-semibold text-lg cursor-pointer',
              pathname === '/resume-examples'
                ? isRoast
                  ? 'text-blue-400'
                  : 'bg-blue-200 text-blue-900 hover:bg-blue-300'
                : isRoast
                  ? 'text-white hover:bg-white/10 hover:text-white'
                  : 'text-blue-900 hover:text-gray-900',
            )}
          >
            Examples
          </Button>
          */}

          {!user && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const callbackUrl = encodeURIComponent(pathname + window.location.search);
                router.push(`/auth?callbackUrl=${callbackUrl}`);
                trackEvent('navigation_click', {
                  source: 'landing_header',
                  destination: 'auth',
                  action: 'sign_in',
                });
              }}
              className={cn(
                'font-semibold text-lg cursor-pointer',
                pathname === '/auth'
                  ? isRoast
                    ? 'text-blue-400'
                    : 'bg-blue-200 text-blue-900 hover:bg-blue-300'
                  : isRoast
                    ? 'text-white hover:bg-white/10 hover:text-white'
                    : 'text-blue-900 hover:text-gray-900',
              )}
            >
              Sign In
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={handleDashboardClick}
            className={cn(
              'font-semibold text-lg cursor-pointer',
              pathname === '/dashboard' || pathname.startsWith('/dashboard')
                ? isRoast
                  ? 'text-blue-400'
                  : 'bg-blue-200 text-blue-900 hover:bg-blue-300'
                : isRoast
                  ? 'text-white hover:bg-white/10 hover:text-white'
                  : 'text-blue-900 hover:text-gray-900',
            )}
          >
            Dashboard
          </Button>
        </div>

        {/* Mobile Menu Button - Hidden on Desktop */}
        <button
          type="button"
          onClick={handleMenuClick}
          className={cn(
            'md:hidden p-2 rounded-lg transition-colors',
            isRoast ? 'text-white hover:bg-white/10' : 'text-gray-900 hover:bg-gray-100',
          )}
          aria-label="Open menu"
        >
          <Menu className={cn(isRoast ? 'w-7 h-7' : 'w-8 h-8')} />
        </button>
      </header>

      {/* Mobile Sidebar Menu */}
      {isMobile &&
        (isDashboardRoute ? (
          <DashboardMobileSidebar isOpen={showMobileSidebar} onClose={() => setShowMobileSidebar(false)} />
        ) : (
          <MobileSidebar isOpen={showMobileSidebar} onClose={() => setShowMobileSidebar(false)} />
        ))}
    </>
  );
}

export default Header;
