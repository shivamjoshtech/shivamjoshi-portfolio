'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[101] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: 'linear-gradient(90deg, #14532d, #22c55e, #4ade80)',
        boxShadow: '0 0 8px rgba(34, 197, 94, 0.4)',
      }}
    />
  );
}
