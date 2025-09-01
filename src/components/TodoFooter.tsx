// components/TodoFooter.tsx
import React from "react";
import type { Filter, Todo } from "../types";
import { Button } from './ui/button';
import { useTodoFooter } from "../hooks/useTodoFooter";

interface TodoFooterProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  filter: Filter;
  setFilter: (f: Filter) => void;
}

export const TodoFooter: React.FC<TodoFooterProps> = ({
  todos, 
  setTodos,
  filter,
  setFilter,
}) => {
  const { activeTodosCount, completedTodosCount, clearCompleted, clearAllTodos } =
    useTodoFooter(todos, setTodos);

  return (
    <footer className="p-4 flex items-center justify-between text-sm text-gray-500">
      <span className="inline-block w-20">
        {activeTodosCount} item{activeTodosCount !== 1 ? 's' : ''} left
      </span>

      <div className="flex gap-2">
        <Button
          variant={filter === 'all' ? 'outline' : 'ghost'}
          size="sm"
          onClick={() => setFilter('all')}
          className="text-sm"
        >
          All
        </Button>
        <Button
          variant={filter === 'active' ? 'outline' : 'ghost'}
          size="sm"
          onClick={() => setFilter('active')}
          className="text-sm"
        >
          Active
        </Button>
        <Button
          variant={filter === 'completed' ? 'outline' : 'ghost'}
          size="sm"
          onClick={() => setFilter('completed')}
          className="text-sm"
        >
          Completed
        </Button>
      </div>

      <div className="flex gap-2">
        {completedTodosCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearCompleted}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Clear completed
          </Button>
        )}
        {todos.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllTodos}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Clear all
          </Button>
        )}
      </div>
    </footer>
  );
};
