const template7 = {
  name: 'Simran Professional',

  page: {
    width: 794,
    height: 1122,
    padding: 0,
    background: '#ffffff',
    className: 'text-neutral-900 leading-relaxed',
    fontFamily: '"Lato", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },

  body: {
    id: 'body',
    type: 'container',
    className: 'flex flex-col',
    children: [
      // Header Section with Profile Photo and Info
      {
        type: 'list',
        id: 'personalDetails',
        pathWithFallback: { path: 'data.personalDetails.items' },
        className: 'flex flex-col',
        presentation: [
          {
            id: 'header-section',
            type: 'container',
            className: 'border-b border-black pt-6 pb-3 px-8',
            break: true,
            children: [
              // Profile Photo and Name Container
              {
                type: 'container',
                className: 'flex flex-row gap-6 items-start mb-3',
                children: [
                  {
                    type: 'container',
                    className: 'w-32 h-32 rounded-full bg-gray-200 shrink-0 overflow-hidden',
                    children: [
                      {
                        type: 'image',
                        pathWithFallback: {
                          path: 'data.profilePicturePublicUrl',
                          fallback: '',
                        },
                        className: 'w-full h-full object-cover',
                      },
                    ],
                  },
                  // Name and Description
                  {
                    type: 'container',
                    className: 'flex flex-col flex-1 gap-1',
                    children: [
                      {
                        id: 'name-text',
                        type: 'text',
                        pathWithFallback: {
                          path: 'data.fullName',
                          fallback: 'Simran Kaur Malhotra',
                        },
                        className: 'text-3xl font-bold text-[#4178B4]',
                      },
                      {
                        id: 'title-text',
                        type: 'text',
                        pathWithFallback: {
                          path: 'data.jobTitle',
                          fallback: 'Around 13 years of experience in Data Analysis and Data Management.',
                        },
                        className: 'text-base font-semibold text-gray-700',
                      },
                      {
                        id: 'summary-text',
                        type: 'html',
                        pathWithFallback: {
                          path: 'data.description',
                          fallback:
                            'A proactive learner with a flair for adopting emerging trends & addressing industry requirements to achieve organisational objectives. Excellent spoken & written communication skills, problem solving and leadership skills.',
                        },
                        className:
                          'text-sm text-gray-700 leading-relaxed text-justify [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 break-words',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },

      // Contact Information Bar
      {
        type: 'list',
        id: 'contactDetails',
        pathWithFallback: { path: 'data.personalDetails.items' },
        className: 'flex flex-col',
        presentation: [
          {
            id: 'contact-bar',
            type: 'container',
            className: 'border-b border-black py-3 pl-14 bg-gray-50',
            children: [
              {
                type: 'container',
                className: 'flex flex-row gap-8 items-center justify-start flex-wrap text-sm',
                children: [
                  // Email
                  {
                    type: 'container',
                    className: 'flex items-center gap-2',
                    children: [
                      {
                        type: 'icon',
                        name: 'Mail',
                        size: 16,
                        className: 'text-[#4178B4]',
                        fill: true,
                      },
                      {
                        type: 'text',
                        pathWithFallback: { path: 'data.email', fallback: 'simran.smjp@gmail.com' },
                        className: 'text-sm text-gray-800',
                      },
                    ],
                  },
                  // Phone
                  {
                    type: 'container',
                    className: 'flex items-center gap-2',
                    children: [
                      {
                        type: 'icon',
                        name: 'Phone',
                        size: 16,
                        className: 'text-[#4178B4]',
                        fill: true,
                      },
                      {
                        type: 'text',
                        pathWithFallback: { path: 'data.phone', fallback: '7042403591' },
                        className: 'text-sm text-gray-800',
                      },
                    ],
                  },
                  // Location
                  {
                    type: 'container',
                    className: 'flex items-center gap-2',
                    children: [
                      {
                        type: 'icon',
                        name: 'MapPin',
                        size: 16,
                        className: 'text-[#4178B4]',
                        fill: true,
                      },
                      {
                        type: 'text',
                        pathWithFallback: { path: 'data.address', fallback: 'Gurugram, India' },
                        className: 'text-sm text-gray-800',
                      },
                    ],
                  },
                  // LinkedIn
                  {
                    type: 'container',
                    className: 'flex items-center gap-2',
                    children: [
                      {
                        type: 'icon',
                        name: 'Linkedin',
                        size: 16,
                        className: 'text-[#4178B4]',
                        fill: true,
                      },
                      {
                        type: 'link',
                        pathWithFallback: {
                          path: 'data.links.linkedin.title',
                          fallback: 'linkedin.com/in/simran-malhotra-65760053',
                        },
                        hrefPathWithFallback: {
                          path: 'data.links.linkedin.link',
                          fallback: 'https://linkedin.com/in/simran-malhotra-65760053',
                        },
                        className: 'text-sm text-gray-800 hover:text-blue-600',
                      },
                    ],
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
        className: 'px-8 pb-6 pt-3 flex flex-col gap-3',
        children: [
          {
            id: 'skills-heading',
            type: 'text',
            pathWithFallback: {
              path: 'data.skills.heading',
              fallback: 'SKILLS',
            },
            className: 'text-xl font-bold text-[#4178B4] tracking-wider',
          },
          {
            id: 'skills-list',
            type: 'list',
            pathWithFallback: { path: 'data.skills.items' },
            className: 'flex flex-wrap gap-2.5',
            presentation: [
              {
                type: 'text',
                pathWithFallback: { path: 'data.name' },
                className: 'px-2 py-1 bg-[#8CAADB] text-white text-sm rounded',
              },
            ],
          },
        ],
      },

      // Technical Skills Section

      // Work Experience Section
      {
        id: 'experience-section',
        type: 'container',
        className: 'px-8 py-4 flex flex-col',
        break: true,
        children: [
          {
            id: 'experience-heading',
            type: 'text',
            pathWithFallback: {
              path: 'data.experience.heading',
              fallback: 'WORK EXPERIENCE',
            },
            className: 'text-xl font-bold text-[#4178B4] mb-2 tracking-wide',
          },
          {
            id: 'experience',
            type: 'list',
            pathWithFallback: { path: 'data.experience.items' },
            className: 'flex flex-col gap-2',
            presentation: [
              {
                type: 'container',
                id: 'experience-item',
                className: 'flex flex-col',
                children: [
                  // Job Title (Position)
                  {
                    id: 'experience-position',
                    type: 'text',
                    pathWithFallback: { path: 'data.position' },
                    className: 'text-lg font-bold text-gray-900',
                  },
                  // Company Name
                  {
                    id: 'experience-company',
                    type: 'text',
                    pathWithFallback: { path: 'data.company' },
                    className: 'text-base font-medium text-gray-900',
                  },
                  // Date and Location
                  {
                    type: 'container',
                    className: 'flex flex-row justify-between items-start',
                    children: [
                      {
                        id: 'experience-period',
                        type: 'duration',
                        pathWithFallback: { path: 'data.duration' },
                        className: 'text-sm text-gray-500 italic',
                      },
                      {
                        id: 'experience-location',
                        type: 'text',
                        pathWithFallback: { path: 'data.location' },
                        className: 'text-sm text-gray-500 italic',
                      },
                    ],
                  },
                  {
                    type: 'container',
                    className: 'flex gap-2',
                    children: [
                      {
                        id: 'experience-bullets',
                        type: 'html',
                        pathWithFallback: { path: 'data.description' },
                        className:
                          'text-sm text-gray-800 leading-relaxed [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 break-words',
                      },
                    ],
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
        className: 'px-8 py-4 flex flex-col',
        children: [
          {
            id: 'projects-heading',
            type: 'text',
            pathWithFallback: {
              path: 'data.projects.title',
              fallback: 'PROJECTS',
            },
            className: 'text-xl uppercase font-bold text-[#4178B4] mb-2 tracking-wide',
          },
          {
            id: 'projects',
            type: 'list',
            pathWithFallback: { path: 'data.projects.items' },
            className: 'flex flex-col gap-2',
            presentation: [
              {
                type: 'container',
                id: 'project-item',
                className: 'flex flex-col',
                children: [
                  // Project Title (as link)
                  {
                    id: 'project-title',
                    type: 'link',
                    pathWithFallback: { path: 'data.title' },
                    hrefPathWithFallback: { path: 'data.link.link', fallback: '' },
                    className: 'text-base font-medium text-gray-900',
                  },
                  // Duration
                  {
                    type: 'container',
                    className: 'flex flex-row justify-between items-start',
                    children: [
                      {
                        id: 'project-period',
                        type: 'duration',
                        pathWithFallback: { path: 'data.duration' },
                        className: 'text-sm text-gray-500 italic',
                      },
                    ],
                  },
                  // Description
                  {
                    id: 'project-description',
                    type: 'html',
                    pathWithFallback: { path: 'data.description' },
                    className:
                      'text-sm text-gray-800 leading-relaxed [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1 break-words',
                  },
                ],
              },
            ],
          },
        ],
      },

      // Interests section
      {
        id: 'interests-section',
        type: 'container',
        className: 'flex flex-col gap-2 px-8 py-4',
        children: [
          {
            id: 'interests-heading',
            type: 'text',
            pathWithFallback: {
              path: 'data.interests.title',
              fallback: 'Interests',
            },
            className: 'uppercase text-xl font-bold text-[#4178B4] tracking-wide',
          },
          {
            id: 'interests-list',
            type: 'list',
            pathWithFallback: { path: 'data.interests.items' },
            className: 'flex flex-row flex-wrap justify-between gap-4',
            presentation: [
              {
                type: 'list',
                className: 'flex flex-col flex-1 min-w-[45%]',
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

      //achivements section
      {
        id: 'achievements-section',
        type: 'container',
        className: 'flex flex-col gap-2 px-8 py-4',
        children: [
          {
            id: 'achievements-heading',
            type: 'text',
            pathWithFallback: {
              path: 'data.achievements.title',
              fallback: 'Achievements',
            },
            className: 'uppercase text-xl font-bold text-[#4178B4] tracking-wide',
          },
          {
            id: 'achievements-list',
            type: 'list',
            pathWithFallback: { path: 'data.achievements.items' },
            className: 'flex flex-row flex-wrap justify-between gap-4',
            presentation: [
              {
                type: 'list',
                className: 'flex flex-col flex-1 min-w-[45%]',
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

      // Certifications Section
      {
        id: 'certifications-section',
        type: 'container',
        className: 'flex flex-col gap-2 px-8 py-4',

        children: [
          {
            id: 'certifications-heading',
            type: 'text',
            pathWithFallback: {
              path: 'data.certifications.heading',
              fallback: 'CERTIFICATIONS',
            },
            className: 'uppercase text-xl font-bold text-[#4178B4] tracking-wide',
          },
          {
            type: 'list',
            id: 'certifications-list',
            pathWithFallback: { path: 'data.certifications.items' },
            className: 'flex flex-row flex-wrap justify-between gap-4',
            presentation: [
              {
                type: 'container',
                className: 'flex flex-col flex-1 min-w-[45%]',
                children: [
                  {
                    type: 'text',
                    pathWithFallback: {
                      path: 'data.title',
                      fallback: 'Certification Title',
                    },
                    className: 'text-sm font-bold text-gray-900',
                  },
                  {
                    type: 'text',
                    pathWithFallback: {
                      path: 'data.issuer',
                      fallback: 'Issuer',
                    },
                    className: 'text-sm text-gray-700',
                  },
                  {
                    type: 'duration',
                    pathWithFallback: { path: 'data.duration' },
                    className: 'text-sm text-gray-700',
                  },
                ],
              },
            ],
          },
        ],
      },

      //education section
      {
        id: 'education-section',
        type: 'container',
        className: 'flex flex-col gap-2 px-8 py-4',
        children: [
          {
            id: 'education-heading',
            type: 'text',
            pathWithFallback: {
              path: 'data.education.heading',
              fallback: 'EDUCATION',
            },
            className: 'text-xl font-bold text-[#4178B4] tracking-wide',
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
                    className: 'text-lg font-bold text-gray-900',
                  },
                  {
                    id: 'education-school',
                    type: 'text',
                    pathWithFallback: { path: 'data.institution' },
                    className: 'text-base text-gray-900',
                  },
                  {
                    type: 'container',
                    className: 'flex flex-row justify-between items-start',
                    children: [
                      {
                        id: 'education-period',
                        type: 'duration',
                        pathWithFallback: { path: 'data.duration' },
                        className: 'text-sm text-gray-500 italic',
                      },
                      {
                        id: 'education-location',
                        type: 'text',
                        pathWithFallback: { path: 'data.location' },
                        className: 'text-sm text-gray-500 italic',
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

export default template7
;