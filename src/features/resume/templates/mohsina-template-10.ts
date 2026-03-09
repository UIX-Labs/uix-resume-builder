export const mohsinaTemplate10 = {
  name: 'Mohsina Template 10',
  page: {
    background: '#ffffff',
    className: 'text-[#4d4d4d] leading-relaxed',
    fontFamily: 'Inter, Poppins',
  },

  sections: [
    {
      //HEADER SECTION
      id: 'header',
      type: 'banner',
      className: 'flex flex-col justify-center  px-8 py-4',
      fields: {
        container: {
          type: 'group',
          className: 'flex flex-row justify-between items-center w-full -ml-5',
          items: [
            {
              type: 'group',
              className: 'flex items-center  ',
              items: [
                {
                  type: 'image',
                  path: 'personalDetails.items[0].profilePicturePublicUrl',
                  condition: 'personalDetails.items[0].profilePicturePublicUrl',
                  className: 'w-[100px] h-[100px] rounded-full object-cover -ml-2',
                  alt: 'Profile image',
                },

                {
                  type: 'group',
                  className: 'flex flex-col items-stretch gap-[4px] ',
                  items: [
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].fullName',
                      fallback: 'AMAN GUPTA',
                      className: 'text-[36px] uppercase  font-medium font-poppins text-black',
                    },
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].jobTitle',
                      fallback: 'UX-DESIGNER',
                      className: 'text-[13px] tracking-[2px] font-normal uppercase text-gray-500 -mt-2',
                    },
                  ],
                },
              ],
            },

            {
              type: 'group',
              className: 'flex flex-col items-start gap-1 mb-2 -mr-10',
              items: [
                {
                  type: 'inline-group-with-icon',
                  className: 'flex gap-1',
                  items: [
                    {
                      type: 'icon',
                      name: 'Mail',
                      size: 12,
                      className: ' text-[#005FF2]',
                    },
                    {
                      type: 'link',
                      path: 'personalDetails.items[0].email',
                      href: 'mailto:{{value}}',
                      fallback: 'amanguppta@gmail.com',
                      className: 'text-xs text-black',
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
                      size: 12,
                      className: ' text-[#005FF2]',
                    },
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].location',
                      fallback: 'Gurugram, Haryana',
                      className: 'text-xs text-black',
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
                      size: 12,
                      className: ' text-[#005FF2]',
                    },

                    {
                      type: 'link',
                      path: 'personalDetails.items[0].links.linkedin.title',
                      href: 'personalDetails.items[0].links.linkedin.link',
                      fallback: 'Portfolio / linkedin',
                      className: 'text-xs text-black',
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
                      size: 12,
                      className: ' text-[#005FF2]',
                    },
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].phone',
                      fallback: '(914) 479-6342',
                      className: 'text-xs text-black',
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
                      size: 12,
                      className: ' text-[#005FF2]',
                    },
                    {
                      type: 'link',
                      path: 'personalDetails.items[0].links.website.title',
                      href: 'personalDetails.items[0].links.website.link',
                      fallback: 'Portfolio',
                      className: 'text-xs text-black',
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
                      size: 12,
                      className: ' text-[#005FF2]',
                    },

                    {
                      type: 'link',
                      path: 'personalDetails.items[0].links.github.title',
                      href: 'personalDetails.items[0].links.github.link',
                      fallback: 'Github',
                      className: 'text-xs text-black',
                    },
                  ],
                },

                {
                  type: 'inline-group-with-icon',
                  className: 'flex gap-1',
                  items: [
                    {
                      type: 'icon',
                      name: 'Palette',
                      size: 12,
                      className: 'text-[9px] text-[#005FF2]',
                    },
                    {
                      type: 'link',
                      path: 'personalDetails.items[0].links.behance.title',
                      href: 'personalDetails.items[0].links.behance.link',
                      fallback: 'Behance',
                      className: 'text-xs text-black',
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
        className:
          'block float-left w-32 text-[#005FF2] font-poppins text-[13px] tracking-[1px] font-semibold uppercase whitespace-nowrap',
      },

      content: {
        type: 'html',
        path: 'personalDetails.items[0].description',
        fallback: 'Versatile Full-Stack Software Engineer with 6+ years of hands-on experience...',
        className: 'ml-35 text-[13px] text-gray-500 leading-[18px] font-[Inter] mb-4',
      },
    },
    {
      id: 'experience',
      type: 'list-section',
      heading: {
        path: 'experience.heading',
        fallback: 'Experience',
        className:
          'block float-left w-32 text-[#005FF2] font-poppins text-[13px] font-semibold tracking-[1px] uppercase whitespace-nowrap',
      },

      listPath: 'experience.items',

      containerClassName: 'ml-35 flex flex-col gap-2 mb-4',

      itemTemplate: {
        className: 'flex flex-col',

        rows: [
          {
            className: 'flex items-start w-full',
            cells: [
              {
                type: 'group',
                className: 'flex flex-wrap gap-1',
                items: [
                  {
                    path: 'position',
                    className: 'text-sm font-semibold font-[Inter] text-black leading-[13px]',
                  },
                  {
                    path: 'company',
                    prefix: ', ',
                    className: 'text-sm font-semibold font-[Inter] text-black leading-[13px]',
                  },
                ],
              },
            ],
          },
          {
            className: '-mt-[2px]',
            cells: [
              {
                type: 'duration',
                path: 'duration',
                className: 'text-xs text-black font-normal leading-[13px]',
              },
            ],
          },

          {
            className: '',
            cells: [
              {
                type: 'html',
                path: 'description',
                breakable: true,
                className: 'text-[13px] text-gray-500 leading-[18px] [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-[2px]',
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
        className:
          'block float-left w-32 text-[#005FF2] font-poppins text-[13px] font-semibold tracking-[1px] uppercase whitespace-nowrap',
      },

      listPath: 'projects.items',

      containerClassName: 'ml-35 flex flex-col gap-2 mb-4',

      itemTemplate: {
        className: 'flex flex-col',

        rows: [
          {
            className: 'flex items-start w-full',
            cells: [
              {
                path: 'title',
                fallback: 'Project Title',
                className: 'text-sm font-semibold font-[Inter] text-black leading-[13px]',
              },
            ],
          },
          {
            className: '-mt-[2px]',
            cells: [
              {
                type: 'duration',
                path: 'duration',
                className: 'text-xs text-black font-normal leading-[13px]',
              },
            ],
          },

          {
            className: '',
            cells: [
              {
                type: 'html',
                path: 'description',
                breakable: true,
                className: 'text-[13px] text-gray-500 leading-[18px] [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-[2px]',
              },
            ],
          },
        ],
      },
    },
    {
      id: 'education',
      type: 'list-section',

      heading: {
        path: 'education.heading',
        fallback: 'Education',
        className:
          'block float-left w-32 text-[#005FF2] font-poppins text-[13px] font-semibold tracking-[1px] uppercase whitespace-nowrap',
      },

      listPath: 'education.items',

      containerClassName: 'ml-35 flex flex-col mb-4',

      itemTemplate: {
        className: 'flex flex-col ',

        rows: [
          {
            cells: [
              {
                path: 'degree',
                className: 'text-sm font-semibold font-[Inter] text-black leading-[13px]',
              },
            ],
          },
          {
            className: '-mt-1',
            cells: [
              {
                type: 'duration',
                path: 'duration',
                className: 'text-xs text-black leading-[13px] ',
              },
            ],
          },
          {
            className: '-mt-1',
            cells: [
              {
                path: 'institution',
                className: 'text-xs text-gray-500 leading-[14px] -mt-1',
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
          'block float-left w-32 text-[#005FF2] font-poppins text-[13px] font-semibold tracking-[1px] uppercase whitespace-nowrap',
      },

      listPath: 'skills.items',
      itemPath: 'name',

      itemSeparator: ' | ',

      containerClassName: 'ml-35 flex flex-row flex-wrap mb-4',

      badgeClassName: 'text-xs font-normal font-[Inter] text-black tracking-[0.2px] ml-2',
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
          'block float-left w-32 text-[#005FF2] font-poppins text-[13px] font-semibold tracking-[1px] uppercase whitespace-nowrap',
      },

      listPath: 'achievements.items[0].items',
      itemPath: '',
      itemPrefix: '• ',

      containerClassName: 'ml-35 flex flex-col gap-1 mb-4',

      badgeClassName: 'block text-[13px] text-gray-500 leading-[18px] whitespace-pre-wrap',
    },
    {
      id: 'certifications',
      type: 'list-section',

      heading: {
        path: 'certifications.heading',
        fallback: 'Certifications',
        className:
          'block float-left w-32 text-[#005FF2] font-poppins text-[13px] font-semibold tracking-[1px] uppercase whitespace-nowrap',
      },

      listPath: 'certifications.items',

      containerClassName: 'ml-37 flex flex-col gap-2 mb-4',

      itemTemplate: {
        className: 'flex flex-col',

        rows: [
          {
            className: 'flex justify-between items-center w-full',
            cells: [
              {
                path: 'title',
                className: 'text-sm font-semibold font-[Inter] text-black leading-[13px]',
              },
            ],
          },
          {
            className: 'mt-2',
            cells: [
              {
                type: 'group',
                className: 'flex items-center gap-1',
                items: [
                  {
                    path: 'issuer',
                    className: 'text-[12px] text-gray-500 leading-[14px]',
                  },
                  {
                    type: 'text',
                    fallback: ', ',
                    className: 'text-[12px] text-gray-500 leading-[14px] mr-1',
                  },
                  {
                    type: 'duration',
                    path: 'duration',
                    className: 'text-[12px] text-gray-500 leading-[14px]',
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
          'block float-left w-32 text-[#005FF2] font-poppins text-[13px] font-semibold tracking-[1px] uppercase whitespace-nowrap',
      },

      listPath: 'interests.items[0].items',
      itemPath: '',

      itemSeparator: ' | ',

      containerClassName: 'ml-35 flex flex-row flex-wrap mb-4',

      badgeClassName: 'text-xs font-normal font-[Inter] text-black tracking-[0.2px] ml-2',
    },
  ],
};
