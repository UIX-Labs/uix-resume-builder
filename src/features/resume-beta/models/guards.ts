import type { ResumeDataKey } from '@entities/resume';
import type { ObjectSection, ResumeSectionMap, StringSection } from './resume-sections';

// ---------------------------------------------------------------------------
// Section discriminators
// ---------------------------------------------------------------------------

const STRING_SECTIONS: ReadonlySet<ResumeDataKey> = new Set(['interests', 'achievements']);

export function isStringSection(key: ResumeDataKey, section: unknown): section is StringSection {
  return STRING_SECTIONS.has(key) && section !== null && typeof section === 'object' && 'items' in section;
}

export function isObjectSection<K extends ResumeDataKey>(
  key: K,
  section: unknown,
): section is ResumeSectionMap[K] & ObjectSection<unknown> {
  return !STRING_SECTIONS.has(key) && section !== null && typeof section === 'object' && 'items' in section;
}

// ---------------------------------------------------------------------------
// API error guard (for not-accessible modal)
// ---------------------------------------------------------------------------

export interface ApiError {
  status?: number;
  data?: {
    message?: {
      message?: string;
    };
  };
}

export function isApiError(error: unknown): error is ApiError {
  return error !== null && typeof error === 'object' && ('status' in error || 'data' in error);
}
