import { resolve } from 'node:path'
import { access, constants, mkdir, rm, writeFile } from 'node:fs/promises'
import type { Preset } from '@react-router/dev/config'
import type { ReactRouterPWAContext } from '../context'

export function ReactRouterPreset(ctx: ReactRouterPWAContext): () => Preset {
  return () => {
    return {
      name: '@vite-pwa/react-router/preset',
      reactRouterConfig() {
        return {
          async buildEnd() {
            ctx.build = true
            await ctx.api?.generateSW()
            if (ctx.reactRouterResolvedConfig?.ssr && ctx.resolvedPWAOptions)
              await cleanupServerFolder(ctx, ctx.resolvedPWAOptions.manifestFilename)
          },
        }
      },
      async reactRouterConfigResolved({ reactRouterConfig }) {
        const rootDirectory = process.env.REACT_ROUTER_ROOT ?? process.cwd()

        try {
          await access('.react-router', constants.F_OK)
        }
        catch (err) {
          mkdir('.react-router')
        }

        const storeFilePath = `${rootDirectory}/.react-router/react-router-pwa-rotues.json`

        await writeFile(storeFilePath, JSON.stringify(reactRouterConfig))
      },
    } satisfies Preset
  }
}

async function cleanupServerFolder(ctx: ReactRouterPWAContext, manifestName?: string) {
  // todo: check why web manifest and registerSW.js created in server folder
  const { buildDirectory } = ctx.reactRouterResolvedConfig
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
