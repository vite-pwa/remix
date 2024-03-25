import { baseUrl, setupPwa } from '@vite-pwa/remix/sw'
import { registerRoute } from 'workbox-routing'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { NetworkOnly, StaleWhileRevalidate } from 'workbox-strategies'

declare const self: ServiceWorkerGlobalScope

setupPwa({
  manifest: self.__WB_MANIFEST,
  configureRoutes(routes) {
    const staticRoutes = routes.filter(r => r.path && !r.path.includes(':')).reduce((acc, r) => {
      acc.push(`${baseUrl}${r.path!}`)
      return acc
    }, [] as string[])
    const dynamicRoutes = routes.filter(r => r.path && r.path.includes(':')).reduce((acc, r) => {
      acc.push(`${baseUrl}${r.path!}`)
      return acc
    }, [] as string[])
    if (staticRoutes.length) {
      const staticRoutesRegexp = new RegExp(`^(${staticRoutes.join('|')})$`)
      registerRoute(
        ({ request, sameOrigin, url }) => request.destination === 'document' && sameOrigin && staticRoutesRegexp.test(url.pathname),
        new StaleWhileRevalidate({
          cacheName: 'static-pages',
          matchOptions: {
            ignoreSearch: true,
            ignoreMethod: true,
          },
          plugins: [
            new CacheableResponsePlugin({
              statuses: [200],
            }),
          ],
        }),
        'GET',
      )
    }
    if (dynamicRoutes.length) {
      const dynamicRoutesRegexp = new RegExp(`^(${dynamicRoutes.map((r) => {
        const parts = r.split('/')
        parts.forEach((part, i) => {
            if (part.startsWith(':'))
            parts[i] = '([^/]+)'
        })
        return parts.join('/')
      }).join('|')})`)
      registerRoute(
        ({ request, sameOrigin, url }) => request.destination === 'document' && sameOrigin && dynamicRoutesRegexp.test(url.pathname),
        new NetworkOnly({
          plugins: [{
            handlerDidError: async ({ state, error }) => {
              console.log(state, error)
              return Response.redirect('/', 302)
            },
          }],
        }),
      )
    }
  },
})
