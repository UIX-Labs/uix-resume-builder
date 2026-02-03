'use client';

import { useLogoutUser } from '@entities/auth-page/api/auth-queries';
import { useUserProfile } from '@shared/hooks/use-user';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import type { NavItem } from '@shared/ui/components/reusable-mobile-sidebar';
import { ReusableMobileSidebar } from '@shared/ui/components/reusable-mobile-sidebar';
import { FileText, Home, LayoutGrid, LogIn, LogOut } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export interface DashboardMobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DashboardMobileSidebar = ({ isOpen, onClose }: DashboardMobileSidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: user } = useUserProfile();
  const logoutMutation = useLogoutUser();

  const handleNavigation = (path: string, destination: string) => {
    router.push(path);
    trackEvent('navigation_click', {
      source: 'dashboard_mobile_sidebar',
      destination,
    });
  };

  const handleDashboardClick = () => {
    handleNavigation('/dashboard', 'dashboard');
  };

  const handleAllTemplatesClick = () => {
    handleNavigation('/get-all-resumes', 'all_templates');
  };

  const handleYourResumesClick = () => {
    handleNavigation('/resumes', 'your_resumes');
  };

  const handleLogoutClick = () => {
    logoutMutation.mutate();
    trackEvent('logout_click', {
      source: 'dashboard_mobile_sidebar',
    });
  };

  const handleSignInClick = () => {
    handleNavigation('/auth', 'sign_in');
  };

  const handleLogoClick = () => {
    router.push('/');
    trackEvent('navigation_click', {
      source: 'dashboard_mobile_sidebar',
      destination: 'home',
    });
  };

  const menuSections = [
    {
      label: 'MENU',
      items: [
        {
          label: 'Dashboard',
          onClick: handleDashboardClick,
          isActive: pathname === '/dashboard',
          icon: Home,
        },
        {
          label: 'All Templates',
          onClick: handleAllTemplatesClick,
          isActive: pathname === '/get-all-resumes',
          icon: LayoutGrid,
        },
        {
          label: 'Your Resumes',
          onClick: handleYourResumesClick,
          isActive: pathname === '/resumes',
          icon: FileText,
        },
      ] as NavItem[],
    },
    {
      label: 'GENERAL',
      items: [
        user
          ? {
              label: logoutMutation.isPending ? 'Logging out...' : 'Logout',
              onClick: handleLogoutClick,
              icon: LogOut,
              isActive: false,
            }
          : {
              label: 'Sign In',
              onClick: handleSignInClick,
              icon: LogIn,
              isActive: pathname === '/auth',
            },
      ] as NavItem[],
    },
  ];

  return (
    <ReusableMobileSidebar
      isOpen={isOpen}
      onClose={onClose}
      navItems={[]}
      menuSections={menuSections}
      onLogoClick={handleLogoClick}
      logoSrc="/images/Pika-Resume.png"
      logoAlt="Pika Resume"
      brandName={{ primary: 'Pika', secondary: 'Resume' }}
    />
  );
};
