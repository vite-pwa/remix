import { resolve as resolvePath } from 'node:path'
import { createHash } from 'node:crypto'
import { createReadStream } from 'node:fs'
import { lstat } from 'node:fs/promises'
import type { RemixPWAContext } from './context'
import type { RemixPWAOptions } from './index'

export function configurePWA(
  ctx: RemixPWAContext,
  pwa: RemixPWAOptions,
) {
  pwa.integration = {
    closeBundleOrder: 'post',
    async configureOptions(viteOptions, options) {
      const { ssr = true, basename, buildDirectory } = ctx.remixResolvedConfig
      let config: Partial<
        import('workbox-build').BasePartial
          & import('workbox-build').GlobPartial
          & import('workbox-build').RequiredGlobDirectoryPartial
      >

      if (options.strategies === 'injectManifest') {
        options.injectManifest = options.injectManifest ?? {}
        config = options.injectManifest
      }
      else {
        options.workbox = options.workbox ?? {}
        if (ssr) {
          if (!('navigateFallback' in options.workbox))
            options.workbox.navigateFallback = basename ?? viteOptions.base ?? '/'
          if (!('navigateFallbackAllowlist' in options.workbox))
            options.workbox.navigateFallbackAllowlist = [new RegExp(`^${options.workbox.navigateFallback}$`)]
        }

        config = options.workbox
      }

      if (!('globDirectory' in config))
        config.globDirectory = `${buildDirectory}/client`

      if (!('dontCacheBustURLsMatching' in config))
        config.dontCacheBustURLsMatching = /assets\//
    },
    async beforeBuildServiceWorker(options) {
      const { appDirectory, routes, ssr } = ctx.remixResolvedConfig
      // we only need to handle build in SSR:
      // - in dev mode, the pwa plugin will do the work for us here
      // - when building, we need to include the navigateFallback entry in the sw precache manifest
      // build flag is enabled in the remix preset in the buildEnd hook
      if (ctx.build && ssr) {
        const entryPoint = Object.entries(routes).find(([name]) => name === 'routes/_index')
        if (entryPoint) {
          // assume the fallback is the root page, remix integration will allow to configure it
          // we're going to add the / route with the corresponding tsx file hash
          const path = resolvePath(appDirectory, entryPoint![1].file)
          if (options.strategies === 'injectManifest') {
            options.injectManifest.manifestTransforms ??= []
            options.injectManifest.manifestTransforms.push(async (entries) => {
              entries.push({
                url: options.base,
                revision: await createRevision(path),
                size: await lstat(path).then(s => s.size),
              })
              return { manifest: entries, warnings: [] }
            })
          }
          else {
            options.workbox.additionalManifestEntries ??= []
            options.workbox.additionalManifestEntries.push({
              url: options.base,
              revision: await createRevision(path),
            })
          }
        }
      }
    },
  }

  return pwa
}

async function createRevision(path: string) {
  return await new Promise<string>((resolve, reject) => {
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
}
