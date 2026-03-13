// Lauren Chen style template - Orange sidebar with white content area

const mohsinaTemplate13 = {
  name: 'Mohsina Template 13',

  page: {
    background: '#ffffff',
    className: 'text-neutral-900 leading-relaxed  ',
    fontFamily: 'Mulish',
  },

  columns: {
    spacing: '0px',
    left: {
      width: '272px',
      className: 'text-black p-4 pt-8 flex flex-col gap-[16px]',
    },
    right: {
      width: 'calc(100% - 272px)',
      className: 'p-8 flex flex-col gap-[16px]',
    },
  },

  sections: [
    /**
     * HEADER - Name and Title - Left Column
     */
    {
      id: 'header',
      type: 'banner',
      className: 'mb-4 w-full z-10 pt-10 px-8',
      fields: {
        container: {
          type: 'group',
          className: 'flex flex-row justify-between items-center w-full gap-4',
          items: [
            // Left: Image + Name/Title
            {
              type: 'group',
              className: 'flex items-center gap-2',
              items: [
                {
                  type: 'image',
                  path: 'personalDetails.items[0].profilePicturePublicUrl',
                  fallback: '/images/profileimg.jpeg',
                  className: 'w-30 h-30 rounded-full object-cover shrink-0 border-4 border-white shadow-sm',
                  alt: 'Profile image',
                },
                {
                  type: 'group',
                  className: 'flex flex-col ',
                  items: [
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].fullName',
                      fallback: 'John Doe',
                      className: 'text-[40px] font-bold text-[#FF6161] uppercase leading-tight',
                    },
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].jobTitle',
                      fallback: 'UX/UI Designer',
                      className: 'text-[22px] font-normal text-neutral-600 leading-tight',
                    },
                  ],
                },
              ],
            },
            // Right: Contact Info (using contact-grid for robust handling of icons/links)
            {
              type: 'contact-grid',
              className:
                'flex flex-col items-start w-[30%] text-left text-[11px] gap-1.5 text-neutral-700 ml-auto leading-tight',
              items: [
                {
                  type: 'inline-group-with-icon',
                  className: 'flex items-start gap-2',
                  condition: 'personalDetails.items[0].email',
                  items: [
                    { type: 'text', fallback: 'Mail - ', className: 'font-semibold shrink-0' },
                    {
                      type: 'link',
                      path: 'personalDetails.items[0].email',
                      href: 'mailto:{{value}}',
                      fallback: 'john.doe@email.com',
                      className: 'break-all ',
                    },
                  ],
                },
                {
                  type: 'inline-group-with-icon',
                  className: 'flex items-start gap-2',
                  condition: 'personalDetails.items[0].links',
                  items: [
                    { type: 'text', fallback: 'Connect - ', className: 'font-semibold shrink-0' },
                    {
                      type: 'inline-group',
                      separator: ' / ',
                      className: 'flex flex-wrap ',
                      items: [
                        {
                          type: 'link',
                          path: 'personalDetails.items[0].links.linkedin.title',
                          href: 'personalDetails.items[0].links.linkedin.link',
                          condition: 'personalDetails.items[0].links.linkedin.link',
                          fallback: 'LinkedIn',
                        },
                        {
                          type: 'link',
                          path: 'personalDetails.items[0].links.website.title',
                          href: 'personalDetails.items[0].links.website.link',
                          condition: 'personalDetails.items[0].links.website.link',
                          fallback: 'Portfolio',
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'inline-group-with-icon',
                  className: 'flex items-start gap-2',
                  condition: 'personalDetails.items[0].phone',
                  items: [
                    { type: 'text', fallback: 'Contact - ', className: 'font-semibold shrink-0' },
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].phone',
                      fallback: '+1 (555) 123-4567',
                    },
                  ],
                },
                {
                  type: 'inline-group-with-icon',
                  className: 'flex items-start gap-2',
                  condition: 'personalDetails.items[0].address',
                  items: [
                    { type: 'text', fallback: 'Location - ', className: 'font-semibold shrink-0' },
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].address',
                      fallback: 'San Francisco, CA',
                      className: 'leading-tight',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    },

    /**
     * SUMMARY - Left Column (separate section for page breaking)
     */
    {
      id: 'summary',
      type: 'content-section',
      column: 'left',
      break: true,
      className: 'flex flex-col',
      heading: {
        path: 'professionalSummary.heading',
        fallback: 'Summary',
        className: 'text-base font-black text-[#FF6161] uppercase mb-2',
      },
      content: {
        type: 'html',
        path: 'personalDetails.items[0].description',
        fallback:
          'Digital Marketing Specialist with 6+ years of experience in online marketing, branding, and business strategy across music, media, and entertainment industries.',
        className: 'text-sm font-normal leading-[21px] whitespace-pre-wrap text-[#333333]',
      },
    },
    {
      id: 'skills',
      type: 'inline-list-section',
      column: 'left',
      break: true,
      className: '',
      heading: {
        path: 'skills.heading',
        fallback: 'Skills',
        className: 'text-base font-black text-[#FF6161] uppercase mb-2',
      },
      listPath: 'skills.items',
      itemPath: 'name',
      showBullet: false,
      containerClassName: 'grid grid-cols-2 gap-x-4 gap-y-1 mt-2',
      itemClassName:
        'text-sm text-black font-mulish relative pl-3 before:content-[""] before:absolute before:left-0 before:top-1 before:bottom-1 before:w-[3px] before:bg-[#FF6161] before:rounded-[2px] leading-tight pt-1 block',
    },

    /**
     * EDUCATION - left Column
     */
    {
      id: 'education',
      type: 'list-section',
      column: 'left',
      break: true,
      className: '',
      heading: {
        path: 'education.heading',
        fallback: 'Education',
        className: 'text-base font-black text-[#FF6161] uppercase  mb-2',
      },
      listPath: 'education.items',
      itemTemplate: {
        className: 'mb-2 last:mb-0 flex flex-col gap-0',
        break: true,
        fields: [
          // Row 1: Content (left) | Duration (right)
          {
            type: 'horizontal-group',
            className: 'flex justify-between items-start gap-4 mb-0.5',
            items: [
              {
                type: 'group',
                className: 'flex flex-col flex-1 min-w-0 leading-tight gap-0.5',
                items: [
                  {
                    path: 'degree',
                    fallback: 'Bachelor of Design',
                    className: 'text-[13px] font-black text-black uppercase',
                  },
                  {
                    path: 'grade.value',
                    className: 'text-[13px] font-black text-black uppercase',
                  },
                  {
                    path: 'gpa',
                    fallback: '8.0 CGPA',
                    className: 'text-xs font-black text-[#FF6161] leading-tight block',
                  },
                  {
                    path: 'institution',
                    fallback: 'National Institute of Design',
                    className: 'text-sm text-black font-normal leading-tight block',
                  },
                ],
              },
              {
                type: 'duration',
                path: 'duration',
                className:
                  'text-[13px] font-black text-[#878787] font-mulish leading-tight w-32 shrink-0 text-right mt-0.5',
              },
            ],
          },
        ],
      },
    },
    {
      id: 'interests',
      type: 'inline-list-section',
      column: 'left',
      showBullet: false,
      break: true,
      breakable: true,
      className: '',
      heading: {
        path: 'interests.heading',
        fallback: 'Interests',
        className: 'text-base font-black text-[#FF6161] uppercase mb-2',
      },
      listPath: 'interests.items[0].items',
      itemPath: '',
      containerClassName: 'grid grid-cols-2 gap-x-4 gap-y-1 mt-3',
      itemClassName:
        'text-sm text-black font-mulish relative pl-3 before:content-[""] before:absolute before:left-0 before:top-1 before:bottom-1 before:w-[3px] before:bg-[#FF6161] before:rounded-[2px] leading-tight pt-1 block',
    },
    {
      id: 'certifications',
      type: 'list-section',
      column: 'left',
      break: true,
      heading: {
        path: 'certifications.heading',
        fallback: 'Certifications',
        className: 'text-base font-black text-[#FF6161] uppercase mb-2 ',
      },
      listPath: 'certifications.items',
      itemTemplate: {
        className: 'mb-2 flex flex-col',
        break: true,
        fields: [
          // Row 1: Title (left) | Duration (right)
          {
            type: 'horizontal-group',
            className: 'flex justify-between items-baseline gap-2 -mb-2',
            items: [
              {
                path: 'title',
                fallback: 'Certification Title',
                className: 'text-[13px] font-black text-black leading-tight',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[13px] font-black text-[#878787] font-mulish',
              },
            ],
          },
          // Row 2: Issuer
          {
            path: 'issuer',
            fallback: 'Issuer',
            className: 'text-[12px] text-neutral-500 ',
          },
        ],
      },
    },

    /**
     * PROFESSIONAL EXPERIENCE - Right Column
     */
    {
      id: 'experience',
      type: 'list-section',
      column: 'right',
      break: true,
      className: '',
      heading: {
        path: 'experience.heading',
        fallback: 'Experience',
        className: 'text-base font-black text-[#FF6161] uppercase mb-2',
      },
      listPath: 'experience.items',
      itemTemplate: {
        className: 'mb-3 last:mb-0 flex flex-col ',
        break: true,
        fields: [
          // Row 1: Position, Company + Duration
          {
            type: 'horizontal-group',
            className: 'flex justify-between items-baseline w-full gap-4',
            items: [
              {
                type: 'group',
                path: '.',
                className: 'flex flex-col flex-1 min-w-0 leading-tight gap-0.5',
                items: [
                  {
                    path: 'position',
                    fallback: 'Senior UX Designer',
                    className: 'text-[13px] font-black text-black uppercase',
                  },
                  {
                    path: 'company',
                    fallback: 'ORACLE',
                    className: 'text-[13px] font-black text-black uppercase',
                  },
                ],
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[13px] font-black text-[#878787] font-mulish w-32 shrink-0 text-right mt-0.5',
              },
            ],
          },

          // Row 3: Description points
          {
            type: 'html',
            path: 'description',
            break: true,
            className:
              'text-sm text-black font-mulish leading-[20px] mt-3 [&_ul]:ml-0 [&_li]:list-none [&_li]:relative [&_li]:pl-4 [&_li]:before:content-[""] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-0.5 [&_li]:before:bottom-0.5 [&_li]:before:w-[3px] [&_li]:before:bg-[#FF6161] [&_li]:before:rounded-[2px] [&_li:not(:last-child)]:mb-2 whitespace-pre-wrap',
          },
        ],
      },
    },

    /**
     * PROJECTS - Right Column
     */
    {
      id: 'projects',
      type: 'list-section',
      column: 'right',
      break: true,
      heading: {
        path: 'projects.heading',
        fallback: 'Projects',
        className: 'text-base font-black text-[#FF6161] mb-2 uppercase',
      },
      listPath: 'projects.items',
      itemTemplate: {
        className: 'mb-3 last:mb-0 flex flex-col gap-0',
        break: true,
        fields: [
          // Row 1: Project Title + Duration
          {
            type: 'horizontal-group',
            className: 'flex justify-between items-baseline w-full gap-4 ',
            items: [
              {
                path: 'title',
                fallback: 'Project Title',
                className: 'text-[13px] font-black text-black uppercase font-mulish min-w-0 leading-[18px]',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[13px] font-black text-[#878787]  font-mulish shrink-0',
              },
            ],
          },

          // Row 3: Description (indented)
          {
            type: 'html',
            path: 'description',
            break: true,
            className:
              'text-sm text-black font-mulish leading-[20px] mt-1 [&_ul]:ml-0 [&_li]:list-none [&_li]:relative [&_li]:pl-4 [&_li]:before:content-[""] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-0.5 [&_li]:before:bottom-0.5 [&_li]:before:w-[3px] [&_li]:before:bg-[#FF6161] [&_li]:before:rounded-[2px] [&_li:not(:last-child)]:mb-2 whitespace-pre-wrap',
          },
        ],
      },
    },

    /**
     * ACHIEVEMENTS - Right Column
     */
    {
      id: 'achievements',
      type: 'inline-list-section',
      column: 'right',
      showBullet: false,
      break: true,
      breakable: true,
      heading: {
        path: 'achievements.heading',
        fallback: 'Achievements',
        className: 'text-base font-black text-[#FF6161] uppercase mb-2',
      },
      listPath: 'achievements.items[0].items',
      itemPath: '',
      containerClassName: 'flex flex-col gap-1 -mt-1',
      itemClassName:
        'text-sm text-black font-mulish leading-[20px] relative pl-4 before:content-[""] before:absolute before:left-0 before:top-1 before:bottom-1 before:w-[3px] before:bg-[#FF6161] before:rounded-[2px] py-0.5 block',
    },
  ],
};

export default mohsinaTemplate13;
