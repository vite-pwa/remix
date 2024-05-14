/// <reference types="vite/client" />
/// <reference lib="webworker" />
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'
import { NavigationRoute, registerRoute } from 'workbox-routing'
import { navigateFallback, ssr } from 'virtual:vite-pwa/remix/sw'
import { setupRoutes } from './shared-sw'

declare let self: ServiceWorkerGlobalScope

const url = navigateFallback ?? '/'

/// self.__WB_MANIFEST is the default injection point
const manifest = self.__WB_MANIFEST
if (import.meta.env.DEV) {
  const entry = manifest.findIndex(entry => typeof entry !== 'string' && entry.url === url)
  if (entry !== -1)
    manifest.splice(entry, 1)

  // add the navigateFallback to the manifest
  manifest.push({ url, revision: Math.random().toString() })
}

precacheAndRoute(manifest)

// clean old assets
cleanupOutdatedCaches()

let allowlist: RegExp[] | undefined
// in dev mode, we disable precaching to avoid caching issues
if (import.meta.env.DEV) {
  if (ssr) {
    // add the navigateFallback to the manifest
    allowlist = [new RegExp(`^${url}$`)]
  }
  else {
    allowlist = [/^index.html$/]
  }
}

// to allow work offline
registerRoute(new NavigationRoute(
  createHandlerBoundToURL(ssr ? url : 'index.html'),
  { allowlist },
))

setupRoutes()

self.skipWaiting()
clientsClaim()
