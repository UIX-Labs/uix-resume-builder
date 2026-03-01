// ---------------------------------------------------------------------------
// Reusable template fragments
//
// Pre-built, typed building blocks that templates can compose. Eliminates
// the repetitive boilerplate for common patterns like contact links, section
// headings, and duration fields.
// ---------------------------------------------------------------------------

import { absolutePath, absolutePathDeep, rawPath, type SectionKey } from './paths';
import type {
  DividerConfig,
  DurationField,
  HeadingConfig,
  InlineGroupField,
  TemplateFieldDef,
} from './template-config';

// ---------------------------------------------------------------------------
// Contact links — all social links for the header, typed and reusable
// ---------------------------------------------------------------------------

interface ContactLinksOptions {
  separator?: string;
  className?: string;
  linkClassName?: string;
  containerClassName?: string;
}

/**
 * Returns an inline-group field definition containing phone, email, address,
 * and all social links. Empty fields are automatically filtered at render time.
 *
 * @example
 * ```ts
 * fields: {
 *   contact: contactLinks({ separator: ' | ', className: 'text-xs' }),
 * }
 * ```
 */
export function contactLinks(options: ContactLinksOptions = {}): InlineGroupField {
  const { separator = ' | ', className, linkClassName = '', containerClassName } = options;

  return {
    type: 'inline-group',
    className: containerClassName,
    separator,
    items: [
      { path: absolutePath('personalDetails', 'phone'), className },
      {
        type: 'link',
        path: absolutePath('personalDetails', 'email'),
        href: 'mailto:{{value}}',
        className: linkClassName || className,
      },
      { path: absolutePath('personalDetails', 'address'), className },
      {
        type: 'link',
        path: absolutePathDeep('personalDetails', 'links', 'linkedin', 'title'),
        href: absolutePathDeep('personalDetails', 'links', 'linkedin', 'link'),
        className: linkClassName || className,
      },
      {
        type: 'link',
        path: absolutePathDeep('personalDetails', 'links', 'github', 'title'),
        href: absolutePathDeep('personalDetails', 'links', 'github', 'link'),
        className: linkClassName || className,
      },
      {
        type: 'link',
        path: absolutePathDeep('personalDetails', 'links', 'website', 'title'),
        href: absolutePathDeep('personalDetails', 'links', 'website', 'link'),
        className: linkClassName || className,
      },
      {
        type: 'link',
        path: absolutePathDeep('personalDetails', 'links', 'youtube', 'title'),
        href: absolutePathDeep('personalDetails', 'links', 'youtube', 'link'),
        className: linkClassName || className,
      },
      {
        type: 'link',
        path: absolutePathDeep('personalDetails', 'links', 'dribble', 'title'),
        href: absolutePathDeep('personalDetails', 'links', 'dribble', 'link'),
        className: linkClassName || className,
      },
      {
        type: 'link',
        path: absolutePathDeep('personalDetails', 'links', 'behance', 'title'),
        href: absolutePathDeep('personalDetails', 'links', 'behance', 'link'),
        className: linkClassName || className,
      },
    ] as TemplateFieldDef[],
  };
}

// ---------------------------------------------------------------------------
// Section heading — standard heading with optional divider
// ---------------------------------------------------------------------------

interface SectionHeadingOptions {
  className?: string;
  divider?: DividerConfig;
}

/**
 * Returns a typed heading config for a section.
 *
 * @example
 * ```ts
 * heading: sectionHeading('experience', 'Experience', {
 *   className: 'text-xs font-bold',
 *   divider: { variant: 'line', className: 'bg-neutral-400 h-[2px]' },
 * }),
 * ```
 */
export function sectionHeading(
  sectionKey: SectionKey,
  fallback: string,
  options: SectionHeadingOptions = {},
): HeadingConfig {
  // For sections like 'interests' that use 'heading' property directly,
  // and sections like 'experience' that use 'title'. We support both
  // by using rawPath since the heading path follows a known pattern.
  return {
    path: rawPath(`${sectionKey}.heading`),
    fallback,
    className: options.className,
    divider: options.divider,
  };
}

// ---------------------------------------------------------------------------
// Duration field shorthand
// ---------------------------------------------------------------------------

/**
 * Returns a typed duration field definition.
 *
 * @example
 * ```ts
 * { type: 'duration', path: duration(), className: 'italic text-xs' }
 * // or just:
 * duration('italic text-xs')
 * ```
 */
export function duration(className?: string): DurationField {
  return {
    type: 'duration',
    path: rawPath('duration'),
    className,
  };
}

// ---------------------------------------------------------------------------
// Common divider presets
// ---------------------------------------------------------------------------

export const dividers = {
  /** Thin neutral line */
  thinLine: (className?: string): DividerConfig => ({
    variant: 'line',
    className: className ?? 'bg-neutral-400 w-full h-[2px] mt-0.5',
  }),

  /** Pipe separator */
  pipe: (className?: string): DividerConfig => ({
    variant: 'pipe',
    className,
  }),
} as const;

// ---------------------------------------------------------------------------
// Text-style presets (className patterns used across templates)
// ---------------------------------------------------------------------------

export const textStyles = {
  htmlContent: 'text-xs break-words [&_ul]:ml-3 [&_li]:list-disc whitespace-pre-wrap',
  sectionHeading: (extra?: string) => `text-xs font-bold text-black ${extra ?? ''}`.trim(),
  duration: 'text-xs text-neutral-600 italic',
  label: 'text-xs font-semibold',
} as const;
