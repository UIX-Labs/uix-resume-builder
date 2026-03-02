import dayjs from 'dayjs';

import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

// Relative time (e.g. "2 days ago")
export const formatDate = (dateString: string) => {
  const date = dayjs(dateString).fromNow();
  return date;
};

// Absolute date (e.g. "Feb 21, 2026")
export const formatDateShort = (dateString: string) => {
  return dayjs(dateString).format('MMM D, YYYY');
};
