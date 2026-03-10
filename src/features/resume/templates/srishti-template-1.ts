
const template12 = {
  name: 'LinkedIn Two Column with Photo',

  page: {
    background: '#fff',
    className: 'text-black leading-relaxed',
    fontFamily: 'Inter',
  },

  columns: {
    spacing: '0px',
    left: {
      width: '210px',
      className: 'px-4 pt-4 gap-[20px] bg-white',
    },
    right: {
      width: '100%',
      className: 'pb-10 pt-4 pr-8 pl-6 border-l-2 border-[#015619]',
    },
  },

  sections: [
    // ── LEFT COLUMN ──────────────────────────────────────────────

    // Photo + Name + Title
    {
      id: 'header',
      type: 'header',
      column: 'left',
      break: false,
      className: 'flex flex-col items-center text-center',
      fields: {
        photo: {
          type: 'image',
          path: 'personalDetails.items[0].photo',
          className: 'w-[80px] h-[80px] rounded-full object-cover border-2 border-[#015619] mb-2',
        },
        nameTitle: {
          className: 'flex flex-col items-center',
        },
        name: {
          path: 'personalDetails.items[0].fullName',
          fallback: 'Aman Gupta',
          className: 'text-[21.6px] font-bold text-[#015619] leading-[27px]',
        },
        title: {
          path: 'personalDetails.items[0].jobTitle',
          fallback: 'Product Designer',
          className: 'text-[13.5px] font-medium text-[#555] leading-[27px] mt-0.5',
        },
      },
    },


{
  id: 'contact',
  type: 'header',
  column: 'left',
  break: false,
  fields: {
    contact: {
      type: 'contact-grid',
      className: 'flex flex-col gap-2 border-t border-[#E2E6EE] pt-3 text-[10px]',
      heading: {
         path: 'personalDetails.items[0].connect',
         fallback: 'Connect',
        className: 'text-[13px] font-bold text-[#47516B] uppercase tracking-wide mb-2 leading-[1.21]',
      },
      items: [
       
        {
          type: 'inline-group-with-icon',
          className: 'flex items-center gap-2',
          items: [
            { type: 'icon', name: 'Link', size: 13, className: 'text-[#015619] flex-shrink-0' },
           
            {
              type: 'inline-group',
              className: 'flex flex-row flex-wrap items-center',
              separator: ' / ',
              items: [
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.linkedin.title',
                  href: 'personalDetails.items[0].links.linkedin.link',
                  className: 'text-[11px] text-[#333]',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.github.title',
                  href: 'personalDetails.items[0].links.github.link',
                  className: 'text-[11px] text-[#333]',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.youtube.title',
                  href: 'personalDetails.items[0].links.youtube.link',
                  className: 'text-[11px] text-[#333]',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.website.title',
                  href: 'personalDetails.items[0].links.website.link',
                  className: 'text-[11px] text-[#333]',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.dribble.title',
                  href: 'personalDetails.items[0].links.dribble.link',
                  className: 'text-[11px] text-[#333]',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].links.behance.title',
                  href: 'personalDetails.items[0].links.behance.link',
                  className: 'text-[11px] text-[#333]',
                },
              ],
            },
          ],
        },

        // Email
        {
          type: 'inline-group-with-icon',
          text: 'gmail',
          className: 'flex items-center gap-2 ',
          items: [
            { type: 'icon', name: 'Mail', size: 13, className: 'text-[#015619] flex-shrink-0' },
            {
              type: 'link',
              path: 'personalDetails.items[0].email',
              href: 'mailto:{{value}}',
              fallback: 'nutproddesigner@gmail.com',
              className: 'text-[11px] text-[#333]',
            },
          ],
        },

        // Phone
        {
          type: 'inline-group-with-icon',
          className: 'flex items-center gap-2',
          items: [
            { type: 'icon', name: 'Phone', size: 13, className: 'text-[#015619] flex-shrink-0' },
            {
              path: 'personalDetails.items[0].phone',
              fallback: '+234 814 2686 61',
              className: 'text-[11px] text-[#333]',
            },
          ],
        },

        // Location
        {
          type: 'inline-group-with-icon',
          className: 'flex items-center gap-2',
          items: [
            { type: 'icon', name: 'MapPin', size: 13, className: 'text-[#015619] flex-shrink-0' },
            {
              path: 'personalDetails.items[0].address',
              fallback: 'Gurugram, Haryana',
              className: 'text-[11px] text-[#333]',
            },
          ],
        },
      ],
    },
  },
},


  {
      id: 'skills',
      type: 'inline-list-section',
      column: 'left',
      break: true,
      breakable: true,
      heading: {
        path: 'skills.heading',
        fallback: 'Skills',
        className: 'text-[13px] font-bold text-[#015619] uppercase tracking-wide mb-2 leading-[1.21]',
      },
      listPath: 'skills.items',
      itemPath: 'name',
      itemPrefix: '• ',
      showBullet: true,
      badgeClassName: 'text-[11px] text-[#8189A1] inline-block',
      containerClassName: 'block text-[#8189A1]',
    },

    // Certifications - Left
    {
      id: 'certifications',
      type: 'list-section',
      column: 'left',
      break: true,
      heading: {
        path: 'certifications.heading',
        fallback: 'Certifications',
        className: 'text-[13px] font-bold text-[#015619] uppercase tracking-wide mb-2 leading-[1.21]',
      },
      listPath: 'certifications.items',
      containerClassName: 'flex flex-col gap-2',
      itemTemplate: {
        className: 'flex flex-col',
        break: true,
        rows: [
          {
            className: 'flex flex-row justify-between items-baseline leading-none',
            cells: [
              {
                path: 'title',
                fallback: 'Certificate 1',
                className: 'text-[11px] font-semibold text-[#333]',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[10px] text-[#888] ml-1',
              },
            ],
          },
          {
            cells: [
              {
                path: 'issuer',
                fallback: 'Company 1',
                className: 'text-[11px] text-[#555]',
              },
            ],
          },
        ],
      },
    },

    // Interest - Left
    {
      id: 'interests',
      type: 'inline-list-section',
      column: 'left',
      break: true,
      breakable: true,
      heading: {
        path: 'interests.heading',
        fallback: 'Interest',
        className: 'text-[13px] font-bold text-[#015619] uppercase tracking-wide mb-2 leading-[1.21]',
      },
      listPath: 'interests.items[0].items',
      itemPath: '',
      itemPrefix: '• ',
      showBullet: true,
      badgeClassName: 'text-[11px] text-[#333] inline-block',
      containerClassName: 'block text-[#333]',
    },

    // ── RIGHT COLUMN ─────────────────────────────────────────────

    // Summary - Right
    {
      id: 'summary',
     type: 'content-section',
      column: 'right',

      className: 'mt-2',            

      heading: {
        path: 'summary.heading',
        fallback: 'Profile',
        className: ' text-[#015619] font-poppins text-base font-semibold whitespace-nowrap',
        divider: {
          variant: 'line',  
          className: 'bg-[#015619] w-[42.56px] h-[2.66px] rounded-[5.32px] mt-1',
        },
      },

      content: {
        type: 'html',
        path: 'personalDetails.items[0].description',
        fallback: 'Versatile Full-Stack Software Engineer with 6+ years of hands-on experience...',
        className: ' text-xs text-black leading-[18px] font-poppins',
      },
    },

    // Experience - Right
    {
      id: 'experience',
      type: 'list-section',
      column: 'right',
      break: true,
      className: 'mt-2',
      heading: {
        path: 'experience.heading',
        fallback: 'Experience',
        className: 'text-[13px] font-bold text-[#015619] uppercase tracking-wide mb-2 leading-[1.21]',
      },
      listPath: 'experience.items',
      containerClassName: 'flex flex-col gap-3',
      itemTemplate: {
        className: 'flex flex-col',
        break: true,
        rows: [
          {
            className: 'flex flex-row justify-between items-baseline leading-none mb-0.5',
            cells: [
              {
                type: 'inline-group',
                className: 'flex flex-col',
                items: [
                  {
                    path: 'position',
                    fallback: 'Senior UX Designer',
                    className: 'text-[12px] font-semibold text-[#222]',
                  },
                  {
                    path: 'company',
                    fallback: 'ORACLE',
                    className: 'text-[11px] font-medium text-[#015619]',
                  },
                ],
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[10px] text-[#888] whitespace-nowrap ml-2',
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
                  'text-[11px] leading-[1.6] text-[#444] whitespace-pre-wrap [&_ul]:ml-3 [&_li]:list-disc [&_li]:mb-0.5',
              },
            ],
          },
        ],
      },
    },

    // Projects - Right
    {
      id: 'projects',
      type: 'list-section',
      column: 'right',
      break: true,
      className: 'mt-4',
      heading: {
        path: 'projects.heading',
        fallback: 'Projects',
        className: 'text-[13px] font-bold text-[#015619] uppercase tracking-wide mb-2 leading-[1.21]',
      },
      listPath: 'projects.items',
      containerClassName: 'flex flex-col gap-3',
      itemTemplate: {
        className: 'flex flex-col',
        break: true,
        rows: [
          {
            className: 'flex flex-row justify-between items-baseline leading-none mb-0.5',
            cells: [
              {
                type: 'inline-group',
                className: 'flex flex-col',
                items: [
                  {
                    path: 'title',
                    fallback: 'Project Title',
                    className: 'text-[12px] font-semibold text-[#222]',
                  },
                ],
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[10px] text-[#888] whitespace-nowrap ml-2',
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
                  'text-[11px] leading-[1.6] text-[#444] whitespace-pre-wrap [&_ul]:ml-3 [&_li]:list-disc [&_li]:mb-0.5',
              },
            ],
          },
          {
            cells: [
              {
                type: 'link',
                path: 'link.title',
                href: 'link.link',
                className: 'text-[11px] text-[#015619] hover:underline mt-1',
              },
            ],
          },
        ],
      },
    },

    // Education - Right
    {
      id: 'education',
      type: 'list-section',
      column: 'right',
      break: true,
      className: 'mt-4',
      heading: {
        path: 'education.heading',
        fallback: 'Education',
        className: 'text-[13px] font-bold text-[#015619] uppercase tracking-wide mb-2 leading-[1.21]',
      },
      listPath: 'education.items',
      containerClassName: 'flex flex-col gap-3',
      itemTemplate: {
        className: 'flex flex-col gap-0.5',
        rows: [
          {
            className: 'flex flex-row justify-between items-baseline leading-none',
            cells: [
              {
                type: 'inline-group',
                className: 'flex flex-row gap-2 items-baseline',
                items: [
                  {
                    path: 'degree',
                    fallback: 'Bachelor of Design',
                    className: 'text-[11px] font-semibold text-[#222]',
                  },
                  {
                    path: 'gpa',
                    fallback: '',
                    className: 'text-[11px] text-[#555]',
                  },
                ],
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[10px] text-[#888] whitespace-nowrap ml-2',
              },
            ],
          },
          {
            cells: [
              {
                path: 'institution',
                fallback: 'National Institute of Design',
                className: 'text-[11px] text-[#015619]',
              },
            ],
          },
          {
            cells: [
              {
                type: 'html',
                path: 'description',
                className:
                  'text-[11px] leading-[1.6] text-[#444] whitespace-pre-wrap [&_ul]:ml-3 [&_li]:list-disc',
              },
            ],
          },
        ],
      },
    },

    // Achievements - Right
    {
      id: 'achievements',
      type: 'list-section',
      column: 'right',
      break: true,
      className: 'mt-4',
      heading: {
        path: 'achievements.heading',
        fallback: 'Achievements',
        className: 'text-[13px] font-bold text-[#015619] uppercase tracking-wide mb-2 leading-[1.21]',
      },
      listPath: 'achievements.items[0].items',
      containerClassName: 'flex flex-col gap-1.5',
      itemTemplate: {
        className: 'flex flex-row items-start gap-1.5',
        rows: [
          {
            cells: [
              {
                type: 'text',
                value: '•',
                className: 'text-[11px] text-[#015619] mt-0.5',
              },
              {
                path: '',
                fallback: 'Achievement description here',
                className: 'text-[11px] text-[#444] leading-[1.5]',
              },
            ],
          },
        ],
      },
    },
  ],
};

export default template12;

