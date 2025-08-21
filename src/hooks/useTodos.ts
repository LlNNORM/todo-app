import { useState, useEffect, useCallback, useMemo } from "react";

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
  order: number;
};

export type Filter = "all" | "active" | "completed";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  // загрузка из localStorage
  useEffect(() => {
    try {
      const savedTodos = localStorage.getItem("todos");
      const savedFilter = localStorage.getItem("filter") as Filter | null;

      if (savedTodos) {
        const parsed: Todo[] = JSON.parse(savedTodos);
        setTodos(parsed);
      }
      if (savedFilter) setFilter(savedFilter);
    } catch (err) {
      console.error("Ошибка загрузки из localStorage", err);
    }
  }, []);

  // сохранение в localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("filter", filter);
  }, [todos, filter]);

  const addTodo = useCallback((text: string) => {
    setTodos(prev => [
      ...prev,
      { id: Date.now(), text, completed: false, order: prev.length }
    ]);
  }, []);

  const toggleTodo = useCallback((id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const updateTodo = useCallback((id: number, newText: string) => {
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  }, []);

  const moveTodo = useCallback((from: number, to: number) => {
    setTodos(prev => {
      const updated = [...prev];
      const [moved] = updated.splice(from, 1);
      updated.splice(to, 0, moved);
      return updated.map((t, i) => ({ ...t, order: i }));
    });
  }, []);

  // фильтрация
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter(t => !t.completed);
      case "completed":
        return todos.filter(t => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const activeCount = useMemo(
    () => todos.filter(t => !t.completed).length,
    [todos]
  );

  const completedCount = useMemo(
    () => todos.filter(t => t.completed).length,
    [todos]
  );

  return {
    todos,
    filteredTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    clearCompleted,
    moveTodo,
    activeCount,
    completedCount
  };
}
