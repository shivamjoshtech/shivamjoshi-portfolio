'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioStore } from '@/lib/store';
import {
  X, Send, Bot, User, Volume2, VolumeX,
  Mic, MicOff, Sparkles, Maximize2, Minimize2, Globe,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'aria' | 'user';
  text: string;
  timestamp: Date;
}

// ============================================
// SUPPORTED LANGUAGES
// ============================================
const LANGUAGES = [
  { code: 'en-IN', label: '🇬🇧 English',         name: 'English',        ttsLang: 'en-IN', greeting: "Hello! I'm ARIA 👋 What's your name?" },
  { code: 'hi-IN', label: '🇮🇳 Hindi / Hinglish', name: 'Hindi/Hinglish', ttsLang: 'hi-IN', greeting: 'Namaste! Main ARIA hoon 👋 Aapka naam kya hai?' },
];

// ============================================
// HINGLISH CONVERTER for better TTS
// ============================================
function toHinglish(text: string): string {
  const map: Record<string, string> = {
    'Hello': 'Helo', 'hello': 'helo',
    'Welcome': 'Velkam', 'welcome': 'velkam',
    "I'm": 'Main hoon', 'I am': 'Main hoon',
    'Thank you': 'Shukriya', 'thank you': 'shukriya',
    'Thanks': 'Shukriya', 'thanks': 'shukriya',
    'Sorry': 'Maafi', 'sorry': 'maafi',
    'Great': 'Bahut accha', 'great': 'bahut accha',
    'Awesome': 'Bahut badiya', 'awesome': 'bahut badiya',
    'absolutely': 'bilkul', 'Absolutely': 'Bilkul',
    'definitely': 'zaroor', 'Definitely': 'Zaroor',
    'Of course': 'Bilkul', 'of course': 'bilkul',
    "Let's": 'Chalo', "let's": 'chalo',
    'connect': 'connect karte hain',
    'nice to meet you': 'bahut accha laga',
    'Nice to meet you': 'Bahut accha laga',
    'great to meet you': 'bahut khushi hui',
    'How are you': 'Kaisa chal raha hai',
    'exciting': 'bahut exciting',
    'interesting': 'dilchasp',
    'important': 'zaroori',
    'check': 'dekho', 'Check': 'Dekho',
    'reach': 'contact karo', 'Reach': 'Contact karo',
  };
  let result = text;
  const sorted = Object.entries(map).sort((a, b) => b[0].length - a[0].length);
  for (const [eng, hin] of sorted) {
    result = result.replace(new RegExp(`\\b${eng}\\b`, 'g'), hin);
  }
  return result;
}

