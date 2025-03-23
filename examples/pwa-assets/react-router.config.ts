import { ReactRouterPreset } from '@vite-pwa/react-router'

export default {
  ssr: process.env.SPA === 'true',
  presets: [ReactRouterPreset({} as any)()],
}
