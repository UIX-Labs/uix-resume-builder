'use client';

import { Suspense, useState, useCallback } from 'react';
import type { ResumeExampleCategoryData } from '@/data/resume-example-categories';
import type { ResumeExampleListItem } from '@entities/resume-example/types';
import { useResumeExamples } from '@entities/resume-example/hooks/use-resume-examples';
import { useExampleFilters } from '@entities/resume-example/hooks/use-example-filters';
import { LinkedInModal } from '@widgets/dashboard/ui/linkedin-integration-card';
import Header from '@widgets/landing-page/ui/header-section';
import { CategoryTabs } from './category-tabs';
import { FilterBar } from './filter-bar';
import { ExampleCard, ExampleCardSkeleton } from './example-card';
import { ExamplePreviewModal } from './example-preview-modal';
import { Button } from '@shared/ui/components/button';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import { Loader2, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

/* ─── Props ─── */

interface ResumeExamplesGalleryProps {
  initialCategory?: string;
  categoryData?: ResumeExampleCategoryData;
}

/* ─── Empty State ─── */

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-64 h-48 mb-6 flex items-center justify-center">
        <svg className="w-48 h-48 text-gray-300" viewBox="0 0 200 200" fill="none" aria-hidden="true">
          <circle cx="100" cy="100" r="80" fill="#FEF3C7" />
          <circle cx="80" cy="90" r="30" stroke="#9CA3AF" strokeWidth="4" fill="none" />
          <line x1="102" y1="112" x2="130" y2="140" stroke="#9CA3AF" strokeWidth="4" strokeLinecap="round" />
          <path d="M60 140 Q80 120 100 140 Q120 120 140 140" stroke="#9CA3AF" strokeWidth="2" fill="none" />
        </svg>
      </div>
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">
        We <span className="text-red-500">couldn&apos;t</span> find that.
      </h3>
      <p className="text-gray-500 text-center mb-4">No results matched your filters. Please try different options.</p>
      <Button
        variant="outline"
        onClick={onReset}
        className="rounded-xl cursor-pointer"
      >
        Clear all filters
      </Button>
    </div>
  );
}

/* ─── Error State ─── */

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Something went wrong</h3>
      <p className="text-gray-500 text-center mb-4">We couldn&apos;t load resume examples. Please try again.</p>
      <Button
        onClick={onRetry}
        className="bg-[rgb(0,95,242)] hover:bg-[rgb(0,81,213)] text-white rounded-xl cursor-pointer"
      >
        Try again
      </Button>
    </div>
  );
}

/* ─── Skeleton Grid ─── */

function SkeletonGrid() {
  return (
    <div className="flex items-start gap-x-[25px] gap-y-[44px] my-4 sm:my-6 mx-auto justify-center flex-wrap max-w-[1346px] px-4">
      {Array.from({ length: 10 }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
        <ExampleCardSkeleton key={i} />
      ))}
    </div>
  );
}

/* ─── Pagination ─── */

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-8 mb-4">
      <Button
        variant="outline"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage <= 1}
        className="rounded-xl cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Previous
      </Button>
      <span className="text-sm text-gray-500">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="outline"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage >= totalPages}
        className="rounded-xl cursor-pointer"
      >
        Next
        <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );
}

/* ─── Gallery Content ─── */

function GalleryContent({ initialCategory, categoryData }: ResumeExamplesGalleryProps) {
  const router = useRouter();
  const { filters, setFilters, resetFilters } = useExampleFilters(initialCategory);
  const { data, isLoading, error, refetch } = useResumeExamples(filters);

  // Preview modal state — single click action, "Use This Template" lives inside the modal
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLinkedInModalOpen, setIsLinkedInModalOpen] = useState(false);

  const handleCardClick = useCallback((example: ResumeExampleListItem) => {
    setSelectedSlug(example.slug);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedSlug(null);
  }, []);

  const currentPage = filters.page ?? 1;
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className="relative min-h-screen bg-white">
      <Header />

      {/* Body container — matches templates page */}
      <div className="relative max-w-[1384px] mx-4 sm:mx-auto mt-0 rounded-[36px] border-[3px] border-[#D5E5FF] bg-[#F5F8FA] overflow-hidden pb-10">
        {/* Dot pattern background */}
        <div className="dot-pattern-bg absolute inset-0 z-0" />

        <div className="relative z-10">
          {/* Hero + Filters — narrower container */}
          <div className="max-w-[1112px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero section */}
            <div className="text-center py-10 sm:py-14">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                {categoryData?.heroHeading ? (
                  categoryData.heroHeading
                ) : (
                  <>
                    Professional Resume <em className="not-italic font-bold text-blue-600">Examples</em>
                  </>
                )}
              </h1>
              <p className="mt-3 text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
                {categoryData?.heroDescription ||
                  'Browse professional resume examples for every industry and experience level. Get inspired and start building your own.'}
              </p>
              <div className="flex flex-row items-center justify-center gap-3 mt-6">
                <Button
                  onClick={() => {
                    setIsLinkedInModalOpen(true);
                    trackEvent('create_resume_click', { source: 'examples_hero', method: 'linkedin_autofill' });
                  }}
                  className="bg-[rgb(0,95,242)] hover:bg-[rgb(0,81,213)] text-white px-3 sm:px-6 py-2 sm:py-3 h-10 sm:h-12 text-[12px] sm:text-base rounded-xl cursor-pointer whitespace-nowrap"
                >
                  Auto-fill via LinkedIn
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    trackEvent('create_resume_click', { source: 'examples_hero', method: 'upload_existing' });
                    router.push('/dashboard?action=upload');
                  }}
                  className="px-3 sm:px-6 py-2 sm:py-3 h-10 sm:h-12 text-[12px] sm:text-base rounded-xl cursor-pointer whitespace-nowrap"
                >
                  Upload Existing Resume
                </Button>
              </div>
            </div>

            {/* Category tabs */}
            <CategoryTabs />

            {/* Filter bar */}
            <div className="mt-4 mb-10">
              <FilterBar
                filters={filters}
                onFilterChange={setFilters}
                onReset={resetFilters}
                resultCount={data?.total}
              />
            </div>
          </div>

          {/* Content: Grid / Loading / Empty / Error */}
          {error ? (
            <ErrorState onRetry={() => refetch()} />
          ) : isLoading ? (
            <SkeletonGrid />
          ) : data?.data?.length ? (
            <>
              <div className="flex items-start gap-x-[25px] gap-y-[44px] my-4 sm:my-6 mx-auto justify-center flex-wrap max-w-[1346px] px-4">
                {data.data.map((example) => (
                  <ExampleCard
                    key={example.id}
                    example={example}
                    onClick={() => handleCardClick(example)}
                  />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setFilters({ page })}
              />
            </>
          ) : (
            <EmptyState onReset={resetFilters} />
          )}
        </div>
      </div>

      {/* Preview modal — contains "Use This Template", template switching, similar examples */}
      <ExamplePreviewModal
        exampleSlug={selectedSlug}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* LinkedIn modal for hero CTA */}
      <LinkedInModal isOpen={isLinkedInModalOpen} onClose={() => setIsLinkedInModalOpen(false)} />
    </div>
  );
}

/* ─── Export with Suspense boundary ─── */

export function ResumeExamplesGallery(props: ResumeExamplesGalleryProps) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      }
    >
      <GalleryContent {...props} />
    </Suspense>
  );
}
