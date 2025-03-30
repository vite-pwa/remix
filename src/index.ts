import type { RemixPWAContext } from './context'
import { version } from '../package.json'
import { MainPlugin } from './plugins'
import { RemixPreset } from './plugins/preset'

export * from './types'

export function RemixVitePWA() {
  const ctx: RemixPWAContext = {
    remixOptions: undefined!,
    remixResolvedConfig: undefined!,
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
