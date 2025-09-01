import { renderHook, act } from "@testing-library/react";
import { useTodoFooter } from "./useTodoFooter";

const todos = [
  { id: 1, text: "Active", completed: false, order: 0 },
  { id: 2, text: "Done", completed: true, order: 1 },
];

describe("useTodoFooter", () => {
  it("считает активные и завершенные задачи", () => {
    const { result } = renderHook(() => useTodoFooter(todos, jest.fn()));
    expect(result.current.activeTodosCount).toBe(1);
    expect(result.current.completedTodosCount).toBe(1);
  });

  it("очищает completed задачи", () => {
    const setTodos = jest.fn();
    const { result } = renderHook(() => useTodoFooter(todos, setTodos));

    act(() => result.current.clearCompleted());

    expect(setTodos).toHaveBeenCalledWith([todos[0]]);
  });

  it("очищает все задачи", () => {
    const setTodos = jest.fn();
    const { result } = renderHook(() => useTodoFooter(todos, setTodos));

    act(() => result.current.clearAllTodos());

    expect(setTodos).toHaveBeenCalledWith([]);
  });
});
