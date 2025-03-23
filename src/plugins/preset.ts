import { resolve } from 'node:path'
import { access, constants, mkdir, rm, writeFile } from 'node:fs/promises'
import type { Preset as ReactRouterPresetType } from '@react-router/dev/config'
import type { Preset as RemixPresetType } from '@remix-run/dev'
import type { BasePWAContext } from '../context'

export function RemixPreset(ctx: BasePWAContext) {
  return () => {
    return {
      name: '@vite-pwa/remix/preset',
      remixConfig() {
        return {
          async buildEnd() {
            ctx.build = true
            await ctx.api?.generateSW()
            if (ctx.resolvedConfig.ssr && ctx.resolvedPWAOptions)
              await cleanupServerFolder(ctx, ctx.resolvedPWAOptions.manifestFilename)
          },
        }
      },
      remixConfigResolved({ remixConfig }) {
        ctx.resolvedConfig = {
          ...remixConfig,
          prerender: false,
          buildEnd: undefined,
          future: undefined as never,
        }
      },
    } satisfies RemixPresetType
  }
}

export function ReactRouterPreset(ctx: BasePWAContext): () => ReactRouterPresetType {
  return () => {
    return {
      name: '@vite-pwa/remix/preset',
      reactRouterConfig() {
        return {
          async buildEnd() {
            ctx.build = true
            await ctx.api?.generateSW()
            if (ctx.resolvedConfig?.ssr && ctx.resolvedPWAOptions)
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
    } satisfies ReactRouterPresetType
  }
}

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
