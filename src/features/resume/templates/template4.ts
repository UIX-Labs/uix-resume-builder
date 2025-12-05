const brianWayneTemplate = {
  name: 'Brian Wayne Professional',

  page: {
    background: '#ffffff',
    className: 'text-neutral-900 leading-relaxed',
    fontFamily: 'Calibri',
    padding: 0
  },

  columns: {
    spacing: '0px',
    left: {
      width: '300px',
      className: 'bg-[rgb(56,76,65)] text-black px-6 pt-10',
    },
    right: {
      width: 'calc(100% - 300px)',
      className: 'px-8 gap-2 pt-12',
    },
  },

  sections: [
    // Name Section (Header) - Left Column
    {
      id: 'header',
      type: 'header',
      column: 'left',
      className: 'flex flex-col gap-3 mt-4',
      fields: {
        name: {
          path: 'personalDetails.items[0].fullName',
          fallback: 'Brian T. Wayne',
          className: 'text-2xl font-bold text-white',
        },
      },
    },

    // Contact Information Section - Left Column
    {
      id: 'contact',
      type: 'header',
      column: 'left',
      className: 'flex flex-col gap-3',
      fields: {
        contact: {
          type: 'contact-grid',
          className: 'flex flex-col gap-3',
          items: [
            // Email
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-3 mt-4',
              items: [
                {
                  type: 'icon',
                  name: 'Mail',
                  size: 16,
                  className: 'text-white',
                },
                {
                  path: 'personalDetails.items[0].email',
                  fallback: 'brian@wayne.com',
                  className: 'text-sm text-white',
                },
              ],
            },
            // Phone
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-3',
              items: [
                {
                  type: 'icon',
                  name: 'Phone',
                  size: 16,
                  className: 'text-white',
                },
                {
                  path: 'personalDetails.items[0].phone',
                  fallback: '12332344',
                  className: 'text-sm text-white',
                },
              ],
            },
            // Address
            {
              type: 'inline-group-with-icon',
              className: 'flex items-start gap-3',
              items: [
                {
                  type: 'icon',
                  name: 'MapPin',
                  size: 16,
                  className: 'text-white mt-0.5',
                },
                {
                  path: 'personalDetails.items[0].address',
                  fallback: '22611 Pacific Coast Hwy,\nMalibu, California, 9032, USA',
                  className: 'text-sm text-white leading-relaxed',
                },
              ],
            },
            // LinkedIn
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-3',
              items: [
                {
                  type: 'icon',
                  name: 'Linkedin',
                  size: 16,
                  className: 'text-white',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.linkedin.title',
                  href: 'personalDetails.items[0].links.linkedin.link',
                  fallback: 'LinkedIn',
                  className: 'text-sm text-white hover:text-green-200',
                },
              ],
            },
          ],
        },
      },
    },

    // Profile/Summary Section - Left Column
    {
      id: 'summary',
      type: 'content-section',
      column: 'left',
      className: 'flex flex-col gap-3 mt-2',
      heading: {
        path: 'personDetails.title',
        fallback: 'Profile',
        className: 'text-lg font-bold text-white border-b border-white pb-1 mt-4',
      },
      content: {
        type: 'html',
        path: 'personalDetails.items[0].description',
        fallback: 'Summary',
        className:
          'text-sm text-white leading-relaxed [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 break-words whitespace-pre-wrap mt-2',
      },
    },

    // Education Section - Left Column
    {
      id: 'education',
      type: 'list-section',
      column: 'left',
      break: false,
      heading: {
        path: 'education.heading',
        fallback: 'Education',
        className: 'text-lg font-bold text-white mt-4',
        divider: {
          variant: 'line',
          className: 'bg-white w-full h-[1px] mt-1',
        },
      },
      listPath: 'education.items',
      containerClassName: 'flex flex-col gap-4 mt-2',
      itemTemplate: {
        className: 'flex flex-col gap-1 leading-none',
        fields: [
          {
            path: 'degree',
            className: 'text-sm font-bold text-white',
          },
          {
            path: 'institution',
            className: 'text-sm text-green-200 italic',
          },
          {
            type: 'inline-group',
            className: 'flex flex-col',
            items: [
              {
                type: 'duration',
                path: 'duration',
                className: 'text-sm text-white',
              },
              {
                path: 'location',
                className: 'text-sm text-white',
              },
            ],
          },
        ],
      },
    },

    // Interests Section - Left Column
    {
      id: 'interests',
      type: 'badge-section',
      column: 'left',
      break: false,
      heading: {
        path: 'interests.title',
        fallback: 'Interests',
        className: 'capitalize text-lg font-bold text-white mt-4',
        divider: {
          variant: 'line',
          className: 'bg-white w-full h-[1px] mt-1',
        },
      },
      listPath: 'interests.items[0].items',
      itemPath: '',
      badgeClassName: 'text-sm text-white',
      containerClassName: 'flex flex-col gap-1 mt-2',
    },

    // Achievements Section - Left Column
    {
      id: 'achievements',
      type: 'badge-section',
      column: 'left',
      break: true,
      heading: {
        path: 'achievements.title',
        fallback: 'Achievements',
        className: 'capitalize text-lg font-bold text-white mt-4',
        divider: {
          variant: 'line',
          className: 'bg-white w-full h-[1px] mt-1',
        },
      },
      listPath: 'achievements.items[0].items',
      itemPath: '',
      badgeClassName: 'text-sm text-white list-disc',
      containerClassName: 'flex flex-col gap-1 mt-2',
    },

    // Experience Section - Right Column
    {
      id: 'experience',
      type: 'list-section',
      column: 'right',
      break: true,
      heading: {
        path: 'experience.heading',
        fallback: 'Professional Experience',
        className: 'text-xl font-semibold text-[rgb(56,76,65)]',
        divider: {
          variant: 'line',
          className: 'bg-gray-800 w-full h-[2px] mt-1 mb-2',
        },
      },
      listPath: 'experience.items',
      containerClassName: 'flex flex-col gap-6 mt-1',
      itemTemplate: {
        className: 'flex flex-col',
        rows: [
          {
            className: 'flex flex-row items-baseline gap-1',
            cells: [
              {
                path: 'position',
                className: 'text-base font-semibold text-[rgb(56,76,65)]',
                suffix: ', ',
              },
              {
                path: 'company',
                className: 'text-base text-[rgb(56,76,65)]',
              },
            ],
          },
          {
            className: 'flex flex-row items-baseline gap-2',
            cells: [
              {
                type: 'duration',
                path: 'duration',
                className: 'text-sm text-[rgb(56,76,65)]',
              },
              {
                type: 'text',
                text: '|',
                className: 'text-sm text-[rgb(56,76,65)]',
              },
              {
                path: 'location',
                className: 'text-sm text-[rgb(56,76,65)]',
              },
            ],
          },
          {
            cells: [
              {
                type: 'html',
                path: 'description',
                className:
                  'text-sm text-[rgb(56,76,65)] leading-relaxed [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 break-words whitespace-pre-wrap',
              },
            ],
          },
        ],
      },
    },

    // Projects Section - Right Column
    {
      id: 'projects',
      type: 'list-section',
      column: 'right',
      break: true,
      heading: {
        path: 'projects.title',
        fallback: 'Projects',
        className: 'capitalize text-xl font-semibold text-[rgb(56,76,65)] mt-4',
        divider: {
          variant: 'line',
          className: 'bg-gray-800 w-full h-[2px] mt-1 mb-2',
        },
      },
      listPath: 'projects.items',
      containerClassName: 'flex flex-col gap-6 mt-1',
      itemTemplate: {
        className: 'flex flex-col',
        fields: [
          {
            type: 'link',
            path: 'title',
            href: 'link.link',
            fallback: 'Project Title',
            className: 'text-base font-semibold text-[rgb(56,76,65)] hover:underline',
          },
          {
            type: 'duration',
            path: 'duration',
            className: 'text-sm text-[rgb(56,76,65)]',
          },
          {
            type: 'html',
            path: 'description',
            className:
              'text-sm text-[rgb(56,76,65)] leading-relaxed [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 break-words whitespace-pre-wrap',
          },
        ],
      },
    },

    // Skills Section - Right Column
    {
      id: 'skills',
      type: 'list-section',
      column: 'right',
      break: true,
      heading: {
        path: 'skills.heading',
        fallback: 'Skills',
        className: 'text-xl font-semibold text-[rgb(56,76,65)] mt-4',
        divider: {
          variant: 'line',
          className: 'bg-gray-800 w-full h-[2px] mt-1 mb-2',
        },
      },
      listPath: 'skills.items',
      containerClassName: 'flex flex-col gap-2 mt-2',
      itemTemplate: {
        className: 'flex flex-col items-start gap-2',
        fields: [
          {
            prefix: '• ',
            path: 'name',
            className: 'text-sm text-[rgb(56,76,65)]',
          },
        ],
      },
    },

    // Certifications Section - Right Column
    {
      id: 'certifications',
      type: 'list-section',
      column: 'right',
      break: true,
      heading: {
        path: 'certifications.title',
        fallback: 'Certifications',
        className: 'capitalize text-xl font-semibold text-[rgb(56,76,65)] mt-4',
        divider: {
          variant: 'line',
          className: 'bg-gray-800 w-full h-[2px] mt-1 mb-2',
        },
      },
      listPath: 'certifications.items',
      containerClassName: 'flex flex-col gap-3 mt-1',
      itemTemplate: {
        className: 'flex flex-col',
        fields: [
          {
            path: 'title',
            fallback: 'Certification Title',
            className: 'text-sm font-semibold text-[rgb(56,76,65)]',
          },
          {
            type: 'inline-group',
            className: 'flex flex-row items-baseline gap-1 leading-none',
            items: [
              {
                path: 'issuer',
                fallback: 'Issuer',
                className: 'text-sm text-[rgb(56,76,65)] italic',
                suffix: ', ',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-sm text-[rgb(56,76,65)]',
              },
            ],
          },
        ],
      },
    },
  ],
};

export default brianWayneTemplate;
