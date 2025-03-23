import { version } from '../package.json'
import type { ReactRouterPWAContext } from './context'
import { MainPlugin } from './plugins'

export * from './types'
export { ReactRouterPreset } from './plugins/preset'

export function ReactRouterVitePWA(): {
  ReactRouterVitePWAPlugin: ReturnType<typeof MainPlugin>
} {
  const ctx: ReactRouterPWAContext = {
    reactRouterOptions: undefined!,
    reactRouterResolvedConfig: undefined!,
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
    ReactRouterVitePWAPlugin: MainPlugin(ctx),
  }
}
