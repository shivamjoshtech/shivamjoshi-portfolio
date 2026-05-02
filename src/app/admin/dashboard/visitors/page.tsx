'use client';

import { useEffect, useState } from 'react';
import { Users, RefreshCw, Search, Trash2 } from 'lucide-react';

export default function AdminVisitors() {
  const [visitors, setVisitors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => { loadVisitors(); }, []);

  const loadVisitors = async () => {
    setLoading(true);
    try {
      const { supabase } = await import('@/lib/supabase');
      const { data } = await supabase
        .from('visitors')
        .select('*')
        .order('created_at', { ascending: false });
      setVisitors(data || []);
    } catch (e) {
      console.log('Visitors load error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this visitor? This cannot be undone.')) return;

    try {
      const { supabase } = await import('@/lib/supabase');
      await supabase.from('visitors').delete().eq('id', id);
      await loadVisitors();
    } catch (e) {
      console.log('Delete error');
      alert('Delete failed');
    }
  };

  const handleDeleteAll = async () => {
    if (!confirm(`Delete ALL ${visitors.length} visitors? This cannot be undone!`)) return;
    if (!confirm('Are you REALLY sure? This will remove everything!')) return;

    try {
      const { supabase } = await import('@/lib/supabase');
      await supabase.from('visitors').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await loadVisitors();
    } catch (e) {
      console.log('Delete all error');
    }
  };

  const filtered = visitors.filter(v =>
    v.name?.toLowerCase().includes(search.toLowerCase()) ||
    v.purpose?.toLowerCase().includes(search.toLowerCase()) ||
    v.company?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl text-base-100 tracking-[0.15em]">VISITORS</h1>
          <p className="font-tactical text-[10px] text-base-500 tracking-widest mt-1">
            PEOPLE WHO INTERACTED WITH ARIA — {visitors.length} TOTAL
          </p>
        </div>
        <div className="flex gap-2">
          {visitors.length > 0 && (
            <button
              onClick={handleDeleteAll}
              className="flex items-center gap-2 px-3 py-2 bg-red-900/10 text-alert-400 border border-red-800/30 rounded-sm hover:bg-red-900/20 transition-all font-tactical text-[10px] tracking-wider"
            >
              <Trash2 size={12} />
              DELETE ALL
            </button>
          )}
          <button onClick={loadVisitors} className="p-2 text-base-500 hover:text-tactical-400 transition-colors">
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      <div className="relative mb-6">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-base-600" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, purpose, company..."
          className="w-full bg-base-800/60 border border-base-700/50 rounded-sm pl-9 pr-4 py-2.5 font-mono text-xs text-base-200 placeholder:text-base-600 focus:outline-none focus:border-tactical-600/50"
        />
      </div>

      {loading ? (
        <div className="font-mono text-xs text-base-600 py-12 text-center">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-base-800/40 border border-dashed border-base-700/40 rounded-sm p-12 text-center">
          <Users size={32} className="text-base-700 mx-auto mb-3" />
          <p className="font-mono text-sm text-base-500">
            {search ? 'No matching visitors' : 'No visitors yet'}
          </p>
        </div>
      ) : (
        <div className="bg-base-800/40 border border-base-700/50 rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-base-700/50">
                  <th className="text-left px-4 py-3 font-tactical text-[9px] text-base-500 tracking-widest">#</th>
                  <th className="text-left px-4 py-3 font-tactical text-[9px] text-base-500 tracking-widest">NAME</th>
                  <th className="text-left px-4 py-3 font-tactical text-[9px] text-base-500 tracking-widest">PURPOSE</th>
                  <th className="text-left px-4 py-3 font-tactical text-[9px] text-base-500 tracking-widest">DATE</th>
                  <th className="text-left px-4 py-3 font-tactical text-[9px] text-base-500 tracking-widest">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((v, i) => (
                  <tr key={v.id} className="border-b border-base-700/20 hover:bg-base-800/30 transition-colors">
                    <td className="px-4 py-3 font-mono text-[10px] text-base-600">{i + 1}</td>
                    <td className="px-4 py-3 font-mono text-xs text-base-200">{v.name}</td>
                    <td className="px-4 py-3">
                      <span className={`px-1.5 py-0.5 text-[8px] font-tactical tracking-wider rounded-sm border ${
                        v.purpose === 'hiring' ? 'bg-command-500/10 border-command-500/30 text-command-400'
                        : v.purpose === 'freelance' ? 'bg-tactical-600/10 border-tactical-600/30 text-tactical-400'
                        : v.purpose === 'collaboration' ? 'bg-hud-700/10 border-hud-700/30 text-hud-400'
                        : 'bg-base-800 border-base-700 text-base-500'
                      }`}>
                        {v.purpose?.toUpperCase() || 'UNKNOWN'}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-[10px] text-base-500">
                      {new Date(v.created_at).toLocaleDateString()} {new Date(v.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDelete(v.id)}
                        className="p-1.5 text-base-500 hover:text-alert-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}