// components/TodoList.tsx
import React from "react";
import { TodoItem } from "./TodoItem";
import type { Todo, EditActions } from "../types";

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: number ) => void;
  deleteTodo: (id: number ) => void;
  editActions: EditActions;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  toggleTodo,
  deleteTodo,
  editActions,
}) => {
  if (todos.length === 0) {
    return <p className="text-center text-gray-400 p-5">No todos</p>;
  }

  return (
    <div className="divide-y divide-gray-100">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          {...editActions}

        />
      ))}
    </div>
  );
};
