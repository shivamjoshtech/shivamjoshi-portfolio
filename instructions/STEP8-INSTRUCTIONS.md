# 🎖️ STEP 8 — CONTACT, RESUME DOWNLOAD & MEETING SCHEDULER

---

## FILES KAHAN RAKHNI HAIN

### 1. `ContactSection.tsx` → NAYA FILE
**Paste karo:** `src/components/sections/ContactSection.tsx`
**Kya hai:** Full contact section — form, direct links, resume download, meeting scheduler

### 2. `page.tsx` → REPLACE
**Replace karo:** `src/app/page.tsx` (purani delete, naya paste)
**Kya hua:** Contact placeholder hata ke `<ContactSection />` add hua + footer added

---

## DEV SERVER

```bash
npm run dev
```

Browser: `http://localhost:3000` → scroll to Contact

---

## AB KYA DIKHEGA

### ✅ LEFT SIDE — Contact Form (Terminal Style)
- Terminal header (SEND_MESSAGE.exe)
- **Name** field (required)
- **Email** field (required)
- **Subject** dropdown — Hiring, Freelance, Collaboration, Technical Question, Other
- **Message** textarea (required)
- **SEND MESSAGE** button
  - Supabase mein save hoga (agar configured)
  - Agar Supabase nahi hai → mailto fallback (email client khulega)
- Success/error message animation

### ✅ RIGHT SIDE — Info Cards

**Direct Channels:**
- 📧 Email — joshishivam586@gmail.com (clickable → opens email)
- 💬 WhatsApp — +91 7668624575 (clickable → opens WhatsApp)
- 💼 LinkedIn — Shivam Joshi (clickable → opens profile)
- 🐙 GitHub — shivamjoshtech (clickable → opens GitHub)

**Resume Download:**
- "Download Resume (PDF)" button
- Command gold themed card
- Abhi button hai — resume PDF `public/resume/` mein rakhna baad mein

**Schedule Meeting:**
- "Book a Call" button → Calendly link
- HUD cyan themed card
- Calendly free account banake link update karna

**Location:**
- 📍 HALDWANI, UTTARAKHAND, INDIA

### ✅ FOOTER
- "DESIGNED & BUILT BY SHIVAM JOSHI"
- "© 2025 • ALL RIGHTS RESERVED"

---

## RESUME SETUP (Baad mein)

1. Apna resume PDF `public/resume/shivam-joshi-resume.pdf` mein rakh
2. ContactSection mein resume button ka href update kar:
   ```
   href="/resume/shivam-joshi-resume.pdf"
   download
   ```

## CALENDLY SETUP (Free)

1. https://calendly.com pe free account banao
2. 30-min meeting slot setup karo
3. Apna Calendly link copy karo
4. ContactSection mein "Book a Call" button ka href update kar

---

## AAGE STEP 9 MEIN

**Admin Dashboard** — secret protected route, projects add/edit, visitor list, contact requests, analytics.

**Jab Contact section sahi dikh jaye with form aur cards, bol "Step 9"!** 🫡
