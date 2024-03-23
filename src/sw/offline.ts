import { type ConfigRoute, routes } from 'virtual:vite-pwa/remix/routes'
import { createHandlerBoundToURL } from 'workbox-precaching'
import { NavigationRoute, registerRoute } from 'workbox-routing'

export interface OfflineOptions {
  navigateFallback?: string
  denylist?: RegExp[]
  allowlist?: RegExp[]
  configureRoutes?: (routes: ConfigRoute[]) => void
}

// todo: move this to the server? we don't need to do this in the client, the server can generate all the stuff
export function offline(options: OfflineOptions = {}) {
  if (options.navigateFallback) {
    registerRoute(new NavigationRoute(createHandlerBoundToURL(options.navigateFallback), {
      allowlist: options.allowlist,
      denylist: options.denylist,
    }))
  }
  options.configureRoutes?.(routes)
}
