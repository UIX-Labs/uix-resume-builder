export const mohsinaTemplate9 = {
  name: 'Mohsina Template 9',
  page: {
    background: '#ffffff',
    className: 'text-neutral-900 leading-relaxed',
    fontFamily: 'Helvetica, Poppins',
  },

  sections: [
    {
      //HEADER SECTION
      id: 'header',
      type: 'banner',
      className: 'flex flex-col justify-center  px-8 py-6',
      fields: {
        container: {
          type: 'group',
          className: 'flex flex-row justify-between items-center w-full',
          items: [
            {
              type: 'group',
              className: 'flex items-center gap-5',
              items: [
                {
                  type: 'group',
                  className: 'flex flex-col items-stretch gap-2',
                  items: [
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].jobTitle',
                      fallback: 'UX-DESIGNER',
                      className: 'text-xs leading-[11px] font-normal uppercase text-gray-500',
                    },
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].fullName',
                      fallback: 'AMAN GUPTA',
                      className: 'text-xl leading-[15px] font-semibold tracking-[-0.3px] text-[#3E6AF2]',
                    },
                  ],
                },
              ],
            },

            {
              type: 'group',
              className: 'flex flex-col items-start gap-0 mb-2',
              items: [
                {
                  type: 'inline-group-with-icon',
                  className: 'flex gap-1',
                  items: [
                    {
                      type: 'icon',
                      name: 'Mail',
                      size: 10,
                      className: 'text-[#3E6AF2]',
                    },

                    {
                      type: 'link',
                      path: 'personalDetails.items[0].email',
                      href: 'mailto:{{value}}',
                      fallback: 'amanguppta@gmail.com',
                      className: 'text-[9px] text-black',
                    },
                  ],
                },

                {
                  type: 'inline-group-with-icon',
                  className: 'flex gap-1',
                  items: [
                    {
                      type: 'icon',
                      name: 'MapPin',
                      size: 10,
                      className: 'text-[#3E6AF2]',
                    },

                    {
                      type: 'text',
                      path: 'personalDetails.items[0].location',
                      fallback: 'Gurugram, Haryana',
                      className: 'text-[9px] text-black',
                    },
                  ],
                },

                {
                  type: 'inline-group-with-icon',
                  className: 'flex gap-1',
                  items: [
                    {
                      type: 'icon',
                      name: 'Linkedin',
                      size: 10,
                      className: 'text-[#3E6AF2]',
                    },

                    {
                      type: 'link',
                      path: 'personalDetails.items[0].links.linkedin.title',
                      href: 'personalDetails.items[0].links.linkedin.link',
                      fallback: 'Portfolio / linkedin',
                      className: 'text-[9px] text-black',
                    },
                  ],
                },

                {
                  type: 'inline-group-with-icon',
                  className: 'flex gap-1',
                  items: [
                    {
                      type: 'icon',
                      name: 'Phone',
                      size: 10,
                      className: 'text-[#3E6AF2]',
                    },
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].phone',
                      fallback: '(914) 479-6342',
                      className: 'text-[9px] text-black',
                    },
                  ],
                },

                {
                  type: 'inline-group-with-icon',
                  className: 'flex gap-1',
                  items: [
                    {
                      type: 'icon',
                      name: 'Link',
                      size: 10,
                      className: 'text-[#3E6AF2]',
                    },

                    {
                      type: 'link',
                      path: 'personalDetails.items[0].links.website.title',
                      href: 'personalDetails.items[0].links.website.link',
                      fallback: 'Portfolio',
                      className: 'text-[9px] text-black',
                    },
                  ],
                },

                {
                  type: 'inline-group-with-icon',
                  className: 'flex gap-1',
                  items: [
                    {
                      type: 'icon',
                      name: 'Github',
                      size: 10,
                      className: 'text-[#3E6AF2]',
                    },

                    {
                      type: 'link',
                      path: 'personalDetails.items[0].links.github.title',
                      href: 'personalDetails.items[0].links.github.link',
                      fallback: 'Github',
                      className: 'text-[9px] text-black',
                    },
                  ],
                },

                {
                  type: 'inline-group-with-icon',
                  className: 'flex gap-1',
                  items: [
                    {
                      type: 'icon',
                      name: 'ColorPalette',
                      size: 10,
                      className: 'text-[#3E6AF2]',
                    },
                    {
                      type: 'link',
                      path: 'personalDetails.items[0].links.behance.title',
                      href: 'personalDetails.items[0].links.behance.link',
                      fallback: 'Behance',
                      className: 'text-[9px] text-black',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    },
    //SUMMARY
    {
      id: 'summary',
      type: 'content-section',

      heading: {
        path: 'summary.heading',
        fallback: 'Profile',
        className: 'block float-left w-32 text-black  text-[10px] font-bold tracking-[1px] uppercase whitespace-nowrap',
      },

      content: {
        type: 'html',
        path: 'personalDetails.items[0].description',
        fallback: 'Versatile Full-Stack Software Engineer with 6+ years of hands-on experience...',
        className: 'overflow-hidden text-[9px] text-[rgba(0,0,0,0.7)] leading-[14px] ',
      },
    },
    {
      id: 'education',
      type: 'list-section',

      heading: {
        path: 'education.heading',
        fallback: 'Education',
        className:
          'block float-left w-32 text-black  text-[10px] font-bold tracking-[1px] uppercase whitespace-nowrap mt-2',
      },

      listPath: 'education.items',

      containerClassName: 'overflow-hidden flex flex-col gap-0 mb-2',

      itemTemplate: {
        className: 'flex flex-col',

        rows: [
          {
            className: 'flex justify-between items-center w-full mt-2',
            cells: [
              {
                type: 'group',
                className: 'flex items-center gap-1',
                items: [
                  {
                    path: 'degree',
                    className: 'text-[10px] font-bold text-[#101214] leading-[13px]',
                  },
                  {
                    path: 'grade.value',
                    prefix: ', ',
                    className: 'text-[10px] font-bold text-[#005FF2] leading-[13px]',
                  },
                ],
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[9px] text-[#3E6AF2] leading-[13px] whitespace-nowrap flex-shrink-0',
              },
            ],
          },
          {
            className: '',
            cells: [
              {
                path: 'institution',
                className: 'text-[9px] text-[#6B6B6B] leading-[14px]',
              },
            ],
          },
        ],
      },
    },
    {
      id: 'experience',
      type: 'list-section',
      heading: {
        path: 'experience.heading',
        fallback: 'Experience',
        className: 'block float-left w-32 text-black  text-[10px] font-bold tracking-[1px] uppercase whitespace-nowrap',
      },

      listPath: 'experience.items',

      containerClassName: 'overflow-hidden flex flex-col gap-2 mb-2',

      itemTemplate: {
        className: 'flex flex-col',

        rows: [
          {
            className: 'flex justify-between items-start w-full',
            cells: [
              {
                type: 'group',
                className: 'flex flex-wrap gap-1',
                items: [
                  {
                    path: 'position',
                    className: 'text-[10px] font-bold text-[#101214] leading-[13px]',
                  },
                  {
                    path: 'company',
                    prefix: ', ',
                    className: 'text-[10px] font-bold text-[#101214] leading-[13px]',
                  },
                ],
              },

              {
                type: 'duration',
                path: 'duration',
                className: 'text-[9px] text-[#3E6AF2] leading-[13px] whitespace-nowrap flex-shrink-0',
              },
            ],
          },

          {
            className: 'mt-[2px]',
            cells: [
              {
                type: 'html',
                path: 'description',
                breakable: true,
                className: 'text-[9px] text-[#6B6B6B] leading-[14px] [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-[2px]',
              },
            ],
          },
        ],
      },
    },
    {
      id: 'projects',
      type: 'list-section',
      heading: {
        path: 'projects.heading',
        fallback: 'Projects',
        className: 'block float-left w-32 text-black  text-[10px] font-bold tracking-[1px] uppercase whitespace-nowrap',
      },

      listPath: 'projects.items',

      containerClassName: 'overflow-hidden flex flex-col gap-2 mb-2',

      itemTemplate: {
        className: 'flex flex-col',

        rows: [
          {
            className: 'flex justify-between items-start w-full',
            cells: [
              {
                path: 'title',
                fallback: 'Project Title',
                className: 'text-[10px] font-bold text-[#101214] leading-[13px]',
              },

              {
                type: 'duration',
                path: 'duration',
                className: 'text-[9px] text-[#3E6AF2] leading-[13px] whitespace-nowrap flex-shrink-0',
              },
            ],
          },

          {
            className: 'mt-[2px]',
            cells: [
              {
                type: 'html',
                path: 'description',
                breakable: true,
                className: 'text-[9px] text-[#6B6B6B] leading-[14px] [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-[2px]',
              },
            ],
          },
        ],
      },
    },
    {
      id: 'achievements',
      type: 'badge-section',

      break: true,
      breakable: true,

      heading: {
        path: 'achievements.heading',
        fallback: 'Achievements',
        className: 'block float-left w-32 text-black  text-[10px] font-bold tracking-[1px] uppercase whitespace-nowrap',
      },

      listPath: 'achievements.items[0].items',
      itemPath: '',
      itemPrefix: '• ',

      containerClassName: 'overflow-hidden flex flex-col gap-2',

      badgeClassName: 'block text-[9px] text-[#6B6B6B] leading-[14px] whitespace-pre-wrap',
    },
    {
      id: 'certifications',
      type: 'list-section',

      heading: {
        path: 'certifications.heading',
        fallback: 'Certifications',
        className:
          'block float-left w-32 text-black text-[10px] font-bold tracking-[1px] uppercase whitespace-nowrap mt-2',
      },

      listPath: 'certifications.items',

      containerClassName: 'overflow-hidden flex flex-col gap-2 mb-2 mt-2',

      itemTemplate: {
        className: 'flex flex-col',

        rows: [
          {
            className: 'flex justify-between items-center w-full',
            cells: [
              {
                path: 'title',
                className: 'text-[10px] font-bold text-[#101214] leading-[13px]',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[9px] text-[#3E6AF2] leading-[13px] whitespace-nowrap flex-shrink-0',
              },
            ],
          },
          {
            cells: [
              {
                path: 'issuer',
                className: 'text-[9px] text-[#6B6B6B] leading-[14px]',
              },
            ],
          },
        ],
      },
    },

    {
      id: 'skills',
      type: 'badge-section',

      break: true,
      breakable: true,

      heading: {
        path: 'skills.heading',
        fallback: 'Skills',
        className:
          'block float-left w-[123px] text-black text-[10px] font-bold tracking-[1px] uppercase whitespace-nowrap',
      },

      listPath: 'skills.items',
      itemPath: 'name',

      containerClassName: 'overflow-hidden flex flex-row flex-wrap gap-[10px]',

      badgeClassName:
        'text-[9px] font-semibold text-white leading-[14px] bg-[#005FF2] px-[5px] py-[2px] font-[Poppins] flex items-center',
    },
    {
      id: 'interests',
      type: 'badge-section',

      break: true,
      breakable: true,

      heading: {
        path: 'interests.heading',
        fallback: 'Interests',
        className:
          'block float-left w-[123px] text-black text-[10px] font-bold tracking-[1px] uppercase whitespace-nowrap',
      },

      listPath: 'interests.items[0].items',
      itemPath: '',

      containerClassName: 'overflow-hidden flex flex-row flex-wrap gap-x-4 gap-y-1',

      badgeClassName:
        'flex items-center gap-[6px] text-[10px] font-bold text-black tracking-[0.2px] before:content-[""] before:w-[4px] before:h-[4px] before:rounded-full before:bg-[#005FF2]',
    },
  ],
};
