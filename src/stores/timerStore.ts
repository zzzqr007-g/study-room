import { create } from 'zustand';
import type { TimerMode, TimerType, TimerStatus } from '@/types/timer';
import { DEFAULT_FOCUS_DURATION, DEFAULT_BREAK_DURATION } from '@/constants/defaults';

interface TimerState {
  mode: TimerMode;
  timerType: TimerType;
  status: TimerStatus;
  seconds: number; // countdown: remaining; stopwatch: elapsed
  focusDuration: number;
  breakDuration: number;
  sessionStartTime: number | null;
  totalFocusSeconds: number; // accumulated focus this session

  setMode: (mode: TimerMode) => void;
  setTimerType: (type: TimerType) => void;
  setFocusDuration: (sec: number) => void;
  setBreakDuration: (sec: number) => void;
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  skip: () => void;
  tick: (elapsed: number) => void;
  completeSession: () => { mode: TimerMode; duration: number } | null;
}

function loadSettings() {
  try {
    const saved = localStorage.getItem('timer-settings');
    if (saved) return JSON.parse(saved);
  } catch { /* ignore */ }
  return {};
}

function saveSettings(state: Pick<TimerState, 'focusDuration' | 'breakDuration' | 'timerType'>) {
  try {
    localStorage.setItem('timer-settings', JSON.stringify({
      focusDuration: state.focusDuration,
      breakDuration: state.breakDuration,
      timerType: state.timerType,
    }));
  } catch { /* ignore */ }
}

const settings = loadSettings();

export const useTimerStore = create<TimerState>((set, get) => ({
  mode: 'focus',
  timerType: settings.timerType ?? 'countdown',
  status: 'idle',
  seconds: settings.focusDuration ?? DEFAULT_FOCUS_DURATION,
  focusDuration: settings.focusDuration ?? DEFAULT_FOCUS_DURATION,
  breakDuration: settings.breakDuration ?? DEFAULT_BREAK_DURATION,
  sessionStartTime: null,
  totalFocusSeconds: 0,

  setMode: (mode) => {
    const state = get();
    if (state.status !== 'idle') return; // can't change mode while running
    const dur = mode === 'focus' ? state.focusDuration : state.breakDuration;
    set({ mode, seconds: dur, sessionStartTime: null });
  },

  setTimerType: (timerType) => {
    const state = get();
    if (state.status !== 'idle') return;
    const seconds = timerType === 'countdown' ? state.focusDuration : 0;
    set({ timerType, seconds });
    saveSettings({ ...state, timerType });
  },

  setFocusDuration: (sec) => {
    const state = get();
    if (state.status !== 'idle') return;
    set({
      focusDuration: sec,
      seconds: state.mode === 'focus' && state.timerType === 'countdown' ? sec : state.seconds,
    });
    saveSettings({ ...state, focusDuration: sec });
  },

  setBreakDuration: (sec) => {
    const state = get();
    if (state.status !== 'idle') return;
    set({
      breakDuration: sec,
      seconds: state.mode === 'break' && state.timerType === 'countdown' ? sec : state.seconds,
    });
    saveSettings({ ...state, breakDuration: sec });
  },

  start: () => {
    const state = get();
    const now = Date.now();
    if (state.timerType === 'countdown') {
      set({ status: 'running', sessionStartTime: now });
    } else {
      set({ status: 'running', seconds: 0, sessionStartTime: now });
    }
  },

  pause: () => set({ status: 'paused', sessionStartTime: null }),

  resume: () => {
    const state = get();
    const now = Date.now();
    if (state.timerType === 'countdown') {
      set({ status: 'running', sessionStartTime: now });
    } else {
      set({ status: 'running', sessionStartTime: now });
    }
  },

  reset: () => {
    const { mode, focusDuration, breakDuration, timerType } = get();
    const dur = mode === 'focus' ? focusDuration : breakDuration;
    set({
      status: 'idle',
      seconds: timerType === 'countdown' ? dur : 0,
      sessionStartTime: null,
      totalFocusSeconds: 0,
    });
  },

  skip: () => {
    const state = get();
    const nextMode: TimerMode = state.mode === 'focus' ? 'break' : 'focus';
    const dur = nextMode === 'focus' ? state.focusDuration : state.breakDuration;
    set({
      mode: nextMode,
      status: 'idle',
      seconds: state.timerType === 'countdown' ? dur : 0,
      sessionStartTime: null,
    });
  },

  tick: (elapsed) => {
    const state = get();
    if (state.status !== 'running') return;

    const currentDuration = state.mode === 'focus' ? state.focusDuration : state.breakDuration;

    if (state.timerType === 'countdown') {
      const remaining = currentDuration - elapsed;
      set({ seconds: remaining });

      if (state.mode === 'focus') {
        const focused = Math.min(currentDuration, elapsed);
        set({ totalFocusSeconds: focused });
      }
    } else {
      // stopwatch
      set({ seconds: elapsed });
      if (state.mode === 'focus') {
        set({ totalFocusSeconds: elapsed });
      }
    }
  },

  completeSession: () => {
    const state = get();
    if (state.status !== 'running') return null;

    const mode = state.mode;
    const duration = mode === 'focus' ? state.totalFocusSeconds : state.breakDuration;

    const nextMode: TimerMode = mode === 'focus' ? 'break' : 'focus';
    const dur = nextMode === 'focus' ? state.focusDuration : state.breakDuration;

    set({
      mode: nextMode,
      status: 'idle',
      seconds: state.timerType === 'countdown' ? dur : 0,
      sessionStartTime: null,
      totalFocusSeconds: 0,
    });

    return { mode, duration };
  },
}));
