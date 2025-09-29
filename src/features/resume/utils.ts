import type { DataBindingPath, ResumeData, ResumeDataValue } from './types';

export function resolvePath({
  data,
  path,
  fallback,
}: { data: ResumeData } & DataBindingPath): ResumeDataValue | Array<ResumeDataValue> {
  if (!path) {
    return data;
  }

  const pathArray = path
    .replace(/^data\./, '')
    .split('.')
    .flatMap((segment) => {
      const parts = [];

      const regex = /([^[\]]+)|\[(\d+)\]/g;

      let match: RegExpExecArray | null;

      while ((match = regex.exec(segment))) {
        parts.push(match[1] ?? match[2]);
      }

      return parts;
    });

  const value = pathArray.reduce<any>((p, c) => {
    if (p == null) {
      return undefined;
    }

    if (typeof p === 'object' && c in p) {
      return p[c as keyof typeof p];
    }

    return undefined;
  }, data);

  return value ?? fallback;
}
