import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  test: {
    globals: true,            // чтобы не писать import { describe, it } from 'vitest'
    environment: "jsdom",     // эмулируем браузерное окружение
    setupFiles: "./src/setupTests.ts", // хук перед тестами
  },
})


