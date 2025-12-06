// Henrietta Mitchell Business Analyst Template
// Clean, professional template with serif fonts and dotted separators

const template13 = {
  name: 'Business Professional',

  page: {
    width: 794,
    height: 1122,
    padding: 48,
    background: '#F3F6F1',
    className: 'text-[#2C5F5F] leading-relaxed',
    fontFamily: 'Georgia, serif',
  },

  sections: [
    // Header Section
    {
      id: 'header',
      type: 'header',
      className: 'flex flex-col mb-4 text-[#2C5F5F]',
      fields: {
        nameTitle: {
          className: 'flex flex-col items-baseline gap-1 mb-2',
        },

        name: {
          path: 'personalDetails.items[0].fullName',
          fallback: 'Henrietta Mitchell',
          className: 'text-4xl font-normal text-[#2C5F5F] after:content-[","] after:mr-2 whitespace-nowrap',
        },

        title: {
          path: 'personalDetails.items[0].jobTitle',
          fallback: 'Business Analyst',
          className: 'text-4xl font-normal text-[#2C5F5F]',
        },

        contact: {
          type: 'inline-group',
          className: 'text-sm text-[#2C5F5F] flex flex-row flex-wrap gap-1 mb-1',
          separator: ' · ',
          items: [
            { path: 'personalDetails.items[0].phone', fallback: '+123-456-7890' },
            {
              path: 'personalDetails.items[0].email',
              href: 'mailto:{{value}}',
              fallback: 'hello@reallygreatsite.com',
            },
            {
              type: 'link',
              path: 'personalDetails.items[0].links.linkedin.title',
              href: 'personalDetails.items[0].links.linkedin.link',
              fallback: '@reallygreatsite',
            },
          ],
        },

        address: {
          path: 'personalDetails.items[0].address',
          fallback: '123 Anywhere St., Any City, ST 12345',
          className: 'text-sm text-[#2C5F5F]',
        },
      },
    },

    // Summary Section
    {
      id: 'summary',
      type: 'content-section',
      className: 'flex flex-col mt-3',
      content: {
        type: 'html',
        path: 'personalDetails.items[0].description',
        fallback: 'Your professional summary goes here.',
        className: 'text-sm text-[#2C5F5F] leading-relaxed text-justify whitespace-pre-wrap',
      },
    },

    // Key Skills Section
    {
      id: 'skills',
      type: 'list-section',
      break: false,
      className: 'flex flex-col mt-6',
      heading: {
        path: 'skills.heading',
        fallback: 'Key Skills',
        className: 'text-[#2C5F5F] text-2xl font-normal mb-1 border-t-2 border-dotted border-[#1a3c34] pt-6 mt-6',
      },
      listPath: 'skills.items',
      containerClassName: 'grid grid-cols-3 w-full border-b-2 border-dotted border-[#1a3c34] pb-6 mb-5',

      itemTemplate: {
        className: 'flex items-start',
        rows: [
          {
            cells: [
              {
                prefix: '• ',
                path: 'name',
                className: 'text-sm text-[#2C5F5F]',
                // type: 'text',
              },
            ],
          },
        ],
      },
    },
    // Professional Experience Section
    {
      id: 'experience',
      type: 'list-section',
      break: true,
      className: 'flex flex-col mt-6 gap-2',
      heading: {
        path: 'experience.heading',
        fallback: 'Professional Experience',
        className: 'text-[#2C5F5F] text-2xl font-normal mb-1',
      },
      divider: {
        variant: 'line',
        className: 'border-t-2 border-dotted border-[#1a3c34] w-full mt-1 mb-3',
      },
      listPath: 'experience.items',
      containerClassName: 'flex flex-col gap-4 border-b-2 border-dotted border-[#1a3c34] pb-6 mb-5',
      itemTemplate: {
        className: 'flex flex-col mb-4',
        rows: [
          {
            className: 'flex leading-none',
            cells: [
              {
                path: 'company',
                className: 'text-sm font-bold text-[#2C5F5F]',
              },
            ],
          },
          {
            className: 'flex flex-row justify-between items-start',
            cells: [
              {
                path: 'position',
                className: 'text-sm text-[#2C5F5F]',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-sm text-[#2C5F5F] text-right',
              },
            ],
          },
          {
            className: 'flex flex-col',
            cells: [
              {
                type: 'html',
                path: 'description',
                className: 'text-sm text-[#2C5F5F] leading-relaxed whitespace-pre-wrap',
              },
            ],
          },
        ],
      },
    },

    // Education Section
    {
      id: 'education',
      type: 'list-section',
      break: false,
      className: 'flex flex-col mt-6',
      heading: {
        path: 'education.heading',
        fallback: 'Education',
        className: 'text-[#2C5F5F] text-2xl font-normal mb-1 border-t-2 border-dotted border-[#1a3c34] pt-6 mt-6',
      },
      divider: {
        variant: 'line',
        className: 'border-t-2 border-dotted border-[#1a3c34] w-full mt-1 mb-3',
      },
      listPath: 'education.items',
      containerClassName: 'flex flex-col gap-2 border-b-2 border-dotted border-[#1a3c34] pb-6 mb-5',
      itemTemplate: {
        className: 'flex flex-col',
        rows: [
          {
            className: 'flex flex-row justify-between items-start',
            cells: [
              {
                path: 'institution',
                className: 'text-sm font-bold text-[#2C5F5F]',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-sm text-[#2C5F5F]',
              },
            ],
          },
          {
            className: 'flex flex-col',
            cells: [
              {
                path: 'degree',
                className: 'text-sm text-[#2C5F5F]',
              },
            ],
          },
        ],
      },
    },

    // Certifications Section
    {
      id: 'certifications',
      type: 'list-section',
      break: true,
      className: 'flex flex-col mt-6',
      heading: {
        path: 'certifications.heading',
        fallback: 'Certifications',
        className: 'text-[#2C5F5F] text-2xl font-normal mb-1',
      },
      divider: {
        variant: 'line',
        className: 'border-t-2 border-dotted border-[#1a3c34] w-full mt-1 mb-3',
      },
      listPath: 'certifications.items',
      containerClassName: 'flex flex-col border-b-2 border-dotted border-[#1a3c34] pb-6 mb-5',
      itemTemplate: {
        className: 'flex flex-col',
        fields: [
          {
            type: 'inline-group',
            className: 'flex flex-row flex-wrap items-start gap-1',

            separator: '| ',
            items: [
              {
                prefix: '• ',
                path: 'title',
                fallback: 'Certification Title',
                className: 'text-sm font-bold text-[#2C5F5F]',
              },
              {
                path: 'issuer',
                fallback: 'Certification Issuer',
                className: 'text-sm text-[#2C5F5F]',
              },

              {
                type: 'duration',
                path: 'duration',
                className: 'text-sm text-[#2C5F5F]',
              },
            ],
          },
        ],
      },
    },

    // Projects Section
    {
      id: 'projects',
      type: 'list-section',
      break: true,
      className: 'flex flex-col mt-6',
      heading: {
        path: 'projects.heading',
        fallback: 'Projects',
        className: 'text-[#2C5F5F] text-2xl font-normal mb-1 border-t-2 border-dotted border-[#1a3c34] pt-6 mt-6',
      },
      divider: {
        variant: 'line',
        className: 'border-t-2 border-dotted border-[#1a3c34] w-full mt-1 mb-3',
      },
      listPath: 'projects.items',
      containerClassName: 'flex flex-col gap-4 border-b-2 border-dotted border-[#1a3c34] pb-6 mb-5',
      itemTemplate: {
        className: 'flex flex-col',
        rows: [
          {
            className: 'flex flex-row justify-between items-start',
            cells: [
              {
                path: 'title',
                fallback: 'Project Title',
                className: 'text-sm font-bold text-[#2C5F5F]',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-sm text-[#2C5F5F] text-right',
              },
            ],
          },
          {
            className: 'flex flex-col mt-1',
            cells: [
              {
                type: 'html',
                path: 'description',
                className: 'text-sm text-[#2C5F5F] leading-relaxed whitespace-pre-wrap',
              },
            ],
          },
        ],
      },
    },

    // Interests Section
    {
      id: 'interests',
      type: 'badge-section',
      break: false,
      className: 'flex flex-col mt-6',
      heading: {
        path: 'interests.heading',
        fallback: 'Interests',
        className: 'text-[#2C5F5F] text-2xl font-normal border-t-2 border-dotted border-[#1a3c34] pt-6 mt-6',
      },
      divider: {
        variant: 'line',
        className: 'border-t-2 border-dotted border-[#1a3c34] w-full mt-1 mb-3',
      },
      listPath: 'interests.items[0].items',
      itemPath: '',
      badgeClassName: 'text-sm text-[#2C5F5F]',
      containerClassName: 'flex flex-wrap gap-1 border-b-2 border-dotted border-[#1a3c34] pb-6 mb-5',
      itemSeparator: ', ',
    },

    // Achievements Section
    {
      id: 'achievements',
      type: 'badge-section',
      break: false,
      className: 'flex flex-col mt-6',
      heading: {
        path: 'achievements.heading',
        fallback: 'Achievements',
        className: 'text-[#2C5F5F] text-2xl font-normal mb-1',
      },
      divider: {
        variant: 'line',
        className: 'border-t-2 border-dotted border-[#1a3c34] w-full mt-1 mb-3',
      },
      listPath: 'achievements.items[0].items',
      containerClassName: 'flex flex-col leading-none gap-1',
      badgeClassName: 'text-sm text-[#2C5F5F] gap-0',
      itemPrefix: '• ',
      itemTemplate: {
        fields: [
          {
            prefix: '• ',
            path: '',
            className: 'text-xs text-[#2C5F5F]',
          },
        ],
      },
    },
  ],
};

export default template13;
