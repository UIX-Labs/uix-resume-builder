const template6 = {
  name: "Jay Rustogi Professional",

  page: {
    width: 794,
    height: 1122,
    padding: 0,
    background: "#ffffff",
    className: "text-neutral-900 leading-relaxed",
    fontFamily: "Inter",
  },

  columns: {
    spacing: "0px",
    left: {
      width: "30%",
      className: "bg-[rgb(24,37,58)] text-black p-8",
    },
    right: {
      width: "70%",
      className: "py-8",
    },
  },

  sections: [
    // Header Section with Peach Background (spans full width)
    {
      id: "header",
      type: "header",
      column: "right",
      className:
        "bg-[#F2936F] px-8 py-20 flex flex-col justify-center gap-4 -mt-8",
      fields: {
        name: {
          path: "personalDetails.items[0].fullName",
          fallback: "JAY RUSTOGI",
          className: "text-4xl font-extrabold text-black tracking-wider",
        },
        title: {
          path: "personalDetails.items[0].jobTitle",
          fallback: "PRODUCT | GROWTH | STRATEGY",
          className: "text-sm font-normal text-black tracking-widest",
        },
      },
    },

    // Education Section
    {
      id: "education",
      type: "list-section",
      column: "left",
      break: false,
      className: "pl-6 mb-8",
      heading: {
        path: "education.heading",
        fallback: "EDUCATION",
        className:
          "text-[#F2936F] text-base font-extrabold tracking-wider mb-3 mt-50",
      },
      listPath: "education.items",
      containerClassName: "flex flex-col gap-4 mt-2",
      itemTemplate: {
        className: "flex flex-col",
        fields: [
          {
            path: "degree",
            className: "text-[#F2936F] text-sm font-bold",
          },
          {
            path: "institution",
            className:
              "text-white text-sm font-normal break-words whitespace-normal",
          },
          {
            type: "duration",
            path: "duration",
            className:
              "text-white text-sm font-normal break-words whitespace-normal",
          },
        ],
      },
    },

    // Skills Section
    {
      id: "skills",
      type: "list-section",
      column: "left",
      break: true,
      className: "pl-6 mb-8",
      heading: {
        path: "skills.heading",
        fallback: "SKILLS",
        className:
          "text-[#F2936F] text-base font-extrabold tracking-wider mb-3 mt-10",
      },
      listPath: "skills.items",
      containerClassName: "flex flex-col mb-6",
      itemTemplate: {
        className: "flex flex-col",
        fields: [
          {
            path: "name",
            className:
              "text-white text-sm font-normal leading-relaxed break-words whitespace-normal",
          },
        ],
      },
    },

    // Interests Section
    {
      id: "interests",
      type: "badge-section",
      column: "left",
      break: false,
      heading: {
        path: "interests.title",
        fallback: "INTERESTS",
        className:
          "text-[#F2936F] uppercase text-base font-extrabold tracking-wider mb-3",
      },
      listPath: "interests.items[0].items",
      itemPath: "",
      badgeClassName:
        "text-white text-sm font-normal leading-relaxed break-words whitespace-normal",
      containerClassName: "flex flex-col gap-0 mb-8",
    },

    // Contact Section
    {
      id: "header",
      type: "header",
      column: "left",
      className: "flex flex-col gap-3 mb-8",
      fields: {
        contact: {
          type: "contact-grid",
          className: "flex flex-col gap-2 mt-1",
          heading: {
            path: "",
            fallback: "Contact",
            className:
              "text-[#F2936F] text-base font-extrabold tracking-wider mb-3",
          },
          items: [
            {
              type: "inline-group-with-icon",
              className: "flex items-center gap-2",
              items: [
                {
                  type: "icon",
                  name: "Phone",
                  size: 16,
                  className: "text-[#F2936F]",
                },
                {
                  path: "personalDetails.items[0].phone",
                  fallback: "+91 9999999999",
                  className:
                    "text-white text-sm font-normal break-words whitespace-normal",
                },
              ],
            },
            {
              type: "inline-group-with-icon",
              className: "flex items-center gap-2",
              items: [
                {
                  type: "icon",
                  name: "Mail",
                  size: 16,
                  className: "text-[#F2936F]",
                },
                {
                  type: "link",
                  path: "personalDetails.items[0].email",
                  href: "mailto:{{value}}",
                  fallback: "jay02rustogi@gmail.com",
                  className:
                    "text-white text-sm font-normal break-words whitespace-wrap max-w-[85%]",
                },
              ],
            },
            {
              type: "inline-group-with-icon",
              className: "flex items-center gap-2",
              items: [
                {
                  type: "icon",
                  name: "Linkedin",
                  size: 18,
                  className: "text-[#F2936F]",
                },
                {
                  type: "link",
                  path: "personalDetails.items[0].links.linkedin.title",
                  href: "personalDetails.items[0].links.linkedin.link",
                  fallback: "linkedin.com/in/jay-rustogi",
                  className:
                    "text-white text-sm font-normal underline break-words",
                },
              ],
            },
            {
              type: "inline-group-with-icon",
              className: "flex items-center gap-2",
              items: [
                {
                  type: "icon",
                  name: "Github",
                  size: 18,
                  className: "text-[#F2936F]",
                },
                {
                  type: "link",
                  path: "personalDetails.items[0].links.github.title",
                  href: "personalDetails.items[0].links.github.link",
                  fallback: "github.com/username",
                  className:
                    "text-white text-sm font-normal underline break-words mt-1",
                },
              ],
            },
          ],
        },
      },
    },

    {
      id: "summary",
      type: "content-section",
      column: "right",
      className: "flex flex-col gap-3 pb-6 border-b-4 border-[#E8A87C] pt-8",
      heading: {
        path: "about.heading",
        fallback: "ABOUT",
        className:
          "text-[#F2936F] text-base font-extrabold tracking-wider px-8 mt-5",
      },
      content: {
        type: "html",
        path: "personalDetails.items[0].description",
        fallback: "About text",
        className:
          "text-sm text-black leading-relaxed break-words whitespace-pre-wrap px-8 mt-1",
      },
    },

    // Work Experience Section
    {
      id: "experience",
      type: "list-section",
      column: "right",
      break: true,
      heading: {
        path: "experience.heading",
        fallback: "WORK EXPERIENCE",
        className:
          "text-[#F2936F] text-base font-extrabold tracking-wider pt-6 mb-3",
      },
      listPath: "experience.items",
      containerClassName: "flex flex-col gap-6 mt-2",
      itemTemplate: {
        className: "flex flex-col pt-2 px-8",
        fields: [
          {
            path: "position",
            className: "text-[#F2936F] text-xs font-bold uppercase mt-1",
          },
          {
            type: "inline-group",
            className: "flex gap-2 items-baseline mt-1",
            items: [
              {
                path: "company",
                className: "text-black text-sm font-semibold",
              },
              {
                path: "separator",
                fallback: "|",
                className: "text-black text-sm font-normal",
              },
              {
                type: "duration",
                path: "duration",
                className: "text-black text-sm font-normal italic",
              },
            ],
          },
          {
            path: "companyType",
            fallback: "",
            className: "text-black text-sm font-normal",
          },
          {
            type: "html",
            path: "description",
            className:
              "text-sm text-black leading-relaxed [&_ul]:ml-5 [&_li]:list-disc [&_li]:mb-2 [&_strong]:font-bold break-words whitespace-pre-wrap",
          },
        ],
      },
    },

    // Projects Section
    {
      id: "projects",
      type: "list-section",
      column: "right",
      break: true,
      heading: {
        path: "projects.title",
        fallback: "PROJECTS",
        className:
          "text-[#F2936F] uppercase text-base font-extrabold tracking-wider mt-6",
      },
      listPath: "projects.items",
      containerClassName: "flex flex-col gap-3 mt-2",
      itemTemplate: {
        className: "flex flex-col pt-1 px-8",
        fields: [
          {
            path: "title",
            href: "link.link",
            fallback: "Project Title",
            className: "text-black text-sm font-semibold hover:underline",
          },
          {
            type: "duration",
            path: "duration",
            className: "text-black text-sm font-normal italic",
          },
          {
            type: "html",
            path: "description",
            className:
              "text-sm text-black leading-relaxed [&_ul]:ml-5 [&_li]:list-disc [&_li]:mb-2 [&_strong]:font-bold break-words whitespace-pre-wrap",
          },
        ],
      },
    },

    // Certifications Section
    {
      id: "certifications",
      type: "list-section",
      column: "right",
      break: true,
      heading: {
        path: "certifications.title",
        fallback: "CERTIFICATIONS",
        className:
          "uppercase text-[#F2936F] text-base font-extrabold tracking-wider  mt-6",
      },
      listPath: "certifications.items",
      containerClassName: "flex flex-col gap-3 mt-1 pb-6",
      itemTemplate: {
        className: "flex flex-col px-8",
        fields: [
          {
            path: "title",
            fallback: "Certification Title",
            className: "text-sm text-black font-semibold",
          },
          {
            path: "issuer",
            fallback: "Issuer",
            className: "text-sm text-black",
          },
          {
            type: "duration",
            path: "duration",
            className: "text-sm text-black italic",
          },
        ],
      },
    },

    // Achievements Section
    {
      id: "achievements",
      type: "badge-section",
      column: "right",
      break: false,
      heading: {
        path: "achievements.title",
        fallback: "ACHIEVEMENTS",
        className:
          "uppercase text-[#F2936F] text-base font-extrabold tracking-wider px-8 mt-1",
      },
      listPath: "achievements.items[0].items",
      itemPath: "",
      badgeClassName: "text-sm text-black",
      containerClassName: "flex flex-col mt-1 px-8",
      itemPrefix: "• ",
    },
  ],
};

export default template6;