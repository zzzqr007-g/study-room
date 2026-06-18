import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { useTimer } from '@/hooks/useTimer';
import { Layout } from '@/components/layout/Layout';
import { PomodoroTimer } from '@/components/timer/PomodoroTimer';
import { SessionSummaryModal } from '@/components/timer/SessionSummaryModal';
import { TodoSidebar } from '@/components/todo/TodoSidebar';
import { AmbientSoundPlayer } from '@/components/sound/AmbientSoundPlayer';
import { StatisticsPanel } from '@/components/statistics/StatisticsPanel';
import { VideoBackground } from '@/components/background/VideoBackground';
import { ParticleEffect } from '@/components/background/ParticleEffect';
import { QuoteOverlay } from '@/components/quote/QuoteOverlay';
import { AchievementNotification } from '@/components/achievement/AchievementNotification';
import { PWAInstallPrompt } from '@/components/common/PWAInstallPrompt';
import { useAchievementStore } from '@/stores/achievementStore';
import { useStatisticsStore } from '@/stores/statisticsStore';
import { useUIStore } from '@/stores/uiStore';
import { useTimerStore } from '@/stores/timerStore';

function App() {
  useTheme();
  useTimer();

  useEffect(() => {
    const handler = () => {
      useUIStore.getState().setFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  const sessions = useStatisticsStore((s) => s.sessions);
  useEffect(() => {
    if (sessions.length > 0) {
      useAchievementStore.getState().checkAchievements();
    }
  }, [sessions.length]);

  const timerStatus = useTimerStore((s) => s.status);
  const isRunning = timerStatus === 'running';

  return (
    <>
      {/* Background layer — always visible */}
      <div className="fixed inset-0 z-0">
        <VideoBackground />
        <ParticleEffect />
      </div>

      {/* Center focus backdrop — only when timer is idle/paused */}
      <AnimatePresence>
        {!isRunning && (
          <motion.div
            key="blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-5 flex items-center justify-center pointer-events-none px-4"
          >
            <div
              className="rounded-[2rem] pointer-events-none"
              style={{
                width: 'min(460px, calc(100vw - 32px))',
                height: 'min(560px, calc(100vh - 120px))',
                background: 'rgba(0, 0, 0, 0.08)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main layout — center timer when idle/paused */}
      <Layout sidebar={<TodoSidebar />}>
        <AnimatePresence mode="wait">
          {!isRunning && (
            <motion.div
              key="center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-4 px-4 py-14"
            >
              <PomodoroTimer />
              <AmbientSoundPlayer />
            </motion.div>
          )}
        </AnimatePresence>
      </Layout>

      {/* Compact timer in bottom-right corner — only when running */}
      <AnimatePresence>
        {isRunning && (
          <motion.div
            key="corner"
            initial={{ opacity: 0, scale: 0.85, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 24 }}
            transition={{ type: 'spring', stiffness: 250, damping: 26 }}
            className="fixed bottom-6 right-6 z-20 flex flex-col items-center gap-2"
            style={{ transformOrigin: 'bottom right' }}
          >
            <div style={{ transform: 'scale(0.68)', transformOrigin: 'bottom right' }}>
              <PomodoroTimer />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlays and modals */}
      <StatisticsPanel />
      <QuoteOverlay />
      <SessionSummaryModal />
      <AchievementNotification />
      <PWAInstallPrompt />
    </>
  );
}

export default App;
