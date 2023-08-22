import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: {
        'background': resolve(__dirname, 'src/background.ts'),
      },
      name: 'code2image',
      formats: ['iife'],
      fileName: (format, entryName) => `${entryName}.js`
    },
    minfy: false,
    copyPublicDir: false,
    emptyOutDir: false
  }
})
