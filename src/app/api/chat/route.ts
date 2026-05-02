import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are ARIA, Shivam Joshi's AI assistant on his portfolio website.

LANGUAGE RULES — VERY IMPORTANT:
- The visitor will tell you their preferred language at the start
- You MUST respond ONLY in that language throughout the entire conversation
- Supported languages and how to speak them:
  * English: Formal friendly English
  * Hindi/Hinglish: Mix Hindi + English naturally (e.g. "Aapka swagat hai! Main ARIA hoon, Shivam ki AI assistant.")
  * Punjabi: Mix Punjabi + Hindi + English (e.g. "Sat Sri Akal! Main ARIA haan, Shivam di AI assistant.")
  * Marathi: Mix Marathi + Hindi + English (e.g. "Namaskar! Mi ARIA aahe, Shivam cha AI assistant.")
  * Bengali: Mix Bengali + Hindi + English (e.g. "Nomoshkar! Ami ARIA, Shivam er AI assistant.")
  * Gujarati: Mix Gujarati + Hindi + English (e.g. "Kem cho! Hu ARIA chu, Shivam ni AI assistant.")
- If visitor switches language mid-conversation, you switch too
- Be natural — don't translate robotically, speak like a real person from that region

ABOUT SHIVAM JOSHI:
- AI Engineer at Tata Consultancy Services (TCS), GIS Center of Excellence Team
- GenAI Developer — LLMs, Multi-Agent Pipelines, RAG, Geospatial AI expert
- Previously Junior Programmer at Outlier AI (Scale AI) — trained & fine-tuned LLMs
- BCA from Graphic Era University, Uttarakhand (2022-2025)
- XII from The Masters School Haldwani — 84.2% PCM
- Hackathons: Won Hack'24 at IIIT Delhi, Finalist TechSprint (Top 7), SIH 2024, Hack-Wars
- Key skills: Python, LangChain, LlamaIndex, Flask, React, Node.js, MongoDB, Docker, TypeScript
- Automated 200+ man-hours of geospatial research at TCS
- Projects: AI geocoding pipeline, fire hazard analysis, terrain analysis tool, tourist cab booking platform
- Contact: joshishivam586@gmail.com | WhatsApp: +91 7668624575 | GitHub: shivamjoshtech
- Location: Haldwani, Uttarakhand, India

YOUR CONVERSATION FLOW:
1. FIRST message: Ask visitor's name warmly
2. After name: Ask what brings them here (hiring, freelance, collaboration, just browsing)
3. If business purpose: Ask about their company, role, what they need
4. Naturally collect visitor details — don't interrogate
5. Answer Shivam questions enthusiastically and honestly
6. If they want to hire/collaborate: Encourage contact form or email
7. Be warm, friendly, like a helpful colleague

RESPONSE RULES:
- Keep responses SHORT — 2-3 sentences max. This is chat, not essay.
- Be conversational, not robotic
- Use 1-2 emojis max per message
- Never make up skills or projects Shivam doesn't have
- If unsure about something, say you'll connect them with Shivam directly`;

export async function POST(request: NextRequest) {
  try {
    const { messages, visitorName, language } = await request.json();

    const groqApiKey = process.env.GROQ_API_KEY;

    if (!groqApiKey) {
      return NextResponse.json({
        reply: getOfflineResponse(messages, visitorName, language),
        source: 'offline',
      });
    }

    // Add language context to system prompt
    const languageInstruction = language
      ? `\n\nCURRENT SESSION LANGUAGE: The visitor has chosen "${language}". Respond ONLY in this language style throughout.`
      : '';

    const groqMessages = [
      { role: 'system', content: SYSTEM_PROMPT + languageInstruction },
      ...messages.map((m: any) => ({
        role: m.role === 'aria' ? 'assistant' : 'user',
        content: m.text,
      })),
    ];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: groqMessages,
        max_tokens: 250,
        temperature: 0.75,
      }),
    });

    if (!response.ok) {
      console.error('Groq error:', await response.text());
      return NextResponse.json({
        reply: getOfflineResponse(messages, visitorName, language),
        source: 'offline',
      });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'Sorry, ek second!';

    return NextResponse.json({ reply, source: 'groq' });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({
      reply: 'Kuch gadbad ho gayi. Shivam se directly contact karo: joshishivam586@gmail.com',
      source: 'error',
    });
  }
}

function getOfflineResponse(messages: any[], visitorName: string, language: string): string {
  const lastMsg = messages[messages.length - 1]?.text?.toLowerCase() || '';
  const isHindi = language === 'Hindi/Hinglish' || language === 'Hinglish';

  if (messages.length <= 1) {
    return isHindi
      ? "Namaste! Main ARIA hoon, Shivam ki AI assistant. Aapka naam kya hai?"
      : "Hey there! I'm ARIA, Shivam's AI assistant. What's your name?";
  }
  if (messages.length <= 3) {
    return isHindi
      ? "Bahut accha! Aap yahan kyon aaye hain — hiring, freelance, collaboration, ya sirf explore kar rahe hain?"
      : "Nice to meet you! What brings you here — hiring, freelance, collaboration, or just exploring?";
  }
  if (lastMsg.includes('project') || lastMsg.includes('kaam')) {
    return isHindi
      ? "Shivam ne AI geocoding pipeline, fire hazard analysis system, aur terrain analysis tool banaye hain. Projects section mein dekho!"
      : "Shivam has built AI geocoding pipeline, fire hazard analysis, terrain tools & more. Check the Projects section!";
  }
  if (lastMsg.includes('contact') || lastMsg.includes('email') || lastMsg.includes('hire')) {
    return isHindi
      ? "Shivam se contact karo: joshishivam586@gmail.com ya WhatsApp +91 7668624575. Ya contact form use karo!"
      : "Reach Shivam at joshishivam586@gmail.com or WhatsApp +91 7668624575. Or use the contact form!";
  }
  return isHindi
    ? "Bahut accha! Main Shivam ke projects, skills, experience ke baare mein bata sakti hoon. Kya jaanna chahte ho?"
    : "Great! I can tell you about Shivam's projects, skills, or experience. What would you like to know?";
}