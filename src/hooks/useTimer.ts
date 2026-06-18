import { useEffect, useRef, useCallback } from 'react';
import { useTimerStore } from '@/stores/timerStore';
import { useStatisticsStore } from '@/stores/statisticsStore';
import { useTodoStore } from '@/stores/todoStore';
import { useUIStore } from '@/stores/uiStore';
import { getTodayKey } from '@/utils/time';

export function useTimer() {
  const workerRef = useRef<Worker | null>(null);
  const lastElapsedRef = useRef<number>(0);

  const status = useTimerStore((s) => s.status);
  const mode = useTimerStore((s) => s.mode);
  const timerType = useTimerStore((s) => s.timerType);
  const focusDuration = useTimerStore((s) => s.focusDuration);
  const sessionStartTime = useTimerStore((s) => s.sessionStartTime);

  const tick = useTimerStore((s) => s.tick);
  const completeSession = useTimerStore((s) => s.completeSession);
  const recordSession = useStatisticsStore((s) => s.recordSession);

  const handleSessionComplete = useCallback((result: { mode: typeof mode; duration: number } | null) => {
    if (!result || result.mode !== 'focus') return;

    const now = Date.now();
    const todoState = useTodoStore.getState();
    const activeTodo = todoState.todos.find(
      (todo) => todo.id === todoState.activeTodoId && !todo.completed
    );

    recordSession({
      date: getTodayKey(),
      startTime: now - result.duration * 1000,
      endTime: now,
      duration: result.duration,
      type: 'focus',
    });

    useUIStore.getState().showCompletedFocusSession({
      taskId: activeTodo?.id ?? null,
      taskText: activeTodo?.text ?? null,
      duration: result.duration,
      completedAt: now,
    });
  }, [recordSession]);

  // Initialize worker
  useEffect(() => {
    workerRef.current = new Worker(
      new URL('../workers/timerWorker.ts', import.meta.url),
      { type: 'module' }
    );

    const worker = workerRef.current;

    worker.onmessage = (e: MessageEvent) => {
      if (e.data.type === 'tick') {
        lastElapsedRef.current = e.data.elapsed;
        tick(e.data.elapsed);

        // Check if countdown finished
        const state = useTimerStore.getState();
        if (
          state.timerType === 'countdown' &&
          state.status === 'running' &&
          state.seconds <= 0
        ) {
          worker.postMessage({ type: 'stop' });
          const result = completeSession();
          handleSessionComplete(result);
        }
      }
    };

    return () => {
      worker.terminate();
    };
  }, [tick, completeSession, handleSessionComplete]);

  // Start/stop worker based on status changes
  useEffect(() => {
    const worker = workerRef.current;
    if (!worker) return;

    if (status === 'running') {
      worker.postMessage({ type: 'start' });
    } else {
      worker.postMessage({ type: 'stop' });
    }
  }, [status]);

  // Handle visibility change (tab regain focus)
  const handleVisibility = useCallback(() => {
    if (document.visibilityState !== 'visible') return;
    const state = useTimerStore.getState();
    if (state.status !== 'running' || !state.sessionStartTime) return;

    const elapsed = Math.floor((Date.now() - state.sessionStartTime) / 1000);
    lastElapsedRef.current = elapsed;
    tick(elapsed);

    // Check if done — use correct duration based on mode
    const currentDuration = state.mode === 'focus' ? state.focusDuration : state.breakDuration;
    if (state.timerType === 'countdown' && elapsed >= currentDuration) {
      const worker = workerRef.current;
      worker?.postMessage({ type: 'stop' });
      const result = completeSession();
      handleSessionComplete(result);
    }
  }, [tick, completeSession, handleSessionComplete]);

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [handleVisibility]);

  return {
    status,
    mode,
    timerType,
    focusDuration,
    sessionStartTime,
  };
}
