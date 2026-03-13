'use client';

import type { ResumeExampleListItem } from '@entities/resume-example/types';
import { cn } from '@shared/lib/cn';
import { Briefcase, Clock } from 'lucide-react';

/* ─── Shared Sub-Components ─── */

/** Reusable category pills row — shared between card and preview modal sidebar */
export function CategoryPills({
  categories,
  category,
}: {
  categories?: { id?: string; slug: string; name: string }[];
  category?: { slug: string; name: string };
}) {
  const pills = categories?.length ? categories : category?.name ? [{ slug: category.slug, name: category.name }] : [];

  if (pills.length === 0) return <div className="h-[18px] mb-2" />;

  return (
    <div className="flex items-center gap-1 mb-2 h-[18px] overflow-x-auto overflow-y-hidden scrollbar-hide">
      {pills.map((cat) => (
        <span
          key={cat.slug}
          className="inline-flex items-center px-2 py-1 rounded-full text-[8px] font-normal bg-white text-[#99A3B1] whitespace-nowrap"
        >
          {cat.name}
        </span>
      ))}
    </div>
  );
}

/** Reusable metadata chips (role, experience, color) — shared between card and preview modal */
export function MetadataChips({
  role,
  experienceYears,
  primaryColor,
  colorName,
}: {
  role?: string;
  experienceYears?: number | null;
  primaryColor?: string;
  colorName?: string;
}) {
  return (
    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
      {role && (
        <div className="inline-flex items-center gap-1">
          <Briefcase className="w-3 h-3 text-gray-400" />
          <span className="text-xs text-gray-500">{role}</span>
        </div>
      )}
      {experienceYears !== null && experienceYears !== undefined && (
        <>
          {role && <span className="text-gray-300">|</span>}
          <div className="inline-flex items-center gap-1">
            <Clock className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-500">
              {experienceYears === 0 ? 'Entry level' : `${experienceYears}yr${experienceYears > 1 ? 's' : ''}`}
            </span>
          </div>
        </>
      )}
      {primaryColor && (
        <>
          <span className="text-gray-300">|</span>
          <div
            className="w-3 h-3 rounded-full border border-gray-200"
            style={{ backgroundColor: primaryColor }}
            title={colorName}
          />
        </>
      )}
    </div>
  );
}

/* ─── Skeleton ─── */

export function ExampleCardSkeleton() {
  return (
    <div className="flex-shrink-0 w-[300px] sm:w-[234px]">
      <div className="h-[18px] mb-2" />
      <div className="w-full h-[400px] sm:h-[312px] rounded-[28px] p-3 border-[2px] border-white bg-white/5 glass-card2 animate-pulse">
        <div className="w-full h-full rounded-[24px] bg-gray-200" />
      </div>
      <div className="mt-2.5 space-y-1.5 px-1">
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
        <div className="h-3 bg-gray-100 rounded w-1/2 animate-pulse" />
      </div>
    </div>
  );
}

/* ─── Card ─── */

interface ExampleCardProps {
  example: ResumeExampleListItem;
  onClick: () => void;
}

export function ExampleCard({ example, onClick }: ExampleCardProps) {
  return (
    <div
      className={cn('group cursor-pointer flex-shrink-0 w-[300px] sm:w-[234px]')}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      role="button"
      tabIndex={0}
    >
      {/* Category pills row ABOVE card */}
      <CategoryPills categories={example.categories} category={example.category} />

      {/* Glass card body */}
      <div
        className={cn(
          'relative w-full h-[400px] sm:h-[312px] rounded-[28px] p-3',
          'border-[2px] border-white',
          'bg-white/5 glass-card2',
          'transition-shadow duration-200 group-hover:shadow-lg',
        )}
      >
        {/* Thumbnail */}
        <div className="w-full h-full relative rounded-[24px] overflow-hidden bg-gray-50">
          {example.publicThumbnail?.url || example.templateImageUrl ? (
            // biome-ignore lint/performance/noImgElement: dynamic image source
            <img
              src={example.publicThumbnail?.url || example.templateImageUrl!}
              alt={example.title}
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center p-4">
                <div
                  className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: example.primaryColor || '#2563EB' }}
                >
                  <span className="text-white text-xl font-bold">{example.title.charAt(0)}</span>
                </div>
                <p className="text-sm text-gray-400 line-clamp-2">{example.title}</p>
              </div>
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-lg">
              <span className="text-sm font-medium text-gray-800">Preview</span>
            </div>
          </div>
        </div>
      </div>

      {/* Title + metadata below card */}
      <div className="mt-2.5 px-1">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{example.title}</h3>
        <MetadataChips
          role={example.role}
          experienceYears={example.experienceYears}
          primaryColor={example.primaryColor}
          colorName={example.colorName}
        />
      </div>
    </div>
  );
}
