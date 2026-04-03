import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Core Dark (GitHub-inspired)
        base: {
          950: '#0a0c10',  // Deepest background
          900: '#0d1117',  // Main background
          800: '#161b22',  // Card/elevated surface
          700: '#21262d',  // Borders
          600: '#30363d',  // Subtle borders
          500: '#484f58',  // Muted text
          400: '#8b949e',  // Secondary text
          300: '#c9d1d9',  // Primary text
          200: '#e6edf3',  // Bright text
          100: '#f0f6fc',  // White text
        },
        // Military Accent (Tactical Green)
        tactical: {
          950: '#0a1a0a',
          900: '#0d2818',
          800: '#14532d',
          700: '#166534',
          600: '#16a34a',
          500: '#22c55e',
          400: '#4ade80',
          300: '#86efac',
          200: '#bbf7d0',
          100: '#dcfce7',
        },
        // Gold Accent (Command/Rank)
        command: {
          900: '#451a03',
          800: '#78350f',
          700: '#92400e',
          600: '#b45309',
          500: '#d97706',
          400: '#f59e0b',
          300: '#fbbf24',
          200: '#fde68a',
          100: '#fef3c7',
        },
        // Alert Red (Status/Danger)
        alert: {
          600: '#dc2626',
          500: '#ef4444',
          400: '#f87171',
        },
        // Cyan (Terminal/HUD)
        hud: {
          700: '#0e7490',
          600: '#0891b2',
          500: '#06b6d4',
          400: '#22d3ee',
          300: '#67e8f9',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        display: ['"Orbitron"', '"Rajdhani"', 'sans-serif'],
        body: ['"Rajdhani"', '"Inter"', 'sans-serif'],
        tactical: ['"Share Tech Mono"', 'monospace'],
      },
      animation: {
        'scan': 'scan 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'grid-flow': 'gridFlow 20s linear infinite',
        'typewriter': 'typewriter 2s steps(40) forwards',
        'blink': 'blink 1s step-end infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'glitch': 'glitch 0.3s ease-in-out',
        'radar': 'radar 4s linear infinite',
        'border-flow': 'borderFlow 3s linear infinite',
      },
      keyframes: {
        scan: {
          '0%, 100%': { transform: 'translateY(-100%)' },
          '50%': { transform: 'translateY(100%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', boxShadow: '0 0 5px rgba(34,197,94,0.3)' },
          '50%': { opacity: '1', boxShadow: '0 0 20px rgba(34,197,94,0.6)' },
        },
        gridFlow: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '50px 50px' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        borderFlow: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      backgroundImage: {
        'grid-tactical': 'linear-gradient(rgba(34,197,94,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.05) 1px, transparent 1px)',
        'grid-dense': 'linear-gradient(rgba(34,197,94,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.1) 1px, transparent 1px)',
        'scan-line': 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34,197,94,0.03) 2px, rgba(34,197,94,0.03) 4px)',
      },
      backgroundSize: {
        'grid-sm': '20px 20px',
        'grid-md': '40px 40px',
        'grid-lg': '60px 60px',
      },
    },
  },
  plugins: [],
};

export default config;
