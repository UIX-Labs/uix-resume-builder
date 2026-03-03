/**
 * Comprehensive dummy resume data covering ALL form fields.
 *
 * Sections and fields are derived from:
 *  - entities/resume/types/resume-form.ts   (FormSchema)
 *  - entities/resume/types/resume-data.ts   (ResumeData)
 *  - entities/resume/api/schema-data.ts     (field definitions)
 *
 * Every template data-path used by existing templates (e.g. mohsina-template1,
 * eren-template1, standard, etc.) is represented here so the preview renders
 * correctly out of the box.
 */

export const dummyResumeData = {
  updatedAt: Date.now(),

  // ── Personal Details ─────────────────────────────────────────────────
  personalDetails: {
    id: 'pd-001',
    title: 'personal_info',
    heading: 'Personal Details',
    items: [
      {
        itemId: 'pd-item-001',
        fullName: 'Sophia Martinez',
        jobTitle: 'Full-Stack Software Engineer',
        email: 'sophia.martinez@email.com',
        phone: '+1 (415) 987-6543',
        address: '742 Evergreen Terrace, San Francisco, CA 94110',
        city: 'San Francisco',
        state: 'California',
        country: 'United States',
        pincode: '94110',
        description:
          'Results-driven full-stack engineer with 6+ years of experience designing, building, and scaling web applications. Passionate about clean architecture, developer experience, and mentoring junior engineers. Motivated [Role] graduate with a strong foundation in [Skill A] and [Skill B]. Demonstrated ability to solve complex problems through [Project or Internship Experience]. Eager to apply a background in [Your Background] to contribute to the [Department] team at [Company].',
        profilePicturePublicUrl: '/images/profileimg.jpeg',
        links: {
          linkedin: {
            title: 'linkedin.com/in/sophiamartinez',
            link: 'https://linkedin.com/in/sophiamartinez',
          },
          github: {
            title: 'github.com/sophiamartinez',
            link: 'https://github.com/sophiamartinez',
          },
          website: {
            title: 'sophiamartinez.dev',
            link: 'https://sophiamartinez.dev',
          },
          youtube: {
            title: 'youtube.com/@sophiacodes',
            link: 'https://youtube.com/@sophiacodes',
          },
          dribble: {
            title: 'dribbble.com/sophiam',
            link: 'https://dribbble.com/sophiam',
          },
          behance: {
            title: 'behance.net/sophiam',
            link: 'https://behance.net/sophiam',
          },
        },
      },
    ],
  },

  // ── Professional Summary ─────────────────────────────────────────────
  professionalSummary: {
    id: 'ps-001',
    title: 'Professional Summary',
    heading: 'Professional Summary',
    items: [
      {
        id: 'ps-item-001',
        summary:
          'Versatile Full-Stack Software Engineer with 6+ years of hands-on experience in modern JavaScript/TypeScript ecosystems. Specialised in React, Next.js, and Node.js with a strong focus on performance optimisation, CI/CD automation, and scalable cloud-native architectures. Led cross-functional teams of up to 8 engineers and consistently delivered projects ahead of schedule.',
      },
    ],
  },

  // ── Experience ───────────────────────────────────────────────────────
  experience: {
    id: 'exp-001',
    title: 'experience',
    heading: 'Experience',
    items: [
      {
        itemId: 'exp-item-001',
        company: 'Nexora Technologies',
        position: 'Senior Software Engineer',
        location: 'San Francisco, CA',
        description:
          '<ul><li>Architected and led migration of a monolithic Rails app to a Next.js + Go micro-services stack, reducing page load times by 45%.</li><li>Implemented CI/CD pipelines with GitHub Actions and Docker, cutting deployment time from 40 min to under 8 min.</li><li>Mentored a team of 5 junior developers through code reviews, pair programming, and weekly knowledge-sharing sessions.</li></ul>',
        techStack: 'Next.js, TypeScript, Go, Docker, AWS',
        rank: 0,
        duration: {
          startDate: '2022-03',
          endDate: '',
          ongoing: true,
        },
        link: {
          title: 'nexora.io',
          link: 'https://nexora.io',
        },
      },
      {
        itemId: 'exp-item-002',
        company: 'BrightLoop Inc.',
        position: 'Software Engineer',
        location: 'Austin, TX',
        description:
          '<ul><li>Built a real-time analytics dashboard used by 200+ enterprise clients, processing 10M+ events daily.</li><li>Designed a reusable component library (50+ components) adopted across 4 product teams, improving UI consistency by 80%.</li><li>Reduced API response latency by 35% through query optimisation and Redis caching strategies.</li></ul>',
        techStack: 'React, Node.js, PostgreSQL, Redis, Kubernetes',
        rank: 1,
        duration: {
          startDate: '2019-08',
          endDate: '2022-02',
          ongoing: false,
        },
        link: {
          title: 'brightloop.com',
          link: 'https://brightloop.com',
        },
      },
    ],
  },

  // ── Education ────────────────────────────────────────────────────────
  education: {
    id: 'edu-001',
    title: 'education',
    heading: 'Education',
    items: [
      {
        itemId: 'edu-item-001',
        institution: 'University of California, Berkeley',
        degree: 'Bachelor of Science',
        fieldOfStudy: 'Computer Science',
        rank: 0,
        duration: {
          startDate: '2015-08',
          endDate: '2019-05',
          ongoing: false,
        },
        grade: {
          value: '3.9 GPA',
        },
      },
      {
        itemId: 'edu-item-002',
        institution: 'Stanford University',
        degree: 'Master of Science',
        fieldOfStudy: 'Artificial Intelligence',
        rank: 1,
        duration: {
          startDate: '2019-09',
          endDate: '2021-06',
          ongoing: false,
        },
        grade: {
          value: '3.95 GPA',
        },
      },
    ],
  },

  // ── Projects ─────────────────────────────────────────────────────────
  projects: {
    id: 'proj-001',
    title: 'projects',
    heading: 'Projects',
    items: [
      {
        itemId: 'proj-item-001',
        title: 'DevFlow — Developer Productivity Suite',
        description:
          '<ul><li>Built an open-source VS Code extension that automates PR descriptions using GPT-4, saving developers ~15 min per PR.</li><li>Reached 2,000+ installs within the first month of launch on the VS Code Marketplace.</li></ul>',
        techStack: ['TypeScript', 'Node.js', 'OpenAI API', 'VS Code Extension API'],
        rank: 0,
        duration: {
          startDate: '2024-01',
          endDate: '2024-06',
          ongoing: false,
        },
        link: {
          title: 'github.com/sophiam/devflow',
          link: 'https://github.com/sophiam/devflow',
        },
      },
      {
        itemId: 'proj-item-002',
        title: 'GreenTrack — Carbon Footprint Tracker',
        description:
          "<ul><li>Developed a mobile-first web app that calculates and tracks users' daily carbon footprint with gamification features.</li><li>Integrated Google Maps API and climate data APIs for accurate travel-emission estimates.</li></ul>",
        techStack: ['React Native', 'Firebase', 'Google Maps API', 'Chart.js'],
        rank: 1,
        duration: {
          startDate: '2023-05',
          endDate: '2023-12',
          ongoing: false,
        },
        link: {
          title: 'greentrack.app',
          link: 'https://greentrack.app',
        },
      },
    ],
  },

  // ── Skills ───────────────────────────────────────────────────────────
  skills: {
    id: 'sk-001',
    title: 'skills',
    heading: 'Skills & Tools',
    items: [
      { itemId: 'sk-item-001', name: 'JavaScript / TypeScript', level: 'Expert', category: 'Languages', rank: 0 },
      { itemId: 'sk-item-002', name: 'React & Next.js', level: 'Expert', category: 'Frontend', rank: 1 },
      { itemId: 'sk-item-003', name: 'Node.js', level: 'Expert', category: 'Backend', rank: 2 },
      { itemId: 'sk-item-004', name: 'Python', level: 'Intermediate', category: 'Languages', rank: 3 },
      { itemId: 'sk-item-005', name: 'PostgreSQL / MongoDB', level: 'Expert', category: 'Databases', rank: 4 },
      { itemId: 'sk-item-006', name: 'Docker & Kubernetes', level: 'Intermediate', category: 'DevOps', rank: 5 },
      { itemId: 'sk-item-007', name: 'AWS (EC2, S3, Lambda)', level: 'Intermediate', category: 'Cloud', rank: 6 },
      { itemId: 'sk-item-008', name: 'Figma', level: 'Intermediate', category: 'Design', rank: 7 },
      { itemId: 'sk-item-001', name: 'JavaScript / TypeScript', level: 'Expert', category: 'Languages', rank: 0 },
      { itemId: 'sk-item-002', name: 'React & Next.js', level: 'Expert', category: 'Frontend', rank: 1 },
      { itemId: 'sk-item-003', name: 'Node.js', level: 'Expert', category: 'Backend', rank: 2 },
      { itemId: 'sk-item-004', name: 'Python', level: 'Intermediate', category: 'Languages', rank: 3 },
      { itemId: 'sk-item-005', name: 'PostgreSQL / MongoDB', level: 'Expert', category: 'Databases', rank: 4 },
      { itemId: 'sk-item-006', name: 'Docker & Kubernetes', level: 'Intermediate', category: 'DevOps', rank: 5 },
      { itemId: 'sk-item-007', name: 'AWS (EC2, S3, Lambda)', level: 'Intermediate', category: 'Cloud', rank: 6 },
      { itemId: 'sk-item-008', name: 'Figma', level: 'Intermediate', category: 'Design', rank: 7 },
    ],
  },

  // ── Certifications ───────────────────────────────────────────────────
  certifications: {
    id: 'cert-001',
    title: 'certifications',
    heading: 'Certifications',
    items: [
      {
        itemId: 'cert-item-001',
        title: 'AWS Certified Solutions Architect – Associate',
        issuer: 'Amazon Web Services',
        rank: 0,
        duration: {
          startDate: '2023-06',
          endDate: '2026-06',
          ongoing: false,
        },
        link: {
          title: 'Verify Credential',
          link: 'https://aws.amazon.com/verification',
        },
      },
      {
        itemId: 'cert-item-002',
        title: 'Google Professional Cloud Developer',
        issuer: 'Google Cloud',
        rank: 1,
        duration: {
          startDate: '2024-01',
          endDate: '2027-01',
          ongoing: false,
        },
        link: {
          title: 'Verify Credential',
          link: 'https://cloud.google.com/certification',
        },
      },
    ],
  },

  // ── Achievements ─────────────────────────────────────────────────────
  achievements: {
    id: 'ach-001',
    title: 'achievements',
    heading: 'Achievements',
    items: [
      {
        itemId: 'ach-item-001',
        items: [
          'Winner — Google Cloud Hackathon 2023 (1st place out of 500+ teams)',
          'Published 2 papers on ML-driven code review at IEEE conference',
          'Speaker at ReactConf 2024 — "Scaling Design Systems at Startup Speed',
          'Open-source contributor: 100+ merged PRs across popular React libraries',
          'Speaker at ReactConf 2024 — "Scaling Design Systems at Startup Speed',
          'Speaker at ReactConf 2024 — "Scaling Design Systems at Startup Speed',
          'Speaker at ReactConf 2024 — "Scaling Design Systems at Startup Speed',
          'Speaker at ReactConf 2024 — "Scaling Design Systems at Startup Speed',
        ],
      },
    ],
  },

  // ── Interests ────────────────────────────────────────────────────────
  interests: {
    id: 'int-001',
    title: 'interests',
    heading: 'Interests',
    items: [
      {
        itemId: 'int-item-001',
        items: [
          'Open Source Contribution',
          'Technical Writing',
          'Machine Learning',
          'UI/UX Design',
          'Rock Climbing',
          'Photography',
        ],
      },
    ],
  },

  // ── Summary (heading-only, used by some templates) ───────────────────
  summary: {
    heading: 'Summary',
  },

  templateId: 'dummy-template-id',
};

export default dummyResumeData;
