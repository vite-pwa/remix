import { ReactRouterPreset } from '@vite-pwa/remix'

export default {
  ssr: process.env.SPA === 'true',
  presets: [ReactRouterPreset({} as any)()],
}
