import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    TanStackRouterVite({
      generatedRouteTree: './app/routeTree.gen.ts',
      routesDirectory: './app/routes',
      // Without this the whole site is one chunk: opening the home page also
      // downloads /about, /craftman and /foreman, and every mockup they draw.
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: { '~': path.resolve(__dirname, './app') },
  },
})
