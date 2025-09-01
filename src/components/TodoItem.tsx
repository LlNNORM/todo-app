import { useEffect, useRef } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { X } from 'lucide-react';
import type { EditActions, Todo } from '../types';

export interface TodoItemProps extends EditActions {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TodoItem({
  todo,
  onToggle,
  onDelete,
  editingId,
  editingText,
  setEditingText,
  startEdit,
  cancelEdit,
  submitEdit,
}: TodoItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);
    const handleDoubleClick = () => {
    startEdit(todo.id, todo.text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      submitEdit();
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  useEffect(() => {
    if (editingId === todo.id && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [editingId, todo.id]);

  return (
    <div
      ref={ref}
      className="flex items-center gap-3 p-4 group hover:bg-gray-50 transition-colors"
    >
      
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo.id)}
        className="flex-shrink-0"
      />
      
      {editingId === todo.id ? (
        <Input
          ref={editInputRef}
          type="text"
          value={editingText}
          onChange={(e) => setEditingText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={submitEdit}
          className="flex-1 text-lg border-0 shadow-none focus-visible:ring-1 focus-visible:ring-blue-500 px-2 py-1 rounded"
        />
      ) : (
        <span
          onDoubleClick={handleDoubleClick}
          className={`flex-1 text-lg cursor-pointer select-none ${
            todo.completed
              ? 'line-through text-gray-400'
              : 'text-gray-700 hover:text-gray-900'
          }`}
          title={todo.completed ? undefined : "Double-click to edit"}
        >
          {todo.text}
        </span>
      )}
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 hover:bg-red-50"
      >
        <X size={18} />
      </Button>
    </div>
  );
}