import { useState, useEffect } from 'react';
// import { Input } from './ui/input';

import { Separator } from './ui/separator';
import type { Todo, Filter } from '../types';
import { TodoItem } from './TodoItem';
import { TODO_LIST_STORAGE_KEY, TODO_LIST_FILTER_STORAGE_KEY, saveToLocalStorage, loadFromLocalStorage, removeFromLocalStorage } from '../utils/localStorage';
import { TodoInput } from './TodoInput';
import { TodoFooter } from './TodoFooter';

export function TodoAppContent() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const todoList = loadFromLocalStorage<Todo[]>(TODO_LIST_STORAGE_KEY) || [];
      return todoList.map((todo: any, index: number) => ({
        ...todo,
        order: todo.order ?? index,
      })).sort((a: Todo, b: Todo) => a.order - b.order);
});

const [filter, setFilter] = useState<Filter>(() => {
  const savedFilter = loadFromLocalStorage<Filter>(TODO_LIST_FILTER_STORAGE_KEY);
  return savedFilter && ['all', 'active', 'completed'].includes(savedFilter)
    ? savedFilter
    : 'all';
});

  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    saveToLocalStorage(TODO_LIST_STORAGE_KEY, todos);
  }, [todos]);

  // Save filter to localStorage whenever filter changes
  useEffect(() => {
    saveToLocalStorage(TODO_LIST_FILTER_STORAGE_KEY, filter);
  }, [filter]);



  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: number, newText: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const moveTodo = (dragIndex: number, hoverIndex: number) => {
    const filteredTodos = getFilteredTodos();
    const draggedTodo = filteredTodos[dragIndex];
    const newFilteredTodos = [...filteredTodos];
    
    newFilteredTodos.splice(dragIndex, 1);
    newFilteredTodos.splice(hoverIndex, 0, draggedTodo);
    
    // Update the order property and merge back with all todos
    const updatedTodos = newFilteredTodos.map((todo, index) => ({
      ...todo,
      order: index,
    }));
    
    // For filtered views, we need to maintain the original todos that aren't in the filter
    const filteredIds = new Set(filteredTodos.map(todo => todo.id));
    const otherTodos = todos.filter(todo => !filteredIds.has(todo.id));
    
    setTodos([...updatedTodos, ...otherTodos].sort((a, b) => a.order - b.order));
  };



  const getFilteredTodos = () => {
    const sortedTodos = [...todos].sort((a, b) => a.order - b.order);
    switch (filter) {
      case 'active':
        return sortedTodos.filter(todo => !todo.completed);
      case 'completed':
        return sortedTodos.filter(todo => todo.completed);
      default:
        return sortedTodos;
    }
  };

  // const activeTodosCount = todos.filter(todo => !todo.completed).length;
  // const completedTodosCount = todos.filter(todo => todo.completed).length;
  const filteredTodos = getFilteredTodos();



  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl text-gray-200 tracking-wider">todos</h1>
        </div>

        {/* Main todo container */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Input section */}
          <TodoInput todos={todos} setTodos={setTodos} />

          {/* Todo list */}
          {todos.length > 0 && (
            <>
              <div className="divide-y divide-gray-100">
                {filteredTodos.map((todo, index) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    index={index}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onEdit={editTodo}
                    onMove={moveTodo}
                    editingId={editingId}
                    editingText={editingText}
                    setEditingId={setEditingId}
                    setEditingText={setEditingText}
                  />
                ))}
              </div>

              <Separator />

              {/* Footer */}
              <TodoFooter
                todos={todos}
                setTodos={setTodos}
                filter={filter}
                setFilter={setFilter}
                // clearCompleted={clearCompleted}
              />  
            </>
          )}
        </div>

        {/* Instructions */}
        <div className="text-center mt-8 text-gray-400 text-sm space-y-1">
          <p>Double-click to edit a todo</p>
          <p>Drag tasks to reorder them</p>
          <p>Data is automatically saved to localStorage</p>
        </div>
      </div>
    </div>
  );
}