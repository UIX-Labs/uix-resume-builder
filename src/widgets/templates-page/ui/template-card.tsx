'use client';

import type { Template } from '@entities/template-page/api/template-data';
import { cn } from '@shared/lib/cn';
import { Button } from '@shared/ui/components/button';
import { PreviewButton } from '@shared/ui/components/preview-button';
import Image from 'next/image';

interface TemplateCardProps {
  template: Template;
  onClick: () => void;
  isDashboard?: boolean;
  onPreviewClick?: () => void;
  isCurrent?: boolean;
  isNew?: boolean;
  isTrending?: boolean;
}

function formatRoleName(name: string): string {
  return name.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export function TemplateCardSkeleton() {
  return (
    <div className="flex-shrink-0 w-[234px]">
      <div className="h-[18px] mb-2" />
      <div className="w-[234px] h-[312px] rounded-[28px] p-3 border-[2px] border-white bg-white/5 glass-card2 animate-pulse">
        <div className="w-full h-full rounded-[24px] bg-gray-200" />
      </div>
    </div>
  );
}

export function TemplateCard({
  template,
  onClick,
  // biome-ignore lint/correctness/noUnusedFunctionParameters: kept for API compatibility with consumers
  isDashboard = false,
  onPreviewClick,
  isCurrent = false,
  isNew = false,
  isTrending = false,
}: TemplateCardProps) {
  const roles = template.roles || [];

  return (
    <div className={cn('group cursor-pointer flex-shrink-0 w-[234px]')}>
      {/* Role pills row ABOVE card — Figma: H 18, gap 4, mb 8 */}
      <div className="flex items-center gap-1 mb-2 h-[18px] overflow-x-auto overflow-y-hidden scrollbar-hide">
        {isTrending && (
          <span className="inline-flex items-center gap-0.5 px-2 py-1 rounded-full text-[8px] font-normal bg-amber-500 text-white whitespace-nowrap">
            Trending
          </span>
        )}
        {isNew && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-[8px] font-normal bg-green-500 text-white whitespace-nowrap">
            New
          </span>
        )}
        {roles.map((role) => (
          <span
            key={role.id}
            className="inline-flex items-center px-2 py-1 rounded-full text-[8px] font-normal bg-white text-[#99A3B1] whitespace-nowrap"
          >
            {formatRoleName(role.name)}
          </span>
        ))}
      </div>

      {/* Card parent — Figma: 234×312, radius 28, white 5% fill, white 2px stroke inside, glass, 12px padding */}
      <div
        className={cn(
          'relative w-[234px] h-[312px] rounded-[28px] p-3',
          'border-[2px] border-white',
          'bg-white/5 glass-card2',
        )}
      >
        {isCurrent && (
          <div className="md:hidden absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
            <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap shadow-md">
              current template
            </div>
          </div>
        )}

        {/* Image — Figma: ~196×274, radius 24, clip content */}
        <div className="w-full h-full relative rounded-[24px] overflow-hidden">
          <Image
            src={template.publicImageUrl}
            alt={`Template ${template.id}`}
            fill
            className="object-contain object-top"
            unoptimized
          />
        </div>

        {/* Eye Icon - Preview Button */}
        <PreviewButton onClick={() => onPreviewClick?.()} />

        {/* Use This Template button — visible on mobile, hover on desktop */}
        <div className="absolute inset-0 flex items-end justify-center pb-4 transition-colors duration-500 pointer-events-none">
          <Button
            variant="secondary"
            size="lg"
            className={cn(
              'pointer-events-auto cursor-pointer transform transition-all duration-500 ease-out',
              'translate-y-0 opacity-100',
              'lg:translate-y-10 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100',
              'shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgba(0,95,242,0.3)]',
              'hover:scale-[1.02] active:scale-[0.98]',
              'bg-[rgb(0,95,242)] hover:bg-[rgb(0,81,213)] text-white border-0 px-5 py-2 h-10 text-sm font-semibold rounded-xl',
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
