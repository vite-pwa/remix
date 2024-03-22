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
      presets: [RemixPWAPreset()],
    }),
    tsconfigPaths(),
    RemixVitePWAPlugin({
      disable: true,
      mode: 'development',
      srcDir: 'app',
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
        globPatterns: ['**/*.{js,css,png,svg,ico}'],
      },
      pwaAssets: {
        config: true,
        generateDtsIcons: true,
      },
      devOptions: {
        enabled: true,
        suppressWarnings: true,
      },
    }),
  ],
})
