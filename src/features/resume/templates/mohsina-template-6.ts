export const mohsinaTemplate6 = {
  name: 'Mohsina Template 6',

  page: {
    background: '#ffffff',

    className: 'text-neutral-900 leading-relaxed    font-[lato]',

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

                  condition: 'personalDetails.items[0].profilePicturePublicUrl',

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

                      className: 'text-md leading-[11px] font-[lato] font-normal uppercase text-[#3E6AF2]',
                    },

                    {
                      type: 'text',

                      path: 'personalDetails.items[0].fullName',

                      fallback: 'AMAN GUPTA',

                      className:
                        'text-[34px] leading-[30px] font-semibold tracking-[-0.3px] font-[lato] text-black max-w-[420px] break-words',
                    },
                  ],
                },
              ],
            },

            {
              type: 'group',

              className: 'flex flex-col items-start gap-2',

              items: [
                {
                  type: 'inline-group-with-icon',

                  className: 'flex items-center gap-1',

                  items: [
                    {
                      type: 'icon',

                      name: 'Mail',

                      size: 12,

                      className: 'text-[#3E6AF2]',
                    },

                    {
                      type: 'link',

                      path: 'personalDetails.items[0].email',

                      href: 'mailto:{{value}}',

                      fallback: 'amanguppta@gmail.com',

                      className: 'text-xs leading-[13px] text-[#777777]    font-[lato]',
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

                      size: 12,

                      className: 'text-[#3E6AF2]',
                    },

                    {
                      type: 'text',

                      path: 'personalDetails.items[0].address',

                      fallback: 'Gurugram, Haryana',

                      className: 'text-xs leading-[13px] text-[#777777]    font-[lato]',
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

                      size: 12,

                      className: 'text-[#3E6AF2]',
                    },

                    {
                      type: 'link',

                      path: 'personalDetails.items[0].links.linkedin.title',

                      href: 'personalDetails.items[0].links.linkedin.link',

                      fallback: 'Portfolio / linkedin',

                      className: 'text-xs leading-[13px] text-[#777777]    font-[lato]',
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

                      size: 12,

                      className: 'text-[#3E6AF2]',
                    },

                    {
                      type: 'text',

                      path: 'personalDetails.items[0].phone',

                      fallback: '(914) 479-6342',

                      className: 'text-xs leading-[13px] text-[#777777]    font-[lato]',
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

                      size: 12,

                      className: 'text-[#3E6AF2]',
                    },

                    {
                      type: 'link',

                      path: 'personalDetails.items[0].links.website.title',

                      href: 'personalDetails.items[0].links.website.link',

                      fallback: 'Portfolio',

                      className: 'text-xs leading-[13px] text-[#777777]    font-[lato]',
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

                      size: 12,

                      className: 'text-[#3E6AF2]',
                    },

                    {
                      type: 'link',

                      path: 'personalDetails.items[0].links.github.title',

                      href: 'personalDetails.items[0].links.github.link',

                      fallback: 'Github',

                      className: 'text-xs leading-[13px] text-[#777777]    font-[lato]',
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

                      size: 12,

                      className: 'text-[#3E6AF2]',
                    },

                    {
                      type: 'link',

                      path: 'personalDetails.items[0].links.behance.title',

                      href: 'personalDetails.items[0].links.behance.link',

                      fallback: 'Behance',

                      className: 'text-xs leading-[13px] text-[#777777]    font-[lato]',
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

      className: 'flex flex-col px-0 mt-0',

      heading: {
        path: 'summary.heading',

        fallback: 'Professional Summary',

        className:
          'inline-flex items-center gap-3 text-base font-bold leading-[20px]  text-black font-[lato] after:content-[""] after:flex-1 after:border-b-2 after:border-black after:opacity-[0.05]',
      },

      content: {
        type: 'html',

        path: 'personalDetails.items[0].description',

        fallback: 'Versatile Full-Stack Software Engineer with 6+ years of hands-on experience...',

        className: 'text-[13px] leading-[18px] text-black break-words whitespace-pre-wrap mt-1 ml-28    font-[lato]',
      },
    },

    {
      id: 'education',

      type: 'list-section',

      heading: {
        path: 'education.heading',

        fallback: 'Education',

        className:
          'flex-row items-center gap-3 w-full  text-base font-bold leading-[20px] tracking-[-0.3px] text-black    font-[lato] after:content-[""] after:flex-1 after:border-b-2 after:border-black after:opacity-[0.05] mt-0  ',
      },

      listPath: 'education.items',

      containerClassName: 'flex flex-col gap-3 mt-1',

      itemTemplate: {
        className: 'flex flex-col gap-2',

        rows: [
          {
            className: 'flex justify-between items-start gap-4 w-full',

            cells: [
              {
                type: 'group',
                className: 'ml-28 flex flex-col gap-0.5 flex-1 min-w-0 leading-tight',
                items: [
                  {
                    path: 'degree',
                    className: 'text-[13px] font-semibold text-black tracking-[0.1px] font-[lato]',
                  },
                  {
                    path: 'grade.value',
                    className: 'text-[13px] font-semibold text-black tracking-[0.1px] font-[lato]',
                  },
                  {
                    path: 'institution',
                    className: 'text-[13px] font-normal text-black font-[lato]',
                  },
                ],
              },
              {
                type: 'duration',
                path: 'duration',
                className:
                  'text-[10px] uppercase text-[#3E6AF2] leading-tight w-32 shrink-0 whitespace-nowrap mt-1 font-[lato] text-right',
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
          'flex-row items-center gap-3 w-full text-base font-bold leading-[20px] tracking-[-0.3px] text-black    font-[lato] after:content-[""] after:flex-1 after:border-b-2 after:border-black after:opacity-[0.05] mt-0',
      },

      listPath: 'achievements.items[0].items',
      containerClassName: 'mt-1',

      itemPath: '',

      itemPrefix: '• ',

      badgeClassName: 'block w-full text-[13px] text-[#4D4D4D] leading-[18px]  ml-28  font-[lato]',
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
          'flex-row items-center w-full gap-3 text-base font-bold leading-[20px] tracking-[-0.3px] text-black    font-[lato] after:content-[""] after:flex-1 after:border-b-2 after:border-black after:opacity-[0.05] mb-0 mt-0',
      },

      listPath: 'experience.items',

      containerClassName: 'flex flex-col gap-2 mt-1',

      itemTemplate: {
        className: 'flex flex-col gap-2',

        rows: [
          {
            className: 'flex justify-between items-start gap-4 w-full',

            cells: [
              {
                type: 'group',
                className: 'ml-28 flex flex-col gap-0.5 flex-1 min-w-0 leading-tight',
                items: [
                  {
                    path: 'position',
                    className: 'text-[13px] font-bold text-black tracking-[0.1px] font-[lato]',
                  },
                  {
                    path: 'company',
                    className: 'text-[13px] font-bold text-black tracking-[0.1px] font-[lato]',
                  },
                  {
                    type: 'html',
                    path: 'description',
                    breakable: true,
                    className:
                      'text-[13px] text-[#4D4D4D] [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-[2px] font-[lato] mt-1',
                  },
                ],
              },
              {
                type: 'duration',
                path: 'duration',
                className:
                  'text-[10px] uppercase text-[#3E6AF2] leading-tight w-32 shrink-0 whitespace-nowrap mt-1 font-[lato] text-right',
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
          'flex-row items-center w-full gap-3 text-base font-bold leading-[20px] tracking-[-0.3px] text-black    font-[lato] after:content-[""] after:flex-1 after:border-b-2 after:border-black after:opacity-[0.05] mb-0 mt-0',
      },

      listPath: 'projects.items',

      containerClassName: 'flex flex-col gap-2 mt-1',

      itemTemplate: {
        className: 'flex flex-col gap-2',

        rows: [
          {
            className: 'block w-full',

            cells: [
              {
                type: 'duration',

                path: 'duration',

                className:
                  'float-left w-28 text-[10px] uppercase text-[#3E6AF2] leading-[11px] flex-shrink-0 whitespace-nowrap mt-1 font-[lato]',
              },

              {
                type: 'group',

                className: 'ml-28 flex flex-col gap-[4px] flex-1',

                items: [
                  {
                    path: 'title',

                    fallback: 'Project Title',

                    className: 'text-[13px] font-bold text-black leading-[18px] tracking-[0.1px]    font-[lato]',
                  },

                  {
                    type: 'html',

                    path: 'description',

                    breakable: true,

                    className:
                      'text-[13px] text-[#4D4D4D] leading-[16px] [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-[2px]    font-[lato]',
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
          'flex-row items-center w-full gap-3 text-base font-bold leading-[20px] tracking-[-0.3px] text-black    font-[lato] after:content-[""] after:flex-1 after:border-b-2 after:border-black after:opacity-[0.05] mt-0',
      },

      listPath: 'skills.items',

      itemPath: 'name',

      containerClassName: 'flex flex-wrap gap-x-4 gap-y-1 ml-28 mt-1',

      badgeClassName:
        'flex items-center gap-2 text-[13px] font-bold tracking-[0.1px] text-black    font-[lato] before:content-[""] before:w-[7.8px] before:h-[7.8px] before:rounded-full before:border-[2px] before:border-[#3E6AF2]',
    },

    {
      id: 'certifications',

      type: 'list-section',

      break: true,

      breakable: true,

      heading: {
        path: 'certifications.heading',

        fallback: 'Certifications',

        className:
          'flex-row items-center gap-3 w-full text-base font-bold leading-[20px] tracking-[-0.3px] text-black    font-[lato] after:content-[""] after:flex-1 after:border-b-2 after:border-black after:opacity-[0.05] mt-0  ',
      },

      listPath: 'certifications.items',

      containerClassName: 'flex flex-col gap-3 mt-1',

      itemTemplate: {
        className: 'flex flex-col gap-2',

        rows: [
          {
            className: 'block w-full',

            cells: [
              {
                type: 'duration',

                path: 'duration',

                className:
                  'float-left w-28 text-[10px] uppercase text-[#3E6AF2] leading-[11px] flex-shrink-0 whitespace-nowrap mt-1 font-[lato]',
              },

              {
                type: 'group',

                className: 'ml-28 flex flex-col gap-[2px]',

                items: [
                  {
                    path: 'title',

                    fallback: 'Certification Title',

                    className: 'text-[13px] font-bold text-black leading-[18px] tracking-[0.1px]    font-[lato]',
                  },

                  {
                    path: 'issuer',

                    fallback: 'Issuer',

                    className: 'text-[13px] font-normal text-black leading-[18px]    font-[lato]',
                  },
                ],
              },
            ],
          },
        ],
      },
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
          'flex-row items-center w-full gap-3 text-base font-bold leading-[20px] tracking-[-0.3px] text-black    font-[lato] after:content-[""] after:flex-1 after:border-b-2 after:border-black after:opacity-[0.05] mt-0',
      },

      listPath: 'interests.items[0].items',

      itemPath: '',

      containerClassName: 'flex flex-wrap gap-x-4 gap-y-1 ml-28 mt-1',

      badgeClassName:
        'flex items-center gap-2 text-[13px] font-bold tracking-[0.1px] text-black    font-[lato] before:content-[""] before:w-[7.8px] before:h-[7.8px] before:rounded-full before:border-[2px] before:border-[#3E6AF2]',
    },
  ],
};
