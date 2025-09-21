"use client"
import { useUser } from "@shared/hooks/use-user";
import { SidebarProvider } from "@shared/ui/sidebar";
import DashboardCarousel from "@widgets/dashboard/ui/dashboard-carousel";
import DashboardSidebar from "@widgets/dashboard/ui/dashboard-sidebar";
import LinkedinIntegrationCard from "@widgets/dashboard/ui/linkedin-integration-card";
import ResumeCreationCard from "@widgets/dashboard/ui/resume-creation-card";
import WelcomeHeader from "@widgets/dashboard/ui/welcome-header";
import { Bell, Search } from "lucide-react";

export default function DashboardLayout() {
  const { data: user } = useUser();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-screen bg-white">
        <DashboardSidebar />

        <div className="flex-1 flex flex-col min-w-0 m-3">
          <header className="flex justify-between items-center bg-[rgba(245,248,250,1)] p-4 rounded-3xl">
            <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-[30px] min-w-[309px] h-12">

             <Search className="flex-shrink-0 w-6 h-6 text-[rgb(149,157,168)]" />

              <input
                type="text"
                placeholder="search template"
                className="flex-1 border-none outline-none bg-transparent text-base text-[rgb(149,157,168)] leading-[1.375em] tracking-[-1.125%]" />
            </div>

            <div className="flex items-center gap-6">
              <div
                className="flex items-center justify-center bg-white rounded-full w-[53px] h-[53px]"
              >
                <Bell className="w-6 h-6 text-[rgb(49,60,66)]"
                />
              </div>

              <div className="flex items-center gap-2">
                <div
                  className="flex items-center justify-center bg-blue-200 rounded-full overflow-hidden h-[53px] w-[53px]"
                >
                   <span className="text-xl font-bold text-gray-600">
                    {user?.firstName?.charAt(0)}
                  </span>
                </div>

                <div className="flex flex-col" >
                  <span
                    className="text-black leading-[1.375em] tracking-[-1.125%] text-base font-normal"
                  >
                    {user ? `${user.firstName} ${user.lastName ?? ''}` : ''}
                  </span>

                   <span className="text-[13px] font-normal leading-[1.385em] text-[rgb(149,157,168)]">
                    {user?.email ?? ''}
                  </span>
                </div>

              </div>
            </div>
          </header>

          <main className="flex bg-[rgb(245,248,250)] mt-3 rounded-[36px] overflow-hidden pb-4">
            <div className="flex-1">
              <div className="flex text-start w-full">
                <h1 className="text-[rgb(231,238,243)] font-semibold text-[90px] leading-tight -tracking-[3%] h-[77px] truncate mt-[-25px] ml-[-10px]">
                  DASHBOARD
                </h1>
              </div>

              <WelcomeHeader userName={(user?.firstName ?? "") + " " + (user?.lastName ?? "")}/>
                
              <div className="px-4">
                <ResumeCreationCard/>
              </div>

              <div className="flex-1 mt-4 px-4">
                <LinkedinIntegrationCard />
              </div>
            </div>

            <div className="w-110 bg-[rgb(235,241,244)] p-4 mt-[54px] mr-4 rounded-[20px] shadow overflow-hidden">
              <DashboardCarousel />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
