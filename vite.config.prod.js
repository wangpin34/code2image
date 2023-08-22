import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import viteTsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
    define: {
          global: {},
          'process.env': {},
        },
  plugins: [react(), viteTsconfigPaths(),],
  build: {
    lib: {
      entry: {
        'content-script': resolve(__dirname, 'src/main.tsx'),
      },
      name: 'code2image',
      formats: ['iife'],
      fileName: (format, entryName) => `${entryName}.js`
    },
    minfy: false,
    copyPublicDir: true,
    emptyOutDir: true
  }
})
