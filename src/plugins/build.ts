import type { Plugin } from 'vite'
import type { RemixPWAContext } from '../context'

export function BuildPlugin(ctx: RemixPWAContext) {
  return {
    name: 'vite-pwa:remix:build',
    apply: 'build',
    configResolved(config) {
      if (!config.build.ssr)
        ctx.api = config.plugins.find(p => p.name === 'vite-plugin-pwa')?.api
    },
  } satisfies Plugin
}
