'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionHeader from '@/components/ui/SectionHeader';
import TacticalCard from '@/components/ui/TacticalCard';
import TacticalButton from '@/components/ui/TacticalButton';
import {
  Mail,
  Github,
  Linkedin,
  Download,
  Video,
  Send,
  CheckCircle,
  AlertCircle,
  MapPin,
  Clock,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface MeetingLink {
  id: string;
  platform: string;
  url: string;
  label: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [resumeUrl, setResumeUrl] = useState('');
  const [meetingLinks, setMeetingLinks] = useState<MeetingLink[]>([]);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { supabase } = await import('@/lib/supabase');
      const { data } = await supabase.from('site_settings').select('*');
      if (data) {
        const resume = data.find((s: any) => s.key === 'resume_url');
        const meetings = data.find((s: any) => s.key === 'meeting_links');
        if (resume?.value) setResumeUrl(resume.value);
        if (meetings?.value) {
          try { setMeetingLinks(JSON.parse(meetings.value)); } catch { setMeetingLinks([]); }
        }
      }
    } catch (e) { console.log('Settings load skipped'); }
  };

  // Track resume download in analytics
  const trackResumeDownload = async () => {
    try {
      const { supabase } = await import('@/lib/supabase');
      await supabase.from('analytics').insert({
        event_type: 'resume_download',
        page: '/contact',
        metadata: { source: 'contact_section' },
      });
    } catch {}
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);
    try {
      const { supabase } = await import('@/lib/supabase');
      const { error } = await supabase.from('contact_requests').insert({
        name: formData.name, email: formData.email,
        subject: formData.subject || 'No Subject',
        message: formData.message, status: 'unread',
      });
      if (error) throw error;
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (e) {
      const mailtoLink = `mailto:joshishivam586@gmail.com?subject=${encodeURIComponent(formData.subject || 'Portfolio Contact')}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
      window.open(mailtoLink, '_blank');
      setSubmitStatus('success');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally { setIsSubmitting(false); }
  };

  return (
    <SectionWrapper id="contact">
      <SectionHeader sectionId="contact" title="COMMS CHANNEL" subtitle="Open communication channel — ready to connect." />

      <div className="grid lg:grid-cols-5 gap-6" ref={ref}>
        {/* Form */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }} className="lg:col-span-3">
          <TacticalCard className="p-6 md:p-8" glowColor="tactical" hover={false}>
            <div className="flex items-center gap-2 mb-6 pb-3 border-b border-base-700/40">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-alert-500/60" />
                <div className="w-2 h-2 rounded-full bg-command-500/60" />
                <div className="w-2 h-2 rounded-full bg-tactical-500/60" />
              </div>
              <span className="font-tactical text-[9px] text-base-500 tracking-wider ml-2">SEND_MESSAGE.exe</span>
            </div>

            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-tactical text-[9px] text-base-500 tracking-widest block mb-1.5">NAME *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" className="w-full bg-base-900/60 border border-base-700/50 rounded-sm px-3 py-2.5 font-mono text-sm text-base-200 placeholder:text-base-600 focus:outline-none focus:border-tactical-600/50" />
                </div>
                <div>
                  <label className="font-tactical text-[9px] text-base-500 tracking-widest block mb-1.5">EMAIL *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" className="w-full bg-base-900/60 border border-base-700/50 rounded-sm px-3 py-2.5 font-mono text-sm text-base-200 placeholder:text-base-600 focus:outline-none focus:border-tactical-600/50" />
                </div>
              </div>
              <div>
                <label className="font-tactical text-[9px] text-base-500 tracking-widest block mb-1.5">SUBJECT</label>
                <select name="subject" value={formData.subject} onChange={handleChange} className="w-full bg-base-900/60 border border-base-700/50 rounded-sm px-3 py-2.5 font-mono text-sm text-base-200 focus:outline-none focus:border-tactical-600/50 appearance-none cursor-pointer">
                  <option value="" className="bg-base-900">Select a topic...</option>
                  <option value="Hiring / Job Opportunity" className="bg-base-900">💼 Hiring / Job Opportunity</option>
                  <option value="Freelance Project" className="bg-base-900">🤝 Freelance Project</option>
                  <option value="Collaboration" className="bg-base-900">🔬 Collaboration</option>
                  <option value="Technical Question" className="bg-base-900">❓ Technical Question</option>
                  <option value="Other" className="bg-base-900">📝 Other</option>
                </select>
              </div>
              <div>
                <label className="font-tactical text-[9px] text-base-500 tracking-widest block mb-1.5">MESSAGE *</label>
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Write your message here..." rows={4} className="w-full bg-base-900/60 border border-base-700/50 rounded-sm px-3 py-2.5 font-mono text-sm text-base-200 placeholder:text-base-600 focus:outline-none focus:border-tactical-600/50 resize-none" />
              </div>

              <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
                <TacticalButton variant="tactical" size="md" onClick={handleSubmit}
                  disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                  icon={isSubmitting ? <Clock size={14} className="animate-spin" /> : <Send size={14} />}
                >
                  {isSubmitting ? 'TRANSMITTING...' : 'SEND MESSAGE'}
                </TacticalButton>
                {submitStatus === 'success' && (
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-1.5">
                    <CheckCircle size={14} className="text-tactical-500" />
                    <span className="font-mono text-xs text-tactical-400">Message sent!</span>
                  </motion.div>
                )}
              </div>
            </div>
          </TacticalCard>
        </motion.div>

        {/* Right side */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }} className="lg:col-span-2 space-y-5">

          {/* Direct Channels */}
          <TacticalCard className="p-5" glowColor="tactical" hover={false}>
            <div className="font-tactical text-[9px] text-tactical-600 tracking-widest mb-4">DIRECT CHANNELS</div>
            <div className="space-y-3">
              <a href="mailto:joshishivam586@gmail.com" className="flex items-center gap-3 p-2.5 bg-base-900/40 border border-base-700/30 rounded-sm hover:border-tactical-600/30 hover:bg-tactical-600/5 transition-all group">
                <Mail size={16} className="text-tactical-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-tactical text-[8px] text-base-500 tracking-wider">EMAIL</div>
                  <div className="font-mono text-xs text-base-300 group-hover:text-tactical-400 truncate">joshishivam586@gmail.com</div>
                </div>
                <ExternalLink size={12} className="text-base-600 group-hover:text-tactical-500 flex-shrink-0" />
              </a>
              <a href="https://wa.me/917668624575" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2.5 bg-base-900/40 border border-base-700/30 rounded-sm hover:border-tactical-600/30 hover:bg-tactical-600/5 transition-all group">
                <MessageCircle size={16} className="text-tactical-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-tactical text-[8px] text-base-500 tracking-wider">WHATSAPP</div>
                  <div className="font-mono text-xs text-base-300 group-hover:text-tactical-400">+91 7668624575</div>
                </div>
                <ExternalLink size={12} className="text-base-600 group-hover:text-tactical-500 flex-shrink-0" />
              </a>
              <a href="https://www.linkedin.com/in/shivam-joshi-499335246/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2.5 bg-base-900/40 border border-base-700/30 rounded-sm hover:border-hud-700/30 hover:bg-hud-700/5 transition-all group">
                <Linkedin size={16} className="text-hud-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-tactical text-[8px] text-base-500 tracking-wider">LINKEDIN</div>
                  <div className="font-mono text-xs text-base-300 group-hover:text-hud-400">Shivam Joshi</div>
                </div>
                <ExternalLink size={12} className="text-base-600 group-hover:text-hud-500 flex-shrink-0" />
              </a>
              <a href="https://github.com/shivamjoshtech" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2.5 bg-base-900/40 border border-base-700/30 rounded-sm hover:border-base-600/50 hover:bg-base-800/50 transition-all group">
                <Github size={16} className="text-base-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-tactical text-[8px] text-base-500 tracking-wider">GITHUB</div>
                  <div className="font-mono text-xs text-base-300 group-hover:text-base-100">shivamjoshtech</div>
                </div>
                <ExternalLink size={12} className="text-base-600 group-hover:text-base-400 flex-shrink-0" />
              </a>
            </div>
          </TacticalCard>

          {/* Resume */}
          <TacticalCard className="p-5" glowColor="command" hover={false}>
            <div className="font-tactical text-[9px] text-command-600 tracking-widest mb-3">RESUME</div>
            <p className="font-body text-xs text-base-400 mb-4">Download complete resume with experience, skills, and achievements.</p>
            {resumeUrl ? (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackResumeDownload}
                className="flex items-center justify-center gap-2 w-full px-6 py-3 font-display text-xs uppercase tracking-[0.15em] bg-command-500/10 text-command-400 border border-command-500/40 hover:bg-command-500/20 hover:border-command-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-all duration-300 rounded-sm"
              >
                <Download size={14} /> Download Resume (PDF)
              </a>
            ) : (
              <div className="text-center py-3 font-mono text-xs text-base-600">
                Resume Coming Soon — Upload via Admin Panel
              </div>
            )}
          </TacticalCard>

          {/* Meeting Links */}
          {meetingLinks.length > 0 && (
            <TacticalCard className="p-5" glowColor="hud" hover={false}>
              <div className="font-tactical text-[9px] text-hud-600 tracking-widest mb-3">SCHEDULE A MEETING</div>
              <div className="space-y-2">
                {meetingLinks.map((link) => (
                  <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2.5 bg-base-900/40 border border-base-700/30 rounded-sm hover:border-hud-700/30 hover:bg-hud-700/5 transition-all group">
                    <Video size={16} className="text-hud-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-tactical text-[8px] text-base-500 tracking-wider">{link.platform.toUpperCase()}</div>
                      <div className="font-mono text-xs text-base-300 group-hover:text-hud-400">{link.label || link.platform}</div>
                    </div>
                    <ExternalLink size={12} className="text-base-600 group-hover:text-hud-500 flex-shrink-0" />
                  </a>
                ))}
              </div>
            </TacticalCard>
          )}

          <div className="flex items-center gap-2 px-2">
            <MapPin size={12} className="text-base-600" />
            <span className="font-tactical text-[9px] text-base-600 tracking-wider">HALDWANI, UTTARAKHAND, INDIA</span>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}