import {
  type ConfigRoute,
  cleanupOutdatedCaches,
  clientsClaimMode,
  enablePrecaching,
  navigateFallback,
  promptForUpdate,
  routes,
  ssr,
  version,
} from 'virtual:vite-pwa/remix/sw'
import { cleanupOutdatedCaches as cleanCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { NavigationRoute, registerRoute } from 'workbox-routing'
import { clientsClaim as claim } from 'workbox-core'
import type { PrecacheEntry } from 'workbox-precaching'

declare const self: ServiceWorkerGlobalScope

export interface PwaOptions {
  manifest?: Array<PrecacheEntry | string>
  configureRoutes?: (routes: ConfigRoute[], ssr: boolean) => void
}

const baseUrl = import.meta.env.BASE_URL

export {
  baseUrl,
  cleanupOutdatedCaches,
  clientsClaimMode,
  enablePrecaching,
  navigateFallback,
  promptForUpdate,
  routes,
  ssr,
  version,
}

// todo: move this to the server? we don't need to do this in the client, the server can generate all the stuff
export function setupPwa(options: PwaOptions = {}) {
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.info(
        `Remix PWA v${version}, using ${
            promptForUpdate ? 'prompt-for-update' : 'auto-update'
        } register mode`,
    )
  }

  if (promptForUpdate) {
    self.addEventListener('message', (event) => {
      if (event.data.type === 'SKIP_WAITING')
        self.skipWaiting()
    })
  }

  if (enablePrecaching) {
    const manifest = options.manifest ?? []
    if (import.meta.env.DEV) {
      if (navigateFallback)
        manifest.push({ url: navigateFallback, revision: Math.random().toString() })
    }
    precacheAndRoute(manifest)
  }

  if (cleanupOutdatedCaches)
    cleanCaches()

  if (navigateFallback) {
    registerRoute(new NavigationRoute(createHandlerBoundToURL(navigateFallback), {
      allowlist: [/^\/$/],
    }))
  }

  options.configureRoutes?.(routes, ssr)

  if (!promptForUpdate) {
    if (clientsClaimMode === 'auto') {
      // Skip-Waiting Service Worker-based solution
      self.addEventListener('activate', async () => {
        // after we've taken over, iterate over all the current clients (windows)
        const clients = await self.clients.matchAll({ type: 'window' })
        clients.forEach((client) => {
          // ...and refresh each one of them
          client.navigate(client.url)
        })
      })
      self.skipWaiting()
    }
    else {
      self.skipWaiting()
      if (clientsClaimMode)
        claim()
    }
  }
}
