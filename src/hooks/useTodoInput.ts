import { useState } from 'react';
import type { Todo } from '../types';

export function useTodoInput(todos: Todo[], setTodos: React.Dispatch<React.SetStateAction<Todo[]>>) {
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (!inputValue.trim()) return;
    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
      order: todos.length,
    };
    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') addTodo();
  };

  return {
    inputValue,
    setInputValue,
    handleKeyPress,
    addTodo,
  };
}