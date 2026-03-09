// ---------------------------------------------------------------------------
// Kate Creative — typed DSL version
//
// Migrated from src/features/resume/templates/enzo-template3.ts
// Banner header with profile image, 50/50 two-column body, blue accent.
// ---------------------------------------------------------------------------

import { absolutePath, absolutePathDeep, itemField, rawPath, sectionPath } from '../dsl/paths';
import { duration } from '../dsl/fragments';
import type { TypedTemplateConfig } from '../dsl/template-config';

const enzoTemplate3: TypedTemplateConfig = {
  name: 'Kate Creative',

  page: {
    width: '794',
    height: '1122',
    background: '#ffffff',
    className: 'leading-relaxed break-words whitespace-pre-wrap',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },

  columns: {
    spacing: '0px',
    left: {
      width: '50%',
      className: 'flex flex-col gap-2',
    },
    right: {
      width: '50%',
      className: 'pl-4 flex flex-col gap-3',
    },
  },

  sections: [
    // ── Header Banner ───────────────────────────────────────────────────
    {
      id: 'header',
      type: 'banner',
      className: 'flex flex-col justify-center bg-[#F0F8FF] px-8 py-8',
      fields: {
        container: {
          type: 'group',
          className: 'flex flex-row justify-between items-start w-full',
          items: [
            // Name, Image and Summary
            {
              type: 'group',
              className: 'flex flex-col gap-3 pt-1 max-w-[60%]',
              items: [
                {
                  type: 'group',
                  className: 'flex flex-row items-center gap-4',
                  items: [
                    {
                      type: 'image',
                      path: absolutePath('personalDetails', 'profilePicturePublicUrl') as any,
                      fallback: '/images/profileimg.jpeg',
                      className: 'w-24 h-24 rounded-full object-cover bg-white flex-shrink-0',
                    },
                    {
                      type: 'group',
                      className: 'flex flex-col gap-1',
                      items: [
                        {
                          type: 'text',
                          path: absolutePath('personalDetails', 'fullName'),
                          fallback: 'Bhavya Saggi',
                          className: 'text-3xl font-bold leading-none',
                        },
                        {
                          type: 'text',
                          path: absolutePath('personalDetails', 'jobTitle'),
                          fallback: 'Product Designer',
                          className: 'text-base text-blue-600 font-medium',
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'html',
                  path: absolutePath('personalDetails', 'jobTitle') as any,
                  fallback:
                    'Strategic thinker with hands-on skills. Passionate about fostering engineering excellence, building inclusive teams, and aligning technology with business goals.',
                  className: 'text-xs leading-relaxed',
                },
              ],
            },
            // Contact Info
            {
              type: 'group',
              className: 'flex flex-col gap-3 items-end pt-1',
              items: [
                {
                  type: 'link',
                  path: absolutePath('personalDetails', 'email'),
                  href: 'mailto:{{value}}',
                  fallback: 'ninapatel@gmail.com',
                  className:
                    'text-xs font-bold underline decoration-slate-300 underline-offset-2 break-all text-slate-700',
                },
                {
                  path: absolutePath('personalDetails', 'phone'),
                  fallback: '+91 432 2222 322',
                  className:
                    'text-xs font-bold underline decoration-slate-300 underline-offset-2 break-all text-slate-700',
                },
                {
                  type: 'link',
                  path: absolutePathDeep('personalDetails', 'links', 'linkedin', 'title'),
                  href: absolutePathDeep('personalDetails', 'links', 'linkedin', 'link'),
                  className:
                    'text-xs font-bold underline decoration-slate-300 underline-offset-2 break-all text-slate-700',
                },
                {
                  type: 'link',
                  path: absolutePathDeep('personalDetails', 'links', 'github', 'title'),
                  href: absolutePathDeep('personalDetails', 'links', 'github', 'link'),
                  className:
                    'text-xs font-bold underline decoration-slate-300 underline-offset-2 break-all text-slate-700',
                },
                {
                  type: 'link',
                  path: absolutePathDeep('personalDetails', 'links', 'website', 'title'),
                  href: absolutePathDeep('personalDetails', 'links', 'website', 'link'),
                  className:
                    'text-xs font-bold underline decoration-slate-300 underline-offset-2 break-all text-slate-700',
                },
                {
                  type: 'link',
                  path: absolutePathDeep('personalDetails', 'links', 'youtube', 'title'),
                  href: absolutePathDeep('personalDetails', 'links', 'youtube', 'link'),
                  className:
                    'text-xs font-bold underline decoration-slate-300 underline-offset-2 break-all text-slate-700',
                },
                {
                  type: 'link',
                  path: absolutePathDeep('personalDetails', 'links', 'dribble', 'title'),
                  href: absolutePathDeep('personalDetails', 'links', 'dribble', 'link'),
                  className:
                    'text-xs font-bold underline decoration-slate-300 underline-offset-2 break-all text-slate-700',
                },
                {
                  type: 'link',
                  path: absolutePathDeep('personalDetails', 'links', 'behance', 'title'),
                  href: absolutePathDeep('personalDetails', 'links', 'behance', 'link'),
                  className:
                    'text-xs font-bold underline decoration-slate-300 underline-offset-2 break-all text-slate-700',
                },
              ],
            },
          ],
        },
      },
    },

    // ── Experience — Left Column ────────────────────────────────────────
    {
      id: 'experience',
      type: 'list-section',
      column: 'left',
      break: true,
      className: 'pl-6 pt-8',
      heading: {
        path: rawPath('experience.heading'),
        fallback: 'Work experience',
        className: 'text-base font-bold text-[#3B82F6] pt-4',
      },
      listPath: sectionPath('experience', 'items'),
      itemTemplate: {
        className: 'flex flex-col gap-1',
        break: true,
        rows: [
          {
            cells: [{ path: itemField('experience', 'position'), className: 'text-sm font-bold pt-4' }],
          },
          {
            className: 'flex flex-row flex-wrap gap-2 items-center text-xs mb-1',
            cells: [{ path: itemField('experience', 'company'), className: 'font-medium' }, duration('')],
          },
          {
            cells: [
              {
                type: 'html',
                path: itemField('experience', 'description'),
                break: true,
                className:
                  'text-xs leading-relaxed whitespace-pre-wrap break-words [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1',
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
      break: true,
      className: '',
      heading: {
        path: rawPath('education.heading'),
        fallback: 'Education & Learning',
        className: 'text-base font-bold text-[#3B82F6] pt-4',
      },
      listPath: sectionPath('education', 'items'),
      itemTemplate: {
        className: 'flex flex-col',
        rows: [
          { cells: [{ path: itemField('education', 'degree'), className: 'text-sm font-bold' }] },
          { cells: [{ path: itemField('education', 'fieldOfStudy'), fallback: '', className: 'text-xs italic' }] },
          { cells: [{ path: itemField('education', 'institution'), className: 'text-xs' }] },
          {
            className: 'flex flex-row items-center',
            cells: [duration('text-xs italic')],
          },
          {
            className: 'flex flex-row items-center',
            cells: [{ path: rawPath('grade.value'), prefix: 'CGPA - ', className: 'text-xs italic' }],
          },
        ],
      },
    },

    // ── Certifications — Right Column ───────────────────────────────────
    {
      id: 'certifications',
      type: 'list-section',
      column: 'right',
      break: true,
      className: '',
      heading: {
        path: rawPath('certifications.heading'),
        fallback: 'Certifications',
        className: 'text-base font-bold text-[#3B82F6]',
      },
      listPath: sectionPath('certifications', 'items'),
      itemTemplate: {
        className: 'flex flex-col',
        break: true,
        rows: [
          { cells: [{ path: itemField('certifications', 'title'), className: 'text-xs font-bold' }] },
          { cells: [{ path: itemField('certifications', 'issuer'), className: 'text-xs italic' }] },
        ],
      },
    },

    // ── Projects — Right Column ─────────────────────────────────────────
    {
      id: 'projects',
      type: 'list-section',
      column: 'right',
      break: true,
      className: '',
      heading: {
        path: rawPath('projects.heading'),
        fallback: 'Projects',
        className: 'text-base font-bold text-[#3B82F6]',
      },
      listPath: sectionPath('projects', 'items'),
      itemTemplate: {
        className: 'flex flex-col gap-1',
        break: true,
        rows: [
          {
            cells: [
              { path: itemField('projects', 'title'), fallback: 'Project Title', className: 'text-sm font-bold' },
            ],
          },
          {
            className: 'flex flex-row gap-2 items-center',
            cells: [duration('text-xs italic')],
          },
          {
            cells: [
              {
                type: 'html',
                path: itemField('projects', 'description'),
                break: true,
                className:
                  'text-xs leading-relaxed whitespace-pre-wrap break-words [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1',
              },
            ],
          },
        ],
      },
    },

    // ── Skills — Right Column ───────────────────────────────────────────
    {
      id: 'skills',
      break: true,
      breakable: true,
      type: 'inline-list-section',
      column: 'right',
      className: '',
      heading: {
        path: rawPath('skills.heading'),
        fallback: 'Skills',
        className: 'text-base font-bold text-[#3B82F6]',
      },
      listPath: sectionPath('skills', 'items'),
      itemPath: itemField('skills', 'name'),
      itemClassName: 'text-xs',
      containerClassName: 'text-xs leading-relaxed',
      itemSeparator: ', ',
    },

    // ── Interests — Right Column ────────────────────────────────────────
    {
      id: 'interests',
      break: true,
      breakable: true,
      type: 'inline-list-section',
      column: 'right',
      className: '',
      heading: {
        path: rawPath('interests.heading'),
        fallback: 'Interests',
        className: 'text-base font-bold text-[#3B82F6]',
      },
      listPath: rawPath('interests.items[0].items'),
      itemClassName: 'text-xs',
      containerClassName: 'text-xs leading-relaxed',
      itemSeparator: ', ',
    },

    // ── Achievements — Right Column ─────────────────────────────────────
    {
      id: 'achievements',
      break: true,
      breakable: true,
      type: 'inline-list-section',
      column: 'right',
      className: '',
      heading: {
        path: rawPath('achievements.heading'),
        fallback: 'Achievements',
        className: 'text-base font-bold text-[#3B82F6]',
      },
      listPath: rawPath('achievements.items[0].items'),
      itemClassName: 'text-xs',
      containerClassName: 'text-xs leading-relaxed',
      itemSeparator: ', ',
    },
  ],
};

export default enzoTemplate3;
