/**
 * Formats the time difference from now in a human-readable format
 */
export function formatTimeAgo(timestamp: number | null): string | null {
  if (!timestamp) return null;

  const diff = Date.now() - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);

  if (seconds < 60) {
    return "saved less than a minute ago";
  } else if (minutes === 1) {
    return "saved a minute ago";
  } else if (minutes < 60) {
    return `saved ${minutes} minutes ago`;
  } else {
    const hours = Math.floor(minutes / 60);
    if (hours === 1) {
      return "saved an hour ago";
    } else if (hours < 24) {
      return `saved ${hours} hours ago`;
    } else {
      const days = Math.floor(hours / 24);
      if (days === 1) {
        return "saved 24 hours ago";
      } else {
        return `saved ${days} days ago`;
      }
    }
  }
}

