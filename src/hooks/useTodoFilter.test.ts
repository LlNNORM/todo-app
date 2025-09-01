import { renderHook, act } from "@testing-library/react";
import { useTodoFilter } from "./useTodoFilter";

const todos = [
  { id: 1, text: "Active", completed: false, order: 0 },
  { id: 2, text: "Done", completed: true, order: 1 },
];

describe("useTodoFilter", () => {
  it("по умолчанию фильтр 'all'", () => {
    const { result } = renderHook(() => useTodoFilter(todos));
    expect(result.current.filter).toBe("all");
  });

  it("возвращает все todos при фильтре all", () => {
    const { result } = renderHook(() => useTodoFilter(todos));
    expect(result.current.getFilteredTodos()).toHaveLength(2);
  });
  
  it("возвращает только активные", () => {
    const { result } = renderHook(() => useTodoFilter(todos));
    act(() => result.current.setFilter("active"));
    expect(result.current.getFilteredTodos()).toEqual([todos[0]]);
  });

  it("возвращает только завершённые", () => {
    const { result } = renderHook(() => useTodoFilter(todos));
    act(() => result.current.setFilter("completed"));
    expect(result.current.getFilteredTodos()).toEqual([todos[1]]);
  });
});
