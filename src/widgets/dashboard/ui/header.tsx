'use client';

import { useIsMobile } from '@shared/hooks/use-mobile';
import type { User } from '@shared/hooks/use-user';
import Header from '@widgets/landing-page/ui/header-section';
import DashboardHeader from './dashboard-header';

interface ResponsiveHeaderProps {
  user?: User | null;
  className?: string;
}

export default function ResponsiveHeader({ user, className }: ResponsiveHeaderProps) {
  const isMobile = useIsMobile();

  return isMobile ? <Header /> : <DashboardHeader user={user} className={className} />;
}
