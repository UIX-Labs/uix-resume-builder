const template5 = {
  name: 'Brian Wayne Professional',

  page: {
    width: 794,
    height: 1122,
    padding: 0,
    background: '#ffffff',
    className: 'text-neutral-900 leading-relaxed',
    fontFamily: 'Merriweather, "PT Serif", Georgia, serif',
  },

  body: {
    id: 'body',
    type: 'container',
    className: 'flex flex-row h-full',
    children: [
      // Left Column - Dark Green Sidebar
      {
        type: 'container',
        className: 'w-[300px] bg-[#C9D6EC] text-white p-6 flex flex-col ',
        children: [
          // Header Section
          {
            type: 'list',
            id: 'personalDetails',
            pathWithFallback: { path: 'data.personalDetails.items' },
            className: 'flex flex-col gap-3',
            presentation: [
              {
                id: 'header-section',
                type: 'container',
                className: 'flex flex-col text-center',
                children: [
                  // Name
                  {
                    id: 'name-text',
                    type: 'text',
                    pathWithFallback: {
                      path: 'data.fullName',
                      fallback: 'Divyam Malik',
                    },
                    className: 'text-3xl font-bold text-[#1a1a1a]',
                  },
                  // Title
                  {
                    id: 'title-text',
                    type: 'text',
                    pathWithFallback: {
                      path: 'data.jobTitle',
                      fallback: 'Technical Lead, Sopra Steria',
                    },
                    className: 'text-lg font-normal text-[#1a1a1a]',
                  },
                ],
              },
            ],
          },

          // Contact Information
          {
            type: 'container',
            className: 'flex flex-col gap-1.5 mt-4 p-4 border border-[#5b7fc7] rounded-sm',
            children: [
              // Email
              {
                type: 'container',
                className: 'flex items-start gap-3',
                children: [
                  {
                    type: 'icon',
                    name: 'MapPin',
                    size: 18,
                    className: 'text-[#5b7fc7] mt-0.5',
                  },
                  {
                    type: 'text',
                    pathWithFallback: {
                      path: 'data.personalDetails.items.0.address',
                      fallback: 'Noida',
                    },
                    className: 'text-sm text-[#1a1a1a] font-normal',
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
                    size: 18,
                    className: 'text-[#5b7fc7]',
                  },
                  {
                    type: 'text',
                    pathWithFallback: { path: 'data.personalDetails.items.0.phone', fallback: '+918527886118' },
                    className: 'text-sm text-[#1a1a1a] font-normal underline',
                  },
                ],
              },
              // Email
              {
                type: 'container',
                className: 'flex items-center gap-3',
                children: [
                  {
                    type: 'icon',
                    name: 'Mail',
                    size: 18,
                    className: 'text-[#5b7fc7]',
                  },
                  {
                    type: 'text',
                    pathWithFallback: {
                      path: 'data.personalDetails.items.0.email',
                      fallback: 'divyam.malik@gmail.com',
                    },
                    className: 'text-sm text-[#1a1a1a] font-normal underline',
                  },
                ],
              },
            ],
          },

          // Profiles Section
          {
            type: 'container',
            className: 'flex flex-col gap-3 mt-6',
            pathWithFallback: { path: 'data.personalDetails.items' },
            children: [
              {
                id: 'profiles-heading',
                type: 'text',
                pathWithFallback: {
                  path: 'data.profiles.title',
                  fallback: 'Profiles',
                },
                className: 'text-base font-bold text-[#5b7fc7] border-b-1 border-[#5b7fc7]',
              },
              // LinkedIn Profile
              {
                type: 'container',
                className: 'flex items-center gap-2',
                children: [
                  {
                    type: 'icon',
                    name: 'Linkedin',
                    size: 20,
                    className: 'text-[#5b7fc7]',
                  },
                  {
                    id: 'linkedin-link',
                    type: 'link',
                    pathWithFallback: {
                      path: 'data.personalDetails.items.0.links.linkedin.title',
                      fallback: 'Divyam Malik',
                    },
                    hrefPathWithFallback: {
                      path: 'data.personalDetails.items.0.links.linkedin.link',
                      fallback: 'https://linkedin.com/in/divyam-malik',
                    },
                    className: 'text-base text-[#1a1a1a] font-normal underline',
                  },
                ],
              },
            ],
          },

          // Skills Section
          {
            id: 'skills-section',
            type: 'container',
            className: 'flex flex-col gap-3 mt-4',
            children: [
              {
                id: 'skills-heading',
                type: 'text',
                pathWithFallback: {
                  path: 'data.skills.heading',
                  fallback: 'Skills',
                },
                className: 'text-base font-bold text-[#5b7fc7] border-b-1 border-[#5b7fc7]',
              },
              {
                id: 'skills-list',
                type: 'list',
                pathWithFallback: { path: 'data.skills.items' },
                className: 'flex flex-col gap-4',
                presentation: [
                  {
                    type: 'container',
                    id: 'skill-category',
                    className: 'flex flex-col',
                    children: [
                      {
                        id: 'skill-name',
                        type: 'text',
                        pathWithFallback: { path: 'data.name' },
                        className: 'text-lg font-semibold text-[#1a1a1a]',
                      },
                      {
                        id: 'skill-level',
                        type: 'text',
                        pathWithFallback: { path: 'data.level' },
                        className: 'text-sm text-[#1a1a1a] font-normal',
                      },
                      //   {
                      //     id: 'skill-level-bar',
                      //     type: 'skillLevel',
                      //     pathWithFallback: { path: 'data.level' },
                      //   },
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
            className: 'flex flex-col gap-3 mt-4',
            children: [
              {
                id: 'certifications-heading',
                type: 'text',
                pathWithFallback: {
                  path: 'data.certifications.title',
                  fallback: 'Certifications',
                },
                className: 'capitalize text-base font-bold text-[#5b7fc7] border-b-1 border-[#5b7fc7]',
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
                        className: 'text-base font-bold text-[#1a1a1a]',
                      },
                      {
                        type: 'text',
                        pathWithFallback: {
                          path: 'data.issuer',
                          fallback: 'Issuer',
                        },
                        className: 'text-base text-[#1a1a1a] font-normal',
                      },
                    ],
                  },
                ],
              },
            ],
          },

          // Languages Section
          // Languages Section
          {
            id: 'interests-section',
            type: 'container',
            className: 'flex flex-col gap-3 mt-4',
            children: [
              {
                id: 'interests-heading',
                type: 'text',
                pathWithFallback: {
                  path: 'data.interests.title',
                  fallback: 'Interests',
                },
                className: 'capitalize text-base font-bold text-[#5b7fc7] border-b-1 border-[#5b7fc7]',
              },
              {
                id: 'interests-list',
                type: 'list',
                pathWithFallback: { path: 'data.interests.items' },
                presentation: [
                  {
                    type: 'list',
                    className: 'flex flex-col gap-2',
                    pathWithFallback: { path: 'data.items' },
                    presentation: [
                      {
                        type: 'text',
                        className: 'text-lg text-[#1a1a1a]',
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
                  fallback: 'Experience',
                },
                className: 'text-base font-semibold text-[rgb(56,76,65)] border-b-1 border-gray-800 pb-1',
              },
              {
                id: 'experience',
                type: 'list',
                pathWithFallback: { path: 'data.experience.items' },
                className: 'flex flex-col gap-6 -mt-2',
                presentation: [
                  {
                    type: 'container',
                    id: 'experience-item',
                    className: 'flex flex-col',
                    children: [
                      // Company name and date on same line
                      {
                        type: 'container',
                        className: 'flex flex-row justify-between items-baseline',
                        children: [
                          {
                            id: 'experience-company',
                            type: 'text',
                            pathWithFallback: { path: 'data.company' },
                            className: 'text-lg font-bold text-[rgb(0,0,0)]',
                          },
                          {
                            id: 'experience-period',
                            type: 'duration',
                            pathWithFallback: { path: 'data.duration' },
                            className: 'text-base font-bold text-[rgb(0,0,0)]',
                          },
                        ],
                      },
                      // Job title below company name
                      {
                        id: 'experience-position',
                        type: 'text',
                        pathWithFallback: { path: 'data.position' },
                        className: 'text-base font-normal text-[rgb(0,0,0)]',
                      },
                      // Description
                      {
                        id: 'experience-bullets',
                        type: 'html',
                        pathWithFallback: { path: 'data.description' },
                        className:
                          'text-base text-[rgb(0,0,0)] leading-relaxed [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 break-words mt-1 whitespace-pre-wrap',
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
                className: 'capitalize text-base font-semibold text-[rgb(56,76,65)] border-b-1 border-gray-800 pb-1',
              },
              {
                id: 'projects',
                type: 'list',
                pathWithFallback: { path: 'data.projects.items' },
                className: 'flex flex-col gap-6 -mt-2',
                presentation: [
                  {
                    type: 'container',
                    id: 'project-item',
                    className: 'flex flex-col',
                    children: [
                      // Project title and date on same line
                      {
                        type: 'container',
                        className: 'flex flex-row justify-between items-baseline',
                        children: [
                          {
                            id: 'project-title',
                            type: 'link',
                            pathWithFallback: { path: 'data.title' },
                            hrefPathWithFallback: { path: 'data.link.link', fallback: '' },
                            className: 'text-lg font-bold text-[rgb(0,0,0)] hover:underline',
                          },
                          {
                            id: 'project-period',
                            type: 'duration',
                            pathWithFallback: { path: 'data.duration' },
                            className: 'text-base font-bold text-[rgb(0,0,0)]',
                          },
                        ],
                      },
                      // Description
                      {
                        id: 'project-description',
                        type: 'html',
                        pathWithFallback: { path: 'data.description' },
                        className:
                          'text-base text-[rgb(0,0,0)] leading-relaxed [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 break-words mt-1 whitespace-pre-wrap',
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
            className: 'flex flex-col gap-4',
            children: [
              {
                id: 'education-heading',
                type: 'text',
                pathWithFallback: {
                  path: 'data.education.heading',
                  fallback: 'Education',
                },
                className: 'text-base font-semibold text-[rgb(56,76,65)] border-b-1 border-gray-800 pb-1',
              },
              {
                id: 'education',
                type: 'list',
                pathWithFallback: { path: 'data.education.items' },
                className: 'flex flex-col gap-6 -mt-2',
                presentation: [
                  {
                    type: 'container',
                    id: 'education-item',
                    className: 'flex flex-col',
                    children: [
                      // Institution name and date/degree column
                      {
                        type: 'container',
                        className: 'flex flex-row justify-between items-start',
                        children: [
                          {
                            id: 'education-school',
                            type: 'text',
                            pathWithFallback: { path: 'data.institution' },
                            className: 'text-base font-bold text-[rgb(0,0,0)] w-[300px]',
                          },
                          // Right column with date and degree
                          {
                            type: 'container',
                            className: 'flex flex-col items-end',
                            children: [
                              {
                                id: 'education-period',
                                type: 'duration',
                                pathWithFallback: { path: 'data.duration' },
                                className: 'text-base font-bold text-[rgb(0,0,0)]',
                              },
                              {
                                id: 'education-degree',
                                type: 'text',
                                pathWithFallback: { path: 'data.degree' },
                                className: 'text-sm font-normal text-[rgb(0,0,0)]',
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

          // Awards Section
          {
            id: 'achievements-section',
            type: 'container',
            className: 'flex flex-col gap-4',
            children: [
              {
                id: 'achievements-heading',
                type: 'text',
                pathWithFallback: {
                  path: 'data.achievements.title',
                  fallback: 'Achievements',
                },
                className: 'capitalize text-base font-semibold text-[rgb(56,76,65)] border-b-1 border-gray-800 pb-1',
              },
              {
                id: 'achievements-list',
                type: 'list',
                pathWithFallback: { path: 'data.achievements.items' },
                presentation: [
                  {
                    type: 'list',
                    className: 'flex flex-col gap-2',
                    pathWithFallback: { path: 'data.items' },
                    presentation: [
                      {
                        type: 'text',
                        className: 'text-base text-black',
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

export default template5
;
