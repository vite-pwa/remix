/// <reference types="vite/client" />
/// <reference lib="webworker" />
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'
import { NavigationRoute, registerRoute } from 'workbox-routing'
import { setupRoutes } from './shared-sw'

declare let self: ServiceWorkerGlobalScope

// self.__WB_MANIFEST is default injection point
const manifest = self.__WB_MANIFEST
if (import.meta.env.DEV) {
  // add the navigateFallback to the manifest
  manifest.push({ url: '/', revision: Math.random().toString() })
}
precacheAndRoute(manifest)

// clean old assets
cleanupOutdatedCaches()

// to allow work offline
registerRoute(new NavigationRoute(
  createHandlerBoundToURL('/'),
  { allowlist: [/^\/$/] },
))

setupRoutes()

self.skipWaiting()
clientsClaim()
