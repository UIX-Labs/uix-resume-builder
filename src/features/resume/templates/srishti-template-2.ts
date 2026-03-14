const srishtiTemplate2 = {
  name: 'Professional Dark',
  page: {
    padding: 0,
    background: '#0A1214',
    width: '794px',
    minHeight: '1123px',
    safeBottomPaddingPx: 32,
    className:
      'text-neutral-300 leading-[18px] tracking-[0.566px] overflow-hidden',
    fontFamily: 'Inter',
    googleFonts: ['Playfair Display:400,700', 'Inter:300,400,600,700,900'],
  },

  columns: {
    spacing: '0px',
    left: {
      width: '280px',
     
      className: 'bg-[#0E1B1D] text-white pt-10 pb-6 px-8',
    },
    right: {
      width: 'calc(100% - 280px)',
      className: 'bg-[#0E1B1D] pt-2 pb-6 px-10',
    },
  },

  sections: [
    {
      id: 'header',
      type: 'banner',
      className:
      'relative bg-[#050E10] px-0 pt-6 pb-14 mb-0 overflow-hidden ' +
'after:content-[""] after:absolute after:bottom-0 after:left-0 ' +
'after:w-full after:h-[52px] after:bg-[#0E1B1D] ' +
'after:[clip-path:polygon(0_100%,100%_0,100%_100%)]',
      fields: {
        container: {
          type: 'group',
          className: 'flex flex-row-reverse w-full items-center justify-between',
          items: [
            // ── Text block ──────────────────────────────────────────────
            {
              type: 'group',
              className: 'flex flex-col gap-2 flex-1 px-10 pt-4',
              items: [
                {
                  path: 'personalDetails.items[0].jobTitle',
                  fallback: 'DESIGNER / DEVELOPER',
                  className:
                    'text-[#9E8C6C] text-[11px] font-bold tracking-[1.5px] uppercase mb-0.5',
                },
                {
                  path: 'personalDetails.items[0].fullName',
                  fallback: 'Aman Gupta',
                  nameFormat: 'firstLast',
                  className:
                    "text-[34px] font-bold text-white tracking-[1.5px] leading-tight " +
                    "font-['Playfair_Display'] break-words",
                },
                {
                  path: 'personalDetails.items[0].description',
                  type: 'text',
                  className:
                    'text-[12px] text-[#E6F5F6] mt-1 max-w-[430px] font-light leading-[18px] tracking-[0.56px]',
                },
              ],
            },
            // ── Profile photo ──────────────────────────────────────────
            {
              type: 'group',
              className:
                'flex items-center justify-center w-[280px] px-8 py-4 shrink-0',
              items: [
                {
                  type: 'image',
                  path: 'personalDetails.items[0].profilePicturePublicUrl',
                  fallback: '/images/profileimg.jpeg',
                  className:
                    'w-[186px] h-[186px] rounded-full object-cover grayscale ' +
                    'ring-2 ring-[#0699A6]/30',
                },
              ],
            },
          ],
        },
      },
    },

    // ═══════════════════════════════════════════════════════════════════════
    //  LEFT SIDEBAR
    // ═══════════════════════════════════════════════════════════════════════

    // ── Contacts ──────────────────────────────────────────────────────────
    {
      id: 'contacts-sidebar',
      type: 'header',
      column: 'left',
      className: 'mb-4',
      fields: {
        contact: {
          type: 'contact-grid',
          className: 'flex flex-col',
          heading: {
            fallback: 'Contacts',
            className:
              "relative text-white text-[22px] font-bold mb-2 font-['Playfair_Display'] " +
              'leading-[18px] tracking-[0.566px] ' +
              'before:content-[""] before:block before:w-[40px] before:h-[6px] ' +
              'before:bg-[#0699A6] before:mb-2',
          },
          items: [
            // Mail
            {
              type: 'group',
              className: 'flex flex-col',
              items: [
                {
                  type: 'text',
                  fallback: 'MAIL',
                  className:
                    'text-[#9E8C6C] text-[10px] font-black tracking-[0.566px] uppercase',
                },
                {
                  path: 'personalDetails.items[0].email',
                  className: 'text-[#E6F5F6] text-[10px] break-all',
                },
              ],
            },
            // Phone
            {
              type: 'group',
              className: 'flex flex-col',
              items: [
                {
                  type: 'text',
                  fallback: 'CONTACT',
                  className:
                    'text-[#9E8C6C] text-[10px] font-black tracking-[0.566px] uppercase',
                },
                {
                  path: 'personalDetails.items[0].phone',
                  className: 'text-[#E6F5F6] text-[10px]',
                },
              ],
            },
            // Links
            {
              type: 'group',
              className: 'flex flex-col',
              items: [
                {
                  type: 'text',
                  fallback: 'LINK',
                  className:
                    'text-[#9E8C6C] text-[10px] font-black tracking-[0.566px] uppercase',
                },
                {
                  type: 'group',
                  className: 'flex flex-col',
                  items: [
                    {
                      type: 'link',
                      path: 'personalDetails.items[0].links.linkedin.title',
                      href: 'personalDetails.items[0].links.linkedin.link',
                      fallback: 'LinkedIn',
                      className:
                        'text-[#E6F5F6] text-[10px] hover:text-[#9E8C6C] transition-colors',
                    },
                    {
                      type: 'link',
                      path: 'personalDetails.items[0].links.portfolio.title',
                      href: 'personalDetails.items[0].links.portfolio.link',
                      fallback: 'Portfolio',
                      className:
                        'text-[#E6F5F6] text-[10px] hover:text-[#9E8C6C] transition-colors',
                    },
                    {
                      type: 'link',
                      path: 'personalDetails.items[0].links.dribbble.title',
                      href: 'personalDetails.items[0].links.dribbble.link',
                      fallback: 'Dribbble',
                      className:
                        'text-[#E6F5F6] text-[10px] hover:text-[#9E8C6C] transition-colors',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    },

    // ── Skills ────────────────────────────────────────────────────────────
    {
      id: 'skills',
      type: 'inline-list-section',
      column: 'left',
      break: true,
      breakable: true,
      className: 'mb-4 font-["inter"]',
      heading: {
        fallback: 'Skills',
        className:
          "relative text-white text-[22px] font-bold mb-2 font-['Playfair_Display'] " +
          'leading-[18px] tracking-[0.566px] ' +
          'before:content-[""] before:block before:w-[40px] before:h-[6px] ' +
          'before:bg-[#0699A6] before:mb-2',
      },
      listPath: 'skills.items',
      itemPath: 'name',
      itemSeparator: ' / ',
      itemClassName:
        'text-[#E6F5F6] text-[10px] hover:text-[#9E8C6C] transition-colors',
      containerClassName: 'block leading-[18px] tracking-[0.566px] mb-2',
    },

    // ── Interests ─────────────────────────────────────────────────────────
    {
      id: 'interests',
      type: 'list-section',
      column: 'left',
      break: true,
      className: 'mb-4',
      heading: {
        fallback: 'Interests',
        className:
          "relative text-white text-[22px] font-bold mb-2 font-['Playfair_Display'] " +
          'leading-[18px] tracking-[0.566px] ' +
          'before:content-[""] before:block before:w-[40px] before:h-[6px] ' +
          'before:bg-[#0699A6] before:mb-2',
      },
      listPath: 'interests.items[0].items',
      containerClassName: 'flex flex-row flex-wrap gap-1.5 mt-1',
      badgeClassName:
        'flex items-center justify-center w-fit px-2.5 py-1 bg-[#050E10] border border-[#0699A6]/30 text-[10px] text-[#E6F5F6] font-["inter"] tracking-[0.566px] rounded-sm whitespace-wrap leading-[18px]',
    },

    // ── Certifications ────────────────────────────────────────────────────
    {
      id: 'certifications',
      type: 'list-section',
      column: 'left',
      break: true,
      className: 'mb-4',
      heading: {
        fallback: 'Certifications',
        className:
          "relative text-white text-[22px] font-bold mb-2 font-['Playfair_Display'] " +
          'leading-[18px] tracking-[0.566px] ' +
          'before:content-[""] before:block before:w-[40px] before:h-[6px] ' +
          'before:bg-[#0699A6] before:mb-2',
      },
      listPath: 'certifications.items',
      containerClassName: 'flex flex-col gap-1 mb-4',
      itemTemplate: {
        break: true,
        className: 'flex flex-col',
        fields: [
          {
            path: 'name',
            className:
              'text-[#9E8C6C] text-[12px] font-bold uppercase tracking-[0.566px]',
          },
          {
            type: 'group',
            className: 'flex justify-between items-center',
            items: [
              {
                path: 'issuer',
                className: 'text-[#E6F5F6] text-[10px]',
              },
              {
                path: 'year',
                className: 'text-[#E6F5F6] text-[10px] whitespace-nowrap',
              },
            ],
          },
        ],
      },
    },

    {
      id: 'education',
      type: 'list-section',
      column: 'right',
      break: true,
      className: 'mb-4',
      heading: {
        fallback: 'Education',
        className:
          "relative text-white text-[22px] font-bold mb-2 font-['Playfair_Display'] " +
          'leading-[18px] tracking-[0.566px] ' +
          'before:content-[""] before:block before:w-[40px] before:h-[6px] ' +
          'before:bg-[#0699A6] before:mb-2',
      },
      listPath: 'education.items',
      containerClassName: 'flex flex-col gap-1 mb-4 font-["inter"]',
      itemTemplate: {
        break: true,
        className: 'flex flex-col',
        fields: [
          {
            type: 'group',
            className: 'flex justify-between items-baseline',
            items: [
              {
                path: 'degree',
                className:
                  'text-[#9E8C6C] text-[12px] font-bold uppercase tracking-[0.566px]',
              },
              {
                type: 'duration',
                path: 'duration',
                className:
                  'text-[#E6F5F6] text-[10px] font-medium whitespace-nowrap',
              },
            ],
          },
          {
            type: 'group',
            className: 'flex flex-row items-center gap-2 flex-wrap',
            items: [
              {
                path: 'grade.value',
                className: 'text-[#E6F5F6] text-[10px] font-medium uppercase',
              },
              {
                type: 'text',
                fallback: '|',
                className: 'text-[#E6F5F6] text-[10px]',
                condition: 'grade.value',
              },
              {
                path: 'institution',
                className: 'text-[#E6F5F6] text-[10px] uppercase',
              },
            ],
          },
          {
            type: 'html',
            path: 'description',
            className:
              'text-[12px] text-[#E6F5F6] leading-[18px] tracking-[0.56px] whitespace-pre-wrap ' +
              '[&_ul]:ml-5 [&_li]:list-disc [&_li]:mb-0.5',
          },
        ],
      },
    },

    // ── Experience ────────────────────────────────────────────────────────
    {
      id: 'experience',
      type: 'list-section',
      column: 'right',
      break: true,
      className: 'mb-4',
      heading: {
        fallback: 'Experience',
        className:
          "relative text-white text-[22px] font-bold mb-2 font-['Playfair_Display'] " +
          'leading-[18px] tracking-[0.566px] ' +
          'before:content-[""] before:block before:w-[40px] before:h-[6px] ' +
          'before:bg-[#0699A6] before:mb-2',
      },
      listPath: 'experience.items',
      containerClassName: 'flex flex-col gap-1 mb-4',
      itemTemplate: {
        break: true,
        className: 'flex flex-col font-["inter"]',
        fields: [
          {
            type: 'group',
            className: 'flex justify-between items-baseline',
            items: [
              {
                path: 'position',
                className:
                  'text-[#9E8C6C] text-[12px] font-bold uppercase tracking-[0.566px]',
              },
              {
                type: 'duration',
                path: 'duration',
                className:
                  'text-[#E6F5F6] text-[10px] font-medium whitespace-nowrap',
              },
            ],
          },
          {
            path: 'company',
            className:
              'text-[#9E8C6C] text-[10px] font-bold tracking-[0.566px] mb-0.5',
          },
          {
            type: 'html',
            path: 'description',
            className:
              'text-[12px] text-[#E6F5F6] leading-[18px] tracking-[0.56px] whitespace-pre-wrap ' +
              '[&_ul]:ml-5 [&_li]:list-disc [&_li]:mb-0.5',
          },
        ],
      },
    },

    // ── Projects ──────────────────────────────────────────────────────────
    {
      id: 'projects',
      type: 'list-section',
      column: 'right',
      break: true,
      className: 'mb-4',
      heading: {
        fallback: 'Projects',
        className:
          "relative text-white text-[22px] font-bold mb-2 font-['Playfair_Display'] " +
          'leading-[18px] tracking-[0.566px] ' +
          'before:content-[""] before:block before:w-[40px] before:h-[6px] ' +
          'before:bg-[#0699A6] before:mb-2',
      },
      listPath: 'projects.items',
      containerClassName: 'flex flex-col gap-1 mb-4',
      itemTemplate: {
        break: true,
        className: 'flex flex-col font-["inter"]',
        fields: [
          {
            type: 'group',
            className: 'flex justify-between items-baseline',
            items: [
              {
                path: 'title',
                className:
                  'text-[#9E8C6C] text-[12px] font-bold uppercase tracking-[0.566px]',
              },
              {
                type: 'duration',
                path: 'duration',
                className:
                  'text-[#E6F5F6] text-[10px] font-medium whitespace-nowrap',
              },
            ],
          },
          {
            path: 'subtitle',
            className:
              'text-[#9E8C6C] text-[10px] font-bold tracking-[0.566px] mb-0.5',
          },
          {
            type: 'html',
            path: 'description',
            className:
              'text-[12px] text-[#E6F5F6] leading-[18px] tracking-[0.56px] whitespace-pre-wrap ' +
              '[&_ul]:ml-5 [&_li]:list-disc [&_li]:mb-0.5',
          },
        ],
      },
    },

    // ── Achievements ──────────────────────────────────────────────────────
    {
      id: 'achievements',
      type: 'badge-section',
      column: 'right',
      break: true,
      breakable: true,
      className: 'mb-4',
      heading: {
        fallback: 'Achievements',
        className:
          "relative text-white text-[22px] font-bold mb-2 font-['Playfair_Display'] " +
          'leading-[18px] tracking-[0.566px] ' +
          'before:content-[""] before:block before:w-[40px] before:h-[6px] ' +
          'before:bg-[#0699A6] before:mb-2',
      },
      listPath: 'achievements.items[0].items',
      containerClassName: 'flex flex-row flex-wrap gap-2 mt-1 mb-4',
      badgeClassName:
        'flex items-center justify-center w-fit px-2.5 py-1 bg-[#050E10] border border-[#0699A6]/30 text-[10px] text-[#E6F5F6] font-medium font-["inter"] tracking-[0.566px] rounded-sm whitespace-wrap leading-[18px]',
    },
  ],
};

export default srishtiTemplate2;

