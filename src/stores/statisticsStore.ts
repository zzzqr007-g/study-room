import { create } from 'zustand';
import type { SessionRecord } from '@/types/statistics';
import { DEFAULT_DAILY_GOAL_MINUTES } from '@/constants/defaults';
import { getTodayKey, getWeekDates } from '@/utils/time';

interface StatisticsState {
  sessions: SessionRecord[];
  dailyGoal: number; // minutes

  recordSession: (session: Omit<SessionRecord, 'id'>) => void;
  setDailyGoal: (minutes: number) => void;
  getTodayTotal: () => number; // seconds
  getWeeklyData: () => { day: string; minutes: number }[];
  getAllTimeTotal: () => number; // seconds
  getStreak: () => number;
}

function loadStats(): { sessions: SessionRecord[]; dailyGoal: number } {
  try {
    const saved = localStorage.getItem('statistics');
    if (saved) {
      const data = JSON.parse(saved);
      return {
        sessions: data.sessions ?? [],
        dailyGoal: data.dailyGoal ?? DEFAULT_DAILY_GOAL_MINUTES,
      };
    }
  } catch { /* ignore */ }
  return { sessions: [], dailyGoal: DEFAULT_DAILY_GOAL_MINUTES };
}

function saveStats(sessions: SessionRecord[], dailyGoal: number) {
  try {
    localStorage.setItem('statistics', JSON.stringify({ sessions, dailyGoal }));
  } catch { /* ignore */ }
}

const initial = loadStats();

export const useStatisticsStore = create<StatisticsState>((set, get) => ({
  sessions: initial.sessions,
  dailyGoal: initial.dailyGoal,

  recordSession: (session) => {
    const newSession: SessionRecord = {
      ...session,
      id: crypto.randomUUID(),
    };
    set((s) => {
      const updated = [...s.sessions, newSession];
      saveStats(updated, s.dailyGoal);
      return { sessions: updated };
    });
  },

  setDailyGoal: (minutes) => {
    set((s) => {
      saveStats(s.sessions, minutes);
      return { dailyGoal: minutes };
    });
  },

  getTodayTotal: () => {
    const today = getTodayKey();
    return get().sessions
      .filter((s) => s.date === today && s.type === 'focus')
      .reduce((sum, s) => sum + s.duration, 0);
  },

  getWeeklyData: () => {
    const sessions = get().sessions;
    const weekDays = getWeekDates();
    return weekDays.map(({ key, label }) => {
      const minutes = Math.round(
        sessions
          .filter((s) => s.date === key && s.type === 'focus')
          .reduce((sum, s) => sum + s.duration, 0) / 60
      );
      return { day: label, minutes };
    });
  },

  getAllTimeTotal: () => {
    return get().sessions
      .filter((s) => s.type === 'focus')
      .reduce((sum, s) => sum + s.duration, 0);
  },

  getStreak: () => {
    const sessions = get().sessions;
    const focusDays = new Set(
      sessions.filter((s) => s.type === 'focus').map((s) => s.date)
    );

    let streak = 0;
    const now = new Date();

    for (let i = 0; i < 365; i++) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

      if (focusDays.has(key)) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  },
}));
