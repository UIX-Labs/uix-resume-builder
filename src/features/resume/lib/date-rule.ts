import { isAfter, startOfToday } from 'date-fns';

export function disableFutureDates(date: Date): boolean {
  return isAfter(date, startOfToday());
}
