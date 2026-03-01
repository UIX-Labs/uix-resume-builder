// ---------------------------------------------------------------------------
// Vivek Kumar Professional — typed DSL version
//
// Migrated from src/features/resume/templates/template8.ts
// Centered header, Playfair Display serif font, border-bottom headings.
// ---------------------------------------------------------------------------

import { absolutePath, absolutePathDeep, itemField, itemFieldNested, rawPath, sectionPath } from '../dsl/paths';
import { duration } from '../dsl/fragments';
import type { TypedTemplateConfig } from '../dsl/template-config';

const template8: TypedTemplateConfig = {
  name: 'Vivek Kumar Professional',

  page: {
    background: '#ffffff',
    className: 'text-neutral-900 leading-relaxed',
    fontFamily: 'Playfair Display, serif',
  },

  sections: [
    // ── Header ──────────────────────────────────────────────────────────
    {
      id: 'header',
      type: 'header',
      className: 'flex flex-col items-center text-center gap-2',
      break: true,
      fields: {
        name: {
          path: absolutePath('personalDetails', 'fullName'),
          fallback: 'VIVEK KUMAR',
          className: 'text-xl break-words font-base tracking-[0.1em] uppercase mb-2',
        },
        contact: {
          type: 'contact-grid',
          className: 'flex flex-row flex-wrap items-center justify-center gap-4 text-sm font-[600]',
          items: [
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-1',
              items: [
                { type: 'icon', name: 'Phone', size: 12, className: 'w-3 h-3' },
                {
                  path: absolutePath('personalDetails', 'phone'),
                  fallback: '+91 8595481430',
                  className: 'text-sm',
                },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-1',
              items: [
                { type: 'icon', name: 'Mail', size: 12, className: 'w-3 h-3' },
                {
                  type: 'link',
                  path: absolutePath('personalDetails', 'email'),
                  href: 'mailto:{{value}}',
                  fallback: 'vivekabhiraj456@gmail.com',
                  className: 'text-sm underline',
                },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-1',
              items: [
                { type: 'icon', name: 'Linkedin', size: 12, className: 'w-3 h-3' },
                {
                  type: 'link',
                  path: absolutePathDeep('personalDetails', 'links', 'linkedin', 'title'),
                  href: absolutePathDeep('personalDetails', 'links', 'linkedin', 'link'),
                  fallback: '',
                  className: 'text-sm underline',
                },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-1',
              items: [
                { type: 'icon', name: 'Github', size: 12, className: 'w-3 h-3' },
                {
                  type: 'link',
                  path: absolutePathDeep('personalDetails', 'links', 'github', 'title'),
                  href: absolutePathDeep('personalDetails', 'links', 'github', 'link'),
                  fallback: '',
                  className: 'text-sm underline',
                },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-1',
              items: [
                { type: 'icon', name: 'Globe', size: 12, className: 'w-3 h-3' },
                {
                  type: 'link',
                  path: absolutePathDeep('personalDetails', 'links', 'website', 'title'),
                  href: absolutePathDeep('personalDetails', 'links', 'website', 'link'),
                  fallback: '',
                  className: 'text-sm underline',
                },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-1',
              items: [
                { type: 'icon', name: 'Youtube', size: 12, className: 'w-3 h-3' },
                {
                  type: 'link',
                  path: absolutePathDeep('personalDetails', 'links', 'youtube', 'title'),
                  href: absolutePathDeep('personalDetails', 'links', 'youtube', 'link'),
                  fallback: '',
                  className: 'text-sm underline',
                },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-1',
              items: [
                { type: 'icon', name: 'Dribbble', size: 12, className: 'w-3 h-3' },
                {
                  type: 'link',
                  path: absolutePathDeep('personalDetails', 'links', 'dribble', 'title'),
                  href: absolutePathDeep('personalDetails', 'links', 'dribble', 'link'),
                  fallback: '',
                  className: 'text-sm underline',
                },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-1',
              items: [
                { type: 'icon', name: 'Palette', size: 12, className: 'w-3 h-3' },
                {
                  type: 'link',
                  path: absolutePathDeep('personalDetails', 'links', 'behance', 'title'),
                  href: absolutePathDeep('personalDetails', 'links', 'behance', 'link'),
                  fallback: '',
                  className: 'text-sm underline',
                },
              ],
            },
          ],
        },
      },
    },

    // ── Summary ─────────────────────────────────────────────────────────
    {
      id: 'summary',
      type: 'content-section',
      className: 'flex flex-col mt-4',
      heading: {
        path: rawPath('summary.heading'),
        fallback: 'Summary',
        className: 'text-base font-bold border-b border-neutral-900 mb-1.5 mt-5',
      },
      content: {
        type: 'html',
        path: absolutePath('personalDetails', 'jobTitle') as any,
        fallback: 'Professional Summary',
        className:
          'text-sm text-neutral-900 leading-relaxed [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-0.5 [&_strong]:font-bold whitespace-pre-wrap',
      },
    },

    // ── Education ───────────────────────────────────────────────────────
    {
      id: 'education',
      type: 'list-section',
      className: 'flex flex-col mt-4',
      heading: {
        path: rawPath('education.heading'),
        fallback: 'Education',
        className: 'text-base font-bold border-b border-neutral-900 pb-0.5 mt-4',
      },
      listPath: sectionPath('education', 'items'),
      itemTemplate: {
        className: 'flex flex-col gap-0.5 mt-2 leading-none',
        rows: [
          {
            className: 'flex flex-row justify-between items-start',
            cells: [
              { path: itemField('education', 'institution'), className: 'text-sm font-bold' },
              { path: rawPath('grade.value'), className: 'text-sm font-bold' },
            ],
          },
          {
            className: 'flex flex-row justify-between items-start',
            cells: [{ path: itemField('education', 'degree'), className: 'text-sm' }, duration('text-sm italic')],
          },
        ],
      },
    },

    // ── Experience ──────────────────────────────────────────────────────
    {
      id: 'experience',
      type: 'list-section',
      className: 'flex flex-col',
      break: true,
      heading: {
        path: rawPath('experience.heading'),
        fallback: 'Work Experience',
        className: 'text-base font-bold border-b border-neutral-900 pb-0.5 mt-2 mb-1',
      },
      listPath: sectionPath('experience', 'items'),
      itemTemplate: {
        className: 'flex flex-col gap-1 leading-none mt-3',
        break: true,
        rows: [
          {
            className: 'flex flex-row justify-between items-start',
            cells: [
              { path: itemField('experience', 'company'), className: 'text-sm font-bold' },
              { path: itemField('experience', 'location'), className: 'text-sm font-bold' },
            ],
          },
          {
            className: 'flex flex-row justify-between items-start',
            cells: [{ path: itemField('experience', 'position'), className: 'text-sm' }, duration('text-sm italic')],
          },
          {
            cells: [
              {
                type: 'html',
                path: itemField('experience', 'description'),
                className:
                  'text-sm [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-0.5 [&_strong]:font-bold whitespace-pre-wrap',
              },
            ],
          },
        ],
      },
    },

    // ── Projects ────────────────────────────────────────────────────────
    {
      id: 'projects',
      type: 'list-section',
      className: 'flex flex-col mt-4',
      break: true,
      heading: {
        path: rawPath('projects.heading'),
        fallback: 'Projects',
        className: 'text-base font-bold border-b border-neutral-900 pb-0.5 mt-2.5 mb-1',
      },
      listPath: sectionPath('projects', 'items'),
      itemTemplate: {
        className: 'flex flex-col mt-3',
        break: true,
        fields: [
          {
            type: 'inline-group',
            className: 'flex flex-row items-center gap-2',
            items: [
              { path: itemField('projects', 'title'), className: 'text-sm font-bold' },
              {
                type: 'link',
                path: itemFieldNested('projects', 'link', 'title'),
                href: itemFieldNested('projects', 'link', 'link'),
                fallback: '',
                className: 'text-sm underline hover:text-blue-600',
              },
            ],
          },
          {
            type: 'html',
            path: itemField('projects', 'description'),
            break: true,
            className: 'text-sm [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-0.5 [&_strong]:font-bold whitespace-pre-wrap',
          },
        ],
      },
    },

    // ── Skills ──────────────────────────────────────────────────────────
    {
      id: 'skills',
      type: 'inline-list-section',
      break: true,
      breakable: true,
      heading: {
        path: rawPath('skills.heading'),
        fallback: 'Technical Skills',
        className: 'text-base font-bold border-b border-neutral-900 pb-0.5 capitalize mt-4 mb-1.5',
      },
      listPath: sectionPath('skills', 'items'),
      itemPath: itemField('skills', 'name'),
      itemClassName: 'text-sm text-black',
      containerClassName: 'text-sm text-black leading-relaxed pr-2',
      itemSeparator: ', ',
    },

    // ── Achievements ────────────────────────────────────────────────────
    {
      id: 'achievements',
      type: 'badge-section',
      break: true,
      breakable: true,
      heading: {
        path: rawPath('achievements.heading'),
        fallback: 'Achievements',
        className: 'text-base font-bold border-b border-neutral-900 pb-0.5 capitalize mt-4 mb-1',
      },
      listPath: rawPath('achievements.items[0].items'),
      itemPrefix: '• ',
      badgeClassName: 'text-sm text-black',
      containerClassName: 'flex flex-wrap gap-1',
    },

    // ── Certifications ──────────────────────────────────────────────────
    {
      id: 'certifications',
      type: 'list-section',
      break: true,
      className: 'flex flex-col mt-4',
      heading: {
        path: rawPath('certifications.heading'),
        fallback: 'Certifications',
        className: 'text-base font-bold border-b border-neutral-900 pb-0.5 capitalize mt-1.5 mb-1',
      },
      listPath: sectionPath('certifications', 'items'),
      itemTemplate: {
        className: 'flex flex-col gap-0.5 mt-3 leading-none',
        break: true,
        rows: [
          {
            className: 'flex justify-between items-baseline',
            cells: [
              {
                path: itemField('certifications', 'title'),
                fallback: 'Certification Title',
                className: 'text-sm font-bold',
              },
              duration('text-sm italic whitespace-nowrap'),
            ],
          },
          {
            cells: [
              {
                path: itemField('certifications', 'issuer'),
                fallback: 'Issuer',
                className: 'text-sm',
              },
            ],
          },
          {
            cells: [
              {
                type: 'link',
                path: itemFieldNested('certifications', 'link', 'title'),
                href: itemFieldNested('certifications', 'link', 'link'),
                fallback: '',
                className: 'text-sm underline hover:text-blue-600',
              },
            ],
          },
        ],
      },
    },

    // ── Interests ───────────────────────────────────────────────────────
    {
      id: 'interests',
      type: 'badge-section',
      break: true,
      breakable: true,
      heading: {
        path: rawPath('interests.heading'),
        fallback: 'Interests',
        className: 'text-base font-bold border-b border-neutral-900 pb-0.5 capitalize mt-4 mb-1',
      },
      listPath: rawPath('interests.items[0].items'),
      badgeClassName: 'text-sm text-black',
      containerClassName: 'flex flex-wrap gap-1',
      itemSeparator: ', ',
    },
  ],
};

export default template8;
