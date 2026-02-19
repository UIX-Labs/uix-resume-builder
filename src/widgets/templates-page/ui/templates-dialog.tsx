'use client';

import { type Template, useGetAllTemplates } from '@entities/template-page/api/template-data';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@shared/ui/dialog';
import { useEffect, useState } from 'react';
import { useIsMobile } from '@shared/hooks/use-mobile';
import { PreviewModal } from './preview-modal';
import { TemplateCard } from './template-card';

interface TemplatesDialogProps {
  children: React.ReactNode;
  onTemplateSelect?: (template: Template) => void;
  currentTemplateId?: string | null;
}

export function TemplatesDialog({ children, onTemplateSelect, currentTemplateId }: TemplatesDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const isMobile = useIsMobile();

  const { data: templates } = useGetAllTemplates();

  const handleTemplateClick = (template: Template) => {
    setPreviewTemplate(template);
    setIsPreviewOpen(true);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateOverlay = () => {
      const overlay = document.querySelector('[data-slot="dialog-overlay"]') as HTMLElement;
      if (overlay && isOpen) {
        if (isMobile) {
          overlay.style.bottom = '72px';
          overlay.style.top = '0';
          overlay.style.left = '0';
          overlay.style.right = '0';
        }
      }
    };

    const timer = setTimeout(updateOverlay, 10);

    return () => clearTimeout(timer);
  }, [isOpen, isMobile]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="w-screen md:min-w-[1300px] md:w-auto h-[calc(100vh-72px)] md:h-[90%] max-h-[calc(100vh-72px)] md:max-h-none m-0 p-0 bg-gradient-to-l from-black-80 to-template-dialog-blue border-none flex flex-col overflow-y-auto [&>button]:text-background-white [&>button]:bg-black rounded-none md:rounded-[10px] !fixed top-0 left-0 md:top-[50%] md:left-[50%] !translate-x-0 md:!translate-x-[-50%] !translate-y-0 md:!translate-y-[-50%]">
          <DialogHeader className="px-4 md:px-6 pt-4 md:pt-6 pb-3 md:pb-4">
            <DialogTitle className="mt-2 md:mt-6 flex items-center justify-center gap-2 md:gap-3">
              <span className="w-8 md:w-32 h-[1px] bg-gradient-to-r from-transparent to-gray-100 opacity-40"></span>

              <span className="text-lg md:text-4xl font-semibold text-gray-100 whitespace-nowrap">
                <span className="md:hidden">Templates</span>
                <span className="hidden md:inline">Resume Templates</span>
              </span>

              <span className="w-8 md:w-32 h-[1px] bg-gradient-to-l from-transparent to-gray-100 opacity-40"></span>
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col flex-1 min-h-0">
            <div className="flex-1 overflow-y-auto p-3 md:p-6">
              <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-4 md:gap-8">
                {templates?.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    onClick={() => {
                      onTemplateSelect?.(template);
                      setIsOpen(false);
                    }}
                    onPreviewClick={() => handleTemplateClick(template)}
                    isCurrent={currentTemplateId === template.id}
                  />
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <PreviewModal template={previewTemplate} isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} />
    </>
  );
}