// ============================================
// ROBOT SVG COMPONENT
// ============================================
function RobotAvatar({ isSpeaking, isThinking }: { isSpeaking: boolean; isThinking: boolean }) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <svg width="120" height="150" viewBox="0 0 120 150" fill="none" xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_20px_rgba(34,197,94,0.4)]">
        {/* Antenna */}
        <motion.line x1="60" y1="10" x2="60" y2="25" stroke="#22c55e" strokeWidth="2" strokeLinecap="round"
          animate={{ y1: [10, 8, 10] }} transition={{ repeat: Infinity, duration: 2 }} />
        <motion.circle cx="60" cy="8" r="4" fill="#22c55e"
          animate={{ fill: isSpeaking ? ['#22c55e','#fbbf24','#22c55e'] : ['#22c55e','#166534','#22c55e'], r: isSpeaking ? [4,6,4] : [4,3,4] }}
          transition={{ repeat: Infinity, duration: isSpeaking ? 0.4 : 2 }} />
        {/* Head */}
        <motion.rect x="20" y="25" width="80" height="65" rx="15" fill="#0d1117" stroke="#22c55e" strokeWidth="1.5"
          animate={{ y: [25,23,25] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }} />
        <motion.rect x="28" y="33" width="64" height="45" rx="8" fill="#0a1628" stroke="#22c55e" strokeWidth="1" strokeOpacity="0.5"
          animate={{ y: [33,31,33] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }} />
        {/* Eyes */}
        <motion.circle cx="42" cy="53" r={isSpeaking ? 8 : 6} fill={isThinking ? '#f59e0b' : '#22c55e'}
          animate={isSpeaking ? { r:[6,8,6], opacity:[1,0.7,1] } : { scaleY:[1,0.1,1] }}
          transition={{ repeat: Infinity, duration: isSpeaking ? 0.3 : 4, repeatDelay: isSpeaking ? 0 : 2 }}
          style={{ transformOrigin: '42px 53px' }} />
        <motion.circle cx="78" cy="53" r={isSpeaking ? 8 : 6} fill={isThinking ? '#f59e0b' : '#22c55e'}
          animate={isSpeaking ? { r:[6,8,6], opacity:[1,0.7,1] } : { scaleY:[1,0.1,1] }}
          transition={{ repeat: Infinity, duration: isSpeaking ? 0.3 : 4, repeatDelay: isSpeaking ? 0 : 2, delay: 0.1 }}
          style={{ transformOrigin: '78px 53px' }} />
        {/* Glow rings */}
        <motion.circle cx="42" cy="53" r="12" fill="#22c55e" opacity="0.1"
          animate={{ r: isSpeaking ? [12,16,12] : [12,10,12], opacity: isSpeaking ? [0.15,0.3,0.15] : [0.05,0.1,0.05] }}
          transition={{ repeat: Infinity, duration: isSpeaking ? 0.3 : 3 }} />
        <motion.circle cx="78" cy="53" r="12" fill="#22c55e" opacity="0.1"
          animate={{ r: isSpeaking ? [12,16,12] : [12,10,12], opacity: isSpeaking ? [0.15,0.3,0.15] : [0.05,0.1,0.05] }}
          transition={{ repeat: Infinity, duration: isSpeaking ? 0.3 : 3, delay: 0.1 }} />
        {/* Mouth */}
        {isSpeaking ? (
          <motion.rect x="40" y="68" width="40" height="4" rx="2" fill="#22c55e"
            animate={{ height:[4,10,4,8,4], y:[68,65,68,66,68] }}
            transition={{ repeat: Infinity, duration: 0.5 }} />
        ) : (
          <motion.path d="M 40 70 Q 60 78 80 70" stroke="#22c55e" strokeWidth="2" fill="none" strokeLinecap="round"
            animate={{ d:['M 40 70 Q 60 78 80 70','M 40 70 Q 60 75 80 70','M 40 70 Q 60 78 80 70'] }}
            transition={{ repeat: Infinity, duration: 3 }} />
        )}
        {/* Body */}
        <motion.rect x="25" y="95" width="70" height="45" rx="12" fill="#0d1117" stroke="#22c55e" strokeWidth="1.5"
          animate={{ y:[95,93,95] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }} />
        <motion.rect x="35" y="103" width="50" height="28" rx="6" fill="#0a1628" stroke="#22c55e" strokeWidth="1" strokeOpacity="0.4"
          animate={{ y:[103,101,103] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }} />
        {[0,1,2].map(i => (
          <motion.circle key={i} cx={44+i*16} cy="117" r="4"
            fill={i===0?'#22c55e':i===1?'#06b6d4':'#f59e0b'}
            animate={{ opacity: isSpeaking ? [1,0.3,1] : [0.6,1,0.6], r: isSpeaking ? [4,5,4] : [4,3,4] }}
            transition={{ repeat: Infinity, duration: isSpeaking ? 0.3 : 1.5, delay: i*0.2 }} />
        ))}
        {/* Arms */}
        <motion.rect x="5" y="98" width="18" height="32" rx="9" fill="#0d1117" stroke="#22c55e" strokeWidth="1.5"
          animate={{ rotate: isSpeaking ? [-5,5,-5] : [-3,3,-3], y:[98,96,98] }}
          style={{ transformOrigin: '14px 98px' }}
          transition={{ repeat: Infinity, duration: isSpeaking ? 0.4 : 2 }} />
        <motion.rect x="97" y="98" width="18" height="32" rx="9" fill="#0d1117" stroke="#22c55e" strokeWidth="1.5"
          animate={{ rotate: isSpeaking ? [5,-5,5] : [3,-3,3], y:[98,96,98] }}
          style={{ transformOrigin: '106px 98px' }}
          transition={{ repeat: Infinity, duration: isSpeaking ? 0.4 : 2 }} />
        {/* Legs */}
        <motion.rect x="32" y="142" width="20" height="12" rx="6" fill="#0d1117" stroke="#22c55e" strokeWidth="1.5"
          animate={{ y:[142,140,142] }} transition={{ repeat: Infinity, duration: 3 }} />
        <motion.rect x="68" y="142" width="20" height="12" rx="6" fill="#0d1117" stroke="#22c55e" strokeWidth="1.5"
          animate={{ y:[142,140,142] }} transition={{ repeat: Infinity, duration: 3, delay: 0.5 }} />
        <motion.rect x="50" y="88" width="20" height="10" rx="4" fill="#0d1117" stroke="#22c55e" strokeWidth="1"
          animate={{ y:[88,86,88] }} transition={{ repeat: Infinity, duration: 3 }} />
        {/* Particles */}
        {[0,1,2,3].map(i => (
          <motion.circle key={`p-${i}`} cx={15+i*30} cy={40+(i%2)*60} r="2" fill="#22c55e"
            animate={{ opacity:[0,0.8,0], y:[-5,-15,-5], x:[0,i%2===0?5:-5,0] }}
            transition={{ repeat: Infinity, duration: 2+i*0.5, delay: i*0.6 }} />
        ))}
      </svg>
      {/* Status */}
      <motion.div className="mt-1 flex items-center gap-1.5"
        animate={{ opacity:[0.5,1,0.5] }} transition={{ repeat: Infinity, duration: 2 }}>
        <div className={`w-1.5 h-1.5 rounded-full ${isThinking ? 'bg-command-400' : isSpeaking ? 'bg-tactical-400' : 'bg-tactical-600'}`} />
        <span className="font-tactical text-[8px] text-base-500 tracking-widest">
          {isThinking ? 'PROCESSING...' : isSpeaking ? 'SPEAKING' : 'READY'}
        </span>
      </motion.div>
    </div>
  );
}

