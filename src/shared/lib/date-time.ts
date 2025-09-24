import dayjs from 'dayjs';

import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

// days ago
export const formatDate = (dateString: string) => {
  const date = dayjs(dateString).fromNow();
  return date;
};
