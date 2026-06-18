import { useState } from 'react';
import { ChevronDown, Volume2, X } from 'lucide-react';
import { useSoundStore } from '@/stores/soundStore';
import { useSoundManager } from '@/hooks/useSoundManager';
import { SoundCard } from './SoundCard';
import { VolumeControl } from './VolumeControl';

export function AmbientSoundPlayer() {
  const sounds = useSoundStore((s) => s.sounds);
  const volume = useSoundStore((s) => s.volume);
  const toggleSound = useSoundStore((s) => s.toggleSound);
  const [isOpen, setIsOpen] = useState(false);

  // Initialize audio elements
  useSoundManager();

  const anyPlaying = sounds.some((s) => s.isPlaying);
  const activeSounds = sounds.filter((s) => s.isPlaying).map((s) => s.name).join(' + ');

  return (
    <div className="relative transition-all duration-300 ease-out">
      {/* Collapsed state */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="glass flex max-w-[340px] items-center gap-3 px-4 py-2.5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)]/30"
          title="打开环境音"
        >
          <Volume2
            className={`h-4 w-4 flex-shrink-0 ${anyPlaying ? 'text-[var(--accent)]' : 'text-tertiary'}`}
          />
          <span className="min-w-0 flex-1 truncate text-xs font-medium text-secondary">
            {anyPlaying ? activeSounds : '环境音'}
          </span>
          <span className="hidden text-[11px] tabular-nums text-tertiary sm:inline">
            {Math.round(volume * 100)}%
          </span>
          {anyPlaying && (
            <span className="h-2 w-2 flex-shrink-0 rounded-full bg-[var(--accent)] animate-pulse" />
          )}
          <ChevronDown className="h-4 w-4 flex-shrink-0 text-tertiary" />
        </button>
      )}

      {/* Expanded on click */}
      {isOpen && (
        <div className="glass flex w-[min(360px,calc(100vw-48px))] flex-col items-center gap-3 p-4 animate-slide-up">
          <div className="flex w-full items-center justify-between gap-4">
            <span className="text-xs font-medium uppercase tracking-wider text-secondary">
              环境音
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1.5 text-tertiary transition-colors hover:bg-surface-hover hover:text-primary"
              title="收起环境音"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-3">
            {sounds.map((sound) => (
              <SoundCard key={sound.id} sound={sound} onToggle={toggleSound} />
            ))}
          </div>
          <VolumeControl />
        </div>
      )}
    </div>
  );
}
