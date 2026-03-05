import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function fromNow(date: string | Date | null | undefined): string {
  if (!date) return '—';
  return dayjs(date).fromNow();
}
