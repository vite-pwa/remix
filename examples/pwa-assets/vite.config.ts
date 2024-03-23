import { vitePlugin as remix } from '@remix-run/dev'
import { installGlobals } from '@remix-run/node'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { RemixVitePWA } from '@vite-pwa/remix'

installGlobals()

const { RemixVitePWAPlugin, RemixPWAPreset } = RemixVitePWA()

export default defineConfig({
  plugins: [
    remix({
      ssr: process.env.SPA !== 'true',
      presets: [RemixPWAPreset()],
    }),
    tsconfigPaths(),
    RemixVitePWAPlugin({
      mode: 'development',
      base: '/',
      registerType: 'autoUpdate',
      manifest: {
        name: 'Remix PWA',
        short_name: 'Remix PWA',
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
