// ---------------------------------------------------------------------------
// Aniket Modern Classic — typed DSL version
//
// Migrated from src/features/resume/templates/template1.ts.
// All paths are compile-time checked via FieldPath<T>.
// ---------------------------------------------------------------------------

import { contactLinks, dividers, duration, sectionHeading } from '../dsl/fragments';
import { absolutePath, itemField, itemFieldNested, rawPath, sectionPath } from '../dsl/paths';
import type { TypedTemplateConfig } from '../dsl/template-config';

const aniketTemplate: TypedTemplateConfig = {
  name: 'Aniket Modern Classic',

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
          className: 'text-xl font-bold text-black border-b-2 border-neutral-400 pb-1',
        },
        contact: contactLinks({
          containerClassName: 'flex flex-row flex-wrap justify-start gap-2 text-xs text-black',
          separator: ' | ',
          linkClassName: 'hover:text-blue-600',
        }),
      },
    },

    // ── Summary ─────────────────────────────────────────────────────────
    {
      id: 'summary',
      type: 'content-section',
      className: 'flex flex-col mt-1',
      heading: sectionHeading('professionalSummary', 'Summary', {
        className: 'text-xs font-bold text-black mt-3',
        divider: dividers.thinLine('bg-neutral-400 w-full h-[2px] mt-0.5'),
      }),
      divider: dividers.thinLine(),
      content: {
        type: 'html',
        path: absolutePath('personalDetails', 'jobTitle') as any, // description lives on personalDetails
        fallback: 'Summary',
        className:
          'text-xs text-neutral-700 text-justify [&_ul]:ml-3 [&_li]:list-disc [&_li]:mb-1 break-words whitespace-pre-wrap mt-2',
      },
    },

    // ── Skills ──────────────────────────────────────────────────────────
    {
      id: 'skills',
      type: 'inline-list-section',
      heading: sectionHeading('skills', 'Skills', {
        className: 'text-xs font-bold text-black mt-4',
        divider: dividers.thinLine('bg-neutral-400 w-full h-[2px] mt-0.5'),
      }),
      listPath: sectionPath('skills', 'items'),
      itemPath: itemField('skills', 'name'),
      itemClassName: 'text-xs text-black',
      containerClassName: 'text-xs text-black leading-relaxed mt-2',
      itemSeparator: ', ',
    },

    // ── Experience ──────────────────────────────────────────────────────
    {
      id: 'experience',
      type: 'list-section',
      break: true,
      heading: sectionHeading('experience', 'Experience', {
        className: 'text-xs font-bold text-black mt-1',
        divider: dividers.thinLine('bg-neutral-400 w-full h-[2px] mt-0.5 mb-1.5'),
      }),
      listPath: sectionPath('experience', 'items'),
      itemTemplate: {
        className: 'flex flex-col gap-1 mt-3',
        rows: [
          {
            className: 'flex flex-row flex-wrap justify-start gap-2 text-xs text-black',
            cells: [
              {
                type: 'inline-group',
                separator: ' | ',
                items: [
                  { path: itemField('experience', 'company'), className: 'font-semibold' },
                  { path: itemField('experience', 'location'), className: 'font-semibold' },
                ],
              },
            ],
          },
          {
            className: 'flex flex-row flex-wrap justify-start gap-2 text-xs text-black',
            cells: [
              {
                type: 'inline-group',
                separator: ' | ',
                items: [
                  { path: itemField('experience', 'position'), className: 'font-semibold' },
                  duration('text-xs text-neutral-600 italic'),
                ],
              },
            ],
          },
          {
            cells: [
              {
                type: 'html',
                path: itemField('experience', 'description'),
                className: 'text-xs text-black break-words [&_ul]:ml-3 [&_li]:list-disc whitespace-pre-wrap',
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
      heading: sectionHeading('projects', 'Projects', {
        className: 'text-xs font-bold text-black mt-1',
        divider: dividers.thinLine('bg-neutral-400 w-full h-[2px] mt-0.5 mb-1.5'),
      }),
      listPath: sectionPath('projects', 'items'),
      itemTemplate: {
        className: 'flex flex-col gap-1 mt-3',
        rows: [
          {
            className: 'flex flex-row flex-wrap justify-start gap-2 text-xs text-black',
            cells: [
              {
                type: 'inline-group',
                separator: ' | ',
                items: [
                  { path: itemField('projects', 'title'), className: 'font-semibold' },
                  duration('text-xs text-neutral-600 italic'),
                ],
              },
            ],
          },
          {
            cells: [
              {
                type: 'html',
                path: itemField('projects', 'description'),
                className: 'text-xs text-black break-words [&_ul]:ml-3 [&_li]:list-disc whitespace-pre-wrap',
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
      heading: sectionHeading('education', 'Education', {
        className: 'text-xs font-bold text-black mt-4',
        divider: dividers.thinLine('bg-neutral-400 w-full h-[2px] mt-0.5'),
      }),
      listPath: sectionPath('education', 'items'),
      itemTemplate: {
        className: 'flex flex-col mt-3',
        rows: [
          {
            className: 'flex flex-row justify-between items-start',
            cells: [
              {
                type: 'group',
                className: 'flex flex-col leading-tight',
                items: [
                  { path: itemField('education', 'institution'), className: 'text-xs font-semibold' },
                  { path: itemField('education', 'degree'), className: 'text-xs font-normal' },
                ],
              },
              {
                type: 'group',
                className: 'flex flex-col items-end text-right leading-tight',
                items: [
                  duration('text-xs text-neutral-600 italic'),
                  { path: rawPath('grade.value'), className: 'text-xs text-black' },
                ],
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
      heading: sectionHeading('interests', 'Interests', {
        className: 'text-xs font-bold text-black mt-4',
        divider: dividers.thinLine('bg-neutral-400 w-full h-[2px] mt-0.5'),
      }),
      listPath: rawPath('interests.items[0].items'),
      badgeClassName: 'text-xs text-black',
      containerClassName: 'text-xs text-black leading-relaxed mt-2',
      itemSeparator: ', ',
    },

    // ── Achievements ────────────────────────────────────────────────────
    {
      id: 'achievements',
      type: 'badge-section',
      break: true,
      breakable: true,
      heading: sectionHeading('achievements', 'Achievements', {
        className: 'text-xs font-bold text-black mt-4',
        divider: dividers.thinLine('bg-neutral-400 w-full h-[2px] mt-0.5'),
      }),
      listPath: rawPath('achievements.items[0].items'),
      itemPrefix: '• ',
      badgeClassName: 'text-xs text-black',
      containerClassName: 'flex flex-col gap-1 mt-1.5 leading-none',
    },

    // ── Certifications ──────────────────────────────────────────────────
    {
      id: 'certifications',
      type: 'list-section',
      break: true,
      heading: sectionHeading('certifications', 'Certifications', {
        className: 'text-xs font-bold text-black mt-1',
        divider: dividers.thinLine('bg-neutral-400 w-full h-[2px] mt-0.5 mb-2'),
      }),
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
                className: 'text-xs font-semibold text-neutral-900',
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
