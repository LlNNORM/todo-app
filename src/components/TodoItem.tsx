import { useEffect, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { X, GripVertical } from 'lucide-react';
import type { TodoItemProps, DragItem } from '../types';


const ITEM_TYPE = 'todo';
export function TodoItem({
  todo,
  index,
  onToggle,
  onDelete,
  onEdit,
  onMove,
  editingId,
  editingText,
  setEditingId,
  setEditingText,
}: TodoItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ITEM_TYPE,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset?.y || 0) - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      onMove(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: ITEM_TYPE,
    item: () => {
      return { id: todo.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;
  preview(drop(ref));

  const handleDoubleClick = () => {
    if (!todo.completed) {
      setEditingId(todo.id);
      setEditingText(todo.text);
    }
  };

  const handleEditSubmit = () => {
    if (editingText.trim() !== '') {
      onEdit(todo.id, editingText.trim());
    }
    setEditingId(null);
    setEditingText('');
  };

  const handleEditKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEditSubmit();
    } else if (e.key === 'Escape') {
      setEditingId(null);
      setEditingText('');
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
      style={{ opacity }}
      data-handler-id={handlerId}
      className="flex items-center gap-3 p-4 group hover:bg-gray-50 transition-colors"
    >
      <div
        ref={drag}
        className="cursor-move opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600"
      >
        <GripVertical size={16} />
      </div>
      
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
          onKeyDown={handleEditKeyPress}
          onBlur={handleEditSubmit}
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