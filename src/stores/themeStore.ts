import { create } from 'zustand';
import type { ThemeMode } from '@/types/theme';

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
}

const MODE_CYCLE: Record<ThemeMode, ThemeMode> = {
  light: 'dark',
  dark: 'auto',
  auto: 'light',
};

function loadMode(): ThemeMode {
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark' || saved === 'auto') return saved;
  } catch { /* localStorage not available */ }
  return 'auto';
}

function saveMode(mode: ThemeMode) {
  try {
    localStorage.setItem('theme', mode);
  } catch { /* ignore */ }
}

export const useThemeStore = create<ThemeState>((set) => ({
  mode: loadMode(),
  setMode: (mode) => {
    saveMode(mode);
    set({ mode });
  },
  toggle: () => {
    set((state) => {
      const next = MODE_CYCLE[state.mode];
      saveMode(next);
      return { mode: next };
    });
  },
}));
