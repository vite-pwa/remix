import type { RemixPWAContext } from './context'
import { RemixPreset } from './plugins/preset'
import { MainPlugin } from './plugins'

export * from './types'

export function RemixVitePWA() {
  const ctx: RemixPWAContext = {
    remixResolvedConfig: undefined!,
    api: undefined,
    build: false,
    remixOptions: undefined!,
  }

  return {
    RemixVitePWAPlugin: MainPlugin(ctx),
    RemixPWAPreset: RemixPreset(ctx),
  }
}
