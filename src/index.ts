import { resolve as resolvePath } from 'node:path'
import { createReadStream } from 'node:fs'
import { lstat } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { VitePWA as PWAPlugin } from 'vite-plugin-pwa'
import type { VitePWAOptions, VitePluginPWAAPI } from 'vite-plugin-pwa'
import { vitePlugin as RemixPlugin } from '@remix-run/dev'
import type { VitePluginConfig } from '@remix-run/dev'
import type { PluginOption } from 'vite'
import type { ResolvedVitePluginConfig } from '@remix-run/dev/dist/vite/plugin'

export interface RemixPWAOptions extends Partial<VitePWAOptions> {
  // todo: something to configure here? => remove type and change pwa signature
}

export interface RemixPWAConfig extends VitePluginConfig {
  pwa?: RemixPWAOptions
}

interface RemixPWAContext {
  api?: VitePluginPWAAPI
  buildData?: Pick<ResolvedVitePluginConfig, 'appDirectory' | 'routes' | 'ssr'>
}

export function RemixPWAPlugin(config?: RemixPWAConfig) {
  const userBuildEnd = config?.buildEnd
  const { pwa = {}, ...remixConfig } = config ?? {}

  const ctx: RemixPWAContext = {
    api: undefined,
    buildData: undefined,
  }

  configurePWA(ctx, pwa)

  return [
    RemixPlugin({
      ...remixConfig,
      async buildEnd(args) {
        await userBuildEnd?.(args)
        const { remixConfig: { appDirectory, routes, ssr } } = args
        ctx.buildData = { appDirectory, routes, ssr }
        await ctx.api?.generateSW()
      },
    }),
    PWAPlugin(pwa),
    {
      name: 'vite-pwa:remix:build',
      apply: 'build',
      configResolved(config) {
        if (!config.build.ssr)
          ctx.api = config.plugins.find(p => p.name === 'vite-plugin-pwa')?.api
      },
    },
  ] as PluginOption
}

function configurePWA(ctx: RemixPWAContext, pwa: RemixPWAOptions) {
  pwa.integration = {
    closeBundleOrder: 'post',
    async beforeBuildServiceWorker(options) {
      const buildData = ctx.buildData
      if (buildData) {
        // if SSR: we need to include the navigateFallback entry in the sw precache manifest
        if (buildData.ssr && options.strategies === 'injectManifest' && options.injectManifest.injectionPoint) {
          // assume the fallback is the root page, remix integration will allow to configure it
          // we're going to add the / route with the corresponding tsx file hash
          const entryPoint = Object.entries(buildData.routes).find(([name]) => name === 'routes/_index')
          if (entryPoint) {
            const path = resolvePath(buildData.appDirectory, entryPoint![1].file)
            options.injectManifest.manifestTransforms ??= []
            options.injectManifest.manifestTransforms.push(async (entries) => {
              const revision = await new Promise<string>((resolve, reject) => {
                const cHash = createHash('MD5')
                const stream = createReadStream(path, 'utf-8')
                stream.on('error', (err) => {
                  reject(err)
                })
                stream.on('data', chunk => cHash.update(chunk))
                stream.on('end', () => {
                  resolve(cHash.digest('hex'))
                })
              })
              const size = await lstat(path).then(s => s.size)
              entries.push({ url: '/', revision, size })
              return { manifest: entries, warnings: [] }
            })
          }
        }
      }
    },
  }
}
