const template6 = {
  name: 'Jay Rustogi Professional',

  page: {
    width: 794,
    height: 1122,
    padding: 0,
    background: '#ffffff',
    className: 'text-neutral-900 leading-relaxed',
    fontFamily: 'Arial, Helvetica, sans-serif',
  },

  body: {
    id: 'body',
    type: 'container',
    className: 'flex flex-row',
    children: [
      // Left Column - Dark Navy Sidebar
      {
        type: 'container',
        className: 'w-[270px] bg-[#1F3447] text-white flex flex-col pt-[232px] pb-8 pr-4',
        children: [
          // Education Section
          {
            id: 'education-section',
            type: 'container',
            className: 'flex flex-col gap-3 px-8 mb-8',
            children: [
              {
                id: 'education-heading',
                type: 'text',
                pathWithFallback: {
                  path: 'data.education.heading',
                  fallback: 'EDUCATION',
                },
                className: 'text-[#F2936F] text-base font-extrabold tracking-wider mb-2',
              },
              {
                id: 'education',
                type: 'list',
                pathWithFallback: { path: 'data.education.items' },
                className: 'flex flex-col gap-4',
                presentation: [
                  {
                    type: 'container',
                    id: 'education-item',
                    className: 'flex flex-col',
                    children: [
                      {
                        id: 'education-degree',
                        type: 'text',
                        pathWithFallback: { path: 'data.degree' },
                        className: 'text-[#F2936F] uppercase text-sm font-bold',
                      },
                      {
                        id: 'education-school',
                        type: 'text',
                        pathWithFallback: { path: 'data.institution' },
                        className: 'text-white text-sm font-normal break-words whitespace-normal',
                      },
                      {
                        id: 'education-period',
                        type: 'duration',
                        pathWithFallback: { path: 'data.duration' },
                        className: 'text-white text-sm font-normal break-words whitespace-normal',
                      },
                    ],
                  },
                ],
              },
            ],
          },

          //  Skills Section

          {
            id: 'skills-section',
            type: 'container',
            className: 'flex flex-col gap-3 px-8 mb-8',
            children: [
              {
                id: 'skills-heading',
                type: 'text',
                pathWithFallback: {
                  path: 'data.skills.heading',
                  fallback: 'SKILLS',
                },
                className: 'text-[#F2936F] text-base font-extrabold tracking-wider',
              },
              {
                id: 'skills-list',
                type: 'list',
                pathWithFallback: { path: 'data.skills.items' },
                className: 'flex flex-col',
                presentation: [
                  {
                    type: 'text',
                    pathWithFallback: { path: 'data.name' },
                    className: 'text-white text-sm font-normal leading-relaxed break-words whitespace-normal',
                  },
                ],
              },
            ],
          },

          // Interests Section
          {
            id: 'interests-section',
            type: 'container',
            className: 'flex flex-col gap-3 px-8 mb-8',
            children: [
              {
                id: 'interests-heading',
                type: 'text',
                pathWithFallback: {
                  path: 'data.interests.title',
                  fallback: 'INTERESTS',
                },
                className: 'text-[#F2936F] uppercase text-base font-extrabold tracking-wider',
              },
              {
                id: 'interests-list',
                type: 'list',
                pathWithFallback: { path: 'data.interests.items' },
                className: 'flex flex-col',
                presentation: [
                  {
                    type: 'list',
                    pathWithFallback: { path: 'data.items' },
                    className: 'flex flex-col',
                    presentation: [
                      {
                        type: 'text',
                        className: 'text-white text-sm font-normal leading-relaxed break-words whitespace-normal',
                      },
                    ],
                  },
                ],
              },
            ],
          },

          // Contact Section
          {
            type: 'container',
            className: 'flex flex-col gap-3 px-8 mb-8',
            children: [
              {
                id: 'contact-heading',
                type: 'text',
                pathWithFallback: {
                  path: 'data.contact.heading',
                  fallback: 'CONTACT',
                },
                className: 'text-[#F2936F] text-base font-extrabold tracking-wider mb-1',
              },
              {
                type: 'container',
                className: 'flex flex-col',
                children: [
                  {
                    type: 'text',
                    pathWithFallback: {
                      path: 'data.personalDetails.items.0.phone',
                      fallback: 'P: +91 99996 48417',
                    },
                    className: 'text-white text-sm font-normal break-words whitespace-normal',
                    prefix: 'P: ',
                  },
                  {
                    type: 'text',
                    pathWithFallback: {
                      path: 'data.personalDetails.items.0.email',
                      fallback: 'jay02rustogi@gmail.com',
                    },
                    className: 'text-white text-sm font-normal break-words whitespace-normal',
                    prefix: 'E: ',
                  },
                ],
              },
            ],
          },

          // Social Section
          {
            type: 'container',
            className: 'flex flex-col gap-3 px-8',
            children: [
              {
                id: 'social-heading',
                type: 'text',
                pathWithFallback: {
                  path: 'data.social.heading',
                  fallback: 'SOCIAL',
                },
                className: 'text-[#F2936F] text-base font-extrabold tracking-wider mb-2',
              },
              {
                type: 'container',
                className: 'flex flex-col gap-3',
                children: [
                  {
                    type: 'container',
                    className: 'flex items-center gap-2',
                    children: [
                      {
                        type: 'icon',
                        name: 'Linkedin',
                        size: 18,
                        className: 'text-[#F2936F]',
                      },
                      {
                        id: 'linkedin-link',
                        type: 'link',
                        pathWithFallback: {
                          path: 'data.personalDetails.items.0.links.linkedin.title',
                          fallback: 'linkedin.com/in/jay-rustogi',
                        },
                        hrefPathWithFallback: {
                          path: 'data.personalDetails.items.0.links.linkedin.link',
                          fallback: 'https://linkedin.com/in/jay-rustogi',
                        },
                        className: 'text-white text-sm font-normal underline break-words',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      // Right Column
      {
        type: 'container',
        className: 'flex-1 flex flex-col',
        children: [
          // Header Section with Peach Background
          {
            type: 'list',
            id: 'personalDetails',
            pathWithFallback: { path: 'data.personalDetails.items' },
            className: 'bg-[#F2936F] px-8 py-20 flex flex-col justify-center',
            presentation: [
              {
                id: 'header-section',
                type: 'container',
                className: 'flex flex-col gap-4',
                children: [
                  {
                    id: 'name-text',
                    type: 'text',
                    pathWithFallback: {
                      path: 'data.fullName',
                      fallback: 'JAY RUSTOGI',
                    },
                    className: 'text-4xl font-extrabold text-black tracking-wider',
                  },
                  {
                    id: 'title-text',
                    type: 'text',
                    pathWithFallback: {
                      path: 'data.jobTitle',
                      fallback: 'PRODUCT | GROWTH | STRATEGY',
                    },
                    className: 'text-sm font-normal text-black tracking-widest',
                  },
                ],
              },
            ],
          },

          // Content Area
          {
            type: 'container',
            className: 'flex-1 px-8 py-8 flex flex-col gap-6',
            children: [
              // About Section
              {
                type: 'container',
                className: 'flex flex-col gap-3 pb-6 -mx-8 px-8 border-b-4 border-[#E8A87C]',
                children: [
                  {
                    id: 'about-heading',
                    type: 'text',
                    pathWithFallback: {
                      path: 'data.about.heading',
                      fallback: 'ABOUT',
                    },
                    className: 'text-[#F2936F] text-base font-extrabold tracking-wider',
                  },
                  {
                    type: 'list',
                    id: 'about-summary',
                    pathWithFallback: { path: 'data.personalDetails.items' },
                    className: 'flex flex-col',
                    presentation: [
                      {
                        id: 'about-text',
                        type: 'html',
                        pathWithFallback: {
                          path: 'data.description',
                          fallback: 'About text',
                        },
                        className: 'text-sm text-black leading-relaxed break-words whitespace-pre-wrap',
                      },
                    ],
                  },
                ],
              },

              // Work Experience Section
              {
                id: 'experience-section',
                type: 'container',
                className: 'flex flex-col gap-4',
                children: [
                  {
                    id: 'experience-heading',
                    type: 'text',
                    pathWithFallback: {
                      path: 'data.experience.heading',
                      fallback: 'WORK EXPERIENCE',
                    },
                    className: 'text-[#F2936F] text-base font-extrabold tracking-wider',
                  },
                  {
                    id: 'experience',
                    type: 'list',
                    pathWithFallback: { path: 'data.experience.items' },
                    className: 'flex flex-col gap-6',
                    presentation: [
                      {
                        type: 'container',
                        id: 'experience-item',
                        className: 'flex flex-col gap-1',
                        children: [
                          // Position Title
                          {
                            id: 'experience-position',
                            type: 'text',
                            pathWithFallback: { path: 'data.position' },
                            className: 'text-[#F2936F] text-xs font-bold uppercase',
                          },
                          // Company and Duration
                          {
                            type: 'container',
                            className: 'flex flex-row gap-2 items-baseline',
                            children: [
                              {
                                id: 'experience-company',
                                type: 'text',
                                pathWithFallback: { path: 'data.company' },
                                className: 'text-black text-sm font-normal italic',
                              },
                              {
                                type: 'text',
                                pathWithFallback: { path: 'data.separator', fallback: '|' },
                                className: 'text-black text-sm font-normal',
                              },
                              {
                                id: 'experience-period',
                                type: 'duration',
                                pathWithFallback: { path: 'data.duration' },
                                className: 'text-black text-sm font-normal italic',
                              },
                            ],
                          },
                          // Company Type/Description (if applicable)
                          {
                            id: 'experience-type',
                            type: 'text',
                            pathWithFallback: {
                              path: 'data.companyType',
                              fallback: '',
                            },
                            className: 'text-black text-sm font-normal',
                          },
                          // Responsibilities/Achievements
                          {
                            id: 'experience-bullets',
                            type: 'html',
                            pathWithFallback: { path: 'data.description' },
                            className:
                              'text-sm text-black leading-relaxed [&_ul]:ml-5 [&_li]:list-disc [&_li]:mb-2 [&_strong]:font-bold break-words whitespace-pre-wrap',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              // Projects Section
              {
                id: 'projects-section',
                type: 'container',
                className: 'flex flex-col gap-4',
                children: [
                  {
                    id: 'projects-heading',
                    type: 'text',
                    pathWithFallback: {
                      path: 'data.projects.title',
                      fallback: 'PROJECTS',
                    },
                    className: 'text-[#F2936F] uppercase text-base font-extrabold tracking-wider',
                  },
                  {
                    id: 'projects',
                    type: 'list',
                    pathWithFallback: { path: 'data.projects.items' },
                    className: 'flex flex-col gap-6',
                    presentation: [
                      {
                        type: 'container',
                        id: 'project-item',
                        className: 'flex flex-col gap-1',
                        children: [
                          // Project Title (as link)
                          {
                            id: 'project-title',
                            type: 'link',
                            pathWithFallback: { path: 'data.title' },
                            hrefPathWithFallback: { path: 'data.link.link', fallback: '' },
                            className: 'text-black text-xs uppercase hover:underline',
                          },
                          // Duration
                          {
                            type: 'container',
                            className: 'flex flex-row gap-2 items-baseline',
                            children: [
                              {
                                id: 'project-period',
                                type: 'duration',
                                pathWithFallback: { path: 'data.duration' },
                                className: 'text-black text-sm font-normal italic',
                              },
                            ],
                          },
                          // Description
                          {
                            id: 'project-description',
                            type: 'html',
                            pathWithFallback: { path: 'data.description' },
                            className:
                              'text-sm text-black leading-relaxed [&_ul]:ml-5 [&_li]:list-disc [&_li]:mb-2 [&_strong]:font-bold break-words whitespace-pre-wrap',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              // Certifications Section
              {
                id: 'certifications-section',
                type: 'container',
                className: 'flex flex-col gap-3',
                children: [
                  {
                    id: 'certifications-heading',
                    type: 'text',
                    pathWithFallback: {
                      path: 'data.certifications.title',
                      fallback: 'CERTIFICATIONS',
                    },
                    className: 'uppercase text-[#F2936F] text-base font-extrabold tracking-wider',
                  },
                  {
                    type: 'list',
                    id: 'certifications-list',
                    pathWithFallback: { path: 'data.certifications.items' },
                    className: 'flex flex-col gap-3',
                    presentation: [
                      {
                        type: 'container',
                        className: 'flex flex-col',
                        children: [
                          {
                            type: 'text',
                            pathWithFallback: {
                              path: 'data.title',
                              fallback: 'Certification Title',
                            },
                            className: 'text-sm text-black',
                          },
                          {
                            type: 'text',
                            pathWithFallback: {
                              path: 'data.issuer',
                              fallback: 'Issuer',
                            },
                            className: 'text-sm text-black',
                          },
                          {
                            type: 'duration',
                            pathWithFallback: { path: 'data.duration' },
                            className: 'text-sm text-black italic',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              // Achievements Section
              {
                id: 'achievements-section',
                type: 'container',
                className: 'flex flex-col gap-3',
                children: [
                  {
                    id: 'achievements-heading',
                    type: 'text',
                    pathWithFallback: {
                      path: 'data.achievements.title',
                      fallback: 'ACHIEVEMENTS',
                    },
                    className: 'uppercase text-[#F2936F] text-base font-[900] tracking-wider',
                  },
                  {
                    id: 'achievements-list',
                    type: 'list',
                    pathWithFallback: { path: 'data.achievements.items' },
                    presentation: [
                      {
                        type: 'list',
                        className: 'flex flex-col',
                        pathWithFallback: { path: 'data.items' },
                        presentation: [
                          {
                            type: 'text',
                            className: 'text-sm text-black',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              // Skills Section (if needed in right column)
            ],
          },
        ],
      },
    ],
  },
};

export default template6;
