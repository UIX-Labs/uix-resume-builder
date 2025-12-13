import { LOGOS, IMAGES, TESTIMONIALS as TESTIMONIAL_IMAGES } from "@shared/lib/image-assets";

export const templates = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  image: IMAGES.TEMPLATE_DASHBOARD,
  name: `Template ${i + 1}`,
}));

export const testimonials = [
  {
    img: TESTIMONIAL_IMAGES.USER_1,
    text: `"Pika Resume made my work easier with LinkedIn import. My resume was ready in 3 minutes with good formatting and clear structure."`,
    name: "Akash Agrawal",
    role: "Zepto",
    position: "Staff Software Engineer",
  },

  {
    img: TESTIMONIAL_IMAGES.USER_2,
    text: `"If you want to grab a recruiter's attention, Pika Resume is the way to go."`,
    name: "Parul",
    role: "ServiceNow",
    position: "Staff Software Engineer",
  },

  {
    img: TESTIMONIAL_IMAGES.USER_3,
    text: `"Pika intelligence helped me build my resume according to the JD. It was ready very quickly and presented my skills clearly."`,
    name: "Akshat Bhargav",
    role: "TikTok",
    position: "Senior Software Engineer",
  },

  {
    img: TESTIMONIAL_IMAGES.USER_4,
    text: `"Pika Resume suggests improvements and turns the boring points in your experience into interesting ones. It helps present your work in a way that catches recruiters' attention."`,
    name: "Shivam Sharma",
    role: "Uber",
    position: "Engineering Manager",
  },
];

export const companiesLeft = [
  {
    name: "Google",
    logo: LOGOS.GOOGLE,
    bgColor: "rgba(255, 241, 200, 1)",
    position: { x: 0, y: 0 },
    role: "UX Designer",
  },
  {
    name: "Meta",
    logo: LOGOS.META,
    bgColor: "rgba(214, 235, 255, 1)",
    position: { x: 44, y: 96 },
    role: "Software Engineer",
  },
  {
    name: "Microsoft",
    logo: LOGOS.MICROSOFT,
    bgColor: "rgba(225, 255, 190, 1)",
    position: { x: 88, y: 192 },
    role: "Product Manager",
  },
];

export const companiesRight = [
  {
    name: "Apple",
    logo: LOGOS.APPLE,
    bgColor: "rgb(0,0,0)",
    position: { x: 106, y: 0 },
    role: "HR, Marketing",
  },
  {
    name: "NVIDIA",
    logo: LOGOS.NVIDIA,
    bgColor: "rgba(206, 255, 120, 1)",
    position: { x: 53, y: 96 },
    role: "Data Scientist",
  },
  {
    name: "Amazon",
    logo: LOGOS.AMAZON,
    bgColor: "rgb(255, 227, 190)",
    position: { x: 0, y: 192 },
    role: "Sales Engineer",
  },
];
