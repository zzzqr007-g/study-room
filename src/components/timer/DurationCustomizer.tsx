import { Clock } from 'lucide-react';
import { useTimerStore } from '@/stores/timerStore';
import { FOCUS_PRESETS, BREAK_PRESETS } from '@/constants/defaults';

export function DurationCustomizer() {
  const mode = useTimerStore((s) => s.mode);
  const timerType = useTimerStore((s) => s.timerType);
  const setTimerType = useTimerStore((s) => s.setTimerType);
  const focusDuration = useTimerStore((s) => s.focusDuration);
  const breakDuration = useTimerStore((s) => s.breakDuration);
  const setFocusDuration = useTimerStore((s) => s.setFocusDuration);
  const setBreakDuration = useTimerStore((s) => s.setBreakDuration);
  const status = useTimerStore((s) => s.status);

  const isIdle = status === 'idle';
  const presets = mode === 'focus' ? FOCUS_PRESETS : BREAK_PRESETS;
  const currentDuration = mode === 'focus' ? focusDuration : breakDuration;
  const setDuration = mode === 'focus' ? setFocusDuration : setBreakDuration;

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Timer type toggle */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-surface border border-theme-light">
        <button
          onClick={() => setTimerType('countdown')}
          disabled={!isIdle}
          className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer
            ${timerType === 'countdown'
              ? 'accent-bg text-white shadow-sm'
              : 'text-secondary hover:text-primary'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          style={timerType === 'countdown' ? { backgroundColor: 'var(--accent)' } : {}}
        >
          倒计时
        </button>
        <button
          onClick={() => setTimerType('stopwatch')}
          disabled={!isIdle}
          className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer
            ${timerType === 'stopwatch'
              ? 'accent-bg text-white shadow-sm'
              : 'text-secondary hover:text-primary'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          style={timerType === 'stopwatch' ? { backgroundColor: 'var(--accent)' } : {}}
        >
          正计时
        </button>
      </div>

      {/* Duration presets (only for countdown) */}
      {timerType === 'countdown' && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Clock className="w-3.5 h-3.5 text-tertiary" />
          <div className="flex flex-wrap items-center justify-center gap-1">
            {presets.map((mins) => {
              const secs = mins * 60;
              const isActive = currentDuration === secs;
              return (
                <button
                  key={mins}
                  onClick={() => setDuration(secs)}
                  disabled={!isIdle}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer
                    ${isActive
                      ? 'bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20'
                      : 'bg-surface border border-theme-light text-secondary hover:text-primary hover:bg-surface-hover'
                    }
                    disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {mins}分钟
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
