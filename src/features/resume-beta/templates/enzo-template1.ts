// ---------------------------------------------------------------------------
// Enzo Professional — typed DSL version
//
// Migrated from src/features/resume/templates/enzo-template1.ts
// Two-column layout with beige left sidebar, gold accent headings,
// profile picture, and right-side content.
// ---------------------------------------------------------------------------

import { duration } from '../dsl/fragments';
import { absolutePath, absolutePathDeep, itemField, rawPath, sectionPath } from '../dsl/paths';
import type { TypedTemplateConfig } from '../dsl/template-config';

const enzoTemplate1: TypedTemplateConfig = {
  name: 'Enzo Professional',

  page: {
    width: '794',
    height: '1122',
    padding: 0,
    background: '#ffffff',
    className: 'text-neutral-900 leading-relaxed break-words whitespace-pre-wrap',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },

  columns: {
    spacing: '0px',
    left: {
      width: '270px',
      className: 'bg-[#E8DCC8] tracking-wide text-neutral-800 px-6 py-8',
    },
    right: {
      width: 'calc(100% - 270px)',
      className: 'px-10 py-8 flex flex-col gap-4',
    },
  },

  sections: [
    // ── Profile Picture — Left Column ───────────────────────────────────
    {
      id: 'profile-picture',
      type: 'header',
      column: 'left',
      className: 'flex flex-col items-center mb-6',
      fields: {
        profileImage: {
          type: 'image',
          path: absolutePath('personalDetails', 'profilePicturePublicUrl') as any,
          fallback: '/images/profileimg.jpeg',
          className: 'w-32 h-32 rounded-full object-cover bg-neutral-300',
          alt: 'Profile img',
        },
      },
    },

    // ── Contact — Left Column ───────────────────────────────────────────
    {
      id: 'header',
      type: 'header',
      column: 'left',
      className: 'mb-6',
      fields: {
        contact: {
          type: 'group',
          className: 'flex flex-col gap-2',
          items: [
            {
              type: 'text',
              path: rawPath(''),
              fallback: 'CONTACT',
              className: 'text-sm font-bold text-[#C9A961] tracking-wide uppercase',
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex flex-row items-center gap-2',
              items: [
                { type: 'icon', name: 'Phone', size: 14, className: 'text-neutral-800 flex-shrink-0' },
                {
                  path: absolutePath('personalDetails', 'phone'),
                  fallback: '',
                  className: 'text-xs text-neutral-800 break-all',
                },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-2',
              items: [
                { type: 'icon', name: 'Mail', size: 14, className: 'text-neutral-800 flex-shrink-0' },
                {
                  type: 'link',
                  path: absolutePath('personalDetails', 'email'),
                  href: 'mailto:{{value}}',
                  fallback: '',
                  className: 'text-xs text-neutral-800 break-all',
                },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-2',
              items: [
                { type: 'icon', name: 'Linkedin', size: 14, className: 'text-neutral-800 flex-shrink-0' },
                {
                  type: 'link',
                  path: absolutePathDeep('personalDetails', 'links', 'linkedin', 'title'),
                  href: absolutePathDeep('personalDetails', 'links', 'linkedin', 'link'),
                  fallback: '',
                  className: 'text-xs text-neutral-800 break-all',
                },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-2',
              items: [
                { type: 'icon', name: 'Github', size: 14, className: 'text-neutral-800 flex-shrink-0' },
                {
                  type: 'link',
                  path: absolutePathDeep('personalDetails', 'links', 'github', 'title'),
                  href: absolutePathDeep('personalDetails', 'links', 'github', 'link'),
                  fallback: '',
                  className: 'text-xs text-neutral-800 break-all',
                },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-2',
              items: [
                { type: 'icon', name: 'Globe', size: 14, className: 'text-neutral-800 flex-shrink-0' },
                {
                  type: 'link',
                  path: absolutePathDeep('personalDetails', 'links', 'website', 'title'),
                  href: absolutePathDeep('personalDetails', 'links', 'website', 'link'),
                  fallback: '',
                  className: 'text-xs text-neutral-800 break-all',
                },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-2',
              items: [
                { type: 'icon', name: 'Youtube', size: 14, className: 'text-neutral-800 flex-shrink-0' },
                {
                  type: 'link',
                  path: absolutePathDeep('personalDetails', 'links', 'youtube', 'title'),
                  href: absolutePathDeep('personalDetails', 'links', 'youtube', 'link'),
                  fallback: '',
                  className: 'text-xs text-neutral-800 break-all',
                },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-2',
              items: [
                { type: 'icon', name: 'Dribbble', size: 14, className: 'text-neutral-800 flex-shrink-0' },
                {
                  type: 'link',
                  path: absolutePathDeep('personalDetails', 'links', 'dribble', 'title'),
                  href: absolutePathDeep('personalDetails', 'links', 'dribble', 'link'),
                  fallback: '',
                  className: 'text-xs text-neutral-800 break-all',
                },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-2',
              items: [
                { type: 'icon', name: 'Palette', size: 14, className: 'text-neutral-800 flex-shrink-0' },
                {
                  type: 'link',
                  path: absolutePathDeep('personalDetails', 'links', 'behance', 'title'),
                  href: absolutePathDeep('personalDetails', 'links', 'behance', 'link'),
                  fallback: '',
                  className: 'text-xs text-neutral-800 break-all',
                },
              ],
            },
          ],
        },
      },
    },

    // ── Summary — Left Column ───────────────────────────────────────────
    {
      id: 'summary',
      type: 'content-section',
      column: 'left',
      className: 'flex flex-col pt-3 border-t border-[#C9A961]',
      heading: {
        path: rawPath('summary.heading'),
        fallback: 'Summary',
        className: 'text-sm font-bold text-[#C9A961] tracking-wide uppercase mb-1',
      },
      content: {
        type: 'html',
        path: absolutePath('personalDetails', 'jobTitle') as any,
        fallback: 'Summary',
        className: 'text-xs text-neutral-800 leading-relaxed break-words whitespace-pre-wrap mb-6',
      },
    },

    // ── Skills — Left Column ────────────────────────────────────────────
    {
      id: 'skills',
      type: 'inline-list-section',
      column: 'left',
      break: true,
      className: 'pl-6 mb-4',
      heading: {
        path: rawPath('skills.heading'),
        fallback: 'SKILLS',
        className: 'text-sm font-bold text-[#C9A961] mb-1 tracking-wide uppercase pt-3 border-t border-[#C9A961]',
      },
      listPath: sectionPath('skills', 'items'),
      itemPath: itemField('skills', 'name'),
      itemSeparator: ', ',
      containerClassName: 'text-xs mb-3.5',
      itemClassName: 'text-xs text-neutral-800 leading-relaxed',
    },

    // ── Name & Title — Right Column ─────────────────────────────────────
    {
      id: 'header',
      type: 'header',
      column: 'right',
      className: 'flex flex-col mb-4',
      fields: {
        nameTitle: {
          className: 'flex flex-col gap-1',
          path: rawPath<string>(''),
        },
        name: {
          path: absolutePath('personalDetails', 'fullName'),
          fallback: 'NELLY SMITH',
          className: 'text-4xl font-bold text-[#C9A961] tracking-wide uppercase',
        },
        title: {
          path: absolutePath('personalDetails', 'jobTitle'),
          fallback: 'GRAPHIC DESIGNER',
          className: 'text-lg font-semibold text-neutral-800 tracking-wide uppercase',
        },
      },
    },

    // ── Experience — Right Column ───────────────────────────────────────
    {
      id: 'experience',
      type: 'list-section',
      column: 'right',
      break: true,
      heading: {
        path: rawPath('experience.heading'),
        fallback: 'EXPERIENCE',
        className: 'text-sm font-bold text-[#C9A961] tracking-wide uppercase',
      },
      listPath: sectionPath('experience', 'items'),
      itemTemplate: {
        className: 'flex flex-col gap-1',
        break: true,
        rows: [
          {
            className: 'flex flex-row justify-between items-baseline gap-2 flex-wrap',
            cells: [
              {
                path: itemField('experience', 'position'),
                className: 'text-sm font-bold text-neutral-900 break-words flex-1 min-w-0',
              },
              {
                path: itemField('experience', 'company'),
                className: 'text-xs font-normal text-neutral-600 italic break-words',
              },
            ],
          },
          {
            className: 'flex flex-row gap-2 items-center text-xs text-neutral-600 flex-wrap',
            cells: [
              duration('text-xs text-neutral-600'),
              {
                path: itemField('experience', 'location'),
                fallback: '',
                prefix: '• ',
                className: 'text-xs text-neutral-600 break-words',
              },
            ],
          },
          {
            cells: [
              {
                type: 'html',
                path: itemField('experience', 'description'),
                break: true,
                className:
                  'text-xs text-neutral-700 leading-relaxed mt-2 break-words whitespace-pre-wrap [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 [&_*]:break-words',
              },
            ],
          },
        ],
      },
    },

    // ── Education — Right Column ────────────────────────────────────────
    {
      id: 'education',
      type: 'list-section',
      column: 'right',
      heading: {
        path: rawPath('education.heading'),
        fallback: 'EDUCATION',
        className: 'text-sm font-bold text-[#C9A961] tracking-wide uppercase mb-1 mt-2',
      },
      listPath: sectionPath('education', 'items'),
      itemTemplate: {
        className: 'flex flex-col',
        rows: [
          {
            className: 'flex flex-row justify-between items-baseline gap-2',
            cells: [
              {
                path: itemField('education', 'degree'),
                className: 'text-sm font-bold text-neutral-900 break-words flex-1 min-w-0',
              },
              duration('text-xs text-neutral-600 flex-shrink-0'),
            ],
          },
          {
            className: 'flex flex-row gap-1 items-center text-xs text-neutral-600 flex-wrap',
            cells: [{ path: itemField('education', 'institution'), className: 'text-xs text-neutral-600 break-words' }],
          },
          {
            cells: [{ path: rawPath('grade.value'), className: 'text-xs text-neutral-700' }],
          },
        ],
      },
    },

    // ── Projects — Right Column ─────────────────────────────────────────
    {
      id: 'projects',
      type: 'list-section',
      column: 'right',
      break: true,
      heading: {
        path: rawPath('projects.title'),
        fallback: 'Projects',
        className: 'text-sm font-bold text-[#C9A961] tracking-wide uppercase mb-1.5 mt-2',
      },
      listPath: sectionPath('projects', 'items'),
      itemTemplate: {
        className: 'flex flex-col',
        break: true,
        fields: [
          {
            type: 'horizontal-group',
            className: 'flex flex-row justify-between items-baseline gap-2 flex-wrap',
            items: [
              {
                path: itemField('projects', 'title'),
                fallback: 'Project Title',
                className: 'text-sm font-bold text-neutral-900 break-words flex-1 min-w-0',
              },
              duration('text-xs text-neutral-600'),
            ],
          },
          {
            type: 'html',
            path: itemField('projects', 'description'),
            break: true,
            className:
              'text-xs text-neutral-700 leading-relaxed mt-2 break-words whitespace-pre-wrap [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 [&_*]:break-words',
          },
        ],
      },
    },

    // ── Certifications — Right Column ───────────────────────────────────
    {
      id: 'certifications',
      type: 'list-section',
      break: true,
      column: 'right',
      heading: {
        path: rawPath('certifications.heading'),
        fallback: 'CERTIFICATIONS',
        className: 'text-sm font-bold text-[#C9A961] tracking-wide uppercase mb-1 mt-2',
      },
      listPath: sectionPath('certifications', 'items'),
      itemTemplate: {
        className: 'flex flex-col leading-none',
        break: true,
        fields: [
          {
            path: itemField('certifications', 'title'),
            fallback: 'Certification Title',
            className: 'text-sm font-bold text-neutral-900 break-words',
          },
          {
            path: itemField('certifications', 'issuer'),
            fallback: 'Issuer',
            className: 'text-xs text-neutral-600 break-words',
          },
        ],
      },
    },

    // ── Interests — Right Column ────────────────────────────────────────
    {
      id: 'interests',
      break: true,
      breakable: true,
      type: 'inline-list-section',
      column: 'right',
      className: 'pt-6 border-t border-[#C9A961]',
      heading: {
        path: rawPath('interests.heading'),
        fallback: 'INTERESTS',
        className: 'text-sm font-bold text-[#C9A961] tracking-wide mb-1 mt-2 uppercase',
      },
      listPath: rawPath('interests.items[0].items'),
      itemClassName: 'text-xs text-neutral-800',
      containerClassName: 'text-xs',
      itemSeparator: ', ',
    },

    // ── Achievements — Right Column ─────────────────────────────────────
    {
      id: 'achievements',
      type: 'badge-section',
      column: 'right',
      break: true,
      breakable: true,
      heading: {
        path: rawPath('achievements.title'),
        fallback: 'Achievements',
        className: 'text-sm font-bold text-[#C9A961] tracking-wide uppercase mt-2 -mb-1',
      },
      listPath: rawPath('achievements.items[0].items'),
      itemPrefix: '• ',
      badgeClassName:
        'block w-full text-xs text-neutral-800 break-words whitespace-pre-wrap leading-relaxed overflow-wrap-anywhere',
    },
  ],
};

export default enzoTemplate1;
