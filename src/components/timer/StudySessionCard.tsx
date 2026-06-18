import { Target } from 'lucide-react';
import { useTimerStore } from '@/stores/timerStore';
import { useTodoStore } from '@/stores/todoStore';

export function StudySessionCard() {
  const mode = useTimerStore((s) => s.mode);
  const focusDuration = useTimerStore((s) => s.focusDuration);
  const breakDuration = useTimerStore((s) => s.breakDuration);
  const timerType = useTimerStore((s) => s.timerType);
  const activeTodo = useTodoStore((s) => {
    const activeId = s.activeTodoId;
    return s.todos.find((todo) => todo.id === activeId && !todo.completed);
  });

  const minutes = Math.round((mode === 'focus' ? focusDuration : breakDuration) / 60);

  return (
    <div className="flex w-full max-w-[300px] items-center gap-3 rounded-2xl border border-theme-light bg-surface/80 px-4 py-3">
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
        <Target className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-primary">
          {mode === 'focus'
            ? activeTodo?.text ?? '选择一个今日任务开始'
            : '休息一下，准备下一轮'}
        </p>
        <p className="mt-0.5 text-xs text-secondary">
          {mode === 'focus' ? '本轮专注' : '本轮休息'} · {timerType === 'countdown' ? `${minutes} 分钟` : '自由计时'}
        </p>
      </div>
    </div>
  );
}
