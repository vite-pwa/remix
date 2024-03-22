import type { RemixPWAContext } from './context'
import { RemixPreset } from './plugins/preset'
import { MainPlugin } from './plugins'

export * from './types'

export function RemixVitePWA() {
  const ctx: RemixPWAContext = {
    remixResolvedConfig: undefined!,
    api: undefined,
    build: false,
    configured: false,
  }

  return {
    RemixVitePWAPlugin: MainPlugin(ctx),
    RemixPWAPreset: RemixPreset(ctx),
  }
}
