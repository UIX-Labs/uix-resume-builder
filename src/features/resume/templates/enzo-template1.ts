const enzoTemplate1 = {
  name: 'Enzo Professional',

  page: {
    width: 794,
    height: 1122,
    padding: 0,
    background: '#ffffff',
    className: 'text-neutral-900 leading-relaxed break-words whitespace-pre-wrap',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },

  columns: {
    spacing: '0px',
    left: {
      width: '270px',
      className: 'bg-[#E8DCC8] tracking-wide text-neutral-800 px-6 py-8',
    },
    right: {
      width: 'calc(100% - 270px)',
      className: 'px-10 py-8 flex flex-col gap-4',
    },
  },

  sections: [
    // Profile Picture Section - Left Column
    {
      id: 'profile-picture',
      type: 'header',
      column: 'left',
      className: 'flex flex-col items-center mb-6',
      fields: {
        profileImage: {
          type: 'image',
          path: 'personalDetails.items[0].profilePicturePublicUrl',
          fallback: '/images/profileimg.jpeg',
          className: 'w-32 h-32 rounded-full object-cover bg-neutral-300',
          alt: 'Profile img',
        },
      },
    },

    // Contact Section - Left Column
    {
      id: 'header',
      type: 'header',
      column: 'left',
      className: 'mb-6',
      fields: {
        contact: {
          type: 'group',
          className: 'flex flex-col gap-2',
          items: [
            // Heading
            {
              type: 'text',
              path: '',
              fallback: 'CONTACT',
              className: 'text-sm font-bold text-[#C9A961] tracking-wide uppercase',
            },
            // Phone
            {
              type: 'inline-group-with-icon',
              className: 'flex flex-row items-center gap-2',
              items: [
                {
                  type: 'icon',
                  name: 'Phone',
                  size: 14,
                  className: 'text-neutral-800 flex-shrink-0',
                },
                {
                  path: 'personalDetails.items[0].phone',
                  fallback: '',
                  className: 'text-xs text-neutral-800 break-all',
                },
              ],
            },
            // Email
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-2',
              items: [
                {
                  type: 'icon',
                  name: 'Mail',
                  size: 14,
                  className: 'text-neutral-800 flex-shrink-0',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].email',
                  href: 'mailto:{{value}}',
                  fallback: '',
                  className: 'text-xs text-neutral-800 break-all',
                },
              ],
            },
            // LinkedIn
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-2',
              items: [
                {
                  type: 'icon',
                  name: 'Linkedin',
                  size: 14,
                  className: 'text-neutral-800 flex-shrink-0',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.linkedin.title',
                  href: 'personalDetails.items[0].links.linkedin.link',
                  fallback: '',
                  className: 'text-xs text-neutral-800 break-all',
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
                  className: 'text-neutral-800 flex-shrink-0',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.github.title',
                  href: 'personalDetails.items[0].links.github.link',
                  fallback: '',
                  className: 'text-xs text-neutral-800 break-all',
                },
              ],
            },
            // Website
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-2',
              items: [
                {
                  type: 'icon',
                  name: 'Globe',
                  size: 14,
                  className: 'text-neutral-800 flex-shrink-0',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.website.title',
                  href: 'personalDetails.items[0].links.website.link',
                  fallback: '',
                  className: 'text-xs text-neutral-800 break-all',
                },
              ],
            },
            // Youtube
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-2',
              items: [
                {
                  type: 'icon',
                  name: 'Youtube',
                  size: 14,
                  className: 'text-neutral-800 flex-shrink-0',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.youtube.title',
                  href: 'personalDetails.items[0].links.youtube.link',
                  fallback: '',
                  className: 'text-xs text-neutral-800 break-all',
                },
              ],
            },
            // Dribbble
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-2',
              items: [
                {
                  type: 'icon',
                  name: 'Dribbble',
                  size: 14,
                  className: 'text-neutral-800 flex-shrink-0',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.dribble.title',
                  href: 'personalDetails.items[0].links.dribble.link',
                  fallback: '',
                  className: 'text-xs text-neutral-800 break-all',
                },
              ],
            },
            // Behance
            {
              type: 'inline-group-with-icon',
              className: 'flex items-center gap-2',
              items: [
                {
                  type: 'icon',
                  name: 'Palette',
                  size: 14,
                  className: 'text-neutral-800 flex-shrink-0',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.behance.title',
                  href: 'personalDetails.items[0].links.behance.link',
                  fallback: '',
                  className: 'text-xs text-neutral-800 break-all',
                },
              ],
            },
          ],
        },
      },
    },

    // Professional Profile Section - Left Column
    {
      id: 'summary',
      type: 'content-section',
      column: 'left',
      className: 'flex flex-col pt-3 border-t border-[#C9A961]',
      heading: {
        path: 'summary.heading',
        fallback: 'Summary',

        className: 'text-sm font-bold text-[#C9A961] tracking-wide uppercase mb-1',
      },
      content: {
        type: 'html',
        path: 'personalDetails.items[0].description',
        fallback: 'Summary',
        className: 'text-xs text-neutral-800 leading-relaxed break-words whitespace-pre-wrap mb-6',
      },
    },

    // {
    //   id: 'skills',
    //   type: 'inline-list-section', // ✅ important
    //   column: 'left',
    //   break: true,
    //   className: 'pl-6 mb-4',
    //   heading: {
    //     path: 'skills.heading',
    //     fallback: 'SKILLS',
    //     className: 'text-sm font-bold text-[#C9A961] mb-1 tracking-wide uppercase pt-3 border-t border-[#C9A961]',
    //   },
    //   listPath: 'skills.items',
    //   containerClassName: 'flex flex-col gap-1 text-xs mb-3.5',
    //   itemTemplate: {
    //     break: true,
    //     fields: [
    //       {
    //         prefix: '• ',
    //         path: 'name',
    //         className: 'text-xs text-neutral-800 leading-none py-0.5',
    //       },
    //     ],
    //   },
    // },

    {
      id: 'skills',
      type: 'inline-list-section',
      column: 'left',
      break: true,
      className: 'pl-6 mb-4',
      heading: {
        path: 'skills.heading',
        fallback: 'SKILLS',
        className: 'text-sm font-bold text-[#C9A961] mb-1 tracking-wide uppercase pt-3 border-t border-[#C9A961]',
      },
      listPath: 'skills.items',
      itemPath: 'name',
      itemSeparator: ', ',
      showBullet: false,
      containerClassName: 'text-xs mb-3.5',
      itemClassName: 'text-xs text-neutral-800 leading-relaxed',
    },

    // Header Section - Right Column
    {
      id: 'header',
      type: 'header',
      column: 'right',
      className: 'flex flex-col mb-4',
      fields: {
        nameTitle: {
          className: 'flex flex-col gap-1',
        },
        name: {
          path: 'personalDetails.items[0].fullName',
          fallback: 'NELLY SMITH',
          className: 'text-4xl font-bold text-[#C9A961] tracking-wide uppercase',
        },
        title: {
          path: 'personalDetails.items[0].jobTitle',
          fallback: 'GRAPHIC DESIGNER',
          className: 'text-lg font-semibold text-neutral-800 tracking-wide uppercase',
        },
      },
    },

    // Experience Section - Right Column
    {
      id: 'experience',
      type: 'list-section',
      column: 'right',
      break: true,
      heading: {
        path: 'experience.heading',
        fallback: 'EXPERIENCE',
        className: 'text-sm font-bold text-[#C9A961] tracking-wide uppercase',
      },
      listPath: 'experience.items',
      containerClassName: 'flex flex-col gap-3',
      itemTemplate: {
        className: 'flex flex-col gap-1',
        break: true,
        rows: [
          {
            className: 'flex flex-row justify-between items-baseline gap-2 flex-wrap',
            cells: [
              {
                path: 'position',
                className: 'text-sm font-bold text-neutral-900 break-words flex-1 min-w-0',
              },
              {
                path: 'company',
                className: 'text-xs font-normal text-neutral-600 italic break-words',
              },
            ],
          },
          {
            className: 'flex flex-row gap-2 items-center text-xs text-neutral-600 flex-wrap',
            cells: [
              {
                type: 'duration',
                path: 'duration',
                className: 'text-xs text-neutral-600',
              },
              {
                path: 'location',
                fallback: '',
                prefix: '• ',
                className: 'text-xs text-neutral-600 break-words',
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
                  'text-xs text-neutral-700 leading-relaxed mt-2 break-words whitespace-pre-wrap [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 [&_*]:break-words',
              },
            ],
          },
        ],
      },
    },

    // Education Section - Right Column
    {
      id: 'education',
      type: 'list-section',
      column: 'right',
      heading: {
        path: 'education.heading',
        fallback: 'EDUCATION',
        className: 'text-sm font-bold text-[#C9A961] tracking-wide uppercase mb-1 mt-2',
      },
      listPath: 'education.items',
      containerClassName: 'flex flex-col gap-3',
      itemTemplate: {
        className: 'flex flex-col',
        rows: [
          {
            className: 'flex flex-row justify-between items-baseline gap-2',
            cells: [
              {
                path: 'degree',
                className: 'text-sm font-bold text-neutral-900 break-words flex-1 min-w-0',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-xs text-neutral-600 flex-shrink-0',
              },
            ],
          },
          {
            className: 'flex flex-row gap-1 items-center text-xs text-neutral-600 flex-wrap',
            cells: [
              {
                path: 'institution',
                className: 'text-xs text-neutral-600 break-words',
              },
              {
                path: 'location',
                fallback: '',
                prefix: '• ',
                className: 'text-xs text-neutral-600 break-words',
              },
            ],
          },
          {
            cells: [
              {
                path: 'grade.value',
                className: 'text-xs text-neutral-700',
              },
            ],
          },
        ],
      },
    },

    {
      id: 'projects',
      type: 'list-section',
      column: 'right',
      break: true,
      heading: {
        path: 'projects.title',
        fallback: 'Projects',
        className: 'text-sm font-bold text-[#C9A961] tracking-wide uppercase mb-1.5 mt-2',
      },
      listPath: 'projects.items',
      containerClassName: 'flex flex-col gap-3 mt-1',
      itemTemplate: {
        className: 'flex flex-col',
        break: true,
        fields: [
          {
            type: 'horizontal-group',
            className: 'flex flex-row justify-between items-baseline gap-2 flex-wrap',
            items: [
              {
                path: 'title',
                href: 'link.link',
                fallback: 'Project Title',
                className: 'text-sm font-bold text-neutral-900 break-words flex-1 min-w-0',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-xs text-neutral-600',
              },
            ],
          },

          {
            type: 'html',
            path: 'description',
            break: true,
            className:
              'text-xs text-neutral-700 leading-relaxed mt-2 break-words whitespace-pre-wrap [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 [&_*]:break-words',
          },
        ],
      },
    },

    // Certifications Section - Right Column
    {
      id: 'certifications',
      type: 'list-section',
      break: true,
      column: 'right',
      heading: {
        path: 'certifications.heading',
        fallback: 'CERTIFICATIONS',
        className: 'text-sm font-bold text-[#C9A961] tracking-wide uppercase mb-1 mt-2',
      },
      listPath: 'certifications.items',
      containerClassName: 'flex flex-col gap-3',
      itemTemplate: {
        className: 'flex flex-col leading-none',
        break: true,
        fields: [
          {
            path: 'title',
            fallback: 'Certification Title',
            className: 'text-sm font-bold text-neutral-900 break-words',
          },
          {
            path: 'issuer',
            fallback: 'Issuer',
            className: 'text-xs text-neutral-600 break-words',
          },
        ],
      },
    },

    // Interests Section - Left Column
    {
      id: 'interests',
      break: true,
      breakable: true,
      type: 'inline-list-section',
      column: 'right',
      className: 'pt-6 border-t border-[#C9A961]',
      heading: {
        path: 'interests.heading',
        fallback: 'INTERESTS',
        className: 'text-sm font-bold text-[#C9A961] tracking-wide mb-1 mt-2 uppercase',
      },
      listPath: 'interests.items[0].items',
      itemClassName: 'text-xs text-neutral-800',
      containerClassName: 'text-xs',
      itemSeparator: ', ',
    },

    // Achievements Section - Left Column
    {
      id: 'achievements',
      type: 'badge-section',
      column: 'right',
      break: true,
      breakable: true,
      heading: {
        path: 'achievements.title',
        fallback: 'Achievements',
        className: 'text-sm font-bold text-[#C9A961] tracking-wide uppercase mt-2 -mb-1',
      },
      listPath: 'achievements.items[0].items',
      itemPath: '',
      itemPrefix: '• ',
      badgeClassName:
        'block w-full text-xs text-neutral-800 break-words whitespace-pre-wrap leading-relaxed overflow-wrap-anywhere',
    },
  ],
};

export default enzoTemplate1;
