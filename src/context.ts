import type { ConfigRoute } from '@remix-run/dev/dist/config/routes'
import type { ResolvedVitePluginConfig } from '@remix-run/dev/dist/vite/plugin'
import type { ResolvedVitePWAOptions, VitePluginPWAAPI } from 'vite-plugin-pwa'
import type { RemixPWAInjectManifest } from './types'

export interface RemixPWASWContext {
  version: string
  enablePrecaching: boolean
  navigateFallback?: string
  clientsClaimMode: 'auto' | boolean
  cleanupOutdatedCaches: boolean
  promptForUpdate: boolean
  routes: ConfigRoute[]
}

export interface ResolvedRemixPWASWOptions {
  injectManifest: Required<RemixPWAInjectManifest>
}

export interface RemixPWAContext {
  remixOptions: ResolvedRemixPWASWOptions
  remixResolvedConfig: ResolvedVitePluginConfig
  resolvedPWAOptions?: ResolvedVitePWAOptions
  api?: VitePluginPWAAPI
  build: boolean
  sw: RemixPWASWContext
}