// ============================================
// LANGUAGE SELECTOR SCREEN
// ============================================
function LanguageSelector({ onSelect }: { onSelect: (lang: typeof LANGUAGES[0]) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col h-full"
    >
      {/* Robot display */}
      <div className="relative h-44 bg-gradient-to-b from-base-900 via-base-950 to-base-950 border-b border-base-800/50 overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-tactical-grid bg-grid-md opacity-10" />
        <motion.div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-16 rounded-full bg-tactical-600/10 blur-xl"
          animate={{ opacity:[0.3,0.7,0.3], scale:[1,1.2,1] }} transition={{ repeat: Infinity, duration: 2 }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <RobotAvatar isSpeaking={false} isThinking={false} />
        </div>
      </div>

      {/* Language selection */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 gap-5">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Globe size={16} className="text-tactical-500" />
            <span className="font-display text-sm text-base-100 tracking-wider">SELECT LANGUAGE</span>
          </div>
          <p className="font-body text-xs text-base-400 leading-relaxed">
            Which language are you comfortable in?<br />
            <span className="text-base-600">Aap kis language mein comfortable hain?</span>
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full">
          {LANGUAGES.map((lang) => (
            <motion.button
              key={lang.code}
              onClick={() => onSelect(lang)}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-4 px-5 py-4 bg-base-800/60 border border-base-700/40 hover:border-tactical-600/50 hover:bg-tactical-600/5 rounded-xl transition-all w-full"
            >
              <span className="text-2xl flex-shrink-0">{lang.label.split(' ')[0]}</span>
              <div className="flex flex-col items-start">
                <span className="font-display text-sm text-base-100 tracking-wide">
                  {lang.label.split(' ').slice(1).join(' ')}
                </span>
                <span className="font-mono text-[10px] text-base-500 mt-0.5">
                  {lang.code === 'en-IN' ? 'Speak in English' : 'Hindi / Hinglish mein baat karo'}
                </span>
              </div>
              <div className="ml-auto text-base-600 text-lg">→</div>
            </motion.button>
          ))}
        </div>

        <p className="font-tactical text-[8px] text-base-600 tracking-wider text-center">
          POWERED BY GROQ AI • ARIA v2.0
        </p>
      </div>
    </motion.div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function AriaAvatar() {
  const { isAvatarOpen, setAvatarOpen, visitorName, setVisitor } = usePortfolioStore();
  const [stage, setStage] = useState<'language' | 'chat'>('language');
  const [selectedLang, setSelectedLang] = useState<typeof LANGUAGES[0] | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [tempName, setTempName] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [autoMic, setAutoMic] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [conversationId] = useState(`conv-${Date.now()}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const isProcessingRef = useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Reset on open / Stop everything on close
  useEffect(() => {
    if (isAvatarOpen) {
      setStage('language');
      setMessages([]);
      setSelectedLang(null);
      setTempName('');
      setAutoMic(false);
    } else {
      // CLOSE — stop mic + voice immediately
      try { recognitionRef.current?.stop(); } catch {}
      try { window.speechSynthesis?.cancel(); } catch {}
      setIsListening(false);
      setIsSpeaking(false);
      setAutoMic(false);
      isProcessingRef.current = false;
    }
  }, [isAvatarOpen]);

  // Language selected → show greeting
  const handleLanguageSelect = useCallback((lang: typeof LANGUAGES[0]) => {
    setSelectedLang(lang);
    setStage('chat');
    setTimeout(() => {
      addAriaMessage(lang.greeting);
      speak(lang.greeting, lang.ttsLang);
    }, 400);
  }, []);

  // ============================================
  // SPEECH RECOGNITION
  // ============================================
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;

    const recognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = selectedLang?.ttsLang || 'en-IN';
    recognition.maxAlternatives = 1;

    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript.trim();
      if (transcript && !isProcessingRef.current) {
        setInput(transcript);
        setTimeout(() => sendMessage(transcript), 300);
      }
      setIsListening(false);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => {
      setIsListening(false);
      // Only restart if avatar is open AND auto mic is enabled
      if (autoMic && !isProcessingRef.current && !isSpeaking && isAvatarOpen) {
        setTimeout(() => { try { recognition.start(); setIsListening(true); } catch {} }, 800);
      }
    };

    recognitionRef.current = recognition;
    return () => { try { recognition.stop(); } catch {} };
  }, [autoMic, isSpeaking, selectedLang]);

  // Auto-restart mic after ARIA finishes speaking — only if avatar is open
  useEffect(() => {
    if (autoMic && !isSpeaking && !isTyping && isAvatarOpen && stage === 'chat' && messages.length > 0) {
      const timer = setTimeout(() => startListening(), 700);
      return () => clearTimeout(timer);
    }
  }, [isSpeaking, isTyping, autoMic, isAvatarOpen, stage]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current || isListening || isSpeaking || isTyping) return;
    try { recognitionRef.current.start(); setIsListening(true); } catch {}
  }, [isListening, isSpeaking, isTyping]);

  const stopListening = useCallback(() => {
    try { recognitionRef.current?.stop(); } catch {}
    setIsListening(false);
  }, []);

  const toggleAutoMic = () => {
    const next = !autoMic;
    setAutoMic(next);
    if (next) startListening(); else stopListening();
  };

  // ============================================
  // TTS — Language-aware
  // ============================================
  const speak = useCallback((text: string, langCode?: string) => {
    if (!voiceEnabled || typeof window === 'undefined') return;

    const ttsLang = langCode || selectedLang?.ttsLang || 'en-IN';
    const isEnglish = ttsLang.startsWith('en');

    // Clean text
    let clean = text.replace(/\*\*/g, '').replace(/[👋🎖️✅🔥🤖💼🤝🔬👀]/g, '').replace(/\n/g, '. ');

    // Convert English to Hinglish if Hindi selected (better pronunciation)
    if (ttsLang === 'hi-IN') {
      clean = toHinglish(clean);
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = ttsLang;
    utterance.rate = 0.9;
    utterance.pitch = 1.05;
    utterance.volume = 1.0;

    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices();

      // Find best voice for selected language
      const voice =
        voices.find(v => v.lang === ttsLang && v.name.includes('Google')) ||
        voices.find(v => v.lang === ttsLang && v.name.includes('Microsoft')) ||
        voices.find(v => v.lang === ttsLang) ||
        voices.find(v => v.lang.startsWith(ttsLang.split('-')[0]) && v.name.includes('Google')) ||
        voices.find(v => v.lang.startsWith(ttsLang.split('-')[0])) ||
        // English fallbacks
        voices.find(v => v.name.includes('Google UK English Female')) ||
        voices.find(v => v.lang === 'en-IN') ||
        voices.find(v => v.lang.startsWith('en'));

      if (voice) utterance.voice = voice;

      utterance.onstart = () => { setIsSpeaking(true); isProcessingRef.current = true; };
      utterance.onend = () => { setIsSpeaking(false); isProcessingRef.current = false; };
      utterance.onerror = () => { setIsSpeaking(false); isProcessingRef.current = false; };

      window.speechSynthesis.speak(utterance);
    };

    if (window.speechSynthesis.getVoices().length > 0) pickVoice();
    else window.speechSynthesis.onvoiceschanged = pickVoice;
  }, [voiceEnabled, selectedLang]);

  const addAriaMessage = (text: string) => {
    setMessages(prev => [...prev, { id: `aria-${Date.now()}`, role: 'aria', text, timestamp: new Date() }]);
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, { id: `user-${Date.now()}`, role: 'user', text, timestamp: new Date() }]);
  };

  // ============================================
  // SEND MESSAGE
  // ============================================
  const sendMessage = useCallback(async (textToSend?: string) => {
    const finalText = (textToSend || input).trim();
    if (!finalText || isTyping) return;

    setInput('');
    addUserMessage(finalText);
    stopListening();

    // Detect name from early messages
    if (messages.length <= 2 && !tempName) {
      const name = finalText.split(' ')[0].replace(/[^a-zA-ZÀ-ÿ\u0900-\u097F]/g, '');
      if (name && name.length > 1) {
        setTempName(name);
        setVisitor(name, `visitor-${Date.now()}`);
        saveVisitor(name);
      }
    }

    setIsTyping(true);
    isProcessingRef.current = true;

    try {
      const allMessages = [...messages, { id: 'tmp', role: 'user' as const, text: finalText, timestamp: new Date() }];

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: allMessages.map(m => ({ role: m.role, text: m.text })),
          visitorName: tempName || visitorName || '',
          language: selectedLang?.name || 'English',
        }),
      });

      const data = await res.json();
      const reply = data.reply || 'Ek second...';

      setIsTyping(false);
      addAriaMessage(reply);
      speak(reply);
      saveConversation(finalText, reply);
    } catch {
      setIsTyping(false);
      isProcessingRef.current = false;
      addAriaMessage('Kuch gadbad ho gayi. Shivam se contact karo: joshishivam586@gmail.com');
    }
  }, [input, isTyping, messages, tempName, visitorName, speak, stopListening, selectedLang]);

  const handleSend = () => sendMessage();

  const saveVisitor = async (name: string) => {
    try {
      const { supabase } = await import('@/lib/supabase');
      await supabase.from('visitors').insert({
        name,
        user_agent: navigator.userAgent,
        metadata: { language: selectedLang?.name },
      });
    } catch {}
  };

  const saveConversation = async (userMsg: string, ariaReply: string) => {
    try {
      const { supabase } = await import('@/lib/supabase');
      await supabase.from('analytics').insert({
        event_type: 'avatar_chat',
        page: '/aria',
        metadata: {
          conversation_id: conversationId,
          visitor_name: tempName || visitorName || 'Unknown',
          language: selectedLang?.name || 'Unknown',
          user_message: userMsg,
          aria_reply: ariaReply,
          timestamp: new Date().toISOString(),
        },
      });
    } catch {}
  };

  const panelWidth = isExpanded ? 'w-[520px]' : 'w-[400px]';
  const panelHeight = isExpanded ? 'h-[680px]' : 'h-[600px]';

  return (
    <>
      {/* FLOATING BUTTON */}
      <AnimatePresence>
        {!isAvatarOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-[200] group cursor-pointer"
            onClick={() => setAvatarOpen(true)}
          >
            <div className="relative w-20 h-24">
              <motion.div className="absolute inset-0 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 70%)' }}
                animate={{ scale:[1,1.2,1], opacity:[0.5,1,0.5] }}
                transition={{ repeat: Infinity, duration: 2 }} />
              <svg width="80" height="96" viewBox="0 0 120 150" className="w-full h-full drop-shadow-[0_0_12px_rgba(34,197,94,0.5)]">
                <line x1="60" y1="10" x2="60" y2="25" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
                <motion.circle cx="60" cy="8" r="4" fill="#22c55e"
                  animate={{ fill:['#22c55e','#fbbf24','#22c55e'], r:[4,5,4] }}
                  transition={{ repeat: Infinity, duration: 1.5 }} />
                <rect x="20" y="25" width="80" height="65" rx="15" fill="#0d1117" stroke="#22c55e" strokeWidth="1.5" />
                <rect x="28" y="33" width="64" height="45" rx="8" fill="#0a1628" stroke="#22c55e" strokeWidth="1" strokeOpacity="0.5" />
                <motion.circle cx="42" cy="53" r="7" fill="#22c55e"
                  animate={{ scaleY:[1,0.1,1] }} transition={{ repeat: Infinity, duration: 3, repeatDelay: 2 }}
                  style={{ transformOrigin: '42px 53px' }} />
                <motion.circle cx="78" cy="53" r="7" fill="#22c55e"
                  animate={{ scaleY:[1,0.1,1] }} transition={{ repeat: Infinity, duration: 3, repeatDelay: 2, delay: 0.1 }}
                  style={{ transformOrigin: '78px 53px' }} />
                <path d="M 40 70 Q 60 78 80 70" stroke="#22c55e" strokeWidth="2" fill="none" strokeLinecap="round" />
                <rect x="25" y="95" width="70" height="45" rx="12" fill="#0d1117" stroke="#22c55e" strokeWidth="1.5" />
                <rect x="35" y="103" width="50" height="28" rx="6" fill="#0a1628" stroke="#22c55e" strokeWidth="1" strokeOpacity="0.4" />
                <motion.circle cx="44" cy="117" r="4" fill="#22c55e" animate={{ opacity:[1,0.3,1] }} transition={{ repeat: Infinity, duration: 1 }} />
                <motion.circle cx="60" cy="117" r="4" fill="#06b6d4" animate={{ opacity:[1,0.3,1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.3 }} />
                <motion.circle cx="76" cy="117" r="4" fill="#f59e0b" animate={{ opacity:[1,0.3,1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.6 }} />
                <rect x="5" y="98" width="18" height="32" rx="9" fill="#0d1117" stroke="#22c55e" strokeWidth="1.5" />
                <rect x="97" y="98" width="18" height="32" rx="9" fill="#0d1117" stroke="#22c55e" strokeWidth="1.5" />
              </svg>
              <div className="absolute -top-1 -right-1 flex items-center gap-1 px-1.5 py-0.5 bg-base-900 border border-tactical-600/40 rounded-full">
                <span className="w-1.5 h-1.5 bg-tactical-500 rounded-full animate-pulse" />
                <span className="font-tactical text-[7px] text-tactical-400 tracking-wider">ARIA</span>
              </div>
            </div>
            <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-base-900 border border-base-700/50 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              <span className="font-tactical text-[9px] text-tactical-400 tracking-wider">TALK TO ARIA 🤖</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CHAT PANEL */}
      <AnimatePresence>
        {isAvatarOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className={`fixed bottom-6 right-6 z-[200] ${panelWidth} max-w-[calc(100vw-24px)] ${panelHeight} max-h-[calc(100vh-80px)] flex flex-col bg-base-950/97 backdrop-blur-lg border border-tactical-600/30 rounded-xl overflow-hidden shadow-[0_0_60px_rgba(34,197,94,0.15),0_20px_60px_rgba(0,0,0,0.6)]`}
          >
            {/* Close / expand buttons (always visible) */}
            <div className="absolute top-3 right-3 z-50 flex items-center gap-1">
              <button onClick={() => setIsExpanded(!isExpanded)}
                className="w-7 h-7 flex items-center justify-center bg-base-900/80 border border-base-700/40 rounded-sm text-base-500 hover:text-tactical-400 backdrop-blur-sm transition-colors">
                {isExpanded ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
              </button>
              <button onClick={() => { setAvatarOpen(false); window.speechSynthesis?.cancel(); stopListening(); setAutoMic(false); }}
                className="w-7 h-7 flex items-center justify-center bg-base-900/80 border border-base-700/40 rounded-sm text-base-500 hover:text-alert-400 backdrop-blur-sm transition-colors">
                <X size={12} />
              </button>
            </div>

            {/* LANGUAGE SELECTION STAGE */}
            {stage === 'language' && (
              <LanguageSelector onSelect={handleLanguageSelect} />
            )}

            {/* CHAT STAGE */}
            {stage === 'chat' && (
              <>
                {/* Robot Display */}
                <div className="relative flex-shrink-0 h-44 bg-gradient-to-b from-base-900 via-base-950 to-base-950 border-b border-base-800/50 overflow-hidden">
                  <div className="absolute inset-0 bg-tactical-grid bg-grid-md opacity-10" />
                  <div className="absolute inset-0 bg-gradient-to-b from-tactical-600/5 to-transparent" />
                  <motion.div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-16 rounded-full bg-tactical-600/10 blur-xl"
                    animate={{ opacity:[0.3,0.7,0.3], scale:[1,1.2,1] }} transition={{ repeat: Infinity, duration: 2 }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <RobotAvatar isSpeaking={isSpeaking} isThinking={isTyping} />
                  </div>

                  {/* Status badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <div className="px-2 py-1 bg-base-900/80 border border-tactical-600/30 rounded-sm flex items-center gap-1.5 backdrop-blur-sm">
                      <motion.span className="w-1.5 h-1.5 bg-tactical-500 rounded-full"
                        animate={{ opacity:[1,0.3,1] }} transition={{ repeat: Infinity, duration: 1.5 }} />
                      <span className="font-tactical text-[8px] text-tactical-400 tracking-wider">
                        {selectedLang?.label || 'ARIA'}
                      </span>
                    </div>
                    {autoMic && (
                      <div className="px-2 py-1 bg-alert-600/20 border border-alert-600/40 rounded-sm flex items-center gap-1 backdrop-blur-sm">
                        <motion.span className="w-1.5 h-1.5 bg-alert-500 rounded-full"
                          animate={{ opacity:[1,0.3,1] }} transition={{ repeat: Infinity, duration: 0.6 }} />
                        <span className="font-tactical text-[8px] text-alert-400 tracking-wider">AUTO</span>
                      </div>
                    )}
                  </div>

                  {/* Change language */}
                  <button
                    onClick={() => { setStage('language'); window.speechSynthesis?.cancel(); stopListening(); setAutoMic(false); setMessages([]); }}
                    className="absolute bottom-2 right-3 flex items-center gap-1 px-2 py-0.5 bg-base-900/60 border border-base-700/30 rounded-sm text-base-600 hover:text-tactical-400 transition-colors"
                  >
                    <Globe size={10} />
                    <span className="font-tactical text-[8px] tracking-wider">CHANGE LANG</span>
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                  {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full gap-2 opacity-40">
                      <Sparkles size={20} className="text-tactical-500" />
                      <span className="font-tactical text-[10px] text-base-500 tracking-widest">INITIALIZING...</span>
                    </div>
                  )}
                  {messages.map(msg => <MessageBubble key={msg.id} message={msg} />)}
                  {isTyping && (
                    <div className="flex items-start gap-2">
                      <div className="w-7 h-7 rounded-full bg-tactical-600/15 border border-tactical-600/30 flex items-center justify-center flex-shrink-0">
                        <Bot size={12} className="text-tactical-400" />
                      </div>
                      <div className="bg-base-800/80 border border-base-700/40 rounded-xl rounded-tl-sm px-3 py-2.5">
                        <div className="flex gap-1">
                          {[0,0.2,0.4].map((d,i) => (
                            <motion.span key={i} className="w-2 h-2 bg-tactical-500 rounded-full"
                              animate={{ scale:[1,1.5,1], opacity:[0.5,1,0.5] }}
                              transition={{ repeat: Infinity, duration: 0.8, delay: d }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="px-3 pb-3 pt-2 border-t border-base-800/50 bg-base-950/50">
                  {isListening && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                      className="mb-2 px-3 py-1.5 bg-alert-600/10 border border-alert-600/30 rounded-lg flex items-center gap-2">
                      <motion.div className="w-2 h-2 bg-alert-500 rounded-full"
                        animate={{ scale:[1,1.5,1] }} transition={{ repeat: Infinity, duration: 0.6 }} />
                      <span className="font-tactical text-[9px] text-alert-400 tracking-wider">LISTENING...</span>
                    </motion.div>
                  )}

                  <div className="flex items-center gap-2">
                    <button onClick={() => { setVoiceEnabled(!voiceEnabled); if (voiceEnabled) window.speechSynthesis?.cancel(); }}
                      className={`w-9 h-9 flex items-center justify-center rounded-lg border transition-all ${
                        voiceEnabled ? 'bg-tactical-600/15 border-tactical-600/40 text-tactical-400' : 'bg-base-800/60 border-base-700/40 text-base-600'
                      }`} title="Voice toggle">
                      {voiceEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
                    </button>

                    <button onClick={toggleAutoMic}
                      className={`w-9 h-9 flex items-center justify-center rounded-lg border transition-all ${
                        autoMic ? 'bg-alert-600/20 border-alert-600/50 text-alert-400' :
                        isListening ? 'bg-alert-600/20 border-alert-600/50 text-alert-400 animate-pulse' :
                        'bg-base-800/60 border-base-700/40 text-base-500 hover:text-tactical-400 hover:border-tactical-600/40'
                      }`}
                      title={autoMic ? 'Auto mic ON — click to OFF' : 'Auto mic OFF — click to ON'}>
                      {autoMic || isListening ? <MicOff size={14} /> : <Mic size={14} />}
                    </button>

                    <input type="text" value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
                      placeholder={isListening ? '🎤 Sun rahi hoon...' : 'Type karo ya mic use karo...'}
                      className="flex-1 bg-base-800/60 border border-base-700/40 rounded-lg px-3 py-2.5 font-body text-sm text-base-200 placeholder:text-base-600 focus:outline-none focus:border-tactical-600/50 transition-colors" />

                    <button onClick={handleSend} disabled={!input.trim() || isTyping}
                      className="w-9 h-9 flex items-center justify-center bg-tactical-600/20 border border-tactical-600/40 rounded-lg text-tactical-400 hover:bg-tactical-600/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                      <Send size={14} />
                    </button>
                  </div>

                  <div className="mt-2 flex items-center justify-between px-1">
                    <span className="font-tactical text-[7px] text-base-700 tracking-wider">
                      {autoMic ? '🎤 AUTO MIC ON' : 'Mic click = auto voice mode'}
                    </span>
                    <span className="font-tactical text-[7px] text-base-700 tracking-wider">GROQ • ARIA v2.0</span>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isAria = message.role === 'aria';
  const renderText = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className={isAria ? 'text-tactical-300 font-semibold' : 'text-base-100 font-semibold'}>{part.slice(2,-2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };
  return (
    <motion.div initial={{ opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }} className={`flex items-end gap-2 ${isAria ? '' : 'flex-row-reverse'}`}>
      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 border mb-0.5 ${
        isAria ? 'bg-tactical-600/15 border-tactical-600/30' : 'bg-command-500/15 border-command-500/30'
      }`}>
        {isAria ? <Bot size={12} className="text-tactical-400" /> : <User size={12} className="text-command-400" />}
      </div>
      <div className={`max-w-[78%] px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
        isAria ? 'bg-base-800/80 border border-base-700/40 text-base-200 rounded-xl rounded-tl-sm'
               : 'bg-tactical-600/15 border border-tactical-600/25 text-base-100 rounded-xl rounded-tr-sm'
      }`}>
        {renderText(message.text)}
      </div>
    </motion.div>
  );
}