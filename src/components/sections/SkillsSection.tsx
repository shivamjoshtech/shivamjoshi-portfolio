'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionHeader from '@/components/ui/SectionHeader';
import TacticalCard from '@/components/ui/TacticalCard';
import GlowBadge from '@/components/ui/GlowBadge';
import { Shield, Crosshair } from 'lucide-react';
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiNumpy,
  SiPandas,
  SiOpencv,
  SiLangchain,
  SiHuggingface,
  SiNodedotjs,
  SiExpress,
  SiFlask,
  SiPostman,
  SiReact,
  SiHtml5,
  SiMongodb,
  SiMysql,
  SiDocker,
  SiGithub,
  SiGithubactions,
  SiGooglemaps,
  SiSwagger,
} from 'react-icons/si';
import {
  FaBrain,
  FaRobot,
  FaLink,
  FaServer,
  FaLayerGroup,
  FaCogs,
  FaProjectDiagram,
  FaDatabase,
  FaPaintBrush,
} from 'react-icons/fa';
import { BsLightningChargeFill } from 'react-icons/bs';

// ============================================
// SKILL DATA
// ============================================

interface SkillItem {
  name: string;
  icon: React.ReactNode;
  iconColor: string;
}

interface SkillCategory {
  category: string;
  codename: string;
  color: 'tactical' | 'command' | 'hud';
  skills: SkillItem[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Programming',
    codename: 'CORE_LANG',
    color: 'tactical',
    skills: [
      { name: 'Python', icon: <SiPython size={28} />, iconColor: '#3776AB' },
      { name: 'JavaScript', icon: <SiJavascript size={28} />, iconColor: '#F7DF1E' },
      { name: 'TypeScript', icon: <SiTypescript size={28} />, iconColor: '#3178C6' },
    ],
  },
  {
    category: 'GenAI & ML',
    codename: 'AI_CORE',
    color: 'command',
    skills: [
      { name: 'LLMs', icon: <FaBrain size={28} />, iconColor: '#A855F7' },
      { name: 'NumPy', icon: <SiNumpy size={28} />, iconColor: '#4DABCF' },
      { name: 'Pandas', icon: <SiPandas size={28} />, iconColor: '#150458' },
      { name: 'OpenCV', icon: <SiOpencv size={28} />, iconColor: '#5C3EE8' },
      { name: 'Prompt Engineering', icon: <BsLightningChargeFill size={28} />, iconColor: '#FBBF24' },
    ],
  },
  {
    category: 'Agentic AI',
    codename: 'AGENT_SYS',
    color: 'tactical',
    skills: [
      { name: 'Multi-Agent Pipelines', icon: <FaProjectDiagram size={28} />, iconColor: '#22C55E' },
      { name: 'RAG', icon: <FaLink size={28} />, iconColor: '#06B6D4' },
    ],
  },
  {
    category: 'GenAI Frameworks',
    codename: 'AI_FRMWK',
    color: 'hud',
    skills: [
      { name: 'LangChain', icon: <SiLangchain size={28} />, iconColor: '#1C3C3C' },
      { name: 'LlamaIndex', icon: <FaRobot size={28} />, iconColor: '#A855F7' },
      { name: 'Hugging Face', icon: <SiHuggingface size={28} />, iconColor: '#FFD21E' },
    ],
  },
  {
    category: 'Backend & APIs',
    codename: 'BACKEND',
    color: 'tactical',
    skills: [
      { name: 'Node.js', icon: <SiNodedotjs size={28} />, iconColor: '#339933' },
      { name: 'Express.js', icon: <SiExpress size={28} />, iconColor: '#FFFFFF' },
      { name: 'Flask', icon: <SiFlask size={28} />, iconColor: '#FFFFFF' },
      { name: 'REST APIs', icon: <FaServer size={28} />, iconColor: '#22D3EE' },
      { name: 'Postman', icon: <SiPostman size={28} />, iconColor: '#FF6C37' },
    ],
  },
  {
    category: 'Frontend & Stack',
    codename: 'UI_STACK',
    color: 'hud',
    skills: [
      { name: 'React.js', icon: <SiReact size={28} />, iconColor: '#61DAFB' },
      { name: 'HTML5', icon: <SiHtml5 size={28} />, iconColor: '#E34F26' },
      { name: 'CSS3', icon: <FaPaintBrush size={28} />, iconColor: '#1572B6' },
      { name: 'MERN Stack', icon: <FaLayerGroup size={28} />, iconColor: '#4ade80' },
    ],
  },
  {
    category: 'Databases',
    codename: 'DATA_STORE',
    color: 'command',
    skills: [
      { name: 'MongoDB', icon: <SiMongodb size={28} />, iconColor: '#47A248' },
      { name: 'SQL', icon: <SiMysql size={28} />, iconColor: '#4479A1' },
      { name: 'Pinecone', icon: <FaDatabase size={28} />, iconColor: '#22C55E' },
    ],
  },
  {
    category: 'MLOps & Tools',
    codename: 'OPS_TOOLS',
    color: 'tactical',
    skills: [
      { name: 'Docker', icon: <SiDocker size={28} />, iconColor: '#2496ED' },
      { name: 'GitHub', icon: <SiGithub size={28} />, iconColor: '#FFFFFF' },
      { name: 'CI/CD', icon: <SiGithubactions size={28} />, iconColor: '#2088FF' },
    ],
  },
  {
    category: 'Specialization',
    codename: 'SPEC_OPS',
    color: 'command',
    skills: [
      { name: 'Geospatial Analysis', icon: <SiGooglemaps size={28} />, iconColor: '#4285F4' },
      { name: 'API Integration', icon: <SiSwagger size={28} />, iconColor: '#85EA2D' },
      { name: 'Workflow Automation', icon: <FaCogs size={28} />, iconColor: '#F59E0B' },
    ],
  },
];

