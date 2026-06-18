import { Volume2, Volume1, VolumeX } from 'lucide-react';
import { useSoundStore } from '@/stores/soundStore';

export function VolumeControl() {
  const volume = useSoundStore((s) => s.volume);
  const setVolume = useSoundStore((s) => s.setVolume);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setVolume(volume > 0 ? 0 : 0.5)}
        className="p-1.5 rounded-lg hover:bg-surface-hover transition-colors cursor-pointer"
        title={volume > 0 ? '静音' : '取消静音'}
      >
        {volume === 0 && <VolumeX className="w-4 h-4 text-secondary" />}
        {volume > 0 && volume < 0.5 && <Volume1 className="w-4 h-4 text-secondary" />}
        {volume >= 0.5 && <Volume2 className="w-4 h-4 text-secondary" />}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.05"
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        className="w-20 h-1 rounded-full appearance-none cursor-pointer
          bg-[var(--border)] accent-[var(--accent)]"
        style={{
          WebkitAppearance: 'none',
          appearance: 'none',
          background: `linear-gradient(to right, var(--accent) ${volume * 100}%, var(--border) ${volume * 100}%)`,
        }}
        title={`音量: ${Math.round(volume * 100)}%`}
      />
    </div>
  );
}
