'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@shared/ui/sidebar';
import { Home, FileText, LogOut, Sparkles, LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLogoutUser } from '@entities/auth-page/api/auth-queries';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import PikaResume from '@shared/icons/pika-resume';
import { useRouter } from 'next/navigation';

export default function DashboardSidebar() {
  const pathname = usePathname();
  const logoutMutation = useLogoutUser();
  const router = useRouter();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const handleDashboardClick = () => {
    trackEvent('navigation_click', {
      source: 'dashboard_sidebar',
      destination: 'dashboard',
    });
  };

  const handleAllTemplatesClick = () => {
    trackEvent('navigation_click', {
      source: 'dashboard_sidebar',
      destination: 'all_templates',
    });
  };

  const handleYourResumesClick = () => {
    trackEvent('navigation_click', {
      source: 'dashboard_sidebar',
      destination: 'your_resumes',
    });
  };

  const handleLogoutClick = () => {
    handleLogout();
    trackEvent('logout_click', {
      source: 'dashboard_sidebar',
    });
  };

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <Sidebar className="bg-[rgba(245,248,250,1)] rounded-3xl m-3 w-[249px]">
      <SidebarHeader className="w-full">
        <button
          className="flex flex-row items-center justify-center p-4 gap-2 cursor-pointer"
          onClick={handleLogoClick}
          type="button"
        >
          <div className="flex flex-row items-center justify-center">
            <PikaResume stopColor="black" offsetColor="black" width={40} height={40} />
          </div>
          <div className="flex flex-row items-center justify-center">
            <span className="font-bold text-black bg-clip-text text-2xl">Pika</span>
            <span className="font-normal text-[#21344F] bg-clip-text text-2xl">Resume</span>
          </div>
        </button>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-normal text-gray-500 uppercase tracking-wider">
            MENU
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1.5">
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === '/dashboard'}>
                  <Link href="/dashboard" onClick={handleDashboardClick}>
                    <Home className="w-5 h-5" />
                    Dashboard
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === '/get-all-resumes'}>
                  <Link href="/get-all-resumes" onClick={handleAllTemplatesClick}>
                    <LayoutGrid className="w-5 h-5" />
                    All Templates
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === '/resumes'}>
                  <Link href="/resumes" onClick={handleYourResumesClick}>
                    <FileText className="w-5 h-5" />
                    Your Resumes
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={pathname === "/templates"}
                >
                  <Link href="/templates">
                    <Layout className="w-5 h-5" />
                    Templates
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem className="relative">
                <SidebarMenuButton 
                  asChild 
                  isActive={pathname === "/ai-resume"}
                >
                  <Link href="/ai-resume">
                    <Sparkles className="w-5 h-5" />
                    AI Resume
                  </Link>
                </SidebarMenuButton>

                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <span className="inline-flex items-center px-2 py-0.5 text-xs font-semibold text-white bg-gradient-to-r from-[rgb(193,118,115)] to-[rgb(160,44,39)] rounded-full">
                    Premium
                  </span>
                </div>
              </SidebarMenuItem> */}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="">
          <SidebarGroupLabel className="text-xs font-normal text-gray-500 uppercase tracking-wider mb-4">
            GENERAL
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="">
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  onClick={handleLogoutClick}
                  disabled={logoutMutation.isPending}
                  className="h-9 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                >
                  <div className="flex items-center">
                    <LogOut className="w-5 h-5" />
                    {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* <SidebarFooter className="p-4 mt-8">
        <div className="relative overflow-hidden bg-gray-900 rounded-3xl p-4 text-white min-h-[216px]">

         <div className="absolute -top-96 -left-48 w-[604px] h-[1004px] opacity-80 rotate-180 bg-[linear-gradient(139deg,rgba(255,176,138,1)_23%,rgba(233,59,54,1)_40%,rgb(23,23,23)_70%)]" />

          <div className="absolute opacity-50 pointer-events-none left-[-2px] top-[-3px] w-[222px] h-[222px] bg-[url('/images/background.png')] bg-cover" />

          <div className="relative flex flex-col items-center justify-between h-full min-h-[200px]">
            <div className="flex flex-col items-center gap-2 pt-2">
              <div className="text-lg font-bold text-center">01/03 Days</div>
              <div className="px-3 py-1 bg-white text-xs font-semibold rounded-full text-[rgb(189,66,58)]" >
                Free trial
              </div>
            </div>

            <h3 className="text-lg font-semibold text-center leading-tight px-2">
              Subscribe to unlock all features
            </h3>

            <Button 
              className="w-full max-w-[141px] h-9 font-semibold border bg-[rgb(202,79,69)]
    shadow-[0px_1px_2px_0px_rgba(0,0,0,0.04)]"
              size="sm"
            >
              Buy Premium
            </Button>
          </div>
        </div>
      </SidebarFooter> */}
    </Sidebar>
  );
}
