// ---------------------------------------------------------------------------
// Aniket Blue Accent — typed DSL version
//
// Migrated from src/features/resume/templates/aniket.ts
// Blue accent color, badge skills, line dividers under headings.
// ---------------------------------------------------------------------------

import { contactLinks, duration } from '../dsl/fragments';
import { absolutePath, itemField, itemFieldNested, rawPath, sectionPath } from '../dsl/paths';
import type { TypedTemplateConfig } from '../dsl/template-config';

const aniketTemplate: TypedTemplateConfig = {
  name: 'Aniket Blue Accent',

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
      className: 'flex flex-col gap-2',
      fields: {
        name: {
          path: absolutePath('personalDetails', 'fullName'),
          fallback: 'Your Name',
          className: 'tracking-wide text-[20px] font-extrabold text-blue-600',
        },
        contact: contactLinks({
          containerClassName: 'flex flex-row flex-wrap justify-start gap-2 text-xs text-neutral-600',
          separator: ' | ',
          linkClassName: 'hover:text-blue-600',
        }),
      },
    },

    // ── Summary ─────────────────────────────────────────────────────────
    {
      id: 'summary',
      type: 'content-section',
      className: 'flex flex-col mt-5',
      heading: {
        path: rawPath('summary.heading'),
        fallback: 'Summary',
        className: 'uppercase text-xs font-semibold text-blue-600',
      },
      divider: { variant: 'line', className: 'border-neutral-300 mb-2' },
      content: {
        type: 'html',
        path: absolutePath('personalDetails', 'jobTitle') as any,
        fallback: 'Summary',
        className: 'text-xs text-neutral-700 text-justify whitespace-pre-wrap',
      },
    },

    // ── Skills ──────────────────────────────────────────────────────────
    {
      id: 'skills',
      type: 'badge-section',
      heading: {
        path: rawPath('skills.heading'),
        fallback: 'Skills',
        className: 'uppercase tracking-wide text-xs font-semibold text-blue-600 mt-5',
        divider: { variant: 'line', className: 'border-neutral-300 mb-2' },
      },
      listPath: sectionPath('skills', 'items'),
      badgeClassName: 'px-2 py-0.5 bg-blue-600 text-white rounded-md text-xs font-medium',
      containerClassName: 'flex flex-wrap gap-1',
    },

    // ── Experience ──────────────────────────────────────────────────────
    {
      id: 'experience',
      type: 'list-section',
      break: true,
      heading: {
        path: rawPath('experience.heading'),
        fallback: 'Experience',
        className: 'uppercase tracking-wide text-xs font-semibold text-blue-600 mt-2',
        divider: { variant: 'line', className: 'border-neutral-300 mb-2' },
      },
      listPath: sectionPath('experience', 'items'),
      itemTemplate: {
        className: 'flex flex-col mt-3',
        rows: [
          {
            className: 'flex flex-row justify-between items-center leading-none',
            cells: [
              { path: itemField('experience', 'company'), className: 'text-neutral-900 text-sm font-semibold' },
              duration('text-neutral-600 italic text-xs'),
            ],
          },
          {
            className: 'flex flex-row justify-between items-center leading-none',
            cells: [
              { path: itemField('experience', 'position'), className: 'text-xs text-blue-600' },
              { path: itemField('experience', 'location'), className: 'text-xs text-neutral-600' },
            ],
          },
          {
            cells: [
              {
                type: 'html',
                path: itemField('experience', 'description'),
                className: 'text-xs text-neutral-700 break-words [&_ul]:ml-3 [&_li]:list-disc whitespace-pre-wrap mb-2',
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
        className: 'uppercase tracking-wide text-xs font-semibold text-blue-600 mt-5',
        divider: { variant: 'line', className: 'border-neutral-300 -mb-0.5' },
      },
      listPath: sectionPath('education', 'items'),
      itemTemplate: {
        className: 'flex flex-col mt-3 leading-tight',
        rows: [
          {
            className: 'flex flex-row justify-between items-center',
            cells: [
              { path: itemField('education', 'institution'), className: 'text-blue-600 text-sm font-semibold' },
              duration('text-xs text-neutral-700 text-justify italic'),
            ],
          },
          {
            className: 'flex flex-row justify-between items-center leading-none',
            cells: [
              {
                type: 'inline-group',
                className: 'flex flex-row gap-1 items-center',
                separator: ' ',
                items: [
                  { path: itemField('education', 'degree'), className: 'text-xs font-semibold' },
                  {
                    path: itemField('education', 'fieldOfStudy'),
                    fallback: 'Field of Study',
                    className: 'text-xs text-neutral-700 italic',
                  },
                ],
              },
              { path: rawPath('grade.value'), className: 'text-xs text-neutral-700' },
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
        className: 'uppercase tracking-wide text-xs font-semibold text-blue-600 mt-2',
        divider: { variant: 'line', className: 'border-neutral-300 mb-2' },
      },
      listPath: sectionPath('projects', 'items'),
      itemTemplate: {
        className: 'flex flex-col mt-3 leading-tight',
        break: true,
        rows: [
          {
            className: 'flex flex-row justify-between items-center',
            cells: [
              {
                path: itemField('projects', 'title'),
                fallback: 'Project Title',
                className: 'text-sm font-semibold text-neutral-900',
              },
              duration('text-xs text-neutral-600 italic'),
            ],
          },
          {
            cells: [
              {
                type: 'html',
                path: itemField('projects', 'description'),
                fallback: '',
                break: true,
                className: 'text-xs text-neutral-700 break-words [&_ul]:ml-3 [&_li]:list-disc whitespace-pre-wrap',
              },
            ],
          },
          {
            cells: [
              {
                type: 'link',
                path: itemFieldNested('projects', 'link', 'title'),
                href: itemFieldNested('projects', 'link', 'link'),
                fallback: '',
                className: 'text-xs text-blue-600 hover:underline',
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
      column: 'right',
      break: true,
      breakable: true,
      heading: {
        path: rawPath('interests.heading'),
        fallback: 'Interests',
        className: 'uppercase tracking-wide text-xs font-semibold text-blue-600 mt-5',
        divider: { variant: 'line', className: 'border-neutral-300 mb-2' },
      },
      listPath: rawPath('interests.items[0].items'),
      containerClassName: 'flex flex-wrap gap-1',
      badgeClassName: 'px-2 py-0.5 bg-blue-600 text-white rounded-md text-xs font-medium',
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
        className: 'uppercase tracking-wide text-xs font-semibold text-blue-600 mt-5',
        divider: { variant: 'line', className: 'border-neutral-300 mb-1' },
      },
      listPath: rawPath('achievements.items[0].items'),
      containerClassName: 'flex flex-col gap-2',
      badgeClassName:
        'flex gap-1 items-center justify-center w-fit px-2 py-0.5 bg-blue-600 text-white rounded-md text-xs mt-2 font-medium',
    },

    // ── Certifications ──────────────────────────────────────────────────
    {
      id: 'certifications',
      type: 'list-section',
      break: true,
      heading: {
        path: rawPath('certifications.heading'),
        fallback: 'Certifications',
        className: 'uppercase tracking-wide text-xs font-semibold text-blue-600 mt-3 mb-1',
        divider: { variant: 'line', className: 'border-neutral-300 mb-1' },
      },
      listPath: sectionPath('certifications', 'items'),
      itemTemplate: {
        className: 'flex flex-col mt-3 leading-tight',
        break: true,
        rows: [
          {
            className: 'flex flex-row justify-between items-center',
            cells: [
              {
                path: itemField('certifications', 'title'),
                fallback: 'Certification Title',
                className: 'text-sm font-semibold text-neutral-900',
              },
              duration('text-xs text-neutral-600 italic'),
            ],
          },
          {
            className: 'flex flex-row',
            cells: [
              {
                path: itemField('certifications', 'issuer'),
                fallback: 'Issuer',
                className: 'text-xs text-neutral-700',
              },
            ],
          },
          {
            className: 'flex flex-row',
            cells: [
              {
                type: 'link',
                path: itemFieldNested('certifications', 'link', 'title'),
                href: itemFieldNested('certifications', 'link', 'link'),
                fallback: '',
                className: 'text-xs text-blue-600 hover:underline',
              },
            ],
          },
        ],
      },
    },
  ],
};

export default aniketTemplate;
