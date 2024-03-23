declare module 'virtual:vite-pwa/remix/sw' {
  import type { ConfigRoute } from '@remix-run/dev/dist/config/routes'

  export type { ConfigRoute }

  export const version: string
  export const ssr: boolean
  export const enablePrecaching: boolean
  export const navigateFallback: string | undefined
  export const clientsClaimMode: 'auto' | boolean
  export const cleanupOutdatedCaches: boolean
  export const promptForUpdate: boolean
  export const routes: ConfigRoute[]
}
