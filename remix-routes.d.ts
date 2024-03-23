declare module 'virtual:vite-pwa/remix/routes' {
  import type { ConfigRoute } from '@remix-run/dev/dist/config/routes'

  export type { ConfigRoute }

  export const routes: ConfigRoute[]
}
