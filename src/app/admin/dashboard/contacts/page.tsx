'use client';

import { useEffect, useState } from 'react';
import { MessageSquare, RefreshCw, CheckCircle, Archive, Mail, Trash2 } from 'lucide-react';

export default function AdminContacts() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadContacts(); }, []);

  const loadContacts = async () => {
    setLoading(true);
    try {
      const { supabase } = await import('@/lib/supabase');
      const { data } = await supabase
        .from('contact_requests')
        .select('*')
        .order('created_at', { ascending: false });
      setContacts(data || []);
    } catch (e) {
      console.log('Contacts load error');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const { supabase } = await import('@/lib/supabase');
      await supabase.from('contact_requests').update({ status }).eq('id', id);
      await loadContacts();
    } catch (e) {
      console.log('Update error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message? This cannot be undone.')) return;

    try {
      const { supabase } = await import('@/lib/supabase');
      await supabase.from('contact_requests').delete().eq('id', id);
      await loadContacts();
    } catch (e) {
      alert('Delete failed');
    }
  };

  const handleDeleteAll = async () => {
    if (!confirm(`Delete ALL ${contacts.length} messages? Cannot undo!`)) return;
    if (!confirm('Are you REALLY sure?')) return;

    try {
      const { supabase } = await import('@/lib/supabase');
      await supabase.from('contact_requests').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await loadContacts();
    } catch (e) {
      console.log('Delete all error');
    }
  };

  const unreadCount = contacts.filter(c => c.status === 'unread').length;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl text-base-100 tracking-[0.15em]">CONTACTS</h1>
          <p className="font-tactical text-[10px] text-base-500 tracking-widest mt-1">
            INCOMING MESSAGES — {unreadCount} UNREAD / {contacts.length} TOTAL
          </p>
        </div>
        <div className="flex gap-2">
          {contacts.length > 0 && (
            <button
              onClick={handleDeleteAll}
              className="flex items-center gap-2 px-3 py-2 bg-red-900/10 text-alert-400 border border-red-800/30 rounded-sm hover:bg-red-900/20 transition-all font-tactical text-[10px] tracking-wider"
            >
              <Trash2 size={12} />
              DELETE ALL
            </button>
          )}
          <button onClick={loadContacts} className="p-2 text-base-500 hover:text-tactical-400 transition-colors">
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="font-mono text-xs text-base-600 py-12 text-center">Loading...</div>
      ) : contacts.length === 0 ? (
        <div className="bg-base-800/40 border border-dashed border-base-700/40 rounded-sm p-12 text-center">
          <MessageSquare size={32} className="text-base-700 mx-auto mb-3" />
          <p className="font-mono text-sm text-base-500">No contact requests yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {contacts.map((c) => (
            <div
              key={c.id}
              className={`p-5 rounded-sm border transition-colors ${
                c.status === 'unread'
                  ? 'bg-base-800/80 border-command-500/30'
                  : 'bg-base-800/40 border-base-700/40'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="font-mono text-sm text-base-100 flex items-center gap-2">
                    {c.name}
                    {c.status === 'unread' && (
                      <span className="w-2 h-2 bg-command-500 rounded-full" />
                    )}
                  </div>
                  <div className="font-mono text-[11px] text-base-500 mt-0.5">{c.email}</div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className={`px-1.5 py-0.5 text-[8px] font-tactical tracking-wider rounded-sm border ${
                    c.status === 'unread' ? 'bg-command-500/10 border-command-500/30 text-command-400'
                    : c.status === 'read' ? 'bg-tactical-600/10 border-tactical-600/30 text-tactical-400'
                    : c.status === 'replied' ? 'bg-hud-700/10 border-hud-700/30 text-hud-400'
                    : 'bg-base-800 border-base-700 text-base-500'
                  }`}>
                    {c.status?.toUpperCase()}
                  </span>
                </div>
              </div>

              {c.subject && (
                <div className="font-tactical text-[9px] text-base-500 tracking-wider mb-2">
                  SUBJECT: {c.subject}
                </div>
              )}

              <p className="font-body text-sm text-base-300 leading-relaxed mb-3 whitespace-pre-line">
                {c.message}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-base-700/30">
                <div className="font-mono text-[10px] text-base-600">
                  {new Date(c.created_at).toLocaleDateString()} at {new Date(c.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="flex gap-1.5">
                  {c.status === 'unread' && (
                    <button
                      onClick={() => updateStatus(c.id, 'read')}
                      className="flex items-center gap-1 px-2 py-1 text-[9px] font-tactical tracking-wider text-tactical-500 hover:bg-tactical-600/10 rounded-sm transition-colors"
                    >
                      <CheckCircle size={10} /> MARK READ
                    </button>
                  )}
                  <a
                    href={`mailto:${c.email}?subject=Re: ${c.subject || 'Portfolio Contact'}`}
                    className="flex items-center gap-1 px-2 py-1 text-[9px] font-tactical tracking-wider text-hud-500 hover:bg-hud-700/10 rounded-sm transition-colors"
                  >
                    <Mail size={10} /> REPLY
                  </a>
                  <button
                    onClick={() => updateStatus(c.id, 'archived')}
                    className="flex items-center gap-1 px-2 py-1 text-[9px] font-tactical tracking-wider text-base-500 hover:bg-base-700/30 rounded-sm transition-colors"
                  >
                    <Archive size={10} /> ARCHIVE
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="flex items-center gap-1 px-2 py-1 text-[9px] font-tactical tracking-wider text-alert-500 hover:bg-red-900/20 rounded-sm transition-colors"
                  >
                    <Trash2 size={10} /> DELETE
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}