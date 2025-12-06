// Flattened template structure with standard two-column layout

const template11 = {
  name: 'Dark Two Column Professional',

  page: {
    background: '#fff',
    className: 'text-black leading-relaxed',
    fontFamily: 'Lora',
  },

  columns: {
    spacing: '15px',
    left: {
      width: 'calc(100% - 200px)',
      className: 'px-6 pt-6 gap-3',
    },
    right: {
      width: '300px',
      className: 'p-6 pt-6 max-w-[200px]',
    },
  },

  sections: [
    // Header Section - Name and Title on one line
    {
      id: 'header-name-title',
      type: 'header',
      column: 'left',
      break: false,
      fields: {
        nameTitle: {
          className: 'flex flex-col items-baseline',
        },
        name: {
          path: 'personalDetails.items[0].fullName',
          fallback: 'Nina Patel',
          className: 'text-[24px] font-bold text-[#1E5A8E] leading-[1.2] whitespace-nowrap',
        },
        title: {
          path: 'personalDetails.items[0].jobTitle',
          fallback: 'UX Designer',
          className: 'text-[18px] font-semibold text-[#2B6CB0] leading-[1.2] mt-1',
        },
      },
    },

    // Description Section - Left Column
    {
      id: 'header-description',
      type: 'header',
      column: 'left',
      break: false,
      className: 'mb-[24px] border-b border-gray-500 pb-4',
      fields: {
        description: {
          path: 'personalDetails.items[0].description',
          fallback: 'description',
          className: 'text-sm leading-[1.6] text-[#4A4A4A]',
        },
      },
    },

    // Contact Section - Right Column (at top)
    {
      id: 'header-contact',
      type: 'header',
      column: 'right',
      break: false,
      className: 'mb-6',
      fields: {
        contact: {
          className: 'flex flex-col items-end text-right space-y-1',
          items: [
            {
              type: 'link',
              path: 'personalDetails.items[0].email',
              href: 'mailto:{{value}}',
              fallback: 'ninapatel@gmail.com',
              className: 'text-sm font-medium text-[#2B6CB0] leading-[1.21]',
            },
            {
              path: 'personalDetails.items[0].phone',
              fallback: '+91 432 2222 322',
              className: 'text-sm font-medium text-[#2B6CB0] leading-[1.21]',
            },
          ],
        },
      },
    },

    // Skills Section - Right Column (after contact)
    {
      id: 'skills',
      type: 'inline-list-section',
      column: 'right',
      showBullet: true,
      break: true,
      heading: {
        path: 'skills.heading',
        fallback: 'Skills',
        className: 'text-base font-bold text-[#1A1A1A] uppercase tracking-normal  mb-3 leading-[1.21]',
      },
      listPath: 'skills.items',
      itemPath: 'name',
      itemClassName: 'text-xs text-neutral-900 inline-block',
      containerClassName: 'grid grid-cols-1 gap-3',
    },

    // Work Experience Section - Left Column
    {
      id: 'experience',
      type: 'list-section',
      column: 'left',
      break: true,
      className: 'mt-4',
      heading: {
        path: 'experience.heading',
        fallback: 'Work Experience',
        className: 'text-base font-bold text-[#1A1A1A] tracking-normal uppercase leading-[1.21] mb-3',
      },
      listPath: 'experience.items',
      containerClassName: 'flex flex-col gap-4',
      itemTemplate: {
        className: 'flex flex-col',
        rows: [
          {
            className: 'flex flex-col leading-none',
            cells: [
              {
                type: 'inline-group',
                className: 'flex flex-row gap-2 items-center',
                items: [
                  {
                    path: 'company',
                    fallback: 'ABC Company',
                    className: 'text-base font-bold text-[#2B6CB0] leading-[1.21]',
                  },
                  {
                    path: 'position',
                    fallback: 'UX Design Intern',
                    className: 'text-sm font-normal text-[#1A1A1A] leading-[1.21]',
                  },
                ],
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[10px] uppercase tracking-[0.02em] italic text-[#6B7280] leading-[1.21]',
              },
            ],
          },
          {
            cells: [
              {
                type: 'html',
                path: 'description',
                className:
                  'text-sm leading-[1.6] text-[#4A4A4A] whitespace-pre-wrap [&_ul]:ml-3 [&_li]:list-disc [&_li]:mb-1',
              },
            ],
          },
        ],
      },
    },

    // Education Section - Left Column
    {
      id: 'education',
      type: 'list-section',
      column: 'left',
      break: true,
      className: 'mt-7',
      heading: {
        path: 'education.heading',
        fallback: 'Education',
        className: 'text-base font-bold text-[#1A1A1A] tracking-normal uppercase leading-[1.21] mt-2',
      },
      listPath: 'education.items',
      containerClassName: 'flex flex-col gap-3',
      itemTemplate: {
        className: 'flex flex-col gap-3',
        rows: [
          {
            className: 'flex flex-col leading-none',
            cells: [
              {
                type: 'inline-group',
                className: 'flex flex-col',
                items: [
                  {
                    path: 'institution',
                    fallback: 'University of Design',
                    className: 'text-base font-semibold text-[#2B6CB0]',
                  },
                  {
                    path: 'degree',
                    fallback: 'BSc(HCI)',
                    className: 'text-sm font-normal text-[#1A1A1A]',
                  },
                ],
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[10px] italic uppercase tracking-[0.02em] text-[#6B7280] leading-[1.21]',
              },
            ],
          },
          {
            cells: [
              {
                type: 'html',
                path: 'description',
                className:
                  'text-sm leading-[1.6] text-[#4A4A4A] whitespace-pre-wrap [&_ul]:ml-3 [&_li]:list-disc [&_li]:mb-1',
              },
            ],
          },
        ],
      },
    },

    // Projects Section - Left Column
    {
      id: 'projects',
      type: 'list-section',
      column: 'left',
      break: true,
      className: 'mt-7',
      heading: {
        path: 'projects.heading',
        fallback: 'Projects',
        className: 'text-base font-bold text-[#1A1A1A] tracking-normal uppercase leading-[1.21] mt-2',
      },
      listPath: 'projects.items',
      containerClassName: 'flex flex-col gap-3',
      itemTemplate: {
        className: 'flex flex-col gap-3',
        rows: [
          {
            className: 'flex flex-col leading-none',
            cells: [
              {
                type: 'inline-group',
                className: 'flex flex-row gap-2 items-center',
                items: [
                  {
                    path: 'title',
                    fallback: 'Project Title',
                    className: 'text-base font-bold text-[#2B6CB0] leading-[1.21]',
                  },
                ],
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[10px] uppercase tracking-[0.02em] italic text-[#6B7280] leading-[1.21]',
              },
            ],
          },
          {
            cells: [
              {
                type: 'html',
                path: 'description',
                className:
                  'text-sm leading-[1.6] text-[#4A4A4A] whitespace-pre-wrap [&_ul]:ml-3 [&_li]:list-disc [&_li]:mb-1',
              },
            ],
          },
          {
            cells: [
              {
                type: 'link',
                path: 'link.title',
                href: 'link.link',
                className: 'text-xs text-[#2B6CB0] hover:underline mt-1',
              },
            ],
          },
        ],
      },
    },

    // Certifications Section - Left Column
    {
      id: 'certifications',
      type: 'list-section',
      column: 'left',
      break: true,
      className: 'mt-7',
      heading: {
        path: 'certifications.heading',
        fallback: 'Certifications',
        className: 'text-base font-bold text-[#1A1A1A] tracking-normal uppercase leading-[1.21] mt-4',
      },
      listPath: 'certifications.items',
      containerClassName: 'flex flex-col gap-3',
      itemTemplate: {
        className: 'flex flex-col gap-3',
        rows: [
          {
            className: 'flex flex-col leading-none',
            cells: [
              {
                type: 'inline-group',
                className: 'flex flex-col',
                items: [
                  {
                    path: 'title',
                    fallback: 'Certification Title',
                    className: 'text-base font-semibold text-[#2B6CB0]',
                  },
                  {
                    path: 'issuer',
                    fallback: 'Issuer',
                    className: 'text-sm font-normal text-[#1A1A1A]',
                  },
                ],
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-[10px] italic uppercase tracking-[0.02em] text-[#6B7280] leading-[1.21]',
              },
            ],
          },
          {
            cells: [
              {
                type: 'link',
                path: 'link.title',
                href: 'link.link',
                className: 'text-xs text-[#2B6CB0] hover:underline',
              },
            ],
          },
        ],
      },
    },

    {
      id: 'interests',
      type: 'inline-list-section',
      column: 'right',
      showBullet: true,
      break: true,
      breakable: true,
      className: 'mt-7',
      heading: {
        path: 'interests.heading',
        fallback: 'Interests',
        className: 'text-base font-bold text-[#1A1A1A] uppercase tracking-normal mb-3 leading-[1.21] mt-4 -ml-1',
      },
      listPath: 'interests.items[0].items',
      itemPath: '',
      itemClassName: 'text-sm text-neutral-900 inline-block ml-4.5',
      containerClassName: 'grid grid-cols-1 gap-3',
    },

    // Achievements Section - Right Column
    {
      id: 'achievements',
      type: 'inline-list-section',
      column: 'right',
      showBullet: true,
      break: true,
      breakable: true,
      className: 'mt-7',
      heading: {
        path: 'achievements.heading',
        fallback: 'Achievements',
        className: 'text-base font-bold text-[#1A1A1A] uppercase tracking-normal mb-3 leading-[1.21] mt-4 -ml-2',
      },
      listPath: 'achievements.items[0].items',
      itemPath: '',
      itemClassName: 'text-sm text-neutral-900 inline-block',
      containerClassName: 'grid grid-cols-1 gap-3',
    },
  ],
};

export default template11;
