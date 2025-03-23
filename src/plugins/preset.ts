import { access, constants, mkdir, writeFile } from 'node:fs/promises'
import type { Preset as ReactRouterPresetType } from '@react-router/dev/config'
import type { Preset as RemixPresetType } from '@remix-run/dev'
import type { BasePWAContext } from '../context'
import type { BuildPluginType } from './build'

export function RemixPreset(ctx: BasePWAContext) {
  return () => {
    return {
      name: '@vite-pwa/remix/preset',
      remixConfig() {
        return {
          async buildEnd({ viteConfig }: { viteConfig: import('vite').ResolvedConfig }) {
            const remixPwaBuildPlugin = viteConfig.plugins.find(plugin => plugin.name === 'vite-pwa:reactrouter:build') as BuildPluginType

            if (!remixPwaBuildPlugin)
              throw new Error('Remix PWA Plugin must be preset in vite.config')

            await remixPwaBuildPlugin.onBuildEnd()
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

export function ReactRouterPreset(): ReactRouterPresetType {
  return {
    name: '@vite-pwa/remix/preset',
    reactRouterConfig() {
      return {
        async buildEnd({ viteConfig }: { viteConfig: import('vite').ResolvedConfig }) {
          const remixPwaBuildPlugin = viteConfig.plugins.find(plugin => plugin.name === 'vite-pwa:reactrouter:build') as BuildPluginType

          if (!remixPwaBuildPlugin)
            throw new Error('Remix PWA Plugin must be preset in vite.config')

          await remixPwaBuildPlugin.onBuildEnd()
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
