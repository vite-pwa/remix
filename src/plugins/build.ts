import type { Plugin } from 'vite'
import type { BasePWAContext } from '../context'

export function BuildPlugin(ctx: BasePWAContext) {
  return {
    name: 'vite-pwa:reactrouter:build',
    apply: 'build',
    configResolved(config) {
      if (!config.build.ssr)
        ctx.api = config.plugins.find(p => p.name === 'vite-plugin-pwa')?.api
    },
  } satisfies Plugin
}
