import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Mude para true se quiser que o navegador abra automaticamente ao rodar `npm run dev`
    open: false,
  },
})
