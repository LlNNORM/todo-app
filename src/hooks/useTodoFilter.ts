import { useState, useEffect } from 'react';
import { TODO_LIST_FILTER_STORAGE_KEY, saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorage';
import type { Filter, Todo } from '../types';

export function useTodoFilter(todos: Todo[]) {
    const [filter, setFilter] = useState<Filter>(() => {
        const savedFilter = loadFromLocalStorage<Filter>(TODO_LIST_FILTER_STORAGE_KEY);
        return savedFilter && ['all', 'active', 'completed'].includes(savedFilter)
        ? savedFilter
        : 'all';
  });

  useEffect(() => {
    saveToLocalStorage(TODO_LIST_FILTER_STORAGE_KEY, filter);
  }, [filter]);

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

  return { filter, setFilter, getFilteredTodos };
}