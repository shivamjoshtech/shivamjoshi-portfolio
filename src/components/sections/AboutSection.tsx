'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionHeader from '@/components/ui/SectionHeader';
import TacticalCard from '@/components/ui/TacticalCard';
import GlowBadge from '@/components/ui/GlowBadge';
import {
  Brain,
  MapPin,
  Globe,
  Cpu,
  BarChart3,
  Network,
  Zap,
  Target,
  Code2,
} from 'lucide-react';

const CORE_COMPETENCIES = [
  {
    icon: <Brain size={20} />,
    title: 'AI/ML & Generative AI',
    description: 'Designed and deployed LLM-based and Generative AI solutions end-to-end: from use-case scoping and automation goal definition, through model selection, prompt engineering, and production integration.',
    color: 'tactical' as const,
  },
  {
    icon: <Globe size={20} />,
    title: 'Geospatial Analysis & GIS',
    description: 'Conducted in-depth geospatial data research using map-based tools across diverse multi-source datasets, extracting precise feature specifications and supporting large-scale spatial intelligence workflows.',
    color: 'hud' as const,
  },
  {
    icon: <BarChart3 size={20} />,
    title: 'Data Visualization & Predictive Analytics',
    description: 'Built real-time dashboards that scrape, process, and present live data — incorporating scientific classification logic to generate predictive insights and support dynamic decision-making.',
    color: 'command' as const,
  },
  {
    icon: <Network size={20} />,
    title: 'Knowledge Graphs & Agentic AI',
    description: 'Developing Knowledge Graph integrations with Agentic AI systems, beginning from entity and relationship requirement definition — enabling context-aware reasoning and autonomous decision-making.',
    color: 'tactical' as const,
  },
];

const QUICK_FACTS = [
  { icon: <MapPin size={14} />, label: 'Location', value: 'Haldwani, Uttarakhand, India' },
  { icon: <Cpu size={14} />, label: 'Current Role', value: 'AI Engineer @ TCS' },
  { icon: <Target size={14} />, label: 'Specialization', value: 'GenAI, Multi-Agent Systems, Geospatial AI' },
  { icon: <Code2 size={14} />, label: 'Primary Lang', value: 'Python, JavaScript, TypeScript' },
  { icon: <Zap size={14} />, label: 'Impact', value: '200+ man-hours automated' },
];

export default function AboutSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <SectionWrapper id="about">
      <SectionHeader
        sectionId="about"
        subtitle="GenAI Developer with 8+ months of hands-on experience designing, building, and deploying AI-driven solutions."
      />

      <div className="grid lg:grid-cols-3 gap-6" ref={ref}>
        {/* Left — Profile Summary */}
        <div className="lg:col-span-2">
          <TacticalCard className="p-6 md:p-8 h-full">
            {/* Terminal header */}
            <div className="flex items-center gap-2 mb-5 pb-3 border-b border-base-700/40">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-alert-500/60" />
                <div className="w-2 h-2 rounded-full bg-command-500/60" />
                <div className="w-2 h-2 rounded-full bg-tactical-500/60" />
              </div>
              <span className="font-tactical text-[9px] text-base-500 tracking-wider ml-2">
                OPERATOR_PROFILE.md
              </span>
            </div>

            <p className="text-base-300 font-body text-lg leading-relaxed mb-4">
              Shivam Joshi is a <span className="text-tactical-400 font-semibold">GenAI Developer</span> with
              hands-on experience designing, building, and deploying AI-driven solutions within
              TCS&apos;s <span className="text-hud-400">GIS Center of Excellence (CoE) Team</span>. He began his career as a
              Geospatial Analyst, before taking on an expanded role as Backup LLM Integration
              Specialist in the Center Unit of IoT — ensuring operational continuity and seamless
              cross-team coordination.
            </p>

            <p className="text-base-400 font-body text-base leading-relaxed mb-4">
              His technical contributions span the full AI development lifecycle — from requirement
              analysis and model selection to production deployment and workflow automation. He has
              successfully automated geospatial data research workflows that previously required{' '}
              <span className="text-command-400 font-bold">200+ man-hours</span>, and has built
              intelligent multi-agent pipelines that measurably reduce time-to-insight across
              production operations.
            </p>

            <p className="text-base-400 font-body text-base leading-relaxed">
              Shivam brings deep expertise in Python, LLM-based solution development, REST API
              integration, geospatial analytics, and scalable backend architecture — with a proven
              ability to move AI models from prototype to production. He is passionate about solving
              high-complexity problems and delivering data-driven outcomes that align with real
              business objectives.
            </p>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              <GlowBadge variant="tactical" dot>Full AI Lifecycle</GlowBadge>
              <GlowBadge variant="command" dot>Production Deployment</GlowBadge>
              <GlowBadge variant="hud" dot>Geospatial Intelligence</GlowBadge>
              <GlowBadge variant="tactical" dot>Multi-Agent Pipelines</GlowBadge>
              <GlowBadge variant="command" dot>LLM/VLM Integration</GlowBadge>
            </div>
          </TacticalCard>
        </div>

        {/* Right — Quick Facts */}
        <div className="lg:col-span-1">
          <TacticalCard className="p-6 h-full" glowColor="hud">
            <div className="flex items-center gap-2 mb-5 pb-3 border-b border-base-700/40">
              <span className="font-tactical text-[9px] text-hud-500 tracking-wider">
                QUICK INTEL
              </span>
            </div>

            <div className="space-y-4">
              {QUICK_FACTS.map((fact, i) => (
                <motion.div
                  key={fact.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-0.5 text-tactical-500 flex-shrink-0">{fact.icon}</div>
                  <div>
                    <div className="font-tactical text-[10px] text-base-500 tracking-wider uppercase">
                      {fact.label}
                    </div>
                    <div className="font-mono text-sm text-base-300 mt-0.5">
                      {fact.value}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Status indicator */}
            <div className="mt-6 pt-4 border-t border-base-700/40">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-tactical-500 rounded-full animate-pulse-glow" />
                <span className="font-tactical text-[10px] text-tactical-500 tracking-wider">
                  AVAILABLE FOR OPPORTUNITIES
                </span>
              </div>
            </div>
          </TacticalCard>
        </div>
      </div>

      {/* Core Competencies Grid */}
      <div className="mt-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="font-tactical text-[10px] text-tactical-600 tracking-widest">
            [CORE_COMPETENCIES]
          </span>
          <div className="h-px flex-1 bg-base-700/30" />
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {CORE_COMPETENCIES.map((comp, i) => (
            <TacticalCard key={comp.title} className="p-5" glowColor={comp.color} delay={i}>
              <div className="flex items-start gap-4">
                <div className={`p-2.5 rounded-sm border ${
                  comp.color === 'tactical' ? 'bg-tactical-600/10 border-tactical-600/30 text-tactical-400' :
                  comp.color === 'hud' ? 'bg-hud-700/10 border-hud-700/30 text-hud-400' :
                  'bg-command-500/10 border-command-500/30 text-command-400'
                }`}>
                  {comp.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-sm text-base-100 tracking-wide uppercase mb-2">
                    {comp.title}
                  </h3>
                  <p className="font-body text-sm text-base-400 leading-relaxed">
                    {comp.description}
                  </p>
                </div>
              </div>
            </TacticalCard>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}