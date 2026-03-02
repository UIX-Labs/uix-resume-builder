'use client';

interface ExpertReviewEmptyStateProps {
  isLoading: boolean;
  colSpan?: number;
}

const EMPTY_MESSAGE = 'No resumes submitted yet. Upload your resume to get expert feedback.';
const LOADING_MESSAGE = 'Loading...';

export function ExpertReviewEmptyState({ isLoading, colSpan = 5 }: ExpertReviewEmptyStateProps) {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="px-4 sm:px-6 py-12 text-center text-[#959DA8]"
      >
        {isLoading ? LOADING_MESSAGE : EMPTY_MESSAGE}
      </td>
    </tr>
  );
}
