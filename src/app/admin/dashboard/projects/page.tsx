'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Star,
  FolderGit2,
  ExternalLink,
  Github,
} from 'lucide-react';

interface ProjectForm {
  title: string;
  slug: string;
  description: string;
  long_description: string;
  category: string;
  tech_stack: string;
  github_url: string;
  live_url: string;
  video_url: string;
  featured: boolean;
}

const EMPTY_FORM: ProjectForm = {
  title: '',
  slug: '',
  description: '',
  long_description: '',
  category: 'major',
  tech_stack: '',
  github_url: '',
  live_url: '',
  video_url: '',
  featured: false,
};

export default function AdminProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProjectForm>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const { supabase } = await import('@/lib/supabase');
      const { data } = await supabase
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true });
      setProjects(data || []);
    } catch (e) {
      console.log('Projects load error');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { supabase } = await import('@/lib/supabase');
      const techArray = form.tech_stack.split(',').map(t => t.trim()).filter(Boolean);
      const projectData = {
        title: form.title,
        slug: form.slug || form.title.toLowerCase().replace(/\s+/g, '-'),
        description: form.description,
        long_description: form.long_description,
        category: form.category,
        tech_stack: techArray.map(t => ({ name: t, icon: t.toLowerCase() })),
        github_url: form.github_url || null,
        live_url: form.live_url || null,
        video_url: form.video_url || null,
        featured: form.featured,
        status: 'published',
      };

      if (editingId) {
        await supabase.from('projects').update(projectData).eq('id', editingId);
      } else {
        await supabase.from('projects').insert(projectData);
      }

      setShowForm(false);
      setEditingId(null);
      setForm(EMPTY_FORM);
      await loadProjects();
    } catch (e) {
      console.log('Save error:', e);
      alert('Error saving — check Supabase configuration');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (project: any) => {
    setForm({
      title: project.title,
      slug: project.slug,
      description: project.description,
      long_description: project.long_description || '',
      category: project.category,
      tech_stack: (project.tech_stack || []).map((t: any) => t.name).join(', '),
      github_url: project.github_url || '',
      live_url: project.live_url || '',
      video_url: project.video_url || '',
      featured: project.featured,
    });
    setEditingId(project.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure? This cannot be undone.')) return;
    try {
      const { supabase } = await import('@/lib/supabase');
      await supabase.from('projects').delete().eq('id', id);
      await loadProjects();
    } catch (e) {
      console.log('Delete error');
    }
  };

  const CATEGORIES = [
    { value: 'major', label: 'Major Project' },
    { value: 'mini', label: 'Mini Project' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'invented', label: 'Self-Invented' },
    { value: 'client_demand', label: 'Client Demand' },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl text-base-100 tracking-[0.15em]">PROJECTS</h1>
          <p className="font-tactical text-[10px] text-base-500 tracking-widest mt-1">
            MANAGE MISSION FILES — ADD, EDIT, DELETE
          </p>
        </div>
        <button
          onClick={() => { setForm(EMPTY_FORM); setEditingId(null); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-tactical-600/10 text-tactical-400 border border-tactical-600/40 rounded-sm hover:bg-tactical-600/20 transition-all font-display text-xs tracking-wider"
        >
          <Plus size={14} />
          ADD PROJECT
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-base-800/80 border border-base-700/50 rounded-sm p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-sm text-base-100 tracking-wider">
              {editingId ? 'EDIT PROJECT' : 'ADD NEW PROJECT'}
            </h2>
            <button onClick={() => { setShowForm(false); setEditingId(null); }} className="text-base-500 hover:text-base-300">
              <X size={16} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <InputField label="TITLE *" name="title" value={form.title} onChange={(v) => setForm(f => ({ ...f, title: v }))} />
            <InputField label="SLUG" name="slug" value={form.slug} onChange={(v) => setForm(f => ({ ...f, slug: v }))} placeholder="auto-generated" />
            <div className="md:col-span-2">
              <InputField label="SHORT DESCRIPTION *" name="description" value={form.description} onChange={(v) => setForm(f => ({ ...f, description: v }))} />
            </div>
            <div className="md:col-span-2">
              <label className="font-tactical text-[9px] text-base-500 tracking-widest block mb-1.5">LONG DESCRIPTION</label>
              <textarea
                value={form.long_description}
                onChange={(e) => setForm(f => ({ ...f, long_description: e.target.value }))}
                rows={3}
                className="w-full bg-base-900/60 border border-base-700/50 rounded-sm px-3 py-2 font-mono text-xs text-base-200 focus:outline-none focus:border-tactical-600/50 resize-none"
              />
            </div>
            <div>
              <label className="font-tactical text-[9px] text-base-500 tracking-widest block mb-1.5">CATEGORY *</label>
              <select
                value={form.category}
                onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))}
                className="w-full bg-base-900/60 border border-base-700/50 rounded-sm px-3 py-2 font-mono text-xs text-base-200 focus:outline-none appearance-none"
              >
                {CATEGORIES.map(c => <option key={c.value} value={c.value} className="bg-base-900">{c.label}</option>)}
              </select>
            </div>
            <InputField label="TECH STACK (comma separated)" name="tech" value={form.tech_stack} onChange={(v) => setForm(f => ({ ...f, tech_stack: v }))} placeholder="Python, Flask, React" />
            <InputField label="GITHUB URL" name="github" value={form.github_url} onChange={(v) => setForm(f => ({ ...f, github_url: v }))} placeholder="https://github.com/..." />
            <InputField label="LIVE URL" name="live" value={form.live_url} onChange={(v) => setForm(f => ({ ...f, live_url: v }))} placeholder="https://..." />
            <InputField label="VIDEO URL" name="video" value={form.video_url} onChange={(v) => setForm(f => ({ ...f, video_url: v }))} placeholder="YouTube/Loom URL" />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm(f => ({ ...f, featured: e.target.checked }))}
                className="w-4 h-4 accent-command-500"
              />
              <label className="font-tactical text-[10px] text-base-400 tracking-wider">FEATURED PROJECT</label>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-5">
            <button
              onClick={() => { setShowForm(false); setEditingId(null); }}
              className="px-4 py-2 font-tactical text-[10px] tracking-wider text-base-500 hover:text-base-300 border border-base-700/50 rounded-sm"
            >
              CANCEL
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !form.title || !form.description}
              className="flex items-center gap-2 px-4 py-2 bg-tactical-600/10 text-tactical-400 border border-tactical-600/40 rounded-sm hover:bg-tactical-600/20 transition-all font-tactical text-[10px] tracking-wider disabled:opacity-40"
            >
              <Save size={12} />
              {saving ? 'SAVING...' : editingId ? 'UPDATE' : 'SAVE'}
            </button>
          </div>
        </motion.div>
      )}

      {/* Projects List */}
      {loading ? (
        <div className="font-mono text-xs text-base-600 py-12 text-center">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="bg-base-800/40 border border-dashed border-base-700/40 rounded-sm p-12 text-center">
          <FolderGit2 size={32} className="text-base-700 mx-auto mb-3" />
          <p className="font-mono text-sm text-base-500">No projects in database yet</p>
          <p className="font-mono text-xs text-base-600 mt-1">Click &quot;ADD PROJECT&quot; to create one, or projects from code will show on portfolio</p>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between p-4 bg-base-800/60 border border-base-700/50 rounded-sm hover:border-base-600/60 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className={`px-2 py-0.5 text-[8px] font-tactical tracking-wider rounded-sm border ${
                  project.category === 'major' ? 'bg-tactical-600/10 border-tactical-600/30 text-tactical-400'
                  : project.category === 'mini' ? 'bg-hud-700/10 border-hud-700/30 text-hud-400'
                  : 'bg-command-500/10 border-command-500/30 text-command-400'
                }`}>
                  {project.category?.toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-sm text-base-200 flex items-center gap-2">
                    {project.title}
                    {project.featured && <Star size={12} className="text-command-400 fill-command-400" />}
                  </div>
                  <div className="font-body text-[11px] text-base-500 truncate">{project.description}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-4">
                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-base-600 hover:text-base-400">
                    <Github size={14} />
                  </a>
                )}
                <button onClick={() => handleEdit(project)} className="p-2 text-base-500 hover:text-hud-400 transition-colors">
                  <Edit size={14} />
                </button>
                <button onClick={() => handleDelete(project.id)} className="p-2 text-base-500 hover:text-alert-400 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function InputField({ label, name, value, onChange, placeholder }: {
  label: string; name: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <div>
      <label className="font-tactical text-[9px] text-base-500 tracking-widest block mb-1.5">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-base-900/60 border border-base-700/50 rounded-sm px-3 py-2 font-mono text-xs text-base-200 placeholder:text-base-600 focus:outline-none focus:border-tactical-600/50"
      />
    </div>
  );
}