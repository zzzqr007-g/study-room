import type { ReactNode } from 'react';
import { TopBar } from './TopBar';
import { StudyStatusBar } from './StudyStatusBar';
import { SIDEBAR_EXPANDED_WIDTH } from '@/constants/defaults';

interface LayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
}

export function Layout({ sidebar, children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-primary transition-colors duration-400">
      {/* Video Background layer */}
      <div className="fixed inset-0 z-0" id="video-background" />

      {/* Top Bar */}
      <TopBar />

      {/* Sidebar — overlay, never pushes main content */}
      <div
        className="pointer-events-none fixed bottom-0 left-0 top-0 z-30"
        style={{ width: SIDEBAR_EXPANDED_WIDTH }}
      >
        {sidebar}
      </div>

      {/* Main Content — always centered, never shifts */}
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center">
        {children}
      </main>

      {/* Study status */}
      <StudyStatusBar />
    </div>
  );
}
