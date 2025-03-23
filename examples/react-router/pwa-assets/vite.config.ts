import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { reactRouter } from '@react-router/dev/vite'
import { ReactRouterVitePWA } from '@vite-pwa/remix'

export const { ReactRouterVitePWAPlugin } = ReactRouterVitePWA()

export default defineConfig({
  plugins: [
    reactRouter(),
    tsconfigPaths(),
    ReactRouterVitePWAPlugin({
      mode: 'development',
      base: '/',
      registerType: 'autoUpdate',
      manifest: {
        name: 'React Router PWA',
        short_name: 'React Router PWA',
        theme_color: '#ffffff',
        start_url: '/',
        display: 'standalone',
        edge_side_panel: {
          preferred_width: 480,
        },
      },
      workbox: {
        globPatterns: ['**/*.{js,html,css,png,svg,ico}'],
      },
      pwaAssets: {
        config: true,
      },
      devOptions: {
        enabled: true,
        suppressWarnings: true,
      },
    }),
  ],
})
