'use client';
import { useUserProfile } from '@shared/hooks/use-user';
import { formatDate } from '@shared/lib/date-time';
import { SidebarProvider } from '@shared/ui/sidebar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@shared/ui/dropdown';
import { Button } from '@shared/ui/button';
import DashboardHeader from '@widgets/dashboard/ui/dashboard-header';
import DashboardSidebar from '@widgets/dashboard/ui/dashboard-sidebar';
import WelcomeHeader from '@widgets/dashboard/ui/welcome-header';
import { DeleteResumeModal } from '@widgets/resumes/ui/delete-resume-modal';
import { MoreVertical, Trash2 } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useGetAllResumes, createResume, type Resume } from '@entities/resume';
import { getOrCreateGuestEmail } from '@shared/lib/guest-email';

export default function AllResumePage() {
  const { data: user, isLoading } = useUserProfile();
  const { data: resumes } = useGetAllResumes();

  const createResumeMutation = useMutation({
    mutationFn: createResume,
  });

  const router = useRouter();

  const sortedResumes = resumes?.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  async function handleCreateResume() {
    // biome-ignore lint/correctness/noUnusedVariables: <explanation>
    let guestEmail: string | undefined;

    if (!user?.isLoggedIn) {
      guestEmail = getOrCreateGuestEmail();
    } else if (!user) {
      return;
    }

    const currentDate = new Date().toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
    const userName = user ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Guest User';
    const title = `${userName}-Resume-${currentDate}`;

    const data = await createResumeMutation.mutateAsync({
      title: title,
      userInfo: {
        userId: user?.id ?? '',
      },
    });

    router.push(`/resume/${data.id}`);
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-screen bg-white">
        <DashboardSidebar />

        <div className="flex-1 flex flex-col min-w-0 m-3">
          <DashboardHeader user={user} />

          <main className="flex bg-[rgb(245,248,250)] mt-3 rounded-[36px] overflow-hidden pb-4 h-full">
            <div className="flex-1">
              <div className="flex text-start w-full">
                <h1 className="text-[rgb(231,238,243)] font-semibold text-[90px] leading-tight -tracking-[3%] h-[77px] truncate mt-[-25px] ml-[-10px]">
                  YOUR RESUMES
                </h1>
              </div>

              <WelcomeHeader
                userName={isLoading ? '...' : user ? `${user.firstName} ${user.lastName ?? ''}` : 'Guest User'}
              />

              <div className="flex gap-6 mt-6 mx-4 flex-wrap">
                <button
                  type="button"
                  className="w-[260px] h-[320px] flex items-center justify-center rounded-2xl border-2 border-dashed border-gray-400 cursor-pointer hover:border-purple-500 transition"
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
  resume: Resume;
  index: number;
}

function ResumeCard({ resume }: ResumeCardProps) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <div className="relative w-[260px] h-[320px] rounded-2xl bg-white shadow-sm border transition-all duration-300 overflow-hidden group cursor-pointer">
        <div className="w-full h-full overflow-hidden rounded-t-2xl">
          <div className="">
            {resume.publicThumbnail?.url ? (
              <Image src={resume.publicThumbnail.url} width={260} height={320} alt={resume.title} unoptimized />
            ) : (
              <Image src="/images/image-14.svg" alt={resume.title} className="w-full h-full object-contain" fill />
            )}
          </div>

          <div className="absolute bottom-0 px-3 py-2 flex justify-between items-center bg-white p-8 w-full">
            <div>
              <h3 className="font-medium text-sm">{resume.title}</h3>
              <p className="text-xs text-gray-500">{formatDate(resume.updatedAt)}</p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 p-0 cursor-pointer">
                  <MoreVertical className="w-4 h-4 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Button
                    className="flex w-full bg-white items-center text-red-600 cursor-pointer"
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

        <button
          type="button"
          className="rounded-2xl rounded-b-none absolute inset-0 h-[270px] bg-white/40 backdrop-blur-sm flex flex-col justify-center items-center gap-6 text-center transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer text-black"
          onClick={() => router.push(`/resume/${resume.id}`)}
        >
          <span className="hover:text-blue-500 transition-all duration-300">VIEW RESUME →</span>
        </button>
      </div>

      <DeleteResumeModal isOpen={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} resume={resume} />
    </>
  );
}
