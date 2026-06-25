import type { TimerMode } from '@/types/timer';
import { useStatisticsStore } from '@/stores/statisticsStore';
import { useTodoStore } from '@/stores/todoStore';
import { useUIStore } from '@/stores/uiStore';
import { getTodayKey } from '@/utils/time';

interface CompletedSession {
  mode: TimerMode;
  duration: number;
}

export function recordCompletedSession(result: CompletedSession | null) {
  if (!result || result.mode !== 'focus' || result.duration <= 0) return;

  const now = Date.now();
  const todoState = useTodoStore.getState();
  const activeTodo = todoState.todos.find(
    (todo) => todo.id === todoState.activeTodoId && !todo.completed
  );

  useStatisticsStore.getState().recordSession({
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
}
