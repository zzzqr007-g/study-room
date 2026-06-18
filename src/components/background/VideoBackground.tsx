import { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useLibraryStore } from '@/stores/libraryStore';

const FOREST_VIDEOS = {
  light: 'videos/forest-rain.mp4',
  dark: 'videos/night-forest.mp4',
};

const LIBRARY_VIDEOS = {
  light: 'videos/library-day.mp4',
  dark: 'videos/library-night.mp4',
};

export function VideoBackground() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { effective } = useTheme();
  const isLibraryMode = useLibraryStore((s) => s.isLibraryMode);

  const videos = isLibraryMode ? LIBRARY_VIDEOS : FOREST_VIDEOS;
  const videoPath = effective === 'dark' ? videos.dark : videos.light;
  const videoSrc = `${import.meta.env.BASE_URL}${videoPath}`;

  if (error) {
    return (
      <div className="absolute inset-0 bg-primary transition-colors duration-1000" />
    );
  }

  return (
    <>
      <div className="absolute inset-0 bg-primary transition-colors duration-1000" />
      <video
        key={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000
          ${loaded ? 'opacity-30' : 'opacity-0'}`}
        onCanPlayThrough={() => setLoaded(true)}
        onError={() => setError(true)}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-primary/45" />
    </>
  );
}
