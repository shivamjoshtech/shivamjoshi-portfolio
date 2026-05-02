# 🎖️ FIXES — Contact Messages, Resume Upload, ARIA Projects

---

## 🔴 PROBLEM 1 — Contact Messages Admin Dashboard Mein Nahi Dikh Rahe

**Wajah:** Supabase RLS (Row Level Security) policies SELECT allow nahi karti thi.

**Fix — SQL Run Karo:**

1. Supabase dashboard kholo → **SQL Editor** → **New Query**
2. `fix-policies.sql` file ka pura content paste karo
3. **Run** button click karo
4. Success message aayega: "All policies updated!"

Ab jab koi contact form submit karega, admin dashboard mein turant dikhega! ✅

---

## 🟢 PROBLEM 2 — Resume Upload Feature

Maine **Settings page** banaya hai admin dashboard mein jaha se tu resume upload kar sakta hai.

### Files Kahan Rakhni Hain:

### 1. `settings-page.tsx` → NAYA FILE
**Pehle folder banao:**
```bash
mkdir -p src/app/admin/dashboard/settings
```

**Rename:** `settings-page.tsx` → `page.tsx`
**Paste:** `src/app/admin/dashboard/settings/page.tsx`

### 2. `dashboard-layout.tsx` → REPLACE
**Rename:** `dashboard-layout.tsx` → `layout.tsx`
**Replace:** `src/app/admin/dashboard/layout.tsx`
**Kya badla:** Settings link add hua sidebar mein

### 3. `ContactSection.tsx` → REPLACE
**Replace:** `src/components/sections/ContactSection.tsx`
**Kya badla:** Resume URL aur Calendly URL ab dynamically Supabase se load hote hain

### Supabase Storage Bucket Banao (One-time):

1. Supabase dashboard → **Storage**
2. Click **"New bucket"**
3. Name: `resumes`
4. **"Public bucket"** toggle ON karo
5. Click **Create**

### Resume Upload Karne Ka Tarika:

1. Admin dashboard → **Settings** (sidebar mein)
2. **"CHOOSE PDF FILE"** click karo
3. Apna resume PDF select karo (max 5MB)
4. Automatically upload hoga aur URL save ho jayega
5. Portfolio ke Contact section pe "Download Resume" button ab actual PDF download karega!

**Calendly URL bhi yahan se save kar sakta hai** — admin panel mein Settings page pe.

---

## 🤖 PROBLEM 3 — ARIA Bot Mein Project Names Update

### File Replace Karo:

**Replace:** `src/components/avatar/AriaAvatar.tsx`
**File:** `AriaAvatar.tsx`

**Kya badla:**
- ~~GeoGenie~~ → **"AI-Powered Geocoding Pipeline"**
- ~~GEO-HAZARD~~ → **"Fire Hazard Analysis System"**
- ~~GeoElevation~~ → **"Terrain Analysis Tool"**
- ~~SafarTravels~~ → **"Tourist Cab Booking Platform"**

Plus naye keywords add kiye:
- "geocod" / "address" → Explains Geocoding Pipeline
- "fire" / "hazard" / "insurance" → Explains Fire Hazard System
- "terrain" / "elevation" / "dem" → Explains Terrain Tool
- "travel" / "cab" / "tourist" / "uttarakhand" → Explains Booking Platform

---

## 📋 QUICK CHECKLIST

| Task | Status |
|------|--------|
| 1. `fix-policies.sql` run in Supabase | ☐ |
| 2. Create `resumes` bucket in Supabase Storage (public) | ☐ |
| 3. Create folder `src/app/admin/dashboard/settings/` | ☐ |
| 4. Paste `settings-page.tsx` as `page.tsx` | ☐ |
| 5. Replace `dashboard-layout.tsx` → `layout.tsx` | ☐ |
| 6. Replace `ContactSection.tsx` | ☐ |
| 7. Replace `AriaAvatar.tsx` | ☐ |
| 8. Save all, restart `npm run dev` | ☐ |
| 9. Test contact form — message should appear in admin dashboard | ☐ |
| 10. Upload resume via admin Settings page | ☐ |

---

## 🔍 TESTING

### Test 1 — Contact Form
1. Portfolio kholo → Contact section pe jao
2. Form fill karo → Send click karo
3. Admin dashboard → Contacts pe jao
4. **Message wahan dikhna chahiye!** ✅

### Test 2 — Resume Upload
1. Admin → Settings
2. Resume upload karo (PDF)
3. Portfolio → Contact section → "Download Resume" click karo
4. **PDF download hona chahiye!** ✅

### Test 3 — ARIA Bot
1. Chat button click karo
2. Type "tell me about projects"
3. **Naye generic project names dikhne chahiye** (no GeoGenie, etc.) ✅

---

**Bas! 3 problems fixed. Jo tujhe error aaye toh bata! 🫡**
