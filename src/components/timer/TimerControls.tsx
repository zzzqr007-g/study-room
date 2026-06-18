import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
import { useTimerStore } from '@/stores/timerStore';

export function TimerControls() {
  const status = useTimerStore((s) => s.status);
  const start = useTimerStore((s) => s.start);
  const pause = useTimerStore((s) => s.pause);
  const resume = useTimerStore((s) => s.resume);
  const reset = useTimerStore((s) => s.reset);
  const skip = useTimerStore((s) => s.skip);

  const isIdle = status === 'idle';
  const isRunning = status === 'running';
  const isPaused = status === 'paused';

  return (
    <div className="flex items-center gap-4">
      {/* Reset button */}
      <button
        onClick={reset}
        disabled={isIdle}
        className="p-3 rounded-full bg-surface border border-theme-light
          hover:bg-surface-hover hover:border-[var(--accent)]/30 transition-all duration-200 cursor-pointer
          disabled:opacity-40 disabled:cursor-not-allowed"
        title="重置"
      >
        <RotateCcw className="w-5 h-5 text-primary opacity-70 hover:opacity-100 transition-opacity" />
      </button>

      {/* Play/Pause button */}
      <button
        onClick={() => {
          if (isIdle) start();
          else if (isRunning) pause();
          else if (isPaused) resume();
        }}
        className="p-5 rounded-full accent-bg text-white
          hover:opacity-90 transition-all duration-200 cursor-pointer
          shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
        style={{ backgroundColor: 'var(--accent)' }}
        title={isRunning ? '暂停' : isPaused ? '继续' : '开始'}
      >
        {isRunning ? (
          <Pause className="w-6 h-6" fill="white" />
        ) : (
          <Play className="w-6 h-6 ml-0.5" fill="white" />
        )}
      </button>

      {/* Skip button */}
      <button
        onClick={skip}
        disabled={isIdle}
        className="p-3 rounded-full bg-surface border border-theme-light
          hover:bg-surface-hover hover:border-[var(--accent)]/30 transition-all duration-200 cursor-pointer
          disabled:opacity-40 disabled:cursor-not-allowed"
        title="跳过"
      >
        <SkipForward className="w-5 h-5 text-primary opacity-70 hover:opacity-100 transition-opacity" />
      </button>
    </div>
  );
}
