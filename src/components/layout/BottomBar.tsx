import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { useStatisticsStore } from '@/stores/statisticsStore';
import { useTimerStore } from '@/stores/timerStore';
import { useTodoStore } from '@/stores/todoStore';

const ENCOURAGEMENTS = [
  '深呼吸，你可以的 💪',
  '每一步都算数 🌱',
  '专注的你，闪闪发光 ✨',
  '今天的努力，明天的底气 📚',
  '慢慢来，比较快 🐢',
  '心无旁骛，万事可破 🎯',
  '此刻的专注，是最好的投资 💎',
  '你在成为更好的自己 🌿',
];

export function BottomBar() {
  const getTodayTotal = useStatisticsStore((s) => s.getTodayTotal);
  const sessions = useStatisticsStore((s) => s.sessions);
  const status = useTimerStore((s) => s.status);
  const activeTodo = useTodoStore((s) => {
    const activeId = s.activeTodoId;
    return s.todos.find((todo) => todo.id === activeId && !todo.completed);
  });

  const [phrase, setPhrase] = useState(ENCOURAGEMENTS[0]);
  const todayHours = (getTodayTotal() / 3600).toFixed(1);

  // Rotate encouragements every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPhrase(ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)]);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // Re-render when session history changes.
  void sessions;

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-3 pointer-events-none">
      {/* Left: Positive feedback */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface/85
        border border-theme-light pointer-events-auto
        transition-all duration-300 max-w-[min(520px,calc(100vw-48px))]">
        <Sparkles className="w-4 h-4 text-[var(--accent)] flex-shrink-0" />
        <span className="min-w-0 truncate text-xs text-secondary">
          今日专注 <span className="font-semibold text-primary tabular-nums">{todayHours}h</span>
          {activeTodo && (
            <span className="ml-2 text-[var(--accent)] animate-fade-in">
              当前：{activeTodo.text}
            </span>
          )}
          {!activeTodo && status === 'running' && (
            <span className="ml-2 text-[var(--accent)] animate-fade-in">● {phrase}</span>
          )}
          {!activeTodo && status !== 'running' && (
            <span className="ml-2 text-tertiary hidden sm:inline">{phrase}</span>
          )}
        </span>
      </div>

      {/* Right: Current date */}
      <div className="pointer-events-auto hidden sm:block">
        <span className="text-xs text-tertiary tabular-nums">
          {new Date().toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
          })}
        </span>
      </div>
    </footer>
  );
}
