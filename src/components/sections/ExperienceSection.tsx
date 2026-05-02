'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionHeader from '@/components/ui/SectionHeader';
import TacticalCard from '@/components/ui/TacticalCard';
import GlowBadge from '@/components/ui/GlowBadge';
import { Timeline, TimelineItem } from '@/components/ui/Timeline';
import {
  Building2,
  Briefcase,
  Bot,
  Code,
  Globe,
  Zap,
  Shield,
  Eye,
  Database,
  FlaskConical,
} from 'lucide-react';

const EXPERIENCE_DATA = [
  {
    company: 'Tata Consultancy Services (TCS)',
    role: 'AI Engineer — GenAI Developer, CoE Team',
    location: 'India',
    period: 'July 2025 — Present',
    isPresent: true,
    icon: <Building2 size={18} />,
    color: 'tactical' as const,
    description:
      'Building and deploying AI-driven solutions within TCS GIS Center of Excellence. Full AI development lifecycle — from requirement analysis and model selection to production deployment and workflow automation.',
    highlights: [
      {
        icon: <Zap size={14} />,
        text: 'Engineered AI/ML automation system for geospatial data research — eliminated 200+ man-hours of manual production work, replacing repetitive analyst tasks with an integrated, machine-driven pipeline.',
      },
      {
        icon: <Globe size={14} />,
        text: 'Built AI-powered geocoding engine with confidence scoring, multi-tier accuracy levels, and bulk-processing capabilities for enterprise-scale address datasets.',
      },
      {
        icon: <Eye size={14} />,
        text: 'Developed AI-based signboard detection model to support asset identification and field operations — addressing real-world constraints around object detection accuracy.',
      },
      {
        icon: <Bot size={14} />,
        text: 'Integrated LLM-based solutions and AI models into live production workflows, ensuring scalability, performance reliability, and compatibility with existing enterprise systems.',
      },
      {
        icon: <Shield size={14} />,
        text: 'Emergency deployment into critical projects requiring deeper AI integration — leading LLM and Vision-Language Model (VLM) integration efforts under live project conditions.',
      },
    ],
    subRoles: [
      {
        title: 'GenAI Developer — CoE Team',
        badge: 'PRIMARY',
        badgeColor: 'tactical' as const,
      },
      {
        title: 'Backup LLM Integration Specialist — Center Unit IoT',
        badge: 'SECONDARY',
        badgeColor: 'hud' as const,
      },
      {
        title: 'Geospatial Analyst',
        badge: 'FOUNDATION',
        badgeColor: 'command' as const,
      },
    ],
    techUsed: ['Python', 'LangChain', 'OpenCV', 'Flask', 'REST APIs', 'LLMs', 'VLMs', 'Geocoding', 'SegFormer'],
  },
  {
    company: 'Outlier AI (Scale AI)',
    role: 'Junior Programmer — Real World Coding Evals',
    location: 'Remote',
    period: 'Sept 2024 — July 2025',
    isPresent: false,
    icon: <Code size={18} />,
    color: 'command' as const,
    description:
      'Trained and fine-tuned Large Language Models through real-world coding evaluations, preparing high-quality datasets using proprietary client tooling for model optimization.',
    highlights: [
      {
        icon: <Bot size={14} />,
        text: 'Trained & fine-tuned LLMs through real-world coding evaluations using proprietary client tooling.',
      },
      {
        icon: <Database size={14} />,
        text: 'Wrote data manipulation and program scripts for diverse environments, built data scraping pipelines.',
      },
      {
        icon: <FlaskConical size={14} />,
        text: 'Performed fine-tuning workflows to enhance model accuracy and output quality.',
      },
      {
        icon: <Shield size={14} />,
        text: 'Tested and validated created models against client expectations, ensuring output consistency and production-readiness.',
      },
    ],
    subRoles: [],
    techUsed: ['Python', 'Data Scraping', 'Fine-Tuning', 'LLM Training', 'Dataset Preparation'],
  },
];

export default function ExperienceSection() {
  return (
    <SectionWrapper id="experience">
      <SectionHeader
        sectionId="experience"
        title="FIELD OPERATIONS"
        subtitle="Deployment history across AI, ML, and geospatial domains."
      />

      <Timeline>
        {EXPERIENCE_DATA.map((exp, index) => (
          <TimelineItem
            key={exp.company}
            index={index}
            isLast={index === EXPERIENCE_DATA.length - 1}
            dotColor={exp.color}
          >
            <TacticalCard className="p-5 md:p-7" glowColor={exp.color} delay={index}>
              {/* Header Row */}
              <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-sm border flex-shrink-0 ${
                    exp.color === 'tactical'
                      ? 'bg-tactical-600/10 border-tactical-600/30 text-tactical-400'
                      : 'bg-command-500/10 border-command-500/30 text-command-400'
                  }`}>
                    {exp.icon}
                  </div>
                  <div>
                    <h3 className="font-display text-lg md:text-xl text-base-100 tracking-wide">
                      {exp.company}
                    </h3>
                    <p className="font-mono text-sm text-tactical-500 mt-0.5">
                      {exp.role}
                    </p>
                    <p className="font-tactical text-[10px] text-base-500 tracking-wider mt-1">
                      📍 {exp.location}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5">
                  <GlowBadge variant={exp.color} size="sm">
                    {exp.period}
                  </GlowBadge>
                  {exp.isPresent && (
                    <GlowBadge variant="tactical" size="sm" dot pulse>
                      ACTIVE DUTY
                    </GlowBadge>
                  )}
                </div>
              </div>

              {/* Sub-roles (for TCS) */}
              {exp.subRoles.length > 0 && (
                <div className="mb-4 p-3 bg-base-900/50 rounded-sm border border-base-700/30">
                  <div className="font-tactical text-[9px] text-base-500 tracking-widest mb-2">
                    ROLES HELD
                  </div>
                  <div className="space-y-1.5">
                    {exp.subRoles.map((sub) => (
                      <div key={sub.title} className="flex items-center gap-2">
                        <GlowBadge variant={sub.badgeColor} size="sm">
                          {sub.badge}
                        </GlowBadge>
                        <span className="font-body text-xs text-base-400">{sub.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <p className="font-body text-sm text-base-400 leading-relaxed mb-5">
                {exp.description}
              </p>

              {/* Highlights */}
              <div className="mb-5">
                <div className="font-tactical text-[9px] text-tactical-600 tracking-widest mb-3">
                  KEY OPERATIONS
                </div>
                <div className="space-y-3">
                  {exp.highlights.map((h, i) => (
                    <HighlightItem key={i} icon={h.icon} text={h.text} index={i} />
                  ))}
                </div>
              </div>

              {/* Tech Used */}
              <div className="pt-4 border-t border-base-700/30">
                <div className="font-tactical text-[9px] text-base-500 tracking-widest mb-2">
                  TECH DEPLOYED
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {exp.techUsed.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[10px] font-mono bg-base-800 text-base-400 border border-base-700/50 rounded-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </TacticalCard>
          </TimelineItem>
        ))}
      </Timeline>
    </SectionWrapper>
  );
}

function HighlightItem({ icon, text, index }: { icon: React.ReactNode; text: string; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -10 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="flex items-start gap-3 group"
    >
      <div className="mt-0.5 text-tactical-600 group-hover:text-tactical-400 transition-colors flex-shrink-0">
        {icon}
      </div>
      <p className="font-body text-sm text-base-400 leading-relaxed group-hover:text-base-300 transition-colors">
        {text}
      </p>
    </motion.div>
  );
}