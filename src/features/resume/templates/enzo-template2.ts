const enzoTemplate2 = {
  name: 'Kate Modern Professional',

  page: {
    width: 794,
    height: 1122,
    padding: 0,
    background: '#ffffff',
    className: 'leading-relaxed break-words whitespace-pre-wrap',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },

  sections: [
    // Header Section with Name, Title, Description and Contact Info
    {
      type: 'two-column-layout',
      className: 'flex flex-row justify-between gap-8 mb-3 pb-3 bg-gray-50 p-6',
      leftColumn: {
        className: 'min-w-0',
        sections: [
          {
            id: 'header-left',
            type: 'header',
            className: 'flex flex-col gap-1',
            fields: {
              name: {
                path: 'personalDetails.items[0].fullName',
                fallback: 'Kate Bishop',
                className: 'text-3xl font-bold',
              },
              title: {
                path: 'personalDetails.items[0].jobTitle',
                fallback: 'Product Designer',
                className: 'text-base text-blue-600 font-normal',
              },
            },
          },
          // Description under name and title
          {
            id: 'description',
            type: 'content-section',
            className: 'mt-2',
            content: {
              type: 'html',
              path: 'personalDetails.items[0].description',
              fallback:
                'Over 5 years of professional experience conducting UX research and designing interactive end-to-end user flows. I enjoy working in close collaboration with teams across technology, business and design.',
              className: 'text-xs leading-relaxed whitespace-pre-wrap break-words',
            },
          },
        ],
      },
      rightColumn: {
        className: 'flex-shrink-0',
        sections: [
          {
            id: 'contact-email',
            type: 'content-section',
            className: 'flex flex-col gap-1',
            content: {
              type: 'html',
              path: '',
              fallback: '<span class="text-xs font-medium text-gray-400">Email</span>',
              className: '',
            },
          },
          {
            id: 'contact-email-value',
            type: 'content-section',
            className: 'flex flex-col gap-1 mb-2',
            content: {
              type: 'html',
              path: 'personalDetails.items[0].email',
              fallback: 'kate.bishop@katedesign.com',
              className: 'text-xs font-bold break-all underline',
            },
          },
          {
            id: 'contact-linkedin',
            type: 'content-section',
            className: 'flex flex-col gap-1',
            content: {
              type: 'html',
              path: '',
              fallback: '<span class="text-xs font-medium text-gray-400">LinkedIn</span>',
              className: '',
            },
          },
          {
            id: 'contact-linkedin-value',
            type: 'content-section',
            className: 'flex flex-col gap-1 mb-2',
            content: {
              type: 'html',
              path: 'personalDetails.items[0].links.linkedin.title',
              fallback: 'linkedin.com/in/kate-bishop',
              className: 'text-xs font-bold break-all underline',
            },
          },
          {
            id: 'contact-phone',
            type: 'content-section',
            className: 'flex flex-col gap-1',
            content: {
              type: 'html',
              path: '',
              fallback: '<span class="text-xs font-medium text-gray-400">Phone</span>',
              className: '',
            },
          },
          {
            id: 'contact-phone-value',
            type: 'content-section',
            className: 'flex flex-col gap-1',
            content: {
              type: 'html',
              path: 'personalDetails.items[0].phone',
              fallback: '+46 98-765 43 21',
              className: 'text-xs font-bold break-all underline',
            },
          },
        ],
      },
    },

    // Two Column Layout for Experience (Left) and Skills + Education (Right)
    {
      type: 'two-column-layout',
      className: 'flex flex-row gap-8 px-6',
      leftColumn: {
        className: 'flex-1 min-w-0',
        sections: [
          // Work Experience Section
          {
            id: 'experience',
            type: 'list-section',
            heading: {
              path: 'experience.heading',
              fallback: 'Work experience',
              className: 'text-base font-semibold text-blue-600 mb-2',
            },
            listPath: 'experience.items',
            containerClassName: 'flex flex-col gap-3',
            itemTemplate: {
              className: 'flex flex-col',
              rows: [
                {
                  cells: [
                    {
                      path: 'position',
                      className: 'text-sm font-bold break-words',
                    },
                  ],
                },
                {
                  className: 'flex flex-row gap-2 items-center text-xs flex-wrap mb-1',
                  cells: [
                    {
                      path: 'company',
                      className: 'text-xs',
                    },
                    {
                      type: 'duration',
                      path: 'duration',
                      className: 'text-xs',
                    },
                  ],
                },
                {
                  cells: [
                    {
                      type: 'html',
                      path: 'description',
                      className:
                        'text-xs leading-relaxed whitespace-pre-wrap break-words [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-0.5',
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
      rightColumn: {
        className: 'flex-1 min-w-0',
        sections: [
          // Education & Learning Section
          {
            id: 'education',
            type: 'list-section',
            heading: {
              path: 'education.heading',
              fallback: 'Education & Learning',
              className: 'text-base font-semibold text-blue-600 mb-2',
            },
            listPath: 'education.items',
            containerClassName: 'flex flex-col gap-1',
            itemTemplate: {
              className: 'flex flex-col',
              rows: [
                {
                  cells: [
                    {
                      path: 'degree',
                      className: 'text-sm font-bold break-words',
                    },
                  ],
                },
                {
                  cells: [
                    {
                      path: 'institution',
                      className: 'text-xs break-words',
                    },
                  ],
                },
                {
                  className: 'flex flex-row items-center',
                  cells: [
                    {
                      type: 'duration',
                      path: 'duration',
                      className: 'text-xs',
                    },
                  ],
                },
              ],
            },
          },

          // Certifications/Additional Learning
          {
            id: 'certifications',
            type: 'list-section',
            className: 'mt-3',
            heading: {
              path: 'certifications.heading',
              fallback: '',
              className: 'text-sm font-bold mb-1',
            },
            listPath: 'certifications.items',
            containerClassName: 'flex flex-col gap-1',
            itemTemplate: {
              className: 'flex flex-col gap-0',
              rows: [
                {
                  cells: [
                    {
                      path: 'title',
                      className: 'text-sm font-bold break-words',
                    },
                  ],
                },
                {
                  cells: [
                    {
                      path: 'issuer',
                      className: 'text-xs italic break-words',
                    },
                  ],
                },
              ],
            },
          },

          // Skills Section
          {
            id: 'skills',
            type: 'content-section',
            className: 'mt-3',
            heading: {
              path: 'skills.heading',
              fallback: 'Skills',
              className: 'text-base font-semibold text-blue-600 mb-2',
            },
            content: {
              type: 'html',
              path: 'skills.description',
              fallback:
                'Business Analysis, UX Research, User Testing and Validation, Customer Journey Mapping, Information Architecture, Low- and High- Fidelity Wireframing, Prototyping, Interaction Design, Visual Design, Defining Product Specifications, Design System Development, Design Sprints, A/B Testing.',
              className: 'text-xs leading-relaxed whitespace-pre-wrap break-words',
            },
          },
        ],
      },
    },
  ],
};

export default enzoTemplate2;
