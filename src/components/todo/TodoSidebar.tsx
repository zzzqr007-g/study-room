import { useUIStore } from '@/stores/uiStore';
import { TodoList } from './TodoList';
import { AddTodoForm } from './AddTodoForm';

export function TodoSidebar() {
  const sidebarExpanded = useUIStore((s) => s.sidebarExpanded);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);

  const isExpanded = sidebarExpanded;

  return (
    <div className="h-full flex flex-row pointer-events-auto max-md:pointer-events-none">
      <button
        onClick={toggleSidebar}
        className="pointer-events-auto fixed bottom-20 left-4 z-40 flex h-11 w-11 items-center justify-center rounded-2xl border border-theme-light bg-surface text-lg shadow-lg md:hidden"
        title={isExpanded ? '收起今日任务' : '打开今日任务'}
      >
        📌
      </button>

      {isExpanded && (
        <button
          onClick={toggleSidebar}
          className="pointer-events-auto fixed inset-0 z-20 bg-black/20 backdrop-blur-[2px] md:hidden"
          title="收起今日任务"
        />
      )}

      <div
        className="hidden h-full flex-shrink-0 flex-col items-center border-r border-theme-light bg-surface/90 pb-4 pt-20 md:flex"
        style={{ width: 64 }}
      >
        <button
          onClick={toggleSidebar}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-theme-light bg-surface transition-all duration-200 hover:bg-surface-hover"
          title={isExpanded ? '收起今日任务' : '展开今日任务'}
        >
          <span className="text-lg">{isExpanded ? '◁' : '📌'}</span>
        </button>
        <div className="flex flex-1 items-center justify-center">
          <span
            className="select-none text-[10px] text-tertiary opacity-60"
            style={{ writingMode: 'vertical-rl' }}
          >
            今日任务
          </span>
        </div>
      </div>

      <div
        className={`pointer-events-auto fixed bottom-0 left-0 right-0 z-30 flex max-h-[72vh] flex-col overflow-hidden rounded-t-[1.5rem] border-t border-theme-light bg-surface/95 pb-4 pt-4 shadow-2xl transition-all duration-300 ease-out md:static md:h-full md:max-h-none md:translate-y-0 md:rounded-none md:border-r md:border-t-0 md:pb-4 md:pt-20 md:shadow-none ${
          isExpanded
            ? 'translate-y-0 opacity-100 md:w-64'
            : 'translate-y-full opacity-0 md:w-0'
        }`}
      >
        <div className="mb-2 flex flex-shrink-0 items-center justify-between px-4">
          <span className="whitespace-nowrap text-sm font-semibold text-primary">
            今日任务
          </span>
          <button
            onClick={toggleSidebar}
            className="rounded-lg px-2 py-1 text-xs text-secondary transition-colors hover:bg-surface-hover hover:text-primary md:hidden"
          >
            收起
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-2">
          <TodoList />
          <div className="mt-2 border-t border-theme-light pt-2">
            <AddTodoForm isExpanded={isExpanded} />
          </div>
        </div>
      </div>
    </div>
  );
}
