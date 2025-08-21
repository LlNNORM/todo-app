export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  order: number;
}

export type Filter = 'all' | 'active' | 'completed';


export interface DragItem {
  id: number;
  index: number;
  type: string;
}

export interface TodoItemProps {
  todo: Todo;
  index: number;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
  onMove: (dragIndex: number, hoverIndex: number) => void;
  editingId: number | null;
  editingText: string;
  setEditingId: (id: number | null) => void;
  setEditingText: (text: string) => void;
}