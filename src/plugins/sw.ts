import type { Plugin } from 'vite'
import type { RemixPWAContext } from '../context'

const VIRTUAL_REMIX_SW = 'virtual:vite-pwa/remix/sw'
const RESOLVED_VIRTUAL_REMIX_SW = `\0${VIRTUAL_REMIX_SW}`

export function SWPlugin(ctx: RemixPWAContext) {
  return {
    name: 'vite-pwa:remix:sw',
    enforce: 'pre',
    resolveId(id, _, options) {
      return !options.ssr && id === VIRTUAL_REMIX_SW ? RESOLVED_VIRTUAL_REMIX_SW : null
    },
    load(id) {
      if (id === RESOLVED_VIRTUAL_REMIX_SW) {
        const {
          version,
          enablePrecaching,
          navigateFallback,
          clientsClaimMode,
          cleanupOutdatedCaches,
          promptForUpdate,
        } = ctx.sw

        const allRoutes = Object.values(ctx.remixResolvedConfig.routes).filter((r) => {
          return r.index !== true && r.id !== 'root'
        })
        const staticRoutes = allRoutes.filter(r => r.path && !r.path.includes(':'))
        const dynamicRoutes = allRoutes.filter(r => r.path && r.path.includes(':'))

        return `export const version = '${version}'
export const ssr = ${ctx.remixResolvedConfig.ssr}
export const enablePrecaching = ${enablePrecaching}
export const navigateFallback = ${JSON.stringify(navigateFallback)}
export const clientsClaimMode = ${JSON.stringify(clientsClaimMode)}
export const cleanupOutdatedCaches = ${cleanupOutdatedCaches}
export const promptForUpdate = ${promptForUpdate}
export const staticRoutes = ${JSON.stringify(staticRoutes)}
export const dynamicRoutes = ${JSON.stringify(dynamicRoutes)}
export const routes = ${JSON.stringify(allRoutes)}
`
      }
    },
  } satisfies Plugin
}
