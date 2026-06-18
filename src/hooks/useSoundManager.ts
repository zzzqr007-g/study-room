import { useEffect, useRef } from 'react';
import { useSoundStore } from '@/stores/soundStore';

export function useSoundManager() {
  const sounds = useSoundStore((s) => s.sounds);
  const volume = useSoundStore((s) => s.volume);
  const audioRefs = useRef<Map<string, HTMLAudioElement>>(new Map());

  // Create audio elements lazily
  const getAudio = (id: string, file: string): HTMLAudioElement => {
    if (!audioRefs.current.has(id)) {
      const audio = new Audio(file);
      audio.loop = true;
      audio.volume = volume;
      audioRefs.current.set(id, audio);
    }
    return audioRefs.current.get(id)!;
  };

  // Sync play/pause state
  useEffect(() => {
    sounds.forEach((sound) => {
      const audio = getAudio(sound.id, sound.file);
      if (sound.isPlaying) {
        // Pause all other sounds first
        audioRefs.current.forEach((a, key) => {
          if (key !== sound.id) {
            a.pause();
            a.currentTime = 0;
          }
        });
        audio.play().catch(() => {
          // Autoplay blocked — user needs to interact first
          // This is expected; the toggle button click provides the interaction
        });
      } else {
        audio.pause();
      }
    });
  }, [sounds]);

  // Sync volume
  useEffect(() => {
    audioRefs.current.forEach((audio) => {
      audio.volume = volume;
    });
  }, [volume]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      audioRefs.current.forEach((audio) => {
        audio.pause();
        audio.src = '';
      });
      audioRefs.current.clear();
    };
  }, []);
}
