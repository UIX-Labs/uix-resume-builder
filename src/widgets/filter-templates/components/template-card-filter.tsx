'use client';

import type { Template } from '@entities/template-page/api/template-data';
import { cn } from '@shared/lib/cn';
import { Button } from '@shared/ui/components/button';
import { PreviewButton } from '@shared/ui/components/preview-button';
import Image from 'next/image';

interface TemplateCardFilterProps {
  template: Template;
  onClick: () => void;
  isDashboard?: boolean;
  onPreviewClick?: () => void;
  isCurrent?: boolean;
}

export function TemplateCardFilter({
  template,
  onClick,
  isDashboard = false,
  onPreviewClick,
  isCurrent = false,
}: TemplateCardFilterProps) {
  return (
    <div
      className={cn(
        'group cursor-pointer transition-all duration-200 flex-shrink-0 hover:shadow-lg mx-auto relative mb-16',
        isDashboard
          ? 'w-[280px] h-[400px] sm:w-[320px] sm:h-[460px] lg:w-[380px] lg:h-[547px]'
          : 'w-[75vw] max-w-[420px] h-[420px] sm:w-[260px] sm:h-[360px]',
      )}
    >
      {(template.role?.length ?? 0) > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {/* First visible role badge */}
          <div
            className="bg-gray-100 backdrop-blur-md 
                    border border-gray-200 
                    text-xs text-gray-700 
                    px-3 py-1 rounded-full"
          >
            {template.role[0].replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
          </div>

          {/* "+X MORE" badge with hover popup */}
          {template.role.length > 1 && (
            <div className="relative group inline-block">
              {/* +MORE Tag */}
              <div
                className="bg-gray-100 backdrop-blur-md 
                        border border-gray-200 
                        text-xs text-gray-700
                        px-3 py-1 rounded-full 
                        cursor-pointer transition-all duration-200 
                        hover:bg-gray-200 
                        hover:border-gray-200"
              >
                +{template.role.length - 1} More
              </div>

              {/* Floating Panel — opens UPWARD */}
              <div
                className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 
                        opacity-0 scale-95 pointer-events-none
                        group-hover:opacity-100 
                        group-hover:scale-100 
                        group-hover:pointer-events-auto
                        transition-all duration-200 ease-out
                        z-50"
              >
                {/* Arrow pointing down */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 -bottom-2 
                          w-4 h-4 bg-white 
                          rotate-45 rounded-sm
                          border-r border-b border-gray-200"
                />

                <div
                  className="bg-white 
                          border border-gray-200 
                          rounded-xl shadow-xl shadow-black/10
                          p-4 
                          max-h-[280px] overflow-y-auto"
                >
                  {/* All remaining role chips */}
                  <div className="flex flex-wrap gap-2">
                    {template.role.slice(1).map((role, index) => (
                      <span
                        key={index}
                        className="inline-block 
                             bg-gray-100 
                             text-gray-700 text-xs font-medium
                             px-3 py-1.5 rounded-md
                             border border-gray-200
                             hover:bg-gray-200 
                             transition-colors duration-150
                             cursor-default whitespace-nowrap"
                      >
                        {role.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <div
        className={cn(
          'relative glass-card2 border-0 p-4 rounded-[20px]',
          isDashboard
            ? 'w-[280px] h-[360px] sm:w-[320px] sm:h-[460px] lg:w-[380px] lg:h-[547px]'
            : 'w-full h-[420px] sm:w-[260px] sm:h-[360px]',
        )}
      >
        {isCurrent && (
          <div className="md:hidden absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
            <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap shadow-md">
              current template
            </div>
          </div>
        )}

        <div className="w-full h-full relative">
          <Image
            src={template.publicImageUrl}
            alt={`Template ${template.id}`}
            fill
            className="object-fit rounded-[20px]"
            unoptimized
          />
        </div>

        <PreviewButton onClick={() => onPreviewClick?.()} />

        <div className="absolute inset-0 flex items-end justify-center pb-6 sm:pb-9 gap-2 transition-colors duration-500 pointer-events-none">
          <Button
            variant="secondary"
            size="lg"
            className={cn(
              'pointer-events-auto cursor-pointer transform transition-all duration-500 ease-out',
              'translate-y-0 opacity-100',
              'lg:translate-y-10 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100',
              'shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgba(0,95,242,0.3)]',
              'hover:scale-[1.02] active:scale-[0.98]',
              'bg-[rgb(0,95,242)] hover:bg-[rgb(0,81,213)] text-[rgb(242,242,242)] border border-gray-400 px-5 sm:px-7 py-2 sm:py-3 h-10 sm:h-12 text-base sm:text-lg font-semibold rounded-xl',
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
