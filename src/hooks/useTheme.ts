import { useEffect } from 'react';
import { useThemeStore } from '@/stores/themeStore';
import { DAY_START_HOUR, NIGHT_START_HOUR } from '@/constants/defaults';

function resolveTheme(mode: 'light' | 'dark' | 'auto'): 'light' | 'dark' {
  if (mode === 'auto') {
    const hour = new Date().getHours();
    return hour >= DAY_START_HOUR && hour < NIGHT_START_HOUR ? 'light' : 'dark';
  }
  return mode;
}

export function useTheme() {
  const mode = useThemeStore((s) => s.mode);
  const effective = resolveTheme(mode);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', effective);
  }, [effective]);

  // Auto-switch at day/night boundaries when in auto mode
  useEffect(() => {
    if (mode !== 'auto') return;

    function scheduleNextSwitch() {
      const now = new Date();
      const currentHour = now.getHours();

      // Determine next switch time
      let nextSwitchHour: number;
      if (currentHour >= DAY_START_HOUR && currentHour < NIGHT_START_HOUR) {
        // Currently day -> switch at night start
        nextSwitchHour = NIGHT_START_HOUR;
      } else {
        // Currently night -> switch at day start (next day if past midnight)
        nextSwitchHour = DAY_START_HOUR;
      }

      const next = new Date(now);
      next.setHours(nextSwitchHour, 0, 0, 0);
      if (next <= now) {
        next.setDate(next.getDate() + 1);
      }

      const delay = next.getTime() - now.getTime();
      return setTimeout(() => {
        // Force re-render by calling setMode with same value
        // (Zustand will notify subscribers even if value is the same? No...)
        // We need to trigger a re-render. Let's just set the mode again.
        const newEffective = resolveTheme('auto');
        document.documentElement.setAttribute('data-theme', newEffective);
        scheduleNextSwitch();
      }, delay);
    }

    const timer = scheduleNextSwitch();
    return () => clearTimeout(timer);
  }, [mode]);

  return { mode, effective };
}
