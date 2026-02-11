'use client';
import { useGetAllTemplates, type Template } from '@entities/template-page/api/template-data';
import { useUserProfile } from '@shared/hooks/use-user';
import { SidebarProvider } from '@shared/ui/sidebar';
import DashboardHeader from '@widgets/dashboard/ui/dashboard-header';
import DashboardSidebar from '@widgets/dashboard/ui/dashboard-sidebar';
import WelcomeHeader from '@widgets/dashboard/ui/welcome-header';
import { useUseTemplate } from '@widgets/templates-page/ui/hooks/use-template-select';
import { PreviewModal } from '@widgets/templates-page/ui/preview-modal';
import { TemplateCard } from '@widgets/templates-page/ui/template-card';
import { useState } from 'react';

export default function GetAllResumesPage() {
  const { data: user, isLoading: isUserLoading } = useUserProfile();
  const { data: templates } = useGetAllTemplates();
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { handleUseTemplate, isLoading } = useUseTemplate();

  const handleTemplateClick = (template: Template) => {
    setPreviewTemplate(template);
    setIsPreviewOpen(true);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-screen bg-white relative">
        {isLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-lg font-semibold text-gray-800">Creating Resume...</p>
              <p className="text-sm text-gray-600">Setting up your workspace</p>
            </div>
          </div>
        )}
        <div className="hidden lg:block">
          <DashboardSidebar />
        </div>

        <div className="flex-1 flex flex-col min-w-0 m-2 sm:m-3">
          <DashboardHeader user={user} />

          <main className="flex bg-[rgb(245,248,250)] mt-2 sm:mt-3 rounded-2xl sm:rounded-[36px] overflow-hidden pb-4 h-full">
            <div className="flex-1">
              <div className="flex text-start w-full px-2 sm:px-0">
                <h1 className="text-[rgb(231,238,243)] font-semibold text-[40px] sm:text-[60px] md:text-[70px] lg:text-[90px] leading-tight -tracking-[3%] h-auto sm:h-[77px] truncate mt-[-10px] sm:mt-[-25px] ml-[-5px] sm:ml-[-10px]">
                  YOUR RESUMES
                </h1>
              </div>

              <WelcomeHeader
                userName={isUserLoading ? '...' : user ? `${user.firstName} ${user.lastName ?? ''}` : 'Guest User'}
              />

              <div className="flex gap-4 sm:gap-6 my-4 sm:my-6 mx-2 sm:mx-4 justify-center sm:justify-evenly flex-wrap">
                {templates?.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    onClick={() =>
                      handleUseTemplate(template.id, {
                        source: 'get_all_resumes_page',
                        method: 'use_template',
                      })
                    }
                    onPreviewClick={() => handleTemplateClick(template)}
                  />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>

      <PreviewModal template={previewTemplate} isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} />
    </SidebarProvider>
  );
}
