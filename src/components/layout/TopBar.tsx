import { Expand, Menu, Minimize, BarChart3, Quote } from 'lucide-react';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useUIStore } from '@/stores/uiStore';
import { useQuoteStore } from '@/stores/quoteStore';
import { useLibraryStore } from '@/stores/libraryStore';
import { SceneSwitcher } from './SceneSwitcher';
import { MobileActionMenu } from './MobileActionMenu';

export function TopBar() {
  const isFullscreen = useUIStore((s) => s.isFullscreen);
  const setFullscreen = useUIStore((s) => s.setFullscreen);
  const toggleStatistics = useUIStore((s) => s.toggleStatistics);
  const toggleMobileMenu = useUIStore((s) => s.toggleMobileMenu);
  const openQuote = useQuoteStore((s) => s.open);
  const isLibraryMode = useLibraryStore((s) => s.isLibraryMode);

  const handleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setFullscreen(true);
      } else {
        await document.exitFullscreen();
        setFullscreen(false);
      }
    } catch { /* Fullscreen API not supported */ }
  };

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between px-4 py-3 pointer-events-none sm:px-6">
        <div className="pointer-events-auto">
          <h1 className="select-none text-lg font-semibold tracking-tight text-primary">
            {isLibraryMode ? '📚 图书馆自习室' : '🌿 自然自习室'}
          </h1>
        </div>

        <button
          onClick={toggleMobileMenu}
          className="pointer-events-auto rounded-xl border border-theme-light bg-surface p-2.5 text-secondary transition-colors hover:bg-surface-hover hover:text-primary md:hidden"
          title="打开学习菜单"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="pointer-events-auto hidden items-center gap-2 md:flex">
          <div className="flex items-center gap-2 rounded-2xl bg-surface/50 p-1">
            <SceneSwitcher />
          </div>

          <div className="flex items-center gap-2 rounded-2xl bg-surface/50 p-1">
            <button
              onClick={toggleStatistics}
              className="flex items-center gap-2 rounded-xl border border-theme-light bg-surface px-3 py-2 transition-all duration-200 hover:bg-surface-hover"
              title="统计与成就"
            >
              <BarChart3 className="h-4 w-4 text-secondary" />
              <span className="text-xs font-medium text-secondary">统计</span>
            </button>
            <button
              onClick={openQuote}
              className="flex items-center gap-2 rounded-xl border border-theme-light bg-surface px-3 py-2 transition-all duration-200 hover:bg-surface-hover"
              title="名言模式"
            >
              <Quote className="h-4 w-4 text-secondary" />
              <span className="text-xs font-medium text-secondary">名言</span>
            </button>
          </div>

          <div className="flex items-center gap-2 rounded-2xl bg-surface/50 p-1">
            <ThemeToggle />
            <button
              onClick={handleFullscreen}
              className="flex items-center gap-2 rounded-xl border border-theme-light bg-surface px-3 py-2 transition-all duration-200 hover:bg-surface-hover"
              title={isFullscreen ? '退出全屏' : '全屏模式'}
            >
              {isFullscreen ? (
                <Minimize className="h-4 w-4 text-secondary" />
              ) : (
                <Expand className="h-4 w-4 text-secondary" />
              )}
            </button>
          </div>
        </div>
      </header>
      <MobileActionMenu onFullscreen={handleFullscreen} />
    </>
  );
}
