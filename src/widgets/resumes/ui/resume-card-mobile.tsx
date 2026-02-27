'use client';
import { type Resume, useResumeData } from '@entities/resume';

import { ReferralModal } from '@features/referral-flow/ui/referral-modal';
import { ResumeRenderer } from '@features/resume/renderer';
import { formatDate } from '@shared/lib/date-time';
import { Button } from '@shared/ui/button';
import { AuthRedirectModal } from '@shared/ui/components/auth-redirect-modal';
import { MobileDownloadButton } from '@shared/ui/components/mobile-download-button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@shared/ui/dropdown';
import { useQueryClient } from '@tanstack/react-query';
import { usePdfDownload } from '@widgets/form-page-builder/hooks/use-pdf-download';
import { usePdfGeneration } from '@widgets/form-page-builder/hooks/use-pdf-generation';
import { Eye, MoreHorizontal, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { DeleteResumeModal } from './delete-resume-modal';

interface Props {
  resume: Resume;
  onPreview: () => void;
}

function getMobileTitle(title: string) {
  const parts = title.split('-Resume-');
  if (parts.length === 2) {
    const name = parts[0];
    const date = parts[1];
    return `${name} · ${date}`;
  }
  return title;
}

export function ResumeCardMobile({ resume, onPreview }: Props) {
  const queryClient = useQueryClient();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const thumbnailRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { data: resumeData } = useResumeData(resume.id);

  const { isGeneratingPDF, generatePDF } = usePdfGeneration({
    thumbnailRef,
    formData: resumeData,
    resumeId: resume.id,
  });

  const {
    handleDownloadPDF,
    isAuthModalOpen,
    setIsAuthModalOpen,
    authRedirectUrl,
    isReferralModalOpen,
    setIsReferralModalOpen,
    referralUrl,
    downloadsLeft,
    downloadsAllowed,
    isLoggedIn,
  } = usePdfDownload({
    resumeId: resume.id,
    generatePDF,
    onDownloadSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
    },
  });

  const handlePDFClick = async () => {
    try {
      await handleDownloadPDF();
    } catch (error) {
      console.error('PDF download failed:', error);
      toast.error('Failed to download PDF. Please try again.');
    }
  };

  const handleEditClick = () => {
    router.push(`/resume/${resume.id}?openForm=true`);
  };

  return (
    <>
      <div className="w-[85vw] bg-white rounded-2xl p-4 shadow-sm h-[160px] flex flex-col justify-between">
        <div className="flex">
          <div className="flex-1 max-w-[80%]">
            <h3 className="text-base font-semibold truncate">{getMobileTitle(resume.title)}</h3>
            <p className="text-xs text-[#959DA8] mt-1">Last modified · {formatDate(resume.updatedAt)}</p>
            <p className="text-xs text-[#959DA8]">Created · {formatDate(resume.createdAt)}</p>
          </div>

          <div className="flex items-baseline">
            <button
              type="button"
              onClick={onPreview}
              className="rounded-lg active:scale-95 hover:bg-gray-100 transition"
            >
              <Eye className="w-5 h-5 text-gray-400" />
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={() => setShowDeleteDialog(true)}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Resume
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <MobileDownloadButton
            className="flex-1 rounded-[12px] bg-[#005ff2] text-white h-9 px-4 py-2"
            onClick={handlePDFClick}
            downloadsLeft={downloadsLeft ?? 0}
            downloadsAllowed={downloadsAllowed ?? 3}
            isGenerating={isGeneratingPDF}
            isLoggedIn={isLoggedIn}
          />
          <Button
            className="flex-1 rounded-[12px] bg-[#E9F4FF] border border-[#CBE7FF] text-[#005FF2]"
            onClick={handleEditClick}
          >
            Edit Resume
          </Button>
        </div>
      </div>

      <DeleteResumeModal isOpen={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} resume={resume} />

      <AuthRedirectModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        redirectUrl={authRedirectUrl}
        title="Login Required"
        description="You need to login to download PDF."
      />

      <ReferralModal
        isOpen={isReferralModalOpen}
        onClose={() => setIsReferralModalOpen(false)}
        referralLink={referralUrl}
      />

      <div
        style={{
          position: 'fixed',
          left: '-9999px',
          top: 0,
          width: '794px',
          pointerEvents: 'none',
          visibility: 'hidden',
        }}
      >
        <div ref={thumbnailRef}>
          {resumeData?.template?.json && resumeData && (
            <ResumeRenderer template={resumeData.template.json} data={resumeData} isThumbnail hasSuggestions={false} />
          )}
        </div>
      </div>
    </>
  );
}
