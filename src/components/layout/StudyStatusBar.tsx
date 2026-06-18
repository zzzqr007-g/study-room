import { CalendarDays, Target } from 'lucide-react';
import { useStatisticsStore } from '@/stores/statisticsStore';
import { useTodoStore } from '@/stores/todoStore';

export function StudyStatusBar() {
  const getTodayTotal = useStatisticsStore((s) => s.getTodayTotal);
  const dailyGoal = useStatisticsStore((s) => s.dailyGoal);
  const sessions = useStatisticsStore((s) => s.sessions);
  const activeTodo = useTodoStore((s) => {
    const activeId = s.activeTodoId;
    return s.todos.find((todo) => todo.id === activeId && !todo.completed);
  });

  void sessions;

  const todaySeconds = getTodayTotal();
  const todayHours = (todaySeconds / 3600).toFixed(1);
  const goalMinutes = Math.max(1, dailyGoal);
  const progress = Math.min(100, Math.round((todaySeconds / 60 / goalMinutes) * 100));

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-center px-4 py-3 pointer-events-none sm:justify-between sm:px-6">
      <div className="pointer-events-auto flex max-w-[min(620px,calc(100vw-32px))] items-center gap-3 rounded-2xl border border-theme-light bg-surface/85 px-3 py-2 shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 flex-shrink-0 text-[var(--accent)]" />
          <span className="text-xs text-secondary">
            今日 <span className="font-semibold tabular-nums text-primary">{todayHours}h</span>
          </span>
        </div>
        <div className="hidden h-4 w-px bg-[var(--border)] sm:block" />
        <div className="hidden items-center gap-2 sm:flex">
          <div className="h-1.5 w-20 overflow-hidden rounded-full bg-[var(--border)]">
            <div
              className="h-full rounded-full bg-[var(--accent)] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-secondary">{progress}%</span>
        </div>
        <div className="min-w-0 flex-1">
          <span className="block truncate text-xs text-secondary">
            {activeTodo ? (
              <>
                当前：<span className="font-medium text-[var(--accent)]">{activeTodo.text}</span>
              </>
            ) : (
              '选择今日任务后开始专注'
            )}
          </span>
        </div>
      </div>

      <div className="pointer-events-auto hidden items-center gap-2 text-xs text-tertiary lg:flex">
        <CalendarDays className="h-3.5 w-3.5" />
        {new Date().toLocaleDateString('zh-CN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'long',
        })}
      </div>
    </footer>
  );
}
