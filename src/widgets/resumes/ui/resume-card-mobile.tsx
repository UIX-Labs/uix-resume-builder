'use client';
import { type Resume, useResumeData } from '@entities/resume';
import { formatDate } from '@shared/lib/date-time';
import { Button } from '@shared/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@shared/ui/dropdown';
import { MoreHorizontal, Eye, Trash2, Loader2, DownloadIcon } from 'lucide-react';
import { useState, useRef } from 'react';
import { DeleteResumeModal } from '@widgets/resumes/ui/delete-resume-modal';
import { usePdfGeneration } from '@widgets/form-page-builder/hooks/use-pdf-generation';
import { usePdfDownload } from '@widgets/form-page-builder/hooks/use-pdf-download';
import { AuthRedirectModal } from '@shared/ui/components/auth-redirect-modal';
import { MobileTextView } from '@widgets/landing-page/ui/mobile-text-view';
import { toast } from 'sonner';
import { ResumeRenderer } from '@features/resume/renderer';

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
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showMobileView, setShowMobileView] = useState(false);
  const thumbnailRef = useRef<HTMLDivElement>(null);

  const { data: resumeData } = useResumeData(resume.id);
  const { isGeneratingPDF, generatePDF } = usePdfGeneration({
    thumbnailRef,
    formData: resumeData,
    resumeId: resume.id,
  });

  const { handleDownloadPDF, isAuthModalOpen, setIsAuthModalOpen, authRedirectUrl } = usePdfDownload({
    resumeId: resume.id,
    generatePDF,
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
    setShowMobileView(true);
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
          <Button
            variant="outline"
            className="flex-1 rounded-[12px] bg-[#005FF2] text-white"
            onClick={handlePDFClick}
            disabled={isGeneratingPDF}
          >
            <DownloadIcon className="text-white" />
            {isGeneratingPDF ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : 'PDF'}
          </Button>

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
      <div
        style={{
          position: 'absolute',
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

      <MobileTextView isOpen={showMobileView} onClose={() => setShowMobileView(false)} />
    </>
  );
}
