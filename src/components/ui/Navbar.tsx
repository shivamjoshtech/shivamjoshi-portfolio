'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS } from '@/data/constants';
import { usePortfolioStore } from '@/lib/store';
import {
  Home,
  User,
  GraduationCap,
  Briefcase,
  Shield,
  FolderGit2,
  Trophy,
  Send,
  Menu,
  X,
} from 'lucide-react';

const ICONS: Record<string, React.ReactNode> = {
  hero: <Home size={18} />,
  about: <User size={18} />,
  education: <GraduationCap size={18} />,
  experience: <Briefcase size={18} />,
  skills: <Shield size={18} />,
  projects: <FolderGit2 size={18} />,
  achievements: <Trophy size={18} />,
  contact: <Send size={18} />,
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // mobile menu
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // desktop sidebar toggle
  const { activeSection, setActiveSection } = usePortfolioStore();

  // Keyboard shortcut — press 'M' to toggle sidebar
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'm' || e.key === 'M') {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          setIsSidebarOpen((prev) => !prev);
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
    setIsOpen(false);
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* ============ DESKTOP — TOGGLE BUTTON (always visible) ============ */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`hidden lg:flex fixed top-6 left-6 z-[101] w-11 h-11 items-center justify-center bg-base-900/80 backdrop-blur-md border border-base-700/50 rounded-sm text-base-400 hover:text-tactical-400 hover:border-tactical-600/40 hover:bg-tactical-600/5 transition-all duration-300 group ${
          isSidebarOpen ? 'translate-x-56' : 'translate-x-0'
        }`}
        title="Toggle Navigation (Press M)"
      >
        <AnimatePresence mode="wait">
          {isSidebarOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={18} />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu size={18} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tooltip */}
        {!isSidebarOpen && (
          <div className="absolute left-full ml-3 px-2 py-1 bg-base-800 border border-base-700/50 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            <span className="font-tactical text-[9px] text-tactical-400 tracking-wider">
              OPEN MENU
            </span>
          </div>
        )}
      </button>

      {/* ============ DESKTOP SIDEBAR (Toggleable) ============ */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.nav
            initial={{ x: -280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="hidden lg:flex fixed left-0 top-0 h-screen w-56 z-[100] flex-col bg-base-950/95 backdrop-blur-md border-r border-base-700/50"
          >
            {/* Logo */}
            <div className="p-4 border-b border-base-700/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-sm bg-tactical-600/10 border border-tactical-600/30 flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-tactical-400 text-sm font-bold">SJ</span>
                </div>
                <div>
                  <div className="font-display text-xs tracking-[0.15em] text-base-100 font-semibold">
                    SHIVAM JOSHI
                  </div>
                  <div className="font-tactical text-[9px] text-tactical-600 tracking-wider">
                    AI ENGINEER
                  </div>
                </div>
              </div>
            </div>

            {/* Nav */}
            <div className="flex-1 py-4 overflow-y-auto">
              <div className="px-3 space-y-1">
                {NAV_ITEMS.map((item, index) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full group flex items-center gap-3 px-3 py-2.5 rounded-sm transition-all duration-200 relative ${
                        isActive
                          ? 'bg-tactical-600/10 text-tactical-400'
                          : 'text-base-500 hover:text-base-300 hover:bg-base-800/50'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-tactical-500 rounded-r"
                          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                      )}

                      <span className={`font-mono text-[10px] w-4 ${
                        isActive ? 'text-tactical-600' : 'text-base-600'
                      }`}>
                        {String(index).padStart(2, '0')}
                      </span>

                      <span className={`flex-shrink-0 ${
                        isActive ? 'text-tactical-400' : 'text-base-500 group-hover:text-base-400'
                      }`}>
                        {ICONS[item.id]}
                      </span>

                      <span className={`font-tactical text-[11px] tracking-wider ${
                        isActive ? 'text-tactical-400' : ''
                      }`}>
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom */}
            <div className="p-4 border-t border-base-700/50">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 bg-tactical-500 rounded-full animate-pulse-glow" />
                <span className="font-tactical text-[9px] text-base-500 tracking-wider">
                  SYSTEM ONLINE
                </span>
              </div>
              <div className="font-tactical text-[8px] text-base-600 tracking-wider">
                Press <kbd className="px-1 bg-base-800 border border-base-700 rounded text-tactical-600">M</kbd> to toggle
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ============ MOBILE TOP BAR ============ */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 z-[100] bg-base-950/90 backdrop-blur-md border-b border-base-700/50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-sm bg-tactical-600/10 border border-tactical-600/30 flex items-center justify-center">
              <span className="font-display text-tactical-400 text-xs font-bold">SJ</span>
            </div>
            <div>
              <div className="font-display text-[10px] tracking-[0.15em] text-base-100 font-semibold">
                SHIVAM JOSHI
              </div>
              <div className="font-tactical text-[8px] text-tactical-600 tracking-wider">
                AI ENGINEER
              </div>
            </div>
          </div>

          <div className="badge-tactical text-[9px]">
            {NAV_ITEMS.find((n) => n.id === activeSection)?.shortLabel || 'HQ'}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 flex items-center justify-center text-base-400 hover:text-tactical-400 transition-colors"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t border-base-700/50 bg-base-950/95 backdrop-blur-md overflow-hidden"
            >
              <div className="p-4 space-y-1">
                {NAV_ITEMS.map((item, index) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full flex items-center gap-4 px-4 py-3 rounded-sm transition-all ${
                        isActive
                          ? 'bg-tactical-600/10 text-tactical-400'
                          : 'text-base-400 hover:bg-base-800/50 hover:text-base-200'
                      }`}
                    >
                      <span className="font-mono text-[10px] text-base-600 w-5">
                        {String(index).padStart(2, '0')}
                      </span>
                      {ICONS[item.id]}
                      <span className="font-tactical text-xs tracking-wider">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}