'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  RefreshCw,
  Trash2,
  ChevronDown,
  ChevronUp,
  Bot,
  User,
  Search,
} from 'lucide-react';

interface ConversationGroup {
  conversationId: string;
  visitorName: string;
  messages: { user: string; aria: string; timestamp: string }[];
  startTime: string;
  totalMessages: number;
}

export default function AdminConversations() {
  const [conversations, setConversations] = useState<ConversationGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    setLoading(true);
    try {
      const { supabase } = await import('@/lib/supabase');
      const { data } = await supabase
        .from('analytics')
        .select('*')
        .eq('event_type', 'avatar_chat')
        .order('created_at', { ascending: true });

      if (data && data.length > 0) {
        // Group by conversation_id
        const grouped: Record<string, ConversationGroup> = {};

        data.forEach((event: any) => {
          const meta = event.metadata || {};
          const convId = meta.conversation_id || 'unknown';

          if (!grouped[convId]) {
            grouped[convId] = {
              conversationId: convId,
              visitorName: meta.visitor_name || 'Unknown',
              messages: [],
              startTime: event.created_at,
              totalMessages: 0,
            };
          }

          grouped[convId].messages.push({
            user: meta.user_message || '',
            aria: meta.aria_reply || '',
            timestamp: meta.timestamp || event.created_at,
          });
          grouped[convId].totalMessages += 2; // user + aria
        });

        // Sort by newest first
        const sorted = Object.values(grouped).sort(
          (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
        );

        setConversations(sorted);
      } else {
        setConversations([]);
      }
    } catch (e) {
      console.log('Conversations load error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConversation = async (conversationId: string) => {
    if (!confirm('Delete this entire conversation? Cannot be undone.')) return;

    try {
      const { supabase } = await import('@/lib/supabase');

      // Get all analytics events with this conversation_id
      const { data } = await supabase
        .from('analytics')
        .select('id, metadata')
        .eq('event_type', 'avatar_chat');

      if (data) {
        const idsToDelete = data
          .filter((e: any) => e.metadata?.conversation_id === conversationId)
          .map((e: any) => e.id);

        if (idsToDelete.length > 0) {
          await supabase.from('analytics').delete().in('id', idsToDelete);
        }
      }

      await loadConversations();
    } catch (e) {
      alert('Delete failed');
    }
  };

  const handleDeleteAll = async () => {
    if (!confirm(`Delete ALL ${conversations.length} conversations? Cannot be undone!`)) return;
    if (!confirm('Are you REALLY sure?')) return;

    try {
      const { supabase } = await import('@/lib/supabase');
      await supabase.from('analytics').delete().eq('event_type', 'avatar_chat');
      await loadConversations();
    } catch (e) {
      alert('Delete failed');
    }
  };

  const filtered = conversations.filter((c) =>
    c.visitorName.toLowerCase().includes(search.toLowerCase()) ||
    c.messages.some(
      (m) =>
        m.user.toLowerCase().includes(search.toLowerCase()) ||
        m.aria.toLowerCase().includes(search.toLowerCase())
    )
  );

  const totalMessages = conversations.reduce((sum, c) => sum + c.totalMessages, 0);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl text-base-100 tracking-[0.15em]">
            CONVERSATIONS
          </h1>
          <p className="font-tactical text-[10px] text-base-500 tracking-widest mt-1">
            ARIA CHAT LOGS — {conversations.length} CONVERSATIONS • {totalMessages} MESSAGES
          </p>
        </div>
        <div className="flex gap-2">
          {conversations.length > 0 && (
            <button
              onClick={handleDeleteAll}
              className="flex items-center gap-2 px-3 py-2 bg-red-900/10 text-alert-400 border border-red-800/30 rounded-sm hover:bg-red-900/20 transition-all font-tactical text-[10px] tracking-wider"
            >
              <Trash2 size={12} />
              DELETE ALL
            </button>
          )}
          <button
            onClick={loadConversations}
            className="p-2 text-base-500 hover:text-tactical-400 transition-colors"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-base-600" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by visitor name or message content..."
          className="w-full bg-base-800/60 border border-base-700/50 rounded-sm pl-9 pr-4 py-2.5 font-mono text-xs text-base-200 placeholder:text-base-600 focus:outline-none focus:border-tactical-600/50"
        />
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-tactical-600/10 border border-tactical-600/30 rounded-sm">
          <div className="font-display text-2xl font-bold text-tactical-400">
            {conversations.length}
          </div>
          <div className="font-tactical text-[8px] tracking-widest text-base-500 mt-1">
            TOTAL CONVERSATIONS
          </div>
        </div>
        <div className="p-4 bg-command-500/10 border border-command-500/30 rounded-sm">
          <div className="font-display text-2xl font-bold text-command-400">
            {totalMessages}
          </div>
          <div className="font-tactical text-[8px] tracking-widest text-base-500 mt-1">
            TOTAL MESSAGES
          </div>
        </div>
        <div className="p-4 bg-hud-700/10 border border-hud-700/30 rounded-sm">
          <div className="font-display text-2xl font-bold text-hud-400">
            {new Set(conversations.map((c) => c.visitorName)).size}
          </div>
          <div className="font-tactical text-[8px] tracking-widest text-base-500 mt-1">
            UNIQUE VISITORS
          </div>
        </div>
      </div>

      {/* Conversations List */}
      {loading ? (
        <div className="font-mono text-xs text-base-600 py-12 text-center">
          Loading conversations...
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-base-800/40 border border-dashed border-base-700/40 rounded-sm p-12 text-center">
          <MessageSquare size={32} className="text-base-700 mx-auto mb-3" />
          <p className="font-mono text-sm text-base-500">
            {search
              ? 'No matching conversations'
              : 'No conversations yet — they appear when visitors chat with ARIA'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((conv) => {
            const isExpanded = expandedId === conv.conversationId;

            return (
              <div
                key={conv.conversationId}
                className={`bg-base-800/60 border rounded-sm overflow-hidden transition-colors ${
                  isExpanded
                    ? 'border-tactical-600/40'
                    : 'border-base-700/50 hover:border-base-600/60'
                }`}
              >
                {/* Conversation Header */}
                <div
                  className="flex items-center justify-between p-4 cursor-pointer"
                  onClick={() =>
                    setExpandedId(isExpanded ? null : conv.conversationId)
                  }
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-command-500/10 border border-command-500/30 flex items-center justify-center flex-shrink-0">
                      <User size={14} className="text-command-400" />
                    </div>
                    <div>
                      <div className="font-mono text-sm text-base-200 flex items-center gap-2">
                        {conv.visitorName}
                        <span className="px-1.5 py-0.5 text-[8px] font-tactical tracking-wider bg-tactical-600/10 border border-tactical-600/30 text-tactical-400 rounded-sm">
                          {conv.messages.length} EXCHANGES
                        </span>
                      </div>
                      <div className="font-mono text-[10px] text-base-500 mt-0.5">
                        {new Date(conv.startTime).toLocaleDateString()}{' '}
                        {new Date(conv.startTime).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteConversation(conv.conversationId);
                      }}
                      className="p-1.5 text-base-600 hover:text-alert-400 transition-colors"
                      title="Delete conversation"
                    >
                      <Trash2 size={13} />
                    </button>
                    {isExpanded ? (
                      <ChevronUp size={16} className="text-base-500" />
                    ) : (
                      <ChevronDown size={16} className="text-base-500" />
                    )}
                  </div>
                </div>

                {/* Expanded Messages */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-4 pb-4 pt-1 border-t border-base-700/30">
                        <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                          {conv.messages.map((msg, i) => (
                            <div key={i} className="space-y-2">
                              {/* User message */}
                              {msg.user && (
                                <div className="flex items-start gap-2 justify-end">
                                  <div className="max-w-[75%] px-3 py-2 bg-command-500/10 border border-command-500/20 rounded-sm text-xs text-base-200">
                                    {msg.user}
                                  </div>
                                  <div className="w-6 h-6 rounded-full bg-command-500/10 border border-command-500/30 flex items-center justify-center flex-shrink-0">
                                    <User size={10} className="text-command-400" />
                                  </div>
                                </div>
                              )}
                              {/* ARIA reply */}
                              {msg.aria && (
                                <div className="flex items-start gap-2">
                                  <div className="w-6 h-6 rounded-full bg-tactical-600/10 border border-tactical-600/30 flex items-center justify-center flex-shrink-0">
                                    <Bot size={10} className="text-tactical-400" />
                                  </div>
                                  <div className="max-w-[75%] px-3 py-2 bg-base-800/80 border border-base-700/40 rounded-sm text-xs text-base-300">
                                    {msg.aria}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Timestamp footer */}
                        <div className="mt-3 pt-2 border-t border-base-700/20 font-mono text-[9px] text-base-600 text-right">
                          Conversation ID: {conv.conversationId}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}