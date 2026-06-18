import type { BadgeDefinition } from '@/types/achievement';

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  {
    id: 'first-session',
    name: '初次专注',
    description: '完成第一次专注',
    icon: '🌟',
    condition: (state) => state.sessions.filter((s) => s.type === 'focus').length >= 1,
  },
  {
    id: 'ten-sessions',
    name: '持之以恒',
    description: '完成 10 次专注',
    icon: '🔥',
    condition: (state) => state.sessions.filter((s) => s.type === 'focus').length >= 10,
  },
  {
    id: 'twenty-five-sessions',
    name: '专注达人',
    description: '完成 25 次专注',
    icon: '💪',
    condition: (state) => state.sessions.filter((s) => s.type === 'focus').length >= 25,
  },
  {
    id: 'hundred-hours',
    name: '百时修行',
    description: '累计专注 100 小时',
    icon: '🏆',
    condition: (state) => {
      const total = state.sessions
        .filter((s) => s.type === 'focus')
        .reduce((sum, s) => sum + s.duration, 0);
      return total >= 100 * 3600;
    },
  },
  {
    id: 'early-bird',
    name: '早起的鸟儿',
    description: '在早上 5-7 点完成一次专注',
    icon: '🌅',
    condition: (state) =>
      state.sessions.some((s) => {
        const hour = new Date(s.startTime).getHours();
        return s.type === 'focus' && hour >= 5 && hour < 7;
      }),
  },
  {
    id: 'night-owl',
    name: '夜猫子',
    description: '在晚上 10 点到凌晨 2 点完成一次专注',
    icon: '🦉',
    condition: (state) =>
      state.sessions.some((s) => {
        const hour = new Date(s.startTime).getHours();
        return s.type === 'focus' && (hour >= 22 || hour < 2);
      }),
  },
  {
    id: 'weekend-warrior',
    name: '周末战士',
    description: '在周末完成 3 次专注',
    icon: '⚔️',
    condition: (state) => {
      const weekendSessions = state.sessions.filter((s) => {
        const day = new Date(s.startTime).getDay();
        return s.type === 'focus' && (day === 0 || day === 6);
      });
      return weekendSessions.length >= 3;
    },
  },
  {
    id: 'marathon',
    name: '马拉松',
    description: '单次专注超过 90 分钟',
    icon: '🏃',
    condition: (state) =>
      state.sessions.some((s) => s.type === 'focus' && s.duration >= 90 * 60),
  },
  {
    id: 'seven-day-streak',
    name: '七日之约',
    description: '连续 7 天专注学习',
    icon: '📅',
    condition: (state) => {
      const focusDays = new Set(
        state.sessions.filter((s) => s.type === 'focus').map((s) => s.date)
      );
      let streak = 0;
      const now = new Date();
      for (let i = 0; i < 7; i++) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        if (focusDays.has(key)) {
          streak++;
        } else {
          break;
        }
      }
      return streak >= 7;
    },
  },
  {
    id: 'goal-crusher',
    name: '目标粉碎机',
    description: '连续 5 天达成每日目标',
    icon: '🎯',
    condition: (state) => {
      // Simplified: check if any 5 consecutive days have at least 1 focus session
      const focusDays = new Set(
        state.sessions.filter((s) => s.type === 'focus').map((s) => s.date)
      );
      let streak = 0;
      const now = new Date();
      for (let i = 0; i < 365; i++) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        if (focusDays.has(key)) {
          streak++;
          if (streak >= 5) return true;
        } else {
          streak = 0;
        }
      }
      return streak >= 5;
    },
  },
];
