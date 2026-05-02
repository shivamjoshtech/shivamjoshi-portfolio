'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CONFIG, TCS_EXP } from '@/data/config';

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let start = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { start = target; clearInterval(timer); }
      if (ref.current) ref.current.textContent = start + suffix;
    }, 16);
    return () => clearInterval(timer);
  }, [target, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function HeroStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 0.5 }}
      className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto"
    >
      {/* Man Hours */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.3 }}
        className="flex flex-col items-center gap-1 p-3 bg-base-800/30 border border-base-700/30 rounded-sm hover:border-base-600/40 transition-colors"
      >
        <span className="font-display text-2xl font-bold text-tactical-400">
          <CountUp target={CONFIG.manHours} suffix="+" />
        </span>
        <span className="font-tactical text-[9px] text-base-500 tracking-widest text-center">
          Man-Hours Saved
        </span>
      </motion.div>

      {/* TCS Experience — Full "1 Year 10 Months" */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.4 }}
        className="flex flex-col items-center gap-1 p-3 bg-base-800/30 border border-base-700/30 rounded-sm hover:border-base-600/40 transition-colors"
      >
        {/* Year number animates */}
        <div className="flex flex-col items-center">
          {TCS_EXP.years > 0 ? (
            <div className="flex items-baseline gap-1">
              <span className="font-display text-xl font-bold text-command-400">
                <CountUp target={TCS_EXP.years} suffix="" />
              </span>
              <span className="font-tactical text-[10px] text-command-400">
                {TCS_EXP.years === 1 ? 'Year' : 'Years'}
              </span>
              <span className="font-display text-xl font-bold text-command-300 ml-1">
                <CountUp target={TCS_EXP.months} suffix="" />
              </span>
              <span className="font-tactical text-[10px] text-command-300">
                {TCS_EXP.months === 1 ? 'Mo' : 'Mo'}
              </span>
            </div>
          ) : (
            <span className="font-display text-2xl font-bold text-command-400">
              <CountUp target={TCS_EXP.totalMonths} suffix="+" />
            </span>
          )}
        </div>
        <span className="font-tactical text-[9px] text-base-500 tracking-widest text-center">
          at {CONFIG.company}
        </span>
      </motion.div>

      {/* Hackathons */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.5 }}
        className="flex flex-col items-center gap-1 p-3 bg-base-800/30 border border-base-700/30 rounded-sm hover:border-base-600/40 transition-colors"
      >
        <span className="font-display text-2xl font-bold text-hud-400">
          <CountUp target={CONFIG.hackathons} suffix="" />
        </span>
        <span className="font-tactical text-[9px] text-base-500 tracking-widest text-center">
          Hackathons
        </span>
      </motion.div>

      {/* Technologies */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.6 }}
        className="flex flex-col items-center gap-1 p-3 bg-base-800/30 border border-base-700/30 rounded-sm hover:border-base-600/40 transition-colors"
      >
        <span className="font-display text-2xl font-bold text-tactical-400">
          <CountUp target={CONFIG.techCount} suffix="+" />
        </span>
        <span className="font-tactical text-[9px] text-base-500 tracking-widest text-center">
          Technologies
        </span>
      </motion.div>
    </motion.div>
  );
}