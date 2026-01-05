const brianWayneTemplate = {
  name: 'Brian Wayne Professional',

  page: {
    width: 794,
    height: 1122,
    padding: 0,
    background: '#ffffff',
    className: 'text-neutral-900 leading-relaxed',
    fontFamily: 'Calibri',
  },

  columns: {
    spacing: '0px',
    left: {
      width: '300px',
      className: 'bg-[rgb(56,76,65)] text-black px-6 py-6 flex flex-col',
    },
    right: {
      width: 'calc(100% - 300px)',
      className: 'px-8 pl-8 py-8 flex flex-col min-w-0',
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
      id: 'header',
      type: 'header',
      column: 'left',
      className: 'flex flex-col gap-3',
      fields: {
        contact: {
          type: 'contact-grid',
          className: 'flex flex-col gap-1 mt-4',
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
                  type: 'link',
                  path: 'personalDetails.items[0].email',
                  href: 'mailto:{{value}}',
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
                  fallback: '',
                  className: 'text-sm text-white hover:text-green-200',
                },
              ],
            },
            // GitHub
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-3',
              items: [
                {
                  type: 'icon',
                  name: 'Github',
                  size: 16,
                  className: 'text-white',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.github.title',
                  href: 'personalDetails.items[0].links.github.link',
                  fallback: '',
                  className: 'text-sm text-white hover:text-green-200',
                },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-3',
              items: [
                {
                  type: 'icon',
                  name: 'Globe',
                  size: 16,
                  className: 'text-white',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.website.title',
                  href: 'personalDetails.items[0].links.website.link',
                  fallback: '',
                  className: 'text-sm text-white hover:text-green-200',
                },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-3',
              items: [
                {
                  type: 'icon',
                  name: 'Youtube',
                  size: 16,
                  className: 'text-white',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.youtube.title',
                  href: 'personalDetails.items[0].links.youtube.link',
                  fallback: '',
                  className: 'text-sm text-white hover:text-green-200',
                },
              ],
            },
            // Dribble
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-3',
              items: [
                {
                  type: 'icon',
                  name: 'Dribbble',
                  size: 16,
                  className: 'text-white',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.dribble.title',
                  href: 'personalDetails.items[0].links.dribble.link',
                  fallback: '',
                  className: 'text-sm text-white hover:text-green-200',
                },
              ],
            },
            // Behance
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-3',
              items: [
                {
                  type: 'icon',
                  name: 'Palette',
                  size: 16,
                  className: 'text-white',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.behance.title',
                  href: 'personalDetails.items[0].links.behance.link',
                  fallback: '',
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
      className: 'flex flex-col gap-3',
      heading: {
        path: 'personDetails.title',
        fallback: 'Profile',
        className: 'text-lg font-bold text-white border-b border-white pb-1',
      },
      content: {
        type: 'html',
        path: 'personalDetails.items[0].description',
        fallback: 'Summary',
        className:
          'text-sm text-white leading-relaxed [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 break-words whitespace-pre-wrap',
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
        className: 'flex flex-col gap-1 leading-none mt-1',
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
      break: true,
      breakable: true,
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
      itemPrefix: '• ',
      badgeClassName: 'text-sm text-white',
    },

    {
      id: 'achievements',
      type: 'badge-section',
      column: 'left',
      break: true,
      breakable: true,
      heading: {
        path: 'achievements.title',
        fallback: 'Achievements',
        className: 'capitalize text-lg font-bold text-white mt-4',
        divider: {
          variant: 'line',
          className: 'bg-white w-full h-[1px] mt-1 mb-2',
        },
      },
      listPath: 'achievements.items[0].items',
      itemPath: '',
      itemPrefix: '• ',
      badgeClassName:
        'block w-full text-sm text-white break-words whitespace-pre-wrap leading-relaxed overflow-wrap-anywhere mt-1.5',
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
      containerClassName: 'flex flex-col gap-1 mt-1',
      itemTemplate: {
        className: "flex flex-col mb-3",
        break: true,
        fields: [
          {
            path: 'duration',
            type: 'duration',
            className: 'text-sm text-[rgb(56,76,65)]',
          },
          {
            path: 'position',
            fallback: 'Position Title',
            className: 'text-base font-semibold text-[rgb(56,76,65)] mt-1',
          },
          {
            type: 'horizontal-group',
            className: 'flex gap-1 mt-0.5',
            items: [
              {
                path: 'company',
                fallback: 'Company Name',
                className: 'text-sm text-[rgb(56,76,65)] font-semibold',
              },
              {
                path: 'location',
                fallback: 'Location',
                className: 'text-sm text-[rgb(56,76,65)]',
              },
            ],
          },
          {
            type: 'html',
            path: 'description',
            breakable: true,
            className:
              'text-xs text-neutral-700 leading-relaxed mt-2 [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 whitespace-pre-wrap',
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
        className: 'capitalize text-xl font-semibold text-[rgb(56,76,65)]',
        divider: {
          variant: 'line',
          className: 'bg-gray-800 w-full h-[2px] mt-1 mb-2',
        },
      },
      listPath: 'projects.items',
      containerClassName: 'flex flex-col gap-6 mt-1',
      itemTemplate: {
        className: "flex flex-col mb-2",
        break: true,
        fields: [
          {
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
            type: "html",
            path: "description",
            break: true,
            className:
              'text-sm text-[rgb(56,76,65)] leading-relaxed [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 break-words whitespace-pre-wrap',
          },
        ],
      },
    },

    // Skills Section - Right Column
    {
      id: 'skills',
      type: 'badge-section',
      column: 'right',
      break: true,
      breakable: true,
      heading: {
        path: 'skills.heading',
        fallback: 'Skills',
        className: 'text-xl font-semibold text-[rgb(56,76,65)]',
        divider: {
          variant: 'line',
          className: 'bg-gray-800 w-full h-[2px] mt-1 mb-2',
        },
      },
      listPath: "skills.items",
      itemPath: "name",
      itemSeparator: ", ",
      containerClassName: "flex flex-row flex-wrap mt-1 mb-2.5 gap-x-1",
      badgeClassName: "text-sm text-[rgb(56,76,65)]",
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
        className: 'capitalize text-xl font-semibold text-[rgb(56,76,65)]',
        divider: {
          variant: 'line',
          className: 'bg-gray-800 w-full h-[2px] mt-1 mb-2',
        },
      },
      listPath: 'certifications.items',
      containerClassName: 'flex flex-col gap-1 mt-1',
      itemTemplate: {
        className: "flex flex-col",
        break: true,
        fields: [
          {
            path: 'title',
            fallback: 'Certification Title',
            break: true,
            className: 'text-sm font-semibold text-[rgb(56,76,65)]',
          },
          {
            type: 'inline-group',
            className: 'flex flex-row items-baseline gap-1 leading-none',
            break: true,
            items: [
              {
                path: 'issuer',
                fallback: 'Issuer',
                className: 'text-sm text-[rgb(56,76,65)] italic',
                break: true,
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
