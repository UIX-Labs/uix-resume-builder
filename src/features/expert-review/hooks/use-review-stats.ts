import { useFetch } from '@shared/api/hooks/useFetch';
import { fetchReviewStats } from '../api/review-stats';

const REVIEW_STATS_QUERY_KEY = ['review-stats'] as const;

export function useReviewStats() {
  return useFetch({
    queryKey: REVIEW_STATS_QUERY_KEY,
    queryFn: () => fetchReviewStats(),
    staleTime: 0,
  });
}

export { REVIEW_STATS_QUERY_KEY };
