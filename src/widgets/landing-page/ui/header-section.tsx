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
import { useState } from 'react';
import { MobileSidebar } from './mobile-sidebar';

interface HeaderProps {
  variant?: 'default' | 'roast';
}

function Header({ variant = 'default' }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useCachedUser();
  const isMobile = useIsMobile();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const isDashboardRoute = ['/dashboard', '/resumes', '/get-all-resumes'].some((route) => pathname.startsWith(route));

  const handleNavigate = () => {
    router.push('/dashboard');
  };

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
    if (user) {
      router.push('/dashboard');
    } else {
      const callbackUrl = encodeURIComponent(pathname + window.location.search);
      router.push(`/auth?callbackUrl=${callbackUrl}`);
    }
    trackEvent('navigation_click', {
      source: 'landing_header',
      destination: user ? 'dashboard' : 'auth',
      action: user ? 'dashboard' : 'sign_in',
    });
  };

  const handleAboutUsClick = () => {
    router.push('/about-us');
    trackEvent('navigation_click', {
      source: 'landing_header',
      destination: 'about_us',
    });
  };

  const handleCreateResumeClick = () => {
    handleNavigate();
    trackEvent('create_resume_click', {
      source: 'landing_header',
      method: 'create_my_resume',
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
            ? 'fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 transition-all duration-300'
            : 'w-full flex items-center justify-between px-4 md:px-4 py-4',
          isRoast ? 'backdrop-blur-md' : '',
        )}
      >
        <button className="flex items-center gap-2 md:gap-4 cursor-pointer" onClick={handleHomeClick} type="button">
          <Image src="/images/Pika-Resume.png" alt="AI" width={60} height={60} className="inline-block " />
          <div className="flex flex-col items-start">
            <div className="flex flex-row">
              <span className={cn('font-bold text-3xl', isRoast ? 'text-white' : 'text-[#005FF2] bg-clip-text')}>
                Pika
              </span>
              <span className={cn('font-normal text-3xl', isRoast ? 'text-white/80' : 'text-[#21344F] bg-clip-text')}>
                Resume
              </span>
            </div>
            <div className={cn('flex-row gap-1', isRoast ? 'hidden md:flex' : 'flex')}>
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
            onClick={handleDashboardClick}
            className={cn(
              'font-semibold text-lg cursor-pointer',
              pathname === '/dashboard' || pathname === '/auth'
                ? isRoast
                  ? 'text-blue-400'
                  : 'bg-blue-200 text-blue-900 hover:bg-blue-300'
                : isRoast
                  ? 'text-white hover:bg-white/10 hover:text-white'
                  : 'text-blue-900 hover:text-gray-900',
            )}
          >
            {user ? 'Dashboard' : 'Sign In'}
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

          <Button
            variant="ghost"
            size="sm"
            onClick={handleAboutUsClick}
            className={cn(
              'font-semibold text-lg cursor-pointer',
              pathname === '/about-us'
                ? isRoast
                  ? 'text-blue-400'
                  : 'bg-blue-200 text-blue-900 hover:bg-blue-300'
                : isRoast
                  ? 'text-white hover:bg-white/10 hover:text-white'
                  : 'text-blue-900 hover:text-gray-900',
            )}
          >
            About Us
          </Button>

          <Button
            variant="default"
            size="default"
            onClick={handleCreateResumeClick}
            className={cn(
              'font-medium p-3 rounded-lg shadow-sm cursor-pointer',
              isRoast ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-900 hover:bg-blue-700 text-white',
            )}
          >
            Create My Resume
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
