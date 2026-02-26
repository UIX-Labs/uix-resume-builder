export function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-labelledby="download-icon-title">
      <title id="download-icon-title">Download icon</title>
      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" fill="url(#gradient-download)" />
      <defs>
        <linearGradient id="gradient-download" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" className="[stop-color:rgb(var(--color-gradient-coral))]" />
          <stop offset="100%" className="[stop-color:rgb(var(--color-dark-900))]" />
        </linearGradient>
      </defs>
    </svg>
  );
}
