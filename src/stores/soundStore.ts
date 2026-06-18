import { create } from 'zustand';
import type { SoundItem } from '@/types/sound';

interface SoundState {
  sounds: SoundItem[];
  volume: number;
  toggleSound: (id: string) => void;
  setVolume: (vol: number) => void;
}

function loadVolume(): number {
  try {
    const saved = localStorage.getItem('sound-settings');
    if (saved) return JSON.parse(saved).volume ?? 0.5;
  } catch { /* ignore */ }
  return 0.5;
}

function saveVolume(volume: number) {
  try {
    localStorage.setItem('sound-settings', JSON.stringify({ volume }));
  } catch { /* ignore */ }
}

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const defaultSounds: SoundItem[] = [
  { id: 'rain', name: '雨声', icon: '🌧️', file: assetUrl('sounds/rain-loop.wav'), isPlaying: false },
  { id: 'cafe', name: '咖啡馆', icon: '☕', file: assetUrl('sounds/cafe.mp3'), isPlaying: false },
  { id: 'campfire', name: '篝火', icon: '🔥', file: assetUrl('sounds/campfire.mp3'), isPlaying: false },
];

export const useSoundStore = create<SoundState>((set) => ({
  sounds: defaultSounds.map((s) => ({ ...s })),
  volume: loadVolume(),

  toggleSound: (id) =>
    set((state) => ({
      sounds: state.sounds.map((s) =>
        s.id === id ? { ...s, isPlaying: !s.isPlaying } : s
      ),
    })),

  setVolume: (vol) => {
    saveVolume(vol);
    set({ volume: vol });
  },
}));
