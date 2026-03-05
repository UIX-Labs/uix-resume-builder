'use client';

import { useLogoutUser } from '@entities/auth-page/api/auth-queries';
import { useUserProfile } from '@shared/hooks/use-user';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import type { NavItem } from '@shared/ui/components/mobile-nav-drawer';
import { MobileNavDrawer } from '@shared/ui/components/mobile-nav-drawer';
import { FileText, Home, LayoutGrid, LogIn, LogOut, Sparkles } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import ReferralIcon from '@features/referral-flow/ui/referral-icon';

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
    handleNavigation('/templates', 'all_templates');
  };

  const handleYourResumesClick = () => {
    handleNavigation('/my-resumes', 'your_resumes');
  };

  const handleExpertReviewClick = () => {
    handleNavigation('/dashboard/expert-review', 'expert_review');
  };

  const handleReferralClick = () => {
    handleNavigation('/referral', 'referral');
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
          isActive: pathname === '/templates',
          icon: LayoutGrid,
        },
        {
          label: 'Your Resumes',
          onClick: handleYourResumesClick,
          isActive: pathname === '/my-resumes',
          icon: FileText,
        },
        {
          label: 'Expert Review',
          onClick: handleExpertReviewClick,
          isActive: pathname === '/dashboard/expert-review',
          icon: Sparkles,
        },
        {
          label: 'Referral',
          onClick: handleReferralClick,
          isActive: pathname === '/referral',
          icon: ReferralIcon,
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
    <MobileNavDrawer
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
