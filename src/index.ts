import { version } from '../package.json'
import type { RemixPWAContext } from './context'
import { RemixPreset } from './plugins/preset'
import { MainPlugin } from './plugins'

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
