// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  define: {
    global: {},
    'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: {
        background: resolve(__dirname, 'src/background.ts'),
      },
      formats: ['es']
    },
    minify: false,
    copyPublicDir: false,
    emptyOutDir: false,
  },
})