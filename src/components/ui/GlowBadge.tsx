'use client';

interface GlowBadgeProps {
  children: React.ReactNode;
  variant?: 'tactical' | 'command' | 'hud' | 'alert' | 'neutral';
  size?: 'sm' | 'md';
  dot?: boolean;
  pulse?: boolean;
  className?: string;
}

const VARIANT_STYLES = {
  tactical: 'bg-tactical-900/50 text-tactical-400 border-tactical-800/50',
  command: 'bg-command-900/50 text-command-400 border-command-800/50',
  hud: 'bg-hud-700/20 text-hud-400 border-hud-700/30',
  alert: 'bg-red-900/30 text-alert-400 border-red-800/30',
  neutral: 'bg-base-800 text-base-400 border-base-700',
};

const DOT_COLORS = {
  tactical: 'bg-tactical-500',
  command: 'bg-command-500',
  hud: 'bg-hud-500',
  alert: 'bg-alert-500',
  neutral: 'bg-base-500',
};

export default function GlowBadge({
  children,
  variant = 'tactical',
  size = 'sm',
  dot = false,
  pulse = false,
  className = '',
}: GlowBadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center font-mono uppercase tracking-wider border rounded-sm
        ${VARIANT_STYLES[variant]}
        ${size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs'}
        ${className}
      `}
    >
      {dot && (
        <span
          className={`
            w-1.5 h-1.5 rounded-full mr-1.5
            ${DOT_COLORS[variant]}
            ${pulse ? 'animate-pulse-glow' : ''}
          `}
        />
      )}
      {children}
    </span>
  );
}
