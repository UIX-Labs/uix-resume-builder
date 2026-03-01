// ---------------------------------------------------------------------------
// Anna Field Modern — typed DSL version
//
// Migrated from src/features/resume/templates/template3.ts
// Centered headings with colored background bands, icon-based contact grid.
// ---------------------------------------------------------------------------

import { duration } from '../dsl/fragments';
import { absolutePath, absolutePathDeep, itemField, rawPath, sectionPath } from '../dsl/paths';
import type { TypedTemplateConfig } from '../dsl/template-config';

const template3: TypedTemplateConfig = {
  name: 'Anna Field Modern',

  page: {
    background: '#ffffff',
    className: 'text-neutral-900 leading-relaxed',
    fontFamily: 'Inter',
  },

  sections: [
    // ── Header ──────────────────────────────────────────────────────────
    {
      id: 'header',
      type: 'header',
      className: 'flex flex-col gap-1',
      fields: {
        name: {
          path: absolutePath('personalDetails', 'fullName'),
          fallback: 'Anna Field',
          className: 'text-[20px] font-bold text-[rgb(17,9,128)] mb-2',
        },
        contact: {
          type: 'contact-grid',
          className: 'flex flex-row gap-x-6 text-xs text-gray-700 flex-wrap',
          items: [
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-2',
              items: [
                { type: 'icon', name: 'MapPin', size: 14, className: 'text-[rgb(17,9,128)]' },
                {
                  path: absolutePath('personalDetails', 'address'),
                  fallback: '123 Main Street, Paris, France',
                  className: 'text-xs text-gray-700',
                },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-2',
              items: [
                { type: 'icon', name: 'Mail', size: 14, className: 'text-[rgb(17,9,128)]' },
                {
                  type: 'link',
                  path: absolutePath('personalDetails', 'email'),
                  href: 'mailto:{{value}}',
                  fallback: 'anna@field.com',
                  className: 'text-xs text-gray-700',
                },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-2',
              items: [
                { type: 'icon', name: 'Phone', size: 14, className: 'text-[rgb(17,9,128)]' },
                {
                  path: absolutePath('personalDetails', 'phone'),
                  fallback: '+11 23434546',
                  className: 'text-xs text-gray-700',
                },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-2',
              items: [
                { type: 'icon', name: 'Linkedin', size: 14, className: 'text-[rgb(17,9,128)]' },
                {
                  type: 'link',
                  path: absolutePathDeep('personalDetails', 'links', 'linkedin', 'title'),
                  href: absolutePathDeep('personalDetails', 'links', 'linkedin', 'link'),
                  fallback: '',
                  className: 'text-xs text-gray-700 hover:text-blue-600',
                },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-2',
              items: [
                { type: 'icon', name: 'Github', size: 14, className: 'text-[rgb(17,9,128)]' },
                {
                  type: 'link',
                  path: absolutePathDeep('personalDetails', 'links', 'github', 'title'),
                  href: absolutePathDeep('personalDetails', 'links', 'github', 'link'),
                  fallback: '',
                  className: 'text-xs text-gray-700 hover:text-blue-600',
                },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-2',
              items: [
                { type: 'icon', name: 'Globe', size: 14, className: 'text-[rgb(17,9,128)]' },
                {
                  type: 'link',
                  path: absolutePathDeep('personalDetails', 'links', 'website', 'title'),
                  href: absolutePathDeep('personalDetails', 'links', 'website', 'link'),
                  fallback: '',
                  className: 'text-xs text-gray-700 hover:text-blue-600',
                },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-2',
              items: [
                { type: 'icon', name: 'Youtube', size: 14, className: 'text-[rgb(17,9,128)]' },
                {
                  type: 'link',
                  path: absolutePathDeep('personalDetails', 'links', 'youtube', 'title'),
                  href: absolutePathDeep('personalDetails', 'links', 'youtube', 'link'),
                  fallback: '',
                  className: 'text-xs text-gray-700 hover:text-blue-600',
                },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-2',
              items: [
                { type: 'icon', name: 'Dribbble', size: 14, className: 'text-[rgb(17,9,128)]' },
                {
                  type: 'link',
                  path: absolutePathDeep('personalDetails', 'links', 'dribble', 'title'),
                  href: absolutePathDeep('personalDetails', 'links', 'dribble', 'link'),
                  fallback: '',
                  className: 'text-xs text-gray-700 hover:text-blue-600',
                },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-2',
              items: [
                { type: 'icon', name: 'Palette', size: 14, className: 'text-[rgb(17,9,128)]' },
                {
                  type: 'link',
                  path: absolutePathDeep('personalDetails', 'links', 'behance', 'title'),
                  href: absolutePathDeep('personalDetails', 'links', 'behance', 'link'),
                  fallback: '',
                  className: 'text-xs text-gray-700 hover:text-blue-600',
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
      className: 'flex flex-col gap-3',
      heading: {
        path: rawPath('summary.heading'),
        fallback: 'Summary',
        className:
          'bg-[rgba(17,9,128,0.07)] px-4 py-2 flex justify-center items-center text-sm font-bold text-[rgb(17,9,128)] mt-5',
      },
      content: {
        type: 'html',
        path: absolutePath('personalDetails', 'jobTitle') as any,
        fallback: 'Summary',
        className:
          'text-xs text-gray-700 text-justify leading-relaxed [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 break-words whitespace-pre-wrap',
      },
    },

    // ── Experience ──────────────────────────────────────────────────────
    {
      id: 'experience',
      type: 'list-section',
      break: true,
      heading: {
        path: rawPath('experience.heading'),
        fallback: 'Work Experience',
        className:
          'bg-[rgba(17,9,128,0.07)] px-4 py-2 flex justify-center items-center text-sm font-bold text-[rgb(17,9,128)] mt-5 mb-2',
      },
      listPath: sectionPath('experience', 'items'),
      itemTemplate: {
        className: 'flex flex-col gap-1',
        break: true,
        rows: [
          {
            className: 'flex flex-row justify-between items-start',
            cells: [
              {
                type: 'inline-group',
                className: 'flex flex-col flex-1 leading-none',
                items: [
                  { path: itemField('experience', 'position'), className: 'text-sm text-black' },
                  { path: itemField('experience', 'company'), className: 'text-sm font-bold text-gray-600' },
                ],
              },
              {
                type: 'inline-group',
                className: 'flex flex-col items-end text-right w-[160px] shrink-0 leading-none',
                items: [
                  duration('text-xs text-black italic'),
                  { path: itemField('experience', 'location'), className: 'text-xs text-gray-600' },
                ],
              },
            ],
          },
          {
            cells: [
              {
                type: 'html',
                path: itemField('experience', 'description'),
                className:
                  'text-xs text-gray-700 leading-relaxed [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 break-words whitespace-pre-wrap',
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
      break: true,
      heading: {
        path: rawPath('projects.heading'),
        fallback: 'Projects',
        className:
          'bg-[rgba(17,9,128,0.07)] px-4 py-2 flex justify-center items-center text-sm font-bold text-[rgb(17,9,128)] mt-2 mb-3',
      },
      listPath: sectionPath('projects', 'items'),
      itemTemplate: {
        className: 'flex flex-col mt-3',
        break: true,
        rows: [
          {
            className: 'flex flex-row justify-between items-start',
            cells: [
              {
                path: itemField('projects', 'title'),
                fallback: 'Project Title',
                className: 'text-sm font-bold text-black flex-1',
              },
              duration('text-xs text-black w-[160px] shrink-0 text-right italic'),
            ],
          },
          {
            cells: [
              {
                type: 'html',
                path: itemField('projects', 'description'),
                break: true,
                className:
                  'text-xs text-gray-700 leading-relaxed [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 break-words whitespace-pre-wrap',
              },
            ],
          },
        ],
      },
    },

    // ── Education ───────────────────────────────────────────────────────
    {
      id: 'education',
      type: 'list-section',
      break: false,
      heading: {
        path: rawPath('education.heading'),
        fallback: 'Education',
        className:
          'bg-[rgba(17,9,128,0.07)] px-4 py-2 flex justify-center items-center text-sm font-bold text-[rgb(17,9,128)] mt-5',
      },
      listPath: sectionPath('education', 'items'),
      itemTemplate: {
        className: 'flex flex-row justify-between items-start mt-3',
        rows: [
          {
            className: 'flex flex-col flex-1 leading-none',
            cells: [
              { path: itemField('education', 'degree'), className: 'text-sm font-bold text-black' },
              { path: itemField('education', 'institution'), className: 'text-sm text-gray-600' },
            ],
          },
          {
            className: 'text-right flex flex-col flex-1 leading-none',
            cells: [
              duration('text-xs text-black italic'),
              { path: rawPath('grade.value'), className: 'text-xs text-gray-600' },
            ],
          },
        ],
      },
    },

    // ── Skills ──────────────────────────────────────────────────────────
    {
      id: 'skills',
      type: 'inline-list-section',
      heading: {
        path: rawPath('skills.heading'),
        fallback: 'Skills',
        className:
          'bg-[rgba(17,9,128,0.07)] px-4 py-2 flex justify-center items-center text-sm font-bold text-[rgb(17,9,128)] mt-5 mb-3',
      },
      listPath: sectionPath('skills', 'items'),
      itemPath: itemField('skills', 'name'),
      itemClassName: 'text-xs text-black',
      containerClassName: 'text-xs text-black leading-relaxed pr-2',
      itemSeparator: ', ',
    },

    // ── Interests ───────────────────────────────────────────────────────
    {
      id: 'interests',
      type: 'inline-list-section',
      break: true,
      breakable: true,
      heading: {
        path: rawPath('interests.heading'),
        fallback: 'Interests',
        className:
          'bg-[rgba(17,9,128,0.07)] px-4 py-2 flex justify-center items-center text-sm font-bold text-[rgb(17,9,128)] mt-5 mb-3',
      },
      listPath: rawPath('interests.items[0].items'),
      itemClassName: 'text-xs text-black',
      containerClassName: 'text-xs text-black leading-relaxed',
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
        className:
          'bg-[rgba(17,9,128,0.07)] px-4 py-2 flex justify-center items-center text-sm font-bold text-[rgb(17,9,128)] mt-5',
      },
      listPath: rawPath('achievements.items[0].items'),
      itemPrefix: '• ',
      badgeClassName: 'text-xs text-black',
      containerClassName: 'flex flex-col gap-1 mt-2',
    },

    // ── Certifications ──────────────────────────────────────────────────
    {
      id: 'certifications',
      type: 'list-section',
      break: true,
      heading: {
        path: rawPath('certifications.heading'),
        fallback: 'Certifications',
        className:
          'bg-[rgba(17,9,128,0.07)] py-2 flex justify-center items-center text-sm font-bold text-[rgb(17,9,128)] mt-5 w-full basis-full mb-3',
      },
      listPath: sectionPath('certifications', 'items'),
      itemTemplate: {
        className: 'flex flex-col leading-tight',
        break: true,
        rows: [
          {
            className: 'flex flex-row justify-between items-start',
            cells: [
              {
                path: itemField('certifications', 'title'),
                fallback: 'Certification Title',
                className: 'text-sm font-bold text-black',
              },
              duration('text-xs text-black italic'),
            ],
          },
          {
            className: 'flex flex-row',
            cells: [
              {
                path: itemField('certifications', 'issuer'),
                fallback: 'Issuer',
                className: 'text-xs text-gray-600 italic',
              },
            ],
          },
        ],
      },
    },
  ],
};

export default template3;
