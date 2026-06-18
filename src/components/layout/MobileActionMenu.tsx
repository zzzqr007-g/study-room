import { BarChart3, Expand, Minimize, Quote, X } from 'lucide-react';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { SceneSwitcher } from './SceneSwitcher';
import { useQuoteStore } from '@/stores/quoteStore';
import { useUIStore } from '@/stores/uiStore';

interface MobileActionMenuProps {
  onFullscreen: () => void;
}

export function MobileActionMenu({ onFullscreen }: MobileActionMenuProps) {
  const isFullscreen = useUIStore((s) => s.isFullscreen);
  const showMobileMenu = useUIStore((s) => s.showMobileMenu);
  const setMobileMenu = useUIStore((s) => s.setMobileMenu);
  const setStatistics = useUIStore((s) => s.setStatistics);
  const setSidebarExpanded = useUIStore((s) => s.setSidebarExpanded);
  const openQuote = useQuoteStore((s) => s.open);

  if (!showMobileMenu) return null;

  const close = () => setMobileMenu(false);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm md:hidden"
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="absolute left-3 right-3 top-3 glass p-3">
        <div className="mb-3 flex items-center justify-between px-1">
          <span className="text-sm font-semibold text-primary">学习菜单</span>
          <button
            onClick={close}
            className="rounded-lg p-2 text-secondary transition-colors hover:bg-surface-hover hover:text-primary"
            title="关闭菜单"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              setSidebarExpanded(true);
              close();
            }}
            className="rounded-xl border border-theme-light bg-surface px-3 py-3 text-left text-sm font-medium text-primary transition-colors hover:bg-surface-hover"
          >
            今日任务
          </button>
          <SceneSwitcher />
          <button
            onClick={() => {
              setStatistics(true);
              close();
            }}
            className="flex items-center gap-2 rounded-xl border border-theme-light bg-surface px-3 py-3 text-sm font-medium text-secondary transition-colors hover:bg-surface-hover hover:text-primary"
          >
            <BarChart3 className="h-4 w-4" />
            统计
          </button>
          <button
            onClick={() => {
              openQuote();
              close();
            }}
            className="flex items-center gap-2 rounded-xl border border-theme-light bg-surface px-3 py-3 text-sm font-medium text-secondary transition-colors hover:bg-surface-hover hover:text-primary"
          >
            <Quote className="h-4 w-4" />
            名言
          </button>
          <div className="contents [&>button]:justify-start [&>button]:py-3">
            <ThemeToggle />
          </div>
          <button
            onClick={() => {
              onFullscreen();
              close();
            }}
            className="flex items-center gap-2 rounded-xl border border-theme-light bg-surface px-3 py-3 text-sm font-medium text-secondary transition-colors hover:bg-surface-hover hover:text-primary"
          >
            {isFullscreen ? <Minimize className="h-4 w-4" /> : <Expand className="h-4 w-4" />}
            {isFullscreen ? '退出全屏' : '全屏'}
          </button>
        </div>
      </div>
    </div>
  );
}
