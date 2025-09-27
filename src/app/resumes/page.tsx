'use client';
import { useCachedUser } from '@shared/hooks/use-user';
import { formatDate } from '@shared/lib/date-time';
import { SidebarProvider } from '@shared/ui/sidebar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@shared/ui/dropdown';
import { Button } from '@shared/ui/button';
import DashboardSidebar from '@widgets/dashboard/ui/dashboard-sidebar';
import WelcomeHeader from '@widgets/dashboard/ui/welcome-header';
import { DeleteResumeModal } from '@widgets/resumes/ui/delete-resume-modal';
import { MoreVertical, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useGetAllResumes, createResume } from '@entities/resume';

export default function AllResumePage() {
  const user = useCachedUser();

  const { data: resumes } = useGetAllResumes(user?.id ?? null);

  const createResumeMutation = useMutation({
    mutationFn: createResume,
  });

  const router = useRouter();

  const sortedResumes = resumes?.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  async function handleCreateResume() {
    if (!user) {
      return;
    }

    const data = await createResumeMutation.mutateAsync({
      title: 'Frontend Engineer Resume',
      userInfo: {
        userId: user.id,
      },
      templateId: '25c2fb78-b90c-4f77-bbda-7c9198bfe091',
    });
    router.push(`/resume/${data.id}`);
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-screen bg-white">
        <DashboardSidebar />

        <div className="flex-1 flex flex-col min-w-0 m-3">
          <header className="flex justify-between items-center p-4 rounded-3xl bg-[rgba(245,248,250,1)]">
            <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-[30px] min-w-[309px] h-12">
              <Search className="flex-shrink-0 w-6 h-6 text-[rgb(149,157,168)]" />

              <input
                type="text"
                placeholder="search template"
                className="flex-1 border-none outline-none bg-transparent text-base text-[rgb(149,157,168)] leading-[1.375em] tracking-[-1.125%]"
              />
            </div>

            <div className="flex items-center gap-3">
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
                <button
                  type="button"
                  className="w-[240px] h-[320px] flex items-center justify-center rounded-2xl border-2 border-dashed border-gray-400 cursor-pointer hover:border-purple-500 transition"
                  onClick={handleCreateResume}
                >
                  <div className="text-center">
                    <span className="text-3xl text-gray-500">+</span>
                    <p className="text-gray-600 font-medium mt-1">New resume</p>
                  </div>
                </button>

                {sortedResumes?.map((resume, index) => (
                  <ResumeCard key={resume.id} resume={resume} index={index} />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

interface ResumeCardProps {
  resume: {
    id: string;
    title: string;
    updatedAt: string;
    items: Array<{
      sectionType: string;
      rank: number;
    }>;
  };
  index: number;
}

function ResumeCard({ resume }: ResumeCardProps) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <div className="relative w-[240px] h-[320px] rounded-2xl bg-white shadow-sm border transition-all duration-300 overflow-hidden group cursor-pointer">
        <div className="w-full h-full relative rounded-t-2xl">
          <div className="">
            <Image src="images/image-14.svg" alt={resume.title} className="w-full h-full object-cover" fill />
          </div>

          <div className="absolute bottom-0 px-3 py-2 flex justify-between items-center bg-white p-8 w-full">
            <div>
              <h3 className="font-medium text-sm">{resume.title}</h3>
              <p className="text-xs text-gray-500">{formatDate(resume.updatedAt)} · A4</p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                  <MoreVertical className="w-4 h-4 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Button
                    className="flex w-full bg-white items-center text-red-600"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Resume
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="rounded-2xl absolute inset-0 h-[270px] bg-white/40 backdrop-blur-sm flex flex-col justify-center items-center gap-6 text-center transition-all duration-300 opacity-0 group-hover:opacity-100">
          <Button
            className="text-sm bg-transparent hover:bg-transparent font-semibold text-purple-900 hover:underline flex items-center gap-1"
            onClick={() => router.push(`/resume/${resume.id}`)}
          >
            VIEW RESUME →
          </Button>

          <div className="w-12 h-[1px] bg-gray-300"></div>
        </div>
      </div>

      <DeleteResumeModal isOpen={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} resume={resume} />
    </>
  );
}
