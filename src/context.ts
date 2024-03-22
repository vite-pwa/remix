import type { VitePluginPWAAPI } from 'vite-plugin-pwa'
import type { ResolvedVitePluginConfig } from '@remix-run/dev/dist/vite/plugin'

export interface RemixPWAContext {
  remixResolvedConfig: ResolvedVitePluginConfig
  api?: VitePluginPWAAPI
  build: boolean
  configured: boolean
}
