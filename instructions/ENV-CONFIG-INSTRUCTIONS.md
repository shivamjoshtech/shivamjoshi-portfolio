# 🎖️ ENV-BASED CONFIG — Ek jagah update, poori site update!

---

## FILES KAHAN RAKHNI HAIN

| File | Action | Path |
|------|--------|------|
| `config.ts` | NAYA FILE | `src/data/config.ts` |
| `HeroStats.tsx` | REPLACE | `src/components/sections/hero/HeroStats.tsx` |
| `.env.local` | UPDATE existing | `.env.local` (project root) |

---

## SETUP

### Step 1 — `config.ts` naya file banao
`src/data/config.ts` mein paste karo.

### Step 2 — `HeroStats.tsx` replace karo
`src/components/sections/hero/HeroStats.tsx` replace karo.

### Step 3 — `.env.local` update karo
Apni existing `.env.local` mein yeh lines ADD karo (Supabase keys wali lines ke neeche):

```env
# STATS
NEXT_PUBLIC_TCS_MONTHS=10
NEXT_PUBLIC_MAN_HOURS=200
NEXT_PUBLIC_HACKATHONS=4
NEXT_PUBLIC_TECH_COUNT=30

# PERSONAL
NEXT_PUBLIC_NAME=Shivam Joshi
NEXT_PUBLIC_EMAIL=joshishivam586@gmail.com
NEXT_PUBLIC_PHONE=+91 7668624575
NEXT_PUBLIC_WHATSAPP=917668624575
NEXT_PUBLIC_GITHUB=https://github.com/shivamjoshtech
NEXT_PUBLIC_LINKEDIN=https://www.linkedin.com/in/shivam-joshi-499335246/
NEXT_PUBLIC_LOCATION=Haldwani, Uttarakhand, India
NEXT_PUBLIC_SITE_URL=https://shivamjoshi.dev
```

### Step 4 — AboutSection mein CONFIG use karo
`src/components/sections/AboutSection.tsx` mein dhundho:

```tsx
// Yeh hardcoded text:
'8+ months of hands-on experience'
'200+ man-hours'
```

Replace karo:
```tsx
import { CONFIG, fmt } from '@/data/config';

// Phir use karo:
`${fmt.tcsMonths} of hands-on experience`  // "10+ months"
`${CONFIG.manHours}+ man-hours`             // "200+"
```

### Step 5 — FloatingTerminal mein CONFIG use karo
`src/components/sections/hero/FloatingTerminal.tsx` mein:
```tsx
import { fmt } from '@/data/config';

// Dhundho:
'8+ months in production AI systems'

// Replace karo:
`${fmt.tcsMonths} in production AI systems`
```

---

## FUTURE MEIN KAISE UPDATE KAREIN

### TCS mein 12 mahine ho gaye?
Sirf `.env.local` mein:
```env
NEXT_PUBLIC_TCS_MONTHS=12
```
Server restart karo → HeroStats, About, FloatingTerminal, ARIA — sab jagah **12+** dikhega!

### 300 man-hours ho gaye?
```env
NEXT_PUBLIC_MAN_HOURS=300
```

### Vercel pe deployed hai toh:
Vercel Dashboard → Settings → Environment Variables → update karo → Redeploy!

---

## KAUNSE COMPONENTS CONFIG SE CONNECTED HAIN

| Component | Variable | Example |
|-----------|----------|---------|
| `HeroStats.tsx` | `NEXT_PUBLIC_TCS_MONTHS` | "10+" counter |
| `HeroStats.tsx` | `NEXT_PUBLIC_MAN_HOURS` | "200+" counter |
| `HeroStats.tsx` | `NEXT_PUBLIC_HACKATHONS` | "4" counter |
| `HeroStats.tsx` | `NEXT_PUBLIC_TECH_COUNT` | "30+" counter |
| `AboutSection.tsx` | `NEXT_PUBLIC_TCS_MONTHS` | Description text |
| `FloatingTerminal.tsx` | `NEXT_PUBLIC_TCS_MONTHS` | Terminal output |
| `ContactSection.tsx` | `NEXT_PUBLIC_EMAIL` | Email link |
| `ContactSection.tsx` | `NEXT_PUBLIC_WHATSAPP` | WhatsApp link |

---

## NOTE — NEXT_PUBLIC_ kyun?

Next.js mein jo variables `NEXT_PUBLIC_` se start hote hain, woh browser mein bhi accessible hote hain. Isliye components mein directly use kar sakte hain. Baki keys (GROQ_API_KEY, ADMIN_SECRET_KEY) server-side only hoti hain — secure rehti hain.
