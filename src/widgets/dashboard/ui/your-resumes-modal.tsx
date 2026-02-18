'use client';

import { useGetAllResumes, useResumeData, type Resume } from '@entities/resume';
import { useGetTemplateById } from '@entities/template-page/api/template-data';
import { formatDate } from '@shared/lib/date-time';
import { cn } from '@shared/lib/utils';
import { Button } from '@shared/ui/components/button';
import { Modal } from '@shared/ui/components/modal';
import { PreviewModal } from '@widgets/templates-page/ui/preview-modal';
import { Check, Eye } from 'lucide-react';
import { useState } from 'react';

function sortResumesByUpdatedDate(resumes: Resume[] | undefined): Resume[] | undefined {
  return resumes?.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

interface YourResumesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (resumeId: string) => void;
}

export function YourResumesModal({ isOpen, onClose, onSelect }: YourResumesModalProps) {
  const { data: resumes } = useGetAllResumes();
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);
  const [previewResumeId, setPreviewResumeId] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const sortedResumes = sortResumesByUpdatedDate(resumes);

  const { data: previewResumeData } = useResumeData(previewResumeId || '');
  const { data: fetchedTemplate } = useGetTemplateById(previewResumeData?.templateId || null);

  const handleSelectResume = () => {
    if (selectedResumeId) {
      onSelect(selectedResumeId);
      onClose();
    }
  };

  const handlePreview = (resumeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewResumeId(resumeId);
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setPreviewResumeId(null);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} showCloseButton={false} className="w-[300px] h-[487px] p-0">
      <div className="flex items-center justify-between px-4 py-2 bg-[#FAFBFC] border-b border-[#F4F4F4]">
        <h2 className="text-[#0C1118] font-semibold text-[18px] leading-[1.333em] tracking-[-0.0144em]">Your Resume</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="flex flex-col gap-3">
          {sortedResumes?.map((resume) => (
            <ResumeListItem
              key={resume.id}
              resume={resume}
              isSelected={selectedResumeId === resume.id}
              onSelect={() => setSelectedResumeId(resume.id)}
              onPreview={(e) => handlePreview(resume.id, e)}
            />
          ))}
        </div>
      </div>

      {isPreviewOpen && (
        <PreviewModal
          isOpen={isPreviewOpen}
          onClose={handleClosePreview}
          template={fetchedTemplate ? fetchedTemplate : null}
          resumeData={previewResumeData}
        />
      )}

      <div className="px-2 py-2">
        <Button
          onClick={handleSelectResume}
          disabled={!selectedResumeId}
          className={cn(
            'w-full rounded-xl py-2 px-3 text-white font-semibold text-[18px] leading-[1.333em] tracking-[-0.0144em] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.04)] transition-all',
            selectedResumeId ? 'bg-[#02A44F] hover:bg-[#028A42]' : 'bg-[#CCD4DF] cursor-not-allowed',
          )}
        >
          {selectedResumeId ? 'Add' : 'Select'}
        </Button>
      </div>
    </Modal>
  );
}

interface ResumeListItemProps {
  resume: Resume;
  isSelected: boolean;
  onSelect: () => void;
  onPreview: (e: React.MouseEvent) => void;
}

function ResumeListItem({ resume, isSelected, onSelect, onPreview }: ResumeListItemProps) {
  return (
    <>
      <div className="w-full flex items-start gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onSelect}
          className="p-0 bg-transparent hover:opacity-80 transition-opacity h-auto w-auto"
        >
          <div
            className={cn(
              'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 border-2 transition-all bg-white',
              isSelected ? 'border-[#02A44F]' : 'border-[#CCD4DF]',
            )}
          >
            {isSelected && (
              <div className="w-4 h-4 rounded-full bg-[#02A44F] flex items-center justify-center">
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </div>
            )}
          </div>
        </Button>

        <Button
          type="button"
          variant="ghost"
          onClick={onSelect}
          className={cn(
            'flex-1 min-w-0',
            'flex flex-col items-start',
            'p-0 h-auto gap-0',
            'bg-transparent hover:opacity-80 transition-opacity',
          )}
        >
          <h3 className="text-[#656A72] font-normal text-[16px] leading-[1.375em] tracking-[-0.01125em] mb-0.5 truncate max-w-[180px]">
            {resume.title}
          </h3>
          <p className="text-[#959DA8] text-xs leading-[1.5em] font-normal truncate">
            Last modified : {formatDate(resume.updatedAt)}
          </p>
          <p className="text-[#959DA8] text-xs leading-[1.5em] font-normal truncate">
            Created : {formatDate(resume.createdAt)}
          </p>
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onPreview}
          className="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 p-0 bg-transparent hover:opacity-70 transition-opacity"
        >
          <Eye className="size-5 text-black" />
        </Button>
      </div>

      <div className="h-[1px] bg-[#E6EAEF] rounded-full" />
    </>
  );
}
