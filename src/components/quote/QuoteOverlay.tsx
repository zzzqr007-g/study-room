import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useQuoteStore } from '@/stores/quoteStore';
import { QuoteDisplay } from './QuoteDisplay';

export function QuoteOverlay() {
  const isOpen = useQuoteStore((s) => s.isOpen);
  const close = useQuoteStore((s) => s.close);
  const next = useQuoteStore((s) => s.next);
  const prev = useQuoteStore((s) => s.prev);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    },
    [isOpen, close, next, prev]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-xl animate-fade-in">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4">
        <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider">
          名言模式
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/30">← → 切换 | ESC 退出</span>
          <button
            onClick={close}
            className="p-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
            title="退出名言模式"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>
      </div>

      {/* Quote display */}
      <QuoteDisplay />

      {/* Navigation buttons */}
      <div className="flex items-center justify-center gap-6 pb-12">
        <button
          onClick={prev}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
          title="上一条"
        >
          <ChevronLeft className="w-6 h-6 text-white/70" />
        </button>
        <button
          onClick={next}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
          title="下一条"
        >
          <ChevronRight className="w-6 h-6 text-white/70" />
        </button>
      </div>
    </div>,
    document.body
  );
}
