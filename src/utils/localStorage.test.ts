import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
  removeFromLocalStorage,
} from "./localStorage";

describe("localStorage utils", () => {
  const TEST_KEY = "test.key";
  const TEST_DATA = { id: 1, text: "hello" };

  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(console, "error").mockImplementation(() => {}); // чтобы не сыпались ошибки в консоль
  });

  it("сохраняет данные в localStorage", () => {
    saveToLocalStorage(TEST_KEY, TEST_DATA);

    const stored = localStorage.getItem(TEST_KEY);
    expect(stored).not.toBeNull();
    expect(JSON.parse(stored as string)).toEqual(TEST_DATA);
  });

  it("загружает данные из localStorage", () => {
    localStorage.setItem(TEST_KEY, JSON.stringify(TEST_DATA));

    const result = loadFromLocalStorage<typeof TEST_DATA>(TEST_KEY);
    expect(result).toEqual(TEST_DATA);
  });

  it("возвращает null если ключа нет", () => {
    const result = loadFromLocalStorage<typeof TEST_DATA>("missing.key");
    expect(result).toBeNull();
  });

  it("удаляет данные из localStorage", () => {
    localStorage.setItem(TEST_KEY, JSON.stringify(TEST_DATA));
    removeFromLocalStorage(TEST_KEY);

    expect(localStorage.getItem(TEST_KEY)).toBeNull();
  });

  it("возвращает null и логирует ошибку при невалидных данных", () => {
    localStorage.setItem(TEST_KEY, "{invalid json}");

    const result = loadFromLocalStorage(TEST_KEY);
    expect(result).toBeNull();
    expect(console.error).toHaveBeenCalled();
  });
});
