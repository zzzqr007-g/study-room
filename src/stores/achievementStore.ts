import { create } from 'zustand';
import type { Badge } from '@/types/achievement';
import { BADGE_DEFINITIONS } from '@/constants/badges';
import { useStatisticsStore } from './statisticsStore';

interface AchievementState {
  badges: Badge[];
  recentUnlock: Badge | null;
  checkAchievements: () => void;
  dismissNotification: () => void;
}

function loadBadges(): Badge[] {
  try {
    const saved = localStorage.getItem('achievements');
    if (saved) {
      const unlocked = JSON.parse(saved) as { id: string; unlockedAt: number }[];
      const unlockedMap = new Map(unlocked.map((u) => [u.id, u.unlockedAt]));
      return BADGE_DEFINITIONS.map((def) => ({
        id: def.id,
        name: def.name,
        description: def.description,
        icon: def.icon,
        unlockedAt: unlockedMap.get(def.id) ?? null,
      }));
    }
  } catch { /* ignore */ }
  return BADGE_DEFINITIONS.map((def) => ({
    id: def.id,
    name: def.name,
    description: def.description,
    icon: def.icon,
    unlockedAt: null,
  }));
}

function saveBadges(badges: Badge[]) {
  try {
    const unlocked = badges
      .filter((b) => b.unlockedAt !== null)
      .map((b) => ({ id: b.id, unlockedAt: b.unlockedAt }));
    localStorage.setItem('achievements', JSON.stringify(unlocked));
  } catch { /* ignore */ }
}

export const useAchievementStore = create<AchievementState>((set, get) => ({
  badges: loadBadges(),
  recentUnlock: null,

  checkAchievements: () => {
    const stats = useStatisticsStore.getState();
    const state = get();
    const sessions = stats.sessions;

    const newlyUnlocked: Badge[] = [];

    const updatedBadges = state.badges.map((badge) => {
      if (badge.unlockedAt !== null) return badge; // already unlocked

      const definition = BADGE_DEFINITIONS.find((d) => d.id === badge.id);
      if (!definition) return badge;

      if (definition.condition({ sessions })) {
        const unlocked = { ...badge, unlockedAt: Date.now() };
        newlyUnlocked.push(unlocked);
        return unlocked;
      }
      return badge;
    });

    if (newlyUnlocked.length > 0) {
      saveBadges(updatedBadges);
      set({
        badges: updatedBadges,
        recentUnlock: newlyUnlocked[newlyUnlocked.length - 1],
      });

      // Auto-dismiss after 4 seconds
      setTimeout(() => set({ recentUnlock: null }), 4000);
    }
  },

  dismissNotification: () => set({ recentUnlock: null }),
}));
