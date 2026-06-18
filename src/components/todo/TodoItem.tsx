import { Target, X } from 'lucide-react';
import { CircleCheckbox } from '@/components/common/CircleCheckbox';
import type { TodoItem as TodoItemType } from '@/types/todo';

interface TodoItemProps {
  item: TodoItemType;
  isActive: boolean;
  onSelect: (id: string | null) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ item, isActive, onSelect, onToggle, onDelete }: TodoItemProps) {
  return (
    <div
      className={`group flex items-center gap-2 px-3 py-2.5 rounded-xl border
        transition-all duration-200 animate-slide-in-left
        ${isActive
          ? 'bg-[var(--accent)]/10 border-[var(--accent)]/30'
          : 'border-transparent hover:bg-surface-hover'
        }`}
    >
      <CircleCheckbox
        checked={item.completed}
        onChange={() => onToggle(item.id)}
      />
      <span
        className={`flex-1 text-sm truncate transition-all duration-200
          ${item.completed
            ? 'text-tertiary line-through'
            : 'text-primary'
          }`}
      >
        {item.text}
      </span>
      {!item.completed && (
        <button
          onClick={() => onSelect(isActive ? null : item.id)}
          className={`p-1.5 rounded-lg transition-all duration-200 cursor-pointer
            ${isActive
              ? 'bg-[var(--accent)] text-white'
              : 'opacity-0 group-hover:opacity-100 text-tertiary hover:text-[var(--accent)] hover:bg-[var(--accent)]/10'
            }`}
          title={isActive ? '取消当前任务' : '设为当前任务'}
        >
          <Target className="w-3.5 h-3.5" />
        </button>
      )}
      <button
        onClick={() => onDelete(item.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200
          p-1 rounded-lg hover:bg-[var(--danger)]/10 cursor-pointer"
        title="删除"
      >
        <X className="w-3.5 h-3.5 text-tertiary hover:text-[var(--danger)]" />
      </button>
    </div>
  );
}
