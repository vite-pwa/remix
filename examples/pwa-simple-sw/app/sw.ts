import { setupPwa } from '@vite-pwa/remix/sw'

declare const self: ServiceWorkerGlobalScope

console.log(import.meta.env.BASE_URL)

setupPwa({
  manifest: self.__WB_MANIFEST,
  configureRoutes(routes, ssr) {
    console.log('PWA routes:', { 'SSR:': ssr, routes })
  },
})
