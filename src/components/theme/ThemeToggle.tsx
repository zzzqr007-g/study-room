import { Sun, Moon, Monitor } from 'lucide-react';
import { useThemeStore } from '@/stores/themeStore';
import type { ThemeMode } from '@/types/theme';

const icons: Record<ThemeMode, typeof Sun> = {
  light: Sun,
  dark: Moon,
  auto: Monitor,
};

const labels: Record<ThemeMode, string> = {
  light: '浅色',
  dark: '深色',
  auto: '自动',
};

export function ThemeToggle() {
  const mode = useThemeStore((s) => s.mode);
  const toggle = useThemeStore((s) => s.toggle);

  const Icon = icons[mode];

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface
        border border-theme-light hover:bg-surface-hover
        transition-all duration-200 cursor-pointer group"
      title={`当前: ${labels[mode]} — 点击切换`}
    >
      <Icon className="w-4 h-4 text-secondary group-hover:text-primary transition-colors" />
      <span className="text-xs font-medium text-secondary group-hover:text-primary transition-colors">
        {labels[mode]}
      </span>
    </button>
  );
}
