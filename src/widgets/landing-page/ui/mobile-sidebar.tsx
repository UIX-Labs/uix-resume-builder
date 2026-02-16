'use client';

import { useCachedUser } from '@shared/hooks/use-user';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import type { NavItem } from '@shared/ui/components/reusable-mobile-sidebar';
import { ReusableMobileSidebar } from '@shared/ui/components/reusable-mobile-sidebar';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { MobileTextView } from './mobile-text-view';

export interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onExpertReviewClick: () => void;
}

export const MobileSidebar = ({ isOpen, onClose, onExpertReviewClick }: MobileSidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const user = useCachedUser();
  const [showMobileTextView, setShowMobileTextView] = useState(false);

  const handleNavigation = (path: string, eventName: string, destination: string) => {
    router.push(path);
    trackEvent(eventName, {
      source: 'mobile_sidebar',
      destination,
    });
  };

  const handleHomeClick = () => {
    handleNavigation('/', 'navigation_click', 'home');
  };

  const handleRoastClick = () => {
    handleNavigation('/roast', 'navigation_click', 'roast');
  };

  const handleAboutUsClick = () => {
    handleNavigation('/about-us', 'navigation_click', 'about_us');
  };

  const handleExpertReviewClick = () => {
    onClose();
    onExpertReviewClick();
  };

  const handleDashboardClick = () => {
    handleNavigation('/dashboard', 'navigation_click', 'dashboard');
  };

  const handleCreateResumeClick = () => {
    handleNavigation('/dashboard', 'create_resume_click', 'dashboard');
  };

  const handleLogoClick = () => {
    handleNavigation('/', 'navigation_click', 'home');
  };

  const navItems: NavItem[] = [
    {
      label: 'Home',
      onClick: handleHomeClick,
      isActive: pathname === '/',
    },
    {
      label: 'Roast',
      onClick: handleRoastClick,
      isActive: pathname === '/roast',
    },
    {
      label: 'Expert Review',
      onClick: handleExpertReviewClick,
      isActive: false,
    },
    {
      label: user ? 'Dashboard' : 'Sign In',
      onClick: handleDashboardClick,
      isActive: pathname === '/dashboard',
    },
    {
      label: 'About Us',
      onClick: handleAboutUsClick,
      isActive: pathname === '/about-us',
    },
  ];

  return (
    <>
      <ReusableMobileSidebar
        isOpen={isOpen}
        onClose={onClose}
        navItems={navItems}
        onLogoClick={handleLogoClick}
        ctaButton={{
          label: 'Create My Resume',
          onClick: handleCreateResumeClick,
          className: 'bg-blue-900 hover:bg-blue-700 text-white',
        }}
      />

      {/* Mobile Text View - Shows when user tries to access desktop-only features */}
      <MobileTextView isOpen={showMobileTextView} onClose={() => setShowMobileTextView(false)} />
    </>
  );
};
