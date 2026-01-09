const template7 = {
  name: 'Simran Professional',

  page: {
    background: '#ffffff',
    className: 'text-neutral-900 leading-relaxed',
    fontFamily: '"Lato", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },

  sections: [
    // Header Section with Profile Photo and Name
    {
      id: 'header',
      type: 'header',
      className: 'pt-6 pr-8 flex flex-row gap-6 item-start mb-2',
      break: true,
      fields: {
        profilePhoto: {
          type: 'image',
          path: 'personalDetails.items[0].profilePicturePublicUrl',
          fallback: '/images/profileimg.jpeg',
          className: 'w-32 h-32 rounded-full bg-gray-200 shrink-0 overflow-hidden object-cover',
        },
        nameTitleBlock: {
          type: 'group',
          className: 'flex flex-col flex-1',
          items: [
            {
              type: 'text',
              path: 'personalDetails.items[0].fullName',
              fallback: 'John Doe',
              className: 'text-xl font-bold text-[#4178B4] leading-tight',
            },
            {
              type: 'text',
              path: 'personalDetails.items[0].jobTitle',
              fallback: 'Mobile Developer',
              className: 'text-sm font-medium text-gray-700 mt-1',
            },
            {
              type: 'html',
              path: 'personalDetails.items[0].description',
              fallback:
                'Mobile Developer experienced in building and maintaining scalable cross-platform applications using React Native for both iOS (Swift) and Android (Kotlin).',
              className:
                'text-xs text-gray-700 leading-relaxed mt-2 [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 break-words whitespace-pre-wrap',
            },
          ],
        },
      },
    },

    // Contact Information Bar
    {
      id: 'header',
      type: 'header',
      className: 'border-b border-t border-black py-3 -mx-6 bg-gray-50 mt-2',
      fields: {
        contact: {
          type: 'contact-grid',
          className: 'flex flex-row flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs max-w-full mx-auto',
          items: [
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-2',
              items: [
                {
                  type: 'icon',
                  name: 'Mail',
                  size: 16,
                  className: 'text-[#4178B4]',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].email',
                  href: 'mailto:{{value}}',
                  fallback: 'simran.smjp@gmail.com',
                  className: 'text-xs text-gray-800',
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
                  size: 16,
                  className: 'text-[#4178B4]',
                },
                {
                  path: 'personalDetails.items[0].phone',
                  fallback: '7042403591',
                  className: 'text-xs text-gray-800',
                },
              ],
            },
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-2',
              items: [
                {
                  type: 'icon',
                  name: 'MapPin',
                  size: 16,
                  className: 'text-[#4178B4]',
                },
                {
                  path: 'personalDetails.items[0].address',
                  fallback: 'Gurugram, India',
                  className: 'text-xs text-gray-800',
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
                  size: 16,
                  className: 'text-[#4178B4]',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.linkedin.title',
                  href: 'personalDetails.items[0].links.linkedin.link',
                  fallback: '',
                  className: 'text-xs text-gray-800 hover:text-blue-600',
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
                  size: 16,
                  className: 'text-[#4178B4]',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.github.title',
                  href: 'personalDetails.items[0].links.github.link',
                  fallback: '',
                  className: 'text-xs text-gray-800 hover:text-blue-600',
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
                  size: 16,
                  className: 'text-[#4178B4]',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.website.title',
                  href: 'personalDetails.items[0].links.website.link',
                  fallback: '',
                  className: 'text-xs text-gray-800 hover:text-blue-600',
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
                  size: 16,
                  className: 'text-[#4178B4]',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.youtube.title',
                  href: 'personalDetails.items[0].links.youtube.link',
                  fallback: '',
                  className: 'text-xs text-gray-800 hover:text-blue-600',
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
                  size: 16,
                  className: 'text-[#4178B4]',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.dribble.title',
                  href: 'personalDetails.items[0].links.dribble.link',
                  fallback: '',
                  className: 'text-xs text-gray-800 hover:text-blue-600',
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
                  size: 16,
                  className: 'text-[#4178B4]',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.behance.title',
                  href: 'personalDetails.items[0].links.behance.link',
                  fallback: '',
                  className: 'text-xs text-gray-800 hover:text-blue-600',
                },
              ],
            },
          ],
        },
      },
    },

    // Skills Section
    {
      id: 'skills',
      type: 'badge-section',
      className: 'px-8 pb-6',
      break: true,
      breakable: true,
      heading: {
        path: 'skills.heading',
        fallback: 'SKILLS',
        className: 'text-sm font-bold text-[#4178B4] tracking-wider mt-6.5 mb-1',
      },
      listPath: 'skills.items',
      itemPath: 'name',
      badgeClassName: 'px-2 py-1 bg-[#8CAADB] text-white text-xs rounded leading-none',
      containerClassName: 'flex flex-wrap gap-x-2.5 gap-y-1.5',
    },

    // Work Experience Section
    {
      id: 'experience',
      type: 'list-section',
      className: 'px-8 pb-4',
      break: true,
      heading: {
        path: 'experience.heading',
        fallback: 'WORK EXPERIENCE',
        className: 'text-sm font-bold text-[#4178B4] mb-2 mt-3 tracking-wide',
      },
      listPath: 'experience.items',
      itemTemplate: {
        className: 'flex flex-col mt-3 leading-none',
        break: true,
        rows: [
          // Row 1: Company (LEFT) | Date (RIGHT)
          {
            className: 'flex justify-between items-baseline leading-none',
            cells: [
              {
                path: 'company',
                className: 'text-xs font-semibold text-gray-900',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-xs text-gray-500 italic whitespace-nowrap',
              },
            ],
          },

          // Row 2: Position (LEFT) | Location (RIGHT)
          {
            className: 'flex justify-between items-baseline leading-none mt-1',
            cells: [
              {
                path: 'position',
                className: 'text-xs font-normal text-gray-500',
              },
              {
                path: 'location',
                className: 'text-xs text-gray-500 italic whitespace-nowrap',
              },
            ],
          },

          // Row 3: Description
          {
            cells: [
              {
                type: 'html',
                path: 'description',
                className:
                  'text-xs text-gray-800 leading-relaxed mt-2 [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 break-words whitespace-pre-wrap',
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
      className: 'px-8 pb-4',
      break: true,
      heading: {
        path: 'projects.heading',
        fallback: 'PROJECTS',
        className: 'text-sm uppercase font-bold text-[#4178B4] mb-2 mt-1 tracking-wide',
      },
      listPath: 'projects.items',
      itemTemplate: {
        className: 'flex flex-col mt-3 leading-none',
        break: true,
        rows: [
          // Row 1: Title (LEFT) | Date (RIGHT)
          {
            className: 'flex justify-between items-baseline leading-none',
            cells: [
              {
                path: 'title',
                href: 'link.link',
                fallback: '',
                className: 'text-xs font-semibold text-gray-900',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-xs text-gray-500 italic whitespace-nowrap',
              },
            ],
          },

          // Row 2: Description
          {
            cells: [
              {
                type: 'html',
                path: 'description',
                break: true,
                className:
                  'text-xs text-gray-800 leading-relaxed mt-2 [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 break-words whitespace-pre-wrap',
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
      className: 'px-8 pb-4',
      break: true,
      breakable: true,

      heading: {
        path: 'interests.heading',
        fallback: 'INTERESTS',
        className: 'uppercase text-sm font-bold text-[#4178B4] tracking-wide mt-5',
      },

      listPath: 'interests.items[0].items',

      // 🔑 REQUIRED CHANGES
      itemPath: '',
      itemSeparator: ', ',
      containerClassName: 'block',
      badgeClassName: 'text-xs text-black',
    },
    // Achievements Section
    {
      id: 'achievements',
      type: 'badge-section',
      break: true,
      breakable: true,
      className: 'px-8 pb-4',
      heading: {
        path: 'achievements.heading',
        fallback: 'ACHIEVEMENTS',
        className: 'uppercase text-sm font-bold text-[#4178B4] tracking-wide mt-5 mb-2',
      },
      listPath: 'achievements.items[0].items',
      itemPath: '',
      itemPrefix: '• ',
      badgeClassName: 'text-xs text-black',
      containerClassName: 'text-xs flex flex-col gap-2',
    },

    // Certifications Section
    {
      id: 'certifications',
      type: 'list-section',
      className: 'px-8 pb-4',
      break: true,
      heading: {
        path: 'certifications.heading',
        fallback: 'CERTIFICATIONS',
        className: 'uppercase text-sm font-bold text-[#4178B4] tracking-wide mt-2.5 mb-2',
      },
      listPath: 'certifications.items',
      containerClassName: '',
      itemTemplate: {
        className: 'flex flex-col mt-3 leading-none',
        break: true,
        fields: [
          // Title ⬅️ | Date ➡️
          {
            type: 'horizontal-group',
            className: 'flex justify-between items-baseline',
            items: [
              {
                path: 'title',
                fallback: 'Certification Title',
                className: 'text-xs font-semibold text-gray-900',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-xs text-gray-500 italic whitespace-nowrap',
              },
            ],
          },

          // Issuer (next line)
          {
            path: 'issuer',
            fallback: 'Issuer',
            className: 'text-xs text-gray-700 mt-1',
          },
        ],
      },
    },

    // Education Section
    {
      id: 'education',
      type: 'list-section',
      className: 'px-8 pb-4',
      heading: {
        path: 'education.heading',
        fallback: 'EDUCATION',
        className: 'text-sm font-bold text-[#4178B4] tracking-wide mt-5.5 -mb-2',
      },
      listPath: 'education.items',
      itemTemplate: {
        className: 'flex flex-col mt-3',

        rows: [
          // Row 1: Institution ⬅️ | Date ➡️
          {
            className: 'flex justify-between items-baseline leading-none',
            cells: [
              {
                path: 'institution',
                className: 'text-xs font-semibold text-gray-900',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-xs text-gray-500 italic whitespace-nowrap',
              },
            ],
          },

          // Row 2: Degree (below institute)
          {
            className: 'flex leading-none mt-1',
            cells: [
              {
                path: 'degree',
                className: 'text-xs font-normal text-gray-900',
              },
            ],
          },

          // Row 3: Grade (below date, but naturally flows under content)
          {
            className: 'flex leading-none mt-1',
            cells: [
              {
                path: 'grade.value',
                className: 'text-xs text-gray-700',
              },
            ],
          },

          // Row 4: Location
          {
            className: 'flex leading-none mt-1',
            cells: [
              {
                path: 'location',
                className: 'text-xs text-gray-500 italic',
              },
            ],
          },
        ],
      },
    },
  ],
};

export default template7;
