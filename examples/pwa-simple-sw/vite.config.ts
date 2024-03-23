import { vitePlugin as remix } from '@remix-run/dev'
import { installGlobals } from '@remix-run/node'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { RemixVitePWA } from '@vite-pwa/remix'

installGlobals()

const { RemixVitePWAPlugin, RemixPWAPreset } = RemixVitePWA()

// for testing purposes only
const usingRemixSW = process.env.PLAIN_SW !== 'true'
// for testing purposes only
const virtualPwaModule = process.env.VIRTUAL_PWA_MODULE !== 'false'

process.env.VITE_VIRTUAL_PWA_MODULE = virtualPwaModule.toString()
process.env.VITE_PUBLIC_VIRTUAL_PWA_MODULE = process.env.VITE_VIRTUAL_PWA_MODULE
process.env.VITE_BUILD_DATE = JSON.stringify(new Date().toISOString())

export default defineConfig({
  // for testing purposes only
  define: {
    VITE_VIRTUAL_PWA_MODULE: process.env.VITE_VIRTUAL_PWA_MODULE,
    VITE_PUBLIC_VIRTUAL_PWA_MODULE: process.env.VITE_VIRTUAL_PWA_MODULE,
    VITE_BUILD_DATE: process.env.VITE_BUILD_DATE,
  },
  plugins: [
    remix({
      // for testing purposes only
      ssr: process.env.SPA !== 'true',
      presets: [RemixPWAPreset()],
    }),
    tsconfigPaths(),
    RemixVitePWAPlugin({
      srcDir: 'app',
      strategies: 'injectManifest',
      // for testing purposes only
      filename: usingRemixSW ? 'sw.ts' : 'plain-sw.ts',
      base: '/',
      registerType: 'autoUpdate',
      // for testing purposes only
      injectRegister: usingRemixSW || virtualPwaModule ? false : 'auto',
      manifest: {
        name: 'Remix PWA',
        short_name: 'Remix PWA',
        theme_color: '#ffffff',
        start_url: '/',
        display: 'standalone',
        icons: [{
          src: 'pwa-64x64.png',
          sizes: '64x64',
          type: 'image/png',
        }, {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        }, {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        }, {
          src: 'maskable-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        }],
        edge_side_panel: {
          preferred_width: 480,
        },
      },
      injectManifest: {
        globPatterns: ['**/*.{js,html,css,png,svg,ico}'],
        // for testing purposes only
        minify: false,
        // for testing purposes only
        enableWorkboxModulesLogs: true,
      },
      devOptions: {
        enabled: true,
        type: 'module',
        suppressWarnings: true,
      },
      remix: {
        injectManifest: {
          // for testing purposes only
          clientsClaimMode: usingRemixSW ? (virtualPwaModule ? true : 'auto') : undefined,
        },
      },
    }),
  ],
})
