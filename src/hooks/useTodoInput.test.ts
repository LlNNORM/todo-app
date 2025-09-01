import { renderHook, act } from "@testing-library/react";
import { useTodoInput } from "./useTodoInput";

describe("useTodoInput", () => {
  it("обновляет inputValue", () => {
    const { result } = renderHook(() => useTodoInput([], jest.fn()));

    act(() => {
      result.current.setInputValue("test");
    });

    expect(result.current.inputValue).toBe("test");
  });

  it("добавляет новый todo при addTodo", () => {
    const setTodos = jest.fn();
    const { result } = renderHook(() => useTodoInput([], setTodos));

    act(() => {
      result.current.setInputValue("new task");
      result.current.addTodo();
    });

    expect(setTodos).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ text: "new task", completed: false }),
      ])
    );
  });

  it("игнорирует пустой ввод", () => {
    const setTodos = jest.fn();
    const { result } = renderHook(() => useTodoInput([], setTodos));

    act(() => {
      result.current.setInputValue("   ");
      result.current.addTodo();
    });

    expect(setTodos).not.toHaveBeenCalled();
  });
});
