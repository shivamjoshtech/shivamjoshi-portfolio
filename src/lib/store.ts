import { create } from 'zustand';

interface PortfolioState {
  // Visitor info (collected by avatar)
  visitorName: string | null;
  visitorId: string | null;
  setVisitor: (name: string, id: string) => void;

  // Navigation
  activeSection: string;
  setActiveSection: (section: string) => void;

  // Loading states
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  // Avatar chat open/close
  isAvatarOpen: boolean;
  toggleAvatar: () => void;
  setAvatarOpen: (open: boolean) => void;

  // Admin auth
  isAdmin: boolean;
  setIsAdmin: (admin: boolean) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  visitorName: null,
  visitorId: null,
  setVisitor: (name, id) => set({ visitorName: name, visitorId: id }),

  activeSection: 'hero',
  setActiveSection: (section) => set({ activeSection: section }),

  isLoading: true,
  setIsLoading: (loading) => set({ isLoading: loading }),

  isAvatarOpen: false,
  toggleAvatar: () => set((state) => ({ isAvatarOpen: !state.isAvatarOpen })),
  setAvatarOpen: (open) => set({ isAvatarOpen: open }),

  isAdmin: false,
  setIsAdmin: (admin) => set({ isAdmin: admin }),
}));
