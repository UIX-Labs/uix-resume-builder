// Lauren Chen style template - Orange sidebar with white content area

const laurenChenTemplate = {
  name: 'Lauren Chen Professional',

  page: {
    width: 794,
    height: 1122,
    padding: 0,
    background: '#ffffff',
    className: 'text-neutral-900 leading-relaxed',
    fontFamily: 'Inter, sans-serif',
  },

  columns: {
    spacing: '0px',
    left: {
      width: '272px',
      className: 'bg-[#D58D40] text-white p-8 flex flex-col',
    },
    right: {
      width: 'calc(100% - 272px)',
      className: 'p-8 bg-white flex flex-col',
    },
  },

  sections: [
    /**
     * HEADER - Name and Title - Left Column
     */
    {
      id: 'header',
      type: 'header',
      column: 'left',
      className: 'flex flex-col gap-3 mb-6',
      fields: {
        name: {
          path: 'personalDetails.items[0].fullName',
          fallback: 'LAUREN CHEN',
          className: 'text-3xl font-bold text-white uppercase tracking-wider',
        },
        title: {
          path: 'personalDetails.items[0].jobTitle',
          fallback: 'DIGITAL MARKETING SPECIALIST',
          className: 'text-sm font-normal text-white uppercase tracking-wide mt-2',
        },
        contact: {
          type: 'contact-grid',
          className: 'flex flex-col mt-6',
          separator: '',
          items: [
            // Contact heading and info
            {
              type: 'inline-group',
              className: 'flex flex-col gap-3',
              separator: '',
              items: [
                {
                  type: 'container',
                  className: 'flex flex-col gap-3',
                  children: [
                    {
                      type: 'text',
                      fallback: 'CONTACT',
                      className: 'text-sm font-bold text-white uppercase tracking-wide border-b-2 border-white pb-1',
                    },
                  ],
                },
                {
                  type: 'inline-group-with-icon',
                  className: 'flex items-center gap-2',
                  items: [
                    { type: 'icon', name: 'Phone', size: 14, className: 'text-white' },
                    {
                      path: 'personalDetails.items[0].phone',
                      fallback: '(123) 456-7890',
                      className: 'text-xs text-white font-normal',
                    },
                  ],
                },
                {
                  type: 'inline-group-with-icon',
                  className: 'flex items-center gap-2',
                  items: [
                    { type: 'icon', name: 'Mail', size: 14, className: 'text-white' },
                    {
                      path: 'personalDetails.items[0].email',
                      fallback: 'lauren.chen@mail.com',
                      className: 'text-xs text-white font-normal',
                    },
                  ],
                },
                {
                  type: 'inline-group-with-icon',
                  className: 'flex items-center gap-2',
                  items: [
                    { type: 'icon', name: 'MapPin', size: 14, className: 'text-white' },
                    {
                      path: 'personalDetails.items[0].address',
                      fallback: '47 W 13th St., New York, NY 10011',
                      className: 'text-xs text-white font-normal',
                    },
                  ],
                },
                {
                  type: 'inline-group-with-icon',
                  className: 'flex items-center gap-2',
                  items: [
                    { type: 'icon', name: 'Linkedin', size: 14, className: 'text-white' },
                    {
                      type: 'link',
                      path: 'personalDetails.items[0].links.linkedin.title',
                      href: 'personalDetails.items[0].links.linkedin.link',
                      fallback: 'linkedin.com/in/lauren-chen',
                      className: 'text-xs text-white font-normal',
                    },
                  ],
                },
                {
                  type: 'inline-group-with-icon',
                  className: 'flex items-center gap-2',
                  items: [
                    { type: 'icon', name: 'Github', size: 14, className: 'text-white' },
                    {
                      type: 'link',
                      path: 'personalDetails.items[0].links.github.title',
                      href: 'personalDetails.items[0].links.github.link',
                      fallback: 'github.com/lauren-chen',
                      className: 'text-xs text-white font-normal',
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
      className: 'flex flex-col gap-3 mt-6',
      heading: {
        path: 'professionalSummary.heading',
        fallback: 'SUMMARY',
        className: 'text-sm font-bold text-white uppercase tracking-wide border-b-2 border-white pb-1',
      },
      content: {
        type: 'html',
        path: 'personalDetails.items[0].description',
        fallback:
          'Digital Marketing Specialist with 6+ years of experience in online marketing, branding, and business strategy across music, media, and entertainment industries.',
        className: 'text-xs text-white font-normal leading-relaxed whitespace-pre-wrap mt-3',
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
      heading: {
        path: 'experience.heading',
        fallback: 'PROFESSIONAL EXPERIENCE',
        className: 'text-sm font-bold text-neutral-900 uppercase tracking-wide border-b-2 border-[#D58D40] mb-4 pb-2',
      },
      divider: {
        variant: 'line',
        className: 'border-t-2 border-[#D58D40] mt-1 mb-4',
      },
      listPath: 'experience.items',
      itemTemplate: {
        className: 'mb-5 flex flex-col',
        fields: [
          {
            path: 'duration',
            type: 'duration',
            className: 'text-xs text-neutral-600 font-normal',
          },
          {
            path: 'position',
            fallback: 'Digital Marketing Specialist',
            className: 'text-sm font-bold text-neutral-900 mt-1',
          },
          {
            type: 'horizontal-group',
            className: 'flex gap-1 mt-0.5',
            items: [
              {
                path: 'company',
                fallback: 'Triangle Music Group',
                className: 'text-xs text-neutral-900 font-semibold',
              },
              {
                path: 'location',
                fallback: 'New York, NY',
                className: 'text-xs text-neutral-600',
              },
            ],
          },
          {
            type: 'html',
            path: 'description',
            className:
              'text-xs text-neutral-700 leading-relaxed mt-2 [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 whitespace-pre-wrap',
          },
        ],
      },
      containerClassName: 'space-y-3',
    },

    /**
     * EDUCATION - Right Column
     */
    {
      id: 'education',
      type: 'list-section',
      column: 'right',
      break: true,
      heading: {
        path: 'education.heading',
        fallback: 'EDUCATION',
        className: 'text-sm font-bold text-neutral-900 uppercase tracking-wide mb-4 pb-2 border-b-2 border-[#D58D40]',
      },
      divider: {
        variant: 'line',
        className: 'border-t-2 border-[#D58D40] mt-1 mb-4',
      },
      listPath: 'education.items',
      itemTemplate: {
        className: 'mb-3',
        fields: [
          {
            type: 'duration',
            path: 'duration',
            className: 'text-xs text-neutral-600',
          },
          {
            path: 'degree',
            fallback: 'Bachelor of Arts, Communications',
            className: 'text-sm font-bold text-neutral-900 mt-1',
          },
          {
            type: 'horizontal-group',
            separator: ', ',
            className: 'flex mt-0.5',
            items: [
              {
                path: 'institution',
                className: 'text-xs text-neutral-900 font-semibold',
              },
              {
                path: 'location',
                fallback: 'India',
                className: 'text-xs text-neutral-600',
              },
            ],
          },
        ],
      },
      containerClassName: 'space-y-3',
    },

    /**
     * SKILLS - Right Column
     */
    {
      id: 'skills',
      type: 'inline-list-section',
      column: 'right',
      showBullet: true,
      break: true,
      heading: {
        path: 'skills.heading',
        fallback: 'SKILLS',
        className: 'text-sm font-bold text-neutral-900 uppercase tracking-wide mb-4 pb-2 border-b-2 border-[#D58D40]',
      },
      listPath: 'skills.items',
      itemPath: 'name',
      itemClassName: 'text-xs text-neutral-900 inline-block',
      containerClassName: 'grid grid-cols-2 gap-3',
      itemSeparator: '',
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
        path: 'projects.title',
        fallback: 'PROJECTS',
        className: 'text-sm font-bold text-neutral-900 uppercase tracking-wide mb-4 pb-2 border-b-2 border-[#D58D40] mt-4',
      },
      divider: {
        variant: 'line',
        className: 'border-t-2 border-[#D58D40] mt-1 mb-4',
      },
      listPath: 'projects.items',
      itemTemplate: {
        className: 'mb-5 flex flex-col',
        fields: [
          {
            type: 'link',
            path: 'title',
            href: 'link.link',
            fallback: 'Project Title',
            className: 'text-sm font-bold text-neutral-900 hover:underline',
          },
          {
            type: 'duration',
            path: 'duration',
            className: 'text-xs text-neutral-600 font-normal mt-1',
          },
          {
            type: 'html',
            path: 'description',
            className:
              'text-xs text-neutral-700 leading-relaxed mt-2 [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 whitespace-pre-wrap',
          },
        ],
      },
      containerClassName: 'space-y-3',
    },

    /**
     * CERTIFICATIONS - Right Column
     */
    {
      id: 'certifications',
      type: 'list-section',
      column: 'right',
      break: true,
      heading: {
        path: 'certifications.title',
        fallback: 'CERTIFICATIONS',
        className: 'text-sm font-bold text-neutral-900 uppercase tracking-wide mb-4 pb-2 border-b-2 border-[#D58D40]',
      },
      divider: {
        variant: 'line',
        className: 'border-t-2 border-[#D58D40] mt-1 mb-4',
      },
      listPath: 'certifications.items',
      itemTemplate: {
        className: 'mb-3',
        fields: [
          {
            path: 'title',
            fallback: 'Certification Title',
            className: 'text-sm font-bold text-neutral-900',
          },
          {
            type: 'inline-group',
            className: 'flex flex-row items-baseline gap-1 leading-none mt-0.5',
            items: [
              {
                path: 'issuer',
                fallback: 'Issuer',
                className: 'text-xs text-neutral-900 font-semibold italic',
                suffix: ', ',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-xs text-neutral-600',
              },
            ],
          },
        ],
      },
      containerClassName: 'space-y-3',
    },

    /**
     * INTERESTS - Right Column
     */
    {
      id: 'interests',
      type: 'inline-list-section',
      column: 'right',
      showBullet: true,
      break: true,
      heading: {
        path: 'interests.title',
        fallback: 'INTERESTS',
        className:
          'text-sm font-bold text-neutral-900 uppercase tracking-wide mb-4 pb-2 border-b-2 border-[#D58D40] mt-4',
      },
      listPath: 'interests.items[0].items',
      itemPath: '',
      itemClassName: 'text-xs text-neutral-900 inline-block break-words',
      containerClassName: 'grid grid-cols-3 gap-3',
      itemSeparator: '',
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
      heading: {
        path: 'achievements.title',
        fallback: 'ACHIEVEMENTS',
        className:
          'text-sm font-bold text-neutral-900 uppercase tracking-wide mb-4 pb-2 border-b-2 border-[#D58D40] mt-4',
      },
      listPath: 'achievements.items[0].items',
      itemPath: '',
      itemClassName: 'text-xs text-neutral-900 inline-block',
      containerClassName: 'grid grid-cols-1 gap-3',
      itemSeparator: '',
    },
  ],
};

export default laurenChenTemplate;
