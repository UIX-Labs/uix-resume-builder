'use client';
import React from 'react';
import { Button } from '@/shared/ui/components/button';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useCachedUser } from '@shared/hooks/use-user';
import { cn } from '@shared/lib/cn';
import { trackEvent } from '@/shared/lib/analytics/percept';

function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const user = useCachedUser();

  const handleNavigate = () => {
    router.push(user ? '/dashboard' : '/auth');
  };

  const handleHomeClick = () => {
    router.push('/');
    trackEvent('navigation_click', {
      source: 'landing_header',
      destination: 'home'
    });
  };

  const handleDashboardClick = () => {
    handleNavigate();
    trackEvent('navigation_click', {
      source: 'landing_header',
      destination: user ? 'dashboard' : 'auth',
      action: user ? 'dashboard' : 'sign_in'
    });
  };

  const handleAboutUsClick = () => {
    router.push('/about-us');
    trackEvent('navigation_click', {
      source: 'landing_header',
      destination: 'about_us'
    });
  };

  const handleCreateResumeClick = () => {
    handleNavigate();
    trackEvent('create_resume_click', {
      source: 'landing_header',
      method: 'create_my_resume'
    });
  };

  return (
    <header className="w-full flex items-center justify-between px-12 py-4">
      <div className="flex items-center gap-4">
        <span className="text-2xl font-[900] text-[rgb(11,10,9)]">Resume Builder</span>

        <div className="flex items-center gap-1 px-2 py-1 bg-[rgb(2,164,79)] text-white rounded-full text-xs font-bold">
          <span>AI Powered</span>

          <Image src="/images/auto_awesome.svg" alt="AI" width={14} height={14} className="inline-block" />
        </div>
      </div>

      <div className="flex items-center gap-7">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleHomeClick}
          className={cn(
            'font-semibold text-lg cursor-pointer',
            pathname === '/' ? 'bg-blue-200 text-blue-900 hover:bg-blue-300' : 'text-blue-900 hover:text-gray-900'
          )}
        >
          Home
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleDashboardClick}
          className={cn(
            'font-semibold text-lg cursor-pointer',
            pathname === '/dashboard' || pathname === '/auth'
              ? 'bg-blue-200 text-blue-900 hover:bg-blue-300'
              : 'text-blue-900 hover:text-gray-900'
          )}
        >
          {user ? 'Dashboard' : 'Sign In'}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleAboutUsClick}
          className={cn(
            'font-semibold text-lg cursor-pointer',
            pathname === '/about-us'
              ? 'bg-blue-200 text-blue-900 hover:bg-blue-300'
              : 'text-blue-900 hover:text-gray-900'
          )}
        >
          About Us
        </Button>

        <Button
          variant="default"
          size="default"
          onClick={handleCreateResumeClick}
          className="bg-blue-900 hover:bg-blue-700 text-white font-medium p-3 rounded-lg shadow-sm cursor-pointer"
        >
          Create My Resume
        </Button>
      </div>
    </header>
  );
}

export default Header;
