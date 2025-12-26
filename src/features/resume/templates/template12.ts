const template12 = {
  name: 'Tanushi Gupta Professional',

  page: {
    width: 794,
    height: 1122,
    padding: 0,
    background: '#ffffff',
    className: 'text-neutral-900 leading-relaxed',
    fontFamily: 'Arial, Helvetica, sans-serif',
  },

  sections: [
    // Two-column layout wrapper
    {
      id: 'main-content',
      type: 'two-column-layout',
      className: 'flex flex-row min-h-full',
      leftColumn: {
        className: 'w-[305px] bg-[#354B5E] text-white flex flex-col py-8 px-6',
        sections: [
          // Education Section
          {
            id: 'education',
            type: 'list-section',
            className: 'mb-8',
            heading: {
              path: 'education.heading',
              fallback: 'EDUCATION',
              className: 'text-[#E8957C] text-base font-bold tracking-wide uppercase mb-3',
            },
            listPath: 'education.items',
            containerClassName: 'flex flex-col gap-5',
            itemTemplate: {
              className: 'flex flex-col gap-1',
              fields: [
                {
                  path: 'degree',
                  className: 'text-white uppercase text-sm font-bold',
                },
                {
                  path: 'institution',
                  className: 'text-white text-sm font-normal break-words whitespace-normal leading-relaxed',
                },
                {
                  type: 'duration',
                  path: 'duration',
                  className: 'text-white text-sm font-normal',
                },
              ],
            },
          },

          // Skills Section
          {
            id: 'skills',
            type: 'list-section',
            className: 'mb-8',
            heading: {
              path: 'skills.heading',
              fallback: 'SKILLS',
              className: 'text-[#E8957C] text-base font-bold tracking-wide uppercase mb-3',
            },
            listPath: 'skills.items',
            containerClassName: 'flex flex-col gap-1',
            itemTemplate: {
              className: 'flex flex-col',
              fields: [
                {
                  path: 'name',
                  className: 'text-white text-sm font-normal leading-relaxed break-words whitespace-normal',
                },
              ],
            },
          },

          // Interests Section
          {
            id: 'interests',
            type: 'badge-section',
            className: 'mb-8',
            heading: {
              path: 'interests.title',
              fallback: 'INTERESTS',
              className: 'text-[#E8957C] uppercase text-base font-bold tracking-wide mb-3',
            },
            listPath: 'interests.items[0].items',
            itemPath: '',
            badgeClassName: 'text-white text-sm font-normal leading-relaxed break-words whitespace-normal',
            containerClassName: 'flex flex-col gap-1',
          },

          // Contact Section
          {
            id: 'contact',
            type: 'header',
            className: 'flex flex-col gap-3 mb-8',
            fields: {
              contact: {
                type: 'contact-grid',
                className: 'flex flex-col gap-3',
                heading: {
                  text: 'CONTACT',
                  className: 'text-[#E8957C] text-base font-bold tracking-wide uppercase mb-1',
                },
                items: [
                  {
                    type: 'inline-group-with-icon',
                    className: 'flex items-start gap-2',
                    items: [
                      {
                        type: 'icon',
                        name: 'Phone',
                        size: 16,
                        className: 'text-[#E8957C] mt-0.5 flex-shrink-0',
                      },
                      {
                        path: 'personalDetails.items[0].phone',
                        fallback: '+91-9756703490',
                        className: 'text-white text-sm font-normal break-words',
                      },
                    ],
                  },
                  {
                    type: 'inline-group-with-icon',
                    className: 'flex items-start gap-2',
                    items: [
                      {
                        type: 'icon',
                        name: 'Mail',
                        size: 16,
                        className: 'text-[#E8957C] mt-0.5 flex-shrink-0',
                      },
                      {
                        path: 'personalDetails.items[0].email',
                        fallback: 'guptadeepali1972@gmail.com',
                        className: 'text-white text-sm font-normal break-words',
                      },
                    ],
                  },
                ],
              },
            },
          },

          // Social Section
          {
            id: 'social',
            type: 'header',
            className: 'flex flex-col gap-3',
            fields: {
              contact: {
                type: 'contact-grid',
                className: 'flex flex-col gap-3',
                heading: {
                  text: 'SOCIAL',
                  className: 'text-[#E8957C] text-base font-bold tracking-wide uppercase mb-1',
                },
                items: [
                  {
                    type: 'inline-group-with-icon',
                    className: 'flex items-start gap-2',
                    items: [
                      {
                        type: 'icon',
                        name: 'Linkedin',
                        size: 16,
                        className: 'text-[#E8957C] mt-0.5 flex-shrink-0',
                      },
                      {
                        type: 'link',
                        path: 'personalDetails.items[0].links.linkedin.title',
                        href: 'personalDetails.items[0].links.linkedin.link',
                        fallback: 'LinkedIn',
                        className: 'text-white text-sm font-normal underline break-words',
                      },
                    ],
                  },
                  {
                    type: 'inline-group-with-icon',
                    className: 'flex items-start gap-2',
                    items: [
                      {
                        type: 'icon',
                        name: 'Github',
                        size: 16,
                        className: 'text-[#E8957C] mt-0.5 flex-shrink-0',
                      },
                      {
                        type: 'link',
                        path: 'personalDetails.items[0].links.github.title',
                        href: 'personalDetails.items[0].links.github.link',
                        fallback: 'GitHub',
                        className: 'text-white text-sm font-normal underline break-words',
                      },
                    ],
                  },
                ],
              },
            },
          },
        ],
      },
      rightColumn: {
        className: 'flex-1 flex flex-col gap-6',
        sections: [
          // Header Section with Peach Background (spans full width)
          {
            id: 'header',
            type: 'header',
            className: 'bg-[#E8A87C] px-8 py-12 flex flex-col justify-center gap-1',
            fields: {
              name: {
                path: 'personalDetails.items[0].fullName',
                fallback: 'Tanushi Gupta',
                className: 'text-4xl font-bold text-black tracking-normal leading-tight',
              },
              title: {
                path: 'personalDetails.items[0].jobTitle',
                fallback: 'Software Engineer',
                className: 'text-lg font-normal text-black',
              },
            },
          },
          // About Section
          {
            id: 'about',
            type: 'content-section',
            className: 'flex flex-col gap-2 px-6',
            heading: {
              path: 'about.heading',
              fallback: 'ABOUT',
              className: 'text-[#E8957C] text-base font-bold tracking-wide uppercase',
            },
            content: {
              type: 'html',
              path: 'personalDetails.items[0].description',
              fallback:
                'Mobile Developer experienced in building and maintaining scalable cross-platform applications using React Native for both iOS (Swift) and Android (Kotlin). Proven track record in delivering high-quality features, collaborating with product and design teams, and releasing apps in fast-paced, Agile environments. Expertise in architecting complex, testable solutions, optimizing performance, and integrating AI-powered experiences. Strong focus on customer impact, usability, and continual experimentation to empower users.',
              className: 'text-sm text-black leading-relaxed break-words whitespace-pre-wrap mt-2',
            },
          },

          // Work Experience Section
          {
            id: 'experience',
            type: 'list-section',
            heading: {
              path: 'experience.heading',
              fallback: 'WORK EXPERIENCE',
              className: 'text-[#E8957C] text-base font-bold tracking-wide uppercase px-6',
            },
            listPath: 'experience.items',
            containerClassName: 'flex flex-col gap-5 mt-3 px-6',
            itemTemplate: {
              className: 'flex flex-col gap-1',
              fields: [
                {
                  path: 'position',
                  className: 'text-[#E8957C] text-sm font-bold uppercase',
                },
                {
                  type: 'inline-group',
                  className: 'flex flex-row gap-2 items-baseline flex-wrap',
                  items: [
                    {
                      path: 'company',
                      className: 'text-black text-sm font-normal italic',
                    },
                    {
                      path: 'separator',
                      fallback: '|',
                      className: 'text-black text-sm font-normal',
                    },
                    {
                      type: 'duration',
                      path: 'duration',
                      className: 'text-black text-sm font-normal italic',
                    },
                  ],
                },
                {
                  type: 'html',
                  path: 'description',
                  className:
                    'text-sm text-black leading-relaxed [&_ul]:ml-5 [&_li]:list-disc [&_li]:mb-1 [&_strong]:font-bold break-words whitespace-pre-wrap mt-1',
                },
              ],
            },
          },

          // Projects Section
          {
            id: 'projects',
            type: 'list-section',
            heading: {
              path: 'projects.title',
              fallback: 'PROJECTS',
              className: 'text-[#E8957C] uppercase text-base font-bold tracking-wide px-6',
            },
            listPath: 'projects.items',
            containerClassName: 'flex flex-col gap-5 mt-3 px-6',
            itemTemplate: {
              className: 'flex flex-col gap-1',
              fields: [
                {
                  path: 'title',
                  fallback: 'CHATBOT',
                  className: 'text-black text-sm font-bold uppercase',
                },
                {
                  type: 'html',
                  path: 'description',
                  className:
                    'text-sm text-black leading-relaxed [&_ul]:ml-5 [&_li]:list-disc [&_li]:mb-1 [&_strong]:font-bold break-words whitespace-pre-wrap',
                },
              ],
            },
          },

          // Certifications Section
          {
            id: 'certifications',
            type: 'content-section',
            className: 'flex flex-col gap-2',
            heading: {
              path: 'certifications.title',
              fallback: 'CERTIFICATIONS',
              className: 'uppercase text-[#E8957C] text-base font-bold tracking-wide',
            },
            content: {
              type: 'html',
              path: 'certifications.items[0].title',
              fallback: '',
              className: 'text-sm text-black leading-relaxed mt-2',
            },
          },

          // Achievements Section
          {
            id: 'achievements',
            type: 'badge-section',
            heading: {
              path: 'achievements.title',
              fallback: 'ACHIEVEMENTS',
              className: 'uppercase text-[#E8957C] text-base font-bold tracking-wide',
            },
            listPath: 'achievements.items[0].items',
            itemPath: '',
            badgeClassName: 'text-sm text-black leading-relaxed',
            containerClassName: 'flex flex-col gap-2 mt-2',
            itemSeparator: '',
          },
        ],
      },
    },
  ],
};

export default template12;
