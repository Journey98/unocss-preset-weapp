import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    entries: [],
  },
  test: {
    isolate: false,
    setupFiles: ['./test/setup.ts'],
    include: ['./test2/**/*.spec.ts'],
  },
})
