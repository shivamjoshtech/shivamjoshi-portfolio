'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Download,
  Video,
  Trash2,
  Plus,
} from 'lucide-react';

interface MeetingLink {
  id: string;
  platform: string;
  url: string;
  label: string;
}

export default function AdminSettings() {
  const [resumeUrl, setResumeUrl] = useState('');
  const [meetingLinks, setMeetingLinks] = useState<MeetingLink[]>([]);
  const [newLink, setNewLink] = useState({ platform: 'Google Meet', url: '', label: '' });
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  const showStatus = (type: 'success' | 'error', msg: string) => {
    setStatus(type);
    setStatusMessage(msg);
    setTimeout(() => setStatus('idle'), 4000);
  };

  const loadSettings = async () => {
    try {
      const { supabase } = await import('@/lib/supabase');
      const { data } = await supabase.from('site_settings').select('*');

      if (data) {
        const resume = data.find((s: any) => s.key === 'resume_url');
        const meetings = data.find((s: any) => s.key === 'meeting_links');
        if (resume) setResumeUrl(resume.value);
        if (meetings) {
          try {
            setMeetingLinks(JSON.parse(meetings.value));
          } catch {
            setMeetingLinks([]);
          }
        }
      }
    } catch (e) {
      console.log('Settings load error');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      showStatus('error', 'Only PDF files allowed');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showStatus('error', 'File too large (max 5MB)');
      return;
    }

    setUploading(true);
    try {
      const { supabase } = await import('@/lib/supabase');

      const fileName = `resume.pdf`;

      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: 'application/pdf',
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      const { data: urlData } = supabase.storage
        .from('resumes')
        .getPublicUrl(fileName);

      const publicUrl = `${urlData.publicUrl}?t=${Date.now()}`;
      setResumeUrl(publicUrl);

      await saveSetting('resume_url', publicUrl);

      showStatus('success', 'Resume uploaded successfully!');
    } catch (e: any) {
      console.error('Full error:', e);
      showStatus('error', `Upload failed: ${e.message || 'Check Supabase setup'}`);
    } finally {
      setUploading(false);
    }
  };

  const saveSetting = async (key: string, value: string) => {
    const { supabase } = await import('@/lib/supabase');

    const { data: existing } = await supabase
      .from('site_settings')
      .select('id')
      .eq('key', key)
      .maybeSingle();

    if (existing) {
      const { error } = await supabase
        .from('site_settings')
        .update({ value, updated_at: new Date().toISOString() })
        .eq('key', key);
      if (error) throw error;
    } else {
      const { error } = await supabase.from('site_settings').insert({ key, value });
      if (error) throw error;
    }
  };

  const handleAddMeetingLink = async () => {
    if (!newLink.url || !newLink.platform) {
      showStatus('error', 'Fill platform and URL');
      return;
    }

    const link: MeetingLink = {
      id: `link-${Date.now()}`,
      platform: newLink.platform,
      url: newLink.url,
      label: newLink.label || newLink.platform,
    };

    const updated = [...meetingLinks, link];
    setMeetingLinks(updated);

    try {
      await saveSetting('meeting_links', JSON.stringify(updated));
      setNewLink({ platform: 'Google Meet', url: '', label: '' });
      showStatus('success', 'Meeting link added');
    } catch (e) {
      showStatus('error', 'Failed to save');
    }
  };

  const handleDeleteMeetingLink = async (id: string) => {
    const updated = meetingLinks.filter((l) => l.id !== id);
    setMeetingLinks(updated);

    try {
      await saveSetting('meeting_links', JSON.stringify(updated));
      showStatus('success', 'Link deleted');
    } catch (e) {
      showStatus('error', 'Failed to delete');
    }
  };

  const handleDeleteResume = async () => {
    if (!confirm('Delete resume?')) return;

    try {
      const { supabase } = await import('@/lib/supabase');
      await supabase.storage.from('resumes').remove(['resume.pdf']);
      await saveSetting('resume_url', '');
      setResumeUrl('');
      showStatus('success', 'Resume deleted');
    } catch (e) {
      showStatus('error', 'Delete failed');
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl text-base-100 tracking-[0.15em]">SETTINGS</h1>
        <p className="font-tactical text-[10px] text-base-500 tracking-widest mt-1">
          SITE CONFIGURATION — RESUME, MEETING LINKS
        </p>
      </div>

      {status !== 'idle' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 p-3 rounded-sm border flex items-center gap-2 ${
            status === 'success'
              ? 'bg-tactical-600/10 border-tactical-600/30 text-tactical-400'
              : 'bg-red-900/20 border-red-800/30 text-alert-400'
          }`}
        >
          {status === 'success' ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
          <span className="font-mono text-xs">{statusMessage}</span>
        </motion.div>
      )}

      {/* Resume Upload */}
      <div className="bg-base-800/60 border border-base-700/50 rounded-sm p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText size={16} className="text-command-400" />
          <h2 className="font-display text-sm text-base-100 tracking-wider">RESUME UPLOAD</h2>
        </div>

        <p className="font-body text-xs text-base-400 mb-5">
          Upload PDF. Max 5MB. Updates &quot;Download Resume&quot; button on portfolio.
        </p>

        {resumeUrl && (
          <div className="mb-4 p-3 bg-base-900/40 border border-tactical-600/30 rounded-sm flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <CheckCircle size={14} className="text-tactical-500 flex-shrink-0" />
              <span className="font-mono text-xs text-tactical-400">Resume uploaded</span>
            </div>
            <div className="flex gap-2">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-1 bg-tactical-600/10 border border-tactical-600/30 text-tactical-400 text-[10px] font-tactical tracking-wider rounded-sm hover:bg-tactical-600/20"
              >
                <Download size={10} /> VIEW
              </a>
              <button
                onClick={handleDeleteResume}
                className="flex items-center gap-1 px-3 py-1 bg-red-900/10 border border-red-800/30 text-alert-400 text-[10px] font-tactical tracking-wider rounded-sm hover:bg-red-900/20"
              >
                <Trash2 size={10} /> DELETE
              </button>
            </div>
          </div>
        )}

        <label className="block">
          <input
            type="file"
            accept="application/pdf,.pdf"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
          />
          <div className={`flex items-center justify-center gap-2 px-6 py-4 border-2 border-dashed rounded-sm cursor-pointer transition-all ${
            uploading
              ? 'border-command-500/50 bg-command-500/5'
              : 'border-base-700/60 hover:border-command-500/50 hover:bg-command-500/5'
          }`}>
            <Upload size={16} className={uploading ? 'text-command-400 animate-pulse' : 'text-command-500'} />
            <span className="font-display text-xs tracking-wider text-command-400">
              {uploading ? 'UPLOADING...' : resumeUrl ? 'REPLACE PDF' : 'CHOOSE PDF FILE'}
            </span>
          </div>
        </label>
      </div>

      {/* Meeting Links */}
      <div className="bg-base-800/60 border border-base-700/50 rounded-sm p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Video size={16} className="text-hud-400" />
          <h2 className="font-display text-sm text-base-100 tracking-wider">MEETING LINKS</h2>
        </div>
        <p className="font-body text-xs text-base-400 mb-4">
          Add Google Meet, MS Teams, Webex, Zoom links. They show on Contact section.
        </p>

        {meetingLinks.length > 0 && (
          <div className="space-y-2 mb-5">
            {meetingLinks.map((link) => (
              <div key={link.id} className="flex items-center gap-3 p-3 bg-base-900/40 border border-base-700/30 rounded-sm">
                <Video size={14} className="text-hud-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-xs text-base-200">{link.platform}</div>
                  <div className="font-mono text-[10px] text-base-500 truncate">{link.url}</div>
                </div>
                <button
                  onClick={() => handleDeleteMeetingLink(link.id)}
                  className="p-1.5 text-base-500 hover:text-alert-400 transition-colors"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-3 pt-4 border-t border-base-700/30">
          <div className="font-tactical text-[9px] text-hud-600 tracking-widest">
            ADD NEW LINK
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <select
              value={newLink.platform}
              onChange={(e) => setNewLink({ ...newLink, platform: e.target.value })}
              className="bg-base-900/60 border border-base-700/50 rounded-sm px-3 py-2 font-mono text-xs text-base-200 focus:outline-none focus:border-hud-500/50 appearance-none"
            >
              <option value="Google Meet" className="bg-base-900">Google Meet</option>
              <option value="MS Teams" className="bg-base-900">MS Teams</option>
              <option value="Webex" className="bg-base-900">Webex</option>
              <option value="Zoom" className="bg-base-900">Zoom</option>
              <option value="Other" className="bg-base-900">Other</option>
            </select>
            <input
              type="text"
              value={newLink.label}
              onChange={(e) => setNewLink({ ...newLink, label: e.target.value })}
              placeholder="Label (optional)"
              className="bg-base-900/60 border border-base-700/50 rounded-sm px-3 py-2 font-mono text-xs text-base-200 placeholder:text-base-600 focus:outline-none focus:border-hud-500/50"
            />
          </div>
          <input
            type="text"
            value={newLink.url}
            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
            placeholder="https://meet.google.com/xxx-xxx-xxx"
            className="w-full bg-base-900/60 border border-base-700/50 rounded-sm px-3 py-2 font-mono text-xs text-base-200 placeholder:text-base-600 focus:outline-none focus:border-hud-500/50"
          />
          <button
            onClick={handleAddMeetingLink}
            disabled={!newLink.url}
            className="flex items-center gap-2 px-4 py-2 bg-hud-700/10 text-hud-400 border border-hud-700/40 rounded-sm hover:bg-hud-700/20 transition-all font-tactical text-[10px] tracking-wider disabled:opacity-40"
          >
            <Plus size={12} />
            ADD LINK
          </button>
        </div>
      </div>

      {/* Setup Instructions */}
      <div className="mt-8 p-5 bg-base-900/40 border border-base-700/30 rounded-sm">
        <div className="font-tactical text-[9px] text-command-600 tracking-widest mb-3">
          IMPORTANT — SUPABASE STORAGE SETUP
        </div>
        <p className="font-body text-xs text-base-400 mb-3">
          Pehle yeh setup karna hai (one-time):
        </p>
        <ol className="font-body text-xs text-base-400 space-y-1.5 list-decimal list-inside ml-2">
          <li>Supabase dashboard → <span className="text-tactical-400">Storage</span></li>
          <li>Click <span className="text-tactical-400">&quot;New bucket&quot;</span></li>
          <li>Name: <code className="bg-base-800 px-1.5 py-0.5 rounded text-tactical-400">resumes</code></li>
          <li>Toggle <span className="text-tactical-400">&quot;Public bucket&quot;</span> ON</li>
          <li>Click <span className="text-tactical-400">Create</span></li>
          <li>Then run <code className="bg-base-800 px-1.5 py-0.5 rounded text-tactical-400">fix-storage-policies.sql</code> in SQL Editor</li>
        </ol>
      </div>
    </div>
  );
}