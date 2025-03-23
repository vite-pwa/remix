import { version } from '../package.json'
import type { BasePWAContext } from './context'
import { MainPlugin } from './plugins'
import { RemixPreset } from './plugins/preset'

export * from './types'
export { ReactRouterPreset } from './plugins/preset'

export function RemixVitePWA() {
  const ctx: BasePWAContext = {
    options: undefined!,
    resolvedConfig: undefined!,
    api: undefined,
    build: false,
    sw: {
      version,
      enablePrecaching: true,
      navigateFallback: undefined,
      clientsClaimMode: 'auto',
      cleanupOutdatedCaches: true,
      promptForUpdate: false,
      routes: [],
    },
  }

  return {
    RemixVitePWAPlugin: MainPlugin(ctx),
    RemixPWAPreset: RemixPreset(ctx),
  }
}

export function ReactRouterVitePWA() {
  const ctx: BasePWAContext = {
    options: undefined!,
    resolvedConfig: undefined!,
    api: undefined,
    build: false,
    sw: {
      version,
      enablePrecaching: true,
      navigateFallback: undefined,
      clientsClaimMode: 'auto',
      cleanupOutdatedCaches: true,
      promptForUpdate: false,
      routes: [],
    },
  }

  return {
    ReactRouterVitePWAPlugin: MainPlugin(ctx, true),
  }
}
