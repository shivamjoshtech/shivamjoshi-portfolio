'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      {/* HUD Coordinates — Top Left */}
      <div className="fixed top-6 left-6 hud-coords">
        <div>SYS.TIME: {time || '--:--:--'}</div>
        <div>LAT: 29.2183° N</div>
        <div>LONG: 79.5130° E</div>
        <div className="text-tactical-600 mt-1">STATUS: OPERATIONAL</div>
      </div>

      {/* HUD — Top Right */}
      <div className="fixed top-6 right-6 hud-coords text-right">
        <div>PORTFOLIO v1.0</div>
        <div>BUILD: TACTICAL</div>
        <div>CLEARANCE: PUBLIC</div>
        <div className="text-command-500 mt-1">■ ACTIVE</div>
      </div>

      {/* Main Content */}
      <div className="tactical-frame p-12 text-center max-w-2xl">
        {/* Classified watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="classified-stamp">CLASSIFIED</span>
        </div>

        <div className="relative z-10">
          {/* Status bar */}
          <div className="badge-tactical mb-8">
            <span className="w-2 h-2 bg-tactical-500 rounded-full mr-2 animate-pulse-glow" />
            SYSTEM ONLINE
          </div>

          {/* Name */}
          <h1 className="font-display text-5xl md:text-7xl font-bold text-base-100 tracking-[0.15em] mb-4">
            SHIVAM
            <span className="block text-tactical-400 text-glow-tactical">JOSHI</span>
          </h1>

          {/* Subtitle */}
          <div className="terminal-text mb-6">
            AI Engineer • GenAI Developer • Problem Solver
          </div>

          {/* Divider */}
          <div className="divider-tactical mb-6" />

          {/* Mission Brief */}
          <p className="font-mono text-sm text-base-400 leading-relaxed mb-8 max-w-md mx-auto">
            Building intelligent systems that think, reason, and deliver.
            <br />
            <span className="text-command-400">TCS — GIS Center of Excellence</span>
          </p>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="btn-tactical">
              Enter Portfolio →
            </button>
            <button className="btn-command">
              Download Resume
            </button>
          </div>

          {/* Setup verification */}
          <div className="mt-12 p-4 border border-dashed border-tactical-800/50 rounded-sm">
            <p className="font-mono text-xs text-tactical-600">
              ✓ STEP 1 COMPLETE — Foundation Ready
            </p>
            <p className="font-mono text-xs text-base-500 mt-1">
              Next.js + Tailwind + Theme + Supabase Schema = LOADED
            </p>
          </div>
        </div>
      </div>

      {/* Bottom HUD */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 hud-coords text-center">
        <div>HALDWANI, UTTARAKHAND, INDIA</div>
        <div className="text-tactical-600">© 2025 SHIVAM JOSHI — ALL RIGHTS RESERVED</div>
      </div>
    </div>
  );
}
