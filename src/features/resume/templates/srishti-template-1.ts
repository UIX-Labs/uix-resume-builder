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
      width: 'calc(100% - 210px)',
      className: 'pb-10 pt-4 pr-8 pl-6 border-l-2 border-[#E2E6EE]',
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
          path: 'personalDetails.items[0].profilePicturePublicUrl',
          className: 'w-[80px] h-[80px] rounded-full object-cover border-2 border-[#015619] mb-2',
        },
        nameTitle: {
          className: 'flex flex-col items-start',
        },
        name: {
          path: 'personalDetails.items[0].fullName',
          fallback: 'Aman Gupta',
          className: 'text-[21.6px] font-bold text-[#015619] leading-[27px] uppercase',
        },
        title: {
          path: 'personalDetails.items[0].jobTitle',
          fallback: 'Product Designer',
          className: 'text-[14px] font-medium text-[#555] leading-[27px] mt-0.5',
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
          items: [
            // Links Group
            {
              type: 'group',
              condition: 'personalDetails.items[0].links',
              className: 'flex flex-col gap-1 leading-none mt-2',
              items: [
                {
                  type: 'inline-group',
                  className: 'flex flex-row items-center gap-2',
                  items: [
                    { type: 'icon', name: 'Link', size: 12, className: 'text-[#015619]' },
                    {
                      type: 'inline-group',
                      className: 'flex flex-row flex-wrap items-center gap-1',
                      separator: ' / ',
                      items: [
                        {
                          type: 'link',
                          path: 'personalDetails.items[0].links.linkedin.title',
                          href: 'personalDetails.items[0].links.linkedin.link',
                          condition: 'personalDetails.items[0].links.linkedin.link',
                          className: 'text-[10px] text-[#333]',
                        },
                        {
                          type: 'link',
                          path: 'personalDetails.items[0].links.github.title',
                          href: 'personalDetails.items[0].links.github.link',
                          condition: 'personalDetails.items[0].links.github.link',
                          className: 'text-[10px] text-[#333]',
                        },
                        {
                          type: 'link',
                          path: 'personalDetails.items[0].links.youtube.title',
                          href: 'personalDetails.items[0].links.youtube.link',
                          condition: 'personalDetails.items[0].links.youtube.link',
                          className: 'text-[10px] text-[#333]',
                        },
                        {
                          type: 'link',
                          path: 'personalDetails.items[0].links.website.title',
                          href: 'personalDetails.items[0].links.website.link',
                          condition: 'personalDetails.items[0].links.website.link',
                          className: 'text-[10px] text-[#333]',
                        },
                        {
                          type: 'link',
                          path: 'personalDetails.items[0].links.dribble.title',
                          href: 'personalDetails.items[0].links.dribble.link',
                          condition: 'personalDetails.items[0].links.dribble.link',
                          className: 'text-[10px] text-[#333]',
                        },
                        {
                          type: 'link',
                          path: 'personalDetails.items[0].links.behance.title',
                          href: 'personalDetails.items[0].links.behance.link',
                          condition: 'personalDetails.items[0].links.behance.link',
                          className: 'text-[10px] text-[#333]',
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            // Email Group
            {
              type: 'group',
              condition: 'personalDetails.items[0].email',
              className: 'flex flex-col gap-1 leading-none mt-2',
              items: [
                {
                  type: 'inline-group',
                  className: 'flex items-center gap-2',
                  items: [
                    { type: 'icon', name: 'Mail', size: 12, className: 'text-[#015619]' },
                    {
                      type: 'text',
                      fallback: 'Email',
                      className: 'text-[10px] font-bold text-[#79819A]',
                    },
                  ],
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].email',
                  href: 'mailto:{{value}}',
                  fallback: 'nutproddesigner@gmail.com',
                  className: 'text-[10px] text-[#333] pl-[21px]',
                },
              ],
            },

            // Phone Group
            {
              type: 'group',
              condition: 'personalDetails.items[0].phone',
              className: 'flex flex-col gap-1 leading-none mt-2',
              items: [
                {
                  type: 'inline-group',
                  className: 'flex items-center gap-2',
                  items: [
                    { type: 'icon', name: 'Phone', size: 12, className: 'text-[#015619]' },
                    {
                      type: 'text',
                      fallback: 'Phone',
                      className: 'text-[10px] font-bold text-[#79819A]',
                    },
                  ],
                },
                {
                  type: 'text',
                  path: 'personalDetails.items[0].phone',
                  fallback: '+234 814 2686 61',
                  className: 'text-[10px] text-[#333] pl-[21px]',
                },
              ],
            },

            // Location Group
            {
              type: 'group',
              condition: 'personalDetails.items[0].address',
              className: 'flex flex-col gap-1 leading-none mt-2',
              items: [
                {
                  type: 'inline-group',
                  className: 'flex items-center gap-2',
                  items: [
                    { type: 'icon', name: 'MapPin', size: 12, className: 'text-[#015619]' },
                    {
                      type: 'text',
                      fallback: 'Location',
                      className: 'text-[10px] font-bold text-[#79819A]',
                    },
                  ],
                },
                {
                  type: 'text',
                  path: 'personalDetails.items[0].address',
                  fallback: 'Gurugram, Haryana',
                  className: 'text-[10px] text-[#333] pl-[21px]',
                },
              ],
            },
          ],
        },
      },
    },

    // Interest - Left (Moved up)
    {
      id: 'interests',
      type: 'inline-list-section',
      column: 'left',
      break: true,
      breakable: true,
      heading: {
        path: 'interests.heading',
        fallback: 'Interest',
        className: 'text-[16px] font-bold text-[#015619] tracking-wide mb-1 leading-[1.21] border-t border-[#E2E6EE] pt-3 text-center w-full mt-4',
      },
      listPath: 'interests.items[0].items',
      itemPath: '',
      itemPrefix: '• ',
      showBullet: true,
      badgeClassName: 'text-[10px] text-[#333] inline-block',
      containerClassName: 'block text-[#333]',
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
        className: 'text-[16px] font-bold text-[#015619] tracking-wide mb-1 leading-[1.21] border-t border-[#E2E6EE] pt-2 mt-2',
      },
      listPath: 'skills.items',
      itemPath: 'name',
      itemPrefix: '• ',
      showBullet: true,
      badgeClassName: 'text-[12px] text-[#8189A1] inline-block',
      containerClassName: 'block text-[#8189A1]',
    },

    {
      id: 'certifications',
      type: 'list-section',
      column: 'left',
      break: true,
      breakable: false, // Prevent section from splitting between pages
      heading: {
        path: 'certifications.heading',
        fallback: 'Certifications',
        className: 'text-[16px] font-bold text-[#015619] mb-2 leading-[1.21] border-t border-[#E2E6EE] pt-3',
      },
      listPath: 'certifications.items',
      containerClassName: 'flex flex-col gap-2',
      itemTemplate: {
        className: 'flex flex-col',
        break: true,
        rows: [
          {
            className: 'flex flex-row justify-between items-baseline leading-tight',
            cells: [
              {
                path: 'title',
                fallback: 'Certificate 1',
                className: 'text-[12px] font-semibold text-[#333]',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[12px] text-[#888] ml-1',
              },
            ],
          },
          {
            className: 'leading-none',
            cells: [
              {
                path: 'issuer',
                fallback: 'Company 1',
                className: 'text-[12px] text-[#555] mt-[-2px]',
              },
            ],
          },
        ],
      },
    },



    // ── RIGHT COLUMN ─────────────────────────────────────────────

    // Summary - Right
    {
      id: 'summary',
      type: 'content-section',
      column: 'right',

      break: true,
      breakable: true,

      className: 'mt-2',

      heading: {
        path: 'summary.heading',
        fallback: 'Summary',
        className: ' text-[#015619] font-poppins font-semibold text-[16px]',
        divider: {
          variant: 'line',
          className: 'bg-[#015619] w-[42.56px] h-[2.66px] rounded-[5.32px] mt-1',
        },
      },

      content: {
        type: 'html',
        path: 'personalDetails.items[0].description',
        fallback: 'Versatile Full-Stack Software Engineer with 6+ years of hands-on experience...',
        className: ' text-[12px] text-[#2C2F37] leading-[18px] font-poppins break-words',
      },
    },

    // Projects - Right (Moved up)
    {
      id: 'projects',
      type: 'list-section',
      column: 'right',
      break: true,
      heading: {
        path: 'projects.heading',
        fallback: 'Projects',
        className: 'text-[16px] font-bold text-[#015619] tracking-wide mb-2 leading-[1.21] mt-4 border-t border-[#E2E6EE] pt-3',
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
                    className: 'text-[14px] font-semibold text-[#222] uppercase',
                  },
                 ],
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[12px] text-[#888] whitespace-nowrap ml-2',
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
                  'text-[12px] leading-[1.6] text-[#444] whitespace-pre-wrap [&_ul]:ml-3 [&_li]:list-disc [&_li]:mb-0.5',
              },
            ],
          },
          {
            cells: [
              {
                type: 'link',
                path: 'link.title',
                href: 'link.link',
                className: 'text-[12px] text-[#015619] hover:underline mt-1',
              },
            ],
          },
        ],
      },
    },

    // Experience - Right
    {
      id: 'experience',
      type: 'list-section',
      column: 'right',
      break: true,

      heading: {
        path: 'experience.heading',
        fallback: 'Experience',
        className: 'text-[16px] font-bold text-[#015619] border-t border-[#E2E6EE] pt-3 mt-4',
      },

      listPath: 'experience.items',
      containerClassName: 'flex flex-col gap-3',

      itemTemplate: {
        className: 'flex flex-col gap-1',
        break: true,

        rows: [
          // designation & duration
          {
            className: 'flex flex-row justify-between items-center leading-none',
            cells: [
              {
                path: 'position',
                className: 'text-[14px] font-bold text-black uppercase',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[12px] text-gray-600',
              },
            ],
          },

          // company
          {
            cells: [
              {
                path: 'company',
                className: 'text-[14px] font-semibold text-black leading-tight',
              },
            ],
          },

          // description bullets
          {
            cells: [
              {
                type: 'html',
                path: 'description',
                break: true,
                className: 'text-[12px] text-gray-700 [&_ul]:ml-4 [&_li]:list-disc leading-normal',
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
      heading: {
        path: 'education.heading',
        fallback: 'Education',
        className: 'text-[16px] font-bold text-[#015619] tracking-wide mb-2 leading-[1.21] mt-4 border-t border-[#E2E6EE] pt-3',
      },
      listPath: 'education.items',
      containerClassName: 'flex flex-col gap-3',
      itemTemplate: {
        className: 'flex flex-col gap-0.5',
        rows: [
          {
            className: 'flex flex-row gap-6 items-baseline',
            cells: [
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[12px] text-[#888] w-[100px] shrink-0',
              },
              {
                type: 'group',
                className: 'flex flex-col flex-1',
                items: [
                  {
                    type: 'inline-group',
                    className: 'flex flex-row gap-2 items-baseline',
                    items: [
                      {
                        path: 'degree',
                        fallback: 'Bachelor of Design',
                        className: 'text-[14px] font-semibold text-[#222]',
                      },
                      {
                        path: 'grade.value',
                        fallback: '',
                        className: 'text-[12px] font-bold text-[#015619]',
                      },
                      {
                        type: 'text',
                        fallback: 'CGPA',
                        condition: 'grade.value',
                        className: 'text-[12px] font-bold text-[#015619]',
                      },
                    ],
                  },
                  {
                    path: 'institution',
                    fallback: 'National Institute of Design',
                    className: 'text-[14px] text-[#015619]',
                  },
                  {
                    type: 'html',
                    path: 'description',
                    className: 'text-[12px] leading-[1.6] text-[#444] whitespace-pre-wrap [&_ul]:ml-3 [&_li]:list-disc mt-1',
                  },
                ],
              },
            ],
          },
        ],
      },
    },

    // Achievements - Right
    {
      id: 'achievements',
      type: 'badge-section',
      column: 'right',
      break: true,
      breakable: true,
      className: 'flex flex-col mt-4',
      heading: {
        path: 'achievements.heading',
        fallback: 'Achievements',
        className: 'text-[#015619] text-[16px] font-bold border-t border-[#E2E6EE] pt-3 mt-4 mb-1',
      },
      listPath: 'achievements.items[0].items',
      containerClassName: 'flex flex-col leading-none gap-1',
      badgeClassName: 'text-[12px] text-[#2C2F37] gap-0',
      itemPrefix: '• ',
    },
  ],
};

export default template12;
