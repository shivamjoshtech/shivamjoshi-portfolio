# 🎖️ SMART TIME CALCULATOR — Joining Date Se Auto Update!

---

## FILES

| File | Action | Path |
|------|--------|------|
| `config.ts` | NAYA | `src/data/config.ts` |
| `HeroStats.tsx` | REPLACE | `src/components/sections/hero/HeroStats.tsx` |
| `.env.local` | UPDATE | `.env.local` (project root) |

---

## SETUP

### 1. `config.ts` — `src/data/config.ts` mein paste karo

### 2. `HeroStats.tsx` — replace karo

### 3. `.env.local` mein yeh lines ADD karo:
```env
NEXT_PUBLIC_TCS_JOIN_DATE=2024-07-01
NEXT_PUBLIC_MAN_HOURS=200
NEXT_PUBLIC_HACKATHONS=4
NEXT_PUBLIC_TECH_COUNT=30
```

---

## AB KYA HOGA AUTOMATICALLY

### Aaj (May 2026):
- TCS join: July 2024
- Auto calculate: **1 Year 10 Months**
- HeroStat: **1+ Year at TCS** (with "10M more" subtitle)

### August 2026 mein:
- Auto calculate: **2 Years 1 Month**
- HeroStat: **2+ Years at TCS**
- **Kuch nahi karna — khud update hoga!**

### December 2026 mein:
- Auto calculate: **2 Years 5 Months**
- HeroStat: **2+ Years at TCS**

---

## CALCULATION LOGIC

```
Join: July 1, 2024
Today: May 2026

Years = 2026 - 2024 = 2 → but months adjust...
Months = May(4) - July(6) = -2 → so years-1, months+12
= 1 year, 10 months ✅
```

---

## DISPLAY FORMATS

| Situation | `display` | `heroStat` | `ariaText` |
|-----------|-----------|------------|------------|
| 10 months | "10 Months" | "10+ Months" | "10 months" |
| 1 year exactly | "1 Year" | "1+ Year" | "1 year" |
| 1 yr 10 mo | "1 Year 10 Months" | "1+ Year" | "1 year and 10 months" |
| 2 yrs 3 mo | "2 Years 3 Months" | "2+ Years" | "2 years and 3 months" |

---

## ABOUTSECTION UPDATE (optional)

`src/components/sections/AboutSection.tsx` mein:

```tsx
// Top pe add karo:
import { fmt } from '@/data/config';

// Phir dhundho hardcoded text aur replace karo:
// "8+ months of hands-on experience"
// → `${fmt.tcsExp} of hands-on experience`

// "200+ man-hours"
// → `${fmt.manHours} man-hours`
```

## FLOATINGTERMINAL UPDATE (optional)

`src/components/sections/hero/FloatingTerminal.tsx` mein:

```tsx
import { fmt } from '@/data/config';

// Replace karo:
// '8+ months in production AI systems'
// → `${fmt.tcsHero} in production AI systems`
```

## ARIA (chat-route) UPDATE (optional)

`src/app/api/chat/route.ts` mein system prompt mein:

```ts
import { fmt } from '@/data/config';
// Note: API routes mein bhi CONFIG kaam karta hai!

// Replace in SYSTEM_PROMPT:
// "8+ months"
// → `${fmt.tcsAria}`  // "1 year and 10 months"
```

---

## VERCEL PE KAISE UPDATE KAREIN

1. Vercel Dashboard → Project → Settings → Environment Variables
2. `NEXT_PUBLIC_TCS_JOIN_DATE` → value same rehti hai (date change nahi hoti!)
3. Stats change karni ho toh → `NEXT_PUBLIC_MAN_HOURS=300` etc update karo
4. **Redeploy** → Done!

**Date se auto-calculate hota hai → date kabhi change nahi karni!
Sirf deploy karo → latest months/years automatically dikhega!** 🎯

---

## SUMMARY — Future mein kya karna hai?

| Situation | Kya karo |
|-----------|----------|
| Months badhte gaye | **Kuch nahi!** Auto update hoga |
| Man-hours badhe (200→300) | `.env.local` mein `NEXT_PUBLIC_MAN_HOURS=300` |
| Nayi technology seekhi | `.env.local` mein `NEXT_PUBLIC_TECH_COUNT=35` |
| Nayi company join ki | Naya join date env mein add karo |
| Vercel pe hai | Vercel env vars update karo → Redeploy |
