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

        return `export const version = '${version}'
export const ssr = ${ctx.remixResolvedConfig.ssr}
export const enablePrecaching = ${enablePrecaching}
export const navigateFallback = ${JSON.stringify(navigateFallback)}
export const clientsClaimMode = ${JSON.stringify(clientsClaimMode)}
export const cleanupOutdatedCaches = ${cleanupOutdatedCaches}
export const promptForUpdate = ${promptForUpdate}
export const routes = ${JSON.stringify(Object.values(ctx.remixResolvedConfig.routes))}
`
      }
    },
  } satisfies Plugin
}
