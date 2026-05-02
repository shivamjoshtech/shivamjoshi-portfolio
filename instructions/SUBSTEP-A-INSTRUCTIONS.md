# 🤖 SUB-STEP A — 3D Avatar + Groq AI Brain

---

## PREREQUISITES

### Groq API Key (FREE)
1. Jaao: **https://console.groq.com**
2. Sign up karo (Google/GitHub se)
3. **API Keys** → **Create API Key** → Copy
4. `.env.local` mein add karo:
```
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxx
```

---

## FOLDERS BANAO

```bash
mkdir -p src/app/api/chat
```

---

## FILES KAHAN RAKHNI HAIN

### 1. `chat-route.ts` → NAYA FILE
**Rename:** `route.ts`
**Paste:** `src/app/api/chat/route.ts`
**Kya hai:** Groq AI API endpoint — ARIA ka brain. Llama 3.3 70B model use karta hai for realistic conversation. Offline fallback bhi hai agar Groq key nahi di.

### 2. `AriaAvatar.tsx` → REPLACE
**Replace:** `src/components/avatar/AriaAvatar.tsx`
**Kya hai:** Updated ARIA with:
- Animated SVG avatar face (eyes blink, mouth moves when speaking)
- Groq AI powered responses (realistic, natural conversation)
- Text-to-Speech voice (browser's free speech API)
- Speech-to-Text mic input (Chrome/Edge)
- All conversations saved to Supabase analytics
- Voice toggle (mute/unmute)
- Mic button for voice input

---

## AB KYA HOGA

### ✅ 3D-ish Animated Avatar
- Floating button pe animated SVG face dikhega (blinking eyes, smiling mouth)
- Chat open karne pe header mein bhi animated face
- Jab ARIA bol rahi hai → mouth animate hota hai (speaking animation)
- Jab soch rahi hai → "THINKING..." status

### ✅ Groq AI Brain (FREE)
- Llama 3.3 70B model — bahut smart aur fast
- Shivam ke baare mein sab kuch jaanti hai
- Natural Hinglish conversation support
- Short, chat-like responses (2-3 sentences)
- Visitor se naam, purpose, company details naturally puchti hai

### ✅ Voice Features
- **Text-to-Speech:** ARIA bolti hai — har response voice mein bhi aayega
- **Volume button:** Top-right pe — mute/unmute
- **Mic button:** Voice input — bol ke message bhejo (Chrome/Edge)
- **Speech recognition:** Automatic text mein convert

### ✅ Conversation Storage
- Har message Supabase `analytics` table mein save hota hai
- `event_type: 'avatar_chat'`
- `metadata` mein: conversation_id, visitor_name, user_message, aria_reply
- Admin dashboard Analytics mein dikhega

### ✅ Offline Fallback
- Agar Groq API key nahi di → smart offline responses use honge
- Koi crash nahi hoga — graceful fallback

---

## TESTING

### Test 1 — Chat works
1. Portfolio kholo
2. Bottom-right pe animated face wala button click karo
3. ARIA greet karegi — voice mein bhi bolegi
4. Apna naam type karo
5. ARIA puchegi kyu aaye ho
6. Projects, skills ke baare mein pucho
7. Natural conversation honi chahiye ✅

### Test 2 — Voice works
1. Volume icon ON hai → ARIA ki awaaz sunai degi ✅
2. Mute karo → awaaz band ✅
3. Mic button click karo → bolo → text convert hoga ✅

### Test 3 — Conversations saved
1. Admin → Analytics
2. `AVATAR CHAT` events dikhne chahiye ✅
3. Event details mein visitor_name, messages dikhenge ✅

---

## AGAR GROQ KEY NAHI HAI

ARIA phir bhi kaam karegi — offline mode mein smart hardcoded responses degi. But Groq key ke saath MUCH better realistic conversation hogi.

**Groq FREE tier:**
- 30 requests/minute
- Llama 3.3 70B model
- Bahut fast response (~500ms)
- No credit card needed

---

## AAGE SUB-STEP B MEIN

- Better 3D model (Ready Player Me avatar)
- Lip sync with voice
- More realistic animations
- Better voice options

**Jab ARIA sahi se baat kare, voice aaye, conversations save hon — bol "Sub-Step B"!** 🫡
