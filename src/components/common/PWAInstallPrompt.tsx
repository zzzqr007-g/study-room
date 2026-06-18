import { useEffect } from 'react';
import { Download } from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';

export function PWAInstallPrompt() {
  const showPWAInstall = useUIStore((s) => s.showPWAInstall);
  const setPWAInstall = useUIStore((s) => s.setPWAInstall);

  // Listen for beforeinstallprompt
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setPWAInstall(true);
      // Store event for later use
      (window as unknown as Record<string, unknown>).__pwaInstallEvent = e;
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, [setPWAInstall]);

  if (!showPWAInstall) return null;

  const handleInstall = async () => {
    const event = (window as unknown as Record<string, Event | undefined>).__pwaInstallEvent;
    if (event) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (event as any).prompt();
    }
    setPWAInstall(false);
  };

  return (
    <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-40 glass px-5 py-3
      flex items-center gap-4 animate-slide-up shadow-lg" style={{ borderRadius: '1rem' }}>
      <Download className="w-4 h-4 text-secondary" />
      <div className="flex flex-col">
        <span className="text-sm font-medium text-primary">安装到桌面</span>
        <span className="text-xs text-tertiary">快捷打开自习室</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={handleInstall}
          className="px-3 py-1.5 rounded-lg bg-[var(--accent)] text-white text-xs font-medium
            hover:opacity-90 transition-opacity cursor-pointer"
          style={{ backgroundColor: 'var(--accent)' }}
        >
          安装
        </button>
        <button
          onClick={() => setPWAInstall(false)}
          className="px-3 py-1.5 rounded-lg text-xs text-tertiary hover:text-secondary
            transition-colors cursor-pointer"
        >
          以后再说
        </button>
      </div>
    </div>
  );
}
