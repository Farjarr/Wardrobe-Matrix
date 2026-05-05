import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || '/wardrobe-pwa/',
  server: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT || '25941'),
    allowedHosts: true
  }
})
