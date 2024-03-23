import type { Plugin } from 'vite'
import type { RemixPWAContext } from '../context'

const VIRTUAL_REMIX_ROUTES = 'virtual:vite-pwa/remix/routes'
const RESOLVED_VIRTUAL_REMIX_ROUTES = `\0${VIRTUAL_REMIX_ROUTES}`

export function BuildPlugin(ctx: RemixPWAContext) {
  return {
    name: 'vite-pwa:remix:ssr-routes',
    enforce: 'pre',
    load(id, ssr) {
      return !ssr && id === VIRTUAL_REMIX_ROUTES ? RESOLVED_VIRTUAL_REMIX_ROUTES : null
    },
    resolveId(id) {
      if (id === RESOLVED_VIRTUAL_REMIX_ROUTES) {
        return ctx.remixResolvedConfig.ssr
          ? `export const routes = ${JSON.stringify(Object.values(ctx.remixResolvedConfig.routes))}`
          : 'export const routes = []'
      }
    },
  } satisfies Plugin
}
