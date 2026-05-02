'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionHeader from '@/components/ui/SectionHeader';
import TacticalCard from '@/components/ui/TacticalCard';
import GlowBadge from '@/components/ui/GlowBadge';
import { Trophy, Medal, Star, Calendar, MapPin, Clock } from 'lucide-react';

const ACHIEVEMENTS = [
  {
    title: "Winner — Hack'24",
    event: 'IIIT Delhi Hackathon 2024',
    location: 'IIIT Delhi, New Delhi',
    date: '24-25 Aug 2024',
    duration: '24 Hours',
    description:
      'Won a 24-hour hackathon at IIIT Delhi, showcasing innovative problem-solving and technical skills. Competed against top engineering teams from across India.',
    achievementType: 'WINNER',
    icon: <Trophy size={22} />,
    color: 'command' as const,
    rank: '🥇',
    highlight: true,
  },
  {
    title: 'Selected for Screening — SIH 2024',
    event: 'Smart India Hackathon 2024',
    location: 'National Level',
    date: '10 Sept 2024',
    duration: 'Multi-stage',
    description:
      'Advanced to the screening stage for the national-level Smart India Hackathon. Built an ML-based solution during the internal hackathon phase. Demonstrated applied machine learning capabilities.',
    achievementType: 'SCREENING',
    icon: <Star size={22} />,
    color: 'tactical' as const,
    rank: '⭐',
    highlight: false,
  },
  {
    title: 'Competitor — Hack-Wars',
    event: 'Chandigarh University Hackathon 2024',
    location: 'Chandigarh University, Punjab',
    date: '19 Sept 2024',
    duration: '36 Hours',
    description:
      'Competed in a 36-hour hackathon at Chandigarh University, Punjab. Showcased innovative problem-solving under intense time pressure against diverse teams.',
    achievementType: 'COMPETITOR',
    icon: <Medal size={22} />,
    color: 'hud' as const,
    rank: '⚔️',
    highlight: false,
  },
  {
    title: 'Finalist — TechSprint (Top 7)',
    event: 'National Level Hackathon, Graphic Era University',
    location: 'Graphic Era University, Dehradun',
    date: '1-3 May 2025',
    duration: '48 Hours',
    description:
      'Ranked among the top 7 teams in a 48-hour national-level hackathon. Built an innovative ML-powered Smart Bin IoT project demonstrating practical smart waste management solutions.',
    achievementType: 'FINALIST',
    icon: <Trophy size={22} />,
    color: 'command' as const,
    rank: '🏆',
    highlight: true,
  },
];

export default function AchievementsSection() {
  return (
    <SectionWrapper id="achievements">
      <SectionHeader
        sectionId="achievements"
        title="COMMENDATIONS"
        subtitle="Honors earned in competitive technical environments."
      />

      {/* Achievement count summary */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex items-center gap-2">
          <Trophy size={14} className="text-command-400" />
          <span className="font-mono text-xs text-base-400">
            <span className="text-command-400 font-bold">1</span> Win
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Star size={14} className="text-tactical-400" />
          <span className="font-mono text-xs text-base-400">
            <span className="text-tactical-400 font-bold">1</span> Finalist
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Medal size={14} className="text-hud-400" />
          <span className="font-mono text-xs text-base-400">
            <span className="text-hud-400 font-bold">4</span> Hackathons Total
          </span>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid md:grid-cols-2 gap-5">
        {ACHIEVEMENTS.map((ach, i) => (
          <AchievementCard key={ach.title} achievement={ach} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}

function AchievementCard({
  achievement: ach,
  index,
}: {
  achievement: (typeof ACHIEVEMENTS)[0];
  index: number;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.5 }}
    >
      <TacticalCard
        className={`p-5 md:p-6 h-full relative overflow-hidden ${
          ach.highlight ? 'ring-1 ring-command-500/20' : ''
        }`}
        glowColor={ach.color}
      >
        {/* Highlight shimmer for winners */}
        {ach.highlight && (
          <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-bl from-command-400 to-transparent" />
          </div>
        )}

        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-start gap-3">
            <div className={`p-2.5 rounded-sm border flex-shrink-0 ${
              ach.color === 'command'
                ? 'bg-command-500/10 border-command-500/30 text-command-400'
                : ach.color === 'tactical'
                ? 'bg-tactical-600/10 border-tactical-600/30 text-tactical-400'
                : 'bg-hud-700/10 border-hud-700/30 text-hud-400'
            }`}>
              {ach.icon}
            </div>
            <div>
              <GlowBadge variant={ach.color} size="sm" className="mb-1.5">
                {ach.achievementType}
              </GlowBadge>
              <h3 className="font-display text-base md:text-lg text-base-100 tracking-wide">
                {ach.title}
              </h3>
            </div>
          </div>
          <span className="text-2xl flex-shrink-0">{ach.rank}</span>
        </div>

        {/* Event name */}
        <p className="font-mono text-xs text-tactical-500 mb-3">{ach.event}</p>

        {/* Meta info */}
        <div className="flex flex-wrap gap-3 mb-4 text-[10px] font-tactical tracking-wider text-base-500">
          <div className="flex items-center gap-1">
            <Calendar size={11} />
            <span>{ach.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={11} />
            <span>{ach.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={11} />
            <span>{ach.location}</span>
          </div>
        </div>

        {/* Description */}
        <p className="font-body text-sm text-base-400 leading-relaxed">
          {ach.description}
        </p>
      </TacticalCard>
    </motion.div>
  );
}