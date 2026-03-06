export const mohsinaTemplate8 = {
  name: 'Mohsina Template 8',
  page: {
    background: '#ffffff',
    className: 'text-neutral-900 leading-relaxed',
    fontFamily: 'Lato , Poppins',
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
                  type: 'image',
                  path: 'personalDetails.items[0].profilePicturePublicUrl',
                  fallback: '/images/profileimg.jpeg',
                  className: 'w-22 h-22 rounded-full object-cover',
                  alt: 'Profile image',
                },

                {
                  type: 'group',
                  className: 'flex flex-col items-stretch gap-5',
                  items: [
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].fullName',
                      fallback: 'AMAN GUPTA',
                      className: 'text-5xl  font-medium tracking-[-0.3px] text-[#3E6AF2] uppercase',
                    },
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].jobTitle',
                      fallback: 'UX-DESIGNER',
                      className: 'text-2xl  font-normal uppercase text-black',
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
                  type: 'group',
                  className: 'flex gap-1',
                  items: [
                    {
                      type: 'text',
                      fallback: 'Email:',
                      className: 'text-[10px] text-gray-500',
                    },
                    {
                      type: 'link',
                      path: 'personalDetails.items[0].email',
                      href: 'mailto:{{value}}',
                      fallback: 'amanguppta@gmail.com',
                      className: 'text-[10px] text-black',
                    },
                  ],
                },

                {
                  type: 'group',
                  className: 'flex gap-1',
                  items: [
                    {
                      type: 'text',
                      fallback: 'Location:',
                      className: 'text-[10px] text-gray-500',
                    },
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].location',
                      fallback: 'Gurugram, Haryana',
                      className: 'text-[10px] text-black',
                    },
                  ],
                },

                {
                  type: 'group',
                  className: 'flex gap-1',
                  items: [
                    {
                      type: 'text',
                      fallback: 'LinkedIn:',
                      className: 'text-[10px] text-gray-500',
                    },
                    {
                      type: 'link',
                      path: 'personalDetails.items[0].links.linkedin.title',
                      href: 'personalDetails.items[0].links.linkedin.link',
                      fallback: 'Portfolio / linkedin',
                      className: 'text-[10px] text-black',
                    },
                  ],
                },

                {
                  type: 'group',
                  className: 'flex gap-1',
                  items: [
                    {
                      type: 'text',
                      fallback: 'Phone:',
                      className: 'text-[10px] text-gray-500',
                    },
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].phone',
                      fallback: '(914) 479-6342',
                      className: 'text-[10px] text-black',
                    },
                  ],
                },

                {
                  type: 'group',
                  className: 'flex gap-1',
                  items: [
                    {
                      type: 'text',
                      fallback: 'Website:',
                      className: 'text-[10px] text-gray-500',
                    },
                    {
                      type: 'link',
                      path: 'personalDetails.items[0].links.website.title',
                      href: 'personalDetails.items[0].links.website.link',
                      fallback: 'Portfolio',
                      className: 'text-[10px] text-black',
                    },
                  ],
                },

                {
                  type: 'group',
                  className: 'flex gap-1',
                  items: [
                    {
                      type: 'text',
                      fallback: 'Github:',
                      className: 'text-[10px] text-gray-500',
                    },
                    {
                      type: 'link',
                      path: 'personalDetails.items[0].links.github.title',
                      href: 'personalDetails.items[0].links.github.link',
                      fallback: 'Github',
                      className: 'text-[10px] text-black',
                    },
                  ],
                },

                {
                  type: 'group',
                  className: 'flex gap-1',
                  items: [
                    {
                      type: 'text',
                      fallback: 'Behance:',
                      className: 'text-[10px] text-gray-500',
                    },
                    {
                      type: 'link',
                      path: 'personalDetails.items[0].links.behance.title',
                      href: 'personalDetails.items[0].links.behance.link',
                      fallback: 'Behance',
                      className: 'text-[10px] text-black',
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
          'block float-left w-[140px] text-[#005FF2] font-[Inter] text-sm font-bold tracking-[1px] uppercase whitespace-nowrap mt-1',
      },

      content: {
        type: 'html',
        path: 'personalDetails.items[0].description',
        fallback: 'Versatile Full-Stack Software Engineer with 6+ years of hands-on experience...',
        className: 'ml-[160px] text-[13px] text-black-700 leading-[18px] font-[Inter]',
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
          'block float-left w-[140px] text-[#005FF2] font-[Inter] text-sm font-bold tracking-[1px] uppercase whitespace-nowrap ',
      },

      listPath: 'experience.items',

      containerClassName: 'ml-[160px] flex flex-col gap-2',

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
                    className: 'text-sm font-bold text-[#101214] leading-[13px]',
                  },
                  {
                    path: 'company',
                    prefix: ', ',
                    className: 'text-sm font-bold text-[#101214] leading-[13px]',
                  },
                ],
              },

              {
                type: 'duration',
                path: 'duration',
                className: 'text-sm text-[#6B6B6B] leading-[13px] whitespace-nowrap flex-shrink-0',
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
                className: 'text-sm text-[#6B6B6B] leading-[18px] [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-[2px]',
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
          'block float-left w-[140px] text-[#005FF2] font-[Inter] text-sm font-bold tracking-[1px] uppercase whitespace-nowrap ',
      },

      listPath: 'education.items',

      containerClassName: 'ml-[160px] flex flex-col gap-0 mt-4',

      itemTemplate: {
        className: 'flex flex-col',

        rows: [
          {
            className: 'flex justify-between items-center w-full ',
            cells: [
              {
                type: 'group',
                className: 'flex items-center gap-1',
                items: [
                  {
                    path: 'degree',
                    className: 'text-sm font-bold text-[#101214] leading-[13px]',
                  },
                  {
                    path: 'grade.value',
                    prefix: ', ',
                    className: 'text-sm font-bold text-[#005FF2] leading-[13px]',
                  },
                ],
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-sm text-[#6B6B6B] leading-[13px] whitespace-nowrap flex-shrink-0',
              },
            ],
          },
          {
            className: 'mt-2',
            cells: [
              {
                path: 'institution',
                className: 'text-sm text-[#6B6B6B] leading-[18px]',
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
          'block float-left w-[140px] text-[#005FF2] font-[Inter] text-sm font-bold tracking-[1px] uppercase whitespace-nowrap mt-1',
      },

      listPath: 'projects.items',

      containerClassName: 'ml-[160px] flex flex-col gap-2 mt-4',

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
          'block float-left w-[140px] text-[#005FF2] font-[Inter] text-sm font-bold tracking-[1px] uppercase whitespace-nowrap mt-1',
      },

      listPath: 'achievements.items[0].items',
      itemPath: '',
      itemPrefix: '• ',

      containerClassName: 'ml-[160px] flex flex-col gap-2 mt-4',

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
          'block float-left w-[140px] text-[#005FF2] font-[Inter] text-sm font-bold tracking-[1px] uppercase whitespace-nowrap ',
      },

      listPath: 'certifications.items',

      containerClassName: 'ml-[160px] flex flex-col gap-2 mt-4',

      itemTemplate: {
        className: 'flex flex-col',

        rows: [
          {
            className: 'flex justify-between items-center w-full',
            cells: [
              {
                path: 'title',
                className: 'text-sm font-bold text-[#101214] leading-[13px]',
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
          'block float-left w-[140px] text-[#005FF2] font-[Inter] text-sm font-bold tracking-[1px] uppercase whitespace-nowrap mt-1',
      },

      listPath: 'skills.items',
      itemPath: 'name',

      itemSeparator: ' | ',

      containerClassName: 'ml-[160px] flex flex-row flex-wrap mt-4',

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
          'block float-left w-[140px] text-[#005FF2] font-[Inter] text-sm font-bold tracking-[1px] uppercase whitespace-nowrap mt-1',
      },

      listPath: 'interests.items[0].items',
      itemPath: '',

      itemSeparator: ' | ',

      containerClassName: 'ml-[160px] flex flex-row flex-wrap mt-4',

      badgeClassName: 'text-xs font-bold text-black tracking-[0.2px] ml-2',
    },
  ],
};
