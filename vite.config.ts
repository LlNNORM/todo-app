import { defineConfig } from "vitest/config"; // <- важно: из vitest/config
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss(),],

  // Настройки Vitest
  test: {
    globals: true,           // использовать глобальные функции типа `describe`/`it`
    environment: "jsdom",    // для тестирования компонентов React
    coverage: {
      provider: "v8",        // сбор покрытия через v8
      reporter: ["text", "html"], // отчеты в консоль и html
    },
  },

  // Настройки Vite
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});