# 🎖️ STEP 7 — AI AVATAR (ARIA) — Chat Widget

---

## NAYA FOLDER BANAO

```bash
mkdir -p src/components/avatar
```

---

## FILES KAHAN RAKHNI HAIN

### 1. `AriaAvatar.tsx` → NAYA FILE
**Paste karo:** `src/components/avatar/AriaAvatar.tsx`
**Kya hai:** Full AI chat widget — floating button, chat panel, conversation flow, visitor data collection, smart responses

### 2. `page.tsx` → REPLACE
**Replace karo:** `src/app/page.tsx` (purani delete, naya paste)
**Kya hua:** `<AriaAvatar />` component added — floating button bottom-right pe dikhega

---

## DEV SERVER

```bash
npm run dev
```

Browser: `http://localhost:3000`

---

## AB KYA DIKHEGA

### ✅ Floating Bot Button (Bottom-Right)
- Green pulsing dot with Bot icon
- Hover pe "TALK TO ARIA" tooltip
- Click karo → chat panel khulta hai

### ✅ Chat Panel
- ARIA header with online status
- Smooth open/close animation
- Military-themed dark panel

### ✅ Conversation Flow

**Stage 1 — Greeting:**
> "Hey there, soldier! Welcome to Shivam Joshi's command center. I'm ARIA. What's your name?"

**Stage 2 — Name Collection:**
- User naam type kare → ARIA greet kare by name
- Supabase mein visitor save hoga (agar configured hai)

**Stage 3 — Purpose Selection:**
- 4 clickable options:
  - 💼 Hiring / Job Opportunity
  - 🤝 Freelance Project
  - 🔬 Collaboration
  - 👀 Just Browsing
- Click ya type — dono kaam karta hai

**Stage 4 — Free Chat:**
- ARIA smartly responds based on keywords:
  - "projects" → Project list batata hai
  - "skills" / "tech" → Tech arsenal batata hai
  - "experience" / "tcs" → Work history batata hai
  - "contact" / "email" → Contact info deta hai
  - "hackathon" / "achievement" → Achievements batata hai
  - "resume" → Download guide deta hai
  - "hi" / "thanks" / "bye" → Friendly responses

### ✅ Features:
- Typing indicator (bouncing dots)
- Bold text support (**text**)
- Auto-scroll to latest message
- Keyboard Enter to send
- Visitor data → Supabase (non-blocking, won't crash if not configured)
- Responsive — works on mobile too

---

## SUPABASE NOTE

ARIA visitor data Supabase mein save karne ki try karega. Agar Supabase abhi configured nahi hai toh koi error nahi aayega — silently skip karega. Step 9 (Admin Dashboard) mein tujhe visitor list dikhegi.

---

## AAGE STEP 8 MEIN

**Contact Form + Meeting Scheduler + Resume Download** section — full functional contact system.

**Jab ARIA chat sahi kaam kare (button dikhe, chat khule, naam puche, respond kare), bol "Step 8"!** 🫡
