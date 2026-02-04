const template10 = {
  name: 'Dark Two Column Professional',

  page: {
    background: '#141414',
    className: 'text-black leading-relaxed',
    fontFamily: 'Lora',
  },

  columns: {
    spacing: '15px',
    left: {
      width: 'calc(100% - 250px)',
      className: 'px-3 pt-3 gap-3',
    },
    right: {
      width: '300px',
      className: 'pb-10 pt-3 w-full pr-12',
    },
  },

  sections: [
    // Header Section - Name and Title on one line
    {
      id: 'header',
      type: 'header',
      column: 'left',
      break: false,
      className: 'mb-4',
      fields: {
        nameTitle: {
          className: 'flex flex-col items-baseline',
        },
        name: {
          path: 'personalDetails.items[0].fullName',
          fallback: 'Nina Patel',
          className: 'text-[24px] font-bold text-white leading-[1.2] after:text-white whitespace-nowrap',
        },
        title: {
          path: 'personalDetails.items[0].jobTitle',
          fallback: 'UX Designer',
          className: 'text-[18px] font-semibold text-white leading-[1.2] mt-1',
        },
      },
    },

    // Description Section - Left Column
    {
      id: 'header',
      type: 'header',
      column: 'left',
      break: false,
      className: 'mb-[24px] border-b border-gray-500 pb-4',
      fields: {
        description: {
          path: 'personalDetails.items[0].description',
          fallback: 'description',
          className: 'text-sm leading-[1.6] text-[#D1D5DB]',
        },
      },
    },

    // Contact Section - Right Column (at top)
    {
      id: 'header',
      type: 'header',
      column: 'right',
      break: false,
      className: 'mb-6',
      fields: {
        contact: {
          className: 'flex flex-col items-end text-right space-y-1',

          items: [
            {
              type: 'link',
              path: 'personalDetails.items[0].email',
              href: 'mailto:{{value}}',
              fallback: 'ninapatel@gmail.com',
              className: 'text-sm font-medium text-white leading-[1.21]',
            },
            {
              path: 'personalDetails.items[0].phone',
              fallback: '+91 432 2222 322',
              className: 'text-sm font-medium text-white leading-[1.21]',
            },
            {
              type: 'link',
              path: 'personalDetails.items[0].links.linkedin.title',
              href: 'personalDetails.items[0].links.linkedin.link',
              fallback: '',
              className: 'text-sm font-medium text-white leading-[1.21] hover:underline',
            },
            {
              type: 'link',
              path: 'personalDetails.items[0].links.github.title',
              href: 'personalDetails.items[0].links.github.link',
              fallback: '',
              className: 'text-sm font-medium text-white leading-[1.21] hover:underline',
            },
            {
              type: 'link',
              path: 'personalDetails.items[0].links.website.title',
              href: 'personalDetails.items[0].links.website.link',
              fallback: '',
              className: 'text-sm font-medium text-white leading-[1.21] hover:underline',
            },
            {
              type: 'link',
              path: 'personalDetails.items[0].links.youtube.title',
              href: 'personalDetails.items[0].links.youtube.link',
              fallback: '',
              className: 'text-sm font-medium text-white leading-[1.21] hover:underline',
            },
            {
              type: 'link',
              path: 'personalDetails.items[0].links.dribble.title',
              href: 'personalDetails.items[0].links.dribble.link',
              fallback: '',
              className: 'text-sm font-medium text-white leading-[1.21] hover:underline',
            },
            {
              type: 'link',
              path: 'personalDetails.items[0].links.behance.title',
              href: 'personalDetails.items[0].links.behance.link',
              fallback: '',
              className: 'text-sm font-medium text-white leading-[1.21] hover:underline',
            },
          ],
        },
      },
    },
    {
      id: 'skills',
      type: 'inline-list-section',
      column: 'right',
      break: true,
      breakable: true,

      heading: {
        path: 'skills.heading',
        fallback: 'Skills',
        className: 'text-base font-bold text-white uppercase tracking-normal mb-1.5 leading-[1.21] mt-4',
      },

      listPath: 'skills.items',

      // 🔑 KEY CHANGES
      itemPath: 'name',
      itemSeparator: ', ',
      showBullet: false,

      itemClassName: 'text-[13px] text-[#D1D5DB]',
      containerClassName: 'block text-white',
    },
    // Work Experience Section - Left Column
    {
      id: 'experience',
      type: 'list-section',
      column: 'left',
      break: true,
      className: 'mt-4',
      heading: {
        path: 'experience.heading',
        fallback: 'Work Experience',
        className: 'text-base font-bold text-white tracking-normal uppercase leading-[1.21] mb-3',
      },
      listPath: 'experience.items',
      containerClassName: 'flex flex-col gap-3',
      itemTemplate: {
        className: 'flex flex-col',
        break: true,
        rows: [
          {
            className: 'flex flex-col leading-none',
            cells: [
              {
                type: 'inline-group',
                className: 'flex flex-row gap-2 items-center',
                items: [
                  {
                    path: 'company',
                    fallback: 'ABC Company',
                    className: 'text-base font-bold text-white leading-[1.21]',
                  },
                  {
                    path: 'position',
                    fallback: 'UX Design Intern',
                    className: 'text-sm font-normal text-[#D1D5DB] leading-[1.21]',
                  },
                ],
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[10px] uppercase tracking-[0.02em] italic text-[#9CA3AF] leading-[1.21]',
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
                  'text-sm leading-[1.6] text-[#D1D5DB] whitespace-pre-wrap [&_ul]:ml-3 [&_li]:list-disc [&_li]:mb-1',
              },
            ],
          },
        ],
      },
    },

    // Education Section - Left Column
    {
      id: 'education',
      type: 'list-section',
      column: 'left',
      break: true,
      className: 'mt-7',
      heading: {
        path: 'education.heading',
        fallback: 'Education',
        className: 'text-base font-bold text-white tracking-normal uppercase leading-[1.21] mt-2',
      },
      listPath: 'education.items',
      containerClassName: 'flex flex-col gap-3',
      itemTemplate: {
        className: 'flex flex-col gap-3',

        rows: [
          // Row 1: Institution (left) | Degree (right)
          {
            className: 'flex gap-3 items-baseline leading-none',
            cells: [
              {
                path: 'institution',
                fallback: 'University of Design',
                className: 'text-base font-semibold text-white leading-[1.21]',
              },
              {
                path: 'degree',
                fallback: 'BSc (HCI)',
                className: 'text-sm font-normal text-[#D1D5DB] leading-[1.21] whitespace-nowrap',
              },
            ],
          },

          // Row 2: Date (below)
          {
            className: 'flex leading-none',
            cells: [
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[10px] italic uppercase tracking-[0.02em] text-[#9CA3AF] leading-[1.21]',
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
                  'text-sm leading-[1.6] text-[#D1D5DB] whitespace-pre-wrap [&_ul]:ml-3 [&_li]:list-disc [&_li]:mb-1',
              },
            ],
          },
        ],
      },
    },

    // Projects Section - Left Column
    {
      id: 'projects',
      type: 'list-section',
      column: 'left',
      break: true,
      // className: "mt-7",
      heading: {
        path: 'projects.heading',
        fallback: 'Projects',
        className: 'text-base font-bold text-white tracking-normal uppercase leading-[1.21] mt-2',
      },
      listPath: 'projects.items',
      containerClassName: 'flex flex-col gap-3',
      itemTemplate: {
        className: 'flex flex-col gap-3',
        break: true,
        rows: [
          {
            className: 'flex flex-col leading-none',
            cells: [
              {
                type: 'inline-group',
                className: 'flex flex-row gap-2 items-center',
                items: [
                  {
                    path: 'title',
                    fallback: 'Project Title',
                    className: 'text-base font-bold text-white leading-[1.21]',
                  },
                ],
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[10px] uppercase tracking-[0.02em] italic text-[#9CA3AF] leading-[1.21]',
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
                  'text-sm leading-[1.6] text-[#D1D5DB] whitespace-pre-wrap [&_ul]:ml-3 [&_li]:list-disc [&_li]:mb-1',
              },
            ],
          },
          {
            cells: [
              {
                type: 'link',
                path: 'link.title',
                href: 'link.link',
                className: 'text-xs text-white hover:underline mt-1',
              },
            ],
          },
        ],
      },
    },

    // Certifications Section - Left Column
    {
      id: 'certifications',
      type: 'list-section',
      column: 'left',
      break: true,
      className: 'mt-7',
      heading: {
        path: 'certifications.heading',
        fallback: 'Certifications',
        className: 'text-base font-bold text-white tracking-normal uppercase leading-[1.21] mt-2',
      },
      listPath: 'certifications.items',
      containerClassName: 'flex flex-col gap-3',
      itemTemplate: {
        className: 'flex flex-col gap-3',
        break: true,
        rows: [
          {
            className: 'flex flex-col leading-none',
            cells: [
              {
                type: 'inline-group',
                className: 'flex flex-col',
                items: [
                  {
                    path: 'title',
                    fallback: 'Certification Title',
                    className: 'text-base font-semibold text-white',
                  },
                  {
                    path: 'issuer',
                    fallback: 'Issuer',
                    className: 'text-sm font-normal text-[#D1D5DB]',
                  },
                ],
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[10px] italic uppercase tracking-[0.02em] text-[#9CA3AF] leading-[1.21]',
              },
            ],
          },
          {
            cells: [
              {
                type: 'link',
                path: 'link.title',
                href: 'link.link',
                className: 'text-xs text-white hover:underline',
              },
            ],
          },
        ],
      },
    },

    // Interests Section - Right Column
    {
      id: 'interests',
      type: 'inline-list-section',
      column: 'right',
      break: true,
      breakable: true,
      className: 'mt-8',

      heading: {
        path: 'interests.heading',
        fallback: 'Interests',
        className: 'text-base font-bold text-white uppercase tracking-normal mb-1.5 leading-[1.21] mt-5',
      },

      listPath: 'interests.items[0].items',

      // 🔑 REQUIRED CHANGES
      itemPath: '',
      itemSeparator: ', ',
      showBullet: false,

      itemClassName: 'text-sm text-[#D1D5DB]',
      containerClassName: 'block w-full text-white',
    },

    // Achievements Section - Right Column
    {
      id: 'achievements',
      type: 'inline-list-section',
      column: 'right',
      showBullet: true,
      break: true,
      breakable: true,
      className: 'mt-7',
      heading: {
        path: 'achievements.heading',
        fallback: 'Achievements',
        className: 'text-base font-bold text-white uppercase tracking-normal mb-3 leading-[1.21] mt-5',
      },
      listPath: 'achievements.items[0].items',
      itemPath: '',
      itemClassName: 'text-sm text-[#D1D5DB] inline-block break-words -ml-4',
      containerClassName: 'flex flex-col gap-3 w-full',
    },
  ],
};

export default template10;
