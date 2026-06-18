import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useAchievementStore } from '@/stores/achievementStore';

export function AchievementNotification() {
  const recentUnlock = useAchievementStore((s) => s.recentUnlock);
  const dismissNotification = useAchievementStore((s) => s.dismissNotification);

  // Auto-dismiss after 4 seconds
  useEffect(() => {
    if (recentUnlock) {
      const timer = setTimeout(dismissNotification, 4000);
      return () => clearTimeout(timer);
    }
  }, [recentUnlock, dismissNotification]);

  return (
    <AnimatePresence>
      {recentUnlock && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 glass px-5 py-4
            flex items-center gap-3 border border-[var(--accent)]/30 shadow-lg"
          style={{ borderRadius: '1.25rem' }}
        >
          <div className="w-12 h-12 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-2xl">
            {recentUnlock.icon}
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold text-primary">
              新成就解锁！
            </span>
            <span className="text-xs text-secondary">
              {recentUnlock.name} — {recentUnlock.description}
            </span>
          </div>
          <button
            onClick={dismissNotification}
            className="p-1.5 rounded-lg hover:bg-surface-hover transition-colors cursor-pointer ml-1"
          >
            <X className="w-3.5 h-3.5 text-tertiary" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
