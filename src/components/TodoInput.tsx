// components/TodoInput.tsx
import React from 'react';
import type { Todo } from '../types';
import { Input } from './ui/input';
import { useTodoInput } from '../hooks/useTodoInput';

interface TodoInputProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodoInput: React.FC<TodoInputProps> = ({ todos, setTodos }) => {
  const { inputValue, setInputValue, handleKeyPress } = useTodoInput(todos, setTodos);

  return (
    <div className="p-4 border-b">
      <div className="relative">
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">❯</span>
        <Input
          type="text"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          className="pl-12 border-0 text-lg placeholder:text-gray-400 placeholder:italic focus-visible:ring-0 shadow-none"
        />
      </div>
    </div>
  );
};
