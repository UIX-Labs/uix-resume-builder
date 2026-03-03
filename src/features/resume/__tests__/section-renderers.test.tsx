import { renderBadgeSection } from '@features/resume/lib/section-renderers/badge-section';
import { renderContentSection } from '@features/resume/lib/section-renderers/content-section';
import { renderHeaderSection } from '@features/resume/lib/section-renderers/header-section';
import { renderInlineListSection } from '@features/resume/lib/section-renderers/inline-list-section';
import { renderListSection } from '@features/resume/lib/section-renderers/list-section';
import { renderTableSection } from '@features/resume/lib/section-renderers/table-section';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { mockResumeData } from './fixtures/mock-data';

describe('Section Renderer Snapshots', () => {
  describe('Header Section Renderer', () => {
    it('renders header section with personal details', () => {
      const headerSection = {
        id: 'header',
        type: 'header',
        className: 'flex flex-col gap-2',
        fields: {
          name: {
            path: 'personalDetails.items[0].fullName',
            fallback: 'Your Name',
            className: 'text-xl font-bold',
          },
          contact: {
            type: 'inline-group',
            className: 'flex flex-row flex-wrap gap-2 text-xs',
            separator: ' | ',
            items: [
              { path: 'personalDetails.items[0].phone', fallback: 'Phone' },
              {
                type: 'link',
                path: 'personalDetails.items[0].email',
                href: 'mailto:{{value}}',
                fallback: 'Email',
              },
            ],
          },
        },
      };

      const { container } = render(<>{renderHeaderSection(headerSection, mockResumeData, undefined, false, true)}</>);
      expect(container).toMatchSnapshot();
    });

    it('renders header section with image', () => {
      const headerSectionWithImage = {
        id: 'header',
        type: 'header',
        className: 'flex flex-col gap-2',
        fields: {
          image: {
            type: 'image',
            path: 'personalDetails.items[0].profilePicturePublicUrl',
            className: 'w-24 h-24 rounded-full',
          },
          name: {
            path: 'personalDetails.items[0].fullName',
            fallback: 'Your Name',
            className: 'text-xl font-bold',
          },
        },
      };

      const { container } = render(
        <>{renderHeaderSection(headerSectionWithImage, mockResumeData, undefined, false, true)}</>,
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('List Section Renderer', () => {
    it('renders experience list section', () => {
      const experienceSection = {
        id: 'experience',
        type: 'list-section',
        heading: {
          path: 'experience.heading',
          fallback: 'Experience',
          className: 'text-sm font-bold',
        },
        listPath: 'experience.items',
        itemTemplate: {
          className: 'flex flex-col gap-1',
          rows: [
            {
              className: 'flex flex-row justify-between',
              cells: [
                { path: 'company', className: 'font-semibold' },
                {
                  type: 'duration',
                  path: 'duration',
                  className: 'text-xs italic',
                },
              ],
            },
            {
              cells: [
                {
                  type: 'html',
                  path: 'description',
                  className: 'text-sm',
                },
              ],
            },
          ],
        },
      };

      const { container } = render(<>{renderListSection(experienceSection, mockResumeData, undefined, false, true)}</>);
      expect(container).toMatchSnapshot();
    });

    it('renders education list section', () => {
      const educationSection = {
        id: 'education',
        type: 'list-section',
        heading: {
          path: 'education.heading',
          fallback: 'Education',
          className: 'text-sm font-bold',
        },
        listPath: 'education.items',
        itemTemplate: {
          className: 'flex flex-col gap-1',
          rows: [
            {
              className: 'flex flex-row justify-between',
              cells: [
                { path: 'institution', className: 'font-semibold' },
                {
                  type: 'duration',
                  path: 'duration',
                  className: 'text-xs italic',
                },
              ],
            },
            {
              cells: [{ path: 'degree', className: 'text-sm' }],
            },
          ],
        },
      };

      const { container } = render(<>{renderListSection(educationSection, mockResumeData, undefined, false, true)}</>);
      expect(container).toMatchSnapshot();
    });
  });

  describe('Content Section Renderer', () => {
    it('renders summary content section', () => {
      const summarySection = {
        id: 'summary',
        type: 'content-section',
        className: 'flex flex-col',
        heading: {
          path: 'summary.heading',
          fallback: 'Summary',
          className: 'text-sm font-bold',
        },
        content: {
          type: 'html',
          path: 'personalDetails.items[0].description',
          fallback: 'Summary',
          className: 'text-sm',
        },
      };

      const { container } = render(<>{renderContentSection(summarySection, mockResumeData, undefined, false, true)}</>);
      expect(container).toMatchSnapshot();
    });
  });

  describe('Inline List Section Renderer', () => {
    it('renders skills inline list section', () => {
      const skillsSection = {
        id: 'skills',
        type: 'inline-list-section',
        heading: {
          path: 'skills.heading',
          fallback: 'Skills',
          className: 'text-sm font-bold',
        },
        listPath: 'skills.items',
        itemPath: 'name',
        itemClassName: 'text-sm',
        containerClassName: 'flex flex-wrap gap-2',
        itemSeparator: ', ',
      };

      const { container } = render(
        <>{renderInlineListSection(skillsSection, mockResumeData, undefined, false, true)}</>,
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('Badge Section Renderer', () => {
    it('renders skills badge section', () => {
      const skillsBadgeSection = {
        id: 'skills',
        type: 'badge-section',
        heading: {
          path: 'skills.heading',
          fallback: 'Skills',
          className: 'text-sm font-bold',
        },
        listPath: 'skills.items',
        itemPath: 'name',
        badgeClassName: 'px-2 py-1 bg-blue-600 text-white rounded',
        containerClassName: 'flex flex-wrap gap-2',
      };

      const { container } = render(
        <>{renderBadgeSection(skillsBadgeSection, mockResumeData, undefined, false, true)}</>,
      );
      expect(container).toMatchSnapshot();
    });

    it('renders interests badge section', () => {
      const interestsSection = {
        id: 'interests',
        type: 'badge-section',
        heading: {
          path: 'interests.heading',
          fallback: 'Interests',
          className: 'text-sm font-bold',
        },
        listPath: 'interests.items[0].items',
        badgeClassName: 'px-2 py-1 bg-gray-200 rounded',
        containerClassName: 'flex flex-wrap gap-2',
      };

      const { container } = render(<>{renderBadgeSection(interestsSection, mockResumeData, undefined, false, true)}</>);
      expect(container).toMatchSnapshot();
    });
  });

  describe('Table Section Renderer', () => {
    it('renders table section', () => {
      const tableSection = {
        id: 'skills-table',
        type: 'table-section',
        heading: {
          path: 'skills.heading',
          fallback: 'Skills',
          className: 'text-sm font-bold',
        },
        listPath: 'skills.items',
        columns: [
          { header: 'Skill', path: 'name', className: 'font-semibold' },
          { header: 'Level', path: 'level', className: 'text-sm' },
        ],
      };

      const { container } = render(<>{renderTableSection(tableSection, mockResumeData, undefined, false, true)}</>);
      expect(container).toMatchSnapshot();
    });
  });
});
