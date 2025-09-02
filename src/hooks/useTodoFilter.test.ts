import { renderHook, act } from "@testing-library/react";
import { useTodoFilter } from "./useTodoFilter";
import type { Todo } from "../types";
import * as storage from "../utils/localStorage";
import { vi } from "vitest";

describe("useTodoFilter", () => {
  const todos: Todo[] = [
    { id: 1, text: "task1", completed: false, order: 0 },
    { id: 2, text: "task2", completed: true, order: 1 },
  ];

  beforeEach(() => {
    vi.spyOn(storage, "loadFromLocalStorage").mockReturnValue(null);
    vi.spyOn(storage, "saveToLocalStorage").mockImplementation(() => {});
  });

  it("по умолчанию устанавливает фильтр all", () => {
    const { result } = renderHook(() => useTodoFilter(todos));
    expect(result.current.filter).toBe("all");
    expect(result.current.getFilteredTodos()).toHaveLength(2);
  });

  it("фильтрует только active", () => {
    const { result } = renderHook(() => useTodoFilter(todos));
    act(() => {
      result.current.setFilter("active");
    });
    expect(result.current.getFilteredTodos()).toEqual([
      expect.objectContaining({ id: 1 }),
    ]);
  });

  it("фильтрует только completed", () => {
    const { result } = renderHook(() => useTodoFilter(todos));
    act(() => {
      result.current.setFilter("completed");
    });
    expect(result.current.getFilteredTodos()).toEqual([
      expect.objectContaining({ id: 2 }),
    ]);
  });
});
