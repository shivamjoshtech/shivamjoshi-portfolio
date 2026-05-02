'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { usePortfolioStore } from '@/lib/store';

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
  noPadding?: boolean;
}

export default function SectionWrapper({
  id,
  children,
  className = '',
  fullHeight = false,
  noPadding = false,
}: SectionWrapperProps) {
  const { setActiveSection } = usePortfolioStore();
  const { ref, inView } = useInView({
    threshold: 0.3,
    rootMargin: '-80px 0px -40% 0px',
  });

  useEffect(() => {
    if (inView) {
      setActiveSection(id);
    }
  }, [inView, id, setActiveSection]);

  return (
    <section
      id={id}
      ref={ref}
      className={`
        relative
        ${fullHeight ? 'min-h-screen' : ''}
        ${noPadding ? '' : 'px-6 md:px-12 lg:px-8 py-20 md:py-28'}
        ${className}
      `}
    >
      {/* Section corner markers */}
      <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-base-700/30" />
      <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-base-700/30" />
      <div className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-base-700/30" />
      <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-base-700/30" />

      {/* Section ID watermark */}
      <div className="absolute top-6 right-6 font-tactical text-[9px] text-base-700/40 tracking-widest hidden md:block">
        SEC.{id.toUpperCase()}
      </div>

      {children}
    </section>
  );
}
