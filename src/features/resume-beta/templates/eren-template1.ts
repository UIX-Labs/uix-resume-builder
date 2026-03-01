// ---------------------------------------------------------------------------
// Enji Kusnadi — typed DSL version
//
// Migrated from src/features/resume/templates/eren-templete1.ts
// Table-section heavy layout with gradient header and badge-based social links.
// ---------------------------------------------------------------------------

import { absolutePath, absolutePathDeep, itemField, itemFieldNested, rawPath, sectionPath } from '../dsl/paths';
import { sectionHeading } from '../dsl/fragments';
import type { TypedTemplateConfig } from '../dsl/template-config';

const erenTemplate1: TypedTemplateConfig = {
  name: 'Enji Kusnadi',

  page: {
    background: '#ffffff',
    className: 'text-[12px] text-slate-900 leading-[14px]',
    fontFamily: 'Inter',
    padding: 24,
  },

  sections: [
    // ── Header ──────────────────────────────────────────────────────────
    {
      id: 'header',
      type: 'header',
      className:
        'flex flex-col items-center text-center gap-1 pb-6 pt-8 mb-4 bg-no-repeat bg-cover bg-center bg-[linear-gradient(to_right,#E9D5FF,#DBEAFE,#F0F9FF)] -mt-6 -mx-6 ',
      fields: {
        name: {
          path: absolutePath('personalDetails', 'fullName'),
          fallback: 'Enji Kusnadi',
          className: 'text-[28px] font-extrabold tracking-wide text-slate-900',
        },
        title: {
          path: absolutePath('personalDetails', 'jobTitle'),
          fallback: 'Front-End Developer · UI/UX Designer',
          className: 'text-[12px] font-medium text-slate-600 leading-[14px] tracking-normal mt-2',
        },
        contact: {
          type: 'contact-grid',
          className: 'flex flex-col items-center gap-2 mt-2',
          separator: '',
          items: [
            // Top line: Phone, Address, Email
            {
              type: 'inline-group',
              className: 'flex items-center gap-3 text-[12px] leading-[14px] text-black',
              separator: '',
              items: [
                {
                  type: 'inline-group-with-icon',
                  className: 'flex items-center gap-1',
                  items: [
                    { type: 'icon', name: 'Phone', size: 8, className: 'text-black' },
                    {
                      path: absolutePath('personalDetails', 'phone'),
                      fallback: '12332344',
                      className: 'text-[12px] leading-[14px] text-black',
                    },
                  ],
                },
                {
                  type: 'inline-group-with-icon',
                  className: 'inline-flex items-center gap-1 max-w-[280px]',
                  items: [
                    { type: 'icon', name: 'MapPin', size: 8, className: 'text-black' },
                    {
                      path: absolutePath('personalDetails', 'address'),
                      fallback: 'Bandung',
                      className: 'text-[12px] leading-[14px] text-black break-words whitespace-normal',
                    },
                  ],
                },
                {
                  type: 'inline-group-with-icon',
                  className: 'inline-flex items-center gap-1',
                  items: [
                    { type: 'icon', name: 'Mail', size: 8, className: 'text-black' },
                    {
                      type: 'link',
                      path: absolutePath('personalDetails', 'email'),
                      href: 'mailto:{{value}}',
                      fallback: 'mail@enji.dev',
                      className: 'text-[12px] leading-[14px] text-black',
                    },
                  ],
                },
              ],
            },
            // Badge row: Social links
            {
              type: 'inline-group',
              className: 'flex flex-wrap items-center justify-center gap-2',
              separator: '',
              items: [
                {
                  type: 'inline-group-with-icon',
                  className:
                    'inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#F1F8FF] text-blue-900 border border-[#0A66C2]',
                  items: [
                    { type: 'icon', name: 'Linkedin', size: 8, className: 'text-blue-900' },
                    {
                      type: 'link',
                      path: absolutePathDeep('personalDetails', 'links', 'linkedin', 'title'),
                      href: absolutePathDeep('personalDetails', 'links', 'linkedin', 'link'),
                      fallback: '/enjidev',
                      className: 'text-[12px] leading-[14px] text-blue-900',
                    },
                  ],
                },
                {
                  type: 'inline-group-with-icon',
                  className:
                    'inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#F2F2F2] text-gray-900 border border-[#222222]',
                  items: [
                    { type: 'icon', name: 'Github', size: 8, className: 'text-gray-900' },
                    {
                      type: 'link',
                      path: absolutePathDeep('personalDetails', 'links', 'github', 'title'),
                      href: absolutePathDeep('personalDetails', 'links', 'github', 'link'),
                      fallback: '/enjidev',
                      className: 'text-[12px] leading-[14px] text-gray-900',
                    },
                  ],
                },
                {
                  type: 'inline-group-with-icon',
                  className:
                    'inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#F5F5F5] text-gray-900 border border-[#555555]',
                  items: [
                    { type: 'icon', name: 'Globe', size: 8, className: 'text-gray-900' },
                    {
                      type: 'link',
                      path: absolutePathDeep('personalDetails', 'links', 'website', 'title'),
                      href: absolutePathDeep('personalDetails', 'links', 'website', 'link'),
                      fallback: '',
                      className: 'text-[12px] leading-[14px] text-gray-900',
                    },
                  ],
                },
                {
                  type: 'inline-group-with-icon',
                  className:
                    'inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FFF0F0] text-red-900 border border-[#FF0000]',
                  items: [
                    { type: 'icon', name: 'Youtube', size: 8, className: 'text-red-900' },
                    {
                      type: 'link',
                      path: absolutePathDeep('personalDetails', 'links', 'youtube', 'title'),
                      href: absolutePathDeep('personalDetails', 'links', 'youtube', 'link'),
                      fallback: '',
                      className: 'text-[12px] leading-[14px] text-red-900',
                    },
                  ],
                },
                {
                  type: 'inline-group-with-icon',
                  className:
                    'inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FFF0F5] text-pink-900 border border-[#EA4C89]',
                  items: [
                    { type: 'icon', name: 'Dribbble', size: 8, className: 'text-pink-900' },
                    {
                      type: 'link',
                      path: absolutePathDeep('personalDetails', 'links', 'dribble', 'title'),
                      href: absolutePathDeep('personalDetails', 'links', 'dribble', 'link'),
                      fallback: '',
                      className: 'text-[12px] leading-[14px] text-pink-900',
                    },
                  ],
                },
                {
                  type: 'inline-group-with-icon',
                  className:
                    'inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#F0F0FF] text-blue-900 border border-[#053EFF]',
                  items: [
                    { type: 'icon', name: 'Palette', size: 8, className: 'text-blue-900' },
                    {
                      type: 'link',
                      path: absolutePathDeep('personalDetails', 'links', 'behance', 'title'),
                      href: absolutePathDeep('personalDetails', 'links', 'behance', 'link'),
                      fallback: '',
                      className: 'text-[12px] leading-[14px] text-blue-900',
                    },
                  ],
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
      type: 'table-section',
      break: true,
      heading: sectionHeading('professionalSummary', 'Summary', {
        className: 'text-[12px] leading-[14px] font-semibold tracking-wide text-slate-500 uppercase',
      }),
      listPath: sectionPath('professionalSummary', 'items'),
      headingColumn: { className: 'w-32' },
      columns: [
        {
          type: 'group',
          className: 'flex-1',
          items: [
            {
              type: 'html',
              path: rawPath('summary'),
              fallback: 'description',
              className: 'text-[12px] text-slate-700 leading-[14px] break-words whitespace-pre-wrap',
            },
          ],
        },
      ],
      gridTemplateColumns: '128px 1fr',
      className: 'px-8 pt-6 pb-6',
      rowClassName: 'items-start px-8 pb-2.5',
    },

    // ── Education ───────────────────────────────────────────────────────
    {
      id: 'education',
      type: 'table-section',
      break: true,
      heading: sectionHeading('education', 'Education', {
        className: 'text-[12px] leading-[14px] font-semibold tracking-wide text-slate-500 uppercase',
      }),
      listPath: sectionPath('education', 'items'),
      headingColumn: { className: 'w-32' },
      columns: [
        {
          type: 'inline-group',
          containerClassName: 'flex flex-col',
          className: 'flex-1',
          items: [
            {
              type: 'text',
              path: itemField('education', 'institution'),
              fallback: 'STMIK Indonesia Mandiri',
              className: 'font-semibold text-slate-900',
            },
            {
              type: 'text',
              path: itemField('education', 'degree'),
              fallback: 'Teknik Informatika (S1)',
              className: 'text-slate-700',
            },
          ],
        },
        {
          type: 'duration',
          path: rawPath('duration'),
          fallback: 'Oct 2018 - Present',
          className: 'text-[12px] leading-[14px] text-slate-500 whitespace-nowrap ml-auto',
        },
      ],
      gridTemplateColumns: '128px 1fr auto',
      className: 'px-8 pt-8 pb-8',
      containerClassName: 'pb-2 pt-2.5',
      rowClassName: 'items-baseline px-8 pb-2',
    },

    // ── Experience ──────────────────────────────────────────────────────
    {
      id: 'experience',
      type: 'table-section',
      break: true,
      heading: sectionHeading('experience', 'Experience', {
        className: 'text-[12px] leading-[14px] font-semibold tracking-wide text-slate-500 uppercase',
      }),
      listPath: sectionPath('experience', 'items'),
      headingColumn: { className: 'w-32' },
      columns: [
        {
          type: 'group',
          className: 'flex-1 space-y-1',
          break: true,
          items: [
            {
              type: 'inline-group',
              containerClassName: 'flex items-baseline justify-between gap-1',
              items: [
                {
                  type: 'inline-group',
                  containerClassName: 'flex flex-col gap-0.5 leading-[14px]',
                  items: [
                    {
                      type: 'text',
                      path: itemField('experience', 'company'),
                      className: 'text-[12px] leading-[14px] font-semibold text-slate-900',
                    },
                    {
                      type: 'text',
                      path: itemField('experience', 'position'),
                      className: 'text-slate-700',
                    },
                  ],
                },
                {
                  type: 'duration',
                  path: rawPath('duration'),
                  className: 'text-[12px] leading-[14px] text-slate-500 whitespace-nowrap ml-auto',
                },
              ],
            },
            {
              type: 'html',
              path: itemField('experience', 'description'),
              break: true,
              className:
                'text-xs text-slate-700 leading-[14px] [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-0.5 break-words whitespace-pre-wrap',
            },
          ],
        },
      ],
      gridTemplateColumns: '128px 1fr auto',
      className: 'px-8 pt-2 pb-6',
      rowClassName: 'items-start px-8 pb-2',
    },

    // ── Projects ────────────────────────────────────────────────────────
    {
      id: 'projects',
      type: 'table-section',
      break: true,
      heading: sectionHeading('projects', 'Projects', {
        className: 'text-[12px] leading-[14px] font-semibold tracking-wide text-slate-500 uppercase',
      }),
      listPath: sectionPath('projects', 'items'),
      headingColumn: { className: 'w-32' },
      columns: [
        {
          type: 'group',
          className: 'flex-1 space-y-1.5',
          break: true,
          items: [
            {
              type: 'text',
              path: itemField('projects', 'title'),
              fallback: 'SPKJS',
              className: 'text-[12px] leading-[14px] font-semibold text-slate-900',
            },
            {
              type: 'html',
              path: itemField('projects', 'description'),
              break: true,
              className:
                'text-xs text-slate-700 leading-[14px] [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 break-words whitespace-pre-wrap',
            },
            {
              type: 'link',
              path: itemFieldNested('projects', 'link', 'title'),
              href: itemFieldNested('projects', 'link', 'link'),
              className: 'text-[12px] leading-[14px] text-blue-600 hover:underline mt-1',
            },
          ],
        },
      ],
      gridTemplateColumns: '128px 1fr',
      className: 'px-8 pt-6 pb-8',
      rowClassName: 'items-start px-8 pb-2',
    },

    // ── Skills ──────────────────────────────────────────────────────────
    {
      id: 'skills',
      type: 'table-section',
      break: true,
      singleRow: true,
      heading: sectionHeading('skills', 'Skills & Tools', {
        className: 'text-[12px] leading-[14px] font-semibold tracking-wide text-slate-500 uppercase',
      }),
      listPath: sectionPath('skills', 'items'),
      headingColumn: { className: 'w-32' },
      columns: [
        {
          type: 'badge-list',
          path: rawPath('name'),
          break: true,
          className: 'flex-1 col-start-2',
          badgeClassName:
            'px-2 py-0.5 rounded-full border border-slate-200 bg-slate-50 text-[12px] leading-[14px] text-slate-700 font-medium',
          containerClassName: 'gap-1.5',
        },
      ],
      gridTemplateColumns: '128px 1fr',
      className: 'px-8 pt-6 pb-8',
      containerClassName: '',
      rowClassName: 'items-start px-8 pt-2 pb-4',
    },

    // ── Certifications ──────────────────────────────────────────────────
    {
      id: 'certifications',
      type: 'table-section',
      break: true,
      heading: sectionHeading('certifications', 'Certifications', {
        className: 'text-[12px] leading-[14px] font-semibold tracking-wide text-slate-500 uppercase',
      }),
      listPath: sectionPath('certifications', 'items'),
      headingColumn: { className: 'w-32' },
      columns: [
        {
          type: 'group',
          className: 'flex-1 flex flex-col gap-0.5',
          items: [
            {
              type: 'text',
              path: itemField('certifications', 'title'),
              fallback: 'Certification Title',
              className: 'text-[12px] leading-[14px] font-semibold text-slate-900 break-words whitespace-normal',
            },
            {
              type: 'text',
              path: itemField('certifications', 'issuer'),
              fallback: 'Issuer',
              className: 'text-[12px] text-slate-600 leading-[14px]',
            },
            {
              type: 'link',
              path: itemFieldNested('certifications', 'link', 'title'),
              href: itemFieldNested('certifications', 'link', 'link'),
              className: 'text-[12px] leading-[14px] text-blue-600 hover:underline',
            },
          ],
        },
        {
          type: 'duration',
          path: rawPath('duration'),
          className: 'text-[12px] leading-[14px] text-slate-500',
        },
      ],
      gridTemplateColumns: '128px 1fr auto',
      className: 'px-8 pt-6 pb-8',
      containerClassName: '',
      rowClassName: 'items-start px-8 pt-2.5 pb-2',
    },

    // ── Interests ───────────────────────────────────────────────────────
    {
      id: 'interests',
      type: 'table-section',
      break: true,
      singleRow: true,
      heading: sectionHeading('interests', 'Interests', {
        className: 'text-[12px] leading-[14px] font-semibold tracking-wide text-slate-500 uppercase',
      }),
      listPath: rawPath('interests.items'),
      headingColumn: { className: 'w-32' },
      columns: [
        {
          type: 'badge-list',
          path: rawPath('items'),
          break: true,
          className: 'flex-1 col-start-2',
          badgeClassName:
            'px-2 py-0.5 rounded-full border border-slate-200 bg-slate-50 text-[12px] leading-[14px] text-slate-700 font-medium',
          containerClassName: 'gap-1.5',
        },
      ],
      gridTemplateColumns: '128px 1fr',
      className: 'px-8 pt-6 pb-8',
      containerClassName: '',
      rowClassName: 'items-start px-8 pt-2 pb-4',
    },

    // ── Achievements ────────────────────────────────────────────────────
    {
      id: 'achievements',
      type: 'table-section',
      break: true,
      singleRow: true,
      heading: sectionHeading('achievements', 'Achievements', {
        className: 'text-[12px] leading-[14px] font-semibold tracking-wide text-slate-500 uppercase',
      }),
      listPath: rawPath('achievements.items'),
      headingColumn: { className: 'w-32' },
      columns: [
        {
          type: 'badge-list',
          path: rawPath('items'),
          break: true,
          badgeClassName:
            'px-3 py-1 rounded-full border border-slate-200 bg-slate-50 text-[12px] leading-[14px] text-slate-700 font-medium line-clamp-2 break-all',
          containerClassName: 'gap-1.5',
          className: 'flex-1 col-start-2',
        },
      ],
      gridTemplateColumns: '128px 1fr',
      className: 'px-8 pt-6 pb-8',
      containerClassName: '',
      rowClassName: 'items-start px-8 pt-2 pb-4',
    },
  ],
};

export default erenTemplate1;
