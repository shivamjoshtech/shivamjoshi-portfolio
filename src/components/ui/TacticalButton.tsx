'use client';

import { motion } from 'framer-motion';

interface TacticalButtonProps {
  children: React.ReactNode;
  variant?: 'tactical' | 'command' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  download?: boolean;
}

const VARIANT_STYLES = {
  tactical: `
    bg-tactical-600/10 text-tactical-400 border border-tactical-600/40
    hover:bg-tactical-600/20 hover:border-tactical-500 hover:text-tactical-300
    hover:shadow-[0_0_20px_rgba(34,197,94,0.15)]
  `,
  command: `
    bg-command-500/10 text-command-400 border border-command-500/40
    hover:bg-command-500/20 hover:border-command-400 hover:text-command-300
    hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]
  `,
  ghost: `
    bg-transparent text-base-400 border border-base-700/50
    hover:bg-base-800/50 hover:text-base-200 hover:border-base-600
  `,
};

const SIZE_STYLES = {
  sm: 'px-4 py-2 text-[10px]',
  md: 'px-6 py-3 text-xs',
  lg: 'px-8 py-4 text-sm',
};

export default function TacticalButton({
  children,
  variant = 'tactical',
  size = 'md',
  href,
  onClick,
  icon,
  disabled = false,
  className = '',
  download = false,
}: TacticalButtonProps) {
  const baseStyles = `
    inline-flex items-center gap-2 font-display uppercase tracking-[0.15em]
    transition-all duration-300 rounded-sm
    disabled:opacity-40 disabled:cursor-not-allowed
    ${VARIANT_STYLES[variant]}
    ${SIZE_STYLES[size]}
    ${className}
  `;

  const content = (
    <>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        download={download}
        whileTap={{ scale: 0.97 }}
        className={baseStyles}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.97 }}
      className={baseStyles}
    >
      {content}
    </motion.button>
  );
}
