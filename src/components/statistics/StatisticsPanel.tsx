import { useState, useRef } from 'react';
import { X } from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';
import { useStatisticsStore } from '@/stores/statisticsStore';
import { DailyGoal } from './DailyGoal';
import { FocusChart } from './FocusChart';
import { ExportPDFButton } from './ExportPDFButton';
import { BadgeGrid } from '@/components/achievement/BadgeGrid';
import { useAchievementStore } from '@/stores/achievementStore';
import { formatTime } from '@/utils/time';

type Tab = 'weekly' | 'daily' | 'achievements';

export function StatisticsPanel() {
  const showStatistics = useUIStore((s) => s.showStatistics);
  const toggleStatistics = useUIStore((s) => s.toggleStatistics);
  const [tab, setTab] = useState<Tab>('weekly');
  const getAllTimeTotal = useStatisticsStore((s) => s.getAllTimeTotal);
  const getStreak = useStatisticsStore((s) => s.getStreak);
  const sessions = useStatisticsStore((s) => s.sessions);
  const chartRef = useRef<HTMLDivElement>(null);
  const badges = useAchievementStore((s) => s.badges);
  const unlockedCount = badges.filter((b) => b.unlockedAt !== null).length;

  if (!showStatistics) return null;

  const totalFocusSeconds = getAllTimeTotal();
  const totalHours = Math.round(totalFocusSeconds / 3600 * 10) / 10;
  const streak = getStreak();
  const totalSessions = sessions.filter((s) => s.type === 'focus').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) toggleStatistics(); }}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      <div
        ref={chartRef}
        className="relative glass p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto animate-slide-up"
        style={{ borderRadius: '1.5rem' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-primary">
            {tab === 'achievements' ? '🏆 成就徽章' : '📊 学习统计'}
          </h3>
          <button
            onClick={toggleStatistics}
            className="p-2 rounded-xl hover:bg-surface-hover transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 text-secondary" />
          </button>
        </div>

        {/* Stats summary cards — only show on data tabs */}
        {tab !== 'achievements' && (
          <>
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-surface rounded-xl p-3 text-center border border-theme-light">
                <p className="text-2xl font-semibold text-primary">{totalHours}</p>
                <p className="text-[10px] text-tertiary mt-1">总专注(小时)</p>
              </div>
              <div className="bg-surface rounded-xl p-3 text-center border border-theme-light">
                <p className="text-2xl font-semibold text-primary">{totalSessions}</p>
                <p className="text-[10px] text-tertiary mt-1">专注次数</p>
              </div>
              <div className="bg-surface rounded-xl p-3 text-center border border-theme-light">
                <p className="text-2xl font-semibold text-primary">{streak}</p>
                <p className="text-[10px] text-tertiary mt-1">连续天数</p>
              </div>
            </div>

            <div className="mb-6">
              <DailyGoal />
            </div>
          </>
        )}

        {/* Tab toggle */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-surface border border-theme-light mb-4">
          <button
            onClick={() => setTab('weekly')}
            className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer
              ${tab === 'weekly' ? 'bg-[var(--accent)] text-white shadow-sm' : 'text-secondary hover:text-primary'}`}
            style={tab === 'weekly' ? { backgroundColor: 'var(--accent)' } : {}}
          >
            本周
          </button>
          <button
            onClick={() => setTab('daily')}
            className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer
              ${tab === 'daily' ? 'bg-[var(--accent)] text-white shadow-sm' : 'text-secondary hover:text-primary'}`}
            style={tab === 'daily' ? { backgroundColor: 'var(--accent)' } : {}}
          >
            今日
          </button>
          <button
            onClick={() => setTab('achievements')}
            className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer
              ${tab === 'achievements' ? 'bg-[var(--accent)] text-white shadow-sm' : 'text-secondary hover:text-primary'}`}
            style={tab === 'achievements' ? { backgroundColor: 'var(--accent)' } : {}}
          >
            成就 {unlockedCount}/{badges.length}
          </button>
        </div>

        {/* Tab content */}
        {tab === 'weekly' && <FocusChart />}
        {tab === 'daily' && (
          <div className="flex flex-col items-center gap-2 py-8">
            <span className="text-4xl font-light text-primary tabular-nums">
              {formatTime(useStatisticsStore.getState().getTodayTotal())}
            </span>
            <span className="text-sm text-secondary">今日专注时长</span>
          </div>
        )}
        {tab === 'achievements' && <BadgeGrid />}

        {/* Export button — only on data tabs */}
        {tab !== 'achievements' && (
          <div className="flex justify-end mt-4 pt-4 border-t border-theme-light">
            <ExportPDFButton chartRef={chartRef} />
          </div>
        )}
      </div>
    </div>
  );
}
