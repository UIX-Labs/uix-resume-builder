// Utility to resolve data paths for renderer
// This is a simplified version specifically for renderer use cases
// where we work with partial data objects, not just full ResumeData
export function resolvePath(data: any, path: string, fallback?: any): any {
  if (!path) return fallback;

  const keys = path.replace(/\[(\d+)\]/g, '.$1').split('.');
  let result = data;

  for (const key of keys) {
    if (result === null || result === undefined) return fallback;
    result = result[key];
  }

  return result ?? fallback;
}
