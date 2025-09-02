import { renderHook, act } from "@testing-library/react";
import { useTodoFooter } from "./useTodoFooter";
import type { Todo } from "../types";
import * as storage from "../utils/localStorage";
import { vi } from "vitest";

describe("useTodoFooter", () => {
  const todos: Todo[] = [
    { id: 1, text: "task1", completed: false, order: 0 },
    { id: 2, text: "task2", completed: true, order: 1 },
  ];
  const setTodos = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("считает количество active и completed", () => {
    const { result } = renderHook(() => useTodoFooter(todos, setTodos));
    expect(result.current.activeTodosCount).toBe(1);
    expect(result.current.completedTodosCount).toBe(1);
  });

  it("очищает completed задачи", () => {
    const { result } = renderHook(() => useTodoFooter(todos, setTodos));
    act(() => {
      result.current.clearCompleted();
    });
    expect(setTodos).toHaveBeenCalledWith([todos[0]]);
  });

  it("очищает все задачи и localStorage", () => {
    const removeSpy = vi.spyOn(storage, "removeFromLocalStorage").mockImplementation(() => {});
    const { result } = renderHook(() => useTodoFooter(todos, setTodos));
    act(() => {
      result.current.clearAllTodos();
    });
    expect(setTodos).toHaveBeenCalledWith([]);
    expect(removeSpy).toHaveBeenCalledWith(storage.TODO_LIST_STORAGE_KEY);
  });
});
