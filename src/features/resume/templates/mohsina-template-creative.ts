// Flattened template structure with standard two-column layout

const mohsinaCreativeTemplate = {
  name: 'Creative',

  page: {
    background: '#ffffff',
    className: 'text-[#D03B00] leading-relaxed bg-[#FDF7E9]',
    padding: 0,
    fontFamily: 'Alexandria ,Inter',
  },

  columns: {
    spacing: '0px',
    left: {
      width: '260px',
      className: ' pt-[45px] pb-10  pl-10 flex flex-col gap-6',
    },
    right: {
      width: 'calc(100% - 260px)',
      className: 'pl-10 pt-10 pr-10 flex flex-col gap-[20px]',
    },
  },

  sections: [
    {
      id: 'profile-picture',
      type: 'header',
      column: 'left',
      className: 'flex flex-col items-center mb-6',
      fields: {
        container: {
          type: 'group',
          className:
            'flex flex-col items-center bg-[#D03B00] rounded-[0_106.6px] p-[29.315px_23.985px_34.795px_25.317px] self-stretch',
          items: [
            {
              type: 'image',
              path: 'personalDetails.items[0].profilePicturePublicUrl',
              className: 'w-[160px] h-[160px] object-cover rounded-full',
              alt: 'Profile image',
            },
          ],
        },
      },
    },
    {
      id: 'header',
      type: 'header',
      column: 'right',
      className: 'flex flex-col gap-0 mb-4 w-[450px]',
      fields: {
        name: {
          path: 'personalDetails.items[0].fullName',
          fallback: 'Divyam Malik',
          className: 'text-[36px] font-normal text-[#D03B00] leading-[36px] font-alexandria',
        },
        title: {
          path: 'personalDetails.items[0].jobTitle',
          fallback: 'Technical Lead, Sopra Steria',
          className: 'text-[36px] font-normal text-[#D03B00] leading-[36px] font-alexandria break-words',
        },
      },
    },

    // Contact Information - Left Column
    {
      id: 'contact',
      type: 'header',
      column: 'left',
      className: 'flex flex-col gap-2',
      heading: {
        path: 'contact.heading',
        fallback: 'CONTACT',
        className: 'text-[#D03B00] font-alexandria text-[12px] font-normal leading-[16px] uppercase tracking-wider ',
        divider: {
          variant: 'line',
          className: 'bg-[#D03B00] w-[225px] h-[0.5px] mt-1',
        },
      },
      fields: {
        contact: {
          type: 'contact-grid',
          className: 'flex flex-col gap-2',
          items: [
            // Phone
            {
              type: 'inline-group',
              className: 'flex flex-col',
              items: [
                {
                  path: 'personalDetails.items[0].phone',
                  fallback: '+918527886118',
                  className: 'text-[12px] font-inter font-medium uppercase text-[#D03B00] leading-[14px]',
                },
              ],
            },
            // Email
            {
              type: 'inline-group',
              className: 'flex flex-col -mt-1 ',
              items: [
                {
                  type: 'link',
                  path: 'personalDetails.items[0].email',
                  href: 'mailto:{{value}}',
                  fallback: 'divyam.malik@gmail.com',
                  className: 'text-[12px] font-inter font-medium uppercase text-[#D03B00] leading-[14px]',
                },
              ],
            },
            // Address
            {
              type: 'inline-group',
              className: 'flex flex-col -mt-1',
              items: [
                {
                  path: 'personalDetails.items[0].address',
                  fallback: 'Noida',
                  className: 'text-[12px] font-inter font-medium uppercase text-[#D03B00] leading-[10px]',
                },
              ],
            },
            // Socials - All on one line separated by /
            {
              type: 'inline-group -mt-1',
              className:
                'flex flex-wrap gap-x-1 items-center text-[12px] font-inter font-medium uppercase text-[#D03B00] leading-[14px]',
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
      },
    },

    // Education Section - Left Column
    {
      id: 'education',
      type: 'list-section',
      column: 'left',
      break: false,
      heading: {
        path: 'education.heading',
        fallback: 'EDUCATION',
        className:
          'text-[#D03B00] font-alexandria text-[12px] font-normal leading-[16px] uppercase tracking-wider -mb-2',
        divider: {
          variant: 'line',
          className: 'bg-[#D03B00] w-[225px] h-[0.266px] mt-1',
        },
      },
      listPath: 'education.items',
      containerClassName: 'flex flex-col gap-2 mt-4',
      itemTemplate: {
        className: 'flex flex-col gap-1',
        rows: [
          {
            cells: [
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[10px] font-inter font-normal uppercase text-[#D03B00]',
              },
            ],
          },
          {
            cells: [
              {
                path: 'degree',
                className:
                  'text-[14px] font-inter font-medium text-[#D03B00] leading-[16px] break-words block -mt-1 -mb-1',
              },
            ],
          },
          {
            cells: [
              {
                path: 'institution',
                prefix: '@',
                className: 'text-xs font-inter font-normal text-[#D03B00] leading-[10px] break-words',
              },
            ],
          },
        ],
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
        fallback: 'SKILLS',
        className:
          'text-[#D03B00] font-alexandria text-[12px] font-normal leading-[16px] uppercase tracking-wider -mb-2',
        divider: {
          variant: 'line',
          className: 'bg-[#D03B00] w-[225px] h-[0.266px] mt-1',
        },
      },

      listPath: 'skills.items',
      itemPath: 'name',
      containerClassName: 'flex flex-wrap gap-x-1 mt-4 text-[#D03B00]',
      badgeClassName: 'text-[12px] font-inter font-normal ',
      itemSeparator: '/',
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
        fallback: 'INTERESTS',
        className:
          'text-[#D03B00] font-alexandria text-[12px] font-normal leading-[16px] uppercase tracking-wider -mb-2',
        divider: {
          variant: 'line',
          className: 'bg-[#D03B00] w-[225px] h-[0.266px] mt-1',
        },
      },

      listPath: 'interests.items[0].items',
      itemPath: '',
      containerClassName: 'flex flex-col gap- mt-4',
      badgeClassName: 'text-[12px] font-inter font-normal uppercase text-[#D03B00] leading-tight',
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
        fallback: 'CERTIFICATIONS',
        className:
          'text-[#D03B00] font-alexandria text-[12px] font-normal leading-[16px] uppercase tracking-wider mb-3',
        divider: {
          variant: 'line',
          className: 'bg-[#D03B00] w-[225px] h-[0.266px] mt-1',
        },
      },
      listPath: 'certifications.items',
      containerClassName: 'flex flex-col gap-2 mt-4',
      itemTemplate: {
        className: 'flex flex-col gap-1',
        break: true,
        rows: [
          {
            cells: [
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[10px] font-inter font-normal uppercase text-[#D03B00]',
              },
            ],
          },
          {
            cells: [
              {
                path: 'title',
                fallback: 'Certification Title',
                className:
                  'text-[14px] font-inter font-medium text-[#D03B00] leading-[16px] break-words block -mt-1 -mb-1',
              },
            ],
          },
          {
            cells: [
              {
                path: 'issuer',
                prefix: '@',
                className: 'text-[12px] font-inter font-normal text-[#D03B00] leading-[16px] break-words',
              },
            ],
          },
        ],
      },
    },

    // RIGHT COLUMN CONTENT
    {
      id: 'summary',
      type: 'content-section',
      column: 'right',
      className: '',
      heading: {
        path: 'summary.heading',
        fallback: 'SUMMARY',
        className: 'text-[#D03B00] font-alexandria text-[12px] font-normal leading-[16px] uppercase tracking-wider',
      },
      divider: {
        variant: 'line',
        className: 'bg-[#D03B00] w-[225.192px] h-[0.266px] mt-1 mb-2',
      },
      content: {
        type: 'html',
        path: 'personalDetails.items[0].description',
        fallback: 'Versatile Full-Stack Software Engineer with 6+ years of hands-on experience...',
        className: 'text-[12px] text-[#D03B00] font-inter font-normal leading-[17px]',
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
        fallback: 'EXPERIENCE',
        className:
          'text-[#D03B00] font-alexandria text-[12px] font-normal leading-[16px] uppercase tracking-wider -mb-2',
        divider: {
          variant: 'line',
          className: 'bg-[#D03B00] w-[225.192px] h-[0.266px] mt-1',
        },
      },
      listPath: 'experience.items',
      containerClassName: 'flex flex-col gap-4 mt-4',
      itemTemplate: {
        className: 'flex flex-col gap-1',
        rows: [
          {
            cells: [
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[10px] font-inter font-normal uppercase text-[#D03B00] ',
              },
            ],
          },
          {
            cells: [
              {
                path: 'position',
                className:
                  'text-[14px] font-inter font-medium text-[#D03B00] leading-[16px] break-words  block -mb-1 -mt-1',
              },
            ],
          },
          {
            cells: [
              {
                path: 'company',
                prefix: '@',
                className: 'text-[14px] font-inter font-medium text-[#D03B00] leading-[10px] break-words ',
              },
            ],
          },
          {
            cells: [
              {
                type: 'html',
                path: 'description',
                className:
                  'text-[12px] font-inter text-[#D03B00] leading-relaxed [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 break-words mt-1 whitespace-pre-wrap',
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
      break: false,
      heading: {
        path: 'projects.heading',
        fallback: 'PROJECTS',
        className:
          'text-[#D03B00] font-alexandria text-[12px] font-normal leading-[16px] uppercase tracking-wider -mb-2',
        divider: {
          variant: 'line',
          className: 'bg-[#D03B00] w-[225.192px] h-[0.266px] mt-1 ',
        },
      },
      listPath: 'projects.items',
      containerClassName: 'flex flex-col gap-4 mt-3',
      itemTemplate: {
        className: 'flex flex-col gap-1',
        rows: [
          {
            cells: [
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[10px] font-inter font-normal uppercase text-[#D03B00]',
              },
            ],
          },
          {
            cells: [
              {
                path: 'title',
                className: 'text-[14px] font-inter font-medium text-[#D03B00] leading-[16px] break-words -mb-1',
              },
            ],
          },
          {
            cells: [
              {
                type: 'html',
                path: 'description',
                className:
                  'text-[12px] font-inter text-[#D03B00] leading-relaxed [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 break-words mt-1 whitespace-pre-wrap',
              },
            ],
          },
        ],
      },
    },

    // Achievements Section - Right Column
    {
      id: 'achievements',
      type: 'badge-section',
      column: 'right',
      break: false,
      heading: {
        path: 'achievements.heading',
        fallback: 'ACHIEVEMENTS',
        className:
          'text-[#D03B00] font-alexandria text-[12px] font-normal leading-[16px] uppercase tracking-wider -mb-2',
        divider: {
          variant: 'line',
          className: 'bg-[#D03B00] w-[225.192px] h-[0.266px] mt-1',
        },
      },
      listPath: 'achievements.items[0].items',
      itemPrefix: '• ',
      itemPath: '',
      containerClassName: 'flex flex-col gap-1 mt-4',
      badgeClassName: 'text-[12px] font-inter font-medium uppercase text-[#D03B00] leading-relaxed',
    },
  ],
};

export default mohsinaCreativeTemplate;
