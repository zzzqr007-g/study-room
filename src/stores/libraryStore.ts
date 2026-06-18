import { create } from 'zustand';

interface LibraryState {
  isLibraryMode: boolean;
  toggle: () => void;
}

export const useLibraryStore = create<LibraryState>((set) => ({
  isLibraryMode: false,
  toggle: () => set((s) => ({ isLibraryMode: !s.isLibraryMode })),
}));
