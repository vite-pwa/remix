declare module 'virtual:vite-pwa/reactrouter/sw' {
  import type { RouteConfig } from '@react-router/dev/routes'

  export type { RouteConfig }

  export const version: string
  export const ssr: boolean
  export const enablePrecaching: boolean
  export const navigateFallback: string | undefined
  export const clientsClaimMode: 'auto' | boolean
  export const cleanupOutdatedCaches: boolean
  export const promptForUpdate: boolean
  export const staticRoutes: RouteConfig
  export const dynamicRoutes: RouteConfig
  export const routes: RouteConfig
}
