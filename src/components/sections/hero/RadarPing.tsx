'use client';

import { motion } from 'framer-motion';

export default function RadarPing() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
      <div className="relative w-[500px] h-[500px] md:w-[600px] md:h-[600px] opacity-[0.07]">
        {/* Outer rings */}
        {[1, 0.75, 0.5, 0.25].map((scale, i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-full border border-tactical-500/40"
            style={{
              transform: `scale(${scale})`,
            }}
          />
        ))}

        {/* Crosshair lines */}
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-tactical-500/30 -translate-x-1/2" />
        <div className="absolute left-0 right-0 top-1/2 h-px bg-tactical-500/30 -translate-y-1/2" />

        {/* Diagonal lines */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(45deg, transparent 49.5%, rgba(34,197,94,0.15) 49.5%, rgba(34,197,94,0.15) 50.5%, transparent 50.5%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(-45deg, transparent 49.5%, rgba(34,197,94,0.15) 49.5%, rgba(34,197,94,0.15) 50.5%, transparent 50.5%)',
          }}
        />

        {/* Rotating sweep */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
          className="absolute inset-0"
        >
          <div
            className="absolute top-0 left-1/2 w-1/2 h-1/2 origin-bottom-left"
            style={{
              background: 'conic-gradient(from 0deg, rgba(34,197,94,0.2), transparent 60deg)',
            }}
          />
        </motion.div>

        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-2 h-2 bg-tactical-500 rounded-full" />
          <motion.div
            animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 bg-tactical-500 rounded-full"
          />
        </div>

        {/* Random blips */}
        {[
          { top: '25%', left: '60%' },
          { top: '40%', left: '30%' },
          { top: '65%', left: '70%' },
          { top: '55%', left: '25%' },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-tactical-400 rounded-full"
            style={{ top: pos.top, left: pos.left }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              repeat: Infinity,
              duration: 3,
              delay: i * 0.8,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  );
}