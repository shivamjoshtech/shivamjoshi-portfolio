'use client';

import { useEffect, useState } from 'react';

export default function HudOverlay() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
      setDate(now.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).toUpperCase());
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Top Left HUD */}
      <div className="fixed top-4 left-20 xl:left-60 z-50 hud-coords hidden lg:block">
        <div className="flex items-center gap-2">
          <span className="w-1 h-1 bg-tactical-500 rounded-full animate-pulse-glow" />
          <span>{time || '--:--:--'}</span>
          <span className="text-base-700">|</span>
          <span>{date || '--'}</span>
        </div>
      </div>

      {/* Top Right HUD */}
      <div className="fixed top-4 right-6 z-50 hud-coords text-right hidden lg:block">
        <div>LAT: 29.2183°N • LONG: 79.5130°E</div>
        <div className="text-tactical-700 mt-0.5">HALDWANI, UTTARAKHAND</div>
      </div>

      {/* Bottom Center */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 hud-coords text-center hidden lg:block">
        <span className="text-base-600">© 2025 SHIVAM JOSHI</span>
        <span className="text-base-700 mx-2">•</span>
        <span className="text-tactical-700">ALL SYSTEMS NOMINAL</span>
      </div>
    </>
  );
}
