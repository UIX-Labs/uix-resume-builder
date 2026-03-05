'use client';

import { useState, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import { useUserProfile } from '@shared/hooks/use-user';
import { ExpertReviewModal } from '@/features/expert-review/ui/expert-review-modal';
import { useReviewStats, REVIEW_STATS_QUERY_KEY } from '@/features/expert-review/hooks/use-review-stats';
import { ExpertReviewHero } from './components/expert-review-hero';
import { ExpertReviewTableCard } from './components/expert-review-table-card';

export default function ExpertReviewPageContent() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data: user, isLoading: isUserLoading } = useUserProfile();
  const { data, isLoading } = useReviewStats();
  const reviews = data?.reviews ?? [];
  const userName = user ? `${user.firstName} ${user.lastName ?? ''}`.trim() : 'User';

  const handleUploadClick = useCallback(() => {
    setIsUploadModalOpen(true);
    trackEvent('expert_review_upload_click', { source: 'dashboard' });
  }, []);

  const handleModalClose = useCallback(() => {
    setIsUploadModalOpen(false);
  }, []);

  const handleUploadSuccess = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: REVIEW_STATS_QUERY_KEY });
  }, [queryClient]);

  return (
    <div className="px-4 md:px-6 pb-8">
      <div className="flex flex-col">
        <ExpertReviewHero userName={isUserLoading ? '...' : userName} onUploadClick={handleUploadClick} />
        <ExpertReviewTableCard reviews={reviews} isLoading={isLoading} />
      </div>

      <ExpertReviewModal isOpen={isUploadModalOpen} onClose={handleModalClose} onSuccess={handleUploadSuccess} />
    </div>
  );
}
