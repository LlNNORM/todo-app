import { renderHook, act } from "@testing-library/react";
import { useTodos } from "./useTodos";
import type { Todo } from "../types";
import * as storage from "../utils/localStorage";
import { vi } from "vitest";

describe("useTodos", () => {
  const initialTodos: Todo[] = [
    { id: 1, text: "task1", completed: false, order: 0 },
    { id: 2, text: "task2", completed: true, order: 1 },
  ];

  beforeEach(() => {
    vi.spyOn(storage, "loadFromLocalStorage").mockReturnValue(initialTodos);
    vi.spyOn(storage, "saveToLocalStorage").mockImplementation(() => {});
  });

  it("загружает задачи из localStorage", () => {
    const { result } = renderHook(() => useTodos());
    expect(result.current.todos).toHaveLength(2);
  });

  it("переключает completed", () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.toggleTodo(1);
    });
    expect(result.current.todos.find(t => t.id === 1)?.completed).toBe(true);
  });

  it("удаляет задачу", () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.deleteTodo(2);
    });
    expect(result.current.todos).toHaveLength(1);
  });

  it("начинает и отменяет редактирование", () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.startEdit(1, "edit");
    });
    expect(result.current.editingId).toBe(1);
    expect(result.current.editingText).toBe("edit");

    act(() => {
      result.current.cancelEdit();
    });
    expect(result.current.editingId).toBeNull();
    expect(result.current.editingText).toBe("");
  });

  it("сохраняет изменения при submitEdit", () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.startEdit(1, "new text");
    });
    act(() => {
    result.current.submitEdit();
    });
    expect(result.current.todos.find(t => t.id === 1)?.text).toBe("new text");
    expect(result.current.editingId).toBeNull();
  });
});
