import React, { useState } from 'react';
import type { Todo } from '../types';
import { Input } from './ui/input';

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodoInput: React.FC<Props> = ({ todos, setTodos }) => {
  const [inputValue, setInputValue] = useState('');

    const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

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