const annaFieldTemplate = {
  name: 'Anna Field Modern',

  page: {
    background: '#ffffff',
    className: 'text-neutral-900 leading-relaxed',
    fontFamily: 'Inter',
  },

  sections: [
    // Header Section
    {
      id: 'header',
      type: 'header',
      className: 'flex flex-col gap-1',
      fields: {
        name: {
          path: 'personalDetails.items[0].fullName',
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
                {
                  type: 'icon',
                  name: 'MapPin',
                  size: 14,
                  className: 'text-[rgb(17,9,128)]',
                },
                {
                  path: 'personalDetails.items[0].address',
                  fallback: '123 Main Street, Paris, France',
                  className: 'text-xs text-gray-700',
                },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-2',
              items: [
                {
                  type: 'icon',
                  name: 'Mail',
                  size: 14,
                  className: 'text-[rgb(17,9,128)]',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].email',
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
                {
                  type: 'icon',
                  name: 'Phone',
                  size: 14,
                  className: 'text-[rgb(17,9,128)]',
                },
                {
                  path: 'personalDetails.items[0].phone',
                  fallback: '+11 23434546',
                  className: 'text-xs text-gray-700',
                },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-2',
              items: [
                {
                  type: 'icon',
                  name: 'Linkedin',
                  size: 14,
                  className: 'text-[rgb(17,9,128)]',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.linkedin.title',
                  href: 'personalDetails.items[0].links.linkedin.link',
                  fallback: '',
                  className: 'text-xs text-gray-700 hover:text-blue-600',
                },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-2',
              items: [
                {
                  type: 'icon',
                  name: 'Github',
                  size: 14,
                  className: 'text-[rgb(17,9,128)]',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.github.title',
                  href: 'personalDetails.items[0].links.github.link',
                  fallback: '',
                  className: 'text-xs text-gray-700 hover:text-blue-600',
                },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-2',
              items: [
                {
                  type: 'icon',
                  name: 'Globe',
                  size: 14,
                  className: 'text-[rgb(17,9,128)]',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.website.title',
                  href: 'personalDetails.items[0].links.website.link',
                  fallback: '',
                  className: 'text-xs text-gray-700 hover:text-blue-600',
                },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-2',
              items: [
                {
                  type: 'icon',
                  name: 'Youtube',
                  size: 14,
                  className: 'text-[rgb(17,9,128)]',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.youtube.title',
                  href: 'personalDetails.items[0].links.youtube.link',
                  fallback: '',
                  className: 'text-xs text-gray-700 hover:text-blue-600',
                },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-2',
              items: [
                {
                  type: 'icon',
                  name: 'Dribbble',
                  size: 14,
                  className: 'text-[rgb(17,9,128)]',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.dribble.title',
                  href: 'personalDetails.items[0].links.dribble.link',
                  fallback: '',
                  className: 'text-xs text-gray-700 hover:text-blue-600',
                },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-2',
              items: [
                {
                  type: 'icon',
                  name: 'Palette',
                  size: 14,
                  className: 'text-[rgb(17,9,128)]',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.behance.title',
                  href: 'personalDetails.items[0].links.behance.link',
                  fallback: '',
                  className: 'text-xs text-gray-700 hover:text-blue-600',
                },
              ],
            },
          ],
        },
      },
    },

    // Summary Section (Profile)
    {
      id: 'summary',
      type: 'content-section',
      className: 'flex flex-col gap-3',
      heading: {
        path: 'summary.heading',
        fallback: 'Summary',
        className:
          'bg-[rgba(17,9,128,0.07)] px-4 py-2 flex justify-center items-center text-sm font-bold text-[rgb(17,9,128)] mt-5',
      },
      content: {
        type: 'html',
        path: 'personalDetails.items[0].description',
        fallback: 'Summary',
        className:
          'text-xs text-gray-700 text-justify leading-relaxed [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 break-words whitespace-pre-wrap',
      },
    },

    // Experience Section
    {
      id: 'experience',
      type: 'list-section',
      break: true,
      heading: {
        path: 'experience.heading',
        fallback: 'Work Experience',
        className:
          'bg-[rgba(17,9,128,0.07)] px-4 py-2 flex justify-center items-center text-sm font-bold text-[rgb(17,9,128)] mt-5 mb-2',
      },
      listPath: 'experience.items',
      containerClassName: 'flex flex-col gap-3',
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
                  { path: 'position', className: 'text-sm text-black' },
                  {
                    path: 'company',
                    className: 'text-sm font-bold text-gray-600',
                  },
                ],
              },
              {
                type: 'inline-group',
                className: 'flex flex-col items-end text-right w-[160px] shrink-0 leading-none',
                items: [
                  {
                    type: 'duration',
                    path: 'duration',
                    className: 'text-xs text-black italic',
                  },
                  { path: 'location', className: 'text-xs text-gray-600' },
                ],
              },
            ],
          },
          {
            cells: [
              {
                type: 'html',
                path: 'description',
                className:
                  'text-xs text-gray-700 leading-relaxed [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 break-words whitespace-pre-wrap',
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
      heading: {
        path: 'projects.heading',
        fallback: 'Projects',
        className:
          'bg-[rgba(17,9,128,0.07)] px-4 py-2 flex justify-center items-center text-sm font-bold text-[rgb(17,9,128)] mt-2 mb-3',
      },
      listPath: 'projects.items',
      containerClassName: 'flex flex-col',
      itemTemplate: {
        className: 'flex flex-col mt-3',
        break: true,
        rows: [
          {
            className: 'flex flex-row justify-between items-start',
            cells: [
              {
                path: 'title',
                fallback: 'Project Title',
                className: 'text-sm font-bold text-black flex-1',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-xs text-black w-[160px] shrink-0 text-right italic',
              },
            ],
          },
          {
            cells: [
              {
                type: 'html',
                path: 'description',
                break: true,
                className:
                  'text-xs text-gray-700 leading-relaxed [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 break-words whitespace-pre-wrap',
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
      heading: {
        path: 'education.heading',
        fallback: 'Education',
        className:
          'bg-[rgba(17,9,128,0.07)] px-4 py-2 flex justify-center items-center text-sm font-bold text-[rgb(17,9,128)] mt-5',
      },
      listPath: 'education.items',
      containerClassName: 'flex flex-col',
      itemTemplate: {
        className: 'flex flex-row justify-between items-start mt-3',
        rows: [
          {
            className: 'flex flex-col flex-1 leading-none',
            cells: [
              {
                path: 'degree',
                className: 'text-sm font-bold text-black',
              },
              {
                path: 'institution',
                className: 'text-sm text-gray-600',
              },
            ],
          },
          {
            className: 'text-right flex flex-col flex-1 leading-none',
            cells: [
              {
                type: 'duration',
                path: 'duration',
                className: 'text-xs text-black italic',
              },
              {
                path: 'grade.value',
                className: 'text-xs text-gray-600',
              },
            ],
          },
        ],
      },
    },

    // Skills Section
    {
      id: 'skills',
      type: 'inline-list-section',
      heading: {
        path: 'skills.heading',
        fallback: 'Skills',
        className:
          'bg-[rgba(17,9,128,0.07)] px-4 py-2 flex justify-center items-center text-sm font-bold text-[rgb(17,9,128)] mt-5 mb-3',
      },
      listPath: 'skills.items',
      itemPath: 'name',
      itemClassName: 'text-xs text-black',
      containerClassName: 'text-xs text-black leading-relaxed pr-2',
      itemSeparator: ', ',
    },

    // Interests Section
    {
      id: 'interests',
      type: 'inline-list-section',
      break: true,
      breakable: true,
      heading: {
        path: 'interests.heading',
        fallback: 'Interests',
        className:
          'bg-[rgba(17,9,128,0.07)] px-4 py-2 flex justify-center items-center text-sm font-bold text-[rgb(17,9,128)] mt-5 mb-3',
      },
      listPath: 'interests.items[0].items',
      itemPath: '',
      itemClassName: 'text-xs text-black',
      containerClassName: 'text-xs text-black leading-relaxed',
      itemSeparator: ', ',
    },

    // Achievements Section

    {
      id: 'achievements',
      type: 'badge-section',
      break: true,
      breakable: true,
      heading: {
        path: 'achievements.heading',
        fallback: 'Achievements',
        className:
          'bg-[rgba(17,9,128,0.07)] px-4 py-2 flex justify-center items-center text-sm font-bold text-[rgb(17,9,128)] mt-5',
      },
      listPath: 'achievements.items[0].items',
      itemPrefix: '• ',
      badgeClassName: 'text-xs text-black',
      containerClassName: 'flex flex-col gap-1 mt-2',
    },

    // Certifications Section
    {
      id: 'certifications',
      type: 'list-section',
      break: true,
      heading: {
        path: 'certifications.heading',
        fallback: 'Certifications',
        className:
          'bg-[rgba(17,9,128,0.07)] py-2 flex justify-center items-center text-sm font-bold text-[rgb(17,9,128)] mt-5 w-full basis-full mb-3',
      },
      listPath: 'certifications.items',
      containerClassName: 'flex flex-col gap-3',
      itemTemplate: {
        className: 'flex flex-col leading-tight',
        break: true,
        rows: [
          // Row 1: Title (left) + Duration (right)
          {
            className: 'flex flex-row justify-between items-start',
            cells: [
              {
                path: 'title',
                fallback: 'Certification Title',
                className: 'text-sm font-bold text-black',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-xs text-black italic',
              },
            ],
          },

          // Row 2: Issuer (below title)
          {
            className: 'flex flex-row',
            cells: [
              {
                path: 'issuer',
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

export default annaFieldTemplate;
