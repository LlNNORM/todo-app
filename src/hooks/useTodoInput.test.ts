import { renderHook, act } from "@testing-library/react";
import { useTodoInput } from "./useTodoInput";
import { vi } from "vitest";

describe("useTodoInput", () => {
  it("обновляет inputValue", () => {
    const { result } = renderHook(() => useTodoInput([], vi.fn()));

    act(() => {
      result.current.setInputValue("test");
    });
    expect(result.current.inputValue).toBe("test");
  });

  it("не добавляет пустую задачу", () => {
    const setTodos = vi.fn();
    const { result } = renderHook(() => useTodoInput([], setTodos));

    act(() => {
      result.current.setInputValue("   ");
      result.current.addTodo();
    });

    expect(setTodos).not.toHaveBeenCalled();
  });

  it("добавляет задачу по Enter", () => {
    const setTodos = vi.fn();
    const { result } = renderHook(() => useTodoInput([], setTodos));

    act(() => {
      result.current.setInputValue("keyboard task");
    });

    act(() => {
      result.current.handleKeyPress({ key: "Enter" } as any);
    });

    expect(setTodos).toHaveBeenCalled();
  });
});
