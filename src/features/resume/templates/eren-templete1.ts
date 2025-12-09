// Enji Kusnadi style template adapted to the app resume structure

const enjiTemplate = {
  name: "Enji Kusnadi",

  page: {
    // The actual resume page in the app is already inside a gradient shell,
    // so keep the sheet itself clean and white.
    background: "#ffffff",
    className: "text-[12px] text-slate-900 leading-relaxed",
    fontFamily: "Inter",
    padding: 0,
  },

  sections: [
    /**
     * HEADER
     * Centered name + role with compact contact line
     * Uses the gradient blob SVG as background
     */
    {
      id: "header",
      type: "header",
      className:
        "flex flex-col items-center text-center gap-1 pb-6 pt-8 mb-4 bg-no-repeat bg-cover bg-center bg-[linear-gradient(to_right,#E9D5FF,#DBEAFE,#F0F9FF)]",
      fields: {
        name: {
          path: "personalDetails.items[0].fullName",
          fallback: "Enji Kusnadi",
          className: "text-[28px] font-extrabold tracking-wide text-slate-900",
        },
        title: {
          path: "personalDetails.items[0].jobTitle",
          fallback: "Front-End Developer · UI/UX Designer",
          className:
            "text-[12px] font-medium text-slate-600 leading-none tracking-normal",
        },
        contact: {
          type: "contact-grid",
          className: "flex flex-col items-center gap-2 mt-2",
          separator: "",
          items: [
            // Top line: Location and Email
            {
              type: "inline-group",
              className: "flex items-center gap-3 text-[12px] text-black",
              separator: "",
              items: [
                {
                  type: "inline-group-with-icon",
                  className: "flex items-center gap-1",
                  items: [
                    {
                      type: "icon",
                      name: "Phone",
                      size: 8,
                      className: "text-black",
                    },
                    {
                      path: "personalDetails.items[0].phone",
                      fallback: "12332344",
                      className: "text-[12px] text-black",
                    },
                  ],
                },
                {
                  type: "inline-group-with-icon",
                  className: "inline-flex items-center gap-1",
                  items: [
                    {
                      type: "icon",
                      name: "MapPin",
                      size: 8,
                      className: "text-black",
                    },
                    {
                      path: "personalDetails.items[0].address",
                      fallback: "Bandung",
                      className: "text-[12px] text-black",
                    },
                  ],
                },
                {
                  type: "inline-group-with-icon",
                  className: "inline-flex items-center gap-1",
                  items: [
                    {
                      type: "icon",
                      name: "Mail",
                      size: 8,
                      className: "text-black",
                    },
                    {
                      type: "link",
                      path: "personalDetails.items[0].email",
                      href: "mailto:{{value}}",
                      fallback: "mail@enji.dev",
                      className: "text-[12px] text-black",
                    },
                  ],
                },
              ],
            },
            // Badge row: LinkedIn and GitHub
            {
              type: "inline-group",
              className: "flex flex-wrap items-center justify-center gap-2",
              separator: "",
              items: [
                {
                  type: "inline-group-with-icon",
                  className:
                    "inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#F1F8FF] text-blue-900 border border-[#0A66C2]",
                  items: [
                    {
                      type: "icon",
                      name: "Linkedin",
                      size: 8,
                      className: "text-blue-900",
                    },
                    {
                      type: "link",
                      path: "personalDetails.items[0].links.linkedin.title",
                      href: "personalDetails.items[0].links.linkedin.link",
                      fallback: "/enjidev",
                      className: "text-[12px] text-blue-900",
                    },
                  ],
                },
                {
                  type: "inline-group-with-icon",
                  className:
                    "inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#F2F2F2] text-gray-900 border border-[#222222]",
                  items: [
                    {
                      type: "icon",
                      name: "Github",
                      size: 8,
                      className: "text-gray-900",
                    },
                    {
                      type: "link",
                      path: "personalDetails.items[0].links.github.title",
                      href: "personalDetails.items[0].links.github.link",
                      fallback: "/enjidev",
                      className: "text-[12px] text-gray-900",
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
     * EDUCATION
     */
    {
      id: "education",
      type: "table-section",
      break: true,
      heading: {
        path: "education.heading",
        fallback: "Education",
        className:
          "text-[12px] font-semibold tracking-wide text-slate-500 uppercase",
      },
      listPath: "education.items",
      headingColumn: {
        className: "w-32",
      },
      columns: [
        {
          type: "inline-group",
          separator: " — ",
          containerClassName: "flex items-center gap-1",
          className: "flex-1",
          items: [
            {
              type: "text",
              path: "institution",
              fallback: "STMIK Indonesia Mandiri",
              className: "font-semibold text-slate-900",
            },
            {
              type: "text",
              path: "degree",
              fallback: "Teknik Informatika (S1)",
              className: "text-slate-700",
            },
          ],
        },
        {
          type: "duration",
          path: "duration",
          fallback: "Oct 2018 - Present",
          className: "text-[12px] text-slate-500 whitespace-nowrap ml-4",
        },
      ],
      gridTemplateColumns: "128px 1fr auto",
      className: "px-16 pt-8 pb-8",
      containerClassName: "space-y-4",
      rowClassName: "items-baseline gap-4 px-16 py-2",
      divider: {
        variant: "line",
        className: "border-b border-slate-200",
      },
    },

    /**
     * EXPERIENCE
     */
    {
      id: "experience",
      type: "table-section",
      break: true,
      heading: {
        path: "experience.heading",
        fallback: "Experience",
        className:
          "text-[12px] font-semibold tracking-wide text-slate-500 uppercase",
      },
      listPath: "experience.items",
      headingColumn: {
        className: "w-32",
      },
      columns: [
        {
          type: "group",
          className: "flex-1 space-y-1.5",
          items: [
            {
              type: "inline-group",
              separator: " — ",
              containerClassName: "flex items-center gap-1",
              className: "",
              items: [
                {
                  type: "text",
                  path: "company",
                  className: "text-[12px] font-semibold text-slate-900",
                },
                {
                  type: "text",
                  path: "position",
                  className: "text-slate-700",
                },
              ],
            },
            {
              type: "text",
              path: "techStack",
              fallback: "",
              className: "text-[12px] text-slate-500 italic",
            },
            {
              type: "html",
              path: "description",
              className: "text-[12px] text-slate-700 leading-relaxed",
            },
          ],
        },
        {
          type: "duration",
          path: "duration",
          className: "text-[12px] text-slate-500 whitespace-nowrap ml-4",
        },
      ],
      gridTemplateColumns: "128px 1fr auto",
      className: "px-16 pt-6 pb-8",
      containerClassName: "space-y-4",
      rowClassName: "items-start gap-4 px-16 pt-4 pb-4",
      divider: {
        variant: "line",
        className: "border-b border-slate-200",
      },
    },

    /**
     * PROJECTS
     */
    {
      id: "projects",
      type: "table-section",
      break: true,
      heading: {
        path: "projects.heading",
        fallback: "Featured Project",
        className:
          "text-[12px] font-semibold tracking-wide text-slate-500 uppercase",
      },
      listPath: "projects.items",
      headingColumn: {
        className: "w-32",
      },
      columns: [
        {
          type: "group",
          className: "flex-1 space-y-1",
          items: [
            {
              type: "text",
              path: "title",
              fallback: "SPKJS",
              className: "text-[12px] font-semibold text-slate-900",
            },
            {
              type: "text",
              path: "techStack",
              fallback: "",
              className: "text-[12px] text-slate-500 italic",
            },
            {
              type: "html",
              path: "description",
              className: "text-[12px] text-slate-700 leading-relaxed",
            },
            {
              type: "link",
              path: "link.title",
              href: "link.link",
              className: "text-[12px] text-blue-600 hover:underline mt-1",
            },
          ],
        },
      ],
      gridTemplateColumns: "128px 1fr",
      className: "px-16 pt-6 pb-8",
      containerClassName: "space-y-4",
      rowClassName: "items-start gap-4 px-16 pt-4 pb-4",
      divider: {
        variant: "line",
        className: "border-b border-slate-200",
      },
    },

    /**
     * SKILLS & TOOLS
     */
    {
      id: "skills",
      type: "table-section",
      break: true,
      singleRow: true,
      heading: {
        path: "skills.heading",
        fallback: "Skills & Tools",
        className:
          "text-[12px] font-semibold tracking-wide text-slate-500 uppercase",
      },
      listPath: "skills.items",
      headingColumn: {
        className: "w-32",
      },
      columns: [
        {
          type: "badge-list",
          itemPath: "name",
          badgeClassName:
            "px-2 py-0.5 rounded-full border border-slate-200 bg-slate-50 text-[12px] text-slate-700 font-medium",
          containerClassName: "gap-1.5",
          className: "flex-1",
        },
      ],
      gridTemplateColumns: "128px 1fr",
      className: "px-16 pt-6 pb-8",
      containerClassName: "",
      rowClassName: "items-start gap-4 px-16 pt-4 pb-4",
      divider: {
        variant: "line",
        className: "border-b border-slate-200",
      },
    },

    /**
     * CERTIFICATIONS
     */
    {
      id: "certifications",
      type: "table-section",
      break: true,
      heading: {
        path: "certifications.heading",
        fallback: "Certifications",
        className:
          "text-[12px] font-semibold tracking-wide text-slate-500 uppercase",
      },
      listPath: "certifications.items",
      headingColumn: {
        className: "w-32",
      },
      columns: [
        {
          type: "group",
          className: "flex-1 space-y-0.5 flex gap-1",
          items: [
            {
              type: "text",
              path: "title",
              fallback: "Certification Title",
              className: "text-[12px] font-semibold text-slate-900",
            },
            {
              type: "text",
              path: "issuer",
              fallback: "Issuer",
              className: "text-[12px] text-slate-600",
            },
            {
              type: "link",
              path: "link.title",
              href: "link.link",
              className: "text-[12px] text-blue-600 hover:underline",
            },
          ],
        },
        {
          type: "duration",
          path: "duration",
          className: "text-[12px] text-slate-500",
        },
      ],
      gridTemplateColumns: "128px 1fr auto",
      className: "px-16 pt-6 pb-8",
      containerClassName: "space-y-4",
      rowClassName: "items-start gap-4 px-16 pt-4 pb-4",
      divider: {
        variant: "line",
        className: "border-b border-slate-200",
      },
    },

    /**
     * INTERESTS
     */
    {
      id: "interests",
      type: "table-section",
      break: true,
      singleRow: true,
      heading: {
        path: "interests.heading",
        fallback: "Interests",
        className:
          "text-[12px] font-semibold tracking-wide text-slate-500 uppercase",
      },
      listPath: "interests.items",
      headingColumn: {
        className: "w-32",
      },
      columns: [
        {
          type: "badge-list",
          itemPath: "items",
          badgeClassName:
            "px-2 py-0.5 rounded-full border border-slate-200 bg-slate-50 text-[12px] text-slate-700 font-medium",
          containerClassName: "gap-1.5",
          className: "flex-1",
        },
      ],
      gridTemplateColumns: "128px 1fr",
      className: "px-16 pt-6 pb-8",
      containerClassName: "",
      rowClassName: "items-start gap-4 px-16 pt-4 pb-4",
      divider: {
        variant: "line",
        className: "border-b border-slate-200",
      },
    },

    /**
     * ACHIEVEMENTS
     */
    {
      id: "achievements",
      type: "table-section",
      break: true,
      singleRow: true,
      heading: {
        path: "achievements.heading",
        fallback: "Achievements",
        className:
          "text-[12px] font-semibold tracking-wide text-slate-500 uppercase",
      },
      listPath: "achievements.items",
      headingColumn: {
        className: "w-32",
      },
      columns: [
        {
          type: "badge-list",
          itemPath: "items",
          badgeClassName:
            "px-3 py-1 rounded-full border border-slate-200 bg-slate-50 text-[12px] text-slate-700 font-medium line-clamp-2 break-all",
          containerClassName: "gap-1.5",
          className: "flex-1",
        },
      ],
      gridTemplateColumns: "128px 1fr",
      className: "px-16 pt-6 pb-8",
      containerClassName: "",
      rowClassName: "items-start gap-4 px-16 pt-4 pb-4",
      // No divider for the last section
    },
  ],
};

export default enjiTemplate;
