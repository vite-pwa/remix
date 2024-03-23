import type { VitePluginPWAAPI } from 'vite-plugin-pwa'
import type { ResolvedVitePluginConfig } from '@remix-run/dev/dist/vite/plugin'
import type { RemixPWAOptions } from './types'

export interface RemixPWAContext {
  remixOptions?: Pick<RemixPWAOptions, 'remix'>
  remixResolvedConfig: ResolvedVitePluginConfig
  api?: VitePluginPWAAPI
  build: boolean
}
