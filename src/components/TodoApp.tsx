import { TodoList } from './TodoList';
import { Separator } from './ui/separator';
import { TodoInput } from './TodoInput';
import { TodoFooter } from './TodoFooter';
import { useTodos } from '../hooks/useTodos';
import { useTodoFilter } from '../hooks/useTodoFilter';
import { TodoHeader } from './TodoHeader';
import { TodoInstructions } from './TodoInstructions';
export default function TodoApp() {
  const { 
    todos, setTodos, toggleTodo, deleteTodo,
    editingId, editingText, setEditingText,
    startEdit, cancelEdit, submitEdit
  } = useTodos();
  const { filter, setFilter, getFilteredTodos } = useTodoFilter(todos);
  const filteredTodos = getFilteredTodos();

  return (
      <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-xl mx-auto">
        <TodoHeader/>
        {/* Main todo container */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <TodoInput todos={todos} setTodos={setTodos} />
              {todos.length > 0 && (
              <>
                <TodoList 
                  todos={filteredTodos}
                  toggleTodo={toggleTodo} 
                  deleteTodo={deleteTodo}
                  editActions={{
                                editingId,
                                editingText,
                                setEditingText,
                                startEdit,
                                cancelEdit,
                                submitEdit,
                              }}
                />
                <Separator />
                <TodoFooter
                  todos={todos}
                  setTodos={setTodos}
                  filter={filter}
                  setFilter={setFilter}
                />
              </>
          )}     
        </div>
        <TodoInstructions/>
      </div>
    </div>
  );
}