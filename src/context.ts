import type { ResolvedVitePWAOptions, VitePluginPWAAPI } from 'vite-plugin-pwa'
import type { Preset } from '@react-router/dev/config'
import type { RouteConfig } from '@react-router/dev/routes'
import type { RemixPWAInjectManifest } from './types'

export interface RemixPWASWContext {
  version: string
  enablePrecaching: boolean
  navigateFallback?: string
  clientsClaimMode: 'auto' | boolean
  cleanupOutdatedCaches: boolean
  promptForUpdate: boolean
  routes: RouteConfig
}

export interface BasePWAContext {
  resolvedPWAOptions?: ResolvedVitePWAOptions
  api?: VitePluginPWAAPI
  build: boolean
  sw: RemixPWASWContext
  resolvedConfig: Parameters<NonNullable<Preset['reactRouterConfigResolved']>>['0']['reactRouterConfig']
  options: ResolvedBasePWASWOptions
}

export interface ResolvedBasePWASWOptions {
  injectManifest: Required<RemixPWAInjectManifest>
}
