import { dynamicRoutes, staticRoutes } from 'virtual:vite-pwa/remix/sw'
import { registerRoute } from 'workbox-routing'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { NetworkOnly, StaleWhileRevalidate } from 'workbox-strategies'
import type { RouteConfig } from '@react-router/dev/routes'

export async function resolveRoutePath(r: RouteConfig) {
  const resolvedStaticRoute = await r

  const routes: string[] = []

  for (const route of resolvedStaticRoute) {
    if (route.path)
      routes.push(route.path)
  }

  return routes
}

export async function setupRoutes() {
  // disable precaching in dev
  if (!import.meta.env.PROD)
    return

  const baseUrl = import.meta.env.BASE_URL
  const useStaticRoutes = await resolveRoutePath(staticRoutes)

  const useDynamicRoutes = await resolveRoutePath(dynamicRoutes)

  if (useStaticRoutes.length) {
    const staticRoutesRegexp = new RegExp(`^${baseUrl}(${useStaticRoutes.join('|')})$`)
    registerRoute(
      ({ request, sameOrigin, url }) => request.destination === 'document' && sameOrigin && staticRoutesRegexp.test(url.pathname),
      new StaleWhileRevalidate({
        cacheName: 'static-pages',
        matchOptions: {
          ignoreVary: true,
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
  if (useDynamicRoutes.length) {
    const dynamicRoutesRegexp = new RegExp(`^${baseUrl}(${useDynamicRoutes.map((r) => {
        const parts = r.split('/')
        parts.forEach((part, i) => {
          if (part.startsWith(':'))
            parts[i] = '([^/]+)'
        })
        return `(${parts.join('/')})`
      }).join('|')})$`)
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
}
