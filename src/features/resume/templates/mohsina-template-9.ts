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
                  className: 'flex flex-col items-stretch gap-4',
                  items: [
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].jobTitle',
                      fallback: 'UX-DESIGNER',
                      className: 'text-base leading-[11px] font-normal uppercase text-gray-500 tracking-[1px]',
                    },
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].fullName',
                      fallback: 'AMAN GUPTA',
                      className: 'text-3xl leading-[15px] font-semibold tracking-[-0.3px] text-[#3E6AF2]',
                    },
                  ],
                },
              ],
            },

            {
              type: 'group',
              className: 'flex flex-col items-start gap-[2px] mb-2',
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
                      className: 'text-[13px] text-black',
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
                      path: 'personalDetails.items[0].location',
                      fallback: 'Gurugram, Haryana',
                      className: 'text-[13px] text-black',
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
                      className: 'text-[13px] text-black',
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
                      className: 'text-[13px] text-black',
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
                      className: 'text-[13px] text-black',
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
                      className: 'text-[13px] text-black',
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
                      className: 'text-[13px] text-black',
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
        className: 'block float-left w-[140px] text-black text-md font-bold whitespace-nowrap mt-1',
      },

      content: {
        type: 'html',
        path: 'personalDetails.items[0].description',
        fallback: 'Versatile Full-Stack Software Engineer with 6+ years of hands-on experience...',
        className: 'ml-[160px] text-[13px] text-[#4d4d4d] leading-[20px] mb-4',
      },
    },
    {
      id: 'education',
      type: 'list-section',

      heading: {
        path: 'education.heading',
        fallback: 'Education',
        className: 'block float-left w-[140px] text-black text-md font-bold  whitespace-nowrap mt-1',
      },

      listPath: 'education.items',

      containerClassName: 'ml-[160px] flex flex-col gap-2 mb-4',

      itemTemplate: {
        className: 'flex flex-col ',

        rows: [
          {
            className: 'flex justify-between items-center w-full gap1 mt-1',
            cells: [
              {
                type: 'group',
                className: 'flex items-center gap-1',
                items: [
                  {
                    path: 'degree',
                    className: 'text-base font-bold text-[#101214] leading-[13px]',
                  },
                  {
                    path: 'grade.value',
                    prefix: ', ',
                    className: 'text-base font-bold text-[#005FF2] leading-[13px]',
                  },
                ],
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[10px] text-[#3E6AF2] leading-[13px] whitespace-nowrap flex-shrink-0',
              },
            ],
          },
          {
            className: '',
            cells: [
              {
                path: 'institution',
                className: 'text-[13px] text-[#4d4d4d] leading-[14px]',
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
        className: 'block float-left w-[140px] text-black text-md font-bold whitespace-nowrap ',
      },

      listPath: 'experience.items',

      containerClassName: 'ml-[160px] flex flex-col gap-2 mb-4',

      itemTemplate: {
        className: 'flex flex-col',

        rows: [
          {
            className: 'flex justify-between items-start w-full ',
            cells: [
              {
                type: 'group',
                className: 'flex flex-wrap gap-1 mt-1',
                items: [
                  {
                    path: 'position',
                    className: 'text-base font-bold text-[#101214] leading-[13px]',
                  },
                  {
                    path: 'company',
                    prefix: ', ',
                    className: 'text-base font-bold text-[#101214] leading-[13px]',
                  },
                ],
              },

              {
                type: 'duration',
                path: 'duration',
                className: 'text-[10px] text-[#3E6AF2] leading-[13px] whitespace-nowrap flex-shrink-0',
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
                className: 'text-[13px] text-[#4d4d4d] leading-[20px] [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-[2px]',
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
        className: 'block float-left w-[140px] text-black text-md font-bold  whitespace-nowrap',
      },

      listPath: 'projects.items',

      containerClassName: 'ml-[160px] flex flex-col gap-3 mb-4',

      itemTemplate: {
        className: 'flex flex-col',

        rows: [
          {
            className: 'flex justify-between items-start w-full',
            cells: [
              {
                path: 'title',
                fallback: 'Project Title',
                className: 'text-base font-bold text-[#101214] leading-[13px]',
              },

              {
                type: 'duration',
                path: 'duration',
                className: 'text-[10px] text-[#3E6AF2] leading-[13px] whitespace-nowrap flex-shrink-0',
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
                className: 'text-[13px] text-[#4d4d4d] leading-[20px] [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-[2px]',
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
        className: 'block float-left w-[140px] text-black text-md font-bold  whitespace-nowrap ',
      },

      listPath: 'achievements.items[0].items',
      itemPath: '',
      itemPrefix: '• ',

      containerClassName: 'ml-[160px] flex flex-col gap-1 mb-4',

      badgeClassName: 'block text-[13px] text-[#4d4d4d] leading-[20px] whitespace-pre-wrap',
    },
    {
      id: 'certifications',
      type: 'list-section',

      heading: {
        path: 'certifications.heading',
        fallback: 'Certifications',
        className: 'block float-left w-[140px] text-black text-md font-bold  whitespace-nowrap ',
      },

      listPath: 'certifications.items',

      containerClassName: 'ml-[160px] flex flex-col gap-3 mb-4',

      itemTemplate: {
        className: 'flex flex-col',

        rows: [
          {
            className: 'flex justify-between items-center w-full',
            cells: [
              {
                path: 'title',
                className: 'text-base font-bold text-[#101214] leading-[13px]',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[10px] text-[#3E6AF2] leading-[13px] whitespace-nowrap flex-shrink-0',
              },
            ],
          },
          {
            cells: [
              {
                path: 'issuer',
                className: 'text-[13px] text-[#4d4d4d] leading-[20px]',
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
        className: 'block float-left w-[140px] text-black text-md font-bold whitespace-nowrap ',
      },

      listPath: 'skills.items',
      itemPath: 'name',

      containerClassName: 'ml-[160px] flex flex-row flex-wrap gap-[10px] mb-4',

      badgeClassName:
        'text-[12px] font-semibold text-white leading-[18px] bg-[#005FF2] px-[5px] py-[2px] font-[Poppins] flex items-center',
    },
    {
      id: 'interests',
      type: 'badge-section',

      break: true,
      breakable: true,

      heading: {
        path: 'interests.heading',
        fallback: 'Interests',
        className: 'block float-left w-[140px] text-black text-md font-bold whitespace-nowrap ',
      },

      listPath: 'interests.items[0].items',
      itemPath: '',

      containerClassName: 'ml-[160px] flex flex-row flex-wrap gap-x-4 gap-y-1 mb-4',

      badgeClassName:
        'flex items-center gap-[6px] text-[13px] font-bold text-black tracking-[0.2px] before:content-[""] before:w-[4px] before:h-[4px] before:rounded-full before:bg-[#005FF2]',
    },
  ],
};
