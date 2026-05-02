'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import LoadingScreen from '@/components/ui/LoadingScreen';
import Navbar from '@/components/ui/Navbar';
import HudOverlay from '@/components/ui/HudOverlay';
import ScrollProgress from '@/components/ui/ScrollProgress';
import ParticleField from '@/components/sections/hero/ParticleField';
import RadarPing from '@/components/sections/hero/RadarPing';
import RankInsignia from '@/components/sections/hero/RankInsignia';
import HeroStats from '@/components/sections/hero/HeroStats';
import AboutSection from '@/components/sections/AboutSection';
import EducationSection from '@/components/sections/EducationSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import AchievementsSection from '@/components/sections/AchievementsSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';
import AriaAvatar from '@/components/avatar/AriaAvatar';
import SectionWrapper from '@/components/ui/SectionWrapper';
import TacticalButton from '@/components/ui/TacticalButton';
import { TypeAnimation } from 'react-type-animation';
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  Download,
  ChevronDown,
  ExternalLink,
} from 'lucide-react';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [resumeUrl, setResumeUrl] = useState('');

  const handleLoadComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      // Track page view
      (async () => {
        try {
          const { supabase } = await import('@/lib/supabase');
          await supabase.from('analytics').insert({
            event_type: 'page_view',
            page: '/',
          });
          // Load resume URL
          const { data } = await supabase
            .from('site_settings')
            .select('value')
            .eq('key', 'resume_url')
            .maybeSingle();
          if (data?.value) setResumeUrl(data.value);
        } catch (e) {
          console.log('Analytics/settings skipped');
        }
      })();
    }
  }, [isLoaded]);

  const trackResumeDownload = async () => {
    try {
      const { supabase } = await import('@/lib/supabase');
      await supabase.from('analytics').insert({
        event_type: 'resume_download',
        page: '/hero',
        metadata: { source: 'hero_button' },
      });
    } catch {}
  };

  if (!isLoaded) {
    return <LoadingScreen onComplete={handleLoadComplete} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Navbar />
      <ScrollProgress />
      <HudOverlay />
      <AriaAvatar />

      <div>
        {/* HERO */}
        <SectionWrapper id="hero" fullHeight noPadding>
          <div className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12 pt-16 lg:pt-0 relative overflow-hidden">
            <ParticleField />
            <RadarPing />
            <div className="absolute inset-0 bg-tactical-grid-dense bg-grid-sm opacity-20 z-[1]" />

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
              <span className="font-display text-[6rem] sm:text-[8rem] md:text-[12rem] text-base-800/10 uppercase tracking-[0.3em] rotate-[-15deg] select-none">
                CLASSIFIED
              </span>
            </div>

            <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-tactical-600/20 z-[2] hidden md:block" />
            <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-tactical-600/20 z-[2] hidden md:block" />
            <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-tactical-600/20 z-[2] hidden md:block" />
            <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-tactical-600/20 z-[2] hidden md:block" />

            <div className="relative z-10 text-center max-w-3xl">
              <RankInsignia />

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-6 font-display text-5xl sm:text-6xl md:text-8xl font-bold text-base-100 tracking-[0.1em] relative"
              >
                <span className="relative inline-block">
                  SHIVAM
                  <motion.span
                    className="absolute inset-0 text-tactical-400/20"
                    animate={{ x: [0, -2, 2, 0], opacity: [0, 0.5, 0.5, 0] }}
                    transition={{ repeat: Infinity, duration: 4, repeatDelay: 6 }}
                  >
                    SHIVAM
                  </motion.span>
                </span>
                <span className="block text-tactical-400 text-glow-tactical mt-1 relative">
                  JOSHI
                  <motion.span
                    className="absolute inset-0 text-hud-400/20"
                    animate={{ x: [0, 2, -2, 0], opacity: [0, 0.5, 0.5, 0] }}
                    transition={{ repeat: Infinity, duration: 4, repeatDelay: 8, delay: 2 }}
                  >
                    JOSHI
                  </motion.span>
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-6 font-mono text-lg md:text-xl text-base-400"
              >
                <span className="text-tactical-600 mr-2">&gt;</span>
                <TypeAnimation
                  sequence={[
                    'AI Engineer @ TCS', 2000,
                    'GenAI Developer', 2000,
                    'Multi-Agent Pipeline Architect', 2000,
                    'LLM Integration Specialist', 2000,
                    'Geospatial AI Expert', 2000,
                    'Problem Solver', 2000,
                  ]}
                  repeat={Infinity}
                  speed={50}
                  className="text-base-200"
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="mt-4 font-body text-base-500 text-lg tracking-wide max-w-lg mx-auto"
              >
                Building intelligent systems that think, reason, and deliver.
              </motion.p>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.3, duration: 0.6 }}
                className="my-8 max-w-sm mx-auto h-px"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(34,197,94,0.5), rgba(6,182,212,0.3), transparent)',
                }}
              />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="flex flex-wrap gap-4 justify-center"
              >
                <TacticalButton
                  variant="tactical"
                  size="lg"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  icon={<ExternalLink size={16} />}
                >
                  View Projects
                </TacticalButton>
                {resumeUrl ? (
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={trackResumeDownload}
                    className="inline-flex items-center gap-2 px-8 py-4 font-display text-sm uppercase tracking-[0.15em] bg-command-500/10 text-command-400 border border-command-500/40 hover:bg-command-500/20 hover:border-command-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-all duration-300 rounded-sm"
                  >
                    <Download size={16} /> Download Resume
                  </a>
                ) : (
                  <TacticalButton variant="command" size="lg" icon={<Download size={16} />} disabled>
                    Resume Coming Soon
                  </TacticalButton>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.7 }}
                className="mt-8 flex items-center justify-center gap-5"
              >
                {[
                  { icon: <Github size={18} />, href: 'https://github.com/shivamjoshtech', label: 'GitHub' },
                  { icon: <Linkedin size={18} />, href: 'https://www.linkedin.com/in/shivam-joshi-499335246/', label: 'LinkedIn' },
                  { icon: <Mail size={18} />, href: 'mailto:joshishivam586@gmail.com', label: 'Email' },
                  { icon: <Phone size={18} />, href: 'https://wa.me/917668624575', label: 'WhatsApp' },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base-500 hover:text-tactical-400 transition-all duration-200 p-2.5 border border-transparent hover:border-tactical-600/30 rounded-sm hover:bg-tactical-600/5"
                    title={social.label}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>

              <HeroStats />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
            >
              <span className="font-tactical text-[9px] text-base-600 tracking-widest">SCROLL TO EXPLORE</span>
              <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                <ChevronDown size={16} className="text-tactical-600" />
              </motion.div>
            </motion.div>
          </div>
        </SectionWrapper>

        <AboutSection />
        <EducationSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <AchievementsSection />
        <ContactSection />

        <footer className="py-8 px-6 text-center border-t border-base-800/50">
          <div className="font-tactical text-[9px] text-base-600 tracking-widest">
            DESIGNED & BUILT BY SHIVAM JOSHI
          </div>
          <div className="font-mono text-[10px] text-base-700 mt-1">
            © 2025 • ALL RIGHTS RESERVED
          </div>
        </footer>
      </div>
    </motion.div>
  );
}