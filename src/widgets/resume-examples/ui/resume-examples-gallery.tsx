'use client';

import { Suspense, useState, useCallback } from 'react';
import type { ResumeExampleCategoryData } from '@/data/resume-example-categories';
import type { ResumeExampleListItem } from '@entities/resume-example/types';
import { useResumeExamples } from '@entities/resume-example/hooks/use-resume-examples';
import { useExampleFilters } from '@entities/resume-example/hooks/use-example-filters';
import { CategoryTabs } from './category-tabs';
import { FilterBar } from './filter-bar';
import { ExampleCard } from './example-card';
import { ExamplePreviewModal } from './example-preview-modal';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

interface ResumeExamplesGalleryProps {
  initialCategory?: string;
  categoryData?: ResumeExampleCategoryData;
}

function GalleryContent({ initialCategory, categoryData }: ResumeExamplesGalleryProps) {
  const { filters, setFilters, resetFilters } = useExampleFilters(initialCategory);
  const { data, isLoading } = useResumeExamples(filters);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            {categoryData?.heroHeading || 'Resume Examples'}
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            {categoryData?.heroDescription ||
              'Browse professional resume examples for every industry and experience level. Get inspired and start building your own.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Category tabs */}
        <CategoryTabs />

        {/* Filters */}
        <div className="mt-4 mb-6">
          <FilterBar filters={filters} onFilterChange={setFilters} onReset={resetFilters} />
        </div>

        {/* Results count */}
        {data && (
          <p className="text-sm text-gray-500 mb-4">
            {data.total} resume example{data.total !== 1 ? 's' : ''} found
          </p>
        )}

        {/* Gallery grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : data?.data?.length ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
              {data.data.map((example) => (
                <ExampleCard key={example.id} example={example} onClick={() => handleCardClick(example)} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setFilters({ page: Math.max(1, currentPage - 1) })}
                  disabled={currentPage <= 1}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                <span className="text-sm text-gray-500">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setFilters({ page: Math.min(totalPages, currentPage + 1) })}
                  disabled={currentPage >= totalPages}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No resume examples found.</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or browse a different category.</p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Preview modal */}
      <ExamplePreviewModal
        exampleSlug={selectedSlug}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSimilarClick={(slug) => setSelectedSlug(slug)}
      />
    </div>
  );
}

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
