import { useTodoStore } from '@/stores/todoStore';
import { TodoItem } from './TodoItem';

export function TodoList() {
  const todos = useTodoStore((s) => s.todos);
  const activeTodoId = useTodoStore((s) => s.activeTodoId);
  const setActiveTodo = useTodoStore((s) => s.setActiveTodo);
  const toggleTodo = useTodoStore((s) => s.toggleTodo);
  const deleteTodo = useTodoStore((s) => s.deleteTodo);

  const activeTodos = todos.filter((t) => !t.completed);
  const completedTodos = todos.filter((t) => t.completed);
  const sortedTodos = [...activeTodos, ...completedTodos];

  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-8 text-tertiary animate-fade-in">
        <span className="text-2xl">📌</span>
        <span className="text-xs">今天还没有学习任务</span>
        <span className="text-xs opacity-60">先写下本轮要完成什么</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      {sortedTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          item={todo}
          isActive={todo.id === activeTodoId}
          onSelect={setActiveTodo}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      ))}
    </div>
  );
}
