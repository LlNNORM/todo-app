import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TodoAppContent } from './TodoList';
export default function TodoApp() {
  return (
    <DndProvider backend={HTML5Backend}>
      <TodoAppContent />
    </DndProvider>
  );
}