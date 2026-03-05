export const mohsinaTemplate10 = {
  name: 'Mohsina Template 10',
  page: {
    background: '#ffffff',
    className: 'text-neutral-900 leading-relaxed',
    fontFamily: 'Poppins',
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
                  className: 'w-20 h-20 rounded-full object-cover',
                  alt: 'Profile image',
                },

                {
                  type: 'group',
                  className: 'flex flex-col items-stretch ',
                  items: [
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].fullName',
                      fallback: 'AMAN GUPTA',
                      className: 'text-[30px] uppercase  font-normal tracking-[3px] text-black',
                    },
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].jobTitle',
                      fallback: 'UX-DESIGNER',
                      className: 'text-xs tracking-[1px] font-normal uppercase text-gray-500',
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
                      className: ' text-[#005FF2]',
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
                      className: ' text-[#005FF2]',
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
                      className: ' text-[#005FF2]',
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
                      className: ' text-[#005FF2]',
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
                      className: ' text-[#005FF2]',
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
                      className: ' text-[#005FF2]',
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
                  type: 'group',
                  className: 'flex gap-1',
                  items: [
                    {
                      type: 'text',
                      fallback: 'Behance:',
                      className: 'text-[9px] text-[#005FF2]',
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
        className:
          'block float-left w-32 text-[#005FF2] font-[Inter] text-[10px] font-normal  uppercase whitespace-nowrap',
      },

      content: {
        type: 'html',
        path: 'personalDetails.items[0].description',
        fallback: 'Versatile Full-Stack Software Engineer with 6+ years of hands-on experience...',
        className: 'overflow-hidden text-[9px] text-gray-500 leading-[14px] font-[Inter]',
      },
    },
    {
      id: 'education',
      type: 'list-section',

      heading: {
        path: 'education.heading',
        fallback: 'Education',
        className:
          'block float-left w-32 text-[#005FF2] font-[Inter] text-[10px] font-bold tracking-[1px] uppercase whitespace-nowrap mt-2',
      },

      listPath: 'education.items',

      containerClassName: 'overflow-hidden flex flex-col gap-0 mb-2',

      itemTemplate: {
        className: 'flex flex-col',

        rows: [
          {
            cells: [
              {
                path: 'title',
                className: 'text-[10px] font-bold text-black leading-[13px] mt-2',
              },
            ],
          },
          {
            cells: [
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[9px] text-gray-500 leading-[13px]',
              },
            ],
          },
          {
            cells: [
              {
                path: 'issuer',
                className: 'text-[9px] text-gray-500 leading-[14px]',
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
        className:
          'block float-left w-32 text-[#005FF2] font-[Inter] text-[10px] font-bold tracking-[1px] uppercase whitespace-nowrap',
      },

      listPath: 'experience.items',

      containerClassName: 'overflow-hidden flex flex-col gap-2 mb-2',

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
                    className: 'text-[10px] font-bold text-black leading-[13px]',
                  },
                  {
                    path: 'company',
                    prefix: ', ',
                    className: 'text-[10px] font-bold text-black leading-[13px]',
                  },
                ],
              },
            ],
          },
          {
            className: '',
            cells: [
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[9px] text-gray-500 leading-[13px]',
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
                className: 'text-[9px] text-gray-500 leading-[14px] [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-[2px]',
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
          'block float-left w-32 text-[#005FF2] font-[Inter] text-[10px] font-bold tracking-[1px] uppercase whitespace-nowrap',
      },

      listPath: 'projects.items',

      containerClassName: 'overflow-hidden flex flex-col gap-2 mb-2',

      itemTemplate: {
        className: 'flex flex-col',

        rows: [
          {
            className: 'flex items-start w-full',
            cells: [
              {
                path: 'title',
                fallback: 'Project Title',
                className: 'text-[10px] font-bold text-black leading-[13px]',
              },
            ],
          },
          {
            className: '',
            cells: [
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[9px] text-gray-500 leading-[13px]',
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
                className: 'text-[9px] text-gray-500 leading-[14px] [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-[2px]',
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
          'block float-left w-32 text-[#005FF2] font-[Inter] text-[10px] font-bold tracking-[1px] uppercase whitespace-nowrap',
      },

      listPath: 'achievements.items[0].items',
      itemPath: '',
      itemPrefix: '• ',

      containerClassName: 'overflow-hidden flex flex-col gap-2',

      badgeClassName: 'block text-[9px] text-gray-500 leading-[14px] whitespace-pre-wrap',
    },
    {
      id: 'certifications',
      type: 'list-section',

      heading: {
        path: 'certifications.heading',
        fallback: 'Certifications',
        className:
          'block float-left w-32 text-[#005FF2] font-[Inter] text-[10px] font-bold tracking-[1px] uppercase whitespace-nowrap mt-2',
      },

      listPath: 'certifications.items',

      containerClassName: 'overflow-hidden flex flex-col gap-2 mb-2',

      itemTemplate: {
        className: 'flex flex-col',

        rows: [
          {
            className: 'flex justify-between items-center w-full mt-2',
            cells: [
              {
                path: 'title',
                className: 'text-[10px] font-bold text-black leading-[13px]',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[9px] text-gray-500 leading-[13px] whitespace-nowrap flex-shrink-0 ml-2',
              },
            ],
          },
          {
            className: '',
            cells: [
              {
                path: 'issuer',
                className: 'text-[9px] text-gray-500 leading-[14px]',
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
          'block float-left w-[123px] text-[#005FF2] font-[Inter] text-[10px] font-bold tracking-[1px] uppercase whitespace-nowrap',
      },

      listPath: 'skills.items',
      itemPath: 'name',

      itemSeparator: ' | ',

      containerClassName: 'overflow-hidden flex flex-row flex-wrap',

      badgeClassName: 'text-[10px] font-bold text-black tracking-[0.2px] ml-2',
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
          'block float-left w-[123px] text-[#005FF2] font-[Inter] text-[10px] font-bold tracking-[1px] uppercase whitespace-nowrap',
      },

      listPath: 'interests.items[0].items',
      itemPath: '',

      itemSeparator: ' | ',

      containerClassName: 'overflow-hidden flex flex-row flex-wrap',

      badgeClassName: 'text-[10px] font-bold text-black tracking-[0.2px] ml-2',
    },
  ],
};
