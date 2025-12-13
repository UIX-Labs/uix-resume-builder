/**
 * Central file for all Cloudinary image URLs
 * Import these constants whenever you need to use an image in the codebase
 */

const CLOUDINARY_BASE = "https://res.cloudinary.com/dkxocdrky/image/upload";

// ============================================
// LOGOS - Company & Brand logos
// ============================================
export const LOGOS = {
  // Company logos
  GOOGLE: `${CLOUDINARY_BASE}/v1765473837/google-logo_c1xk5c.svg`,
  GOOGLE_COLORED: `${CLOUDINARY_BASE}/v1765473861/google_jsze6m.svg`,
  MICROSOFT: `${CLOUDINARY_BASE}/v1765473837/microsoft-logo_ir83qh.svg`,
  APPLE: `${CLOUDINARY_BASE}/v1765473847/apple-logo_v7tcjv.svg`,
  META: `${CLOUDINARY_BASE}/v1765473845/meta-logo_cm0zv5.svg`,
  AMAZON: `${CLOUDINARY_BASE}/v1765473839/amazon-logo_ezflww.svg`,
  NVIDIA: `${CLOUDINARY_BASE}/v1765473846/nvidia-logo_ohdrwd.svg`,
  LINKEDIN: `${CLOUDINARY_BASE}/v1765473862/linkedin_tihsl7.svg`,
  
  // Pika Resume logo
  PIKA_RESUME: `${CLOUDINARY_BASE}/v1765386526/Pika-Resume_rroar1.png`,
} as const;

// ============================================
// ICONS - UI Icons & Decorations
// ============================================
export const ICONS = {
  // Action icons
  DELETE: `${CLOUDINARY_BASE}/v1765473876/delete_lmavgn.svg`,
  PLUS: `${CLOUDINARY_BASE}/v1765473868/plus_yeqxin.svg`,
  CLOSE: `${CLOUDINARY_BASE}/v1765473868/close_uvqeek.svg`,
  CHEVRON_UP: `${CLOUDINARY_BASE}/v1765473877/cheveron-up_qfqjz5.svg`,
  DRAG: `${CLOUDINARY_BASE}/v1765473869/drag_msxj9a.svg`,
  LINK: `${CLOUDINARY_BASE}/v1765473855/link_lmjmp5.svg`,
  
  // Eye icons for password visibility
  EYE_OFF: `${CLOUDINARY_BASE}/v1765473853/eye-off_wa8bis.svg`,
  EYE_OPEN: `${CLOUDINARY_BASE}/v1765473854/eye-open_suzduo.svg`,
  
  // Feature icons
  AUTO_AWESOME: `${CLOUDINARY_BASE}/v1765473863/auto_awesome_fi5kfd.svg`,
  FLASH: `${CLOUDINARY_BASE}/v1765473876/flash_jxlwo8.svg`,
  MOON: `${CLOUDINARY_BASE}/v1765473876/moon_xgvfph.svg`,
  VISION: `${CLOUDINARY_BASE}/v1765473869/vision_bm5rhj.svg`,
  UNION: `${CLOUDINARY_BASE}/v1765473862/Union_sgfml5.svg`,
  COMMUNITY: `${CLOUDINARY_BASE}/v1765473854/community_dqr7uo.svg`,
  EXPERIENCE: `${CLOUDINARY_BASE}/v1765473861/epereince_u4alve.svg`,
  
  // Decorative icons
  STAR: `${CLOUDINARY_BASE}/v1765473868/Star_adbmig.svg`,
  STAR_DECORATION: `${CLOUDINARY_BASE}/v1765473867/star-decoration_liglaw.svg`,
  COLOR_PALETTE: `${CLOUDINARY_BASE}/v1765473838/color-palete_iwyzvj.svg`,
  VECTOR: `${CLOUDINARY_BASE}/v1765473869/Vector_oivahu.png`,
} as const;

// ============================================
// IMAGES - Photos & Illustrations
// ============================================
export const IMAGES = {
  // About us / Team
  GROUP_35: `${CLOUDINARY_BASE}/v1765473849/Group-35_igkhhr.png`,
  
  // Dashboard & Resume
  RESUME_SCORE: `${CLOUDINARY_BASE}/v1765473837/resume-score-img_jusb9j.svg`,
  TEMPLATE_DASHBOARD: `${CLOUDINARY_BASE}/v1765473839/template-dashboard_walckp.png`,
  PIKA_INTELLIGENCE: `${CLOUDINARY_BASE}/v1765473838/pika-intelligence_yai0zt.svg`,
  RAT: `${CLOUDINARY_BASE}/v1765473837/rat_q2bkol.png`,
  
  // Hero section
  HIRED: `${CLOUDINARY_BASE}/v1765386539/image-hired_ic0slp.svg`,
  TEMPLATES: `${CLOUDINARY_BASE}/v1765386543/templates_yifags.svg`,
  
  // Roast page templates
  ROAST_TEMPLATE_1: `${CLOUDINARY_BASE}/v1765386542/template-1_fjrdnu.svg`,
  ROAST_TEMPLATE_2: `${CLOUDINARY_BASE}/v1765386540/template-2_zbdojf.svg`,
  ROAST_TEMPLATE_3: `${CLOUDINARY_BASE}/v1765386537/template-3_skituu.svg`,
  
  // LinkedIn integration
  LINKEDIN_INTEGRATION_BG: `${CLOUDINARY_BASE}/v1765386527/image-14_uckcwl.svg`,
} as const;

// ============================================
// BACKGROUNDS - Background images & patterns
// ============================================
export const BACKGROUNDS = {
  LANDING_PAGE: `${CLOUDINARY_BASE}/v1765386532/landing-page-bg_jgjrgv.svg`,
  ANALYZER_MODAL: `${CLOUDINARY_BASE}/v1765473847/background_zbjgtc.svg`,
  PROGRESS_BAR: `${CLOUDINARY_BASE}/v1765473853/progress-bar-bg_mbl4zb.svg`,
  BG_GRADIENT: `${CLOUDINARY_BASE}/v1765473844/bg-gradient_ivodis.svg`,
  WAITLIST: `${CLOUDINARY_BASE}/v1765473838/waitlist_rf3zs1.svg`,
  WAITLIST_SUCCESS: `${CLOUDINARY_BASE}/v1765473849/waitlist-success_ucgu2m.svg`,
  SPHERE_DYNAMIC: `${CLOUDINARY_BASE}/v1765386525/sphere-dynamic-color_sxtipd.svg`,
} as const;

// ============================================
// TESTIMONIALS - User testimonial images
// ============================================
export const TESTIMONIALS = {
  USER_1: `${CLOUDINARY_BASE}/v1765386528/testinomials-1_vsbyto.png`,
  USER_2: `${CLOUDINARY_BASE}/v1765386530/testinomials-2_k9mlpp.png`,
  USER_3: `${CLOUDINARY_BASE}/v1765386533/testinomials-3_naru9m.png`,
  USER_4: `${CLOUDINARY_BASE}/v1765386530/testinomials-4_qhphut.png`,
} as const;

// ============================================
// FAVICONS - App icons
// ============================================
export const FAVICONS = {
  SIZE_48: "/images/fav-icons/fav-icon(48*48).png",
  SIZE_96: "/images/fav-icons/fav-icon(96*96).png",
  SIZE_108: "/images/fav-icons/fav-icon(108*108).png",
} as const;

// ============================================
// FALLBACKS - Default/placeholder images
// ============================================
export const FALLBACKS = {
  PROFILE: `${CLOUDINARY_BASE}/v1765473867/profile_kq4mbx.svg`,
} as const;

