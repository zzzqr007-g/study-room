import { useTimerStore } from '@/stores/timerStore';
import { useTodoStore } from '@/stores/todoStore';
import { formatTime } from '@/utils/time';

export function TimerDisplay() {
  const seconds = useTimerStore((s) => s.seconds);
  const mode = useTimerStore((s) => s.mode);
  const status = useTimerStore((s) => s.status);
  const timerType = useTimerStore((s) => s.timerType);
  const focusDuration = useTimerStore((s) => s.focusDuration);
  const breakDuration = useTimerStore((s) => s.breakDuration);
  const activeTodo = useTodoStore((s) => {
    const activeId = s.activeTodoId;
    return s.todos.find((todo) => todo.id === activeId && !todo.completed);
  });

  const totalDuration = mode === 'focus' ? focusDuration : breakDuration;

  // For SVG ring calculation
  const progress = timerType === 'countdown'
    ? totalDuration > 0 ? Math.max(0, seconds / totalDuration) : 1
    : totalDuration > 0 ? Math.min(1, seconds / totalDuration) : 0;

  const radius = 130;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  const isRunning = status === 'running';
  const isBreak = mode === 'break';
  const ringColor = isBreak ? 'var(--success)' : 'var(--accent)';

  return (
    <div className="relative flex items-center justify-center">
      {/* Background glow when running */}
      {isRunning && (
        <div
          className="absolute rounded-full blur-3xl opacity-20 transition-all duration-500"
          style={{
            width: 280,
            height: 280,
            backgroundColor: isBreak ? 'var(--success)' : 'var(--accent)',
          }}
        />
      )}

      <svg
        width="min(250px, calc(100vw - 128px))"
        height="min(250px, calc(100vw - 128px))"
        viewBox="0 0 300 300"
        className="transform -rotate-90 drop-shadow-lg"
      >
        {/* Background circle */}
        <circle
          cx="150"
          cy="150"
          r={radius}
          fill="none"
          stroke="var(--border-light)"
          strokeWidth="6"
        />
        {/* Progress circle */}
        <circle
          cx="150"
          cy="150"
          r={radius}
          fill="none"
          stroke={ringColor}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.3s ease, stroke 0.5s ease' }}
        />
      </svg>

      {/* Center text */}
      <div className="absolute flex max-w-[230px] flex-col items-center gap-1 select-none text-center">
        {mode === 'focus' && activeTodo && (
          <span className="mb-1 max-w-full truncate rounded-full bg-[var(--accent)]/10 px-3 py-1 text-xs font-medium text-[var(--accent)]">
            正在专注：{activeTodo.text}
          </span>
        )}
        <span
          className="text-5xl font-light tabular-nums tracking-tight sm:text-6xl"
          style={{
            color: 'var(--text-primary)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {formatTime(seconds)}
        </span>
        <span className="text-sm font-medium text-secondary tracking-wide">
          {mode === 'focus' ? '专注' : '休息'}
          {timerType === 'stopwatch' && status === 'running' && ' · 计时中'}
        </span>
        {/* Pulse indicator when running */}
        {isRunning && (
          <span className="text-xs text-tertiary mt-1">
            {timerType === 'countdown'
              ? mode === 'focus'
                ? '保持专注...'
                : '放松一下...'
              : '自由计时中'}
          </span>
        )}
      </div>
    </div>
  );
}
