// hooks/useTodoFooter.ts
import type { Todo } from "../types";
import { removeFromLocalStorage, TODO_LIST_STORAGE_KEY } from "../utils/localStorage";

export function useTodoFooter(
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
) {
  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const completedTodosCount = todos.filter(todo => todo.completed).length;

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const clearAllTodos = () => {
    setTodos([]);
    removeFromLocalStorage(TODO_LIST_STORAGE_KEY);
  };

  return {
    activeTodosCount,
    completedTodosCount,
    clearCompleted,
    clearAllTodos,
  };
}
