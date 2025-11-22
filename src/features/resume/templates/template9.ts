const template9 = {
  name: 'Anmol Professional Two Column',

  page: {
    width: 794,
    height: 1122,
    padding: 24,
    background: '#ffffff',
    className: 'text-neutral-900 leading-relaxed',
    fontFamily: 'Roboto, sans-serif',
  },

  body: {
    id: 'body',
    type: 'container',
    className: 'flex flex-col gap-6',
    children: [
      // Header Section
      {
        type: 'list',
        id: 'personalDetails',
        pathWithFallback: { path: 'data.personalDetails.items' },
        className: 'flex flex-col gap-3 pb-2',
        presentation: [
          {
            id: 'header-section',
            type: 'container',
            className: 'flex flex-col items-start justify-center',
            break: true,
            children: [
              // Name
              {
                id: 'name-text',
                type: 'text',
                pathWithFallback: {
                  path: 'data.fullName',
                  fallback: 'ANMOL SAXENA',
                },
                className: 'text-5xl font-extrabold text-black tracking-tight',
              },
              // Job Title
              {
                id: 'job-title',
                type: 'text',
                pathWithFallback: {
                  path: 'data.jobTitle',
                  fallback: 'Software Architect | Backend Development',
                },
                className: 'text-base font-semibold text-blue-500 mt-1',
              },
              // Contact Information
              {
                id: 'contact-section',
                type: 'container',
                className: 'flex flex-row flex-wrap items-center gap-4 mt-2 text-sm text-neutral-900 font-bold',
                children: [
                  {
                    id: 'phone-container',
                    type: 'container',
                    className: 'flex flex-row items-center gap-1.5',
                    children: [
                      {
                        type: 'icon',
                        name: 'Phone',
                        className: 'w-3.5 h-3.5 text-blue-500',
                      },
                      {
                        id: 'phone-text',
                        type: 'text',
                        pathWithFallback: { path: 'data.phone', fallback: '+91-9781722033' },
                        className: 'text-sm',
                      },
                    ],
                  },
                  {
                    id: 'email-container',
                    type: 'container',
                    className: 'flex flex-row items-center gap-1.5',
                    children: [
                      {
                        type: 'icon',
                        name: 'Mail',
                        className: 'w-3.5 h-3.5 text-blue-500',
                      },
                      {
                        id: 'email-text',
                        type: 'text',
                        pathWithFallback: { path: 'data.email', fallback: 'anmolsaxena49@yahoo.com' },
                        className: 'text-sm',
                      },
                    ],
                  },
                  {
                    id: 'location-container',
                    type: 'container',
                    className: 'flex flex-row items-center gap-1.5',
                    children: [
                      {
                        type: 'icon',
                        name: 'MapPin',
                        className: 'w-3.5 h-3.5 text-blue-500',
                      },
                      {
                        id: 'location-text',
                        type: 'text',
                        pathWithFallback: { path: 'data.address', fallback: 'India' },
                        className: 'text-sm',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      // Main two-column layout
      {
        type: 'container',
        className: 'flex flex-row gap-10',
        children: [
          // Left Column - Main Content
          {
            type: 'container',
            className: 'flex flex-col gap-6 w-[485px]',
            children: [
              // Summary Section
              {
                type: 'container',
                className: 'flex flex-col',
                children: [
                  {
                    id: 'summary-heading',
                    type: 'text',
                    pathWithFallback: {
                      path: 'data.personDetails.title',
                      fallback: 'SUMMARY',
                    },
                    className: 'uppercase tracking-wide text-lg font-bold text-black',
                  },
                  {
                    type: 'seperator',
                    variant: 'line',
                    className: 'border-black border-t-3',
                  },
                  {
                    type: 'list',
                    id: 'professionalSummary',
                    pathWithFallback: { path: 'data.personalDetails.items' },
                    className: 'flex flex-col mt-3',
                    presentation: [
                      {
                        id: 'summary-text',
                        type: 'html',
                        pathWithFallback: {
                          path: 'data.description',
                          fallback:
                            'I am a software engineer with 8 years of backend engineering and leadership experience...',
                        },
                        className: 'text-sm text-neutral-900 text-justify',
                      },
                    ],
                  },
                ],
              },

              // Experience Section
              {
                id: 'experience-section',
                type: 'container',
                className: 'flex flex-col',
                break: true,
                children: [
                  {
                    id: 'experience-heading',
                    type: 'text',
                    pathWithFallback: {
                      path: 'data.experience.heading',
                      fallback: 'EXPERIENCE',
                    },
                    className: 'uppercase tracking-wide text-lg font-bold text-black',
                  },
                  {
                    type: 'seperator',
                    variant: 'line',
                    className: 'border-black border-t-3',
                  },
                  {
                    id: 'experience',
                    type: 'list',
                    pathWithFallback: { path: 'data.experience.items' },
                    className: 'flex flex-col mt-2',
                    presentation: [
                      {
                        type: 'container',
                        id: 'experience-item',
                        className:
                          'flex flex-col pb-5 mb-5 border-b-2 border-dashed border-neutral-300 last:border-0 last:pb-0 last:mb-0',
                        children: [
                          // Job Title
                          {
                            id: 'experience-role',
                            type: 'text',
                            pathWithFallback: { path: 'data.position' },
                            className: 'text-base font-bold text-neutral-900 mb-1',
                          },
                          // Company Name
                          {
                            id: 'experience-company',
                            type: 'text',
                            pathWithFallback: { path: 'data.company' },
                            className: 'text-blue-500 text-sm font-bold',
                          },
                          // Date and Location Row
                          {
                            type: 'container',
                            className: 'flex flex-row items-center gap-4 mt-1',
                            children: [
                              // Date with Calendar Icon
                              {
                                type: 'container',
                                className: 'flex flex-row items-center gap-1.5',
                                children: [
                                  {
                                    type: 'icon',
                                    name: 'Calendar',
                                    className: 'w-3.5 h-3.5 text-neutral-500',
                                  },
                                  {
                                    id: 'experience-period',
                                    type: 'duration',
                                    pathWithFallback: { path: 'data.duration' },
                                    className: 'text-neutral-900 text-sm font-normal',
                                  },
                                ],
                              },
                              // Location with Pin Icon
                              {
                                type: 'container',
                                className: 'flex flex-row items-center gap-1.5',
                                children: [
                                  {
                                    type: 'icon',
                                    name: 'MapPin',
                                    className: 'w-3.5 h-3.5 text-neutral-500',
                                  },
                                  {
                                    id: 'experience-location',
                                    type: 'text',
                                    pathWithFallback: { path: 'data.location' },
                                    className: 'text-sm text-neutral-900 font-normal',
                                  },
                                ],
                              },
                            ],
                          },
                          // Description/Bullets
                          {
                            id: 'experience-bullets',
                            type: 'html',
                            pathWithFallback: { path: 'data.description' },
                            className: 'text-sm text-neutral-900 leading-relaxed mt-1 whitespace-pre-wrap',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              {
                id: 'projects-section',
                type: 'container',
                className: 'flex flex-col',
                children: [
                  {
                    id: 'projects-heading',
                    type: 'text',
                    pathWithFallback: {
                      path: 'data.projects.title',
                      fallback: 'PROJECTS',
                    },
                    className: 'uppercase tracking-wide text-lg font-bold text-black',
                  },
                  {
                    type: 'seperator',
                    variant: 'line',
                    className: 'border-black border-t-3',
                  },
                  {
                    id: 'projects',
                    type: 'list',
                    pathWithFallback: { path: 'data.projects.items' },
                    className: 'flex flex-col mt-2',
                    presentation: [
                      {
                        type: 'container',
                        id: 'project-item',
                        className:
                          'flex flex-col pb-5 mb-5 border-b-2 border-dashed border-neutral-300 last:border-0 last:pb-0 last:mb-0',
                        children: [
                          // Project Title
                          {
                            id: 'project-title',
                            type: 'link',
                            pathWithFallback: { path: 'data.title' },
                            hrefPathWithFallback: { path: 'data.link.link', fallback: '' },
                            className: 'text-base font-bold text-neutral-900 mb-1 hover:underline',
                          },
                          // Duration Row
                          {
                            type: 'container',
                            className: 'flex flex-row items-center gap-4 mt-1',
                            children: [
                              // Date with Calendar Icon
                              {
                                type: 'container',
                                className: 'flex flex-row items-center gap-1.5',
                                children: [
                                  {
                                    type: 'icon',
                                    name: 'Calendar',
                                    className: 'w-3.5 h-3.5 text-neutral-500',
                                  },
                                  {
                                    id: 'project-period',
                                    type: 'duration',
                                    pathWithFallback: { path: 'data.duration' },
                                    className: 'text-neutral-900 text-sm font-normal',
                                  },
                                ],
                              },
                            ],
                          },
                          // Description/Bullets
                          {
                            id: 'project-description',
                            type: 'html',
                            pathWithFallback: { path: 'data.description' },
                            className: 'text-sm text-neutral-900 leading-relaxed mt-1 whitespace-pre-wrap',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },

          // Right Column - Sidebar
          {
            type: 'container',
            className: 'flex flex-col gap-6 w-[261px]',
            children: [
              // Key Achievements Section
              {
                id: 'key-achievements-section',
                type: 'container',
                className: 'flex flex-col',
                children: [
                  {
                    id: 'achievements-heading',
                    type: 'text',
                    pathWithFallback: {
                      path: 'data.achievements.heading',
                      fallback: 'KEY ACHIEVEMENTS',
                    },
                    className: 'uppercase tracking-wide text-lg font-bold text-black',
                  },
                  {
                    type: 'seperator',
                    variant: 'line',
                    className: 'border-black border-t-3',
                  },
                  {
                    id: 'achievements-list',
                    type: 'list',
                    pathWithFallback: { path: 'data.achievements.items' },
                    presentation: [
                      {
                        type: 'list',
                        pathWithFallback: { path: 'data.items' },
                        className: 'flex flex-col mt-3',
                        presentation: [
                          {
                            type: 'container',
                            className:
                              'flex flex-row items-start gap-3 pb-2 mb-2 border-b-2 border-dashed border-neutral-300 last:border-0 last:pb-0 last:mb-0',
                            children: [
                              // Diamond Icon
                              {
                                type: 'icon',
                                name: 'Crown',
                                className: 'w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5 fill-current',
                              },
                              {
                                type: 'container',
                                className: 'flex flex-col gap-1',
                                children: [
                                  // Achievement Text
                                  {
                                    type: 'text',
                                    className: 'text-sm text-neutral-700 leading-relaxed',
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              // Education Section
              {
                id: 'education-section',
                type: 'container',
                className: 'flex flex-col gap-2',
                children: [
                  {
                    id: 'education-heading',
                    type: 'text',
                    pathWithFallback: {
                      path: 'data.education.heading',
                      fallback: 'EDUCATION',
                    },
                    className: 'uppercase tracking-wide text-lg font-bold text-black',
                  },
                  {
                    type: 'seperator',
                    variant: 'line',
                    className: 'border-black border-t-3',
                  },
                  {
                    id: 'education',
                    type: 'list',
                    pathWithFallback: { path: 'data.education.items' },
                    className: 'flex flex-col mt-2',
                    presentation: [
                      {
                        type: 'container',
                        id: 'education-item',
                        className:
                          'flex flex-col pb-5 mb-5 border-b-2 border-dashed border-neutral-300 last:border-0 last:pb-0 last:mb-0',
                        children: [
                          // Job Title
                          {
                            id: 'education-degree',
                            type: 'text',
                            pathWithFallback: { path: 'data.degree' },
                            className: 'text-base font-bold text-neutral-900 mb-1',
                          },
                          // Company Name
                          {
                            id: 'education-school',
                            type: 'text',
                            pathWithFallback: { path: 'data.institution' },
                            className: 'text-blue-500 text-sm font-bold',
                          },
                          // Date and Location Row
                          {
                            type: 'container',
                            className: 'flex flex-row items-center gap-4 mt-1',
                            children: [
                              // Date with Calendar Icon
                              {
                                type: 'container',
                                className: 'flex flex-row items-center gap-1.5',
                                children: [
                                  {
                                    type: 'icon',
                                    name: 'Calendar',
                                    className: 'w-3.5 h-3.5 text-neutral-500',
                                  },
                                  {
                                    id: 'education-period',
                                    type: 'duration',
                                    pathWithFallback: { path: 'data.duration' },
                                    className: 'text-neutral-900 text-sm font-normal',
                                  },
                                ],
                              },
                              // Location with Pin Icon
                              {
                                type: 'container',
                                className: 'flex flex-row items-center gap-1.5',
                                children: [
                                  {
                                    type: 'icon',
                                    name: 'MapPin',
                                    className: 'w-3.5 h-3.5 text-neutral-500',
                                  },
                                  {
                                    id: 'education-location',
                                    type: 'text',
                                    pathWithFallback: { path: 'data.location', fallback: 'Patiala, Punjab' },
                                    className: 'text-sm text-neutral-900 font-normal',
                                  },
                                ],
                              },
                            ],
                          },
                          // Description/Bullets
                          {
                            id: 'education-bullets',
                            type: 'html',
                            pathWithFallback: { path: 'data.description' },
                            className: 'text-sm text-neutral-900 leading-relaxed mt-1',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              // Skills Section
              {
                id: 'skills-section',
                type: 'container',
                className: 'flex flex-col',
                children: [
                  {
                    id: 'skills-heading',
                    type: 'text',
                    pathWithFallback: {
                      path: 'data.skills.heading',
                      fallback: 'SKILLS',
                    },
                    className: 'uppercase tracking-wide text-lg font-bold text-black',
                  },
                  {
                    type: 'seperator',
                    variant: 'line',
                    className: 'border-black border-t-3',
                  },
                  {
                    id: 'skills-list',
                    type: 'list',
                    pathWithFallback: { path: 'data.skills.items' },
                    className: 'flex flex-wrap gap-x-6 gap-y-3 mt-3',
                    presentation: [
                      {
                        type: 'container',
                        className: 'flex flex-col w-fit',
                        children: [
                          {
                            type: 'text',
                            pathWithFallback: { path: 'data.name' },
                            className: 'text-sm font-semibold text-neutral-900 break-words',
                          },
                          {
                            type: 'seperator',
                            variant: 'line',
                            className: 'border-neutral-400 border-t-2 w-full',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },

              // Interests Section
              {
                id: 'interests-section',
                type: 'container',
                className: 'flex flex-col',
                children: [
                  {
                    id: 'interests-heading',
                    type: 'text',
                    pathWithFallback: {
                      path: 'data.interests.title',
                      fallback: 'INTERESTS',
                    },
                    className: 'uppercase tracking-wide text-lg font-bold text-black',
                  },
                  {
                    type: 'seperator',
                    variant: 'line',
                    className: 'border-black border-t-3',
                  },
                  {
                    id: 'interests-list',
                    type: 'list',
                    pathWithFallback: { path: 'data.interests.items' },
                    presentation: [
                      {
                        type: 'list',
                        pathWithFallback: { path: 'data.items' },
                        className: 'flex flex-wrap gap-2 mt-3',
                        presentation: [
                          {
                            type: 'text',
                            className: 'text-sm text-neutral-900 bg-blue-50 px-3 py-1 rounded-full',
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
                className: 'flex flex-col',
                children: [
                  {
                    id: 'certifications-heading',
                    type: 'text',
                    pathWithFallback: {
                      path: 'data.certifications.heading',
                      fallback: 'CERTIFICATIONS',
                    },
                    className: 'uppercase tracking-wide text-lg font-bold text-black',
                  },
                  {
                    type: 'seperator',
                    variant: 'line',
                    className: 'border-black border-t-3',
                  },
                  {
                    id: 'certifications-list',
                    type: 'list',
                    pathWithFallback: { path: 'data.certifications.items' },
                    className: 'flex flex-col mt-3 gap-4',
                    presentation: [
                      {
                        type: 'container',
                        className: 'flex flex-col gap-1',
                        children: [
                          {
                            type: 'text',
                            pathWithFallback: { path: 'data.title' },
                            className: 'text-sm font-bold text-neutral-900',
                          },
                          {
                            type: 'text',
                            pathWithFallback: { path: 'data.issuer' },
                            className: 'text-sm text-neutral-900',
                          },
                          {
                            type: 'duration',
                            pathWithFallback: { path: 'data.duration' },
                            className: 'text-sm text-neutral-500',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

export default template9;