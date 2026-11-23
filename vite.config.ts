import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Static files (fonts, images, favicon, _redirects) live in static/.
// The built site goes to public/, which Cloudflare Pages publishes.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  publicDir: 'static',
  build: { outDir: 'public', emptyOutDir: true },
})
