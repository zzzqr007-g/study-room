import { create } from 'zustand';

export interface CompletedFocusSession {
  taskId: string | null;
  taskText: string | null;
  duration: number;
  completedAt: number;
}

interface UIState {
  sidebarExpanded: boolean;
  sidebarHovered: boolean;
  isFullscreen: boolean;
  showStatistics: boolean;
  showAchievementPanel: boolean;
  showQuoteMode: boolean;
  showPWAInstall: boolean;
  showMobileMenu: boolean;
  showSessionSummary: boolean;
  completedFocusSession: CompletedFocusSession | null;

  toggleSidebar: () => void;
  setSidebarExpanded: (v: boolean) => void;
  setSidebarHovered: (v: boolean) => void;
  setFullscreen: (v: boolean) => void;
  toggleStatistics: () => void;
  setStatistics: (v: boolean) => void;
  setAchievementPanel: (v: boolean) => void;
  setQuoteMode: (v: boolean) => void;
  setPWAInstall: (v: boolean) => void;
  toggleMobileMenu: () => void;
  setMobileMenu: (v: boolean) => void;
  showCompletedFocusSession: (session: CompletedFocusSession) => void;
  dismissSessionSummary: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarExpanded: false,
  sidebarHovered: false,
  isFullscreen: false,
  showStatistics: false,
  showAchievementPanel: false,
  showQuoteMode: false,
  showPWAInstall: false,
  showMobileMenu: false,
  showSessionSummary: false,
  completedFocusSession: null,

  toggleSidebar: () => set((s) => ({ sidebarExpanded: !s.sidebarExpanded })),
  setSidebarExpanded: (v) => set({ sidebarExpanded: v }),
  setSidebarHovered: (v) => set({ sidebarHovered: v }),
  setFullscreen: (v) => set({ isFullscreen: v }),
  toggleStatistics: () => set((s) => ({ showStatistics: !s.showStatistics })),
  setStatistics: (v) => set({ showStatistics: v }),
  setAchievementPanel: (v) => set({ showAchievementPanel: v }),
  setQuoteMode: (v) => set({ showQuoteMode: v }),
  setPWAInstall: (v) => set({ showPWAInstall: v }),
  toggleMobileMenu: () => set((s) => ({ showMobileMenu: !s.showMobileMenu })),
  setMobileMenu: (v) => set({ showMobileMenu: v }),
  showCompletedFocusSession: (session) =>
    set({ completedFocusSession: session, showSessionSummary: true }),
  dismissSessionSummary: () => set({ showSessionSummary: false }),
}));
