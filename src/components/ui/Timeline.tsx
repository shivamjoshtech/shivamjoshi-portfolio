'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface TimelineItemProps {
  children: React.ReactNode;
  index: number;
  isLast?: boolean;
  dotColor?: 'tactical' | 'command' | 'hud';
}

const DOT_STYLES = {
  tactical: 'bg-tactical-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]',
  command: 'bg-command-500 shadow-[0_0_10px_rgba(245,158,11,0.4)]',
  hud: 'bg-hud-500 shadow-[0_0_10px_rgba(6,182,212,0.4)]',
};

export function TimelineItem({
  children,
  index,
  isLast = false,
  dotColor = 'tactical',
}: TimelineItemProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative pl-8 md:pl-12 pb-10"
    >
      {/* Vertical line */}
      {!isLast && (
        <div className="absolute left-[11px] md:left-[19px] top-3 bottom-0 w-px bg-gradient-to-b from-base-600/60 to-base-700/20" />
      )}

      {/* Dot */}
      <div
        className={`absolute left-1.5 md:left-3.5 top-1.5 w-3 h-3 rounded-full ${DOT_STYLES[dotColor]} z-10`}
      />

      {/* Outer ring */}
      <div className="absolute left-0 md:left-2 top-0 w-6 h-6 rounded-full border border-base-600/30" />

      {children}
    </motion.div>
  );
}

export function Timeline({ children }: { children: React.ReactNode }) {
  return <div className="relative">{children}</div>;
}
