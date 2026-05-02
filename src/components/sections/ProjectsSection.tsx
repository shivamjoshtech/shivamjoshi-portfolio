'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionHeader from '@/components/ui/SectionHeader';
import TacticalButton from '@/components/ui/TacticalButton';
import GlowBadge from '@/components/ui/GlowBadge';
import {
  Github,
  ExternalLink,
  Play,
  X,
  FolderGit2,
  Star,
  Filter,
} from 'lucide-react';

interface ProjectData {
  id?: string;
  title: string;
  slug: string;
  description: string;
  long_description?: string;
  category: string;
  tech_stack: any[];
  github_url?: string;
  live_url?: string;
  video_url?: string;
  featured: boolean;
}

// Fallback projects (used if Supabase not configured)
const FALLBACK_PROJECTS: ProjectData[] = [
  {
    title: 'AI-Powered Geocoding Pipeline',
    slug: 'geocoding-pipeline',
    description: 'Multi-agent geocoding system for US addresses with confidence scoring, waterfall architecture, and bulk-processing.',
    long_description: 'An intelligent multi-agent geocoding pipeline that automates US address resolution using a waterfall architecture across multiple geocoding providers. Features confidence scoring, multi-tier accuracy levels, and LLM-powered address reconstruction.',
    category: 'major',
    tech_stack: [{ name: 'Python' }, { name: 'LangChain' }, { name: 'Nominatim' }, { name: 'ESRI' }, { name: 'Census API' }, { name: 'rapidfuzz' }, { name: 'LLM' }, { name: 'REST APIs' }],
    featured: true,
  },
  {
    title: 'Fire Hazard Analysis System',
    slug: 'fire-hazard-analysis',
    description: 'Flask-based fire risk intelligence platform integrating satellite imagery, AI segmentation, terrain analysis, and LLM-powered risk inference.',
    long_description: 'A comprehensive fire hazard analysis application that stitches satellite tiles, performs AI semantic segmentation using SegFormer, computes terrain metrics, fetches real-time weather, and uses Gemini LLM for contextual risk inference.',
    category: 'major',
    tech_stack: [{ name: 'Python' }, { name: 'Flask' }, { name: 'SegFormer' }, { name: 'ESRI Tiles' }, { name: 'Gemini LLM' }, { name: 'Leaflet' }],
    featured: true,
  },
  {
    title: 'Terrain Analysis Tool',
    slug: 'terrain-analysis',
    description: 'Elevation and terrain metrics tool using COP30 DEM data with 12 computed terrain parameters.',
    category: 'mini',
    tech_stack: [{ name: 'Python' }, { name: 'OpenTopography API' }, { name: 'NumPy' }, { name: 'REST APIs' }],
    featured: false,
  },
  {
    title: 'Tourist Cab Booking Platform',
    slug: 'safartravels',
    description: 'Travel booking platform connecting tourists with local cab drivers in Uttarakhand with payment integration.',
    category: 'invented',
    tech_stack: [{ name: 'Next.js 14' }, { name: 'Supabase' }, { name: 'Razorpay' }, { name: 'Twilio WhatsApp API' }],
    featured: false,
  },
];

const CATEGORY_CONFIG: Record<string, { label: string; color: 'tactical' | 'command' | 'hud' | 'alert'; codename: string }> = {
  major: { label: 'MAJOR PROJECT', color: 'tactical', codename: 'MAJOR' },
  mini: { label: 'MINI PROJECT', color: 'hud', codename: 'MINI' },
  freelance: { label: 'FREELANCE', color: 'command', codename: 'FREELANCE' },
  invented: { label: 'SELF-INVENTED', color: 'command', codename: 'INVENTED' },
  client_demand: { label: 'CLIENT DEMAND', color: 'alert', codename: 'CLIENT' },
};

