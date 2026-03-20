import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // If deploying to a subdirectory (e.g., GitHub Pages), uncomment and set:
  // base: '/your-repo-name/',
})
