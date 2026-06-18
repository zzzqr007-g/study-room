import { useAchievementStore } from '@/stores/achievementStore';
import { BadgeCard } from './BadgeCard';

export function BadgeGrid() {
  const badges = useAchievementStore((s) => s.badges);
  const unlockedCount = badges.filter((b) => b.unlockedAt !== null).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-medium text-secondary">
          已解锁 {unlockedCount}/{badges.length}
        </h4>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {badges.map((badge) => (
          <BadgeCard key={badge.id} badge={badge} />
        ))}
      </div>
    </div>
  );
}
