import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fontless } from 'fontless'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [fontless(), react()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve('./src') }],
  },
  server: {
    open: true,
  },
})
