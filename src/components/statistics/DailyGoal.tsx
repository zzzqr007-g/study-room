import { useState } from 'react';
import { Pencil } from 'lucide-react';
import { useStatisticsStore } from '@/stores/statisticsStore';

export function DailyGoal() {
  const dailyGoal = useStatisticsStore((s) => s.dailyGoal);
  const setDailyGoal = useStatisticsStore((s) => s.setDailyGoal);
  const getTodayTotal = useStatisticsStore((s) => s.getTodayTotal);
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(String(dailyGoal));

  const todayMinutes = Math.round(getTodayTotal() / 60);
  const progress = dailyGoal > 0 ? Math.min(1, todayMinutes / dailyGoal) : 0;
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  const handleSave = () => {
    const num = parseInt(value, 10);
    if (num > 0 && num <= 600) {
      setDailyGoal(num);
    }
    setEditing(false);
  };

  return (
    <div className="flex items-center gap-4">
      {/* Progress ring */}
      <div className="relative w-20 h-20 flex-shrink-0">
        <svg width="80" height="80" viewBox="0 0 80 80" className="transform -rotate-90">
          <circle cx="40" cy="40" r={radius} fill="none" stroke="var(--border-light)" strokeWidth="5" />
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-semibold text-primary">{todayMinutes}</span>
          <span className="text-[10px] text-tertiary">/ {dailyGoal}分</span>
        </div>
      </div>

      {/* Label and edit */}
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-primary">今日目标</span>
        {editing ? (
          <div className="flex items-center gap-1">
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
                if (e.key === 'Escape') setEditing(false);
              }}
              className="w-16 text-sm bg-surface border border-[var(--accent)] rounded-lg px-2 py-0.5
                text-primary outline-none"
              min="1"
              max="600"
              autoFocus
            />
            <span className="text-xs text-tertiary">分钟</span>
          </div>
        ) : (
          <button
            onClick={() => {
              setValue(String(dailyGoal));
              setEditing(true);
            }}
            className="flex items-center gap-1 text-xs text-tertiary hover:text-secondary transition-colors cursor-pointer"
          >
            <span>{dailyGoal} 分钟</span>
            <Pencil className="w-3 h-3" />
          </button>
        )}
        {progress >= 1 && (
          <span className="text-xs font-medium text-[var(--success)]">🎉 已完成目标!</span>
        )}
      </div>
    </div>
  );
}
