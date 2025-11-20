const brianWayneTemplate = {
  name: 'Brian Wayne Professional',

  page: {
    width: 794,
    height: 1122,
    padding: 0,
    background: '#ffffff',
    className: 'text-neutral-900 leading-relaxed',
    fontFamily: 'Calibri',
  },

  body: {
    id: 'body',
    type: 'container',
    className: 'flex flex-row h-full',
    children: [
      // Left Column - Dark Green Sidebar
      {
        type: 'container',
        className: 'w-[300px] bg-[rgb(56,76,65)] text-white p-8 flex flex-col gap-6',
        children: [
          // Header Section
          {
            type: 'list',
            id: 'personalDetails',
            pathWithFallback: { path: 'data.personalDetails.items' },
            className: 'flex flex-col gap-4',
            presentation: [
              {
                id: 'header-section',
                type: 'container',
                className: 'flex flex-col gap-3',
                children: [
                  // Name
                  {
                    id: 'name-text',
                    type: 'text',
                    pathWithFallback: {
                      path: 'data.fullName',
                      fallback: 'Brian T. Wayne',
                    },
                    className: 'text-2xl font-bold text-white',
                  },
                  // Title
                  //   {
                  //     id: 'title-text',
                  //     type: 'text',
                  //     pathWithFallback: {
                  //       path: 'data.personalDetails.items.0.title',
                  //       fallback: 'Business Development Consultant',
                  //     },
                  //     className: 'text-base font-normal text-white italic leading-tight',
                  //   },
                ],
              },
            ],
          },

          // Contact Information
          {
            type: 'container',
            className: 'flex flex-col gap-3 mt-4',
            children: [
              // Email
              {
                type: 'container',
                className: 'flex items-center gap-3',
                children: [
                  {
                    type: 'icon',
                    name: 'Mail',
                    size: 16,
                    className: 'text-white',
                  },
                  {
                    type: 'text',
                    pathWithFallback: { path: 'data.personalDetails.items.0.email', fallback: 'brian@wayne.com' },
                    className: 'text-sm text-white',
                  },
                ],
              },
              // Phone
              {
                type: 'container',
                className: 'flex items-center gap-3',
                children: [
                  {
                    type: 'icon',
                    name: 'Phone',
                    size: 16,
                    className: 'text-white',
                  },
                  {
                    type: 'text',
                    pathWithFallback: { path: 'data.personalDetails.items.0.phone', fallback: '12332344' },
                    className: 'text-sm text-white',
                  },
                ],
              },
              // Address
              {
                type: 'container',
                className: 'flex items-start gap-3',
                children: [
                  {
                    type: 'icon',
                    name: 'MapPin',
                    size: 16,
                    className: 'text-white mt-0.5',
                  },
                  {
                    type: 'text',
                    pathWithFallback: {
                      path: 'data.personalDetails.items.0.address',
                      fallback: '22611 Pacific Coast Hwy,\nMalibu, California, 9032, USA',
                    },
                    className: 'text-sm text-white leading-relaxed',
                  },
                ],
              },
              // LinkedIn
              {
                type: 'container',
                className: 'flex items-center gap-3',
                children: [
                  {
                    type: 'icon',
                    name: 'Linkedin',
                    size: 16,
                    className: 'text-white',
                  },
                  {
                    id: 'linkedin-text',
                    type: 'link',
                    pathWithFallback: {
                      path: 'data.links.linkedin.title',
                      fallback: 'linkedin',
                    },
                    hrefPathWithFallback: {
                      path: 'data.links.linkedin.link',
                      fallback: 'https://linkedin.com',
                    },
                    className: 'text-sm text-white hover:text-green-200',
                  },
                ],
              },
            ],
          },

          // Profile Section
          {
            type: 'container',
            className: 'flex flex-col gap-3 mt-6',
            children: [
              {
                id: 'profile-heading',
                type: 'text',
                pathWithFallback: {
                  path: 'data.personDetails.title',
                  fallback: 'Profile',
                },
                className: 'text-lg font-bold text-white border-b border-white pb-1',
              },
              {
                type: 'list',
                id: 'professionalSummary',
                pathWithFallback: { path: 'data.personalDetails.items' },
                className: 'mt-2',
                presentation: [
                  {
                    id: 'summary-text',
                    type: 'html',
                    pathWithFallback: {
                      path: 'data.description',
                      fallback: 'Summary',
                    },
                    className:
                      'text-sm text-white text-justify leading-relaxed [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 break-words whitespace-pre-wrap',
                  },
                ],
              },
            ],
          },

          // Education Section
          {
            id: 'education-section',
            type: 'container',
            className: 'flex flex-col gap-3 mt-6',
            children: [
              {
                id: 'education-heading',
                type: 'text',
                pathWithFallback: {
                  path: 'data.education.heading',
                  fallback: 'Education',
                },
                className: 'text-lg font-bold text-white border-b border-white pb-1',
              },
              {
                id: 'education',
                type: 'list',
                pathWithFallback: { path: 'data.education.items' },
                className: 'flex flex-col gap-4 mt-2',
                presentation: [
                  {
                    type: 'container',
                    id: 'education-item',
                    className: 'flex flex-col gap-1',
                    children: [
                      {
                        id: 'education-degree',
                        type: 'text',
                        pathWithFallback: { path: 'data.degree' },
                        className: 'text-sm font-bold text-white',
                      },
                      {
                        id: 'education-school',
                        type: 'text',
                        pathWithFallback: { path: 'data.institution' },
                        className: 'text-sm text-green-200 italic',
                      },
                      {
                        id: 'education-period-location',
                        type: 'container',
                        className: 'flex flex-col',
                        children: [
                          {
                            type: 'duration',
                            pathWithFallback: { path: 'data.duration' },
                            className: 'text-sm text-white',
                          },
                          {
                            type: 'text',
                            pathWithFallback: { path: 'data.location' },
                            className: 'text-sm text-white',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },

          // Languages Section
          {
            id: 'interests-section',
            type: 'container',
            className: 'flex flex-col gap-2',
            children: [
              {
                id: 'interests-heading',
                type: 'text',
                pathWithFallback: {
                  path: 'data.interests.title',
                  fallback: 'Interests',
                },
                className: 'capitalize text-lg font-bold border-b border-white pb-1',
              },
              {
                id: 'interests-list',
                type: 'list',
                pathWithFallback: { path: 'data.interests.items' },
                presentation: [
                  {
                    type: 'list',
                    className: 'flex flex-col gap-1',
                    pathWithFallback: { path: 'data.items' },
                    presentation: [
                      {
                        prefix: '• ',
                        type: 'text',
                        className: 'text-sm text-white',
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
            className: 'flex flex-col gap-2',
            children: [
              {
                id: 'achievements-heading',
                type: 'text',
                pathWithFallback: {
                  path: 'data.achievements.title',
                  fallback: 'Achievements',
                },
                className: 'capitalize text-lg font-bold border-b border-white pb-1',
              },
              {
                id: 'achievements-list',
                type: 'list',
                pathWithFallback: { path: 'data.achievements.items' },
                presentation: [
                  {
                    type: 'list',
                    className: 'flex flex-col gap-1',
                    pathWithFallback: { path: 'data.items' },
                    presentation: [
                      {
                        prefix: '• ',
                        type: 'text',
                        className: 'text-sm text-white',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      // Right Column - White Background
      {
        type: 'container',
        className: 'flex-1 p-8 flex flex-col gap-6',
        children: [
          // Professional Experience
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
                  fallback: 'Professional Experience',
                },
                className: 'text-xl font-semibold text-[rgb(56,76,65)] border-b-2 border-gray-800 pb-1',
              },
              {
                id: 'experience',
                type: 'list',
                pathWithFallback: { path: 'data.experience.items' },
                className: 'flex flex-col gap-6 mt-4',
                presentation: [
                  {
                    type: 'container',
                    id: 'experience-item',
                    className: 'flex flex-col',
                    children: [
                      // Position and Company on same line
                      {
                        type: 'container',
                        className: 'flex flex-row items-baseline gap-1',
                        children: [
                          {
                            id: 'experience-position',
                            type: 'text',
                            pathWithFallback: { path: 'data.position' },
                            className: 'text-base font-semibold text-[rgb(56,76,65)]',
                            suffix: ', ',
                          },
                          {
                            id: 'experience-company',
                            type: 'text',
                            pathWithFallback: { path: 'data.company' },
                            className: 'text-base text-[rgb(56,76,65)] italic',
                          },
                        ],
                      },
                      // Date and Location with pipe separator
                      {
                        type: 'container',
                        className: 'flex flex-row items-baseline gap-2',
                        children: [
                          {
                            id: 'experience-period',
                            type: 'duration',
                            pathWithFallback: { path: 'data.duration' },
                            className: 'text-sm text-[rgb(56,76,65)]',
                          },
                          { type: 'seperator', variant: 'pipe' },

                          {
                            id: 'experience-location',
                            type: 'text',
                            pathWithFallback: { path: 'data.location' },
                            className: 'text-sm text-[rgb(56,76,65)]',
                          },
                        ],
                      },
                      // Description
                      {
                        id: 'experience-bullets',
                        type: 'html',
                        pathWithFallback: { path: 'data.description' },
                        className:
                          'text-sm text-[rgb(56,76,65)] leading-relaxed [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 break-words whitespace-pre-wrap',
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
                  fallback: 'Projects',
                },
                className: 'capitalize text-xl font-semibold text-[rgb(56,76,65)] border-b-2 border-gray-800 pb-1',
              },
              {
                id: 'projects',
                type: 'list',
                pathWithFallback: { path: 'data.projects.items' },
                className: 'flex flex-col gap-6 mt-4',
                presentation: [
                  {
                    type: 'container',
                    id: 'project-item',
                    className: 'flex flex-col',
                    children: [
                      // Project Title
                      {
                        type: 'container',
                        className: 'flex flex-row items-baseline gap-2',
                        children: [
                          {
                            id: 'project-title',
                            type: 'link',
                            pathWithFallback: { path: 'data.title' },
                            hrefPathWithFallback: { path: 'data.link.link', fallback: '' },
                            className: 'text-base font-semibold text-[rgb(56,76,65)] hover:underline',
                          },
                        ],
                      },
                      // Duration
                      {
                        type: 'container',
                        className: 'flex flex-row items-baseline gap-2',
                        children: [
                          {
                            id: 'project-period',
                            type: 'duration',
                            pathWithFallback: { path: 'data.duration' },
                            className: 'text-sm text-[rgb(56,76,65)]',
                          },
                        ],
                      },
                      // Description
                      {
                        id: 'project-description',
                        type: 'html',
                        pathWithFallback: { path: 'data.description' },
                        className:
                          'text-sm text-[rgb(56,76,65)] leading-relaxed [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 break-words whitespace-pre-wrap',
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
            className: 'flex flex-col gap-4',
            children: [
              {
                id: 'skills-heading',
                type: 'text',
                pathWithFallback: {
                  path: 'data.skills.heading',
                  fallback: 'Skills',
                },
                className: 'text-xl font-semibold text-[rgb(56,76,65)] border-b-2 border-gray-800 pb-1',
              },
              {
                id: 'skills-list',
                type: 'list',
                pathWithFallback: { path: 'data.skills.items' },
                className: 'flex flex-col gap-2 mt-4',
                presentation: [
                  {
                    type: 'container',
                    id: 'skill-item',
                    className: 'flex items-start gap-2',
                    children: [
                      //   {
                      //     type: 'text',
                      //     text: '•',
                      //     className: 'text-[rgb(56,76,65)] font-bold',
                      //   },
                      {
                        prefix: '• ',
                        id: 'skill-name',
                        type: 'text',
                        pathWithFallback: { path: 'data.name' },
                        className: 'text-sm text-[rgb(56,76,65)]',
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
            className: 'flex flex-col gap-4',
            children: [
              {
                id: 'certifications-heading',
                type: 'text',
                pathWithFallback: {
                  path: 'data.certifications.title',
                  fallback: 'Certifications',
                },
                className: 'capitalize text-xl font-semibold text-[rgb(56,76,65)] border-b-2 border-gray-800 pb-1',
              },
              {
                type: 'list',
                id: 'certifications-list',
                pathWithFallback: { path: 'data.certifications.items' },
                className: 'flex flex-col gap-3 mt-4',
                presentation: [
                  {
                    type: 'container',
                    className: 'flex flex-col gap-1',
                    children: [
                      {
                        type: 'text',
                        pathWithFallback: {
                          path: 'data.title',
                          fallback: 'Certification Title',
                        },
                        className: 'text-sm font-semibold text-[rgb(56,76,65)]',
                      },
                      {
                        type: 'container',
                        className: 'flex flex-row items-baseline gap-1',
                        children: [
                          {
                            type: 'text',
                            pathWithFallback: {
                              path: 'data.issuer',
                              fallback: 'Issuer',
                            },
                            className: 'text-sm text-[rgb(56,76,65)] italic',
                            suffix: ', ',
                          },
                          {
                            type: 'duration',
                            pathWithFallback: { path: 'data.duration' },
                            className: 'text-sm text-[rgb(56,76,65)]',
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

export default brianWayneTemplate;
