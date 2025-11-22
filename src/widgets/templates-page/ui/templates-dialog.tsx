'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@shared/ui/components/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@shared/ui/dialog';
import { cn } from '@shared/lib/cn';
import { Template, useGetAllTemplates } from '@entities/template-page/api/template-data';

interface TemplatesDialogProps {
  children: React.ReactNode;
  onTemplateSelect?: (template: Template) => void;
}

export function TemplatesDialog({ children, onTemplateSelect }: TemplatesDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { data: templates } = useGetAllTemplates();

  const handleTemplateSelect = (template: Template) => {
    onTemplateSelect?.(template);
    setIsOpen(false);
  };

  return (
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
                  onClick={() => handleTemplateSelect(template)}
                />
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface TemplateCardProps {
  template: Template;
  onClick: () => void;
}

function TemplateCard({ template, onClick }: TemplateCardProps) {
  return (
    <div className={cn('group cursor-pointer rounded-lg transition-all duration-200 flex-shrink-0', ' hover:shadow-lg')}>
      <div className="relative w-[280px] h-[360px] glass-card2 border-0 p-4 rounded-[20px]">
        <div className="w-full h-full relative">
          <Image
            src={template.publicImageUrl}
            alt={`Template ${template.id}`}
            fill
            className="object-fit rounded-[20px]"
            unoptimized
          />
        </div>

        <div className="absolute inset-0 flex items-end justify-center pb-9 gap-2 transition-colors duration-500">
          <Button
            variant="secondary"
            size="lg"
            className={cn(
              'cursor-pointer transform transition-all duration-500 ease-out translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100',
              'bg-[rgb(0,95,242)] hover:bg-[rgb(0,81,213)] text-[rgb(242,242,242)] border  border-gray-400 shadow-sm px-7 py-3 h-12 text-lg font-semibold rounded-xl',
            )}
            onClick={onClick}
          >
            Use This Template
          </Button>
        </div>
      </div>
    </div>
  );
}
