const enzoTemplate3 = {
  name: 'Kate Creative',

  page: {
    width: 794,
    height: 1122,
    background: '#ffffff',
    className: 'leading-relaxed break-words whitespace-pre-wrap',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },

  columns: {
    spacing: '0px',
    left: {
      width: '65%',
    },
    right: {
      width: '35%',
    },
  },

  sections: [
    // --- HEADER BANNER ---
    {
      id: 'header-banner',
      type: 'banner',
      className: 'flex flex-col justify-center bg-[#F0F8FF] px-8 py-8',
      fields: {
        container: {
          type: 'group',
          className: 'flex flex-row justify-between items-start w-full',
          items: [
            // Name, Image and Summary
            {
              type: 'group',
              className: 'flex flex-col gap-3 pt-1 max-w-[60%]',
              items: [
                {
                  type: 'group',
                  className: 'flex flex-row items-start gap-4',
                  items: [
                    {
                      type: 'image',
                      path: 'personalDetails.items[0].profilePicturePublicUrl',
                      fallback: 'https://avatar.iran.liara.run/public',
                      className: 'w-24 h-24 rounded-full object-cover bg-white flex-shrink-0',
                    },
                    {
                      type: 'group',
                      className: 'flex flex-col gap-1',
                      items: [
                        {
                          type: 'text',
                          path: 'personalDetails.items[0].fullName',
                          fallback: 'Bhavya Saggi',
                          className: 'text-3xl font-bold text-slate-900 leading-none',
                        },
                        {
                          type: 'text',
                          path: 'personalDetails.items[0].jobTitle',
                          fallback: 'Product Designer',
                          className: 'text-base text-blue-600 font-medium',
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'html',
                  path: 'personalDetails.items[0].description',
                  fallback:
                    'Strategic thinker with hands-on skills. Passionate about fostering engineering excellence, building inclusive teams, and aligning technology with business goals.',
                  className: 'text-xs text-slate-700 leading-relaxed',
                },
              ],
            },
            // Contact Info
            {
              type: 'group',
              className: 'flex flex-col gap-3 items-end',
              items: [
                // Email
                {
                  type: 'group',
                  className: 'flex flex-col gap-0.5 items-end',
                  items: [
                    {
                      type: 'text',
                      fallback: 'Email',
                      className: 'text-[10px] font-medium text-slate-400 uppercase tracking-wide text-right',
                    },
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].email',
                      fallback: 'bhavya.saggi@gmail.com',
                      className: 'text-xs font-bold text-slate-900 underline decoration-slate-300 underline-offset-2 break-all',
                    },
                  ],
                },
                // LinkedIn
                {
                  type: 'group',
                  className: 'flex flex-col gap-0.5 items-end',
                  items: [
                    {
                      type: 'text',
                      fallback: 'LinkedIn',
                      className: 'text-[10px] font-medium text-slate-400 uppercase tracking-wide text-right',
                    },
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].links.linkedin.title',
                      fallback: 'LinkedIn',
                      className: 'text-xs font-bold text-slate-900 underline decoration-slate-300 underline-offset-2 break-all',
                    },
                  ],
                },
                // Phone
                {
                  type: 'group',
                  className: 'flex flex-col gap-0.5 items-end',
                  items: [
                    {
                      type: 'text',
                      fallback: 'Phone',
                      className: 'text-[10px] font-medium text-slate-400 uppercase tracking-wide text-right',
                    },
                    {
                      type: 'text',
                      path: 'personalDetails.items[0].phone',
                      fallback: '+91 9953439451',
                      className: 'text-xs font-bold text-slate-900 underline decoration-slate-300 underline-offset-2',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    },

    // --- BODY LEFT (Experience) ---
    {
      id: 'experience',
      type: 'list-section',
      column: 'left',
      break: true,
      className: 'pl-6 pt-8',
      heading: {
        path: 'experience.heading',
        fallback: 'Work experience',
        className: 'text-base font-bold text-[#3B82F6] pt-4',
      },
      listPath: 'experience.items',
      containerClassName: 'flex flex-col gap-6',
      itemTemplate: {
        className: 'flex flex-col gap-1 my-2',
        rows: [
          {
            cells: [
              {
                path: 'position',
                className: 'text-sm font-bold text-slate-900 pt-4',
              },
            ],
          },
          {
            className: 'flex flex-row flex-wrap gap-2 items-center text-xs mb-1',
            cells: [
              {
                path: 'company',
                className: 'font-medium text-slate-700',
              },
              {
                type: 'duration',
                path: 'duration',
                className: 'text-slate-500',
              },
            ],
          },
          {
            cells: [
              {
                type: 'html',
                path: 'description',
                className:
                  'text-xs text-slate-600 leading-relaxed whitespace-pre-wrap break-words [&_ul]:ml-4 [&_li]:list-disc [&_li]:mb-1',
              },
            ],
          },
        ],
      },
    },

    // --- BODY RIGHT (Education, Skills) ---
    {
      id: 'education',
      type: 'list-section',
      column: 'right',
      break: true,
      className: 'pl-6 pt-8',
      heading: {
        path: 'education.heading',
        fallback: 'Education & Learning',
        className: 'text-base font-bold text-[#3B82F6] pt-4 pl-4',
      },
      listPath: 'education.items',
      containerClassName: 'flex flex-col gap-6',
      itemTemplate: {
        className: 'flex flex-col pl-4 pt-2',
        rows: [
          {
            cells: [
              {
                path: 'degree',
                className: 'text-sm font-bold text-slate-900',
              },
            ],
          },
          {
            cells: [
              {
                path: 'institution',
                className: 'text-xs text-slate-700',
              },
            ],
          },
          {
            className: 'flex flex-row items-center',
            cells: [
              {
                type: 'duration',
                path: 'duration',
                className: 'text-xs text-slate-500 italic',
              },
            ],
          },
        ],
      },
    },

    {
      id: 'certifications',
      type: 'list-section',
      column: 'right',
      break: true,
      className: 'pl-6 mt-6',
      heading: {
        path: 'certifications.heading',
        fallback: 'Certifications',
        className: 'text-base font-bold text-[#3B82F6] pl-4 pt-4',
      },
      listPath: 'certifications.items',
      containerClassName: 'flex flex-col gap-6',
      itemTemplate: {
        className: 'flex flex-col gap-1 pl-4',
        rows: [
          {
            cells: [
              {
                path: 'title',
                className: 'text-xs text-slate-900',
              },
            ],
          },
          {
            cells: [
              {
                path: 'issuer',
                className: 'text-xs italic text-slate-700',
              },
            ],
          },
        ],
      },
    },

    {
      id: 'skills',
      type: 'content-section',
      column: 'right',
      className: 'pl-4 mt-4',
      heading: {
        path: 'skills.heading',
        fallback: 'Skills',
        className: 'text-base font-bold text-[#3B82F6]',
      },
      content: {
        type: 'html',
        path: 'skills.description',
        fallback:
          'Business Analysis, UX Research, User Testing and Validation, Customer Journey Mapping, Information Architecture...',
        className: 'text-xs text-slate-600 leading-relaxed whitespace-pre-wrap',
      },
    },
  ],
};

export default enzoTemplate3;
