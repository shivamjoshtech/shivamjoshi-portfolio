'use client';

import { useEffect, useState } from 'react';
import { BarChart3, RefreshCw, Eye, Download, MessageSquare, Users, Trash2 } from 'lucide-react';

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({ page_views: 0, resume_downloads: 0, avatar_chats: 0, project_clicks: 0 });

  useEffect(() => { loadAnalytics(); }, []);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const { supabase } = await import('@/lib/supabase');
      const { data } = await supabase
        .from('analytics')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      const events = data || [];
      setAnalytics(events);
      setSummary({
        page_views: events.filter(e => e.event_type === 'page_view').length,
        resume_downloads: events.filter(e => e.event_type === 'resume_download').length,
        avatar_chats: events.filter(e => e.event_type === 'avatar_chat').length,
        project_clicks: events.filter(e => e.event_type === 'project_click').length,
      });
    } catch (e) {
      console.log('Analytics load error');
    } finally {
      setLoading(false);
    }
  };

  const resetByType = async (eventType: string, label: string) => {
    if (!confirm(`Reset all ${label}? This will delete these events permanently.`)) return;

    try {
      const { supabase } = await import('@/lib/supabase');
      await supabase.from('analytics').delete().eq('event_type', eventType);
      await loadAnalytics();
    } catch (e) {
      alert('Reset failed');
    }
  };

  const resetAllAnalytics = async () => {
    if (!confirm('Reset ALL analytics? Every event will be deleted permanently!')) return;
    if (!confirm('Are you REALLY sure? This cannot be undone!')) return;

    try {
      const { supabase } = await import('@/lib/supabase');
      await supabase.from('analytics').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await loadAnalytics();
    } catch (e) {
      alert('Reset failed');
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      const { supabase } = await import('@/lib/supabase');
      await supabase.from('analytics').delete().eq('id', id);
      await loadAnalytics();
    } catch (e) {
      console.log('Delete error');
    }
  };

  const statCards = [
    { label: 'PAGE VIEWS', value: summary.page_views, icon: <Eye size={18} />, color: 'text-tactical-400 bg-tactical-600/10 border-tactical-600/30', type: 'page_view' },
    { label: 'RESUME DOWNLOADS', value: summary.resume_downloads, icon: <Download size={18} />, color: 'text-command-400 bg-command-500/10 border-command-500/30', type: 'resume_download' },
    { label: 'AVATAR CHATS', value: summary.avatar_chats, icon: <MessageSquare size={18} />, color: 'text-hud-400 bg-hud-700/10 border-hud-700/30', type: 'avatar_chat' },
    { label: 'PROJECT CLICKS', value: summary.project_clicks, icon: <Users size={18} />, color: 'text-tactical-400 bg-tactical-600/10 border-tactical-600/30', type: 'project_click' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl text-base-100 tracking-[0.15em]">ANALYTICS</h1>
          <p className="font-tactical text-[10px] text-base-500 tracking-widest mt-1">
            SYSTEM TELEMETRY — {analytics.length} EVENTS
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={resetAllAnalytics}
            className="flex items-center gap-2 px-3 py-2 bg-red-900/10 text-alert-400 border border-red-800/30 rounded-sm hover:bg-red-900/20 transition-all font-tactical text-[10px] tracking-wider"
          >
            <Trash2 size={12} />
            RESET ALL
          </button>
          <button onClick={loadAnalytics} className="p-2 text-base-500 hover:text-tactical-400 transition-colors">
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Stat Cards with individual reset */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => (
          <div key={stat.label} className={`p-4 rounded-sm border ${stat.color}`}>
            <div className="flex items-center justify-between mb-2">
              {stat.icon}
              <button
                onClick={() => resetByType(stat.type, stat.label.toLowerCase())}
                className="p-1 text-base-600 hover:text-alert-400 transition-colors"
                title={`Reset ${stat.label.toLowerCase()}`}
              >
                <Trash2 size={10} />
              </button>
            </div>
            <div className="font-display text-2xl font-bold">
              {loading ? '—' : stat.value}
            </div>
            <div className="font-tactical text-[7px] tracking-widest mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Event Log */}
      <div className="bg-base-800/40 border border-base-700/50 rounded-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-base-700/40 flex items-center justify-between">
          <span className="font-display text-sm text-base-100 tracking-wider">EVENT LOG</span>
          {analytics.length > 0 && (
            <button
              onClick={resetAllAnalytics}
              className="flex items-center gap-1 px-2 py-1 text-[9px] font-tactical tracking-wider text-alert-500 hover:bg-red-900/20 rounded-sm transition-colors"
            >
              <Trash2 size={10} /> CLEAR LOG
            </button>
          )}
        </div>

        {loading ? (
          <div className="font-mono text-xs text-base-600 py-12 text-center">Loading...</div>
        ) : analytics.length === 0 ? (
          <div className="py-12 text-center">
            <BarChart3 size={32} className="text-base-700 mx-auto mb-3" />
            <p className="font-mono text-sm text-base-500">No analytics events</p>
            <p className="font-mono text-xs text-base-600 mt-1">Events are tracked automatically as visitors interact</p>
          </div>
        ) : (
          <div className="max-h-[500px] overflow-y-auto">
            {analytics.map((event) => (
              <div key={event.id} className="flex items-center gap-4 px-4 py-2.5 border-b border-base-700/20 hover:bg-base-800/30 transition-colors group">
                <span className={`px-1.5 py-0.5 text-[8px] font-tactical tracking-wider rounded-sm border flex-shrink-0 ${
                  event.event_type === 'page_view' ? 'bg-tactical-600/10 border-tactical-600/30 text-tactical-400'
                  : event.event_type === 'resume_download' ? 'bg-command-500/10 border-command-500/30 text-command-400'
                  : event.event_type === 'project_click' ? 'bg-hud-700/10 border-hud-700/30 text-hud-400'
                  : 'bg-base-800 border-base-700 text-base-500'
                }`}>
                  {event.event_type?.toUpperCase().replace(/_/g, ' ')}
                </span>
                <span className="font-mono text-[11px] text-base-400 flex-1 truncate">{event.page || '—'}</span>
                <span className="font-mono text-[10px] text-base-600 flex-shrink-0">
                  {new Date(event.created_at).toLocaleDateString()} {new Date(event.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <button
                  onClick={() => deleteEvent(event.id)}
                  className="p-1 text-base-700 opacity-0 group-hover:opacity-100 hover:text-alert-400 transition-all flex-shrink-0"
                  title="Delete this event"
                >
                  <Trash2 size={11} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}