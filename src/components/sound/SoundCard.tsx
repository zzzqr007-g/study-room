import { Play, Pause } from 'lucide-react';
import type { SoundItem } from '@/types/sound';

interface SoundCardProps {
  sound: SoundItem;
  onToggle: (id: string) => void;
}

export function SoundCard({ sound, onToggle }: SoundCardProps) {
  return (
    <button
      onClick={() => onToggle(sound.id)}
      className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2 cursor-pointer
        transition-all duration-200 border active:scale-95
        ${sound.isPlaying
          ? 'bg-[var(--accent)]/10 border-[var(--accent)]/30 shadow-sm'
          : 'bg-surface border-theme-light hover:bg-surface-hover'
        }`}
      title={sound.isPlaying ? `关闭${sound.name}` : `播放${sound.name}`}
    >
      <span className="text-base">{sound.icon}</span>
      <span
        className={`text-xs font-medium ${
          sound.isPlaying ? 'text-[var(--accent)]' : 'text-secondary'
        }`}
      >
        {sound.name}
      </span>
      <div
        className={`hidden h-6 w-6 rounded-full items-center justify-center transition-all duration-200 sm:flex
          ${sound.isPlaying
            ? 'bg-[var(--accent)] text-white'
            : 'bg-surface border border-theme-light text-secondary'
          }`}
        style={sound.isPlaying ? { backgroundColor: 'var(--accent)' } : {}}
      >
        {sound.isPlaying ? (
          <Pause className="w-3.5 h-3.5" fill="white" />
        ) : (
          <Play className="w-3.5 h-3.5 ml-0.5" />
        )}
      </div>
    </button>
  );
}
