const erenTemplate3 = {
  name: 'Ethan Executive',

  page: {
    width: 794,
    height: 1122,
    background: '#ffffff',
    className: 'text-[11px] text-neutral-900 leading-relaxed',
    fontFamily: 'Inter, sans-serif',
  },

  columns: {
    spacing: '24px',
    left: {
      width: '66%',
      className: 'pr-6 flex flex-col gap-2',
    },
    right: {
      width: '34%',
      className: 'pl-6 flex flex-col gap-2',
    },
  },

  sections: [
    /**
     * HEADER - Full width banner
     */
    {
      id: 'header-banner',
      type: 'banner',
      className: 'flex flex-col gap-1 px-10 pt-10',
      fields: {
        name: {
          path: 'personalDetails.items[0].fullName',
          fallback: 'ETHAN SMITH',
          className: 'text-[30px] font-bold tracking-tight text-neutral-900 leading-none',
        },
        title: {
          path: 'personalDetails.items[0].jobTitle',
          fallback: 'Chief Experience Officer | Customer-Centric Strategies | Digital Transformation',
          className: 'text-[12px] font-semibold text-[#1F91FF] leading-tight',
        },
        contact: {
          type: 'contact-grid',
          className: 'flex flex-row flex-wrap items-center gap-4 text-[10px] text-neutral-700 mt-2',
          separator: ' • ',
          items: [
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-1',
              items: [
                { type: 'icon', name: 'AtSign', size: 12, className: 'text-[#1F91FF]' },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].email',
                  href: 'mailto:{{value}}',
                  fallback: 'e.smith@enhancv.com',
                  className: 'decoration-neutral-400 font-semibold',
                },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-1',
              items: [
                { type: 'icon', name: 'Linkedin', size: 12, className: 'text-[#1F91FF]' },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.linkedin.title',
                  href: 'personalDetails.items[0].links.linkedin.link',
                  fallback: 'LinkedIn',
                  className: 'decoration-neutral-400 font-semibold',
                },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-1',
              items: [
                { type: 'icon', name: 'MapPin', size: 12, className: 'text-[#1F91FF]' },
                {
                  path: 'personalDetails.items[0].address',
                  fallback: 'Indianapolis, Indiana',
                  className: 'text-[10px] text-neutral-700',
                },
              ],
            },
          ],
        },
      },
    },

    /**
     * SUMMARY - Left Column
     */
    {
      id: 'summary',
      type: 'content-section',
      column: 'left',
      className: 'flex flex-col',
      heading: {
        path: 'summary.heading',
        fallback: 'SUMMARY',
        className: 'text-base font-semibold uppercase tracking-wide border-b-4 border-black pb-2',
      },
      content: {
        type: 'html',
        path: 'personalDetails.items[0].description',
        fallback:
          'With over 15 years in customer experience management, I excel in creating impactful strategies that enhance journeys. Proven record includes achieving a 30% increase in customer satisfaction through innovative initiatives, all backed by strong analytical skills and leadership in dynamic environments.',
        className: 'text-[11px] text-neutral-800 mt-3 whitespace-pre-wrap',
      },
    },

    /**
     * EXPERIENCE - Left Column
     */
    {
      id: 'experience',
      type: 'list-section',
      column: 'left',
      break: true,
      heading: {
        path: 'experience.heading',
        fallback: 'EXPERIENCE',
        className: 'text-base font-semibold uppercase tracking-wide border-b-4 border-black pb-2',
      },
      listPath: 'experience.items',
      itemTemplate: {
        className: 'flex flex-col gap-2 pt-4',
        fields: [
          {
            type: 'inline-group',
            className: 'flex flex-col gap-1 text-[11px] font-semibold text-neutral-900',
            items: [
              {
                path: 'position',
                fallback: 'Chief Experience Officer',
                className: 'font-bold text-neutral-900 text-sm',
              },
              {
                path: 'company',
                fallback: 'TechForward Solutions',
                className: 'text-[#1F91FF] font-semibold text-[12px]',
              },
            ],
          },
          {
            type: 'inline-group',
            separator: ' • ',
            className: 'flex flex-wrap items-center gap-2 text-[10px] text-neutral-600',
            items: [
              {
                type: 'duration',
                path: 'duration',
                fallback: '01/2020 – Present',
              },
              {
                path: 'location',
              },
            ],
          },
          {
            type: 'html',
            path: 'description',
            className:
              'text-[11px] text-neutral-800 leading-relaxed [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 whitespace-pre-wrap border-b border-dashed border-neutral-300 pb-2',
            fallback:
              '<ul><li>Developed and implemented an extensive customer experience strategy that achieved a 40% increase in Net Promoter Score (NPS) within the first year, directly influencing customer retention and loyalty.</li><li>Led a cross-functional team to enhance customer journey mappings, increasing conversion rates by 25% through informed insights derived from extensive customer feedback assessments.</li><li>Collaborated closely with product and marketing teams, resulting in a 30% reduction in customer complaints by aligning service offerings with customer expectations.</li><li>Conducted in-depth data analyses of customer interactions, identifying critical bottlenecks which led to a 20% increase in customer engagement metrics over two quarters.</li><li>Served as the voice of the customer during executive strategy meetings, advocating for customer interests and ensuring alignment across all departments.</li><li>Designed and rolled out new employee training programs that improved service delivery, resulting in a notable 15% improvement in frontline customer satisfaction scores.</li></ul>',
          },
        ],
      },
      containerClassName: 'space-y-0',
    },

    /**
     * KEY ACHIEVEMENTS - Right Column
     */
    {
      id: 'achievements',
      type: 'inline-list-section',
      column: 'right',
      showBullet: true,
      heading: {
        path: 'achievements.title',
        fallback: 'KEY ACHIEVEMENTS',
        className: 'text-base font-semibold uppercase tracking-wide border-b-4 border-black pb-2',
      },
      listPath: 'achievements.items[0].items',
      itemClassName: 'text-[11px] text-neutral-800 leading-relaxed',
      containerClassName: 'grid grid-cols-1 gap-2 pt-3 pl-3',
    },

    /**
     * SKILLS - Right Column
     */
    {
      id: 'skills',
      type: 'inline-list-section',
      column: 'right',
      break: true,
      heading: {
        path: 'skills.heading',
        fallback: 'SKILLS',
        className: 'text-base font-semibold uppercase tracking-wide border-b-4 border-black pb-2',
      },
      listPath: 'skills.items',
      itemPath: 'name',
      itemClassName: 'text-[11px] text-neutral-800',
      containerClassName: 'flex flex-wrap gap-1 pt-2',
      itemSeparator: ', ',
    },

    /**
     * EDUCATION - Right Column
     */
    {
      id: 'education',
      type: 'list-section',
      column: 'right',
      break: true,
      heading: {
        path: 'education.heading',
        fallback: 'EDUCATION',
        className: 'text-base font-semibold uppercase tracking-wide border-b-4 border-black pb-2',
      },
      listPath: 'education.items',
      itemTemplate: {
        className: 'flex flex-col gap-1 pt-3',
        fields: [
          {
            path: 'degree',
            fallback: 'Master of Business Administration (MBA)',
            className: 'text-[12px] font-semibold text-black',
          },
          {
            path: 'institution',
            fallback: 'University of Chicago',
            className: 'text-[11px] text-[#1F91FF] font-semibold',
          },
          {
            type: 'inline-group',
            separator: ' • ',
            className: 'flex flex-wrap items-center gap-1 text-[10px] text-neutral-600',
            items: [
              {
                type: 'duration',
                path: 'duration',
                fallback: '2012 - 2014',
              },
              {
                path: 'location',
              },
            ],
          },
        ],
      },
      containerClassName: 'divide-y divide-neutral-200',
    },

    /**
     * PROJECTS - Right Column
     */
    {
      id: 'projects',
      type: 'list-section',
      column: 'right',
      break: true,
      heading: {
        path: 'projects.title',
        fallback: 'PROJECTS',
        className: 'text-base font-semibold uppercase tracking-wide border-b-4 border-black pb-2',
      },
      listPath: 'projects.items',
      itemTemplate: {
        className: 'flex flex-col gap-1',
        fields: [
          {
            type: 'link',
            path: 'title',
            href: 'link.link',
            fallback: 'Project Title',
            className: 'text-[12px] font-semibold text-black',
          },
          {
            type: 'duration',
            path: 'duration',
            className: 'text-[10px] text-neutral-600',
          },
          {
            type: 'html',
            path: 'description',
            className:
              'text-[11px] text-neutral-800 leading-relaxed mt-1 [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 whitespace-pre-wrap',
          },
        ],
      },
      containerClassName: 'divide-y divide-neutral-200',
    },

    /**
     * TRAINING / COURSES - Right Column
     */
    {
      id: 'certifications',
      type: 'list-section',
      column: 'right',
      break: true,
      heading: {
        path: 'certifications.title',
        fallback: 'CERTIFICATIONS',
        className: 'text-base font-semibold uppercase tracking-wide border-b-4 border-black pb-2',
      },
      listPath: 'certifications.items',
      itemTemplate: {
        className: 'flex flex-col gap-1',
        fields: [
          {
            path: 'title',
            fallback: 'Certification Title',
            className: 'text-sm text-neutral-900',
          },
          {
            type: 'inline-group',
            className: 'flex flex-row items-baseline gap-1 leading-none mt-0.5',
            items: [
              {
                path: 'issuer',
                fallback: 'Issuer',
                className: 'text-xs text-neutral-900 font-semibold italic',
                suffix: ', ',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-xs text-neutral-600',
              },
            ],
          },
        ],
      },
      containerClassName: 'space-y-3',
    },

    /**
     * INTERESTS - Right Column
     */
    {
      id: 'interests',
      type: 'inline-list-section',
      column: 'right',
      heading: {
        path: 'interests.title',
        fallback: 'INTERESTS',
        className: 'text-base font-semibold uppercase tracking-wide border-b-4 border-black pb-2 pt-1',
      },
      listPath: 'interests.items[0].items',
      itemClassName: 'text-[11px] text-neutral-800 leading-relaxed',
      containerClassName: 'flex flex-wrap gap-1 pt-2',
      itemSeparator: ', ',
    },
  ],
};

export default erenTemplate3;
