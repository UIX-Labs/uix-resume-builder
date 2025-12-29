'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@shared/ui/dialog';
import { type Template, useGetAllTemplates } from '@entities/template-page/api/template-data';
import { PreviewModal } from './preview-modal';
import { TemplateCard } from './template-card';

interface TemplatesDialogProps {
  children: React.ReactNode;
  onTemplateSelect?: (template: Template) => void;
}

export function TemplatesDialog({ children, onTemplateSelect }: TemplatesDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const { data: templates } = useGetAllTemplates();

  const handleTemplateClick = (template: Template) => {
    setPreviewTemplate(template);
    setIsPreviewOpen(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="min-w-[1300px] h-[90%] p-0 bg-gradient-to-l from-black/80 to-[rgb(36,114,235)] border-none flex flex-col overflow-y-auto [&>button]:text-white [&>button]:bg-black">
          <DialogHeader className="px-6 pt-6 pb-4">
            <DialogTitle className="mt-6 flex items-center justify-center gap-3">
              <span className="w-32 h-[1px] bg-gradient-to-r from-transparent to-gray-100 opacity-40"></span>

              <span className="text-4xl font-semibold text-gray-100 whitespace-nowrap">Resume Templates</span>

              <span className="w-32 h-[1px] bg-gradient-to-l from-transparent to-gray-100 opacity-40"></span>
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col">
            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex flex-wrap justify-center gap-8">
                {templates?.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    onClick={() => {
                      onTemplateSelect?.(template);
                      setIsOpen(false);
                    }}
                    onPreviewClick={() => handleTemplateClick(template)}
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
