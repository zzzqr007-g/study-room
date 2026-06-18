import { useState } from 'react';
import type { Badge } from '@/types/achievement';

interface BadgeCardProps {
  badge: Badge;
  onClick?: () => void;
}

export function BadgeCard({ badge, onClick }: BadgeCardProps) {
  const unlocked = badge.unlockedAt !== null;
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`flex flex-col items-center gap-2 p-4 rounded-2xl w-full
          transition-all duration-200 cursor-pointer border
          ${unlocked
            ? 'bg-surface hover:bg-surface-hover border-theme-light'
            : 'bg-surface/50 border-theme-light opacity-60 grayscale'
          }`}
      >
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl
            ${unlocked ? 'bg-[var(--accent)]/10' : 'bg-[var(--border-light)]'}`}
        >
          {badge.icon}
        </div>
        <span className={`text-xs font-medium ${unlocked ? 'text-primary' : 'text-tertiary'}`}>
          {badge.name}
        </span>
        {unlocked && badge.unlockedAt && (
          <span className="text-[10px] text-tertiary">
            {new Date(badge.unlockedAt).toLocaleDateString('zh-CN')}
          </span>
        )}
      </button>

      {/* Hover tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-10
          animate-slide-up pointer-events-none">
          <div className="bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs
            px-3 py-2 rounded-xl shadow-lg whitespace-nowrap max-w-48">
            <p className="font-medium">{badge.name}</p>
            <p className="opacity-80 mt-0.5">{badge.description}</p>
            {unlocked ? (
              <p className="text-[10px] mt-1 opacity-60">✅ 已解锁</p>
            ) : (
              <p className="text-[10px] mt-1 opacity-60">🔒 未解锁</p>
            )}
          </div>
          {/* Arrow */}
          <div className="absolute left-1/2 -translate-x-1/2 top-full
            w-0 h-0 border-l-4 border-r-4 border-t-4
            border-l-transparent border-r-transparent
            border-t-[var(--text-primary)]" />
        </div>
      )}
    </div>
  );
}
