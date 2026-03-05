export const mohsinaTemplate6 = {
  name: 'Mohsina Template 6',
  page: {
    background: '#ffffff',
    className: 'text-neutral-900 leading-relaxed',
    fontFamily: 'Lato',
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
              className: 'flex items-center gap-4',
              items: [
                {
                  type: 'image',
                  path: 'personalDetails.items[0].profilePicturePublicUrl',
                  fallback: '/images/profileimg.jpeg',
                  className: 'w-20 h-20 rounded-full object-cover',
                  alt: 'Profile image',
                },

                {
                  type: 'group',
                  className: 'flex flex-col items-stretch gap-2',
                  items: [
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].jobTitle',
                      fallback: 'UX-DESIGNER',
                      className: 'text-[13px] leading-[11px] font-normal uppercase text-[#3E6AF2]',
                    },
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].fullName',
                      fallback: 'AMAN GUPTA',
                      className: 'text-[24px] leading-[15px] font-semibold tracking-[-0.3px] text-black',
                    },
                  ],
                },
              ],
            },

            {
              type: 'group',
              className: 'flex flex-col items-start gap-[4px]',
              items: [
                {
                  type: 'inline-group-with-icon',
                  className: 'flex items-center gap-1',
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
                      className: 'text-[9px] leading-[13px] text-black',
                    },
                  ],
                },
                {
                  type: 'inline-group-with-icon',
                  className: 'flex items-center gap-1',
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
                      className: 'text-[9px] leading-[13px] text-black',
                    },
                  ],
                },
                {
                  type: 'inline-group-with-icon',
                  className: 'flex items-center gap-1',
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
                      className: 'text-[9px] leading-[13px] text-black',
                    },
                  ],
                },
                {
                  type: 'inline-group-with-icon',
                  className: 'flex items-center gap-1',
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
                      className: 'text-[9px] leading-[13px] text-black',
                    },
                  ],
                },
                {
                  type: 'inline-group-with-icon',
                  className: 'flex items-center gap-1',
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
                      className: 'text-[9px] leading-[13px] text-black',
                    },
                  ],
                },
                {
                  type: 'inline-group-with-icon',
                  className: 'flex items-center gap-1',
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
                      className: 'text-[9px] leading-[13px] text-black',
                    },
                  ],
                },
                {
                  type: 'inline-group-with-icon',
                  className: 'flex items-center gap-1',
                  items: [
                    {
                      type: 'icon',
                      name: 'Palette',
                      size: 10,
                      className: 'text-[#3E6AF2]',
                    },
                    {
                      type: 'link',
                      path: 'personalDetails.items[0].links.behance.title',
                      href: 'personalDetails.items[0].links.behance.link',
                      fallback: 'Behance',
                      className: 'text-[9px] leading-[13px] text-black',
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

      className: 'flex flex-col px-0 pt-0',

      heading: {
        path: 'summary.heading',
        fallback: 'Professional Summary',
        className:
          'inline-flex items-center gap-3 text-[12px] font-bold leading-[15px] tracking-[-0.3px] text-black after:content-[""] after:flex-1 after:border-b-2 after:border-black after:opacity-[0.05]',
      },

      content: {
        type: 'html',
        path: 'personalDetails.items[0].description',
        fallback: 'Versatile Full-Stack Software Engineer with 6+ years of hands-on experience...',
        className: 'text-[10px] leading-[13px] text-black break-words whitespace-pre-wrap mt-2 ml-18',
      },
    },
    {
      id: 'education',
      type: 'list-section',

      heading: {
        path: 'education.heading',
        fallback: 'Education',
        className:
          'flex-row items-center gap-3 w-full text-[12px] font-bold leading-[15px] tracking-[-0.3px] text-black after:content-[""] after:flex-1 after:border-b-2 after:border-black after:opacity-[0.05] mt-2 mb-2 ',
      },

      listPath: 'education.items',

      containerClassName: 'flex flex-col gap-3',

      itemTemplate: {
        className: 'flex flex-row gap-4',

        rows: [
          {
            className: 'flex flex-row gap-2 w-full',
            cells: [
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[8px] uppercase text-[#3E6AF2] leading-[11px] flex-shrink-0 w-25 whitespace-nowrap',
              },

              {
                type: 'group',
                className: 'flex flex-col gap-[2px]',
                items: [
                  {
                    path: 'degree',
                    className: 'text-[10px] font-bold text-black leading-[13px] tracking-[0.1px]',
                  },
                  {
                    path: 'institution',
                    className: 'text-[10px] font-normal text-black leading-[13px]',
                  },
                ],
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
        className:
          'flex-row items-center gap-3 w-full text-[12px] font-bold leading-[15px] tracking-[-0.3px] text-black after:content-[""] after:flex-1 after:border-b-2 after:border-black after:opacity-[0.05] mt-2',
      },

      listPath: 'achievements.items[0].items',
      itemPath: '',
      itemPrefix: '• ',

      badgeClassName: 'block w-full text-[10px] text-[#4D4D4D] leading-[13px] whitespace-pre-wrap ml-20',
    },
    {
      id: 'experience',
      type: 'list-section',
      column: 'right',
      break: true,

      heading: {
        path: 'experience.heading',
        fallback: 'Experience',
        className:
          'flex-row items-center w-full gap-3 text-xs font-bold leading-[15px] tracking-[-0.3px] text-black after:content-[""] after:flex-1 after:border-b-2 after:border-black after:opacity-[0.05] mb-0 mt-2',
      },

      listPath: 'experience.items',

      containerClassName: 'flex flex-col gap-4',

      itemTemplate: {
        className: 'flex flex-col gap-2',

        rows: [
          {
            className: 'flex w-full gap-2',
            cells: [
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[8px] uppercase text-[#3E6AF2] leading-[11px] w-26 flex-shrink-0 whitespace-nowrap',
              },

              {
                type: 'group',
                className: 'flex flex-col gap-0 flex-1',
                items: [
                  {
                    type: 'group',
                    className: 'flex flex-wrap gap-1',
                    items: [
                      {
                        path: 'position',
                        className: 'text-[10px] font-bold text-black leading-[13px] tracking-[0.1px]',
                      },
                      {
                        path: 'company',
                        prefix: ', ',
                        className: 'text-[10px] font-bold text-black leading-[13px] tracking-[0.1px]',
                      },
                    ],
                  },

                  {
                    type: 'html',
                    path: 'description',
                    breakable: true,
                    className: 'text-[10px] text-black leading-[13px] [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-[2px]',
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    {
      id: 'projects',
      type: 'list-section',

      break: true,

      heading: {
        path: 'projects.heading',
        fallback: 'Projects',
        className:
          'flex-row items-center w-full gap-3 text-[12px] font-bold leading-[15px] tracking-[-0.3px] text-black after:content-[""] after:flex-1 after:border-b-2 after:border-black after:opacity-[0.05] mb-0 mt-2',
      },

      listPath: 'projects.items',

      containerClassName: 'flex flex-col gap-4',

      itemTemplate: {
        className: 'flex flex-col gap-2',

        rows: [
          {
            className: 'flex w-full gap-2',
            cells: [
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[8px] uppercase text-[#3E6AF2] leading-[11px] w-26 flex-shrink-0 whitespace-nowrap',
              },

              {
                type: 'group',
                className: 'flex flex-col gap-[4px] flex-1',
                items: [
                  {
                    path: 'title',
                    fallback: 'Project Title',
                    className: 'text-[10px] font-bold text-black leading-[13px] tracking-[0.1px]',
                  },

                  {
                    type: 'html',
                    path: 'description',
                    breakable: true,
                    className: 'text-[10px] text-black leading-[13px] [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-[2px]',
                  },
                ],
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
          'flex-row items-center w-full gap-3 text-[12px] font-bold leading-[15px] tracking-[-0.3px] text-black after:content-[""] after:flex-1 after:border-b-2 after:border-black after:opacity-[0.05] mt-2',
      },

      listPath: 'skills.items',
      itemPath: 'name',

      containerClassName: 'flex flex-wrap gap-x-4 gap-y-2 ml-[85px]',

      badgeClassName:
        'flex items-center gap-2 text-[10px] font-bold tracking-[0.1px] text-black before:content-[""] before:w-1.5 before:h-1.5 before:rounded-full before:border-2 before:border-[#3E6AF2]',
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
          'flex-row items-center w-full gap-3 text-[12px] font-bold leading-[15px] tracking-[-0.3px] text-black after:content-[""] after:flex-1 after:border-b-2 after:border-black after:opacity-[0.05] mt-2',
      },

      listPath: 'interests.items[0].items',
      itemPath: '',

      containerClassName: 'flex flex-wrap gap-x-4 gap-y-2 ml-[85px]',

      badgeClassName:
        'flex items-center gap-2 text-[10px] font-bold tracking-[0.1px] text-black before:content-[""] before:w-1.5 before:h-1.5 before:rounded-full before:border-2 before:border-[#3E6AF2]',
    },
  ],
};
