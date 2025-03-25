import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path' // Import path module

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Set import alias for "src" folder
    },
  }, 
  server: {  // Move "server" config here (not inside resolve)
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
        credentials: true, // Allow cookies
      },
    },
  }
})
