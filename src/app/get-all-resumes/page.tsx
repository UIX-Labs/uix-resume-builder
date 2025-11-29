'use client';
import { useGetAllTemplates } from '@entities/template-page/api/template-data';
import { useUserProfile } from '@shared/hooks/use-user';
import { Button } from '@shared/ui/button';
import { SidebarProvider } from '@shared/ui/sidebar';
import DashboardSidebar from '@widgets/dashboard/ui/dashboard-sidebar';
import WelcomeHeader from '@widgets/dashboard/ui/welcome-header';
import { TemplateCard } from '@widgets/templates-page/ui/templates-dialog';
import { HomeIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { createResume, updateResumeTemplate } from '@entities/resume';

export default function GetAllResumesPage() {
  const router = useRouter();
  const { data: user } = useUserProfile();
  const { data: templates } = useGetAllTemplates();

  const createResumeMutation = useMutation({
    mutationFn: createResume,
  });

  const updateTemplateMutation = useMutation({
    mutationFn: updateResumeTemplate,
  });

  const isLoading = createResumeMutation.isPending || updateTemplateMutation.isPending;

  const handleTemplateSelect = async (templateId: string) => {
    if (!user?.id) {
      return;
    }

    try {
      const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      const userName = `${user.firstName} ${user.lastName || ''}`.trim();
      const title = `${userName}-Resume-${currentDate}`;

      const data = await createResumeMutation.mutateAsync({
        title,
        userInfo: {
          userId: user.id,
        },
      });

      await updateTemplateMutation.mutateAsync({
        resumeId: data.id,
        templateId,
      });

      router.push(`/resume/${data.id}`);
    } catch (error) {
      console.error('Failed to create resume:', error);
    }
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
        <DashboardSidebar />

        <div className="flex-1 flex flex-col min-w-0 m-3">
          <header className="flex justify-end items-center p-4 rounded-3xl bg-[rgba(245,248,250,1)]">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center bg-blue-200 rounded-full overflow-hidden h-[53px] w-[53px]">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => router.push('/')}
                  className="border-none bg-transparent hover:bg-transparent"
                >
                  <HomeIcon className="w-full h-full" />
                </Button>
              </div>

              <div className="flex items-center justify-center bg-blue-200 rounded-full overflow-hidden h-[53px] w-[53px]">
                <span className="text-xl font-bold text-gray-600">{user?.firstName?.charAt(0)}</span>
              </div>

              <div className="flex flex-col">
                <span className="text-black leading-[1.375em] tracking-[-1.125%] text-base font-normal">
                  {user ? `${user.firstName} ${user.lastName ?? ''}` : 'Loading...'}
                </span>

                <span className="text-[13px] font-normal leading-[1.385em] text-[rgb(149,157,168)]">
                  {user?.email ?? 'Loading...'}
                </span>
              </div>
            </div>
          </header>

          <main className="flex bg-[rgb(245,248,250)] mt-3 rounded-[36px] overflow-hidden pb-4 h-full">
            <div className="flex-1">
              <div className="flex text-start w-full">
                <h1 className="text-[rgb(231,238,243)] font-semibold text-[90px] leading-tight -tracking-[3%] h-[77px] truncate mt-[-25px] ml-[-10px]">
                  YOUR RESUMES
                </h1>
              </div>

              <WelcomeHeader userName={(user?.firstName ?? '') + ' ' + (user?.lastName ?? '')} />

              <div className="flex gap-6 mt-6 mx-4 flex-wrap">
                {templates?.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    onClick={() => handleTemplateSelect(template.id)}
                  />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
