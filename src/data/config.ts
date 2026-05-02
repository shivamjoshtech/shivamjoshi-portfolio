// ============================================
// src/data/config.ts
// CENTRAL PORTFOLIO CONFIG
//
// .env.local mein update karo → poori site update!
// Date daalo → years/months automatically calculate hoga!
// ============================================

// ---- AUTO TIME CALCULATOR ----
function calcExperience(joinDateStr: string): {
  years: number;
  months: number;
  totalMonths: number;
  display: string;       // "1 Year 10 Months"
  short: string;         // "1Y 10M"
  heroStat: string;      // "1+ Year" or "22+ Months"
  ariaText: string;      // "1 year and 10 months"
} {
  const join = new Date(joinDateStr);
  const now = new Date();

  let years = now.getFullYear() - join.getFullYear();
  let months = now.getMonth() - join.getMonth();

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalMonths = years * 12 + months;

  // Display format
  let display = '';
  let heroStat = '';
  let ariaText = '';

  if (years === 0) {
    display = `${totalMonths} Months`;
    heroStat = `${totalMonths}+ Months`;
    ariaText = `${totalMonths} months`;
  } else if (months === 0) {
    display = `${years} Year${years > 1 ? 's' : ''}`;
    heroStat = `${years}+ Year${years > 1 ? 's' : ''}`;
    ariaText = `${years} year${years > 1 ? 's' : ''}`;
  } else {
    display = `${years} Year${years > 1 ? 's' : ''} ${months} Month${months > 1 ? 's' : ''}`;
    heroStat = `${years}+ Year${years > 1 ? 's' : ''}`;
    ariaText = `${years} year${years > 1 ? 's' : ''} and ${months} months`;
  }

  return {
    years,
    months,
    totalMonths,
    display,
    short: years === 0 ? `${totalMonths}M` : `${years}Y ${months}M`,
    heroStat,
    ariaText,
  };
}

// ---- JOINING DATE — Sirf yeh change karo! ----
const TCS_JOIN_DATE = process.env.NEXT_PUBLIC_TCS_JOIN_DATE || '2024-07-01';
const OUTLIER_JOIN_DATE = process.env.NEXT_PUBLIC_OUTLIER_JOIN_DATE || '2024-04-01';

export const TCS_EXP = calcExperience(TCS_JOIN_DATE);

// ============================================
// MAIN CONFIG — .env.local se load hoga
// ============================================
export const CONFIG = {
  // ---- PERSONAL ----
  name: process.env.NEXT_PUBLIC_NAME || 'Shivam Joshi',
  role: process.env.NEXT_PUBLIC_ROLE || 'AI Engineer',
  company: process.env.NEXT_PUBLIC_COMPANY || 'TCS',
  location: process.env.NEXT_PUBLIC_LOCATION || 'Haldwani, Uttarakhand, India',

  // ---- CONTACT ----
  email: process.env.NEXT_PUBLIC_EMAIL || 'joshishivam586@gmail.com',
  phone: process.env.NEXT_PUBLIC_PHONE || '+91 7668624575',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '917668624575',
  github: process.env.NEXT_PUBLIC_GITHUB || 'https://github.com/shivamjoshtech',
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN || 'https://www.linkedin.com/in/shivam-joshi-499335246/',

  // ---- STATS ----
  tcsJoinDate: TCS_JOIN_DATE,
  tcsMonths: TCS_EXP.totalMonths,              // Auto: current months
  tcsDisplay: TCS_EXP.display,                 // Auto: "1 Year 10 Months"
  tcsHeroStat: TCS_EXP.heroStat,              // Auto: "1+ Year"
  tcsAriaText: TCS_EXP.ariaText,              // Auto: "1 year and 10 months"

  manHours: Number(process.env.NEXT_PUBLIC_MAN_HOURS) || 200,
  hackathons: Number(process.env.NEXT_PUBLIC_HACKATHONS) || 4,
  techCount: Number(process.env.NEXT_PUBLIC_TECH_COUNT) || 30,

  // ---- SITE ----
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://shivamjoshi.dev',
} as const;

// ---- DISPLAY HELPERS ----
export const fmt = {
  tcsExp: CONFIG.tcsDisplay,        // "1 Year 10 Months"
  tcsHero: CONFIG.tcsHeroStat,      // "1+ Year" (for hero stat)
  tcsAria: CONFIG.tcsAriaText,      // "1 year and 10 months" (for ARIA)
  manHours: `${CONFIG.manHours}+`,
  hackathons: `${CONFIG.hackathons}`,
  techCount: `${CONFIG.techCount}+`,
};