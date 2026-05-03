'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
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
      (async () => {
        try {
          const { supabase } = await import('@/lib/supabase');
          await supabase.from('analytics').insert({ event_type: 'page_view', page: '/' });
          const { data } = await supabase
            .from('site_settings')
            .select('value')
            .eq('key', 'resume_url')
            .maybeSingle();
          if (data?.value) setResumeUrl(data.value);
        } catch {}
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

  if (!isLoaded) return <LoadingScreen onComplete={handleLoadComplete} />;

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
        {/* ============== HERO ============== */}
        <SectionWrapper id="hero" fullHeight noPadding>
          <div className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12 pt-16 lg:pt-0 relative overflow-hidden">
            <ParticleField />
            <RadarPing />
            <div className="absolute inset-0 bg-tactical-grid-dense bg-grid-sm opacity-20 z-[1]" />

            {/* Background CLASSIFIED text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
              <span className="font-display text-[6rem] sm:text-[8rem] md:text-[12rem] text-base-800/10 uppercase tracking-[0.3em] rotate-[-15deg] select-none">
                CLASSIFIED
              </span>
            </div>

            {/* Corner decorations */}
            <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-tactical-600/20 z-[2] hidden md:block" />
            <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-tactical-600/20 z-[2] hidden md:block" />
            <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-tactical-600/20 z-[2] hidden md:block" />
            <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-tactical-600/20 z-[2] hidden md:block" />

            {/* ====== MAIN HERO CONTENT ====== */}
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 max-w-5xl w-full">

              {/* ---- LEFT — Photo ---- */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex-shrink-0 flex flex-col items-center gap-4"
              >
                {/* Photo Container */}
                <div className="relative">
                  {/* Outer glow ring */}
                  <motion.div
                    className="absolute -inset-1 rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, rgba(34,197,94,0.4), rgba(6,182,212,0.2), rgba(245,158,11,0.2))',
                    }}
                    animate={{ rotate: [0, 360] }}
                    transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                  />

                  {/* Photo frame */}
                  <div className="relative w-44 h-44 md:w-52 md:h-52 lg:w-56 lg:h-56 rounded-full overflow-hidden border-2 border-tactical-600/40 bg-base-800">
                    <Image
                      src="/images/shivam-profile.jpg"
                      alt="Shivam Joshi — AI Engineer"
                      fill
                      className="object-cover object-top"
                      priority
                    />

                    {/* Scan line overlay on photo */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-tactical-600/5 to-tactical-600/10 pointer-events-none" />
                  </div>


                </div>

                {/* Rank insignia under photo on mobile */}
                <div className="lg:hidden">
                  <RankInsignia />
                </div>
              </motion.div>

              {/* ---- RIGHT — Name + Content ---- */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-col items-center lg:items-start text-center lg:text-left"
              >
                {/* Rank insignia — desktop only */}
                <div className="hidden lg:block mb-4">
                  <RankInsignia />
                </div>

                {/* Name */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-base-100 tracking-[0.08em] relative"
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

                {/* Typing role */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 }}
                  className="mt-4 font-mono text-base md:text-lg text-base-400"
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

                {/* Tagline */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="mt-3 font-body text-base-500 text-base md:text-lg tracking-wide max-w-md"
                >
                  Building intelligent systems that think, reason, and deliver.
                </motion.p>

                {/* Divider */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                  className="my-6 w-full max-w-xs h-px self-center lg:self-start"
                  style={{
                    background: 'linear-gradient(90deg, rgba(34,197,94,0.6), rgba(6,182,212,0.3), transparent)',
                  }}
                />

                {/* Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="flex flex-wrap gap-3 justify-center lg:justify-start"
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
                      className="inline-flex items-center gap-2 px-6 py-3 font-display text-sm uppercase tracking-[0.15em] bg-command-500/10 text-command-400 border border-command-500/40 hover:bg-command-500/20 hover:border-command-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-all duration-300 rounded-sm"
                    >
                      <Download size={16} /> Download Resume
                    </a>
                  ) : (
                    <TacticalButton variant="command" size="lg" icon={<Download size={16} />} disabled>
                      Resume Coming Soon
                    </TacticalButton>
                  )}
                </motion.div>

                {/* Social links */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.7 }}
                  className="mt-6 flex items-center gap-4 justify-center lg:justify-start"
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
                      className="text-base-500 hover:text-tactical-400 transition-all duration-200 p-2 border border-transparent hover:border-tactical-600/30 rounded-sm hover:bg-tactical-600/5"
                      title={social.label}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            </div>

            {/* Stats — below both columns */}
            <div className="relative z-10 w-full max-w-5xl">
              <HeroStats />
            </div>

            {/* Scroll indicator */}
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

        {/* ============== SECTIONS ============== */}
        <AboutSection />
        <EducationSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <AchievementsSection />
        <ContactSection />

        {/* Footer */}
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