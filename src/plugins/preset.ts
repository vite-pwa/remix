import { resolve } from 'node:path'
import { rm } from 'node:fs/promises'
import type { Preset } from '@remix-run/dev'
import type { RemixPWAContext } from '../context'

export function RemixPreset(ctx: RemixPWAContext) {
  return () => {
    return {
      name: '@vite-pwa/remix/preset',
      remixConfig() {
        return {
          async buildEnd() {
            ctx.build = true
            await ctx.api?.generateSW()
            if (ctx.remixResolvedConfig.ssr && ctx.resolvedPWAOptions)
              await cleanupServerFolder(ctx, ctx.resolvedPWAOptions.manifestFilename)
          },
        }
      },
      remixConfigResolved({ remixConfig }) {
        ctx.remixResolvedConfig = remixConfig
      },
    } satisfies Preset
  }
}

async function cleanupServerFolder(ctx: RemixPWAContext, manifestName?: string) {
  // todo: check why web manifest and registerSW.js created in server folder
  const { buildDirectory } = ctx.remixResolvedConfig
  try {
    await Promise.all([
      resolve(buildDirectory, 'server/registerSW.js'),
      manifestName ? resolve(buildDirectory, `server/${manifestName}`) : undefined,
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
