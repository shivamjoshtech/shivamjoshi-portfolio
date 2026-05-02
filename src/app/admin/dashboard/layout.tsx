'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FolderGit2,
  Users,
  MessageSquare,
  BarChart3,
  LogOut,
  Shield,
  ChevronLeft,
  Settings,
  MessagesSquare,
} from 'lucide-react';

const ADMIN_NAV = [
  { href: '/admin/dashboard', label: 'Overview', icon: <LayoutDashboard size={16} /> },
  { href: '/admin/dashboard/projects', label: 'Projects', icon: <FolderGit2 size={16} /> },
  { href: '/admin/dashboard/visitors', label: 'Visitors', icon: <Users size={16} /> },
  { href: '/admin/dashboard/contacts', label: 'Contacts', icon: <MessageSquare size={16} /> },
  { href: '/admin/dashboard/conversations', label: 'Conversations', icon: <MessagesSquare size={16} /> },
  { href: '/admin/dashboard/analytics', label: 'Analytics', icon: <BarChart3 size={16} /> },
  { href: '/admin/dashboard/settings', label: 'Settings', icon: <Settings size={16} /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('admin_authenticated');
    if (auth !== 'true') {
      router.push('/admin');
    } else {
      setIsAuth(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    router.push('/admin');
  };

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-base-950 flex items-center justify-center">
        <div className="font-mono text-sm text-base-500">Verifying access...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-950 flex">
      <aside className="w-56 bg-base-900/80 border-r border-base-700/50 flex flex-col fixed h-screen">
        <div className="p-4 border-b border-base-700/50">
          <div className="flex items-center gap-2">
            <Shield size={18} className="text-command-400" />
            <div>
              <div className="font-display text-xs tracking-[0.15em] text-base-100 font-semibold">
                ADMIN PANEL
              </div>
              <div className="font-tactical text-[8px] text-command-600 tracking-wider">
                CLASSIFIED ACCESS
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {ADMIN_NAV.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-sm transition-all text-sm ${
                  isActive
                    ? 'bg-command-500/10 text-command-400 border-l-2 border-command-500'
                    : 'text-base-500 hover:text-base-300 hover:bg-base-800/50'
                }`}
              >
                {item.icon}
                <span className="font-tactical text-[11px] tracking-wider">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-base-700/50 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-base-500 hover:text-tactical-400 transition-colors text-sm"
          >
            <ChevronLeft size={14} />
            <span className="font-tactical text-[10px] tracking-wider">VIEW PORTFOLIO</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-base-500 hover:text-alert-400 transition-colors text-sm w-full"
          >
            <LogOut size={14} />
            <span className="font-tactical text-[10px] tracking-wider">LOGOUT</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-56 p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}