const COLOR_MAP = {
  tactical: {
    bg: 'bg-tactical-600/10',
    border: 'border-tactical-600/30',
    text: 'text-tactical-400',
    badge: 'tactical' as const,
  },
  command: {
    bg: 'bg-command-500/10',
    border: 'border-command-500/30',
    text: 'text-command-400',
    badge: 'command' as const,
  },
  hud: {
    bg: 'bg-hud-700/10',
    border: 'border-hud-700/30',
    text: 'text-hud-400',
    badge: 'hud' as const,
  },
};

// ============================================
// MAIN COMPONENT
// ============================================

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const totalSkills = SKILL_CATEGORIES.reduce((sum, cat) => sum + cat.skills.length, 0);

  return (
    <SectionWrapper id="skills">
      <SectionHeader
        sectionId="skills"
        title="TECH ARSENAL"
        subtitle="Tools, frameworks, and technologies in the operational arsenal."
      />

      {/* Arsenal Summary Bar */}
      <div className="flex flex-wrap items-center gap-4 mb-8 p-4 bg-base-800/40 border border-base-700/30 rounded-sm">
        <div className="flex items-center gap-2">
          <Shield size={16} className="text-tactical-500" />
          <span className="font-tactical text-[10px] text-base-400 tracking-wider">
            ARSENAL STATUS:
          </span>
        </div>
        <div className="flex flex-wrap gap-3">
          <span className="font-mono text-xs text-tactical-400">
            <span className="text-base-100 font-bold">{totalSkills}</span> Technologies
          </span>
          <span className="text-base-700">|</span>
          <span className="font-mono text-xs text-command-400">
            <span className="text-base-100 font-bold">{SKILL_CATEGORIES.length}</span> Categories
          </span>
          <span className="text-base-700">|</span>
          <span className="font-mono text-xs text-hud-400">
            <span className="text-base-100 font-bold">OPERATIONAL</span>
          </span>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-3 py-1.5 font-tactical text-[10px] tracking-wider rounded-sm border transition-all ${
            activeCategory === null
              ? 'bg-tactical-600/20 border-tactical-500/50 text-tactical-400'
              : 'bg-base-800/50 border-base-700/50 text-base-500 hover:text-base-300 hover:border-base-600'
          }`}
        >
          ALL ({totalSkills})
        </button>
        {SKILL_CATEGORIES.map((cat) => {
          const c = COLOR_MAP[cat.color];
          const isActive = activeCategory === cat.category;
          return (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(isActive ? null : cat.category)}
              className={`px-3 py-1.5 font-tactical text-[10px] tracking-wider rounded-sm border transition-all ${
                isActive
                  ? `${c.bg} ${c.border} ${c.text}`
                  : 'bg-base-800/50 border-base-700/50 text-base-500 hover:text-base-300 hover:border-base-600'
              }`}
            >
              {cat.codename} ({cat.skills.length})
            </button>
          );
        })}
      </div>

      {/* Skills Categories */}
      <div className="space-y-8">
        {SKILL_CATEGORIES
          .filter((cat) => !activeCategory || cat.category === activeCategory)
          .map((cat, catIndex) => (
            <SkillCategoryBlock key={cat.category} category={cat} index={catIndex} />
          ))}
      </div>
    </SectionWrapper>
  );
}

// ============================================
// CATEGORY BLOCK
// ============================================

function SkillCategoryBlock({ category, index }: { category: SkillCategory; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const c = COLOR_MAP[category.color];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.4 }}
    >
      {/* Category Label */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-1.5 rounded-sm border ${c.bg} ${c.border}`}>
          <Crosshair size={12} className={c.text} />
        </div>
        <h3 className="font-display text-sm text-base-100 tracking-wide uppercase">
          {category.category}
        </h3>
        <div className="h-px flex-1 bg-base-700/30" />
        <GlowBadge variant={c.badge} size="sm">
          {category.codename}
        </GlowBadge>
      </div>

      {/* Skills Card Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {category.skills.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} index={i} inView={inView} />
        ))}
      </div>
    </motion.div>
  );
}

// ============================================
// INDIVIDUAL SKILL CARD — Pretty Logo Style
// ============================================

function SkillCard({
  skill,
  index,
  inView,
}: {
  skill: SkillItem;
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: 0.1 + index * 0.06, duration: 0.35 }}
    >
      <div className="group relative bg-base-800/60 border border-base-700/50 rounded-sm p-4 flex flex-col items-center gap-3 transition-all duration-300 hover:border-base-600/70 hover:bg-base-800/90 hover:shadow-[0_0_20px_rgba(34,197,94,0.07)] cursor-default">
        {/* Icon with color glow on hover */}
        <div className="relative">
          <div
            className="transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-lg"
            style={{ color: skill.iconColor }}
          >
            {skill.icon}
          </div>
          {/* Glow circle behind icon on hover */}
          <div
            className="absolute inset-0 rounded-full blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10 scale-150"
            style={{ backgroundColor: skill.iconColor }}
          />
        </div>

        {/* Skill Name */}
        <span className="font-mono text-[11px] text-base-400 group-hover:text-base-200 transition-colors text-center leading-tight">
          {skill.name}
        </span>

        {/* Top accent line on hover */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-8 transition-all duration-300 rounded-full"
          style={{ backgroundColor: skill.iconColor }}
        />
      </div>
    </motion.div>
  );
}