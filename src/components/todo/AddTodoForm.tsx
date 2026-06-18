import { useState, useRef, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useTodoStore } from '@/stores/todoStore';

interface AddTodoFormProps {
  isExpanded: boolean;
}

export function AddTodoForm({ isExpanded }: AddTodoFormProps) {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const addTodo = useTodoStore((s) => s.addTodo);

  // Auto-focus input when sidebar expands
  useEffect(() => {
    if (isExpanded) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isExpanded]);

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    addTodo(trimmed);
    setText('');
    inputRef.current?.focus();
  };

  return (
    <div className="flex items-center gap-1.5 w-full">
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSubmit();
        }}
        placeholder="添加学习任务..."
        className="flex-1 min-w-0 bg-transparent text-sm text-primary placeholder:text-tertiary
          outline-none py-1.5 px-2 rounded-lg
          focus:bg-surface-hover transition-all duration-200"
      />
      <button
        onClick={handleSubmit}
        className="p-1.5 rounded-lg bg-[var(--accent)] text-white
          hover:opacity-90 transition-all duration-200 cursor-pointer
          disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
        disabled={!text.trim()}
        title="添加学习任务"
        style={{ backgroundColor: 'var(--accent)' }}
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
