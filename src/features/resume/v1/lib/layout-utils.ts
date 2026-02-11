import type { ResumeTemplate, TemplateColumnsConfig } from '../types';

export type ResumeLayoutKind = 'single' | 'two-column';

/**
 * Detects whether a template is two-column or single-column from its JSON structure.
 *
 * Two-column: template has `columns` as an object with `left` and `right` (each with `width`),
 * and at least one section has `column: 'right'`.
 * Single-column: no `columns` object, or `columns` is an array (e.g. nested section config),
 * or right width is 0%, or no sections in the right column.
 *
 * Adding a new template:
 * - Single-column: omit top-level `columns`, or use only one column. All sections flow in one column.
 *   Use `break: true` on sections for section breaks (page/section breaks work in both UI and PDF).
 * - Two-column: add `columns: { spacing, left: { width, className? }, right: { width, className? } }`
 *   and set `column: 'left'` or `column: 'right'` on each section. Banner (type: 'banner') is full-width on first page.
 */
export function getResumeTemplateLayout(template: ResumeTemplate): ResumeLayoutKind {
  const cols = template.columns;

  if (!cols || typeof cols !== 'object' || Array.isArray(cols)) return 'single';
  if (!('left' in cols) || !('right' in cols)) return 'single';

  const config = cols as TemplateColumnsConfig;
  const rightWidth = config.right.width;
  if (rightWidth === '0%' || rightWidth === '0px') return 'single';

  const hasRightSections = template.sections.some((s) => s.type !== 'banner' && s.column === 'right');
  if (!hasRightSections) return 'single';

  return 'two-column';
}
