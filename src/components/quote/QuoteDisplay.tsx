import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useQuoteStore } from '@/stores/quoteStore';

export function QuoteDisplay() {
  const getCurrent = useQuoteStore((s) => s.getCurrent);
  const [quote, setQuote] = useState(getCurrent());
  const [key, setKey] = useState(0);

  // Subscribe to index changes
  useEffect(() => {
    const unsub = useQuoteStore.subscribe((state) => {
      setQuote(state.getCurrent());
      setKey((k) => k + 1);
    });
    return unsub;
  }, []);

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-6 text-center"
        >
          <p className="text-3xl md:text-4xl font-light text-white/90 leading-relaxed max-w-2xl">
            "{quote.text}"
          </p>
          <p className="text-lg text-white/50 font-medium">
            — {quote.author}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
