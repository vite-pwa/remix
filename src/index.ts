import { version } from '../package.json'
import type { BasePWAContext } from './context'
import { ReactRouterPlugin, RemixPlugin } from './plugins'
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
    RemixVitePWAPlugin: RemixPlugin(ctx),
    RemixPWAPreset: RemixPreset(ctx),
  }
}

export function ReactRouterVitePWA(): {
  ReactRouterVitePWAPlugin: ReturnType<typeof ReactRouterPlugin>
} {
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
    ReactRouterVitePWAPlugin: ReactRouterPlugin(ctx),
  }
}
