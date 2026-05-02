'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface TacticalCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'tactical' | 'command' | 'hud' | 'alert';
  delay?: number;
  hover?: boolean;
  onClick?: () => void;
}

const GLOW_STYLES = {
  tactical: {
    border: 'hover:border-tactical-600/40',
    shadow: 'hover:shadow-[0_0_20px_rgba(34,197,94,0.1)]',
    innerGlow: 'hover:bg-tactical-600/[0.02]',
  },
  command: {
    border: 'hover:border-command-500/40',
    shadow: 'hover:shadow-[0_0_20px_rgba(245,158,11,0.1)]',
    innerGlow: 'hover:bg-command-500/[0.02]',
  },
  hud: {
    border: 'hover:border-hud-500/40',
    shadow: 'hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]',
    innerGlow: 'hover:bg-hud-500/[0.02]',
  },
  alert: {
    border: 'hover:border-alert-500/40',
    shadow: 'hover:shadow-[0_0_20px_rgba(239,68,68,0.1)]',
    innerGlow: 'hover:bg-alert-500/[0.02]',
  },
};

export default function TacticalCard({
  children,
  className = '',
  glowColor = 'tactical',
  delay = 0,
  hover = true,
  onClick,
}: TacticalCardProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const glow = GLOW_STYLES[glowColor];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: delay * 0.1, ease: 'easeOut' }}
      onClick={onClick}
      className={`
        relative bg-base-800/80 border border-base-700/60 rounded-sm
        transition-all duration-300 backdrop-blur-sm
        ${hover ? `${glow.border} ${glow.shadow} ${glow.innerGlow} cursor-pointer` : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-base-600/40" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-base-600/40" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-base-600/40" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-base-600/40" />

      {children}
    </motion.div>
  );
}
