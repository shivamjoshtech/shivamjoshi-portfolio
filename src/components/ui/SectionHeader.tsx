'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SECTION_CODENAMES } from '@/data/constants';

interface SectionHeaderProps {
  sectionId: string;
  title?: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionHeader({
  sectionId,
  title,
  subtitle,
  align = 'left',
}: SectionHeaderProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const codename = SECTION_CODENAMES[sectionId] || sectionId.toUpperCase();
  const displayTitle = title || codename;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`mb-12 ${align === 'center' ? 'text-center' : ''}`}
    >
      {/* Section code */}
      <div className={`flex items-center gap-3 mb-3 ${align === 'center' ? 'justify-center' : ''}`}>
        <span className="font-mono text-[10px] text-tactical-600 tracking-widest uppercase">
          [{sectionId.toUpperCase()}]
        </span>
        <div className="h-px flex-1 max-w-[60px] bg-tactical-600/30" />
      </div>

      {/* Title */}
      <h2 className="section-title mb-2">{displayTitle}</h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="font-mono text-sm text-base-400 mt-3 max-w-xl">
          {subtitle}
        </p>
      )}

      {/* Divider */}
      <div className={`mt-6 ${align === 'center' ? 'mx-auto' : ''}`}>
        <div className="divider-tactical max-w-xs" />
      </div>
    </motion.div>
  );
}
