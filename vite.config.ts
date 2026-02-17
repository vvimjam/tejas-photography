import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Important: Use base path only for production builds (GitHub Pages)
  // For local development, use root path '/'
  // Change 'tejas-photography' to match your actual GitHub repo name
  base: command === 'build' ? '/tejas-photography/' : '/',
}))
