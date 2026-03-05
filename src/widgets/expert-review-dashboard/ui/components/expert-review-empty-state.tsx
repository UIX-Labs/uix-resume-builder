'use client';

interface ExpertReviewEmptyStateProps {
  isLoading: boolean;
  colSpan?: number;
  isMobile?: boolean;
}

const EMPTY_MESSAGE = 'No resumes submitted yet. Upload your resume to get expert feedback.';
const LOADING_MESSAGE = 'Loading...';

export function ExpertReviewEmptyState({
  isLoading,
  colSpan = 5,
  isMobile = false,
}: ExpertReviewEmptyStateProps) {
  const content = isLoading ? LOADING_MESSAGE : EMPTY_MESSAGE;
  const className = 'px-4 sm:px-6 py-12 text-center text-[#959DA8]';

  if (isMobile) {
    return <div className={className}>{content}</div>;
  }

  return (
    <tr>
      <td colSpan={colSpan} className={className}>
        {content}
      </td>
    </tr>
  );
}
