import { CLOUDINARY_IMAGE_BASE_URL } from "@shared/lib/constants";

export const templates = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  image: "https://res.cloudinary.com/dkxocdrky/image/upload/v1765473839/template-dashboard_walckp.png",
  name: `Template ${i + 1}`,
}));

export const testimonials = [
  {
    img: CLOUDINARY_IMAGE_BASE_URL + "/v1765386528/testinomials-1_vsbyto.png",
    text: `"Pika Resume made my work easier with LinkedIn import. My resume was ready in 3 minutes with good formatting and clear structure."`,
    name: "Akash Agrawal",
    role: "Zepto",
    position: "Staff Software Engineer",
  },

  {
    img: CLOUDINARY_IMAGE_BASE_URL + "/v1765386530/testinomials-2_k9mlpp.png",
    text: `"If you want to grab a recruiter's attention, Pika Resume is the way to go."`,
    name: "Parul",
    role: "ServiceNow",
    position: "Staff Software Engineer",
  },

  {
    img: CLOUDINARY_IMAGE_BASE_URL + "/v1765386533/testinomials-3_naru9m.png",
    text: `"Pika intelligence helped me build my resume according to the JD. It was ready very quickly and presented my skills clearly."`,
    name: "Akshat Bhargav",
    role: "TikTok",
    position: "Senior Software Engineer",
  },

  {
    img: CLOUDINARY_IMAGE_BASE_URL + "/v1765386530/testinomials-4_qhphut.png",
    text: `"Pika Resume suggests improvements and turns the boring points in your experience into interesting ones. It helps present your work in a way that catches recruiters' attention."`,
    name: "Shivam Sharma",
    role: "Uber",
    position: "Engineering Manager",
  },
];

export const companiesLeft = [
  {
    name: "Google",
    logo: "https://res.cloudinary.com/dkxocdrky/image/upload/v1765473837/google-logo_c1xk5c.svg",
    bgColor: "rgba(255, 241, 200, 1)",
    position: { x: 0, y: 0 },
    role: "UX Designer",
  },
  {
    name: "Meta",
    logo: "https://res.cloudinary.com/dkxocdrky/image/upload/v1765473845/meta-logo_cm0zv5.svg",
    bgColor: "rgba(214, 235, 255, 1)",
    position: { x: 44, y: 96 },
    role: "Software Engineer",
  },
  {
    name: "Microsoft",
    logo: "https://res.cloudinary.com/dkxocdrky/image/upload/v1765473837/microsoft-logo_ir83qh.svg",
    bgColor: "rgba(225, 255, 190, 1)",
    position: { x: 88, y: 192 },
    role: "Product Manager",
  },
];

export const companiesRight = [
  {
    name: "Apple",
    logo: "https://res.cloudinary.com/dkxocdrky/image/upload/v1765473847/apple-logo_v7tcjv.svg",
    bgColor: "rgb(0,0,0)",
    position: { x: 106, y: 0 },
    role: "HR, Marketing",
  },
  {
    name: "NVIDIA",
    logo: "https://res.cloudinary.com/dkxocdrky/image/upload/v1765473846/nvidia-logo_ohdrwd.svg",
    bgColor: "rgba(206, 255, 120, 1)",
    position: { x: 53, y: 96 },
    role: "Data Scientist",
  },
  {
    name: "Amazon",
    logo: "https://res.cloudinary.com/dkxocdrky/image/upload/v1765473839/amazon-logo_ezflww.svg",
    bgColor: "rgb(255, 227, 190)",
    position: { x: 0, y: 192 },
    role: "Sales Engineer",
  },
];
