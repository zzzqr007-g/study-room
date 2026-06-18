import { X } from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';
import { BadgeGrid } from './BadgeGrid';

export function AchievementPanel() {
  const showAchievementPanel = useUIStore((s) => s.showAchievementPanel);
  const setAchievementPanel = useUIStore((s) => s.setAchievementPanel);

  if (!showAchievementPanel) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) setAchievementPanel(false); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Panel */}
      <div className="relative glass p-6 w-full max-w-md max-h-[80vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-primary">🏆 成就徽章</h3>
          <button
            onClick={() => setAchievementPanel(false)}
            className="p-2 rounded-xl hover:bg-surface-hover transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 text-secondary" />
          </button>
        </div>

        <BadgeGrid />
      </div>
    </div>
  );
}
