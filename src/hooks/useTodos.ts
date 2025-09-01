import { useState, useEffect } from 'react';
import { TODO_LIST_STORAGE_KEY, saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorage';
import type { Todo } from '../types';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const todoList = loadFromLocalStorage<Todo[]>(TODO_LIST_STORAGE_KEY) || [];
    return todoList.map((todo: any, index: number) => ({
      ...todo,
      order: todo.order ?? index,
    })).sort((a: Todo, b: Todo) => a.order - b.order);
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    saveToLocalStorage(TODO_LIST_STORAGE_KEY, todos);
  }, [todos]);

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: number, newText: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const startEdit = (id: number, text: string) => {
    setEditingId(id);
    setEditingText(text);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  const submitEdit = () => {
    if (editingId !== null && editingText.trim() !== "") {
      editTodo(editingId, editingText.trim());
    }
    cancelEdit();
  };

    return {
    todos,
    setTodos,
    toggleTodo,
    deleteTodo,
    editingId,
    editingText,
    setEditingText,
    startEdit,
    cancelEdit,
    submitEdit,
  };
}