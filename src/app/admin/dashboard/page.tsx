'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  FolderGit2,
  MessageSquare,
  Eye,
  TrendingUp,
  Clock,
} from 'lucide-react';

interface DashboardStats {
  totalVisitors: number;
  totalContacts: number;
  totalProjects: number;
  recentVisitors: any[];
  recentContacts: any[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalVisitors: 0,
    totalContacts: 0,
    totalProjects: 0,
    recentVisitors: [],
    recentContacts: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const { supabase } = await import('@/lib/supabase');

      const [visitors, contacts, projects] = await Promise.all([
        supabase.from('visitors').select('*').order('created_at', { ascending: false }).limit(10),
        supabase.from('contact_requests').select('*').order('created_at', { ascending: false }).limit(10),
        supabase.from('projects').select('*'),
      ]);

      setStats({
        totalVisitors: visitors.data?.length || 0,
        totalContacts: contacts.data?.length || 0,
        totalProjects: projects.data?.length || 0,
        recentVisitors: visitors.data || [],
        recentContacts: contacts.data || [],
      });
    } catch (e) {
      console.log('Dashboard load error — Supabase may not be configured');
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'TOTAL VISITORS', value: stats.totalVisitors, icon: <Users size={20} />, color: 'text-tactical-400', bg: 'bg-tactical-600/10 border-tactical-600/30' },
    { label: 'CONTACT REQUESTS', value: stats.totalContacts, icon: <MessageSquare size={20} />, color: 'text-command-400', bg: 'bg-command-500/10 border-command-500/30' },
    { label: 'PROJECTS', value: stats.totalProjects, icon: <FolderGit2 size={20} />, color: 'text-hud-400', bg: 'bg-hud-700/10 border-hud-700/30' },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-2xl text-base-100 tracking-[0.15em]">
          COMMAND CENTER
        </h1>
        <p className="font-tactical text-[10px] text-base-500 tracking-widest mt-1">
          ADMIN DASHBOARD — SYSTEM OVERVIEW
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-5 rounded-sm border ${stat.bg}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={stat.color}>{stat.icon}</span>
              <span className="font-tactical text-[8px] text-base-600 tracking-widest">{stat.label}</span>
            </div>
            <div className={`font-display text-3xl font-bold ${stat.color}`}>
              {loading ? '—' : stat.value}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Visitors */}
        <div className="bg-base-800/60 border border-base-700/50 rounded-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-tactical-500" />
              <span className="font-display text-sm text-base-100 tracking-wider">RECENT VISITORS</span>
            </div>
            <span className="font-mono text-[10px] text-base-500">{stats.totalVisitors} total</span>
          </div>

          {loading ? (
            <div className="font-mono text-xs text-base-600 py-8 text-center">Loading...</div>
          ) : stats.recentVisitors.length === 0 ? (
            <div className="font-mono text-xs text-base-600 py-8 text-center">
              No visitors yet. They&apos;ll appear when someone chats with ARIA.
            </div>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {stats.recentVisitors.map((v: any, i: number) => (
                <div key={v.id || i} className="flex items-center justify-between p-2.5 bg-base-900/40 border border-base-700/30 rounded-sm">
                  <div>
                    <div className="font-mono text-xs text-base-200">{v.name}</div>
                    <div className="font-tactical text-[8px] text-base-600 tracking-wider mt-0.5">
                      {v.purpose || 'No purpose'} • {v.company || 'No company'}
                    </div>
                  </div>
                  <div className="font-mono text-[10px] text-base-600">
                    {new Date(v.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Contacts */}
        <div className="bg-base-800/60 border border-base-700/50 rounded-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MessageSquare size={16} className="text-command-500" />
              <span className="font-display text-sm text-base-100 tracking-wider">CONTACT REQUESTS</span>
            </div>
            <span className="font-mono text-[10px] text-base-500">{stats.totalContacts} total</span>
          </div>

          {loading ? (
            <div className="font-mono text-xs text-base-600 py-8 text-center">Loading...</div>
          ) : stats.recentContacts.length === 0 ? (
            <div className="font-mono text-xs text-base-600 py-8 text-center">
              No contact requests yet. They&apos;ll appear from the contact form.
            </div>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {stats.recentContacts.map((c: any, i: number) => (
                <div key={c.id || i} className="p-2.5 bg-base-900/40 border border-base-700/30 rounded-sm">
                  <div className="flex items-center justify-between">
                    <div className="font-mono text-xs text-base-200">{c.name}</div>
                    <div className={`px-1.5 py-0.5 text-[8px] font-tactical tracking-wider rounded-sm border ${
                      c.status === 'unread'
                        ? 'bg-command-500/10 border-command-500/30 text-command-400'
                        : 'bg-base-800 border-base-700 text-base-500'
                    }`}>
                      {c.status?.toUpperCase() || 'UNREAD'}
                    </div>
                  </div>
                  <div className="font-mono text-[10px] text-base-500 mt-1">{c.email}</div>
                  <div className="font-body text-[11px] text-base-400 mt-1 line-clamp-2">{c.message}</div>
                  <div className="font-mono text-[9px] text-base-600 mt-1">
                    {new Date(c.created_at).toLocaleDateString()} • {c.subject || 'No subject'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}