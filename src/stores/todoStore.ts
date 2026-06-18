import { create } from 'zustand';
import type { TodoItem } from '@/types/todo';

interface TodoState {
  todos: TodoItem[];
  activeTodoId: string | null;
  addTodo: (text: string) => void;
  setActiveTodo: (id: string | null) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  clearCompleted: () => void;
}

function loadTodos(): TodoItem[] {
  try {
    const saved = localStorage.getItem('todos');
    if (saved) return JSON.parse(saved);
  } catch { /* ignore */ }
  return [];
}

function saveTodos(todos: TodoItem[]) {
  try {
    localStorage.setItem('todos', JSON.stringify(todos));
  } catch { /* ignore */ }
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: loadTodos(),
  activeTodoId: null,

  addTodo: (text) =>
    set((s) => {
      const updated = [
        ...s.todos,
        {
          id: crypto.randomUUID(),
          text: text.trim(),
          completed: false,
          createdAt: Date.now(),
        },
      ];
      saveTodos(updated);
      return { todos: updated, activeTodoId: s.activeTodoId ?? updated.at(-1)?.id ?? null };
    }),

  setActiveTodo: (id) =>
    set((s) => ({
      activeTodoId: id && s.todos.some((t) => t.id === id && !t.completed) ? id : null,
    })),

  toggleTodo: (id) =>
    set((s) => {
      const updated = s.todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );
      const toggled = updated.find((t) => t.id === id);
      saveTodos(updated);
      return {
        todos: updated,
        activeTodoId: toggled?.completed && s.activeTodoId === id ? null : s.activeTodoId,
      };
    }),

  deleteTodo: (id) =>
    set((s) => {
      const updated = s.todos.filter((t) => t.id !== id);
      saveTodos(updated);
      return { todos: updated, activeTodoId: s.activeTodoId === id ? null : s.activeTodoId };
    }),

  clearCompleted: () =>
    set((s) => {
      const updated = s.todos.filter((t) => !t.completed);
      saveTodos(updated);
      return {
        todos: updated,
        activeTodoId: updated.some((t) => t.id === s.activeTodoId) ? s.activeTodoId : null,
      };
    }),
}));
