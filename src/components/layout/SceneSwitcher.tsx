import { Library, Trees } from 'lucide-react';
import { useLibraryStore } from '@/stores/libraryStore';

export function SceneSwitcher() {
  const isLibraryMode = useLibraryStore((s) => s.isLibraryMode);
  const toggleLibrary = useLibraryStore((s) => s.toggle);

  return (
    <button
      onClick={toggleLibrary}
      className="flex items-center gap-2 rounded-xl border border-theme-light bg-surface px-3 py-2 text-secondary transition-all duration-200 hover:bg-surface-hover hover:text-primary"
      title={isLibraryMode ? '切换到自然自习室' : '切换到图书馆自习室'}
    >
      {isLibraryMode ? (
        <Library className="h-4 w-4 text-[var(--accent)]" />
      ) : (
        <Trees className="h-4 w-4 text-[var(--accent)]" />
      )}
      <span className="hidden text-xs font-medium sm:inline">
        {isLibraryMode ? '图书馆' : '自然'}
      </span>
    </button>
  );
}
