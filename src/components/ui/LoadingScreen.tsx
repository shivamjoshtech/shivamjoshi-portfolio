'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_LINES = [
  { text: 'INITIALIZING SYSTEM...', delay: 0 },
  { text: 'LOADING TACTICAL INTERFACE v1.0', delay: 300 },
  { text: 'ESTABLISHING SECURE CONNECTION...', delay: 600 },
  { text: 'DECRYPTING PORTFOLIO DATA...', delay: 900 },
  { text: 'LOADING OPERATOR PROFILE: SHIVAM JOSHI', delay: 1200 },
  { text: 'MOUNTING AI ASSISTANT: ARIA', delay: 1500 },
  { text: 'CALIBRATING DISPLAY SYSTEMS...', delay: 1800 },
  { text: 'ALL SYSTEMS OPERATIONAL', delay: 2100 },
  { text: '■ ACCESS GRANTED — CLEARANCE: PUBLIC', delay: 2500 },
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Show boot lines progressively
    BOOT_LINES.forEach((line, index) => {
      setTimeout(() => {
        setVisibleLines(index + 1);
        setProgress(Math.round(((index + 1) / BOOT_LINES.length) * 100));
      }, line.delay);
    });

    // Start exit after all lines shown
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 3200);

    // Complete after exit animation
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3900);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[99999] bg-base-950 flex flex-col items-center justify-center"
        >
          {/* Corner brackets */}
          <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-tactical-600/40" />
          <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-tactical-600/40" />
          <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-tactical-600/40" />
          <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-tactical-600/40" />

          {/* System ID */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 font-tactical text-[10px] text-base-600 tracking-[0.3em]">
            PORTFOLIO DEFENSE SYSTEM v1.0
          </div>

          {/* Main Content */}
          <div className="w-full max-w-lg px-8">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center mb-10"
            >
              <div className="font-display text-3xl font-bold tracking-[0.2em] text-base-100">
                SHIVAM
              </div>
              <div className="font-display text-xl tracking-[0.3em] text-tactical-500 text-glow-tactical">
                JOSHI
              </div>
            </motion.div>

            {/* Boot Lines */}
            <div className="space-y-1 mb-8 min-h-[220px]">
              {BOOT_LINES.slice(0, visibleLines).map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`font-mono text-xs ${
                    index === BOOT_LINES.length - 1
                      ? 'text-tactical-400 text-glow-tactical font-semibold'
                      : index === BOOT_LINES.length - 2
                      ? 'text-tactical-500'
                      : 'text-base-500'
                  }`}
                >
                  <span className="text-base-600 mr-2">
                    [{String(index + 1).padStart(2, '0')}]
                  </span>
                  {line.text}
                  {index === visibleLines - 1 && index < BOOT_LINES.length - 1 && (
                    <span className="animate-blink ml-1 text-tactical-500">█</span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="w-full">
              <div className="flex justify-between mb-2">
                <span className="font-tactical text-[10px] text-base-500 tracking-widest">
                  SYSTEM BOOT
                </span>
                <span className="font-mono text-xs text-tactical-500">
                  {progress}%
                </span>
              </div>
              <div className="w-full h-1 bg-base-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #14532d, #22c55e, #4ade80)',
                    boxShadow: '0 0 10px rgba(34, 197, 94, 0.5)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Bottom text */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-tactical text-[10px] text-base-600 tracking-[0.2em]">
            HALDWANI • UTTARAKHAND • INDIA
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
