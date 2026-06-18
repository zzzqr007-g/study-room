import { Check, Repeat, TimerReset, X } from 'lucide-react';
import { useTimerStore } from '@/stores/timerStore';
import { useTodoStore } from '@/stores/todoStore';
import { useUIStore } from '@/stores/uiStore';
import { formatTime } from '@/utils/time';

export function SessionSummaryModal() {
  const showSessionSummary = useUIStore((s) => s.showSessionSummary);
  const completedFocusSession = useUIStore((s) => s.completedFocusSession);
  const dismissSessionSummary = useUIStore((s) => s.dismissSessionSummary);
  const setSidebarExpanded = useUIStore((s) => s.setSidebarExpanded);
  const setMode = useTimerStore((s) => s.setMode);
  const start = useTimerStore((s) => s.start);
  const toggleTodo = useTodoStore((s) => s.toggleTodo);

  if (!showSessionSummary || !completedFocusSession) return null;

  const taskText = completedFocusSession.taskText ?? '自由专注';

  const startFocusAgain = () => {
    setMode('focus');
    start();
    dismissSessionSummary();
  };

  const startBreak = () => {
    start();
    dismissSessionSummary();
  };

  const switchTask = () => {
    setMode('focus');
    setSidebarExpanded(true);
    dismissSessionSummary();
  };

  const completeTask = () => {
    if (completedFocusSession.taskId) {
      toggleTodo(completedFocusSession.taskId);
    }
    dismissSessionSummary();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4 backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === event.currentTarget) dismissSessionSummary();
      }}
    >
      <div className="glass w-full max-w-sm p-5 animate-slide-up">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[var(--accent)]">
              专注完成
            </p>
            <h2 className="mt-1 text-xl font-semibold text-primary">
              这一轮很稳
            </h2>
          </div>
          <button
            onClick={dismissSessionSummary}
            className="rounded-xl p-2 text-secondary transition-colors hover:bg-surface-hover hover:text-primary"
            title="关闭"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-5 rounded-2xl border border-theme-light bg-surface p-4">
          <p className="truncate text-sm font-semibold text-primary">{taskText}</p>
          <p className="mt-2 text-3xl font-light tabular-nums text-primary">
            {formatTime(completedFocusSession.duration)}
          </p>
          <p className="mt-1 text-xs text-secondary">已记录到今日专注</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={completeTask}
            disabled={!completedFocusSession.taskId}
            className="flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-3 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-45"
          >
            <Check className="h-4 w-4" />
            标记完成
          </button>
          <button
            onClick={startFocusAgain}
            className="flex items-center justify-center gap-2 rounded-xl border border-theme-light bg-surface px-3 py-3 text-sm font-medium text-primary transition-colors hover:bg-surface-hover"
          >
            <Repeat className="h-4 w-4" />
            再来一轮
          </button>
          <button
            onClick={startBreak}
            className="flex items-center justify-center gap-2 rounded-xl border border-theme-light bg-surface px-3 py-3 text-sm font-medium text-primary transition-colors hover:bg-surface-hover"
          >
            <TimerReset className="h-4 w-4" />
            休息一下
          </button>
          <button
            onClick={switchTask}
            className="rounded-xl border border-theme-light bg-surface px-3 py-3 text-sm font-medium text-primary transition-colors hover:bg-surface-hover"
          >
            换任务
          </button>
        </div>
      </div>
    </div>
  );
}
