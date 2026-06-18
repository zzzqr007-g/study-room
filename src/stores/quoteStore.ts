import { create } from 'zustand';
import { quotes } from '@/utils/quotes';

interface QuoteState {
  isOpen: boolean;
  currentIndex: number;
  open: () => void;
  close: () => void;
  next: () => void;
  prev: () => void;
  getCurrent: () => { text: string; author: string };
}

function randomIndex(): number {
  return Math.floor(Math.random() * quotes.length);
}

export const useQuoteStore = create<QuoteState>((set, get) => ({
  isOpen: false,
  currentIndex: randomIndex(),

  open: () => set({ isOpen: true, currentIndex: randomIndex() }),
  close: () => set({ isOpen: false }),
  next: () => set((s) => ({ currentIndex: (s.currentIndex + 1) % quotes.length })),
  prev: () => set((s) => ({ currentIndex: (s.currentIndex - 1 + quotes.length) % quotes.length })),

  getCurrent: () => {
    const idx = get().currentIndex;
    return quotes[idx] ?? quotes[0];
  },
}));
