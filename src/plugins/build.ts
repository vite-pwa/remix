import { resolve } from 'node:path'
import { rm } from 'node:fs/promises'
import type { Plugin } from 'vite'
import type { BasePWAContext } from '../context'

async function cleanupServerFolder(ctx: BasePWAContext, manifestName?: string) {
  // todo: check why web manifest and registerSW.js created in server folder
  const { buildDirectory } = ctx.resolvedConfig
  try {
    await Promise.all([
      resolve(buildDirectory!, 'server/registerSW.js'),
      manifestName ? resolve(buildDirectory!, `server/${manifestName}`) : undefined,
    ].map(async (file) => {
      if (!file)
        return

      try {
        await rm(file, { force: true, recursive: false })
      }
      catch {}
    }))
  }
  catch {}
}

export interface BuildPluginType extends Plugin {
  onBuildEnd: () => Promise<void>
}

export function BuildPlugin(ctx: BasePWAContext) {
  return {
    name: 'vite-pwa:reactrouter:build',
    apply: 'build',
    configResolved(config) {
      if (!config.build.ssr)
        ctx.api = config.plugins.find(p => p.name === 'vite-plugin-pwa')?.api
    },
    async onBuildEnd() {
      ctx.build = true
      await ctx.api?.generateSW()
      if (ctx.resolvedConfig?.ssr && ctx.resolvedPWAOptions)
        await cleanupServerFolder(ctx, ctx.resolvedPWAOptions.manifestFilename)
    },
  } satisfies BuildPluginType
}