export default function ProjectsSection() {
  const [projects, setProjects] = useState<ProjectData[]>(FALLBACK_PROJECTS);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  // Try loading from Supabase, fallback to hardcoded
  useEffect(() => {
    (async () => {
      try {
        const { supabase } = await import('@/lib/supabase');
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('status', 'published')
          .order('order_index', { ascending: true });

        if (!error && data && data.length > 0) {
          setProjects(data);
        }
        // If no data or error, keep fallback projects
      } catch (e) {
        // Keep fallback
      }
    })();
  }, []);

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const categoryCounts = projects.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <SectionWrapper id="projects">
      <SectionHeader
        sectionId="projects"
        title="MISSION FILES"
        subtitle="Major builds, experiments, and client deployments."
      />

      <div className="flex flex-wrap items-center gap-4 mb-8 p-4 bg-base-800/40 border border-base-700/30 rounded-sm">
        <div className="flex items-center gap-2">
          <FolderGit2 size={16} className="text-tactical-500" />
          <span className="font-tactical text-[10px] text-base-400 tracking-wider">PROJECT STATUS:</span>
        </div>
        <div className="flex flex-wrap gap-3">
          <span className="font-mono text-xs text-tactical-400">
            <span className="text-base-100 font-bold">{projects.length}</span> Projects
          </span>
          <span className="text-base-700">|</span>
          <span className="font-mono text-xs text-command-400">
            <span className="text-base-100 font-bold">{projects.filter(p => p.featured).length}</span> Featured
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1.5 font-tactical text-[10px] tracking-wider rounded-sm border transition-all flex items-center gap-1.5 ${
            activeFilter === 'all'
              ? 'bg-tactical-600/20 border-tactical-500/50 text-tactical-400'
              : 'bg-base-800/50 border-base-700/50 text-base-500 hover:text-base-300'
          }`}
        >
          <Filter size={10} /> ALL ({projects.length})
        </button>
        {Object.keys(CATEGORY_CONFIG).map((cat) => {
          if (!categoryCounts[cat]) return null;
          const config = CATEGORY_CONFIG[cat];
          return (
            <button
              key={cat}
              onClick={() => setActiveFilter(activeFilter === cat ? 'all' : cat)}
              className={`px-3 py-1.5 font-tactical text-[10px] tracking-wider rounded-sm border transition-all ${
                activeFilter === cat
                  ? 'bg-tactical-600/20 border-tactical-500/50 text-tactical-400'
                  : 'bg-base-800/50 border-base-700/50 text-base-500 hover:text-base-300'
              }`}
            >
              {config.codename} ({categoryCounts[cat]})
            </button>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              isExpanded={expandedProject === project.slug}
              onToggle={() => setExpandedProject(expandedProject === project.slug ? null : project.slug)}
            />
          ))}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}

function ProjectCard({ project, index, isExpanded, onToggle }: {
  project: ProjectData; index: number; isExpanded: boolean; onToggle: () => void;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const catConfig = CATEGORY_CONFIG[project.category] || CATEGORY_CONFIG.major;
  const techNames = (project.tech_stack || []).map((t: any) => typeof t === 'string' ? t : t.name);

  const trackClick = async () => {
    try {
      const { supabase } = await import('@/lib/supabase');
      await supabase.from('analytics').insert({
        event_type: 'project_click',
        page: project.slug,
        metadata: { title: project.title },
      });
    } catch {}
  };

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className={isExpanded ? 'md:col-span-2' : ''}
    >
      <div className={`relative bg-base-800/80 border rounded-sm transition-all duration-300 backdrop-blur-sm overflow-hidden ${
        project.featured
          ? 'border-tactical-600/40 hover:border-tactical-500/60 hover:shadow-[0_0_25px_rgba(34,197,94,0.1)]'
          : 'border-base-700/60 hover:border-base-600/80'
      }`}>
        {project.featured && (
          <div className="absolute top-3 right-3 z-10">
            <div className="flex items-center gap-1 px-2 py-0.5 bg-command-500/20 border border-command-500/40 rounded-sm">
              <Star size={10} className="text-command-400 fill-command-400" />
              <span className="font-tactical text-[8px] text-command-400 tracking-wider">FEATURED</span>
            </div>
          </div>
        )}

        <div className="p-5 md:p-6">
          <div className="mb-4">
            <GlowBadge variant={catConfig.color} size="sm" className="mb-3">{catConfig.label}</GlowBadge>
            <h3 className="font-display text-xl md:text-2xl text-base-100 tracking-wide">{project.title}</h3>
          </div>

          <p className="font-body text-sm text-base-400 leading-relaxed mb-4">
            {isExpanded && project.long_description ? project.long_description : project.description}
          </p>

          <AnimatePresence>
            {isExpanded && project.video_url && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="mb-5 aspect-video bg-base-900/80 border border-base-700/30 rounded-sm overflow-hidden">
                  {project.video_url.includes('youtube') || project.video_url.includes('youtu.be') ? (
                    <iframe
                      src={project.video_url.replace('watch?v=', 'embed/')}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <a href={project.video_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-tactical-500">
                        <Play size={24} /> Watch Demo
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mb-5">
            <div className="font-tactical text-[9px] text-base-600 tracking-widest mb-2">TECH DEPLOYED</div>
            <div className="flex flex-wrap gap-1.5">
              {techNames.map((tech: string) => (
                <span key={tech} className="px-2 py-0.5 text-[10px] font-mono bg-base-900/60 text-base-400 border border-base-700/40 rounded-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-3 pt-4 border-t border-base-700/30">
            <div className="flex gap-2">
              {project.github_url && (
                <TacticalButton variant="ghost" size="sm" href={project.github_url} icon={<Github size={14} />} onClick={trackClick}>
                  Code
                </TacticalButton>
              )}
              {project.live_url && (
                <TacticalButton variant="tactical" size="sm" href={project.live_url} icon={<ExternalLink size={14} />} onClick={trackClick}>
                  Live Demo
                </TacticalButton>
              )}
              {!project.github_url && !project.live_url && (
                <span className="font-mono text-[10px] text-base-600 flex items-center gap-1.5">
                  <Github size={12} /> Links managed from Admin
                </span>
              )}
            </div>

            <button
              onClick={() => { onToggle(); trackClick(); }}
              className="font-tactical text-[10px] tracking-wider text-base-500 hover:text-tactical-400 transition-colors flex items-center gap-1"
            >
              {isExpanded ? <><X size={12} /> COLLAPSE</> : <>VIEW DETAILS ▸</>}
            </button>
          </div>
        </div>

        <div className="h-[2px] w-full" style={{
          background: project.featured
            ? 'linear-gradient(90deg, transparent, rgba(34,197,94,0.4), rgba(245,158,11,0.3), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(34,197,94,0.15), transparent)',
        }} />
      </div>
    </motion.div>
  );
}