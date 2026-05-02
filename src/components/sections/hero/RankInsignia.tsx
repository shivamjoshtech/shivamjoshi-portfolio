'use client';

import { motion } from 'framer-motion';

export default function RankInsignia() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
      className="relative w-28 h-28 md:w-36 md:h-36 mx-auto mb-6"
    >
      {/* Outer hexagon ring */}
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Rotating outer ring */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
          style={{ transformOrigin: '100px 100px' }}
        >
          <polygon
            points="100,10 178,55 178,145 100,190 22,145 22,55"
            fill="none"
            stroke="rgba(34,197,94,0.2)"
            strokeWidth="1"
          />
          {/* Tick marks */}
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <line
              key={angle}
              x1="100"
              y1="10"
              x2="100"
              y2="20"
              stroke="rgba(34,197,94,0.4)"
              strokeWidth="1"
              transform={`rotate(${angle}, 100, 100)`}
            />
          ))}
        </motion.g>

        {/* Inner hexagon */}
        <polygon
          points="100,30 163,65 163,135 100,170 37,135 37,65"
          fill="rgba(34,197,94,0.03)"
          stroke="rgba(34,197,94,0.15)"
          strokeWidth="1"
        />

        {/* Inner-inner hexagon */}
        <polygon
          points="100,50 143,75 143,125 100,150 57,125 57,75"
          fill="rgba(34,197,94,0.02)"
          stroke="rgba(34,197,94,0.1)"
          strokeWidth="0.5"
          strokeDasharray="4 3"
        />

        {/* Center text */}
        <text
          x="100"
          y="92"
          textAnchor="middle"
          className="font-display"
          fill="rgba(34,197,94,0.7)"
          fontSize="28"
          fontWeight="bold"
          letterSpacing="4"
        >
          SJ
        </text>

        {/* Subtitle */}
        <text
          x="100"
          y="115"
          textAnchor="middle"
          fill="rgba(34,197,94,0.35)"
          fontSize="8"
          letterSpacing="3"
          className="font-tactical"
        >
          AI ENGINEER
        </text>

        {/* Corner dots */}
        {[
          { cx: 100, cy: 30 },
          { cx: 163, cy: 65 },
          { cx: 163, cy: 135 },
          { cx: 100, cy: 170 },
          { cx: 37, cy: 135 },
          { cx: 37, cy: 65 },
        ].map((dot, i) => (
          <motion.circle
            key={i}
            cx={dot.cx}
            cy={dot.cy}
            r="2"
            fill="rgba(34,197,94,0.6)"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              delay: i * 0.3,
            }}
          />
        ))}
      </svg>

      {/* Pulsing glow behind */}
      <motion.div
        animate={{ opacity: [0.1, 0.3, 0.1], scale: [0.95, 1.05, 0.95] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="absolute inset-0 rounded-full bg-tactical-500/10 blur-xl -z-10"
      />
    </motion.div>
  );
}