export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  order: number;
}

export type Filter = 'all' | 'active' | 'completed';

export interface EditActions {
  editingId: number | null;
  editingText: string;
  setEditingText: React.Dispatch<React.SetStateAction<string>>;
  startEdit: (id: number, text: string) => void;
  cancelEdit: () => void;
  submitEdit: () => void;
}