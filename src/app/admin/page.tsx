'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Shield, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError(false);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        localStorage.setItem('admin_authenticated', 'true');
        router.push('/admin/dashboard');
      } else {
        setError(true);
        setPassword('');
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-950 flex items-center justify-center p-6 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-tactical-grid bg-grid-md opacity-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-command-500/10 border border-command-500/30 flex items-center justify-center">
            <Shield size={28} className="text-command-400" />
          </div>
          <h1 className="font-display text-2xl text-base-100 tracking-[0.15em]">
            ADMIN ACCESS
          </h1>
          <p className="font-tactical text-[10px] text-base-500 tracking-widest mt-2">
            CLASSIFIED — AUTHORIZED PERSONNEL ONLY
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-base-900/80 border border-base-700/50 rounded-sm p-6 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-5 pb-3 border-b border-base-700/40">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-alert-500/60" />
              <div className="w-2 h-2 rounded-full bg-command-500/60" />
              <div className="w-2 h-2 rounded-full bg-tactical-500/60" />
            </div>
            <span className="font-tactical text-[9px] text-base-500 tracking-wider ml-2">
              AUTH_GATEWAY.exe
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="font-tactical text-[9px] text-base-500 tracking-widest block mb-1.5">
                ACCESS CODE
              </label>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-base-600" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(false); }}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  placeholder="Enter secret key..."
                  className="w-full bg-base-800/60 border border-base-700/50 rounded-sm pl-9 pr-10 py-3 font-mono text-sm text-base-200 placeholder:text-base-600 focus:outline-none focus:border-command-500/50 transition-colors"
                  autoFocus
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-600 hover:text-base-400"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 px-3 py-2 bg-red-900/20 border border-red-800/30 rounded-sm"
              >
                <AlertCircle size={14} className="text-alert-500" />
                <span className="font-mono text-xs text-alert-400">ACCESS DENIED — Invalid key</span>
              </motion.div>
            )}

            <button
              onClick={handleLogin}
              disabled={loading || !password}
              className="w-full px-6 py-3 font-display text-sm uppercase tracking-[0.15em] bg-command-500/10 text-command-400 border border-command-500/40 hover:bg-command-500/20 hover:border-command-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-all duration-300 rounded-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? 'AUTHENTICATING...' : 'AUTHENTICATE'}
            </button>
          </div>
        </div>

        <div className="text-center mt-4">
          <a href="/" className="font-tactical text-[9px] text-base-600 tracking-wider hover:text-tactical-500 transition-colors">
            ← RETURN TO PORTFOLIO
          </a>
        </div>
      </motion.div>
    </div>
  );
}