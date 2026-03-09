// Lauren Chen style template - Orange sidebar with white content area

const mohsinaTemplate12 = {
  name: 'Lauren Chen Professional',

  page: {
    width: 794,
    height: 1122,
    padding: 0,
    background: '#ffffff',
    className: 'text-neutral-900 leading-relaxed border-b-8 border-t-8 border-l-8 border-r-8 border-blue-500 ',
    fontFamily: 'Poppins',
  },

  columns: {
    spacing: '0px',
    left: {
      width: '272px',
      className: 'text-black p-4 pt-8  flex flex-col',
    },
    right: {
      width: 'calc(100% - 272px)',
      className:
        'p-8 flex flex-col bg-white mt-6 -mb-6 bg-[linear-gradient(to_bottom,transparent_32px,#e5e5e5_32px)] bg-[size:6px_100%] bg-left bg-no-repeat',
    },
  },

  sections: [
    /**
     * HEADER - Name and Title - Left Column
     */
    {
      id: 'contact',
      type: 'header',
      column: 'left',
      className: 'flex flex-col mb-3 mt-25',
      fields: {
        contact: {
          type: 'group',
          className: 'flex flex-col gap-2',
          items: [
            {
              type: 'text',
              fallback: 'Contact',
              className: 'text-base font-bold text-black border-b-3 border-black w-fit mb-2  pb-1',
            },
            // Address
            {
              type: 'container',
              className: 'flex flex-col gap-1',
              children: [
                {
                  type: 'text',
                  fallback: 'Address',
                  className: 'text-sm font-semibold text-black',
                },
                {
                  path: 'personalDetails.items[0].address',
                  fallback: 'San Francisco, California',
                  className: 'text-xs text-[#878787]',
                },
              ],
            },
            // Phone
            {
              type: 'container',
              className: 'flex flex-col gap-1',
              children: [
                {
                  type: 'text',
                  fallback: 'Phone',
                  className: 'text-sm font-semibold text-black',
                },
                {
                  path: 'personalDetails.items[0].phone',
                  fallback: '(315) 802-8179',
                  className: 'text-xs text-[#878787]',
                },
              ],
            },
            // Email
            {
              type: 'container',
              className: 'flex flex-col gap-1',
              children: [
                {
                  type: 'text',
                  fallback: 'Email',
                  className: 'text-sm font-semibold text-black',
                },
                {
                  type: 'link',
                  path: 'personalDetails.items[0].email',
                  href: 'mailto:{{value}}',
                  fallback: 'ricktang@gmail.com',
                  className: 'text-xs text-[#878787] underline decoration-1 underline-offset-2',
                },
              ],
            },
            // Connect
            {
              type: 'container',
              className: 'flex flex-col gap-1',
              children: [
                {
                  type: 'text',
                  fallback: 'Connect',
                  className: 'text-sm font-semibold text-black',
                },
                {
                  type: 'inline-group',
                  className:
                    'flex flex-wrap text-xs text-[#878787] font-poppins underline decoration-1 underline-offset-2',
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
                      path: 'personalDetails.items[0].links.behance.title',
                      href: 'personalDetails.items[0].links.behance.link',
                      condition: 'personalDetails.items[0].links.behance.link',
                      fallback: 'Behance',
                    },
                    {
                      type: 'link',
                      path: 'personalDetails.items[0].links.dribble.title',
                      href: 'personalDetails.items[0].links.dribble.link',
                      condition: 'personalDetails.items[0].links.dribble.link',
                      fallback: 'Dribbble',
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
      },
    },
    {
      id: 'header',
      type: 'header',
      column: 'right',
      className: 'flex flex-col gap-2 mb-10',
      fields: {
        nameTitle: {
          className: 'border-l-8 border-blue-600 pl-6 flex flex-col justify-center -ml-10 py-1',
        },
        name: {
          path: 'personalDetails.items[0].fullName',
          fallback: 'RICK TANG',
          className: 'text-[40px] font-semibold uppercase break-words text-black tracking-wide leading-tight',
        },
        title: {
          path: 'personalDetails.items[0].jobTitle',
          fallback: 'Digital Marketing Specialist',
          className: 'text-sm font-normal uppercase tracking-[0.2em] text-neutral-500 leading-tight ml-1',
        },
      },
    },

    /**
     * SUMMARY - Left Column (separate section for page breaking)
     */
    {
      id: 'summary',
      type: 'content-section',
      column: 'right',
      break: true,
      className: 'flex flex-col mb-3',
      heading: {
        path: 'professionalSummary.heading',
        fallback: 'Summary',
        className: 'text-base font-semibold text-black border-b-3 border-black w-fit mb-3 -mt-3 pb-1',
      },
      content: {
        type: 'html',
        path: 'personalDetails.items[0].description',
        fallback:
          'Digital Marketing Specialist with 6+ years of experience in online marketing, branding, and business strategy across music, media, and entertainment industries.',
        className: 'text-xs font-normal leading-tight whitespace-pre-wrap text-[#878787]',
      },
    },
    /**
     * EDUCATION - Right Column
     */
    {
      id: 'education',
      type: 'list-section',
      column: 'right',
      break: true,
      className: 'mb-3',
      heading: {
        path: 'education.heading',
        fallback: 'Education',
        className: 'text-base font-semibold text-black border-b-3 border-black w-fit mb-3 pb-1',
      },
      listPath: 'education.items',
      itemTemplate: {
        className: 'mb-4 flex flex-col',
        break: true,
        fields: [
          {
            type: 'horizontal-group',
            className: 'flex items-start ',
            items: [
              // Duration on left
              {
                type: 'duration',
                path: 'duration',
                className: 'text-xs text-black font-normal w-32 flex-shrink-0 pt-1',
              },
              // Content group on right
              {
                type: 'horizontal-group',
                className: 'flex items-start gap-2 flex-1 ml-4',
                items: [
                  // Blue Dot
                  {
                    type: 'text',
                    fallback: '●',
                    className: 'text-blue-600 text-xl leading-none flex-shrink-0 ',
                  },
                  // Vertical stack: Degree + Institution
                  {
                    type: 'group',
                    className: 'flex flex-col gap-0.5',
                    items: [
                      // Row 1: Degree + CGPA
                      {
                        type: 'horizontal-group',
                        className: 'flex items-center gap-2',
                        items: [
                          {
                            path: 'degree',
                            fallback: 'Bachelor of Design',
                            className: 'text-sm font-semibold text-black',
                          },
                          {
                            path: 'gpa',
                            fallback: '9.0 CGPA',
                            className: 'text-sm font-semibold text-black',
                          },
                        ],
                      },
                      // Row 2: Institution
                      {
                        path: 'institution',
                        fallback: 'National Institute of Design',
                        className: 'text-xs text-[#878787] font-normal',
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

    /**
     * PROFESSIONAL EXPERIENCE - Right Column
     */
    {
      id: 'experience',
      type: 'list-section',
      column: 'right',
      break: true,
      className: 'mb-3',
      heading: {
        path: 'experience.heading',
        fallback: 'Experience',
        className: 'text-base font-semibold text-black border-b-3 border-black w-fit mb-3  pb-1',
      },
      listPath: 'experience.items',
      itemTemplate: {
        className: 'mb-2 flex flex-col',
        break: true,
        fields: [
          // Row 1: Blue Dot + Position, Company
          {
            type: 'horizontal-group',
            className: 'flex items-center gap-2 -mb-1',
            items: [
              {
                type: 'text',
                fallback: '●',
                className: 'text-blue-600 text-xl leading-none flex-shrink-0 ',
              },
              {
                type: 'horizontal-group',
                separator: ', ',
                className: 'flex items-baseline gap-1',
                items: [
                  {
                    path: 'position',
                    fallback: 'Senior UX Designer',
                    className: 'text-sm font-semibold text-black',
                  },
                  {
                    path: 'company',
                    fallback: 'ORACLE',
                    className: 'text-sm font-semibold text-black',
                  },
                ],
              },
            ],
          },

          {
            type: 'duration',
            path: 'duration',
            className: 'text-xs text-black ml-5 font-poppins  ',
          },

          // Row 3: Description points
          {
            type: 'html',
            path: 'description',
            break: true,
            className:
              'text-[12px] text-[#878787] font-poppins leading-normal mt-1 ml-4 [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 whitespace-pre-wrap',
          },
        ],
      },
    },

    /**
     * SKILLS - Right Column
     */
    // {
    //   id: "skills",
    //   type: "inline-list-section",
    //   column: "right",
    //   showBullet: true,
    //   break: true,
    //   breakable: true,
    //   heading: {
    //     path: "skills.heading",
    //     fallback: "SKILLS",
    //     className:
    //       "text-sm font-bold text-neutral-900 uppercase tracking-wide mb-4 pb-2 border-b-2 border-[#D58D40] mt-2",
    //   },
    //   listPath: "skills.items",
    //   itemPath: "name",
    //   itemClassName: "text-xs text-neutral-900 inline-block",
    //   containerClassName: "grid grid-cols-2 gap-3",
    //   itemSeparator: "",
    // },

    {
      id: 'skills',
      type: 'inline-list-section',
      column: 'left',
      break: true,
      className: 'mb-4',
      heading: {
        path: 'skills.heading',
        fallback: 'Skills',
        className: 'text-base font-semibold text-black border-b-3 border-black w-fit mb-3 mt-2  pb-1',
      },
      listPath: 'skills.items',
      itemPath: 'name',
      showBullet: true,
      containerClassName: 'flex flex-col gap-1 mt-3',
      itemClassName: 'text-[12px] text-[#878787] font-poppins',
    },

    /**
     * PROJECTS - Right Column
     */
    {
      id: 'projects',
      type: 'list-section',
      column: 'right',
      break: true,
      className: 'mb-3',
      heading: {
        path: 'projects.heading',
        fallback: 'Projects',
        className: 'text-base font-semibold text-black border-b-3 border-black w-fit mb-3  pb-1',
      },
      listPath: 'projects.items',
      itemTemplate: {
        className: 'mb-2 flex flex-col',
        break: true,
        fields: [
          // Row 1: Blue Dot + Project Title
          {
            type: 'horizontal-group',
            className: 'flex items-center gap-2 -mb-1',
            items: [
              {
                type: 'text',
                fallback: '●',
                className: 'text-blue-600 text-xl leading-none flex-shrink-0 ',
              },
              {
                path: 'title',
                fallback: 'Project Title',
                className: 'text-[13px] font-bold text-black',
              },
            ],
          },

          // Row 2: Duration (indented)
          {
            type: 'duration',
            path: 'duration',
            className: 'text-xs text-black ml-7 font-poppins',
          },

          // Row 3: Description (indented)
          {
            type: 'html',
            path: 'description',
            break: true,
            className:
              'text-[12px] text-[#878787] font-poppins leading-normal mt-1 ml-7 [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 whitespace-pre-wrap',
          },
        ],
      },
    },

    {
      id: 'interests',
      type: 'inline-list-section',
      column: 'left',
      showBullet: true,
      break: true,
      breakable: true,
      heading: {
        path: 'interests.heading',
        fallback: 'Interests',
        className: 'text-base font-semibold text-black border-b-3 border-black w-fit mb-3 mt-2  pb-1',
      },
      listPath: 'interests.items[0].items',
      itemPath: '',
      containerClassName: 'flex flex-col gap-1 mt-3',
      itemClassName: 'text-[12px] text-[#878787] font-poppins',
    },

    /**
     * CERTIFICATIONS - Right Column
     */
    {
      id: 'certifications',
      type: 'list-section',
      column: 'left',
      break: true,
      heading: {
        path: 'certifications.heading',
        fallback: 'Certifications',
        className: 'text-base font-semibold text-black border-b-3 border-black w-fit  mt-4  mb-3  pb-1',
      },
      listPath: 'certifications.items',
      itemTemplate: {
        className: 'mb-4 flex flex-col',
        break: true,
        fields: [
          // Row 1: Title (left) | Duration (right)
          {
            type: 'horizontal-group',
            className: 'flex justify-between items-baseline gap-2',
            items: [
              {
                path: 'title',
                fallback: 'Certification Title',
                className: 'text-[13px] font-bold text-black leading-tight',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-xs text-black font-poppins',
              },
            ],
          },
          // Row 2: Issuer
          {
            path: 'issuer',
            fallback: 'Issuer',
            className: 'text-[12px] text-neutral-500  ',
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
      showBullet: true,
      break: true,
      breakable: true,
      heading: {
        path: 'achievements.heading',
        fallback: 'Achievements',
        className: 'text-base font-semibold text-black border-b-3 border-black w-fit mb-3 pb-1',
      },
      listPath: 'achievements.items[0].items',
      itemPath: '',
      containerClassName: 'flex flex-col gap-1 mt-3 leading-normal text-gray-500',
      itemClassName: 'text-[12px] text-gray-500 font-poppins',
    },
  ],
};

export default mohsinaTemplate12;
