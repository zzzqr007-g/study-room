import { useTimerStore } from '@/stores/timerStore';
import { TimerDisplay } from './TimerDisplay';
import { TimerControls } from './TimerControls';
import { DurationCustomizer } from './DurationCustomizer';
import { StudySessionCard } from './StudySessionCard';

export function PomodoroTimer() {
  const mode = useTimerStore((s) => s.mode);
  const setMode = useTimerStore((s) => s.setMode);
  const status = useTimerStore((s) => s.status);

  const isIdle = status === 'idle';

  return (
    <div className="glass flex w-[min(380px,calc(100vw-96px))] flex-col items-center gap-5 p-6 sm:w-auto sm:p-7 animate-slide-up">
      {/* Mode selector */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-surface border border-theme-light">
        <button
          onClick={() => setMode('focus')}
          disabled={!isIdle}
          className={`px-5 py-2 sm:px-6 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer
            ${mode === 'focus'
              ? 'bg-[var(--accent)] text-white shadow-sm'
              : 'text-secondary hover:text-primary'
            }
            disabled:opacity-50 disabled:cursor-not-allowed`}
          style={mode === 'focus' ? { backgroundColor: 'var(--accent)' } : {}}
        >
          🍅 专注
        </button>
        <button
          onClick={() => setMode('break')}
          disabled={!isIdle}
          className={`px-5 py-2 sm:px-6 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer
            ${mode === 'break'
              ? 'bg-[var(--success)] text-white shadow-sm'
              : 'text-secondary hover:text-primary'
            }
            disabled:opacity-50 disabled:cursor-not-allowed`}
          style={mode === 'break' ? { backgroundColor: 'var(--success)' } : {}}
        >
          ☕ 休息
        </button>
      </div>

      <StudySessionCard />

      {/* Timer display */}
      <TimerDisplay />

      {/* Controls */}
      <TimerControls />

      {/* Duration customizer */}
      <DurationCustomizer />
    </div>
  );
}
