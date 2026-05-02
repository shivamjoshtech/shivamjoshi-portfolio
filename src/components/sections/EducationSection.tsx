'use client';

import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionHeader from '@/components/ui/SectionHeader';
import TacticalCard from '@/components/ui/TacticalCard';
import GlowBadge from '@/components/ui/GlowBadge';
import { Timeline, TimelineItem } from '@/components/ui/Timeline';
import { GraduationCap, School, Award } from 'lucide-react';

const EDUCATION_DATA = [
  {
    institution: 'Graphic Era University',
    degree: 'Bachelor of Computer Applications (BCA)',
    field: 'Computer Applications',
    location: 'Uttarakhand, India',
    period: 'July 2022 — June 2025',
    status: 'Completed',
    icon: <GraduationCap size={18} />,
    color: 'tactical' as const,
    details: [
      'Deemed to be University — UGC recognized',
      'Focus: Computer Science, Programming, Data Structures',
      'Active participation in technical events and hackathons',
    ],
  },
  {
    institution: 'The Masters School, Haldwani',
    degree: 'XII (CBSE Board)',
    field: 'PCM — Physics, Chemistry, Mathematics',
    location: 'Nainital, Uttarakhand',
    period: 'Passed — 2021',
    status: '84.2%',
    icon: <School size={18} />,
    color: 'command' as const,
    details: [
      'CBSE Board — Science Stream (PCM)',
      'Scored 84.2% — Strong foundation in Mathematics & Science',
    ],
  },
];

export default function EducationSection() {
  return (
    <SectionWrapper id="education">
      <SectionHeader
        sectionId="education"
        title="TRAINING RECORDS"
        subtitle="Academic foundation and formal training history."
      />

      <Timeline>
        {EDUCATION_DATA.map((edu, index) => (
          <TimelineItem
            key={edu.institution}
            index={index}
            isLast={index === EDUCATION_DATA.length - 1}
            dotColor={edu.color}
          >
            <TacticalCard className="p-5 md:p-6" glowColor={edu.color} delay={index}>
              {/* Header */}
              <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-sm border flex-shrink-0 ${
                    edu.color === 'tactical'
                      ? 'bg-tactical-600/10 border-tactical-600/30 text-tactical-400'
                      : 'bg-command-500/10 border-command-500/30 text-command-400'
                  }`}>
                    {edu.icon}
                  </div>
                  <div>
                    <h3 className="font-display text-base md:text-lg text-base-100 tracking-wide">
                      {edu.institution}
                    </h3>
                    <p className="font-mono text-sm text-tactical-500 mt-0.5">
                      {edu.degree}
                    </p>
                    {edu.field && (
                      <p className="font-body text-xs text-base-500 mt-0.5">
                        {edu.field}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5">
                  <GlowBadge variant={edu.color} size="sm">
                    {edu.period}
                  </GlowBadge>
                  <GlowBadge
                    variant={edu.status.includes('%') ? 'command' : 'tactical'}
                    size="sm"
                    dot
                  >
                    {edu.status}
                  </GlowBadge>
                </div>
              </div>

              {/* Location */}
              <div className="font-tactical text-[10px] text-base-500 tracking-wider mb-3">
                📍 {edu.location}
              </div>

              {/* Details */}
              <div className="space-y-1.5">
                {edu.details.map((detail, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-tactical-600 mt-1 flex-shrink-0 text-xs">▸</span>
                    <span className="font-body text-sm text-base-400">{detail}</span>
                  </div>
                ))}
              </div>
            </TacticalCard>
          </TimelineItem>
        ))}
      </Timeline>
    </SectionWrapper>
  );
}