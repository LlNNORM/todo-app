import { renderHook, act } from "@testing-library/react";
import { useTodos } from "./useTodos";

describe("useTodos", () => {
  it("должен инициализироваться пустым списком", () => {
    const { result } = renderHook(() => useTodos());
    expect(result.current.todos).toEqual([]);
  });

  it("должен добавлять новый todo", () => {
    const { result } = renderHook(() => useTodos());

    act(() => {
      result.current.setTodos([{ id: 1, text: "Test", completed: false, order: 0 }]);
    });

    expect(result.current.todos.length).toBe(1);
    expect(result.current.todos[0].text).toBe("Test");
  });

  it("должен переключать completed у todo", () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.setTodos([{ id: 1, text: "Test", completed: false, order: 0 }]);
    });

    act(() => {
      result.current.toggleTodo(1);
    });

    expect(result.current.todos[0].completed).toBe(true);
  });

  it("должен удалять todo", () => {
    const { result } = renderHook(() => useTodos());
    act(() => {
      result.current.setTodos([{ id: 1, text: "Delete me", completed: false, order: 0 }]);
    });

    act(() => {
      result.current.deleteTodo(1);
    });

    expect(result.current.todos.length).toBe(0);
  });

});
