export const mohsinaTemplate8 = {
  name: 'Mohsina Template 8',
  page: {
    background: '#ffffff',
    className: 'text-neutral-900 leading-relaxed',
    fontFamily: 'Inter',
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
          className: 'flex flex-row justify-between items-start w-full gap-4',
          items: [
            {
              type: 'group',
              className: 'flex items-start gap-8 -ml-6 flex-1 min-w-0 max-w-[70%]',
              items: [
                {
                  type: 'image',
                  path: 'personalDetails.items[0].profilePicturePublicUrl',
                  condition: 'personalDetails.items[0].profilePicturePublicUrl',
                  className: 'w-[100px] h-[100px] rounded-full object-cover flex-shrink-0',
                  alt: 'Profile image',
                },

                {
                  type: 'group',
                  className: 'flex flex-col items-stretch gap-2 flex-1 min-w-0',
                  items: [
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].fullName',
                      fallback: 'AMAN GUPTA',
                      className: 'text-3xl font-medium text-[#3E6AF2] uppercase break-words leading-[1.1]',
                    },
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].jobTitle',
                      fallback: 'UX-DESIGNER',
                      className: 'text-xl font-normal uppercase text-black break-words leading-tight',
                    },
                  ],
                },
              ],
            },

            {
              type: 'group',
              className: 'flex flex-col items-start gap-0 mb-2 w-[30%] flex-shrink-0 text-left',
              items: [
                {
                  type: 'inline-group',
                  className: 'flex gap-2 items-start',
                  items: [
                    {
                      type: 'text',
                      fallback: 'Email:',
                      className: 'text-[10px] font-semibold text-gray-500 w-[55px] flex-shrink-0 mt-[3px]',
                    },
                    {
                      type: 'link',
                      path: 'personalDetails.items[0].email',
                      href: 'mailto:{{value}}',
                      fallback: 'amanguppta@gmail.com',
                      className: 'text-[10px] text-black break-all leading-tight',
                    },
                  ],
                },

                {
                  type: 'inline-group',
                  className: 'flex gap-2 items-start ',
                  items: [
                    {
                      type: 'text',
                      fallback: 'Location:',
                      className: 'text-[10px] font-semibold text-gray-500 leading-tight  flex-shrink-0 mt-[3px]',
                    },
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].address',
                      fallback: 'Gurugram, Haryana',
                      className: 'text-[10px] text-black leading-[2px] ',
                    },
                  ],
                },

                {
                  type: 'inline-group',
                  className: 'flex gap-2 items-start',
                  items: [
                    {
                      type: 'text',
                      fallback: 'Phone:',
                      className: 'text-[10px] font-semibold text-gray-500 w-[55px] flex-shrink-0 mt-[3px]',
                    },
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].phone',
                      fallback: '(914) 479-6342',
                      className: 'text-[10px] text-black leading-tight',
                    },
                  ],
                },

                {
                  type: 'inline-group',
                  className: 'flex gap-2 items-start',
                  items: [
                    {
                      type: 'text',
                      fallback: 'Connect:',
                      className: 'text-[10px] font-semibold text-gray-500 w-[55px] flex-shrink-0 mt-[3px]',
                    },
                    {
                      type: 'group',
                      className:
                        'flex flex-wrap gap-1 items-center text-[10px] font-semibold text-black leading-tight font-poppins underline decoration-1 underline-offset-2 break-words',
                      separator: '/',
                      items: [
                        {
                          type: 'link',
                          path: 'personalDetails.items[0].links.website.title',
                          href: 'personalDetails.items[0].links.website.link',
                          condition: 'personalDetails.items[0].links.website.link',
                          fallback: 'Portfolio',
                        },
                        {
                          type: 'link',
                          path: 'personalDetails.items[0].links.linkedin.title',
                          href: 'personalDetails.items[0].links.linkedin.link',
                          condition: 'personalDetails.items[0].links.linkedin.link',
                          fallback: 'LinkedIn',
                        },
                        {
                          type: 'link',
                          path: 'personalDetails.items[0].links.github.title',
                          href: 'personalDetails.items[0].links.github.link',
                          condition: 'personalDetails.items[0].links.github.link',
                          fallback: 'GitHub',
                        },
                        {
                          type: 'link',
                          path: 'personalDetails.items[0].links.dribble.title',
                          href: 'personalDetails.items[0].links.dribble.link',
                          condition: 'personalDetails.items[0].links.dribble.link',
                          fallback: 'Dribble',
                        },
                        {
                          type: 'link',
                          path: 'personalDetails.items[0].links.behance.title',
                          href: 'personalDetails.items[0].links.behance.link',
                          condition: 'personalDetails.items[0].links.behance.link',
                          fallback: 'Behance',
                        },
                        {
                          type: 'link',
                          path: 'personalDetails.items[0].links.youtube.title',
                          href: 'personalDetails.items[0].links.youtube.link',
                          condition: 'personalDetails.items[0].links.youtube.link',
                          fallback: 'YouTube',
                        },
                      ],
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
      className: 'mb-4',

      heading: {
        path: 'summary.heading',
        fallback: 'Profile',
        className:
          'block float-left w-[180px] text-[#005FF2] font-[Inter] text-sm font-bold tracking-[1px] uppercase whitespace-nowrap mt-1',
      },

      content: {
        type: 'html',
        path: 'personalDetails.items[0].description',
        fallback: 'Versatile Full-Stack Software Engineer with 6+ years of hands-on experience...',
        className: 'ml-[180px] text-xs text-[#4d4d4d] leading-[18px] font-[Inter]',
      },
    },
    {
      id: 'experience',
      type: 'list-section',
      className: 'mb-4',
      heading: {
        path: 'experience.heading',
        fallback: 'Experience',
        className:
          'block float-left w-[180px] text-[#005FF2] font-[Inter] text-sm font-bold tracking-[1px] uppercase whitespace-nowrap ',
      },

      listPath: 'experience.items',

      containerClassName: 'ml-[180px] flex flex-col gap-4',

      itemTemplate: {
        className: 'flex flex-col',

        rows: [
          {
            className: 'flex justify-between items-start w-full gap-4',
            cells: [
              {
                type: 'group',
                className: 'flex flex-col flex-1 min-w-0 leading-tight gap-0.5',
                items: [
                  {
                    path: 'position',
                    className: 'text-sm font-bold text-[#101214]',
                  },
                  {
                    path: 'company',
                    className: 'text-sm font-bold text-[#101214]',
                  },
                ],
              },

              {
                type: 'duration',
                path: 'duration',
                className: 'text-xs text-[#6B6B6B] leading-tight whitespace-nowrap w-32 shrink-0 text-right mt-1',
              },
            ],
          },

          {
            className: 'mt-2',
            cells: [
              {
                type: 'html',
                path: 'description',
                breakable: true,
                className: 'text-xs text-[#4d4d4d] leading-[18px] [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-[2px]',
              },
            ],
          },
        ],
      },
    },

    {
      id: 'education',
      type: 'list-section',
      className: 'mb-4',

      heading: {
        path: 'education.heading',
        fallback: 'Education',
        className:
          'block float-left w-[180px] text-[#005FF2] font-[Inter] text-sm font-bold tracking-[1px] uppercase whitespace-nowrap ',
      },

      listPath: 'education.items',

      containerClassName: 'ml-[180px] flex flex-col gap-4 mt-4',

      itemTemplate: {
        className: 'flex flex-col',

        rows: [
          {
            className: 'flex justify-between items-start w-full gap-4',
            cells: [
              {
                type: 'group',
                className: 'flex flex-col flex-1 min-w-0 leading-tight gap-0.5',
                items: [
                  {
                    path: 'degree',
                    className: 'text-sm font-bold text-[#101214]',
                  },
                  {
                    path: 'grade.value',
                    className: 'text-sm font-bold text-[#005FF2] -mt-1',
                  },
                  {
                    path: 'institution',
                    className: 'text-xs text-[#6B6B6B] leading-tight',
                  },
                ],
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-xs text-[#6B6B6B] leading-tight whitespace-nowrap w-32 shrink-0 text-right mt-1',
              },
            ],
          },
        ],
      },
    },

    {
      id: 'projects',
      type: 'list-section',
      className: 'mt',
      heading: {
        path: 'projects.heading',
        fallback: 'Projects',
        className:
          'block float-left w-[180px] text-[#005FF2] font-[Inter] text-sm font-bold tracking-[1px] uppercase whitespace-nowrap mt-1',
      },

      listPath: 'projects.items',

      containerClassName: 'ml-[180px] flex flex-col gap-4 mt-4',

      itemTemplate: {
        className: 'flex flex-col',

        rows: [
          {
            className: 'flex justify-between items-start w-full',
            cells: [
              {
                path: 'title',
                fallback: 'Project Title',
                className: 'text-sm font-bold text-[#101214] leading-[13px]',
              },

              {
                type: 'duration',
                path: 'duration',
                className: 'text-xs text-[#6B6B6B] leading-[13px] whitespace-nowrap flex-shrink-0',
              },
            ],
          },

          {
            className: 'mt-2',
            cells: [
              {
                type: 'html',
                path: 'description',
                breakable: true,
                className: 'text-xs text-[#6B6B6B] leading-[18px] [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-[2px]',
              },
            ],
          },
        ],
      },
    },
    {
      id: 'achievements',
      type: 'badge-section',
      className: 'mb-4',

      break: true,
      breakable: true,

      heading: {
        path: 'achievements.heading',
        fallback: 'Achievements',
        className:
          'block float-left w-[180px] text-[#005FF2] font-[Inter] text-sm font-bold tracking-[1px] uppercase whitespace-nowrap mt-1',
      },

      listPath: 'achievements.items[0].items',
      itemPath: '',
      itemPrefix: '• ',

      containerClassName: 'ml-[180px] flex flex-col gap-2 mt-4',

      badgeClassName: 'block text-xs text-[#6B6B6B] leading-[18px] whitespace-pre-wrap',
    },
    {
      id: 'certifications',
      type: 'list-section',
      className: 'mb-4',

      heading: {
        path: 'certifications.heading',
        fallback: 'Certifications',
        className:
          'block float-left w-[180px] text-[#005FF2] font-[Inter] text-sm font-bold tracking-[1px] uppercase whitespace-nowrap ',
      },

      listPath: 'certifications.items',

      containerClassName: 'ml-[180px] flex flex-col gap-2 mt-4',

      itemTemplate: {
        className: 'flex flex-col',

        rows: [
          {
            className: 'flex justify-between items-center w-full',
            cells: [
              {
                path: 'title',
                className: 'text-sm font-bold text-[#101214] leading-[20px]',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-xs text-[#6B6B6B] leading-[13px] whitespace-nowrap flex-shrink-0 ml-2',
              },
            ],
          },
          {
            className: '',
            cells: [
              {
                path: 'issuer',
                className: 'text-xs text-[#6B6B6B] leading-[18px]',
              },
            ],
          },
        ],
      },
    },

    {
      id: 'skills',
      type: 'badge-section',
      className: 'mb-4',

      break: true,
      breakable: true,

      heading: {
        path: 'skills.heading',
        fallback: 'Skills',
        className:
          'block float-left w-[180px] text-[#005FF2] font-[Inter] text-sm font-bold tracking-[1px] uppercase whitespace-nowrap mt-1',
      },

      listPath: 'skills.items',
      itemPath: 'name',

      itemSeparator: ' | ',

      containerClassName: 'ml-[180px] flex flex-row flex-wrap mt-4',

      badgeClassName: 'text-xs font-bold text-black font-poppins tracking-[0.2px] ml-2',
    },
    {
      id: 'interests',
      type: 'badge-section',
      className: 'mb-4',

      break: true,
      breakable: true,

      heading: {
        path: 'interests.heading',
        fallback: 'Interests',
        className:
          'block float-left w-[180px] text-[#005FF2] font-[Inter] text-sm font-bold tracking-[1px] uppercase whitespace-nowrap mt-1',
      },

      listPath: 'interests.items[0].items',
      itemPath: '',

      itemSeparator: ' | ',

      containerClassName: 'ml-[180px] flex flex-row flex-wrap mt-4',

      badgeClassName: 'text-xs font-bold text-black tracking-[0.2px] ml-2',
    },
  ],
};
