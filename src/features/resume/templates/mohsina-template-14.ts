// Flattened template structure with standard two-column layout

const mohsinaTemplate14 = {
  name: 'Divyam Modern Professional',

  page: {
    background: '#ffffff',
    className: 'text-neutral-900 leading-relaxed bg-[linear-gradient(to_right,#AD5B24_300px,white_300px)]',
    padding: 0,
    fontFamily: 'Poppins',
  },

  columns: {
    spacing: '0px',
    left: {
      width: '300px',
      className: 'text-white pt-[45px] pb-10 px-4 flex flex-col gap-4',
    },
    right: {
      width: 'calc(100% - 300px)',
      className: 'p-10 flex flex-col gap-4',
    },
  },

  sections: [
    {
      id: 'header',
      type: 'header',
      column: 'left',
      className: 'flex flex-col items-center text-center gap-3 mb-4',
      fields: {
        image: {
          type: 'image',
          path: 'personalDetails.items[0].profilePicturePublicUrl',
          className: 'w-[200px] h-[200px] object-cover rounded-full mb-2 border-2 border-white/20',
          alt: 'Profile image',
        },
        name: {
          path: 'personalDetails.items[0].fullName',
          fallback: 'Divyam Malik',
          className: 'text-[28px] break-words font-semibold text-white leading-tight w-full max-w-full px-2',
        },
        title: {
          path: 'personalDetails.items[0].jobTitle',
          fallback: 'Technical Lead, Sopra Steria',
          className: 'text-[16px] font-normal text-white opacity-90 -mt-2 w-full break-words max-w-full px-2',
        },
      },
    },

    // Contact Information - Left Column
    {
      id: 'contact',
      type: 'header',
      column: 'left',
      className: 'flex flex-col gap-4',
      fields: {
        contact: {
          type: 'contact-grid',
          className: 'flex flex-col gap-4',
          items: [
            // Socials
            {
              type: 'inline-group',
              className:
                'bg-white rounded-sm py-[5.32px] px-[10.64px] flex justify-center items-center self-stretch text-center',
              items: [
                {
                  type: 'inline-group',
                  className: 'flex gap-2 items-baseline',
                  items: [
                    {
                      type: 'inline-group',
                      className:
                        'flex flex-wrap justify-center gap-1 items-center text-sm font-normal text-black leading-[20px] font-poppins underline decoration-1 underline-offset-2 break-words',
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
            // Phone
            {
              type: 'inline-group',
              className:
                'bg-white rounded-sm py-[5.32px] px-[10.64px] flex justify-center items-center gap-[13.3px] self-stretch text-center',
              items: [
                {
                  path: 'personalDetails.items[0].phone',
                  fallback: '+918527886118',
                  className: 'text-[14px] text-black font-normal break-all w-full text-center',
                },
              ],
            },
            // Email
            {
              type: 'inline-group',
              className:
                'bg-white rounded-sm py-[5.32px] px-[10.64px] flex justify-center items-center gap-[13.3px] self-stretch text-center',
              items: [
                {
                  type: 'link',
                  path: 'personalDetails.items[0].email',
                  href: 'mailto:{{value}}',
                  fallback: 'divyam.malik@gmail.com',
                  className: 'text-sm text-black font-normal break-all',
                },
              ],
            },
            // Address
            {
              type: 'inline-group',
              className:
                'bg-white rounded-sm py-[5.32px] px-[10.64px] flex justify-center items-center gap-[13.3px] self-stretch text-center',
              items: [
                {
                  path: 'personalDetails.items[0].address',
                  fallback: 'Noida',
                  className: 'text-[14px] text-black font-normal break-all w-full text-center',
                },
              ],
            },
          ],
        },
      },
    },

    // Skills Section - Left Column
    {
      id: 'skills',
      type: 'badge-section',
      column: 'left',
      break: true,
      breakable: true,
      className: '',

      heading: {
        path: 'skills.heading',
        fallback: 'Skills',
        className: 'text-[18px] font-semibold text-white font-poppins',
      },

      listPath: 'skills.items',

      itemPath: 'name',
      itemPrefix: '• ',
      containerClassName: 'flex flex-col gap-1 text-white leading-tight mt-2',
      badgeClassName: 'text-sm text-white leading-relaxed',
    },

    // Certifications Section - Left Column
    {
      id: 'certifications',
      type: 'list-section',
      column: 'left',
      break: true,
      className: '',
      heading: {
        path: 'certifications.heading',
        fallback: 'Certifications',
        className: 'capitalize text-[18px] font-semibold text-white mb-2',
      },
      listPath: 'certifications.items',
      containerClassName: 'flex flex-col gap-3 mt-2',
      itemTemplate: {
        className: 'flex flex-col',
        break: true,
        rows: [
          {
            className: 'flex flex-row items-start gap-6',
            cells: [
              {
                path: 'title',
                fallback: 'Certification Title',
                className: 'text-sm font-normal text-white w-[180px] break-words',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-xs text-white/80 w-[150px] shrink-0 ml-6  pt-0.5',
              },
            ],
          },
        ],
      },
    },

    // Interests Section - Left Column
    {
      id: 'interests',
      type: 'badge-section',
      column: 'left',
      break: true,
      breakable: true,
      className: '',

      heading: {
        path: 'interests.heading',
        fallback: 'Interests',
        className: ' text-[18px] font-bold text-white',
      },

      listPath: 'interests.items[0].items',

      // Bullet list flow
      itemPath: '',
      itemPrefix: '• ',
      containerClassName: 'flex flex-col gap-1 mt-2 text-white leading-tight',
      badgeClassName: 'text-sm text-white  leading-none',
    },
    {
      id: 'summary',
      type: 'content-section',
      column: 'right',

      className: '',

      heading: {
        path: 'summary.heading',
        fallback: 'Profile',
        className: 'text-[#AD5B24] font-poppins text-base font-semibold whitespace-nowrap',
      },
      divider: {
        variant: 'line',
        className: 'bg-[#AD5B24] w-[42.56px] h-[2.66px] rounded-[5.32px] mt-1 mb-2',
      },

      content: {
        type: 'html',
        path: 'personalDetails.items[0].description',
        fallback: 'Versatile Full-Stack Software Engineer with 6+ years of hands-on experience...',
        className: ' text-xs text-black leading-[18px] font-poppins',
      },
    },
    {
      id: 'education',
      type: 'list-section',
      column: 'right',
      break: false,
      className: '',
      heading: {
        path: 'education.heading',
        fallback: 'Education',
        className: 'text-[18px] font-semibold text-[#AD5B24]',
        divider: {
          variant: 'line',
          className: 'bg-[#AD5B24] w-[42.56px] h-[2.66px] rounded-[5.32px] mt-1',
        },
      },
      listPath: 'education.items',
      containerClassName: 'flex flex-col gap-0 mt-2',
      itemTemplate: {
        className: 'flex flex-col mb-4 last:mb-0',
        rows: [
          {
            className: 'flex flex-row items-start gap-4',
            cells: [
              {
                type: 'duration',
                path: 'duration',
                className: 'text-xs font-normal text-black w-[130px] shrink-0 pt-0.5',
              },
              {
                type: 'group',
                className: 'flex flex-col flex-1 relative pl-6 min-w-0',
                items: [
                  {
                    type: 'text',
                    fallback: ' ',
                    className: 'absolute left-0 top-1 w-[10.64px] h-[10.64px] rounded-full bg-[#E5E5E5] block',
                  },
                  {
                    type: 'group',
                    className: 'flex flex-col w-[250px]',
                    items: [
                      {
                        type: 'group',
                        className: 'flex flex-col gap-0.5',
                        items: [
                          {
                            path: 'degree',
                            className: 'text-sm font-bold text-black leading-tight break-words',
                          },
                          {
                            path: 'gpa',
                            fallback: '9.0 CGPA',
                            className: 'text-sm font-bold text-black leading-tight break-words',
                          },
                        ],
                      },
                      {
                        path: 'institution',
                        className: 'text-xs font-normal text-neutral-600 mt-1 break-words w-full block',
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

    // Experience Section - Right Column
    {
      id: 'experience',
      type: 'list-section',
      column: 'right',
      break: false,
      heading: {
        path: 'experience.heading',
        fallback: 'Experience',
        className: 'text-[18px] font-semibold text-[#AD5B24]',
        divider: {
          variant: 'line',
          className: 'bg-[#AD5B24] w-[42.56px] h-[2.66px] rounded-[5.32px] mt-1',
        },
      },
      listPath: 'experience.items',
      containerClassName: 'flex flex-col gap-0 mt-3',
      itemTemplate: {
        className: 'flex flex-col mb-2 last:mb-0',
        rows: [
          {
            className: 'flex flex-row justify-between items-baseline relative pl-6',
            cells: [
              {
                type: 'text',
                fallback: ' ',
                className: 'absolute left-0 top-1 w-[10.64px] h-[10.64px] rounded-full bg-[#E5E5E5] block',
              },
              {
                type: 'group',
                className: 'flex flex-col gap-0.5 w-[350px]',
                items: [
                  {
                    path: 'position',
                    className: 'text-sm font-bold text-black leading-tight break-words',
                  },
                  {
                    path: 'company',
                    className: 'text-sm font-bold text-black leading-tight break-words',
                  },
                ],
              },
            ],
          },
          {
            cells: [
              {
                type: 'duration',
                path: 'duration',
                className: 'text-xs font-normal text-neutral-600 mt-1 pl-6',
              },
            ],
          },
          {
            cells: [
              {
                type: 'html',
                path: 'description',
                className:
                  'text-xs text-[#555555] leading-relaxed [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 break-words mt-2 whitespace-pre-wrap pl-6',
              },
            ],
          },
        ],
      },
    },

    // Projects Section - Right Column
    {
      id: 'projects',
      type: 'list-section',
      column: 'right',
      // break: true,
      className: '',
      heading: {
        path: 'projects.heading',
        fallback: 'Projects',
        className: ' text-[18px] font-semibold text-[#AD5B24] -mt-2',
        divider: {
          variant: 'line',
          className: 'bg-[#AD5B24] w-[42.56px] h-[2.66px] rounded-[5.32px] mt-1',
        },
      },
      listPath: 'projects.items',
      containerClassName: 'flex flex-col gap-0 mt-3',
      itemTemplate: {
        className: 'flex flex-col mb-2 last:mb-0',
        break: true,
        rows: [
          {
            className: 'flex flex-row justify-between items-baseline pl-6 relative',
            cells: [
              {
                type: 'text',
                fallback: ' ',
                className: 'absolute left-0 top-1 w-[10.64px] h-[10.64px] rounded-full bg-[#E5E5E5] block',
              },
              {
                path: 'title',
                href: 'link.link',
                fallback: 'Project Title',
                className: 'text-sm font-bold text-black hover:underline',
              },
            ],
          },
          {
            cells: [
              {
                type: 'duration',
                path: 'duration',
                className: 'text-xs font-normal text-neutral-600 mt-1 pl-6',
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
                  'text-xs text-[#555555] leading-relaxed [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 break-words mt-1 whitespace-pre-wrap pl-6',
              },
            ],
          },
        ],
      },
    },

    // Education Section - Right Column

    // Achievements Section - Right Column
    {
      id: 'achievements',
      type: 'badge-section',
      column: 'right',
      break: false,
      breakable: true,
      className: '',
      heading: {
        path: 'achievements.heading',
        fallback: 'Achievements',
        className: ' text-[18px]  font-semibold text-[#AD5B24]',
        divider: {
          variant: 'line',
          className: 'bg-[#AD5B24] w-[42.56px] h-[2.66px] rounded-[5.32px] mt-1',
        },
      },
      listPath: 'achievements.items[0].items',
      itemPath: '',
      badgeClassName: 'text-xs text-[#555555]',
      containerClassName: 'flex flex-col  mt-2 leading-tight',
      itemPrefix: '• ',
    },
  ],
};

export default mohsinaTemplate14;
