'use client';

import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import type { NavItem } from '@shared/ui/components/mobile-nav-drawer';
import { MobileNavDrawer } from '@shared/ui/components/mobile-nav-drawer';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { MobileTextView } from './mobile-text-view';

export interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
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

  const handleExpertReviewClick = () => {
    handleNavigation('/expert-review', 'navigation_click', 'expert_review');
  };

  const handleDashboardClick = () => {
    handleNavigation('/dashboard', 'navigation_click', 'dashboard');
  };

  const handleBlogClick = () => {
    handleNavigation('/blog', 'navigation_click', 'blog');
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
      label: 'Expert Review',
      onClick: handleExpertReviewClick,
      isActive: pathname === '/expert-review',
    },
    {
      label: 'Roast',
      onClick: handleRoastClick,
      isActive: pathname === '/roast',
    },
    {
      label: 'Blogs',
      onClick: handleBlogClick,
      isActive: pathname === '/blog',
    },
    {
      label: 'Dashboard',
      onClick: handleDashboardClick,
      isActive: pathname === '/dashboard',
    },
  ];

  return (
    <>
      <MobileNavDrawer isOpen={isOpen} onClose={onClose} navItems={navItems} onLogoClick={handleLogoClick} />

      {/* Mobile Text View - Shows when user tries to access desktop-only features */}
      <MobileTextView isOpen={showMobileTextView} onClose={() => setShowMobileTextView(false)} />
    </>
  );
};
